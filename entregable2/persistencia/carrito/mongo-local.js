const mongoose = require("mongoose");

const mensaje = require("../../src/mongo-local/models/carrito");
const config = require("../../src/mongo-local/config/configCarrito.json");

// conexion a la base de datos
await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('conexion a la base de datos realizada!');

class Carrito {
    constructor() {}
  
  //TO DO no lee en Postman
    async read() {
      let contenido = await mensaje.find({});
      return contenido;
    }
  
    async save(objeto) {
      let usuarioGuardado = await mensaje.create(objeto);
  
      return false;
    }
  
    //TO DO no graba bien los encabezados
    async update(objeto) {
      let usuarioGuardado = await mensaje.updateOne(objeto);
  
      return false;
    }
  
    //TO DO no borra
    async delete(id) {
      const productos = this.read() || [];
  
      for (var i = 0; i < productos.length; i++) {
        if (productos[i].id == id) {
          let item = productos[i];
          
          let usuarioGuardado = await mensaje.delete(item);
          return item;
        }
      }
    }
  }
  
  module.exports = new Carrito();
  