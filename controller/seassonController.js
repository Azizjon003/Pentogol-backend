const { Teams } = require("../model/games/teams");

const { Ligue } = require("../model/games/ligue");
const { Seasson } = require("../model/games/season");
const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");
const mongoose = require("mongoose");
exports.addSeasson = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.ligueId)) {
    return next(new AppError("Invalid ligue id", 400));
  }
  const startDate = new Date(req.body.startTime).getFullYear();
  const endDate = new Date(req.body.endTime).getFullYear();
  console.log(startDate, endDate);
  if (endDate - startDate !== 1) {
    return next(new AppError("Invalid date", 400));
  }

  const data = await Seasson.findOne({
    ligueId: req.body.ligueId,
    startTime: startDate,
    endTime: endDate,
  });
  console.log("Salom", data);
  if (data) {
    return next(new AppError("Seasson already exist", 400));
  }
  console.log(req.body);
  console.log(endDate);
  const seasson = await Seasson.create({
    ligueId: req.body.ligueId,
    startTime: startDate,
    endTime: endDate,
  });
  res.status(201).json({
    status: "success",
    data: seasson,
  });
});
exports.getSeassons = catchAsync(async (req, res, next) => {
  const seassons = await Seasson.find();
  res.status(200).json({
    status: "success",
    data: seassons,
  });
});
