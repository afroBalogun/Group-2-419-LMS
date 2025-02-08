const {registerTeacher, loginTeacher} = require('../controllers/teacher.js');
const express = require("express");

const router = express.Router();

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);



module.exports = router;