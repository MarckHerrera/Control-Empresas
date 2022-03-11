const express = require('express');
const controladorEmpresas = require('../controllers/empresa.controller');
const md_authentication = require('../middlewares/autenticacion');

const api = express.Router();

//EMPRESAS
api.post('/agregarEmpresas',  md_authentication.Auth, controladorEmpresas.AgregarEmpresas);
api.put('/editarEmpresa/:idEmpresa',  md_authentication.Auth, controladorEmpresas.EditarEmpresas);
api.put('/eliminarEmpresa/:idEmpresa',  md_authentication.Auth, controladorEmpresas.EliminarEmpresas);

//EMPLEADOS
api.post('/agregarEmpleados',  md_authentication.Auth, controladorEmpresas.agregarEmpleados);
api.put('/agregarEmpleadoEmpresa/:idEmpresa',  md_authentication.Auth, controladorEmpresas.EditarEmpresas);
api.get('/buscarEmoleadoId/:idEmpleado',  md_authentication.Auth, controladorEmpresas.buscarEmpleadoId);
api.get('/buscarDatosEmpleado',  md_authentication.Auth, controladorEmpresas.buscarDatosEmpleado);

module.exports = api;