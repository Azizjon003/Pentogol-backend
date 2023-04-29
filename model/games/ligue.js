const mongoose = require("mongoose");
const ligueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  countTeams: {
    type: Number,
    default: 20,
  },
  title: {
    type: String,
  },
});

exports.Ligue = mongoose.model("Ligue", ligueSchema);
