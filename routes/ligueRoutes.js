const Router = require("express").Router();
const {
  getAll,
  getOneLigueComands
} = require("../controller/ligueController");

Router.route("/").get(getAll);
Router.route("/:id").get(getOneLigueComands);

module.exports = Router;
