const mongoose = require("mongoose");
const matchSchema = new mongoose.Schema({
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teams",
    required: true,
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teams",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});
exports.Match = mongoose.model("Match", matchSchema);