require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("../model/connection");
const { Ligue } = require("../model/games/ligue");
const { Seasson } = require("../model/games/season");
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
  await connection(process.env.DB, process.env.DB_PASS);
  await Seasson.deleteMany({});
  const ligue = await Ligue.find({});
  data = data.map((el) => {
    el.ligueId = ligue[0]._id;
    el.startTime = new Date(el.startTime).getFullYear();
    el.endTime = new Date(el.endTime).getFullYear();
    return el;
  });
  console.log(data);
  data1 = data1.map((el) => {
    el.ligueId = ligue[1]._id;

    el.startTime = new Date(el.startTime).getFullYear();
    el.endTime = new Date(el.endTime).getFullYear();
    return el;
  });
  data2 = data2.map((el) => {
    el.ligueId = ligue[2]._id;

    el.startTime = new Date(el.startTime).getFullYear();
    el.endTime = new Date(el.endTime).getFullYear();
    return el;
  });
  data3 = data3.map((el) => {
    el.ligueId = ligue[3]._id;

    el.startTime = new Date(el.startTime).getFullYear();
    el.endTime = new Date(el.endTime).getFullYear();
    return el;
  });
  data4 = data4.map((el) => {
    el.ligueId = ligue[4]._id;

    el.startTime = new Date(el.startTime).getFullYear();
    el.endTime = new Date(el.endTime).getFullYear();
    return el;
  });
  await Seasson.insertMany(data);
  await Seasson.insertMany(data1);
  await Seasson.insertMany(data2);
  await Seasson.insertMany(data3);
  await Seasson.insertMany(data4);
}

initSeasson();
