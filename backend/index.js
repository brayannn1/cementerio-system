const express = require('express');
const pool = require('./basededatos');
const app = express();

app.use(express.json());

app.get('/usuarios', async (req, res) => {
    const resultado = await pool.query('SELECT * FROM usuario');

    res.json(resultado.rows);
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});