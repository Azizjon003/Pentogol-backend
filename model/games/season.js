const mongoose = require("mongoose");
const seassonSchema = new mongoose.Schema({
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
  ligueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ligues",
    required: true,
  },
});

exports.Seasson = mongoose.model("Seasson", seassonSchema);
