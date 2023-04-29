const Router = require("express").Router();
const {
  getAllLigues,
  addLigue,
  getLigue,
} = require("../controller/ligueController");
const { validate } = require("../controller/validation");
const { addLigueValdiation } = require("../validation/ligue");
Router.route("/list").get(getAllLigues);

Router.route("/list/:id").get(getLigue);
Router.route("/add").post(validate(addLigueValdiation), addLigue);

module.exports = Router;
