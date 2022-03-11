const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')

function RegistrarAdmin(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario();

           if (parametros.nombre && parametros.apellido && parametros.password && parametros.email
               ) {
                modeloUsuario.nombre = parametros.nombre;
                modeloUsuario.apellido = parametros.apellido;
                modeloUsuario.email = parametros.email; 
                modeloUsuario.password = parametros.password;
                modeloUsuario.rol = 'Admin';

                bcrypt.hash(parametros.password, null, null, (err, passwordEncripatada) => {
                    modeloUsuario.password = passwordEncripatada;

                    modeloUsuario.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({mensaje: 'Error en la peticion'})
                        if (!usuarioGuardado) return res.status(500).send({mensaje: 'Error al Registrar'});
    
                        return res.status(200).send({usuario: usuarioGuardado});
                    });
                })     
           }else {
               return res.status(500).send({mensaje:'Debe ingrear los parametros obligatorios'})
           }
        }

        function RegistrarEmpresa(req, res) {
            var parametros = req.body;
            var modeloUsuario = new Usuario();
            
            if( req.user.rol !== 'Admin') {
                return res.status(500).send({ mensaje: 'No tiene los permisos para editar este Curso.' });
            }

                   if (parametros.nombre && parametros.apellido && parametros.password && parametros.email
                       ) {
                        modeloUsuario.nombre = parametros.nombre;
                        modeloUsuario.apellido = parametros.apellido;
                        modeloUsuario.email = parametros.email; 
                        modeloUsuario.password = parametros.password;
                        modeloUsuario.rol = 'Empresa';
        
                        bcrypt.hash(parametros.password, null, null, (err, passwordEncripatada) => {
                            modeloUsuario.password = passwordEncripatada;
        
                            modeloUsuario.save((err, usuarioGuardado) => {
                                if (err) return res.status(500).send({mensaje: 'Error en la peticion'})
                                if (!usuarioGuardado) return res.status(500).send({mensaje: 'Error al Registrar'});
            
                                return res.status(200).send({usuario: usuarioGuardado});
                            });
                        })     
                   }else {
                       return res.status(500).send({mensaje:'Debe ingrear los parametros obligatorios'})
                   }
                }
        


//ELIMINAR USUARIOR
function EliminarUsuario (req,res){
    var idUsu = req.params.idUsuario;
    
    if( req.user.rol !== 'Admin') {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este Curso.' });
    
}else{

    Usuario.findByIdAndDelete(idUsu, (err, usuarioEliminado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
    if(!usuarioEliminado) return res.status(500)
    .send({mensaje: 'Error al eliminar'});

    return res.status(200).send({ usuario: usuarioEliminado})

    })
}
}

function Login(req, res) {
    var parametros = req.body;
    // BUSCAMOS EL CORREO
    Usuario.findOne({ email : parametros.email }, (err, usuarioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){
            // COMPARAMOS CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword) => {//TRUE OR FALSE
                    if (verificacionPassword) {
                        return res.status(200)
                            .send({ token: jwt.crearToken(usuarioEncontrado) })
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'La contrasena no coincide.'})
                    }
                })
        } else {
            return res.status(500)
                .send({ mensaje: 'El usuario, no se ha podido identificar'})
        }
    })
}



function EditarUsuario(req,res){
    var parametros = req.body;

    if( req.user.rol !== 'Admin') {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este Curso.' });
    }
    // borrar la propiedad de password
    delete parametros.password

    Usuario.findByIdAndUpdate(req.params.idUsuario , parametros, {new: true}, (err, usuarioEditado)=>{
        if (err) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!usuarioEditado) return res.status(500).send({mensaje:'Error al editar el Usuario'});
        
        return res.status(200).send({usuario: usuarioEditado});
            
        
    })

}



module.exports = {
    RegistrarAdmin,
    RegistrarEmpresa,
    EditarUsuario,
    EliminarUsuario,
    Login
}
