const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')

function RegistrarAdmin(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario();

           if (parametros.nombre && parametros.password
               ) {
                modeloUsuario.nombre = parametros.nombre; 
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
            var modeloEmpresa = new Empresa();

            if( req.user.rol !== 'Admin') {
                return res.status(500).send({ mensaje: 'No tiene los permisos para empresas.' });
            }
            if (parametros.nombre && parametros.password
                ) {
                 modeloEmpresa.nombre = parametros.nombre; 
                 modeloEmpresa.password = parametros.password;
                 modeloEmpresa.rol = 'Empresa';
 
                 bcrypt.hash(parametros.password, null, null, (err, passwordEncripatada) => {
                    modeloUsuario.password = passwordEncripatada;

                    modeloEmpresa.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({mensaje: 'Error en la peticion'})
                        if (!usuarioGuardado) return res.status(500).send({mensaje: 'Error al Registrar'});
    
                        return res.status(200).send({empresa: usuarioGuardado});
                    });
                })     
           }else {
               return res.status(500).send({mensaje:'Debe ingrear los parametros obligatorios'})
           }
        }


//ELIMINAR USUARIOR
function EliminarUsuario (req,res){
    var idUsu = req.params.idUsuario;
    
if (req.user.sub !== idUsu) {
    return res.status(500).send({mensaje: 'No tiene los permisos para editar este usuario'})
    
}else{

    Usuario.findByIdAndDelete(idUsu, (err, usuarioEliminado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
    if(!usuarioEliminado) return res.status(500)
    .send({mensaje: 'Error al eliminar'});

    return res.status(200).send({ usuario: usuarioEliminado})

    })
}
}

function RegistrarEmpresa(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario();

    Usuario.find({ email: parametros.email}, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length > 0) {
            return res.status(500).send({mensaje:'Este correro ya se esta utilizando'})
        } else {
    if (parametros.nombre && parametros.apellido && parametros.email &&  
        parametros.password
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
    });   
}

function RegistrarEmpresa(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario();

    Usuario.find({ email: parametros.email}, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length > 0) {
            return res.status(500).send({mensaje:'Este correro ya se esta utilizando'})
        } else {
    if (parametros.nombre && parametros.apellido && parametros.email &&  
        parametros.password
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
    });   
}   

//LOGIN
function Login(req,res) {
    var parametros = req.body;

//Buscamos usuario por email
    Usuario.findOne({email: parametros.email},(err, usuarioEncontrado) => {
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
        if (usuarioEncontrado) {
            
            //comparamos contraseñas sin encriptar y con
            bcrypt.compare(parametros.password, usuarioEncontrado.password, (err, passwordCorrecta) => {
                if (passwordCorrecta) {
                    return res.status(200).send({token: jwt.crearToken(usuarioEncontrado)})
                }else {
                    return res.status(500).send({mensaje:'Las contrasenas no coinciden'})
                }
            })

        }else {
            return res.status(500).send({mensaje:'El usuario no se ha podido identificar'})
        }
    })
    
}



function EditarUsuario(req,res){
    var idUser = req.params.idUsuario;
    var parametros = req.body;

    // borrar la propiedad de password
    delete parametros.password

    if (req.user.sub !== idUser) {
        return res.status(500).send({mensaje:'No tiene los permisos para editar este usuario'});
    }

    Usuario.findByIdAndUpdate(req.user.sub, parametros, {new: true}, (err, usuarioEditado)=>{
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
