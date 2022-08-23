
const BaseRepository = require("../../commons/base_repository");
const UserSchema = require("./user_schema");

module.exports = class UserRepository extends BaseRepository {
  constructor() {
    super("user", UserSchema.getSchema());
  }
};
