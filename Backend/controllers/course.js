const Course = require("../models/course");
const User = require("../models/user");

const createCourse = async (req, res) => {
    try {
        const { title, description, teacher, assignments } = req.body;

        // Check if all fields are provided
        if (!title || !description || !teacher) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Verify if the teacher exists
        const teacherExists = await User.findById(teacher);
        if (!teacherExists || teacherExists.role !== "Teacher") {
            return res.status(400).json({ message: "Invalid Teacher ID or user is not a teacher." });
        }

        // Create a new course
        const course = await Course.create({ 
            title, 
            description, 
            teacher, 
            assignments 
        });

        // Update teacher's coursesTeaching array
        await User.findByIdAndUpdate(teacher, { 
            $push: { coursesTeaching: course._id } 
        });

        res.status(201).json(course);
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: error.message });
    }
};


const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("teacher", "name email");
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc  Get a course by ID
// @route GET /api/courses/:id
// @access Private
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("teacher", "name email");

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc  Enroll a student in a course
// @route POST /api/courses/:id/enroll
// @access Private (Students only)
const enrollStudent = async (req, res) => {
    try {
        const { courseId, studentId } = req.body;

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if student exists
        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Use `$addToSet` to prevent duplicates
        await Course.findByIdAndUpdate(courseId, { $addToSet: { students: studentId } });
        await User.findByIdAndUpdate(studentId, { $addToSet: { enrolledCourses: course._id } });

        res.status(200).json({ message: "Student enrolled successfully" });
    } catch (error) {
        console.error("Enrollment Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const removeCourse = async (req, res) => {
    try {
        const { courseId, studentId } = req.params;  // ✅ Fix params extraction

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if student is enrolled
        if (!course.students.includes(studentId)) {
            return res.status(403).json({ message: "You are not enrolled in this course" });
        }

        // Remove student from course
        await Course.findByIdAndUpdate(courseId, { $pull: { students: studentId } });

        // Remove course from student's enrolled courses
        await User.findByIdAndUpdate(studentId, { $pull: { enrolledCourses: courseId } });

        res.status(200).json({ message: "Course removed successfully" });
    } catch (error) {
        console.error("Remove Course Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc  Update course progress and assignments
// @route PATCH /api/courses/:id
// @access Private (Students & Teachers)
const updateCourseProgress = async (req, res) => {
    try {
        const { progress, assignments } = req.body;
        const { id: courseId } = req.params;

        // Ensure the user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Restrict assignment updates to only the teacher of the course
        if (assignments) {
            if (req.user.role !== "Teacher" || course.teacher.toString() !== req.user._id) {
                return res.status(403).json({ message: "Only the assigned teacher can update assignments." });
            }
            course.assignments = assignments; // Consider updating individual assignments instead of overwriting
        }

        // Restrict progress updates to students enrolled in the course
        if (progress !== undefined) {
            if (req.user.role !== "Student" || !course.students.includes(req.user._id)) {
                return res.status(403).json({ message: "Only enrolled students can update progress." });
            }
            course.progress = progress;
        }

        await course.save();

        res.status(200).json({ message: "Course updated successfully", course });
    } catch (error) {
        console.error("Update Course Progress Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        console.log("User:", req.user); // Debugging log
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user data found" });
        }
        const { courseId } = req.params;
        const { title, description, assignments } = req.body;


        // Find the course
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // Authorization check
        if (req.user.role !== "Admin" && req.user._id.toString() !== course.teacher.toString()) {
            return res.status(403).json({ message: "Access denied. Only Admins or Course Owner can update." });
        }

        // Update course details
        if (title) course.title = title;
        if (description) course.description = description;
        if (assignments) course.assignments = assignments;

        await course.save();
        res.status(200).json({ message: "Course updated successfully", course });

    } catch (error) {
        console.error("Update Course Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



// @desc  Delete a course
// @route DELETE /api/courses/:id
// @access Private (Only Admins or Course Owners)
const deleteCourse = async (req, res) => {
    try {
        console.log("Requesting User:", req.user);  // Debugging
        console.log("Course ID:", req.params.id);   // Debugging

        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Ensure only Admins or the Teacher who created it can delete
        if (!req.user || (req.user.role !== "Admin" && req.user._id.toString() !== course.teacher.toString())) {
            return res.status(403).json({ message: "Access denied. Only Admins or the Course Owner can delete." });
        }

        // Remove course from teacher's coursesTeaching array
        await User.findByIdAndUpdate(course.teacher, {
            $pull: { coursesTeaching: course._id }
        });

        await course.deleteOne();
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Delete Course Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const getTotalEnrollments = async (req, res) => {
    try {
        const totalEnrollments = await Course.aggregate([
            { $project: { numStudents: { $size: "$students" } } },  // Get the number of students per course
            { $group: { _id: null, total: { $sum: "$numStudents" } } }  // Sum all enrollments
        ]);

        res.status(200).json({ totalEnrollments: totalEnrollments[0]?.total || 0 });
    } catch (error) {
        res.status(500).json({ message: "Error fetching enrollments" });
    }
};




module.exports = { createCourse, getCourses, getCourseById, enrollStudent, removeCourse, updateCourseProgress, deleteCourse, updateCourse, getTotalEnrollments };