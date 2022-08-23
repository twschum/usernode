const { v4: uuidv4 } = require("uuid");
const DatabaseConnection = require("./database_connection");

module.exports = class BaseRepository {
  constructor(name, model) {
    this._name = name;
    this._model = model;
    this._db = new DatabaseConnection();
  }

  generateId() {
    return uuidv4();
  }

  async execute(query) {
    return await this._db.executeQuery(query);
  }

  async getAll() {
    return await this._db.find({});
  }

  async getCount() {
    return await this._model.find({}).count();
  }

  async create(entity) {
    const user = new this._model(entity);
    return await user.save();
  }

  async update(id, entity) {
    let setKeys = [];
    let values = [];
    for (let k of keys) {
      if (entity.hasOwnProperty(k)) {
        setKeys.push(`${k}=?`);
        values.push(entity[k]);
      }
    }
    values.push(id);
    let query = this.formatSql(
      `update ${this._tableName} set ${setKeys.join(",")} where id =?`,
      values
    );

    let result = await this.execute(query);
    if (result && result.affectedRows === 1) {
      return {
        entity: this._tableName,
        id,
        status: "updated",
      };
    }

    return null;
  }

  async get(id) {
    return this._model.find({ pid: id });
  }

  async delete(id) {
    return this._model.delete({ pid: id });
  }
};
