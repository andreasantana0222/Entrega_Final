const admin = require('firebase-admin');

const account = require('C:/Users/chris/OneDrive/Documents/Malena/Coder House/Desafio Final/entregable2/src/firebase/firebase-clave.json');

admin.initializeApp({
    credential: admin.credential.cert(account),
    database: "ecommerce-2212.firebaseio.com"
});



async function cargaProductos() {

    const db = admin.firestore();
    const query = db.collection('productos');

    try {

        /* CREATE */
        await query.add({             
                id: 1,
                timestamp: "1/8/2021 19:04:18",
                nombre: "Colchón Chocolate",
                descripcion: "Colchón de lona relleno de copos de gomaespuma",
                codigo: 123456,
                foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
                precio: 345.67,
                stock: 200            
         });
         await query.add({             
            id: 2,
            timestamp: "1/8/2021 19:04:18",
            nombre: "Colchón Chocolate",
            descripcion: "Colchón de lona relleno de copos de gomaespuma",
            codigo: 123456,
            foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
            precio: 345.67,
            stock: 100            
     });

        
    }catch (error) {
        
    }
}
cargaProductos();