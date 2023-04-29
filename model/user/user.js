const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordConfirm: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

exports.User = mongoose.model("User", userSchema);
