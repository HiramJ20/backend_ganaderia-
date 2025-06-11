const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ganaderia.db');

// Lista de gramíneas 
const gramineas = [
  {
    nombre: 'Pasto Elefante',
    tipo: 'Forraje',
    descripcion: 'Altamente productivo, de gran tamaño, ideal para corte.',
    uso: 'Forraje verde o ensilado',
    resistencia: 'Moderada a sequía',
  },
  {
    nombre: 'Estrella de África',
    tipo: 'Perenne',
    descripcion: 'Buena cobertura del suelo, tolerante al pastoreo.',
    uso: 'Pastoreo rotacional',
    resistencia: 'Buena resistencia al pisoteo',
  },
  {
    nombre: 'Pangola',
    tipo: 'Rápido crecimiento',
    descripcion: 'Se establece rápidamente, buena palatabilidad.',
    uso: 'Corte frecuente o pastoreo',
    resistencia: 'Tolerante a humedad',
  },
  {
    nombre: 'Brachiaria',
    tipo: 'Climas cálidos',
    descripcion: 'Ideal para zonas tropicales, alta producción.',
    uso: 'Forraje y cobertura',
    resistencia: 'Alta a sequía',
  },
  {
    nombre: 'Guinea',
    tipo: 'Alta digestibilidad',
    descripcion: 'Favorecida por el ganado, excelente valor nutritivo.',
    uso: 'Corte y pastoreo mixto',
    resistencia: 'Buena adaptación a diversos suelos',
  },
  {
    nombre: 'Pasto Buffel',
    tipo: 'Resistente a sequía',
    descripcion: 'Resistente, ideal para suelos arenosos y climas secos.',
    uso: 'Forraje extensivo',
    resistencia: 'Excelente a sequía',
  }
];

// Inserción en la base de datos
db.serialize(() => {
  gramineas.forEach((g) => {
    db.run(
      `INSERT INTO gramineas (nombre, tipo, descripcion, uso, resistencia) VALUES (?, ?, ?, ?, ?)`,
      [g.nombre, g.tipo, g.descripcion, g.uso, g.resistencia]
    );
  });

  console.log('✅ Gramíneas insertadas correctamente en ganaderia.db');
});

db.close();
