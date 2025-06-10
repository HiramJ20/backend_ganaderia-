const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Obtener todos los eventos
router.get('/', (req, res) => {
  db.all('SELECT * FROM eventos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST - Crear nuevo evento
router.post('/', (req, res) => {
  const { titulo, fecha } = req.body;

  if (!titulo || !fecha) return res.status(400).json({ error: 'Título y fecha requeridos' });

  const sql = 'INSERT INTO eventos (titulo, fecha) VALUES (?, ?)';
  db.run(sql, [titulo, fecha], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ id: this.lastID, titulo, fecha });
  });
});

// PUT - Editar evento por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, fecha } = req.body;

  if (!titulo || !fecha) return res.status(400).json({ error: 'Título y fecha requeridos' });

  const sql = 'UPDATE eventos SET titulo = ?, fecha = ? WHERE id = ?';
  db.run(sql, [titulo, fecha, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: 'Evento actualizado correctamente', id, titulo, fecha });
  });
});

// DELETE - Eliminar evento por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM eventos WHERE id = ?';
  db.run(sql, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: 'Evento eliminado correctamente', id });
  });
});

module.exports = router;
