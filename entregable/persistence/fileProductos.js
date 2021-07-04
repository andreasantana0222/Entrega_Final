let archivo='./productos.txt';
const fs=require ('fs');

class File {
    constructor() {
        // incializar variables
        this.archivo=archivo;
        console.log('constructor fileProductos.js');
    }

    read(){
      try {
        const productos = fs.readFileSync(this.archivo, 'utf-8');
        console.log(productos);
        return JSON.parse(productos);
      } catch (e) {
        throw e;
      } finally {

      }


   }

   save(productos){

     try {

        fs.writeFileSync(archivo,JSON.stringify(productos,null,'\t'));
       return item;
     } catch (e) {
       throw e;
     } finally {

     }

   }


}

module.exports = new File();
