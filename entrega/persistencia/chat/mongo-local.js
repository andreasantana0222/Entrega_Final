const modelo = require("../../src/mongo-local/models/chat");
const connection = require("../../src/mongo-local/config/conn");

// TO DO no lee el chat

class Chat {
    constructor() {}
  
    async read() {
      let contenido = await modelo.find();
      return contenido;
    }
  
    async save(objeto) {
      let usuarioGuardado = await modelo.create(objeto);
  
      return false;
    }
  }
  
  module.exports = new Chat();
  