require("dotenv").config();

const app = require("./middlwares/app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
