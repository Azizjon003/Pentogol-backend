const db = require("../model/connection");
const Seasson = db.seasons;
const Teams = db.teams;
const Liga = db.liga;
const TeamsSeasons = db.teamsSeasons;
const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");

exports.addSeasson = catchAsync(async (req, res, next) => {
  const startDate = new Date(req.body.startTime).getFullYear();
  const endDate = new Date(req.body.endTime).getFullYear();
  console.log(startDate, endDate);
  if (endDate - startDate !== 1) {
    return next(new AppError("Invalid date", 400));
  }

  const data = await Seasson.findOne({
    where: {
      ligaId: req.body.ligaId,
      startTime: startDate,
      endTime: endDate,
    },
  });
  console.log("Salom", data);
  if (data) {
    return next(new AppError("Seasson already exist", 400));
  }
  console.log(req.body);
  console.log(endDate);
  const seasson = await Seasson.create({
    ligaId: req.body.ligaId,
    startTime: startDate,
    endTime: endDate,
  });
  res.status(201).json({
    status: "success",
    data: seasson,
  });
});
exports.getSeassons = catchAsync(async (req, res, next) => {
  const seassons = await Seasson.findAll({
    include: [
      {
        model: Liga,
        as: "liga",
      },
    ],
  });
  res.status(200).json({
    status: "success",
    data: seassons,
  });
});
