const express = require('express');
const database = require('./database');
const server = express();
server.use(express.json());

server.get('/', (req,res)=>{
    return res.json({
        reslut: 'Welcome to API-Notepad'
    });
});

// let nextId = null;

// async function getNextId(req,res,next) {
//     await database.query(`SELECT MAX(id) FROM notepad;`,
//     {type: database.QueryTypes.SELECT})
//     .then(id =>{
//         nextId =[0].max;
//         nextId ++;
//     });
//     next();
// }

server.get('/notepad', async (req,res)=>{
    let notepadList;

    await database.query(`SELECT * FROM notepad`, {type: database.QueryTypes.SELECT})
        .then(results => {
            notepadList = results;
        })
        .catch(err =>{
            return res.json(err);
        })

    return res.json({notepadList});
});

server.get('/notepad/:id', async (req, res)=>{
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
        return res.json({note})
})

server.post('/notepad', async (req,res)=>{
    let inseriu;
    const {id, title, content, date, hour} = req.body;

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
            result: 'note successfully inserted.'
        });
    } else {
        return res.json({
            result: 'note could not be registered.'
        });
    }
});

server.listen(process.env.PORT);