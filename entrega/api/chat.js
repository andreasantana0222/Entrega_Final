const factory = require("../persistencia/factory");
let instancia = factory.getPersistencia("mongo-local", "chat");

class Chat {
    constructor() {

    }

    async read(){
      return await instancia.read();

   }

   async save(objeto){    

    let item={
      author:objeto.author,
      text:objeto.text,
      email:objeto.email,
      datetime:(new Date(Date.now())).toString()
    }

     await instancia.save(item);
     return item;
   }


}

module.exports = new Chat();


