//Knex
const options = require("C:/Users/chris/OneDrive/Documents/Malena/Coder House/Desafio Final/entregable2/src/mysql/config.js");
const knex = require("knex")(options);

class Carrito {
  constructor() {
    
  }


  async read() {
    console.log("read carrito");    
      try {
        
        let contenido= await knex.select('carrito.id','carrito.timestamp','productos.id as producto_id','productos.nombre','productos.foto')
        .from('carrito')
        .innerJoin('productos','productos.id','carrito.producto_id');
        let carrito=contenido.map(doc=>{
          return {
            id: doc.id,
            timestamp: doc.timestamp,
            producto:{
            id:doc.producto_id,
            nombre:doc.nombre,
            foto:doc.foto
            }
          }
        })
        console.log(carrito);
        return carrito;
      } catch (error) {
        throw error;
      } 
    
  }

  //TO DO no graba las horas
  async save(objeto) {
    console.log("save carrito");

    const contenido = await this.read();

    let id = contenido.length + 1;

    let item = {
      id: objeto.id,
      timestamp: objeto.timestamp,
      id_producto: objeto.producto.id,
    };    
      try {
        await knex("carrito").insert(item);
        return item;
      } catch (error) {
        throw error;
      } 
    
  }

  async update(idCarrito,objeto) {
    console.log("update carrito");

    const contenido = await this.read();

    let id = contenido.length + 1;

    let item = {
      id: idCarrito,
      timestamp: objeto.timestamp,
      id_producto: objeto.producto.id,
    };    
      try {
        await knex("carrito").insert(item);
        return item;
      } catch (error) {
        throw error;
      } 
    
  }
}

module.exports = new Carrito();
