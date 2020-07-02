const express = require('express');
const database = require('./database');
const server = express();
server.use(express.json());

server.get('/', (req,res)=>{
    return res.json({
        reslut: 'Welcome to API-Notepad'
    });
});

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

    await database.query(`SELECT * FROM notepad WHERE id = ${id};`,
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

server.put('/notepad/:id', async (req,res)=>{
    const {id} = req.params;
    const {title, content, date, hour} = req.body;
    let update;

    await database.query(`
        UPDATE notepad SET title ='${title}' WHERE id = ${id};
        UPDATE notepad SET content ='${content}' WHERE id = ${id};
        UPDATE notepad SET date ='${date}' WHERE id = ${id};
        UPDATE notepad SET hour ='${hour}' WHERE id = ${id};`,
        {type: database.QueryTypes.UPDATE})
        .then(results =>{
            update = results;
        })
        .catch(err =>{
            return res.json({err})
        });
    if (update[1]){
        return res.json({
            result: 'note updated successfully.'
        });
    } else {
        return res.json({
            result: 'note cannot be updated.'
        });
    }   
});

server.delete('/notepad/:id', async (req,res)=>{
    const {id} = req.params;
    let noteDelete;

    await database.query(`DELETE FROM notepad WHERE id = ${id};`,
        {type: database.QueryTypes.DELETE})
        .then(results =>{
            noteDelete = results;
        })
        .catch(err =>{
            return res.json({err});
        })

    return res.json({noteDelete});
});

server.listen(process.env.PORT);