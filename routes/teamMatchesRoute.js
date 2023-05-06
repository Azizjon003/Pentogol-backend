const route = require("express").Router();
const { addMatches, updateMatch } = require("../controller/matchesController");

route.route("/").post(addMatches);

module.exports = route;
