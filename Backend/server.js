const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server ta rodando Nome: Lucas Ferraz")
});

const PORT = 3001;
app.listen(PORT, () =>{
    console.log(`Ta rodando na porta ${PORT}`);
});
