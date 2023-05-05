const initLigue = require("./initLigue");
const initSeasson = require("./initSeasson");
const initTeams = require("./initTeam");
const initTeamsSeason = require("./initTeamsSeason");

const ishla = async () => {
  await initLigue();
  await initSeasson();
  await initTeams();
  await initTeamsSeason();
};

ishla()