const {registerTeacher, loginTeacher, uploadFile} = require('../controllers/teacher.js');
// const {uploadFile} = require('../controllers/teacher.js');
const upload = require("../config/multerConfig.js");
const {verifyTeacher}= require("../middlewares/verifyTeacher.js");
const express = require("express");

const router = express.Router();

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
// router.post("/upload", verifyTeacher, upload.single("file"), uploadFile);

// router.post("/upload", verifyTeacher, uploadFile);

router.post("/upload", verifyTeacher, upload.single("file"), uploadFile);

module.exports = router;