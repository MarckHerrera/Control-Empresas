const express = require('express');
const cors = require('cors');
const app = express();

// IMPORTACION RUTAS
/*const cursosRoutes = require('./src/routes/cursos.routes');
const asignacionesRoutes = require('./src/routes/asignaciones.routes');*/
const usuariosRoutes = require('./src/routes/usuario.routes')


// MIDDLEWARES
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/
app.use('/api', usuariosRoutes);

module.exports = app;