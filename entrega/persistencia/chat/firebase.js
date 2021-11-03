const admin = require('firebase-admin');

const account = require('C:/Users/chris/OneDrive/Documents/Malena/Coder House/Desafio Final/entregable2/src/firebase/firebase-clave.json');

admin.initializeApp({
    credential: admin.credential.cert(account),
    database: "ecommerce-2212.firebaseio.com"
});




const db = admin.firestore();
let query = db.collection('chat');

class Chat {
  constructor() {
    // incializar variables
  }

  async read() {
       
      try {
        let snapshot = await query.get();
        const contenido = snapshot.docs.map(doc => {
          return {           
              author: doc.data().author,
              text: doc.data().text,
              email: doc.data().email,
              datetime: doc.data().datetime
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
      author: objeto.author,
      text: objeto.text,
      email: objeto.email,
      datetime: new Date(Date.now()).toLocaleString()
    };    
      try {
        await query.add(item);
        return item;
      } catch (error) {
        throw error;
      } 
    
  }
}

module.exports = new Chat();
admin.app().delete();