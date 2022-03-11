const Empresas = require('../models/empresa.model');
const Empleados = require('../models/empleado.model');

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

function EliminarEmpresas(req, res) {
    var idEm = req.params.idEmpresa;

    Empresas.findByIdAndDelete(idEm, (err,  empresaEditada)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!empresaEditada) return res.status(404)
            .send({ mensaje: 'Error al Editar la Empresa' });

        return res.status(200).send({ empresa: empresaEditada});
    })
}


function agregarEmpleados(req, res) {
    const parametros = req.body;
    const modeloEmpleados = new Empleados();

    if(parametros.nombre && parametros.apellido && parametros.edad && parametros.trabajo){

        modeloEmpleados.nombre = parametros.nombre;
        modeloEmpleados.apellido = parametros.apellido;
        modeloEmpleados.edad = parametros.edad;
        modeloEmpleados.trabajo = parametros.trabajo;

        modeloEmpleados.save((err, empleadoGuardado) => {
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
            if(!empleadoGuardado) return res.status(500).send({ mensaje: 'Error al guardar el empleado'});

            return res.status(200).send({ empleado: empleadoGuardado})
        })

    } else {
        return res.status(404).send({ mensaje: 'Debe enviar los parametros Obligatorios'});
    }


}


function agregarEmpleadoEmpresa(req, res) {
    var idEmpre = req.params.idEmpresa;
    var idEmple = req.params.idEmpleado;

    Empresas.findByIdAndUpdate(idEmpre, { $push: { empleados : { idEmpleado: idEmple } } }, {new : true}, 
        (err, empleadoAgregado) => {
            if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
            if(!empleadoAgregado) return res.status(500).send({ mensaje: 'Error al agregar el empleado a la empresa'});

            return res.status(200).send({ product: proveedorAgregado });
        })
}


function buscarEmpleadoId(req, res) {
    const idEmpleado = req.params.idEmpleado;

    Empleados.findOne({ _id: idEmpleado, idEmpresa: req.user.sub }, (err, empresaEncontrada) => {
        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: "No puedes editar un empleado que no sea de tu Empresa" });
        }
        Empleados.find({ _id: idEmpleado }, (err, empleadoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!empleadoEncontrado) return res.status(500).send({ mensaje: 'Error al buscar empleado' });

            return res.status(200).send({ empleado: empleadoEncontrado })
        }
        )
    })
}

function buscarDatosEmpleado(req, res) {
    var parametros = req.body;

    Empleados.find({ nombre: parametros.nombre, apellido: parametros.apellido }, 
        { nombre: 1 , apellido: 1}, (err, usuariosEncontrados) => {
            if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
            if(!usuariosEncontrados) return res.status(500)
                .send({ mensaje: 'Error al obtener un empleado'})

            return res.status(200).send({ usuarios: usuariosEncontrados })
    })
}

module.exports = {

    AgregarEmpresas,
    EditarEmpresas,
    EliminarEmpresas,
    agregarEmpleados,
    agregarEmpleadoEmpresa,
    buscarEmpleadoId,
    buscarDatosEmpleado

}