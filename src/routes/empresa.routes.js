const express = require('express');
const controladorEmpresas = require('../controllers/empresa.controller');
const md_authentication = require('../middlewares/autenticacion');

const api = express.Router();

/*api.get('/productos', md_authentication.Auth, productosControlador.ObtenerProductos);*/
api.post('/agregarEmpresas',  md_authentication.Auth, controladorEmpresas.AgregarEmpresas);
api.put('/editarEmpresa/:idEmpresa',  md_authentication.Auth, controladorEmpresas.EditarEmpresas);
/*api.delete('/eliminarProducto/:idProducto',  md_authentication.Auth, productosControlador.EliminarProductos);*/
/*
// PROVEEDOR
api.post('/agregarProveedor', productosControlador.agregarProveedor);
api.put('/agregarProveedorAProducto/:idProducto/:idProveedor', productosControlador.agregarProvedorProducto)
api.get('/buscarProductoXProveedor/:idProveedor', productosControlador.buscarProductoXProveedor)*/

module.exports = api;