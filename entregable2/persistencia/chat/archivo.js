const CDAO = require('../dao');
//TO DO cambiar a path relativo
let archivo="C:/Users/chris/OneDrive/Documents/Malena/Coder House/Desafio Final/entregable2/persistencia/files/chat.txt";
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

   save(objeto){
    const contenido =  this.read();
    contenido.push(objeto);   

    
      fs.writeFileSync(archivo,JSON.stringify(contenido,null,'\t'));
     return false;
   }

   
}
module.exports = new ArchivoChat();