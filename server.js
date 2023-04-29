require("dotenv").config();

const app = require("./middlwares/app");
const connection = require("./model/connection");
const port = process.env.PORT || 3000;
const DB = process.env.DB;
const DB_PASS = process.env.DB_PASS;
connection(DB, DB_PASS);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
