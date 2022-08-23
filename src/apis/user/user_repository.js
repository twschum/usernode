const BaseRepository = require("../../commons/base_repository");
const UserSchema = require("./user_schema");

module.exports = class UserRepository extends BaseRepository {
  constructor() {
    super("user", UserSchema.User);
  }

  async get(id) {
    let profile = super.get(id);
    // TODO live weather lookup
    return (profile.weather = "hot");
  }
};
