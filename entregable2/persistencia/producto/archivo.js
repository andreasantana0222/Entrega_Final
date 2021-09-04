const CDAO = require('../dao');
let archivo=`././productos.txt`;
const fs=require ('fs');


class ArchivoProductos {
    constructor() {
        // incializar variables
        this.listaProductos=[{}];
        this.archivo=archivo;
    }

    read(){
      
     const contenido = fs.readFileSync(this.archivo, 'utf-8');
     this.listaProductos=JSON.parse(contenido);    
     return this.listaProductos;

   }

   save(productos){

      fs.writeFileSync(archivo,JSON.stringify(productos,null,'\t'));
     return false;
   }

   
}
module.exports = new ArchivoProductos();