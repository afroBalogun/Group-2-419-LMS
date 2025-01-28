const http = require("http");
const {app} = require("./app.js");
const dotenv = require("dotenv");
const sequelize = require("./config/sequelize.js");
const server = http.createServer(app);
dotenv.config();





// 
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>{
    try{
        sequelize.authenticate();
        console.log(`The server is running on PORT ${PORT}`);
    }
    catch{
        console.log("An error occured while connecting to the database");
    }
})