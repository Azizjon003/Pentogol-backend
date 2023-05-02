const Router = require("express").Router();
const {
  getAll
} = require("../controller/ligueController");

Router.route("/").get(getAll);
// Router.route("/:id").get(getLigue);

module.exports = Router;
