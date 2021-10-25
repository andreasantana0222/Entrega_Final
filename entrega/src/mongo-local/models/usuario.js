const mongoose = require("mongoose");

const schema = mongoose.Schema({  
  timestamp: { type: Date, required: true },
  nombre: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  foto: { type: String, required: true}
});


const Usuario = mongoose.model("usuarios", schema);



module.exports = Usuario;