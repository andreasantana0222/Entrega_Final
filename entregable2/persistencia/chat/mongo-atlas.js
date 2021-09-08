const mongoose = require("mongoose");
//const producto = require('../01-setup/models/producto');
const mensaje = require("../../src/mongo-atlas/models/chat");
const config = require("../../src/mongo-atlas/config/config.js");

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
