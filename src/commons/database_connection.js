const Logger = require("./../utils/logger");
const mongoose = require("mongoose");

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

    let dburi = new URL("mongodb://localhost");
    dburi.protocol = "mongodb";
    dburi.hostname = global.conf.mongo.host;
    dburi.port = global.conf.mongo.port;
    dburi.username = global.conf.mongo.user;
    dburi.password = global.conf.mongo.password;
    dburi.search = "retryWrites=true";

    this._logger.info(dburi.toString());
    mongoose.connect(
      dburi.toString(),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err, database) {
        if (err) {
          throw err;
        }
        this._db = database;
      }
    );

    DatabaseConnection.instance = this;
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
