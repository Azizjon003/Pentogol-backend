const AppError = require("./appError");

const catchAsync = (fn) => {
  return async (req, res, next) => {
    await fn(req, res, next).catch((err) => {
      console.error(err);
      next(new AppError(err.message, err.statusCode));
    });
  };
};

module.exports = catchAsync;
