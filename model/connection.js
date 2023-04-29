const mongoose = require("mongoose");

const connection = async (url, password) => {
  try {
    url = url.replace("<password>", password);
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connection;
