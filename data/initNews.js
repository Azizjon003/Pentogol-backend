require("dotenv").config();
require("../model/connection");

const db = require("../model/connection");
const axios = require("axios");
const cheerio = require("cheerio");

const News = db.news;

async function getNews() {
  const url = "https://tribuna.uz/news/category/zha";
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let dataNews = [];
  $(".col-md-4").each((i, el) => {
    const tittle = $(el).find(".title").text();
    const link = $(el).find(".title").attr("href");
    const image = $(el).find(".img").attr("src");
    dataNews.push({
      tittle,
      link,
      image,
    });
  });
  const base = "https://tribuna.uz";
  let newData = [];
  for (let i = 0; i < dataNews.length; i++) {
    const { data } = await axios.get(base + dataNews[i].link);
    const $ = cheerio.load(data);
    const description = $(".richtextbox").text().trim();
    newData.push({
      title: dataNews[i].tittle,
      image: dataNews[i].image,
      description,
    });
  }
  await News.bulkCreate(newData);
}
getNews();
