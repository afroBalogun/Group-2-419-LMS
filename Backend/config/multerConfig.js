const multer = require("multer");
const path = require("path");

// Define storage settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Save files in the "uploads" folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});


// Multer configuration
const upload = multer({ storage });

module.exports = upload;
