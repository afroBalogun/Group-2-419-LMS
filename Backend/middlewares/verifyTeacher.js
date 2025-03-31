const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyTeacher = async (req, res, next) => {
    try {
        console.log("Headers:", req.headers); // Debugging log

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            console.log("No token found in headers");
            return res.status(401).json({ message: "You need to Login" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;

        // ✅ Corrected role check
        if (req.user.role !== "Teacher" && req.user.role !== "Admin") {
            return res.status(403).json({ message: "You are not authorized to access this route" });
        }

        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};


module.exports = { verifyTeacher };
