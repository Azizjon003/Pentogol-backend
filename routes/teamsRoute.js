const route = require("express").Router();
const {
  AddTeam,
  getMatch,
  getFeatureMatch,
  getTeamsNoFull,
} = require("../controller/teamController");

route.route("/:ligId/add").post(AddTeam);

route.route("/:ligid").get(getMatch);

route.route("/teamsoff/:id").post(getTeamsNoFull);
route.route("/featured/:ligid").get(getFeatureMatch);

module.exports = route;
