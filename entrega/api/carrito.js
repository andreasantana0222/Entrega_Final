const factory = require("../persistencia/factory");
let instancia = factory.getPersistencia("mongo-local", "carrito");


class Carrito {
  constructor() {
    this.listaProductos = [];
  }

  async read() {
    this.listaProductos= await instancia.read();
    return this.listaProductos;
  }
  
  async readById(id) {
    let unCarrito = await instancia.readById(id);
    return unCarrito;
  }

  async save(objeto) {
    console.log('api/carrito - save');   

    let idCarrito = this.listaProductos.length + 1 || 1;

    
    let item = {
      id: idCarrito,
      timestamp: new Date(Date.now()).toString(),
      producto: {
        id: objeto.producto.id,
        timestamp: objeto.producto.timestamp.toString(),
        nombre: objeto.producto.nombre,
        descripcion: objeto.producto.descripcion,
        codigo: objeto.producto.codigo,
        foto: objeto.producto.foto,
        precio: objeto.producto.precio,
        stock: objeto.producto.stock
      }
    };
   
    await instancia.save(item);
    return item;
  }

  async update(idCarrito, objeto) {    
    return await instancia.update(idCarrito, objeto);
  }

  async delete(id) {    
      return await instancia.delete(id); 
  }
}

module.exports = new Carrito();
