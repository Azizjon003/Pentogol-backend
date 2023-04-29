const route = require("express").Router();
const {
  createNews,
  getAllNews,
  getNews,
  updateNews,
  deleteNews,
  getNewsMain,
} = require("../controller/newsController");

const { upload } = require("../controller/uploadController");
route.route("/main").get(getNewsMain);
route.route("/").get(getAllNews).post(upload, createNews);
route.route("/:id").get(getNews).patch(updateNews).delete(deleteNews);

module.exports = route;
