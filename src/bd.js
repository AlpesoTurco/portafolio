// src/db.js
const mysql = require('mysql2/promise');
require('dotenv').config(); // Carga variables del archivo .env

// Crear pool de conexiones para un mejor rendimiento
const pool = mysql.createPool({
  host: process.env.DB_HOST,         // Dirección del servidor MySQL
  user: process.env.DB_USER,         // Usuario de la BD
  password: process.env.DB_PASSWORD, // Contraseña
  database: process.env.DB_NAME,     // Nombre de la base de datos (portafolio_db)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Probar conexión al iniciar
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Conexión a MySQL establecida correctamente');
    conn.release();
  } catch (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
  }
})();

module.exports = pool;
