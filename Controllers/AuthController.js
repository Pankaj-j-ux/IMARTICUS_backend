/** @format */

const cookieToken = require("../Utilities/cookieToken.js");
const User = require("../Models/user.js");

exports.signup = async (req, res, next) => {
  try {
    console.log("chal rha hai ");
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      throw Error("Name, email, password are required");
    }

    const userC = await User.findOne({ email });
    if (userC) {
      throw Error("User with this email id already exist");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    cookieToken(user, res);
  } catch (err) {
    console.log("ERROR FROM SIGNUP :: ", err.message);
    console.log(err);

    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for presence of email and password
    if (!email || !password) {
      throw Error("Please provide all the credentials");
    }

    //get user from DB
    const user = await User.findOne({ email }).select("+password");

    // if user not found in DB
    if (!user) {
      throw Error("Email or password doesn not match or exist");
    }

    // Match the password
    const isPasswordCorrect = await user.isValidatedPassword(password);

    // if password don't match
    if (!isPasswordCorrect) {
      throw Error("Email or password doesn not match or exist");
    }

    // if all goes good and we send the token
    cookieToken(user, res);
  } catch (err) {
    console.log("ERROR FROM LOGIN :: ", err.message);
    console.log(err);

    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logout success",
    });
  } catch (err) {
    console.log("ERROR FROM LOGOUT :: ", err.message);
    console.log(err);

    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};
