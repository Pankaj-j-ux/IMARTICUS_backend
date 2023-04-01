/** @format */

const app = require("./app");
const connectWithDb = require("./config/db.js");
require("dotenv").config();

// const mongoose = require("mongoose");
// Connect with database
connectWithDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port : ${process.env.PORT}`);
});
