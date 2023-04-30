const { User } = require("../model/user/user");
const AppError = require("../utility/appError");

const catchAsync = require("../utility/catchAsync");
const jwt = require("jsonwebtoken");
const jwtToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const isCorrect = password === user.password;
  if (!isCorrect) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = jwtToken(user._id, user.role);
  res.status(200).json({
    status: "success",
    token,
  });
});

const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    if (req.cookies?.jwt) {
      token = req.cookies?.jwt;
    } else {
      return next(new AppError("Jwt not found", 401));
    }
  }

  if (!token) {
    return next(new AppError("Please log in", 401));
  }
  let id;
  // tokenni tekshirish kerak
  try {
    id = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
  if (!id) {
    return next(new AppError("Please log in", 401));
  }
  // user bazada bor yo'qligini tekshirib olish
  const user = await User.findById(id.id);

  if (!user) {
    return next(new AppError("User is not found", 401));
  }

  // if (id.ieat < user.passwordChangedAt.getTime() / 1000) {
  //   return next(new AppError("jwt malformet", 401));
  // }
  req.user = user;
  res.locals.user = user;
  next();
});

module.exports = {
  login,
  protect,
};
