const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { Pool } = require('pg');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

const pool = new Pool({
    user: 'username',
    host: 'localhost',
    database: 'database_name',
    password: 'password',
    port: 5432,
  });

app.post('/liveEvent', (req, res) => {
    const event = req.body;
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader === 'secret') {
        fs.appendFile('newEvents.jsonl', JSON.stringify(event) + '\n', (err) => {
            if (err) throw err;
            console.log('Event appended to file');
        });
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

app.get('/userEvents/:userid', async (req, res) => {
    const userId = req.params.userid;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users_revenue WHERE user_id = $1', [userId]);
        const userEvents = result.rows;
        client.release();

        res.json(userEvents);
    } catch (error) {
        console.error('Error retrieving user events:', error);
        res.sendStatus(500);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});