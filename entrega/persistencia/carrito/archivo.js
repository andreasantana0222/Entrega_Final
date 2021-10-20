

let archivo = (__dirname+ "../../files") + "/carrito.txt";

const fs = require("fs");

class ArchivoCarrito {
  constructor() {
    // incializar variables
    this.listaCarritos = [{}];
    this.archivo = archivo;
  }
//TO DO no lista los carritos en Postman
  read() {    
    this.listaCarritos = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'));    
    return this.listaCarritos;
  }

  saveFile(carritos) {
    fs.writeFileSync(archivo, JSON.stringify(carritos, null, "\t"));
  }

  
  save(carrito) {   
    
    this.listaCarritos.push(carrito);
    
    this.saveFile(this.listaCarritos);
    return false;
  }

  update(objeto) {

     //Consulto el índice
    let indx = this.listaCarritos.findIndex((x) => x.producto.id == objeto.producto.id);
    this.listaCarritos[indx] = objeto.producto;
    this.saveFile(this.listaCarritos);
  }

  delete(objeto) {
    console.log("persistencia/carrito - delete");

    //Consulto el índice
    let indx = this.listaCarritos.findIndex((x) => x.producto.id == objeto.producto.id);

    //quito el índice del array
    this.listaCarritos.splice(indx, indx >= 0 ? 1 : 0);

    this.saveFile(this.listaCarritos);
    return false;
  }
}
module.exports = new ArchivoCarrito();
