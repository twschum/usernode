
const Joi = require('joi');

module.exports = class UserSchema {
    static getSchema() {
        throw new Error("Not implemented method");
        // return Joi.object().keys({
        //     name: Joi.string().required().max(150),
        //     email: Joi.string().max(250),
        //     age: Joi.number().required()
        // });
    }
};
