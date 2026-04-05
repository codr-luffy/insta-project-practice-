require("dotenv").config();
const app = require("./src/app.js");
const ConnectToDb = require("./src/config/database.js");

ConnectToDb();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
