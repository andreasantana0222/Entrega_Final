const mongoose = require("mongoose");

const modelo = require("../../src/mongo-atlas/models/carrito");
const config = require("../../src/mongo-atlas/config/config.js");

class Carrito {
  constructor() {}

//TO DO no lee en Postman
  async read() {
    let contenido = await modelo.find({});
    return contenido;
  }

  async save(objeto) {
    let usuarioGuardado = await modelo.create(objeto);

    return false;
  }

  //TO DO no graba bien los encabezados
  async update(objeto) {
    let usuarioGuardado = await modelo.updateOne(objeto);

    return false;
  }

  //TO DO no borra
  async delete(id) {
    const productos = this.read() || [];

    for (var i = 0; i < productos.length; i++) {
      if (productos[i].id == id) {
        let item = productos[i];
        
        let usuarioGuardado = await modelo.delete(item);
        return item;
      }
    }
  }
}

module.exports = new Carrito();
