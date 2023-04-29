const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

app.use("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
