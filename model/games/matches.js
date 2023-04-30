const mongoose = require("mongoose");
const matchSchema = new mongoose.Schema({
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeamSeasons",
    required: true,
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeamSeason",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  homeGoal: {
    type: Number,
    required: true,
  },
  awayGoal: {
    type: Number,
    required: true,
  },
});
exports.Match = mongoose.model("Match", matchSchema);
