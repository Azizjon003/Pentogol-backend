const route = require("express").Router();
const { addSeasson, getSeassons } = require("../controller/seassonController");

route.route("/").post(addSeasson).get(getSeassons);

module.exports = route;
