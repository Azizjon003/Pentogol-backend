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

db.liga = require("./liga")(sequelize, DataTypes);
db.seasons = require("./season")(sequelize, DataTypes);
db.teams = require("./teams")(sequelize, DataTypes);
db.teamsSeasons = require("./temsSeasons")(sequelize, DataTypes);
db.matches = require("./matches")(sequelize, DataTypes);

db.liga.hasMany(db.seasons, {
  foreignKey: "ligaId",
  as: "seasons",
});
db.seasons.belongsTo(db.liga, {
  foreignKey: "ligaId",
  as: "liga",
});

db.seasons.hasMany(db.teamsSeasons, {
  foreignKey: "sessionId",
  as: "jamolar",
});
db.liga.hasMany(db.teamsSeasons, {
  foreignKey: "ligaId",
  as: "jamolar",
});
db.teamsSeasons.belongsTo(db.liga, {
  foreignKey: "ligaId",
  as: "liga",
});

db.teamsSeasons.belongsTo(db.seasons, {
  foreignKey: "sessionId",
  as: "season",
});
db.liga.hasMany(db.teams, {
  foreignKey: "ligaId",
  as: "teams",
});
db.teams.belongsTo(db.liga, {
  foreignKey: "ligaId",
  as: "liga",
});
db.teams.hasMany(db.teamsSeasons, {
  foreignKey: "teamId",
  as: "jamolar",
});
db.teamsSeasons.belongsTo(db.teams, {
  foreignKey: "teamId",
  as: "team",
});

db.teamsSeasons.hasMany(db.matches, {
  foreignKey: "homeTeam",
  as: "matches",
});

db.matches.belongsTo(db.teamsSeasons, {
  foreignKey: "homeTeam",
  as: "jamolar",
});
// db.sequelize.query("CREATE UNIQUE INDEX IF NOT EXISTS jamolar_index ON jamolar (sessionId, teamId, ligaId)")

// db.sequelize.sync({
//   alter:true,
//   force:true
// }).then(()=>{
//   console.log("Ishladi")
// }).catch(er=>{
//   console.log(er)
// })
module.exports = db;
