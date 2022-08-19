// Get admin user created by setup env vars
dbAdmin = db.getSiblingDB("admin");
dbAdmin.auth({
  user: "admin",
  pwd: "password",
  mechanisms: ["SCRAM-SHA-1"],
  digestPassword: true,
});

// Create "service account"
dbAdmin.createUser({
  user: "nodeapp",
  pwd: "allyourbasearebelongtous",
  roles: [
    {
      role: "readWrite",
      db: "profiles",
    },
  ],
});

// Create application database
db = new Mongo().getDB("profiles");
db.createCollection("users", { capped: false });
