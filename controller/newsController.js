const { Ligue } = require("../model/games/ligue");
const { Teams } = require("../model/games/teams");
const { News } = require("../model/news/news");
const mongoose = require("mongoose");

const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");

exports.getAllNews = catchAsync(async (req, res, next) => {
  let news = await News.find({}).sort({ createdAt: -1 });

  news = news.map((el) => {
    return {
      _id: el._id,
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
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(new AppError("Bunday yangilik mavjud emas", 404));

  const news = await News.findById(req.params.id);
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

exports.updateNews = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(new AppError("Bunday yangilik mavjud emas", 404));

  const data = await News.findOne({ _id: id });
  const file = req.imageUrl;
  req.body.image = file || data.image;

  await News.updateOne({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  const product = await News.findOne({ _id: id });
  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.deleteNews = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(new AppError("Bunday yangilik mavjud emas", 404));

  await News.deleteOne({ _id: id });
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
