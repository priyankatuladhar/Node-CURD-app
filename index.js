const express = require('express');
const db = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432, // PostgreSQL default port
      user : 'postgres',
      password : 'qwert12345',
      database : 'demodb'
    }
  });

// app.js
const { blockAdmin } = require('./middleware');

const app = express();
const PORT = 3000; // Use a different port for the Express server

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

app.use(express.json());

//read=get
app.get(`/intern`,async (req, res) => {
    try {
        const users = await db.select('*').from('users');
        res.json(users); // Corrected typo from req to res
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
//read by id
app.get('/intern/:id' ,async (req, res) => {
    const { id } = req.params;
    try {
       const intern = await db('users').where({ id }).first();
       if(!intern) {
        return res.status(404).send('Intern not found');

       }
       res.status(200).json(intern);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


//create=post
app.post(`/intern`, blockAdmin ,async (req,res) => {
    try{
        await db('users').insert(req.body);
        res.status(201).send('Intern information added');

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


//delete
app.delete('/intern/:id',async (req,res) =>{
    const { id } = req.params;
    try{
        await db('users').where({ id }).del();
        res.status(200).send('Intern information deleted');

    }catch(error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//update=put
app.put('/intern/:id', blockAdmin , async (req,res) => {
    const { id } = req.params;
    try{
        await db('users').where({ id }).update(req.body);
        res.status(200).send('Intern information updated');

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

