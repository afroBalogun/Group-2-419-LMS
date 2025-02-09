const {registerStudent, loginStudent} = require('../controllers/student.js');
const express = require("express");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);



module.exports = router;