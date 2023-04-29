const mongoose = require("mongoose");
const scoreSchema = new mongoose.Schema({
  homeTeam: {
    type: Number,
    required: true,
  },
  awayTeam: {
    type: Number,
    required: true,
  },
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Matches",
  },
});

exports.Score = mongoose.model("Score", scoreSchema);
