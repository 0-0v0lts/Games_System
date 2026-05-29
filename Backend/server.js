require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const sql = "SELECT id, username, email, role FROM users WHERE (email = ? OR username = ?) AND password = ?";
    
    db.query(sql, [email, email, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro no banco de dados" });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: "Usuário ou senha inválidos" });
        }
        res.json(results[0]);
    });
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao criar conta" });
        }
        res.status(201).json({ message: "Usuário cadastrado" });
    });
});

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

app.get('/games/:id/reviews', (req, res) => {
    const { id } = req.params;
    
    const sql = "SELECT reviews.id, reviews.texto, reviews.data_coment, users.username FROM reviews JOIN users ON reviews.user_id = users.id WHERE reviews.game_id = ? ORDER BY reviews.data_coment DESC";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Erro ao buscar reviews:", err);
            return res.status(500).json({ error: "Erro ao buscar as reviews" });
        }
        res.json(results);
    });
});

app.post('/games/:id/reviews', (req, res) => {
    const { id } = req.params;
    const { texto, username } = req.body;

    if (!texto || !username) {
        return res.status(400).json({ error: "Conteúdo inválido ou usuário deslogado." });
    }

    const sql = "INSERT INTO reviews (game_id, user_id, texto) VALUES (?, (SELECT id FROM users WHERE username = ?), ?)";

    db.query(sql, [id, username, texto], (err, result) => {
        if (err) {
            console.error("Erro ao salvar review:", err);
            return res.status(500).json({ error: "Erro ao publicar a sua review" });
        }
        res.status(201).json({ message: "Review publicada com sucesso!" });
    });
});

app.get('/noticias', (req, res) => {
    const { categoria } = req.query;
    let sql = "SELECT * FROM noticias ORDER BY data_post DESC";
    let params = [];

    if (categoria && categoria !== 'tudo') {
        sql = "SELECT * FROM noticias WHERE categoria = ? ORDER BY data_post DESC";
        params = [categoria];
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar as notícias" });
        }
        res.json(results);
    });
});

app.post('/noticias', (req, res) => {
    const { titulo, imagem_url, categoria } = req.body;

    if (!titulo || !imagem_url || !categoria) {
        return res.status(400).json({ error: "Preencha todos os campos da notícia" });
    }

    const sql = "INSERT INTO noticias (titulo, imagem_url, categoria) VALUES (?, ?, ?)";

    db.query(sql, [titulo, imagem_url, categoria], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao publicar notícia" });
        }
        res.status(201).json({ message: "Notícia publicada com sucesso", id: result.insertId });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Ta rodando na porta ${PORT}`);
});