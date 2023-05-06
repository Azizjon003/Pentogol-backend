require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("../model/connection");
require("../model/connection");
const db = require("../model/connection");
const sequelize = db.sequelize;
const Liga = db.liga;
const Seasson = db.seasons;
const TeamSeason = db.teamsSeasons;
const Teams = db.teams;

const randomFunc = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

async function initTeamsSeason() {
  const ligue = await Liga.findAll({
    include: [
      {
        model: Seasson,
        as: "seasons",
      }
      ,
      {
        model: Teams,
        as: "teams",
      }
    ],

  });
  // console.log(ligue[0]);

  let data = [];
  for (let i = 0; i < ligue.length; i++) {
    console.log(ligue[i].teams[i].id);
    
    let datacha = [];
    datacha = ligue[i].teams.map((el) => {
      let datacha = {
        sessionId: ligue[i].seasons[0].id,
        points: 0,
        ballRatio: 0,
        numberMatches:0,
        ligaId: ligue[i].id,
        teamId: el.id,
      };
      return datacha;
    });
    data = [...datacha, ...data];
  }
  console.log(data[50]);
  
   await TeamSeason.bulkCreate(data);
}

module.exports = initTeamsSeason;