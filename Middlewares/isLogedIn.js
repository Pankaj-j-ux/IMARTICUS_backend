/** @format */

const jwt = require("jsonwebtoken");
const User = require("../Models/user");

exports.isLogedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw Error("Login first to access this page");
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    console.log("ERROR FROM IS LOGED IN :: ", err.message);
    console.log(err);

    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};
