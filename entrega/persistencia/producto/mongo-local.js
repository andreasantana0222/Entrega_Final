

const modelo = require("../../src/mongo-local/models/producto");

const connection = require("../../src/mongo-local/config/conn");


class Producto {
  constructor() {}

//OK busca lista de productos
  async read() {
    let contenido = await modelo.find({});
    return contenido;
  }

  //OK busca producto
  async readById(id) {
    let unProducto = await modelo.findById(id);
    return unProducto;
  }

  async save(objeto) {
    let productoGuardado = await modelo.create(objeto);

    return productoGuardado;
  }

  //OK actualiza producto
  async update(idProducto,objeto) {
    let productoGuardado = await modelo.findByIdAndUpdate(idProducto,objeto);

    return productoGuardado;
  }

  
  //OK borra producto
  async delete(id) {    
    
      let productoBorrado = await modelo.findByIdAndRemove(id);      
   
    return productoBorrado;
      
  }

}

module.exports = new Producto();
