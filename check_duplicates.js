const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ganaderia.db');

db.all(
  `SELECT nombre, COUNT(*) as cantidad
   FROM enfermedades
   GROUP BY nombre
   HAVING cantidad > 1`,
  (err, rows) => {
    if (err) {
      console.error('❌ Error al consultar duplicados:', err.message);
    } else if (rows.length === 0) {
      console.log('✅ No hay enfermedades duplicadas');
    } else {
      console.log('⚠️ Enfermedades duplicadas encontradas:');
      console.table(rows);
    }
    db.close();
  }
);
