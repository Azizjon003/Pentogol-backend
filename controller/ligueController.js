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