const factory = require("../persistencia/factory");
let instancia = factory.getPersistencia("mongo-local", "usuario");

const auth = require('../auth/auth');

const mail=require('../auth/mail');

class Usuario {
    constructor() {
      this.listaUsuarios = [];
    }
  
    async read() {
      this.listaUsuarios= await instancia.read();
      return this.listaUsuarios;
    }
    
    async readById(id) {
      let unUsuario = await instancia.readById(id);
      return unUsuario;
    }

    async readByUser(unUsuario) {
      console.log('api - readByUser');
      let usuarioEncontrado = await instancia.readByUser(unUsuario);
      return usuarioEncontrado;
    }
  
    
    async readByEmail(unUsuario) {
      console.log('api - readByEmail');
      let usuarioEncontrado = await instancia.readByEmail(unUsuario);
      return usuarioEncontrado;
    }

    async save(objeto) {
              
      let item = {
        timestamp: new Date(Date.now()).toString(),
        nombre: objeto.nombre,
        email: objeto.email,
        password: await auth.encryptPassword(objeto.password), //objeto.password, 
        foto: objeto.foto       
        
      };
     
      await instancia.save(item);
      //let html='<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>';
      let html="";
      mail.sendMailWelcome('Christy User Register',item.email,'Bienvenido a Christy ' + objeto.nombre, 'Bienvenido a Christy, gracias por elegirnos')
      return item;
    }
  
    async update(idUsuario, objeto) {  
      console.log('api-update');
      let item = {
        timestamp: new Date(Date.now()).toString(),
        nombre: objeto.nombre,
        email: objeto.email,
        password: await auth.encryptPassword(objeto.password), //objeto.password, 
        foto: objeto.foto               
      };  
      
      console.log(idUsuario + item);
      return await instancia.update(idUsuario, item);
    }
  
    async delete(id) {    
        return await instancia.delete(id); 
    }


  }
  
  module.exports = new Usuario();
  