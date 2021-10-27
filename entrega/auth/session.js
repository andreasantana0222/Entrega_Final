


class Sesion {
constructor(){}

    grabarSesion(req,res,user){
        console.log(user.name);
        if ( req.session.user && req.session.contador) {
            req.session.contador++
            //res.send(`Ud ha visitado el sitio veces.`)
        }
        else {
            
            req.session.user=user.name;
            req.session.contador = 1
            req.session.cookie.expires = new Date(Date.now() + process.env.SESSION_TIMEOUT);
            req.session.cookie.maxAge = process.env.SESSION_TIMEOUT;        
            //res.send('Bienvenido a su primera visita al sitio!')
        }

        console.log(
            req.session.user,
            req.session.contador,
            req.session.cookie.expires,
            req.session.cookie.maxAge
        );
    }

    validarTimeOut(req,res,next){
        if(req.session.cookie) {

        }else{
            return next();
        }
    }

}

module.exports=new Sesion();