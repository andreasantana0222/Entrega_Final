

const modelo = require("../../src/mongo-local/models/usuario");

const connection = require("../../src/mongo-local/config/conn");


class Usuario {
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
    let unUsuario = await modelo.findById(id);
    return unUsuario;
  }

  /**
     * Read an entity looking for it by id
     * @param {String} unUsuario mongodb id
     */
   async readByUser(unUsuario) {
    let usuarioEncontrado = await modelo.findOne({username:unUsuario.username});
    return usuarioEncontrado;
  }

  /**
     * Save an entity 
     * @param {Object} toUpdate data to update
     */
  async save(objeto) {
    let usuarioGuardado = await modelo.create(objeto);

    return usuarioGuardado;
  }

  /**
     * Update an entity looking for it by id
     * @param {String} idUsuario mongodb id
     * @param {Object} objeto data to update
     */
  async update(idUsuario,objeto) {
    let usuarioGuardado = await modelo.findByIdAndUpdate(idUsuario,objeto);

    return usuarioGuardado;
  }

  
  /**
     * Delete an entity looking for it by id
     * @param {String} id mongodb id
     */
  async delete(id) {    
    
      let usuarioBorrado = await modelo.findByIdAndRemove(id);      
   
    return usuarioBorrado;
      
  }

}

module.exports = new Usuario();
