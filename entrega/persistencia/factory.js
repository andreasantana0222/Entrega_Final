

class PersistenciaFactory {

    constructor() { }

    getPersistencia(tipo, carpeta) {
        try {
            let modulo = require(`${__dirname}/${carpeta}/${tipo}`);
            return modulo
        } catch (error) {
            
        }
    }
}

module.exports = new PersistenciaFactory();