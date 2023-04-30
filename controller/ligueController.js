const { Ligue } = require("../model/games/ligue");
const { Teams } = require("../model/games/teams");
const { TeamSeason } = require("../model/games/teamsesson");
const mongoose = require("mongoose");

const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");
exports.getAllLigues = catchAsync(async (req, res, next) => {
  const ligues = await Ligue.find();
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

exports.getLigue = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const startTime = req.query.starttime * 1;
  const endTime = req.query.endtime * 1;

  if (!startTime || !endTime) {
    return next(new AppError("Please provide start and end time", 400));
  }

  if (endTime - startTime !== 1) {
    return next(new AppError("Please provide start and end time", 400));
  }
  console.log(id);
  // Ligue modeli uchun indeks yaratish
  Ligue.collection.createIndex({ _id: 1 });

  // Teams modeli uchun indekslar yaratish
  Teams.collection.createIndex({ ligueId: 1 });
  Teams.collection.createIndex({ _id: 1 });

  // TeamSeasons modeli uchun indekslar yaratish
  TeamSeason.collection.createIndex({ teamId: 1 });
  TeamSeason.collection.createIndex({ _id: 1 });

  // Seassons modeli uchun indekslar yaratish

  const ligue = await Ligue.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
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
        from: "seassons",
        localField: "_id",
        foreignField: "ligueId",
        pipeline: [
          {
            $match: {
              startTime: { $gte: startTime },
              endTime: { $lte: endTime },
            },
          },
        ],
        as: "seassons",
      },
    },
    { $unwind: "$seassons" },
    {
      $sort: {
        "teamseasons.points": -1,
        "teamseasons.ballRatio": -1,
      },
    },

    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        teams: {
          $push: {
            name: "$teams.name",
            image: "$teams.image",
            points: "$teamseasons.points",
            ballRatio: "$teamseasons.ballRatio",
            numberMatches: "$teamseasons.numberMatches",
            IdSession: "$teamseasons._id",
          },
        },
        // seasons: "seasons",
      },
    },
  ]);
  // const ligue = await Ligue.aggregate([
  //   {
  //     $lookup: {
  //       from: "seassons",
  //       let: { ligueId: "$_id", startTime: startTime, endTime: endTime },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: {
  //               $and: [
  //                 { $eq: ["$ligueId", "$$ligueId"] },
  //                 { $gte: ["$startTime", "$$startTime"] },
  //                 { $lte: ["$endTime", "$$endTime"] },
  //               ],
  //             },
  //           },
  //         },
  //       ],
  //       as: "seassons",
  //     },
  //   },
  // ]);
  res.status(200).json({
    status: "success",
    data: ligue,
  });
});
