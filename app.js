/** @format */

const express = require("express");
require("dotenv").config();

const app = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieP = require("cookie-parser");

// Middleware ....
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cookieP());

app.route("/").get((req, res) => {
  res.status(200).json({
    success: "true",
    message: "Hello World!!",
  });
});

//IMPORT all routes here ....
const course = require("./Routes/courseRoute.js");
const auth = require("./Routes/AuthRoute.js");

//router middleware ....
app.use("/api/v1", course);
app.use("/api/v1", auth);

//EXPORT app....
module.exports = app;
