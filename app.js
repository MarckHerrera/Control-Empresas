const express = require('express');
const cors = require('cors');
const app = express();

// IMPORTACION RUTAS
const empresasRoutes = require('./src/routes/empresa.routes');
const usuariosRoutes = require('./src/routes/usuario.routes')


// MIDDLEWARES
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/
app.use('/api', usuariosRoutes, empresasRoutes);

module.exports = app;