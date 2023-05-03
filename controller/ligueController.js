const db =  require('../model/connection');
const Liga =  db.liga
const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");

exports.getAll = catchAsync(async(req,res,next)=>{
  const data  =  await Liga.findAll()
  console.log(data)

  res.status(200).json({
    status:"OK",
    data
  })
})
exports.getOneLigueComands = catchAsync(async(req,res,next)=>{
  const startTime = req.query.startTime || new Date().getFullYear()-1;
  const endTime = req.query.endTime || new Date().getFullYear() ;
  console.log(startTime,endTime)
  const data  = await Liga.findByPk(req.params.id,{
    include:[
      {
        model:db.seasons,
        as:"seasons",
        include:[
          {
            model:db.teamsSeasons,
            as:"jamolars",
          }
        ],
        where:{
          [db.Op.and]:[
            {startTime:{[db.Op.gte]:startTime}},
            {endTime:{[db.Op.lte]:endTime}}
          ]
        }
      }
    ]
  })

  res.status(200).json({
    status:"OK",
    data
  })
})