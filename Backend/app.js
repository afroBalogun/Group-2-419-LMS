const express = require("express");
const app = express();
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(express.json());
app.use(cors());
dotenv.config();

// Connect to MongoDB
connectDB();

// Import routes
const studentRoutes = require("./routes/studentRoutes.js");
const teacherRoutes = require("./routes/teacherRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const manageUsersRoutes = require("./routes/manageUsersRoutes.js")


// Endpoints 
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/admin", adminRoutes);
app.use("/users", manageUsersRoutes);

// app.get("/", (req, res) =>{
//     res.send({message : "Testing"});
// });




const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`The server is running on port ${PORT}`);
});