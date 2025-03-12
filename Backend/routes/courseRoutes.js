const express = require("express");
const { createCourse, getCourses, getCourseById, enrollStudent, updateCourseProgress, deleteCourse, removeCourse, updateCourse, getTotalEnrollments } = require("../controllers/course.js");
const { verifyTeacher } = require("../middlewares/verifyTeacher.js");

const router = express.Router();

router.post("/add-course", createCourse); // Create a new course
router.get("/total-enrollments", getTotalEnrollments); // Define the route
router.get("/", getCourses); // Get all courses
router.get("/:id", getCourseById); // Get course by ID
router.post("/:id/enroll", enrollStudent); // Enroll student in a course
router.patch("/update-course/:id", updateCourseProgress); // Update course progress
router.delete("/delete-course/:id", verifyTeacher, deleteCourse); // Delete course
router.delete("/remove/:courseId/:studentId", removeCourse);
router.put("/update/:courseId", verifyTeacher, updateCourse);

module.exports = router;