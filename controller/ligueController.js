const { Ligue } = require("../model/games/ligue");
const { Teams } = require("../model/games/teams");

const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");
const sortData = require("../utility/teamsSort");
exports.getAllLigues = catchAsync(async (req, res, next) => {
  const ligues = await Ligue.aggregate([
    {
      $lookup: {
        from: "teams",
        localField: "_id",
        foreignField: "ligueId",
        as: "teams",
      },
    },
    {
      $sort: {
        "Teams.points": -1,
      },
    },
  ]);

  if (ligues.length === 0 && !ligues[0]) {
    return next(new AppError("No ligues found", 404));
  }
  ligues.forEach((ligue) => {
    ligues.teams = sortData(ligue.teams);
  });
  res.status(200).json({
    status: "success",
    data: ligues,
  });
});
exports.addLigue = catchAsync(async (req, res, next) => {
  const ligue = await Ligue.create(req.body);
  res.status(201).json({
    status: "success",
    data: ligue,
  });
});
exports.updateLigue = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  let lig = await Ligue.updateOne({ _id: id }, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: lig,
  });
});

exports.getLigue = catchAsync(async (req, res, next) => {});
