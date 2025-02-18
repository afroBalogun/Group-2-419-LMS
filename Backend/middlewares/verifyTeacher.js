const jwt = require("jsonwebtoken");
const verifyTeacher = (req, res, next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message : "You need to Login"});
        }
        req.user = jwt.decode(token, process.env.JWT_SECRET);
        if(req.user.role !== "Teacher"){
            return res.status(401).json({message : "You are not authorized to access this route"});
        }
        next();
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : "An error has occured"});
    }
}

module.exports = {verifyTeacher};