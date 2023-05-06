const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");
const db = require("../model/connection");
const TeamSeason = db.teamsSeasons;

exports.AddTeamSession = catchAsync(async (req, res, next) => {
 
  const seassonId = req.params.id;
 

  console.log(req.body);
  const teams = req.body.teams;
  let data = teams.map((team) => {
    return {
      teamId: team,
      sessionId: seassonId,
      numberMatches: 0,
      points: 0,
      ballRatio: 0,
      ligaId: req.body.ligaId,
    };
  });

  let team = []
  for (let i = 0; i < data.length; i++) {
    let datacha = await TeamSeason.create(data[i]);
    team.push(datacha);
  }
  res.status(200).json({
    status: "success",
    data: team,
  });
});
