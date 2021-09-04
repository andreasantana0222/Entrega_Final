const factory = require("../persistencia/factory");
let instancia = factory.getPersistencia("archivo", "carrito");

class Carrito {
  constructor() {
    this.listaProductos = [{}];
  }

  read() {
    return instancia.read();
  }

  save(objeto) {
    const productos = this.read() || [];

    let id = productos.length + 1 || 1;

    let item = {
      id: id,
      timestamp: new Date(Date.now()).toLocaleString(),
      producto: objeto,
    };

    productos.push(item);
    instancia.save(productos);
    return item;
  }

  update(id, objeto) {
    const productos = this.read() || [];
    let idProducto = id - 1 || 1;
    let item = {
      id: id,
      timestamp: new Date(Date.now()).toLocaleString(),
      producto: objeto,
    };

    productos[idProducto] = item;
    instancia.save(productos);
    return item;
  }

  delete(id) {
    const productos = this.read() || [];

    for (var i = 0; i < productos.length; i++) {
      if (productos[i].id == id) {
        let item = productos[i];
        productos.splice(i, 1);
        instancia.save(productos);
        return item;
      }
    }
  }
}

module.exports = new Carrito();
