const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { 
        type: String,
         required: true 
        },
    description: { 
        type: String, 
        required: true 
    },
    // Assuming teachers are stored in the User collection
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, 
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of enrolled students
    assignments: [
        {
            title: { type: String, required: true },
            dueDate: { type: Date, required: true },
            completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of students who completed
        },
    ],
    // Overall progress percentage of the course
    progress: { 
        type: Number, 
         default: 0 
    }, 
    courseMaterial: {
        type: String,
        required: true, // URL or path to the course material
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
