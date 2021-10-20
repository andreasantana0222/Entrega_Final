const admin = require('firebase-admin');

const account = require('C:/Users/chris/OneDrive/Documents/Malena/Coder House/Desafio Final/entregable2/src/firebase/firebase-clave.json');

admin.initializeApp({
    credential: admin.credential.cert(account),
    database: "ecommerce-2212.firebaseio.com"
});

console.log('Conexion a la base de datos realizada!');

async function cargaProductos() {

    const db = admin.firestore();
    const query = db.collection('chat');

    try {

        /* CREATE */
        await query.add({
            author: "user",
            email: "malenauai@gmail.com",
            text: "Hola",
            datetime: "10/7/2021 22:32:29"
        });
         await query.add({
            author: "masantana",
            email: "malenauai@gmail.com",
            text: "Hola",
            datetime: "10/7/2021 22:42:54"
        });

        console.log('datos insertados!');
    }catch (error) {
        console.log('error', error);
    }
}
cargaProductos();