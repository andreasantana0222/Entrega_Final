const CDAO = require("../dao");
//TO DO cambiar a path relativo
let archivo = "C:/Users/chris/OneDrive/Documents/Malena/Coder House/Desafio Final/entregable2/persistencia/files/carrito.txt";
const fs = require("fs");
const { update } = require("../../api/producto");

class ArchivoCarrito {
  constructor() {
    // incializar variables
    this.listaProductos = [{}];
    this.archivo = archivo;
  }

  read() {
    const contenido = fs.readFileSync(this.archivo, "utf-8");
    this.listaProductos = JSON.parse(contenido);
    return this.listaProductos;
  }
  saveFile(productos) {
    fs.writeFileSync(archivo, JSON.stringify(productos, null, "\t"));
  }

  
  save(objeto) {
    console.log("persistencia save carrito")
    const productos = this.read() || [];
    
    productos.push(objeto);
    
    this.saveFile(productos);
    return false;
  }

  update(objeto) {
    const productos = this.read() || [];

    //Consulto el índice
    let indx = productos.findIndex((x) => x.producto.id == objeto.producto.id);
    productos[indx] = objeto.producto;
    this.saveFile(productos);
  }

  delete(objeto) {
    const productos = this.read() || [];

    //Consulto el índice
    let indx = productos.findIndex((x) => x.producto.id == objeto.producto.id);

    //quito el índice del array
    productos.splice(indx, indx >= 0 ? 1 : 0);

    this.saveFile(productos);
    return false;
  }
}
module.exports = new ArchivoCarrito();
