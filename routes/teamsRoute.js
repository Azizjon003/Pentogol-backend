const route = require("express").Router();
const {
  AddTeam,
  getMatch,
  getFeatureMatch,
} = require("../controller/teamController");
route.route("/:ligId/add").post(AddTeam);
route.route("/:ligid").get(getMatch);
route.route("/featured/:ligid").get(getFeatureMatch);
module.exports = route;
