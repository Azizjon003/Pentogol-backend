const route = require("express").Router();
const { AddTeam } = require("../controller/teamController");
route.route("/:ligId/add").post(AddTeam);
module.exports = route;
