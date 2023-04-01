/** @format */

const router = require("express").Router();
const {
  getAllCourse,
  getOneCourse,
} = require("../Controllers/courseController.js");

router.route("/getallcourses").get(getAllCourse);
router.route("/getonecourse/:id").get(getOneCourse);

module.exports = router;
