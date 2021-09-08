class PersistenciaFactory {

    constructor() { }

    getPersistencia(tipo, carpeta) {
        try {
            let modulo = require(`${__dirname}/${carpeta}/${tipo}`);
            return modulo
        } catch (error) {
            console.log('No se encontro el tipo de persistencia:', tipo, error);
        }
    }
}

module.exports = new PersistenciaFactory();