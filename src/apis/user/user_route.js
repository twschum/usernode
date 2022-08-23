
const express = require("express");
const UserController = require("./user_controller.js");
const UserValidator = require("./user_validator.js");
const UserRouter = express.Router();
const userController = new UserController();
const userValidator = new UserValidator();

UserRouter.route("/")
  .get(userController.index.bind(userController))
  .post(userValidator.validate.bind(userValidator), userController.create.bind(userController));

UserRouter.route("/:id")
  .get(userController.read.bind(userController))
  .put(userValidator.validate.bind(userValidator), userController.update.bind(userController))
  .delete(userController.delete.bind(userController));

module.exports ={
  router:UserRouter
}
