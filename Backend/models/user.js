const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["Teacher", "Student", "Admin" ], // Define roles
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },

        // Fields for Teachers
        coursesTeaching: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course", // Reference to a Course model
            },
        ],
        feedback: [
            {
                student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                rating: { type: Number, min: 1, max: 5 },
                comment: { type: String, trim: true },
            },
        ],

        // Fields for Students
        enrolledCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course", // Ensure it references the Course model correctly
            }
        ],        
        grades: [
            {
                course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
                assignments: [{ type: Number }], // Assignment grades
                exams: { type: Number }, // Exam grade
                attendance: { type: Number }, // Attendance percentage
            },
        ],

        // Common schedules for all roles
        schedule: [
            {
                title: { type: String, required: true },
                date: { type: Date, required: true },
                description: { type: String, trim: true },
                reminder: { type: Boolean, default: false },
            },
        ],

        // Admin-specific fields
        managedUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // References users they manage
            },
        ],
        statistics: {
            totalUsers: { type: Number, default: 0 },
            totalCourses: { type: Number, default: 0 },
            activeUsers: { type: Number, default: 0 },
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt
);

module.exports = mongoose.model("User", userSchema);
