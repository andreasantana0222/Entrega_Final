

const modelo = require("../../src/mongo-local/models/orden");

const connection = require("../../src/mongo-local/config/conn");


class Orden {
  constructor() {}

//OK busca lista de productos
  async read() {
    let contenido = await modelo.find({});
    return contenido;
  }


  /**
     * Read an entity looking for it by id
     * @param {String} id mongodb id
     */
  async readById(id) {
    let unOrden = await modelo.findById(id);
    return unOrden;
  }

  /**
     * Read an entity looking for it by id
     * @param {String} unOrden mongodb id
     */
   async readByUser(unOrden) {   
    let ordenEncontrado = await modelo.findOne({'username':unOrden});
    return ordenEncontrado;
  }

  /**
     * Read an entity looking for it by id
     * @param {String} unEmail mongodb id
     */
   async readByEmail(unEmail) {    
    let ordenEncontrado = await modelo.findOne({'email':unEmail});
    return ordenEncontrado;
  }

  /**
     * Save an entity 
     * @param {Object} toUpdate data to update
     */
  async save(objeto) {
    let ordenGuardado = await modelo.create(objeto);

    return ordenGuardado;
  }

  /**
     * Update an entity looking for it by id
     * @param {String} idOrden mongodb id
     * @param {Object} objeto data to update
     */
  async update(idOrden,objeto) {
    let ordenGuardado = await modelo.findByIdAndUpdate(idOrden,objeto);

    return ordenGuardado;
  }

  
  /**
     * Delete an entity looking for it by id
     * @param {String} id mongodb id
     */
  async delete(id) {    
    
      let ordenBorrado = await modelo.findByIdAndRemove(id);      
   
    return ordenBorrado;
      
  }

}

module.exports = new Orden();
