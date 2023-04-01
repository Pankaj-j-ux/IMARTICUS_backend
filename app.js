/** @format */

const express = require("express");
require("dotenv").config();

const app = express();
const morgan = require("morgan");

// Middleware ....
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.route("/").get((req, res) => {
  res.status(200).json({
    success: "true",
    message: "Hello World!!",
  });
});

//IMPORT all routes here ....
const course = require("./Routes/courseRoute.js");

//router middleware ....
app.use("/api/v1", course);

//EXPORT app....
module.exports = app;
