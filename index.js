const express = require("express");
const database = ("./datebase");
const server = express();
server.use(express.json());

server.get("/", (req,res)=>{
    return res.json({
        reslut: "Welcome to API-Notepad"
    });
});

server.listen(process.env.PORT);