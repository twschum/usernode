const BaseRepository = require("../../commons/base_repository");
const UserSchema = require("./user_schema");
const FetchWeather = require("../../utils/weather");
const weather = require("../../utils/weather");

module.exports = class UserRepository extends BaseRepository {
  constructor() {
    super("user", UserSchema.User);
  }

  async get(id) {
    let profile = super.get(id);
    // add in the weather lookup based on coordids
    weather = FetchWeather(profile.latitude, profile.longitude);
    profile.weather = weather;
    return profile;
  }
};
