const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Course = require("../models/course"); // Import Course model
const { verifyTeacher } = require("../middlewares/verifyTeacher");

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname) || ".unknown";
        const safeName = file.originalname.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_.-]/g, "");
        cb(null, `${Date.now()}_${safeName}`);
    }
});

const upload = multer({ storage: storage });

// ✅ Upload & Save File Path to Course
router.post("/upload", upload.single("file"), verifyTeacher, async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { courseId } = req.body; // Get the course ID from frontend

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: "Course not found" });

        // Save the file path in the course document
        course.courseMaterial = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        await course.save();

        res.json({
            message: "File uploaded and saved to course successfully",
            filePath: course.courseMaterial,
            course
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ File Download Route
router.get("/download/:filename", (req, res) => {
    const filePath = path.join(__dirname, "../uploads", req.params.filename);
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: "File not found" });
    }
});


module.exports = router;
