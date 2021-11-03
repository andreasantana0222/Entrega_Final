const ejs = require('ejs');

class miError{
    constructor(){

    }

    MostrarError(mensaje, res){
                
        let html = ejs.render('<%= err; %>', {err: mensaje});        
        res.status(500).render("../viewsEjs/layout.ejs",{html});
    }
}

module.exports= new miError();