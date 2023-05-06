const route = require("express").Router();
const {
  createNews,
  getAllNews,
  getNews,
  deleteNews,
} = require("../controller/newsController");

const { upload } = require("../controller/uploadController");

route.route("/").get(getAllNews).post(upload, createNews);
route.route("/:id").get(getNews).delete(deleteNews);

module.exports = route;
