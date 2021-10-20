'use strict'

//Modelo
const carrito = require("../../src/mongo-local/models/carrito");
//Conexion a BD Mongo
const connection = require("../../src/mongo-local/config/conn");


class Carrito {
    constructor() { }
  
    //OK busca lista de carritos
    async read() {
      let carritos = await carrito.find({});  
      return carritos;
    }

    //OK busca carrito
    async readById(id) {
      let unCarrito = await carrito.findById(id);
      return unCarrito;
    }
  
    //OK graba carrito
    async save(product) {     
      let carritoGuardado = await carrito.create(product);
      return carritoGuardado;
    }
  
    //OK actualiza carrito
    async update(id,unCarrito) {      
      let carritoGuardado = await carrito.findByIdAndUpdate(id,unCarrito);  
      return carritoGuardado;
    }
  
    //OK borra carrito
    async delete(id) {
      const unCarrito = await this.readById(id);
      if(unCarrito!=null) {
        let carritoBorrado = await carrito.deleteOne(unCarrito);      
      }
      return unCarrito;
        
    }
    
  }
  
  module.exports = new Carrito();
  