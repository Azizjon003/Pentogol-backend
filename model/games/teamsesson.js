const mongoose = require("mongoose");
const teamSeasonSchema = new mongoose.Schema({
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  ballRatio: {
    type: Number,
    required: true,
    default: 0,
  },
  numberMatches: {
    type: Number,
    required: true,
    default: 0,
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sessions",
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teams",
    required: true,
  },
});

exports.TeamSeason = mongoose.model("TeamSeason", teamSeasonSchema);
