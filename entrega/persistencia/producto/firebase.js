const admin = require('firebase-admin');

const account = require('C:/Users/chris/OneDrive/Documents/Malena/Coder House/Desafio Final/entregable2/src/firebase/firebase-clave.json');

admin.initializeApp({
    credential: admin.credential.cert(account),
    database: "ecommerce-2212.firebaseio.com"
});




const db = admin.firestore();
let query = db.collection('productos');

class Producto {
  constructor() {
    
    
  }

  async read() {
        
      try {
        
        let snapshot = await query.get();

        const contenido = snapshot.docs.map(doc => {
            return {
                id: doc.data().id,
                timestamp: doc.data().timestamp,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                codigo: doc.data().codigo,
                foto: doc.data().foto,
                precio: doc.data().precio,
                stock: doc.data().stock
            }
        });
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

module.exports = new Producto();

admin.app().delete();