const route = require("express").Router();
const { addMatches, updateMatch } = require("../controller/matchesController");

route.route("/").post(addMatches).patch(updateMatch);

module.exports = route;
