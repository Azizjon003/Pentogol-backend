const mongoose = require("mongoose");
const seassonSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  ligueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ligues",
    required: true,
  },
});

exports.Seasson = mongoose.model("Seasson", seassonSchema);
