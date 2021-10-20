

const modelo = require("../../src/mongo-local/models/producto");

const connection = require("../../src/mongo-local/config/conn");


class Producto {
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

module.exports = new Producto();
