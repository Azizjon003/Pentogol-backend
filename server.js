require("dotenv").config();

const app = require("./middlewares/app");

const port = process.env.PORT || 3000;
 require("./model/connection")
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
