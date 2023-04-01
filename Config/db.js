/** @format */

const mongoose = require("mongoose");

const connectWithDb = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Database Connected ..."))
    .catch((error) => {
      console.log(`Database Connection Issue ...`);
      console.log(error);
      process.exit(1);
    });
};

module.exports = connectWithDb;
