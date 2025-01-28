const http = require("http");
const {app} = require("./app.js");
const dotenv = require("dotenv");
const server = http.createServer(app);
dotenv.config();






const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>{
    try{
        console.log(`The server is running on PORT ${PORT}`);
    }
    catch{
        console.log("An error occured!");
    }
})