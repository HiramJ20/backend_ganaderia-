const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta a la base de datos
const dbPath = path.join(__dirname, 'ganaderia.db');
const db = new sqlite3.Database(dbPath);

// Crear tablas
db.serialize(() => {
  // Tabla de eventos
  db.run(`CREATE TABLE IF NOT EXISTS eventos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    fecha TEXT NOT NULL
  )`);

  // Tabla de gramíneas
  db.run(`CREATE TABLE IF NOT EXISTS gramineas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    tipo TEXT NOT NULL,
    descripcion TEXT,
    uso TEXT,
    resistencia TEXT
  )`);

  // Tabla de vacas
  db.run(`CREATE TABLE IF NOT EXISTS vacas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    edad INTEGER NOT NULL,
    raza TEXT NOT NULL
  )`);

  // ✅ NUEVA: Tabla de enfermedades
  db.run(`CREATE TABLE IF NOT EXISTS enfermedades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    sintomas TEXT,
    tratamiento TEXT,
    prevencion TEXT
  )`);

  console.log("✅ Tablas creadas correctamente en ganaderia.db");
});

db.close();

  