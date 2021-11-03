const factory = require("../persistencia/factory");
let instancia = factory.getPersistencia("mongo-local", "orden");

const mail=require('../auth/mail');

class Orden {
  constructor() {
    this.listaProductos = [];
  }

  async read() {
    this.listaProductos= await instancia.read();
    return this.listaProductos;
  }
  
  async readById(id) {
    let unOrden = await instancia.readById(id);
    return unOrden;
  }

  async save(objeto) {
      
    this.listaProductos= await instancia.read();
    let idOrden = this.listaProductos.length + 1 || 1;

    
    let item = {
      id: idOrden,
      timestamp: new Date(Date.now()).toString(),      
      carritoId: objeto.carritoId,
      estado:  objeto.estado,
      email: objeto.email,
      ruta:('/api/carrito/listar/' + objeto.carritoId)
      
    };
   
    await instancia.save(item);
    
    mail.sendMailNewOrder('Christy Items',objeto.email,'Gracias por su compra Christy ', 'Gracias por elegirnos',objeto.carritoId)
      

    return item;
  }

  async update(idOrden, objeto) {    
    return await instancia.update(idOrden, objeto);
  }

  async delete(id) {    
      return await instancia.delete(id); 
  }

  
}

module.exports = new Orden();
