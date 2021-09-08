// TO DO cambiar la ruta
const mongoose = require("mongoose");

const config = require("C:/Users/chris/OneDrive/Documents/Malena/Coder House/Desafio Final/entregable2/src/mongo-local/config/config.json");

async function connection(){
    // conexion a la base de datos
  await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('conexion a la base de datos realizada!');
  }
  connection();