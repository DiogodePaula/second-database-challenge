const express = require("express");
const database = ("./datebase");
const server = express();
server.use(express.json());

server.get("/", (req,res)=>{
    return res.json({
        reslut: "Welcome to API-Notepad"
    });
});

server.get("/notepad", async (req,res)=>{
    let users;
    await database.query(`SELECT * FROM notepad`, {type: database.QueryTypes.SELECT})
    .then(resluts => {
        users = results;
    })
    .catch(err =>{
        return res.json("erro ao buscar note");
    })
    return res.json({users});
});

server.post("/notepad", async (req,res)=>{
    let inseriu;
    const {title, content, date, hour} = req.body;

    await database.query(`INSERT INTO notepad VALUES(${id},'${title}', '${content}', '${date}', '${hour}');`,
        {type: database.QueryTypes.INSERT})
        .then(result =>{
            inseriu = result
        })
        .catch(err =>{
            return res.json(err);
        });
    if (inseriu[1]){
        return res.json("note successfully inserted.");
    } else {
        return res.json("note could not be registered.");
    }
});

server.listen(process.env.PORT);