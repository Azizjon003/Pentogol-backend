const { Teams } = require("../model/games/teams");

const { Ligue } = require("../model/games/ligue");
const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");
const mongoose = require("mongoose");
const { TeamSeason } = require("../model/games/teamsesson");

exports.AddTeam = catchAsync(async (req, res, next) => {
  const ligueId = req.params.ligId;
  if (mongoose.Types.ObjectId.isValid(ligueId) === false) {
    return next(new AppError("No ligue found with that ID", 404));
  }
  const teams = await Teams.find({ ligueId: ligueId, name: req.body.name });
  if (teams) {
    return next(new AppError("Team already exist", 404));
  }
  req.body.ligueId = req.params.ligId;
  const team = await Teams.create(req.body);
  res.status(201).json({
    status: "success",
    data: team,
  });
});

exports.getMatch = catchAsync(async (req, res, next) => {
  console.log(req.params);
  let ligues = await Ligue.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.ligid),
      },
    },
    {
      $lookup: {
        from: "seassons",
        localField: "_id",
        foreignField: "ligueId",
        pipeline: [
          {
            $match: {
              startTime: { $gte: 2022 },
              endTime: { $lte: 2023 },
            },
          },
        ],
        as: "seassons",
      },
    },
    {
      $unwind: "$seassons",
    },
    {
      $lookup: {
        from: "teams",
        localField: "_id",
        foreignField: "ligueId",
        as: "teams",
      },
    },
    {
      $unwind: "$teams",
    },
    {
      $lookup: {
        from: "teamseasons",
        localField: "teams._id",
        foreignField: "teamId",
        as: "teamseasons",
      },
    },
    {
      $unwind: "$teamseasons",
    },
    {
      $lookup: {
        from: "matches",
        localField: "teamseasons._id",
        foreignField: "homeTeam",
        pipeline: [
          {
            $match: {
              startTime: {
                $lte: new Date(),
              },
            },
          },
        ],
        as: "matches",
      },
    },
    {
      $unwind: "$matches",
    },

    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        scores: {
          $push: {
            homeTeam: "$matches.homeTeam",
            homeTeamName: "$teams.name",
            homeTeamId: "$teams._id",
            homeImage: "$teams.image",
            awayTeam: "$matches.awayTeam",
            homeTeamScore: "$matches.homeGoal",
            awayTeamScore: "$matches.awayGoal",
            startTime: "$matches.startTime",
          },
        },
      },
    },
  ]);

  console.log(ligues);
  if (ligues.length === 0) {
    return next(new AppError("No ligue found with that ID", 404));
  }
  for (let i = 0; i < ligues[0].scores.length; i++) {
    const awayTeam = await TeamSeason.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(ligues[0].scores[i].awayTeam),
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "teamId",
          foreignField: "_id",
          as: "teams",
        },
      },
      {
        $unwind: "$teams",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$teams.name" },
          teamId: { $first: "$teams._id" },
          awayImage: { $first: "$teams.image" },
        },
      },
    ]);
    console.log(awayTeam);
    ligues[0].scores[i].awayTeamName = awayTeam[0].name;
    ligues[0].scores[i].awayTeamId = awayTeam[0].teamId;
    ligues[0].scores[i].awayImage = awayTeam[0].awayImage;
  }

  res.status(200).json({
    status: "success",
    data: ligues,
  });
});
exports.getFeatureMatch = catchAsync(async (req, res, next) => {
  const ligues = await Ligue.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.ligid),
      },
    },
    {
      $lookup: {
        from: "seassons",
        localField: "_id",
        foreignField: "ligueId",
        pipeline: [
          {
            $match: {
              startTime: { $gte: 2022 },
              endTime: { $lte: 2023 },
            },
          },
        ],
        as: "seassons",
      },
    },
    {
      $unwind: "$seassons",
    },
    {
      $lookup: {
        from: "teams",
        localField: "_id",
        foreignField: "ligueId",
        as: "teams",
      },
    },
    {
      $unwind: "$teams",
    },
    {
      $lookup: {
        from: "teamseasons",
        localField: "teams._id",
        foreignField: "teamId",
        as: "teamseasons",
      },
    },
    { $unwind: "$teamseasons" },
    {
      $lookup: {
        from: "matches",
        localField: "teamseasons._id",
        foreignField: "homeTeam",
        pipeline: [
          {
            $match: {
              startTime: {
                $gte: new Date(),
              },
            },
          },
        ],
        as: "matches",
      },
    },
    {
      $unwind: "$matches",
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        scores: {
          $push: {
            homeTeam: "$matches.homeTeam",
            homeTeamName: "$teams.name",
            homeTeamId: "$teams._id",

            awayTeam: "$matches.awayTeam",

            homeTeamScore: "$matches.homeTeam",
            awayTeamScore: "$matches.awayTeam",
            startTime: "$matches.startTime",
          },
        },
      },
    },
  ]);

  if (!ligues[0]) {
    return next(new AppError("No match", 404));
  }

  for (let i = 0; i < ligues[0].scores.length; i++) {
    const awayTeam = await TeamSeason.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(ligues[0].scores[i].awayTeam),
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "teamId",
          foreignField: "_id",
          as: "teams",
        },
      },
      {
        $unwind: "$teams",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$teams.name" },
          teamId: { $first: "$teams._id" },
        },
      },
    ]);
    console.log(awayTeam);
    ligues[0].scores[i].awayTeamName = awayTeam[0].name;
    ligues[0].scores[i].awayTeamId = awayTeam[0].teamId;
  }
  res.status(200).json({
    status: "success",
    data: ligues,
  });
});

exports.getTeamsNoFull = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid id", 404));
  }

  const teams = await Team.find({ ligueId: req.params.id });
  if (!teams) {
    return next(new AppError("No team found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: teams,
  });
});
