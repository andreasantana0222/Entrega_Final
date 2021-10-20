'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarritoSchema=Schema({  
    id: { type: Number, required: true },
    timestamp: { type: Date, required: true},
    producto: {
        id: { type: Number, required: true},
        timestamp: { type: Date, required: true},
        nombre: { type: String, required: true, max: 100 },
        descripcion: { type: String, required: true, max: 100 },
        codigo: { type: String, required: true, max: 100 },
        foto: { type: String, required: true },
        precio: { type: String, required: true, max: 100 },
        stock: { type: Number, required: true},
    }
});


const Carrito = mongoose.model('carrito', CarritoSchema);

module.exports = Carrito;