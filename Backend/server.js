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
    });
});

app.get('/games/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM games WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Erro ao buscar:", err);
            return res.status(500).json({ error: "Erro no banco de dados" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Jogo não encontrado" });
        }
        res.json(results[0]);
    });
});

app.post('/games', (req, res) => {
    const { titulo, genero, plataforma, ano_lanc, preco, trofeus } = req.body;

    const sql = "INSERT INTO games (titulo, genero, plataforma, ano_lanc, preco, trofeus) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [titulo, genero, plataforma, ano_lanc, preco, trofeus], (err, result) => {
        if (err) {
            console.error("não inseriu o jogo:", err);
            return res.status(500).json({ error: "não cadastrou"});
        }
        res.status(201).json({ message: "foi cadastrado", id: result.insertId });
    });
});

app.delete('/games/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM games WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("não deletouo  jogo:", err);
            return res.status(500).json({ error: "não excluiu o jogo" });
        }
        res.json({ message: "jogo foi exluido" });
    });
});

app.put('/games/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, genero, plataforma, ano_lanc, preco, trofeus } = req.body;

    const sql = "UPDATE games SET titulo = ?, genero = ?, plataforma = ?, ano_lanc = ?, preco = ?, trofeus = ? WHERE id = ?";

    db.query(sql, [titulo, genero, plataforma, ano_lanc, preco, trofeus, id], (err, result) => {
        if (err) {
            console.error("não atualizou:", err);
            return res.status(500).json({ error: "não editou o jogo" });
        }
        res.json({ message: "atualizou o jogo"});
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>{
    console.log(`Ta rodando na porta ${PORT}`);
});
