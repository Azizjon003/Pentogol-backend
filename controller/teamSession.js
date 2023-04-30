const { Teams } = require("../model/games/teams");

const { Ligue } = require("../model/games/ligue");
const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");
const mongoose = require("mongoose");
const { TeamSeason } = require("../model/games/teamsesson");

exports.AddTeamSession = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const seassonId = req.params.id;
  if (mongoose.Types.ObjectId.isValid(seassonId) === false) {
    return next(new AppError("No seasson found with that ID", 404));
  }

  console.log(req.body);
  const teams = req.body.teams;
  let data = teams.map((team) => {
    return {
      teamId: team,
      sessionId: seassonId,
      numberMatches: 0,
      points: 0,
      ballRatio: 0,
    };
  });

  let team = [];
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let datacha = await TeamSeason.create(data[i]);
    team.push(datacha);
  }
  res.status(200).json({
    status: "success",
    data: team,
  });
});
