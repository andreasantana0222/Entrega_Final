const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: { type: Number, required: true},
  timestamp: { type: Date, required: true },
  nombre: { type: String, required: true, max: 100 },
  descripcion: { type: String, required: true, max: 100 },
  codigo: { type: String, required: true, max: 100 },
  foto: { type: String, required: true},
  precio: { type: Number, required: true},
  stock: { type: Number, required: true },
});

const Producto = mongoose.model("productos", schema);

module.exports = Producto;
