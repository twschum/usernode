
const { to } = require("await-to-js");
const BaseController = require("../../commons/base_controller");
const ErrorHandler = require('../../utils/error_handler');
const UserRepository = require("./user_repository");

module.exports = class UserController extends BaseController {
  constructor() {
    super("user", new UserRepository());
  }
};
