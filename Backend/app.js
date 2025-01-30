const express = require("express");
const app = express();
const connectDB = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();
// Connect to MongoDB
connectDB();



module.exports = app;