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
            completed: { type: Boolean, default: false },
         },
    ],
    // Overall progress percentage of the course
    progress: { 
        type: Number,
         default: 0 
    }, 
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
