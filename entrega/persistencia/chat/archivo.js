

let archivo = __dirname + "../../files" + "/chat.txt";
const fs = require("fs");

class ArchivoChat {
  constructor() {
    // incializar variables
    this.listaChats = [{}];
    this.archivo = archivo;
  }

  read() {
    this.listaChats = JSON.parse(fs.readFileSync(this.archivo, "utf-8"));
    return this.listaChats;
  }

  save(objeto) {
    this.listaChats.push(objeto);
    fs.writeFileSync(archivo, JSON.stringify(this.listaChats, null, "\t"));
    return false;
  }
}
module.exports = new ArchivoChat();
