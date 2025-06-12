const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ganaderia.db');

const enfermedades = [
  {
    nombre: 'Brucelosis',
    sintomas: 'Abortos, fiebre, infertilidad',
    tratamiento: 'Antibióticos, aislamiento',
    prevencion: 'Vacunación, higiene del hato'
  },
  {
    nombre: 'Fiebre Aftosa',
    sintomas: 'Llagas en la boca y patas, fiebre',
    tratamiento: 'Soporte sintomático',
    prevencion: 'Vacunación, cuarentena'
  },
  {
    nombre: 'Mastitis',
    sintomas: 'Inflamación de la ubre, leche anormal',
    tratamiento: 'Antibióticos, ordeño frecuente',
    prevencion: 'Limpieza del equipo, revisión del hato'
  }
];

db.serialize(() => {
  db.get(`SELECT COUNT(*) AS total FROM enfermedades`, (err, row) => {
    if (err) {
      console.error('❌ Error verificando tabla enfermedades:', err.message);
    } else if (row.total === 0) {
      enfermedades.forEach((e) => {
        db.run(
          `INSERT INTO enfermedades (nombre, sintomas, tratamiento, prevencion) VALUES (?, ?, ?, ?)`,
          [e.nombre, e.sintomas, e.tratamiento, e.prevencion]
        );
      });
      console.log('🌾 Enfermedades insertadas correctamente');
    } else {
      console.log('🛑 Ya existen enfermedades en la base, no se insertan duplicados');
    }

    db.close();
  });
});
