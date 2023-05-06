const db = require("../model/connection");
const News = db.news;

const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");

exports.getAllNews = catchAsync(async (req, res, next) => {
  let news = await News.findAll();

  news = news.map((el) => {
    return {
      id: el.id,
      title: el.title,
      image: el.image,
      description: el.description,
      createdAt: el.createdAt,
      when: Math.floor(new Date().getTime() - new Date(el.createdAt)),
    };
  });
  res.status(200).json({
    status: "success",
    data: news,
  });
});
exports.getNews = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const news = await News.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!news) return next(new AppError("Bunday yangilik mavjud emas", 404));
  res.status(200).json({
    status: "success",
    data: news,
  });
});
exports.createNews = catchAsync(async (req, res, next) => {
  const imageUrl =
    req.imageUrl ||
    "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
  req.body.image = imageUrl;

  const news = await News.create(req.body);
  res.status(201).json({
    status: "success",
    data: news,
  });
});

exports.deleteNews = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await News.destroy({
    where: {
      id: id,
    },
  });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.getNewsMain = catchAsync(async (req, res, next) => {
  const news = await News.find({
    newsType: false,
  });
  res.status(200).json({
    status: "success",
    data: news,
  });
});
