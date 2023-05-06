const express = require("express");
const app = express();
const ErrorHandler = require("../controller/errorHandler");
const AppError = require("../utility/appError");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/v1/liga",require("../routes/ligueRoutes"))
app.use("/api/v1/seasson",require("../routes/seassonRoute"))
app.use("/api/v1/matches",require("../routes/teamMatchesRoute"))
app.use("/api/v1/teams",require("../routes/teamsRoute"))
app.use("/api/v1/news",require("../routes/newsRoute"))
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(ErrorHandler);

module.exports = app;
