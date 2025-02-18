const User = require('../models/user');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1});
        res.setHeader("Content-Type", "application/json");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
            } catch (err) {
                res.status(500).json({ message: err.message });
                }
}

module.exports = {getAllUsers, getAUser};