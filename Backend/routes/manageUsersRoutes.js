const {getAllUsers, getAUser, addUser, updateUser, deleteUser} = require('../controllers/manageUsers.js');
const express = require("express");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getAUser);
router.post("/create-user", addUser);
router.put("/update-user/:id", updateUser); 
router.delete("/delete-user/:id", deleteUser);



module.exports = router;