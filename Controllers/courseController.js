/** @format */

const Course = require("../Models/courses");

exports.getAllCourse = async (req, res, next) => {
  try {
    const courses = await Course.find({});
    if (!courses) {
      throw Error("No Courses present");
    }

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (err) {
    console.log("ERROR FROM GET COURSES :: ", err.message);
    console.log(err);

    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

exports.getOneCourse = async (req, res, next) => {
  try {
    const courseID = req.param("id");

    if (!courseID) {
      throw Error("Didn't receive any Course ID");
    }

    const course = await Course.findById(courseID);

    if (!course) {
      throw Error("Course by the given Course ID in not present");
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (err) {
    console.log("ERROR FROM GET ONE COURSE :: ", err.message);
    console.log(err);

    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};
