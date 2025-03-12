const {registerStudent, loginStudent, downloadFile, getStudentCourses} = require('../controllers/student.js');
const express = require("express");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/download/:filename", downloadFile); // Download file endpoint
router.get("/:studentId/courses", getStudentCourses);


module.exports = router;