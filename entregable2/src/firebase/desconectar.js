
const admin = require('firebase-admin');

const account = require('C:/Users/chris/OneDrive/Documents/Malena/Coder House/Desafio Final/entregable2/src/firebase/firebase-clave.json');

admin.initializeApp({
    credential: admin.credential.cert(account),
    database: "ecommerce-2212.firebaseio.com"
});

const db = admin.firestore();
let query = db.collection('productos');
async function borrar(){
    let doc = query.doc(1);

    let item = await doc.delete();
    doc = query.doc(2);
    
    item = await doc.delete();
    doc = query.doc(3);
    
    item = await doc.delete();

}
/* DELETE */

borrar();