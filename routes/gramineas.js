const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Obtener todas las gramíneas
router.get('/', (req, res) => {
  db.all('SELECT * FROM gramineas', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST - Crear nueva gramínea
router.post('/', (req, res) => {
  const { nombre, tipo } = req.body;

  if (!nombre || !tipo) return res.status(400).json({ error: 'Nombre y tipo son requeridos' });

  const sql = 'INSERT INTO gramineas (nombre, tipo) VALUES (?, ?)';
  db.run(sql, [nombre, tipo], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ id: this.lastID, nombre, tipo });
  });
});

// PUT - Editar gramínea por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, tipo } = req.body;

  if (!nombre || !tipo) return res.status(400).json({ error: 'Nombre y tipo son requeridos' });

  const sql = 'UPDATE gramineas SET nombre = ?, tipo = ? WHERE id = ?';
  db.run(sql, [nombre, tipo, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: 'Gramínea actualizada correctamente', id, nombre, tipo });
  });
});

// DELETE - Eliminar gramínea por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM gramineas WHERE id = ?';
  db.run(sql, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: 'Gramínea eliminada correctamente', id });
  });
});

module.exports = router;
