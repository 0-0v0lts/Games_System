require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const app = express();

app.use(cors())
app.use(express.json());

app.get('/games', (req, res) => {
    const sql = "SELECT * FROM games";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("não achou os jogos:", err)
            return res.status(500).json({ error: "não achou o banco de dados"});
        }
        res.json(results);
    })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>{
    console.log(`Ta rodando na porta ${PORT}`);
});
