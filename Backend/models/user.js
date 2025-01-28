// Create the User model(Admin, Student, Lecturer)
const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../config/user.js");

const User = sequelize.define("User", {
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender : {
        type : DataTypes.ENUM("male", "female"),
        allowNull : false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role : {
        type : DataTypes.ENUM("student", "lecturer", "admin"),
        defaultValue: "student",
        allowNull : false
    }
});