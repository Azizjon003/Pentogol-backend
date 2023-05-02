require("dotenv").config();
require("../model/connection")

const db  = require("../model/connection")

const Liga =  db.liga
const data = [
  {
    name: "Angiliya Primier Ligasi",
    image:"https://www.sport.ru/appdata/previews/199/ai_files_tags_attrs_r388_e247c7965597_jpg/e247c7965597s200x262.jpg",
  },
  {
    name: "Bundesliga",
    image:"https://e7.pngegg.com/pngimages/489/415/png-clipart-bundesliga-logo-bundesliga-logo-icons-logos-emojis-football.png",
  },
  {
    name: "La Liga",
    image:"https://e7.pngegg.com/pngimages/740/650/png-clipart-spain-2011-12-la-liga-2017-18-la-liga-2014-15-la-liga-atletico-madrid-premier-league-sport-sports.png",
  },
  {
    name: "Liga 1",
    image: "https://e7.pngegg.com/pngimages/171/738/png-clipart-france-ligue-1-premier-league-serie-a-paris-saint-germain-f-c-mls-kodi.png",
  },
  {
    name: "Serie A",

    image:  "https://www.kindpng.com/picc/m/25-254792_serie-a-logo-png-transparent-png.png",
  },
];

async function initLigue() {
  try {
  
    await Liga.bulkCreate(data);
    console.log("created successfully")
   
  } catch (err) {
    console.log(err);
  }
}

initLigue();
