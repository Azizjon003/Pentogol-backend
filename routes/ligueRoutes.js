const Router = require("express").Router();
const { getAllLigues } = require("../controller/ligueController");
Router.route("/list").get(getAllLigues);

module.exports = Router;

