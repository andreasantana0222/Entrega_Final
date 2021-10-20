const admin = require('firebase-admin');

const account = require('C:/Users/chris/OneDrive/Documents/Malena/Coder House/Desafio Final/entregable2/src/firebase/firebase-clave.json');

admin.initializeApp({
    credential: admin.credential.cert(account),
    database: "ecommerce-2212.firebaseio.com"
});

console.log('Conexion a la base de datos realizada!');


const db = admin.firestore();
let query = db.collection('carrito');

class Carrito {
  constructor() {
    
    
  }

  async read() {
    console.log("read carrito");    
      try {
        
        let snapshot = await query.get();

        const contenido = snapshot.docs.map(doc => {
          //console.log(doc.data());
            return {
              id: doc.data().id,
              timestamp: doc.data().timestamp,
              producto:doc.data().producto
                
            }
        });
        return contenido;
      } catch (error) {
        throw error;
      } 
    
  }

  async save(objeto) {
    console.log("save carrito");

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
      stock: objeto.stock
    };  
      try {
        await query.add(item);
        return item;
      } catch (error) {
        throw error;
      } 
    
  }
}

module.exports = new Carrito();

admin.app().delete();