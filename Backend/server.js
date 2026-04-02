require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const app = express();

app.use(cors())
app.use(express.json());

app.get('/games', (req, res) => {
    const limit = 9; 
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const sqlData = "SELECT * FROM games LIMIT ? OFFSET ?";
    const sqlCount = "SELECT COUNT(*) as total FROM games";

    db.query(sqlCount, (err, countResult) => {
        if (err) return res.status(500).json(err);

        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        db.query(sqlData, [limit, offset], (err, results) => {
            if (err) return res.status(500).json(err);
            res.json({
                games: results,
                totalPages: totalPages,
                currentPage: page
            });
        });
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

    if (!titulo || !genero || !plataforma || !ano_lanc || preco === undefined || trofeus === undefined) {
        return res.status(400).json({ error: "Preencha todos os Campos" });
    }

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

    if (!titulo || !genero || !plataforma || !ano_lanc || preco === undefined || trofeus === undefined) {
        return res.status(400).json({ error: "Preencha todos os Campos" });
    }

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
