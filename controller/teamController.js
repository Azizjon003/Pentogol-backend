const { Teams } = require("../model/games/teams");

const { Ligue } = require("../model/games/ligue");
const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");

exports.AddTeam = catchAsync(async (req, res, next) => {
  const ligueId = req.params.ligId;
  if (mongoose.Types.ObjectId.isValid(ligueId) === false) {
    return next(new AppError("No ligue found with that ID", 404));
  }

  const ligue = await Ligue.findById(req.params.ligId);
  if (!ligue) {
    return next(new AppError("No ligue found with that ID", 404));
  }

  console.log(req.body);
  req.body.ligueId = req.params.ligId;
  req.body.image = "erali";
  const team = await Teams.create(req.body);
  res.status(201).json({
    status: "success",
    data: team,
  });
});
