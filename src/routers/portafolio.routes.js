// src/routes/portafolio.routes.js
const express = require('express');
const router = express.Router();
const db = require('../bd');

// Ruta principal: Home del portafolio
router.get('/', async (req, res) => {
  try {
    // Traer perfil (solo 1)
    const [perfilRows] = await db.query('SELECT * FROM perfil LIMIT 1');

    // Traer proyectos
    const [proyectosRows] = await db.query(
      'SELECT * FROM proyectos ORDER BY fecha DESC'
    );

    // Traer habilidades
    const [habilidadesRows] = await db.query(
      'SELECT * FROM habilidades ORDER BY tipo, nivel DESC'
    );

    const perfil = perfilRows[0] || null;

    res.render('home', {
      perfil,
      proyectos: proyectosRows,
      habilidades: habilidadesRows,
    });
  } catch (err) {
    console.error('Error en ruta /:', err);
    res.status(500).send('Error al cargar el portafolio');
  }
});

module.exports = router;
