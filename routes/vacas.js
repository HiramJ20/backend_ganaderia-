const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Obtener todas las vacas
router.get('/', (req, res) => {
  db.all('SELECT * FROM vacas', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST - Registrar nueva vaca
router.post('/', (req, res) => {
  const { nombre, edad, raza } = req.body;

  if (!nombre || !edad || !raza) {
    return res.status(400).json({ error: 'Nombre, edad y raza son requeridos' });
  }

  const sql = 'INSERT INTO vacas (nombre, edad, raza) VALUES (?, ?, ?)';
  db.run(sql, [nombre, edad, raza], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ id: this.lastID, nombre, edad, raza });
  });
});

module.exports = router;
