const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");
const mongoose = require("mongoose");
const db = require("../model/connection");
const Liga = db.liga;
const Teams = db.teams;
const TeamSeason = db.teamsSeasons;

exports.getMatch = catchAsync(async (req, res, next) => {
  console.log(req.params);
  let data = await Liga.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: db.seasons,
        as: "seasons",
        include: [
          {
            model: db.teamsSeasons,
            as: "jamolar",
            include: [
              {
                model: db.teams,
                as: "team",
                attributes: ["id", "name", "image"],
              },
              {
                model: db.matches,
                as: "matches",
                where: {
                  [db.Op.and]: [
                    { awayGoal: { [db.Op.gte]: -1 } },
                  ],
                  [db.Op.and]: [
                    {
                      startTime: {
                        [db.Op.lte]: new Date(),
                        [db.Op.gte]: new Date(
                          new Date().getTime() - 8 * 24 * 60 * 60 * 1000
                        ),
                      },
                    },
                  ]
                },
              },
            ],

            attributes: ["id"],
          },
        ],
        where: {
          [db.Op.and]: [
            { startTime: { [db.Op.gte]: 2021 } },
            { endTime: { [db.Op.lte]: 2022 } },
          ],
        },
      },
    ],
    attributes: ["id", "name", "image"],
  });

  if (!data) {
    return next(new AppError("No ligue found with that ID", 404));
  }
  console.log(data.seasons[0].matches);
  let resData = [];
  for (let i = 0; i < data.seasons[0].jamolar.length; i++) {
    const match = data.seasons[0].jamolar[i].matches[0].awayTeam;
    const dataAway = await TeamSeason.findOne({
      where: {
        id: match,
      },
      include: [
        {
          model: db.teams,
          as: "team",
          attributes: ["id", "name", "image"],
        },
      ],
    });

    const obj = {
      homeTeam: data.seasons[0].jamolar[i].team.name,
      homeImage: data.seasons[0].jamolar[i].team.image,
      awayTeam: dataAway.team.name,
      awayImage: dataAway.team.image,
      homeGoal: data.seasons[0].jamolar[i].matches[0].homeGoal,
      awayGoal: data.seasons[0].jamolar[i].matches[0].awayGoal,
    };
    resData.push(obj);
  }

  res.status(200).json({
    status: "success",
    data: resData,
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

            homeTeamScore: "$matches.homeGoal",
            awayTeamScore: "$matches.awayGoal",
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
