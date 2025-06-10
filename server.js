const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const authRouter = require('./routes/auth');        // POST /api/login
const usuariosRouter = require('./routes/usuarios'); // POST /usuarios
const eventosRouter = require('./routes/eventos');
const gramineasRouter = require('./routes/gramineas');
const vacasRouter = require('./routes/vacas');

// Usar rutas
app.use('/api', authRouter);
app.use('/usuarios', usuariosRouter);
app.use('/eventos', eventosRouter);
app.use('/gramineas', gramineasRouter);
app.use('/hato', vacasRouter);

// No usar db.connect() con SQLite
// Ya se conecta automáticamente en db.js
// Puedes imprimir algo como confirmación aquí si quieres
console.log('✅ Conexión a SQLite inicializada');

// Iniciar servidor
const PORT = process.env.PORT || 3001; // Cambié de 3000 a 3001

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
