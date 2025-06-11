const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ganaderia.db');

db.serialize(() => {
  db.all('SELECT * FROM gramineas', (err, rows) => {
    if (err) {
      console.error('❌ Error al consultar la tabla gramineas:', err.message);
      return;
    }

    if (rows.length === 0) {
      console.log('📭 No hay gramíneas registradas.');
    } else {
      console.log('📄 Gramíneas en la base de datos:');
      rows.forEach((g, index) => {
        console.log(`\n🌿 Gramínea ${index + 1}`);
        console.log(`   ID           : ${g.id}`);
        console.log(`   Nombre       : ${g.nombre}`);
        console.log(`   Tipo         : ${g.tipo}`);
        console.log(`   Descripción  : ${g.descripcion}`);
        console.log(`   Uso          : ${g.uso}`);
        console.log(`   Resistencia  : ${g.resistencia}`);
      });
    }
    db.close();
  });
});
