//Knex
const options = require("C:/Users/chris/OneDrive/Documents/Malena/Coder House/Desafio Final/entregable2/src/mysql/config.js");
const knex = require("knex")(options);

class Chat {
  constructor() {
    // incializar variables
  }

  async read() {
        
      try {
        let contenido = await knex.from("chat").select("*");
        return contenido;
      } catch (error) {
        throw error;
      } 
    
  }

  async save(objeto) {
    

    const contenido = await this.read();

    let id = contenido.length + 1;

    let item = {
      author: objeto.author,
      text: objeto.text,
      email: objeto.email,
      datetime: new Date(Date.now()).toLocaleString(),
    };    
      try {
        await knex("chat").insert(item);
        return item;
      } catch (error) {
        throw error;
      } 
    
  }
}

module.exports = new Chat();
