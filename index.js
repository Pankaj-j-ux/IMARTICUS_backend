/** @format */

const app = require("./app");
// const connectWithDb = require("./config/db.js");
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected ...");
    app.listen(PORT, () => {
      console.log(`Server is running at port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Database Connection Issue ...`);
    console.log(error);
    process.exit(1);
  });
