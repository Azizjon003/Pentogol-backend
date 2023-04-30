const Router = require("express").Router();
const {
  getAllLigues,
  addLigue,
  getLigue,
} = require("../controller/ligueController");

Router.route("/list").get(getAllLigues);
Router.route("/list/:id").get(getLigue);

module.exports = Router;
