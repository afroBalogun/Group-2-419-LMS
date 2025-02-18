const {getAllUsers, getAUser} = require('../controllers/manageUsers.js');
const express = require("express");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getAUser);



module.exports = router;