const express = require("express");
const app = express();
const ErrorHandler = require("../controller/errorHandler");
const AppError = require("../utility/appError");
const morgan = require("morgan");

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/ligues", require("../routes/ligueRoutes"));
app.use("/api/v1/teams", require("../routes/teamsRoute"));
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(ErrorHandler);

module.exports = app;
