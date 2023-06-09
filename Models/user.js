/** @format */

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [40, "Name should be under 40 characters"],
  },

  email: {
    type: String,
    required: [true, "Please provide a email"],
    // maxlength : [40, 'Name should be under 40 characters']
    validate: [validator.isEmail, "Please enter email in correct format"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password should be atleast 6 char"],
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//encrypt passeord before save - HOOKS
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// validate the password with passed and user password
userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

// create and return jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = mongoose.model("User", userSchema);
