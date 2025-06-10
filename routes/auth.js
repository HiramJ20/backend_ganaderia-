const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta POST para iniciar sesión
router.post('/login', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) return res.status(400).json({ error: 'Nombre requerido' });

  db.get('SELECT * FROM usuarios WHERE nombre = ?', [nombre], (err, row) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });

    if (row) {
      res.json({ success: true, usuario: row });
    } else {
      res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }
  });
});

// Ruta POST para registrar usuario
router.post('/usuarios', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) return res.status(400).json({ error: 'Nombre requerido' });

  db.get('SELECT * FROM usuarios WHERE nombre = ?', [nombre], (err, row) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });

    if (row) {
      return res.status(400).json({ error: 'El nombre ya está registrado' });
    }

    db.run('INSERT INTO usuarios (nombre) VALUES (?)', [nombre], function (err) {
      if (err) return res.status(500).json({ error: 'No se pudo registrar el usuario' });

      res.json({ success: true, nombre });
    });
  });
});

module.exports = router;
