const factory = require("../persistencia/factory");
let instancia = factory.getPersistencia("sqlite", "producto");

class Productos {
  constructor() {
    this.listaProductos = [{}];
  }

  async read() {
    return await instancia.read();
  }

  async save(objeto) {
    const productos = await this.read() || [];

    let id = productos.length + 1 || 1;
    let item = {
      id: id,
      timestamp: new Date(Date.now()).toLocaleString(),
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

  async update(id, objeto) {
    const productos = this.read();
    let idProducto = id - 1 || 1;
    let item = {
      id: id,
      timestamp: new Date(Date.now()).toLocaleString(),
      nombre: objeto.nombre,
      descripcion: objeto.descripcion,
      codigo: objeto.codigo,
      foto: objeto.foto,
      precio: objeto.precio,
      stock: objeto.stock,
    };
    productos[idProducto] = item;
    await instancia.update(objeto);
    return item;
  }

  async delete(id) {
    console.log('delete api');
    const productos = this.read() || [];

    if (productos.length>0){
      let item=productos.find(x=>x.id==id);
      await instancia.delete(item);
      return item;
    }

  }

  //TO DO no funciona el filtro
  async filtrar(objeto){
    console.log('filtrar');
    const productos = await this.read() || [];

    this.listaProductos=productos.map(x=>{
      //if(objeto.nombre!=null || objeto.codigo!=null || objeto.precioMax!=null || objeto.precioMin!=null )
      if (objeto.codigo!=null)
      {
        //if(x.nombre==objeto.nombre || x.codigo==objeto.codigo || 
        //(x.precio<objeto.precioMax && x.precio>precioMin) || 
        //(x.stock<objeto.stockMin && x.stock>objeto.stockMax)){
        if(x.codigo==objeto.codigo){

        return x;
      }
    }
    });
    console.log(this.listaProductos);
    return this.listaProductos;
  }

  filtrado(){
    return this.listaProductos;
  }
}

module.exports = new Productos();
