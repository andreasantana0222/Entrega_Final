const factory = require("../persistencia/factory");
let instancia = factory.getPersistencia("mongo-local", "producto");

class Productos {
  constructor() {
    this.listaProductos = [{}];
  }

  async read() {
    this.listaProductos= await instancia.read();
    return this.listaProductos;
  }

  async readById(id) {
    let unProducto = await instancia.readById(id);
    return unProducto;
  }

  async save(objeto) {
    

    let idProducto = this.listaProductos.length + 1 || 1;

    let item = {
      id: idProducto,
      timestamp: new Date(Date.now()).toString(),
      nombre: objeto.nombre,
      descripcion: objeto.descripcion,
      codigo: objeto.codigo,
      foto: objeto.foto,
      precio: objeto.precio,
      stock: objeto.stock,
    };
    
    await instancia.save(item);
    return item;
  }

  async update(idProducto, objeto) {  
    objeto.timestamp=new Date(Date.now()).toString(); 
    return await instancia.update(idProducto, objeto);
  }

  async delete(id) {    
      return await instancia.delete(id); 
  } 

  
}

module.exports = new Productos();
