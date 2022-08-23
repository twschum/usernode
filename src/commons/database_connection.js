var mysql = require("mysql");
const Logger = require("./../utils/logger");
const { MongoClient } = require("mongodb");

/**
 * DatabaseConnection is the database worker class for the application.
 * It is implemented as Singleton to keep connection limit safe
 */
module.exports = class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    this._logger = new Logger("database_connection").getLogger();

    const dburi = `mongodb+srv://${global.conf.mongo.user}:${global.conf.mongo.password}@${global.conf.mongo.host}:${global.conf.mongo.port}`;
    MongoClient.connect(
      dburi,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err, database) {
        if (err) {
          this._logger.error("Error in connection database ", err);
          throw err;
        }
        this._db = database;
      }
    );

    DatabaseConnection.instance = this;
  }

  addUser({user})

  readUser(uid) {
    this._db.collection("profile").find({})
  }

  _getConnection(cb, query, groupBy) {
    this._client.connect((err, connection) => {
      if (err) {
        if (connection) {
          connection.release();
        }
        this._logger.error("Error in connection database ", err);
        cb(false, []);
        return;
      }

      var errorCallback = (err) => {
        this._logger.error("Error in connection database", err);
        try {
          cb(false, []);
        } catch (error) {
          this._logger.error(
            "callback error after connection lost in mysql connection : ",
            error
          );
        }
      };

      connection.on("error", errorCallback);

      connection.query(query, (err, rows, fields) => {
        connection.removeListener("error", errorCallback);
        connection.release();
        if (!err) {
          if (groupBy) {
            var grouped = us.groupBy(rows, (d) => {
              return d[groupBy];
            });

            rows = grouped;
          }
          this._logger.debug("Executed SQL Query: ", query);
          cb(true, rows);
        } else {
          this._logger.error("Error of Query: " + query);
          this._logger.error(err);
          cb(false, []);
        }
      });
    });
  }

};
