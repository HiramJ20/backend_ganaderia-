const express = require('express');
const db = require('../db');
const router = express.Router();

// Obtener todas las enfermedades
router.get('/', (req, res) => {
  db.all('SELECT * FROM enfermedades', (err, rows) => {
    if (err) {
      console.error('Error al obtener enfermedades:', err);
      return res.status(500).json({ error: 'Error al obtener enfermedades' });
    }
    res.json(rows);
  });
});

// Agregar una nueva enfermedad
router.post('/', (req, res) => {
  const { nombre, sintomas, tratamiento, prevencion } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: 'Nombre es obligatorio' });
  }

  db.run(
    `INSERT INTO enfermedades (nombre, sintomas, tratamiento, prevencion) VALUES (?, ?, ?, ?)`,
    [nombre, sintomas, tratamiento, prevencion],
    function (err) {
      if (err) {
        console.error('Error al agregar enfermedad:', err);
        return res.status(500).json({ error: 'Error al agregar enfermedad' });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Eliminar una enfermedad por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM enfermedades WHERE id = ?', [id], function (err) {
    if (err) {
      console.error('Error al eliminar enfermedad:', err);
      return res.status(500).json({ error: 'Error al eliminar enfermedad' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Enfermedad no encontrada' });
    }

    res.json({ success: true });
  });
});

// Editar una enfermedad por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, sintomas, tratamiento, prevencion } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'Nombre es obligatorio' });
  }

  db.run(
    `UPDATE enfermedades SET nombre = ?, sintomas = ?, tratamiento = ?, prevencion = ? WHERE id = ?`,
    [nombre, sintomas, tratamiento, prevencion, id],
    function (err) {
      if (err) {
        console.error('Error al actualizar enfermedad:', err);
        return res.status(500).json({ error: 'Error al actualizar enfermedad' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Enfermedad no encontrada' });
      }

      res.json({ success: true });
    }
  );
});

module.exports = router;
