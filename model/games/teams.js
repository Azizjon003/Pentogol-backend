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
