const mensaje = require("../../src/mongo-local/models/chat");
const connection = require("../../src/mongo-local/config/conn");

// TO DO no lee el chat

class Chat {
    constructor() {}
  
    async read() {
      let contenido = await mensaje.find();
      return contenido;
    }
  
    async save(objeto) {
      let usuarioGuardado = await mensaje.create(objeto);
  
      return false;
    }
  }
  
  module.exports = new Chat();
  