const factory = require("../persistencia/factory");
let instancia = factory.getPersistencia("archivo", "chat");

class Chat {
    constructor() {

    }

    read(){
      return instancia.read();

   }

   save(objeto){    

     const contenido =  this.read();
     contenido.push(objeto);
    

     let item={
       author:objeto.author,
       text:objeto.text,
       email:objeto.email,
       datetime:(new Date(Date.now())).toLocaleString()
     }

     instancia.save(contenido);
     return item;
   }


}

module.exports = new Chat();
