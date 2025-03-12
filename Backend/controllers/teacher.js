const User = require('../models/user');
const userSchema = require('../utils/validation');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Register a student
const registerTeacher = async (req, res) => {
    try{
        const {email, name, password} = req.body;
        if(!email || !name || !password){
            return res.status(400).json({message : "All fields are required"});
        }
        const {error, value} = userSchema.validate({email, name, password});
        if(error){
            return res.status(400).json({message : error.details[0].message});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message : "Teacher already exists"});
        }
        const newPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email, name, password : newPassword, role : "Teacher"});
        await newUser.save();
        return res.status(201).json({message : "Teacher registered successfully", userId: newUser._id,});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "An error occured while registering teacher"});
    }
}

// Login a student
const loginTeacher = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user || (user.role !== "Teacher")){
            return res.status(404).json({message : "Teacher not found"});
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(400).json({message : "Invalid email or password"});
        }
        const token = jwt.sign({id: user._id, email : user.email, role : user.role}, process.env.JWT_SECRET);
        return res.status(200).json({message : "Teacher logged in successfully", token, userId: user._id,});    
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "An error occured while logging in"});
    }
}; 

// To upload a file
// const uploadFile = (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "No file uploaded or invalid file type." });
//     }
//     res.status(200).json({message: "File uploaded successfully", file: req.file});
// };

const uploadFile = (req, res) => {
    try {
        if (!req.file) {
            throw new Error("No file uploaded or invalid file type.");
        }
        res.status(200).json({
            message: "File uploaded successfully",
            file: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTeacherCourses = async (req, res) => {
    try {
        const { teacherId } = req.params;
        
        // Find the teacher and populate assigned courses
        const teacher = await User.findById(teacherId).populate("coursesTeaching");
        
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json(teacher.assignedCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {registerTeacher, loginTeacher, uploadFile, getTeacherCourses};