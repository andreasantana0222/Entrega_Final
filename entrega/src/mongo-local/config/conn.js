
const mongoose = require("mongoose");

const config = require((__dirname + "../../config") + "/config.json");

async function connection(){
    // conexion a la base de datos
  await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  
  }
  connection();