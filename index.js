const express = require("express");
const database = ("./datebase");
const server = express();
server.use(express.json());

server.get("/", (req,res)=>{
    return res.json({
        reslut: "Welcome to API-Notepad"
    });
});

let nextId = null;

async function getNextId(req,res,next) {
    await database.query(`SELECT MAX(id) FROM notepad;`,
    {type: database.QueryTypes.SELECT})
    .then(id =>{
        nextId =[0].max;
        nextId ++;
        // nextId = id ++;
        // console.log(id[0].max);
    });
    next();
}

server.get("/notepad", async (req,res)=>{
    let notepad;

    await database.query(`SELECT * FROM notepad`, {type: database.QueryTypes.SELECT})
        .then(resluts => {
            notepad = results;
        })
        .catch(err =>{
            return res.json("error getting note");
        })

    return res.json({notepad});
});

server.get("/notepad/:id", async (req, res)=>{
    const {id} = req.params;
    let note;

    await database.query(`SELECT * FROM notepad WHERE id = ${id}`,
    {type: database.QueryTypes.SELECT})
    .then(noteResult =>{
        note = noteResult;
    })
    .catch(err =>{
        return res.json(err);
    });
})

server.post("/notepad", async (req,res)=>{
    let inseriu;
    const {title, content, date, hour} = req.body;

    await database.query(`INSERT INTO notepad VALUES(${id},'${title}', '${content}', '${date}', '${hour}');`,
        {type: database.QueryTypes.INSERT})
        .then(result =>{
            inseriu = result;
        })
        .catch(err =>{
            return res.json(err);
        });
        
    if (inseriu[1]){
        return res.json({
            result: "note successfully inserted."
        });
    } else {
        return res.json({
            result: "note could not be registered."
        });
    }
});

server.listen(process.env.PORT);