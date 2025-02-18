const User = require('../models/user');
const userSchema = require('../utils/validation');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");


// Register a student
const registerStudent = async (req, res) => {
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
            return res.status(400).json({message : "Student already exists"});
        }
        const newPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email, name, password : newPassword, role : "Student"});
        await newUser.save();
        return res.status(201).json({message : "Student registered successfully", userId: newUser._id,});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "An error occured while registering student"});
    }
}

// Login a student
const loginStudent = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user || (user.role !== "Student")){
            return res.status(404).json({message : "Student not found"});
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(400).json({message : "Invalid email or password"});
        }
        const token = jwt.sign({id: user._id, email : user.email, role : user.role}, process.env.JWT_SECRET, { expiresIn: "2h" });
        return res.status(200).json({message : "Student logged in successfully", token, userId: user._id,});    
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "An error occured while logging in"});
    }
}; 



// Download file function
// const downloadFile = (req, res) => {
//     try {
//         const { filename } = req.params;
//         const filePath = path.join(__dirname, "..", "uploads", filename);

//         // Check if the file exists
//         if (!fs.existsSync(filePath)) {
//             return res.status(404).json({ message: "File not found" });
//         }

//         // Send the file for download
//         res.download(filePath, filename, (err) => {
//             if (err) {
//                 console.error("Error downloading file:", err);
//                 res.status(500).json({ message: "Error downloading file" });
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };


const downloadFile = (req, res) => {
    try {
        
        const { filename } = req.params;

        // ✅ Debugging: Log filename
        console.log("Filename received:", filename);

        // Validate filename
        if (!filename) {
            return res.status(400).json({ message: "Filename is required" });
        }

        // Construct file path
        const filePath = path.join(__dirname, "..", "uploads", filename);

        // ✅ Debugging: Log file path
        console.log("File path:", filePath);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error("File not found:", filePath);
            return res.status(404).json({ message: "File not found" });
        }

        // Send file
        res.download(filePath, filename, (err) => {
            if (err) {
                console.error("Error sending file:", err.message);
                return res.status(500).json({ message: "Error downloading file" });
            }
        });

    } catch (error) {
        console.error("Download error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



// module.exports = { downloadFile };



module.exports = {registerStudent, loginStudent, downloadFile};