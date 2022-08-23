
const BaseValidator = require("../../commons/base_validator");
const UserSchema = require("./user_schema");

module.exports = class UserValidator extends BaseValidator {
    constructor() {
        super("user", UserSchema.getSchema());
    }
};
