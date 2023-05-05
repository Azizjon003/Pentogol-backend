const db = require("../model/connection");
const Liga = db.liga;
const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");

exports.getAll = catchAsync(async (req, res, next) => {
  const data = await Liga.findAll();
  console.log(data);

  res.status(200).json({
    status: "OK",
    data,
  });
});
exports.getOneLigueComands = catchAsync(async (req, res, next) => {
  const startTime = req.query.startTime || 2021;
  const endTime = req.query.endTime || 2022;
  console.log(startTime, endTime);
  const data = await Liga.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: db.seasons,
        as: "seasons",
        include: [
          {
            model: db.teamsSeasons,
            as: "jamolar",
            include: [
              {
                model: db.teams,
                as: "team",
                attributes: ["id", "name", "image"],
              },
            ],

            attributes: ["id", "teamId", "points", "goalRatio", "currentTur"],
            // orders: [["points", "DESC"]],
          },
        ],
        where: {
          [db.Op.and]: [
            { startTime: { [db.Op.gte]: startTime } },
            { endTime: { [db.Op.lte]: endTime } },
          ],
        },

        attributes: ["id", "startTime", "endTime"],
      },
    ],
    attributes: ["id", "name", "seasons.id"],
    order: [
      [
        { model: db.seasons, as: "seasons" },
        { model: db.teamsSeasons, as: "jamolar" },
        "points",
        "DESC",
      ],
      [
        { model: db.seasons, as: "seasons" },
        { model: db.teamsSeasons, as: "jamolar" },
        "goalRatio",
        "DESC",
      ],  
    ],
  });

  res.status(200).json({
    status: "OK",
    data,
  });
});
