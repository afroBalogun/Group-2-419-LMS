const {registerStudent, loginStudent, downloadFile} = require('../controllers/student.js');
const express = require("express");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/download/:filename", downloadFile); // Download file endpoint



module.exports = router;