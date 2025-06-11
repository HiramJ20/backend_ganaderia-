const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - obtener todas
router.get('/', (req, res) => {
  db.all('SELECT * FROM gramineas', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST - agregar nueva
router.post('/', (req, res) => {
  const { nombre, tipo, descripcion, uso, resistencia } = req.body;

  if (!nombre || !tipo || !descripcion || !uso || !resistencia) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const sql = `
    INSERT INTO gramineas (nombre, tipo, descripcion, uso, resistencia)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(sql, [nombre, tipo, descripcion, uso, resistencia], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, nombre, tipo, descripcion, uso, resistencia });
  });
});

// PUT - actualizar por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, descripcion, uso, resistencia } = req.body;

  const sql = `
    UPDATE gramineas
    SET nombre = ?, tipo = ?, descripcion = ?, uso = ?, resistencia = ?
    WHERE id = ?
  `;
  db.run(sql, [nombre, tipo, descripcion, uso, resistencia, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Gramínea actualizada', id });
  });
});

// DELETE - eliminar por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM gramineas WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Gramínea eliminada', id });
  });
});

module.exports = router;
