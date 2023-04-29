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
ligueSchema.pre(/^find/, async function (next) {
  // const data = th;
  // this;
  // console.log(this);
  next();
});

exports.Ligue = mongoose.model("Ligue", ligueSchema);
