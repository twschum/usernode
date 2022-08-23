/**
 *  Config manager provides loading all configurations when application is startup. Some configs gathered from environment variables,
 *  some are from static fields. When a modicifation needed, if you think, a variable is static please you should add it as static, not use ENVIRONMENT_VARIABLES!!!!
 */
module.exports = class ConfigManager {
  constructor() {
    this.mongo = this._getMongoDbConfigs();
    this.authentication = this._getBasicAuthenticationConfigs();
  }

  _getMongoDbConfigs() {
    let mongo = {};
    mongo.database = "profiles";
    mongo.user = process.env.USERNODE_MONGODB_USER || "nodeapp";
    mongo.password =
      process.env.USERNODE_MONGODB_PASS || "allyourbasearebelongtous";
    mongo.host = process.env.USERNODE_MONGODB_HOST || "localhost";
    mongo.port = process.env.USERNODE_MONGODB_PORT || 27017;
    return mongo;
  }

  _getBasicAuthenticationConfigs() {
    let authentication = {
      admin: {
        username: process.env.ENTITY_SERVICE_ADMIN_USERNAME || "adminUser",
        password:
          process.env.ENTITY_SERVICE_ADMIN_PASSWORD || "whatAc00ls3cret",
      },
    };
    return authentication;
  }

  getConfigurations() {
    return {
      mongo: this.mongo,
      authentication: this.authentication,
      logLevel: process.env.LOG_LEVEL || "debug",
      rejectUnauthorized:
        process.env.REQUEST_REJECT_UNAUTHORIZED == "true" ? true : false,
      listenPort: process.env.PORT || 8085,
    };
  }
};
