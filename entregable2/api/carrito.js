const factory = require("../persistencia/factory");
let instancia = factory.getPersistencia("mongo-atlas", "carrito");

class Carrito {
  constructor() {
    this.listaProductos = [{}];
  }

  async read() {
    return await instancia.read();
  }

  async save(objeto) {
    
    const productos = this.read() || [];

    let id = productos.length + 1 || 1;

    let item = {
      id: id,
      timestamp: new Date(Date.now()).toLocaleString(),
      producto: objeto.producto,
    };
   
    await instancia.save(item);
    return item;
  }

  async update(id, objeto) {
    const productos = this.read() || [];
    
    let item = {
      id: id,
      timestamp: new Date(Date.now()).toLocaleString(),
      producto: objeto,
    };

    //productos[idProducto] = item;
    await instancia.update(item);
    return item;
  }

  async delete(id) {

    const productos = this.read() || [];

    if (productos.length>0){
      let item=productos.find(x=>x.producto.id==id);
      await instancia.delete(item);
      return item;
    }
    
  }
}

module.exports = new Carrito();
