'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrdenSchema=Schema({  
    id: { type: Number, required: true },
    timestamp: { type: Date, required: true},
    carritoId: { type: String, required: true, max: 100 },
    estado:  { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    ruta:{ type: String, required: true, max: 100 } 
    
});


const Orden = mongoose.model('orden', OrdenSchema);

module.exports = Orden;