const mongoose = require("mongoose");
const teamsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
      required: true,
    },
    numberGame: {
      type: Number,
      default: 0,
    },
    ligueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ligues",
    },
  },
  {
    timeStamps: true,
  }
);

exports.Teams = mongoose.model("Teams", teamsSchema);
