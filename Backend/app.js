const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
dotenv.config();

// Connect to MongoDB
connectDB();

// Serve static files before defining routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes
const studentRoutes = require("./routes/studentRoutes.js");
const teacherRoutes = require("./routes/teacherRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const manageUsersRoutes = require("./routes/manageUsersRoutes.js");
const courseRoutes = require("./routes/courseRoutes.js");
const uploadRoutes = require("./config/multerConfig.js");

// Endpoints 
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/admin", adminRoutes);
app.use("/users", manageUsersRoutes);
app.use("/courses", courseRoutes);
app.use("/api/uploads", uploadRoutes); // Change to prevent conflict

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
