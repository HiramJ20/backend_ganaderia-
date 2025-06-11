const express = require('express');
const router = express.Router();
const db = require('../db');

// 👤 Obtener todos los usuarios (opcion para pruebas)
router.get('/', (req, res) => {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 📝 Registrar nuevo usuario
router.post('/', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) return res.status(400).json({ error: 'Nombre requerido' });

  // Verificar si el usuario ya existe
  db.get('SELECT * FROM usuarios WHERE nombre = ?', [nombre], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });

    if (row) {
      return res.status(400).json({ error: 'El nombre ya está registrado' });
    }

    // Insertar nuevo usuario
    db.run('INSERT INTO usuarios (nombre) VALUES (?)', [nombre], function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ id: this.lastID, nombre });
    });
  });
});

module.exports = router;
