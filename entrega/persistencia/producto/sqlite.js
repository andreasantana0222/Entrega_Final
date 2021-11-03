//Knex
const options = require("C:/Users/chris/OneDrive/Documents/Malena/Coder House/Desafio Final/entregable2/src/sqlite/config.js");
const knex = require("knex")(options);

class Producto {
  constructor() {
    // incializar variables
  }

  async read() {
        
      try {
        let contenido = await knex.from("productos").select("*");
        return contenido;
      } catch (error) {
        throw error;
      } 
    
  }

  async save(objeto) {
    

    const contenido = await this.read();

    let id = contenido.length + 1;

    let item = {
      id: id,
      timestamp: new Date(Date.now()).toLocaleString(),
      nombre: objeto.nombre,
      descripcion: objeto.descripcion,
      codigo: objeto.codigo,
      foto: objeto.foto,
      precio: objeto.precio,
      stock: objeto.stock,
    };  
      try {
        await knex("productos").insert(item);
        return item;
      } catch (error) {
        throw error;
      } 
    
  }
}

module.exports = new Producto();
