require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("../model/connection");
const { Ligue } = require("../model/games/ligue");
const data = [
  "Angiliya Primier Ligasi",
  "Bundesliga",
  "La Liga",
  "Ligue 1",
  "Serie A",
];

async function initLigue() {
  try {
    await connection(process.env.DB_HOST, process.env.DB_NAME);
    await Ligue.deleteMany({});
    await Ligue.insertMany(data);
    console.log("Ligue init success");
  } catch (err) {
    console.log(err);
  }
}

initLigue();
