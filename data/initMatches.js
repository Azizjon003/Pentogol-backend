require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("../model/connection");
const { Ligue } = require("../model/games/ligue");
const { Seasson } = require("../model/games/season");
const { TeamSeason } = require("../model/games/teamsesson");
const { Match } = require("../model/games/matches");
const { Score } = require("../model/games/score");

async function initMatches() {
  await connection(process.env.DB, process.env.DB_PASS);
  const ligues = await Ligue.aggregate([
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
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        teams: {
          $push: {
            name: "$teams.name",
            image: "$teams.image",
            teamSessionId: "$teamseasons._id",
          },
        },
      },
    },
  ]);
  const matches = [];
  for (let i = 0; i < ligues[0].teams.length / 2; i++) {
    let data = ligues[0];
    let team1 = data.teams[randomFunc(0, data.teams.length - 1)].teamSessionId;
    let team2 = data.teams[randomFunc(0, data.teams.length - 1)].teamSessionId;
    let match = {
      homeTeam: team1,
      awayTeam: team2,
      startTime: new Date(),
    };
    let matcha = await Match.create(match);
    let score = await Score.create({
      homeTeam: randomFunc(0, 5),
      awayTeam: randomFunc(0, 5),
      matchId: matcha._id,
    });
  }
  for (let i = 0; i < ligues[1].teams.length / 2; i++) {
    let data = ligues[1];
    let team1 = data.teams[randomFunc(0, data.teams.length - 1)].teamSessionId;
    let team2 = data.teams[randomFunc(0, data.teams.length - 1)].teamSessionId;
    let match = {
      homeTeam: team1,
      awayTeam: team2,
      startTime: new Date(),
    };
    let matcha = await Match.create(match);
    let score = await Score.create({
      homeTeam: randomFunc(0, 5),
      awayTeam: randomFunc(0, 5),
      matchId: matcha._id,
    });
  }
  for (let i = 0; i < ligues[2].teams.length / 2; i++) {
    let data = ligues[2];
    let team1 = data.teams[randomFunc(0, data.teams.length - 1)].teamSessionId;
    let team2 = data.teams[randomFunc(0, data.teams.length - 1)].teamSessionId;
    let match = {
      homeTeam: team1,
      awayTeam: team2,
      startTime: new Date(),
    };
    let matcha = await Match.create(match);
    let score = await Score.create({
      homeTeam: randomFunc(0, 5),
      awayTeam: randomFunc(0, 5),
      matchId: matcha._id,
    });
  }

  for (let i = 0; i < ligues[3].teams.length / 2; i++) {
    let data = ligues[3];
    let team1 = data.teams[randomFunc(0, data.teams.length - 1)].teamSessionId;
    let team2 = data.teams[randomFunc(0, data.teams.length - 1)].teamSessionId;
    let match = {
      homeTeam: team1,
      awayTeam: team2,
      startTime: new Date(),
    };
    let matcha = await Match.create(match);
    let score = await Score.create({
      homeTeam: randomFunc(0, 5),
      awayTeam: randomFunc(0, 5),
      matchId: matcha._id,
    });
  }
  for (let i = 0; i < ligues[4].teams.length / 2; i++) {
    let data = ligues[4];
    let team1 = data.teams[randomFunc(0, data.teams.length - 1)].teamSessionId;
    let team2 = data.teams[randomFunc(0, data.teams.length - 1)].teamSessionId;
    let match = {
      homeTeam: team1,
      awayTeam: team2,
      startTime: new Date(),
    };
    let matcha = await Match.create(match);
    let score = await Score.create({
      homeTeam: randomFunc(0, 5),
      awayTeam: randomFunc(0, 5),
      matchId: matcha._id,
    });
  }
  console.log("matches created");
}
const randomFunc = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
initMatches();
