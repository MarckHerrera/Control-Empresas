const Empresas = require('../models/empresa.model');
const Empleados = require('../models/empleado.model');


/*// OBTENER PRODUCTOS
function ObtenerProductos (req, res) {
    Productos.find({}, (err, productosEncontrados) => {

        return res.send({ productos: productosEncontrados })
    }).populate('provedores.idProveedor')
}*/

// AGREGAR EMPRESAS
function AgregarEmpresas (req, res) {
    var parametros = req.body;
    var modeloEmpresas = new Empresas();
    
    if( req.user.rol !== 'Admin') {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este Curso.' });
    }

    if( parametros.nombre && parametros.direccion ){
        modeloEmpresas.nombre = parametros.nombre;
        modeloEmpresas.direccion = parametros.direccion;   

        modeloEmpresas.save((err, empresaGuardado)=>{

            return res.send({ empresa: empresaGuardado});
        });
    } else {
        return res.send({ mensaje: "Debe enviar los parametros obligatorios."})
    }


}

function EditarEmpresas(req, res) {
    var idEm = req.params.idEmpresa;
    var parametros = req.body;

    if( req.user.rol !== 'Admin') {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este Curso.' });
    }

    Empresas.findByIdAndUpdate(idEm, parametros, { new : true } ,(err, empresaEditada)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!empresaEditada) return res.status(404)
            .send({ mensaje: 'Error al Editar la Empresa' });

        return res.status(200).send({ empresa: empresaEditada});
    })
}
/*
function EliminarProductos(req, res) {
    var idProd = req.params.idProducto;

    Productos.findByIdAndDelete(idProd, (err, productoEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!productoEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el producto' })

        return res.status(200).send({ producto: productoEliminado });
    })
}

function agregarProveedor(req, res) {
    const parametros = req.body;
    const modeloProveedor = new Proveedor();

    if(parametros.nombreProveedor && parametros.direccion){

        modeloProveedor.nombreProveedor = parametros.nombreProveedor;
        modeloProveedor.direccion = parametros.direccion;

        modeloProveedor.save((err, proveedorGuardado) => {
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
            if(!proveedorGuardado) return res.status(500).send({ mensaje: 'Error al guardar el proveedor'});

            return res.status(200).send({ proveedor: proveedorGuardado})
        })

    } else {
        return res.status(404).send({ mensaje: 'Debe enviar los parametros Obligatorios'});
    }


}

function agregarProvedorProducto(req, res) {
    var productoId = req.params.idProducto;
    var proveedorId = req.params.idProveedor;

    Productos.findByIdAndUpdate(productoId, { $push: {  provedores : { idProveedor: proveedorId } } }, {new : true}, 
        (err, proveedorAgregado) => {
            if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
            if(!proveedorAgregado) return res.status(500).send({ mensaje: 'Error al agregar el proveedor al producto'});

            return res.status(200).send({ product: proveedorAgregado });
        })
}

function buscarProductoXProveedor(req, res) {
    const proveedorId = req.params.idProveedor;

    Productos.find({ provedores : { $elemMatch: { _id: proveedorId } } }, (err, productosEncontrados)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!productosEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los productos por proveedor'});

        return res.status(200).send({ productos: productosEncontrados })
    })
    
}*/

module.exports = {

    AgregarEmpresas,
    EditarEmpresas

}