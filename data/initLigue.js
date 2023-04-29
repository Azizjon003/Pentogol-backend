require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("../model/connection");
const { Ligue } = require("../model/games/ligue");
const data = [
  { name: "Angiliya Primier Ligasi", countTeams: 20 },
  { name: "Bundesliga", countTeams: 18 },
  { name: "La Liga", countTeams: 20 },
  { name: "Ligue 1", countTeams: 20 },
  { name: "Serie A", countTeams: 20 },
];

async function initLigue() {
  try {
    await connection(process.env.DB, process.env.DB_PASS);
    await Ligue.deleteMany({});
    await Ligue.insertMany(data);
    console.log("Ligue init success");
  } catch (err) {
    console.log(err);
  }
}

initLigue();
