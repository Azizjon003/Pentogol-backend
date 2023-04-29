const mongoose = require("mongoose");
const Ligue = require("./ligue");
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
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

exports.Teams = mongoose.model("Teams", teamsSchema);
