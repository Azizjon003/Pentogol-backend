require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("../model/connection");
const { Ligue } = require("../model/games/ligue");
const { Teams } = require("../model/games/teams");

let data = [
  { name: "Liverpool" },
  { name: "Manchester City" },
  { name: "Manchester United" },
  { name: "Chelsea" },
  { name: "Arsenal" },
  { name: "Tottenham Hotspur" },
  { name: "Leicester City" },
  { name: "West Ham United" },
  { name: "Everton" },
  { name: "Aston Villa" },
  { name: "Leeds United" },
];
let data1 = [
  { name: "Bavariya" },
  { name: "Borussiya D" },
  { name: "Borussiya M" },
  { name: "RB Leipzig" },
  { name: "Bayer" },
  { name: "Herta" },
  { name: "Union" },
  { name: "Wolfsburg" },
  { name: "Stuttgart" },
  { name: "Freiburg" },
];
let data2 = [
  { name: "Barselona" },
  { name: "Real Madrid" },
  { name: "Atletico Madrid" },
  { name: "Sevilla" },
  { name: "Real Sociedad" },
  { name: "Real Betis" },
  { name: "Villarreal" },
  { name: "Celta Vigo" },
  { name: "Granada" },
  { name: "Athletic Bilbao" },
];
let data3 = [
  { name: "PSG" },
  { name: "Lille" },
  { name: "Lyon" },
  { name: "Monaco" },
  { name: "Marseille" },
  { name: "Rennes" },
  { name: "Montpellier" },
  { name: "Nice" },
  { name: "Reims" },
  { name: "Lens" },
];

let data4 = [
  { name: "Juventus" },
  { name: "Inter" },
  { name: "Atalanta" },
  { name: "Milan" },
  { name: "Napoli" },
  { name: "Lazio" },

  { name: "Roma" },
  { name: "Sassuolo" },
  { name: "Sampdoria" },
  { name: "Hellas Verona" },
];

const initTeams = async () => {
  await connection(process.env.DB, process.env.DB_PASS);
  await Teams.deleteMany({});
  const ligue = await Ligue.find({});
  data = data.map((el) => {
    el.ligueId = ligue[0]._id;

    return el;
  });
  data1 = data1.map((el) => {
    el.ligueId = ligue[1]._id;

    return el;
  });
  data2 = data2.map((el) => {
    el.ligueId = ligue[2]._id;

    return el;
  });
  data3 = data3.map((el) => {
    el.ligueId = ligue[3]._id;

    return el;
  });
  data4 = data4.map((el) => {
    el.ligueId = ligue[4]._id;

    return el;
  });

  await Teams.insertMany(data);
  await Teams.insertMany(data1);
  await Teams.insertMany(data2);
  await Teams.insertMany(data3);
  await Teams.insertMany(data4);
  console.log("Teams init success");
};
initTeams();
