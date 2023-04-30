require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("../model/connection");
const { Ligue } = require("../model/games/ligue");
const data = [
  {
    name: "Angiliya Primier Ligasi",
    countTeams: 20,
    image:
      "https://www.sport.ru/appdata/previews/199/ai_files_tags_attrs_r388_e247c7965597_jpg/e247c7965597s200x262.jpg",
  },
  {
    name: "Bundesliga",
    countTeams: 18,
    image:
      "https://e7.pngegg.com/pngimages/489/415/png-clipart-bundesliga-logo-bundesliga-logo-icons-logos-emojis-football.png",
  },
  {
    name: "La Liga",
    countTeams: 20,
    image:
      "https://e7.pngegg.com/pngimages/740/650/png-clipart-spain-2011-12-la-liga-2017-18-la-liga-2014-15-la-liga-atletico-madrid-premier-league-sport-sports.png",
  },
  {
    name: "Ligue 1",
    countTeams: 20,
    image:
      "https://e7.pngegg.com/pngimages/171/738/png-clipart-france-ligue-1-premier-league-serie-a-paris-saint-germain-f-c-mls-kodi.png",
  },
  {
    name: "Serie A",
    countTeams: 20,
    image:
      "https://www.kindpng.com/picc/m/25-254792_serie-a-logo-png-transparent-png.png",
  },
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
