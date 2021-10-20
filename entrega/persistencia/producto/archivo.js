

let archivo = (__dirname+ "../../files") + "/productos.txt";

const fs = require("fs");

class ArchivoProductos {
  constructor() {
    // incializar variables
    this.listaProductos = [{}];
    this.archivo = archivo;
  }

  read() {    
    this.listaProductos = JSON.parse(fs.readFileSync(this.archivo, "utf-8"));
    return this.listaProductos;
  }

  saveFile(productos) {
    fs.writeFileSync(archivo, JSON.stringify(productos, null, "\t"));
    return false;
  }

  save(objeto) {
    this.listaProductos.push(objeto);
    this.saveFile(this.listaProductos);
    return false;
  }

  //TO DO reemplazar producto no agregarlo
  update(objeto) {
    let indx = this.listaProductos.findIndex((x) => x.id == objeto.id);
    this.listaProductos[indx] = objeto;
    this.saveFile(this.listaProductos);
    return false;
  }

  delete(objeto) {
    let indx = this.listaProductos.findIndex((x) => x.id == objeto.id);
    this.listaProductos.splice(indx, indx >= 0 ? 1 : 0);
    this.saveFile(this.listaProductos);
    return false;
  }

  
}
module.exports = new ArchivoProductos();
