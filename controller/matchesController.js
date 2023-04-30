const { Ligue } = require("../model/games/ligue");
const { Teams } = require("../model/games/teams");
const { TeamSeason } = require("../model/games/teamsesson");
const { Match } = require("../model/games/matches");

const catchAsync = require("../utility/catchAsync");

exports.addMatches = catchAsync(async (req, res, next) => {
  const home = req.body.home;
  const away = req.body.away;
  const startTime = req.body.startTime;
  let homeGoals;
  let awayGoals;
  if (new Date(startTime).getTime() > new Date().getTime()) {
    homeGoals = 0;
    awayGoals = 0;
    const create = await Match.create({
      homeTeam: home,
      awayTeam: away,
      homeGoal: homeGoals,
      awayGoal: awayGoals,
      startTime: startTime,
    });
    return res.status(200).json({
      status: "success",
    });
  } else {
    homeGoals = req.body.homeGoal || 0;
    awayGoals = req.body.awayGoal || 0;
  }
  if (homeGoals > awayGoals) {
    await TeamSeason.updateOne(
      { _id: home },
      { $inc: { points: 3, ballRatio: homeGoals - awayGoals } },
      {
        new: true,
        runValidators: true,
      }
    );
    await TeamSeason.updateOne(
      { _id: away },
      { $inc: { points: 3, ballRatio: awayGoals - homeGoals } },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  if (homeGoals < awayGoals) {
    await TeamSeason.updateOne(
      { _id: away },
      { $inc: { points: 3, ballRatio: awayGoals - homeGoals } },
      {
        new: true,
        runValidators: true,
      }
    );
    await TeamSeason.updateOne(
      { _id: home },
      { $inc: { ballRatio: awayGoals - homeGoals } },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  if (homeGoals === awayGoals && startTime < Date.now()) {
    await TeamSeason.updateOne(
      { _id: home },
      { $inc: { points: 1, ballRatio: 1 } },
      {
        new: true,
        runValidators: true,
      }
    );
    await TeamSeason.updateOne(
      { _id: away },
      { $inc: { points: 1, ballRatio: 1 } },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  console.log(home);
  const create = await Match.create({
    homeTeam: home,
    awayTeam: away,
    homeGoal: homeGoals,
    awayGoal: awayGoals,
    startTime: startTime,
  });
  console.log(create);
  res.status(200).json({
    status: "success",
  });
});
exports.updateMatch = catchAsync(async (req, res, next) => {
  const home = req.body.home;
  const away = req.body.away;
  const startTime = req.body.startTime;
  const homeGoals = req.body.homeGoals;
  const awayGoals = req.body.awayGoals;
  if (startTime > Date.now()) {
    return next(new AppError("Match is not updated yet", 400));
  }
  const create = await Match.updateOne(
    { home: home, away: away },
    {
      home: home,
      away: away,
      homeGoal: homeGoals,
      awayGoal: awayGoals,
      startTime: startTime,
    }
  );
  res.status(200).json({
    status: "success",
    data: create,
  });
});
