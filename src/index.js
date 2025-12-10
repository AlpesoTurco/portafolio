// src/index.js
const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

// Conexión a BD
const db = require('../src/bd');

// Importar router del portafolio
const portafolioRoutes = require('../src/routers/portafolio.routes');

const PORT = process.env.PORT || 3000;

// Middleware para JSON (por si luego usas API)
app.use(express.json());

// Configurar carpeta de vistas y motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Usar router principal
app.use('/', portafolioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
