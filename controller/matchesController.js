const db = require("../model/connection");
const Match = db.matches;
const TeamSeason = db.teamsSeasons;

const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");

exports.addMatches = catchAsync(async (req, res, next) => {
  const home = req.body.home;
  const away = req.body.away;
  const startTime = req.body.startTime;
  let homeGoals;
  let awayGoals;
  const Home = await TeamSeason.findOne({
    where: {
      id: home,
    },
  });
  const Away = await TeamSeason.findOne({
    where: {
      id: away,
    },
  });
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
    Home.points = Home.points + 3;
    Home.ballRatio = Home.ballRatio + awayGoals - homeGoals;
    await Home.save();

    Away.ballRatio = Away.ballRatio + awayGoals - homeGoals;
    await Away.save();
  }
  if (homeGoals < awayGoals) {
    Home.points = Home.points;
    Home.ballRatio = Home.ballRatio + homeGoals - awayGoals;
    await Home.save();

    Away.points = Away.points + 3;
    Away.ballRatio = Away.ballRatio + awayGoals - homeGoals;
    await Away.save();
  }
  if (homeGoals === awayGoals && startTime < Date.now()) {
    Home.points = Home.points + 1;
    // Home.ballRatio = Home.ballRatio + homeGoals - awayGoals;
    await Home.save();

    Away.points = Away.points + 1;
    // Away.ballRatio = Away.ballRatio + awayGoals - homeGoals;
    await Away.save();
  }
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
  const create = await Match.update(
    {
      home: home,
      away: away,
      homeGoal: homeGoals,
      awayGoal: awayGoals,
      startTime: startTime,
    },
    { home: home, away: away }
  );
  const data = await Match.findOne({
    where:{
      home:home,
    }
  })
  res.status(200).json({
    status: "success",
    data: data,
  });
});
