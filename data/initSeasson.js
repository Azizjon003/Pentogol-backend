
require("dotenv").config();
const db = require("../model/connection");
require("../model/connection");
const Liga = db.liga;
const Seasson = db.seasons;
let data = [
  {
    startTime: new Date("08-09-2021"),
    endTime: new Date("05-06-2022"),
  },
  {
    startTime: new Date("2022-08-13"),
    endTime: new Date("05-06-2023"),
  },
];
let data1 = [
  {
    startTime: new Date("08-09-2021"),
    endTime: new Date("05-06-2022"),
  },
  {
    startTime: new Date("2022-08-13"),
    endTime: new Date("05-06-2023"),
  },
];
let data2 = [
  {
    startTime: new Date("08-09-2021"),
    endTime: new Date("05-06-2022"),
  },
  {
    startTime: new Date("2022-08-13"),
    endTime: new Date("05-06-2023"),
  },
];
let data3 = [
  {
    startTime: new Date("08-09-2021"),
    endTime: new Date("05-06-2022"),
  },
  {
    startTime: new Date("2022-08-13"),
    endTime: new Date("05-06-2023"),
  },
];
let data4 = [
  {
    startTime: new Date("08-09-2021"),
    endTime: new Date("05-06-2022"),
  },
  {
    startTime: new Date("2022-08-13"),
    endTime: new Date("05-06-2022"),
  },
];

async function initSeasson() {


  const ligue = await Liga.findAll({});
  console.log(ligue[0]);
  data = data.map((el) => {
    el.ligaId = ligue[0].dataValues.id;
    el.startTime = new Date(el.startTime).getFullYear();
    el.endTime = new Date(el.endTime).getFullYear();
    return el;
  });
  console.log(data);
  data1 = data1.map((el) => {
    el.ligaId = ligue[1].dataValues.id;

    el.startTime = new Date(el.startTime).getFullYear();
    el.endTime = new Date(el.endTime).getFullYear();
    return el;
  });
  data2 = data2.map((el) => {
    el.ligaId = ligue[2].dataValues.id;

    el.startTime = new Date(el.startTime).getFullYear();
    el.endTime = new Date(el.endTime).getFullYear();
    return el;
  });
  data3 = data3.map((el) => {
    el.ligaId = ligue[3].dataValues.id;

    el.startTime = new Date(el.startTime).getFullYear();
    el.endTime = new Date(el.endTime).getFullYear();
    return el;
  });
  data4 = data4.map((el) => {
    el.ligaId = ligue[4].dataValues.id;

    el.startTime = new Date(el.startTime).getFullYear();
    el.endTime = new Date(el.endTime).getFullYear();
    return el;
  });
  console.log(data)
  await Seasson.bulkCreate(data);
  await Seasson.bulkCreate(data1);
  await Seasson.bulkCreate(data2);
  await Seasson.bulkCreate(data3);
  await Seasson.bulkCreate(data4);
}

initSeasson();
