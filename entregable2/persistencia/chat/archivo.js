const CDAO = require('../dao');
let archivo=`././chat.txt`;
const fs=require ('fs');


class ArchivoChat {
    constructor() {
        // incializar variables
        this.listaChats=[{}];
        this.archivo=archivo;
    }

    read(){
      
     const contenido = fs.readFileSync(this.archivo, 'utf-8');
     this.listaChats=JSON.parse(contenido);    
     return this.listaChats;

   }

   save(mensajes){

      fs.writeFileSync(archivo,JSON.stringify(mensajes,null,'\t'));
     return false;
   }

   
}
module.exports = new ArchivoChat();