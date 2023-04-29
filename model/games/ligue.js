const mongoose = require("mongoose");
const ligueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  countTeams: {
    type: Number,
    default: 20,
  },
});

exports.Ligue = mongoose.model("Ligue", ligueSchema);
