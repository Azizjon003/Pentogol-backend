const Router = require("express").Router();
const { login } = require("../controller/auth");

Router.route("/login").post(login);

module.exports = Router;
