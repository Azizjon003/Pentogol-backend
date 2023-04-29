require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("../model/connection");
const { Ligue } = require("../model/games/ligue");

const { TeamSeason } = require("../model/games/teamsesson");

const randomFunc = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

async function initTeamsSeason() {
  connection(process.env.DB, process.env.DB_PASS);
  const ligue = await Ligue.aggregate([
    {
      $lookup: {
        from: "teams",
        localField: "_id",
        foreignField: "ligueId",
        as: "teams",
      },
    },
    {
      $lookup: {
        from: "seassons",
        localField: "_id",
        foreignField: "ligueId",
        as: "seassons",
      },
    },
  ]);
  // console.log(ligue);
  let data = [];
  for (let i = 0; i < ligue.length; i++) {
    console.log(ligue[i].teams[i]._id);
    let matches = randomFunc(0, 38);
    let datacha = [];
    datacha = ligue[i].teams.map((el) => {
      let datacha = {
        sessionId: ligue[i].seassons[0]._id,
        points: randomFunc(0, 90),
        ballRatio: randomFunc(-50, 100),
        numberMatches: matches,
        teamId: el._id,
      };
      return datacha;
    });
    data = [...datacha, ...data];
  }
  console.log(data[50]);
  await TeamSeason.deleteMany({});
  await TeamSeason.insertMany(data);
}

initTeamsSeason();
