const { Sequelize, DataTypes, Op } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  "postgres",
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Authentication successful");
  })
  .catch((er) => {
    console.log(er);
  });

let db = {};
db.sequelize = sequelize;
db.Op = Op;

db.liga = require("./liga")(sequelize,DataTypes);
db.seasons = require("./season")(sequelize,DataTypes);
db.teams = require("./teams")(sequelize,DataTypes);
db.teamsSeasons = require("./temsSeasons")(sequelize,DataTypes);
db.matches = require("./matches")(sequelize,DataTypes);

//db.liga joined start
db.liga.belongsTo(db.teams, {
  foreignKey: "ligaId",
  targetKey: "id",
});
db.liga.belongsTo(db.seasons, {
  foreignKey: "ligaId",
  targetKey: "id",
});
db.liga.belongsTo(db.teamsSeasons, {
  foreignKey: "ligaId",
  targetKey: "id",
});
// db.liga joined end

//db.seasons joined start
db.seasons.belongsTo(db.teamsSeasons, {
  foreignKey: "seasonId",
  targetKey: "id",
});
// db.seasons joined end

//db.teams joined start
db.teams.belongsTo(db.teamsSeasons, {
  foreignKey: "teamId",
  targetKey: "id",
});

// db.teams joined end

//db.teamsSeasons joined start
db.teamsSeasons.belongsTo(db.matches,{
  foreignKey: "homeTeam",
  targetKey: "id",
})
// db.teamsSeasons joined end

// db.sequelize.sync({
//   alter:true,
//   force:true,
// }).then(()=>{
//   console.log("saqlandi")
// }).catch(er=>{
//   console.log(err)
// })


module.exports = db;
