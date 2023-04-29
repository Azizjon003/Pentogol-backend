require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("../model/connection");
const { Ligue } = require("../model/games/ligue");
const { Seasson } = require("../model/games/season");
const { TeamSeason } = require("../model/games/teamSeason");
const { Match } = require("../model/games/matches");

async function initMatches() {
  await connection(process.env.DB_HOST, process.env.DB_NAME);
  const ligues = await Ligue.aggregate([
    {
      $lookup: {
        from: "seasons",
        localField: "_id",
        foreignField: "ligueId",
        pipline: [
          {
            $match: {
              startTime: { $gte: 2022 },
              endTime: { $lte: 2023 },
            },
          },
        ],
        as: "seasons",
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        seasons: { $first: "$seasons" },
      },
    },
  ]);
  console.log(ligues);
}
