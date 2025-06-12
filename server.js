const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas activas
const enfermedadesRouter = require('./routes/enfermedades');
const eventosRouter = require('./routes/eventos');
const gramineasRouter = require('./routes/gramineas');
const vacasRouter = require('./routes/vacas');

app.use('/enfermedades', enfermedadesRouter);
app.use('/eventos', eventosRouter);
app.use('/gramineas', gramineasRouter);
app.use('/hato', vacasRouter);

// 🌱 Ejecutar seed SOLO si tabla gramineas está vacía
const seedGramineas = require('./seed_gramineas');
const sqlite3 = require('sqlite3').verbose();
const tempDb = new sqlite3.Database('./ganaderia.db');

tempDb.get('SELECT COUNT(*) as total FROM gramineas', (err, row) => {
  if (err) {
    console.error('❌ Error verificando tabla gramineas:', err.message);
  } else if (row.total === 0) {
    console.log('🌱 Sembrando gramíneas...');
    seedGramineas();
  } else {
    console.log('🌿 Gramíneas ya existentes, no se ejecuta el seed.');
  }
});

console.log('✅ Conexión a SQLite inicializada');

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

