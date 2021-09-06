const mongoose = require("mongoose");

const mensaje = require("../../src/mongo-local/models/chat");
const config = require("../../src/mongo-local/config/configChat.json");

// conexion a la base de datos
await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('conexion a la base de datos realizada!');

class Chat {
    constructor() {}
  
    async read() {
      let contenido = await mensaje.find({});
      return contenido;
    }
  
    async save(objeto) {
      let usuarioGuardado = await mensaje.create(objeto);
  
      return false;
    }
  }
  
  module.exports = new Chat();
  