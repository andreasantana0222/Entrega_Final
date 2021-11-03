const express = require("express");
const router = express.Router();
const usuarios = require("../api/usuario");
const auth = require("../auth/auth");
const miError = require('../auth/error');



router.get("/usuarios/listar", async (req, res) => {
  try {
    let usus = await usuarios.read();

    if (usus == []) {
      miError.MostrarError("no hay usuarios cargados",res);
        
    } else {
      res.type("json").send(JSON.stringify(usus));
    }
  } catch (e) {
    miError.MostrarError("no hay usuarios cargados",res);
  }
});

router.get("/usuarios/listar/:id", async (req, res) => {
  try {
    let idUsuario = req.params.id.toString();

    let buscarUsuario = await usuarios.readById(idUsuario);

    if (buscarUsuario == null || req.params.id < 1) {

      miError.MostrarError("usuario no encontrado",res);


    } else {
      res.type("json").send(JSON.stringify(buscarUsuario, null, 2) + "\n");
    }
  } catch (e) {
    
    miError.MostrarError("usuario no encontrado",res);
  }
});

router.post("/usuarios/registrar", async (req, res) => {
  try {
    let objeto = req.body;
    
    if (objeto){
      res
      .type("json")
      .send(JSON.stringify(await usuarios.save(objeto), null, 2) + "\n");
    }
    
  } catch (e) {
    miError.MostrarError("usuario no encontrado",res);
    
  }
});


// PUT api/productos/actualizar/:id-------------------------------------------------
router.put("/usuarios/actualizar/:id", auth.checkAuthentication, async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);

    if (id=="") {
      miError.MostrarError("usuario no encontrado",res);
    } else {
      console.log('con id');
      let objeto = req.body;
      console.log('con id', objeto);
      return res
        .type("json")
        .send(
          JSON.stringify(await usuarios.update(id, objeto), null, 2) + "\n"
        );
    }
  } catch (e) {
    miError.MostrarError("usuario no encontrado",res);
  }
});

// DELETE api/productos/borrar/:id-------------------------------------------------
router.delete("/usuarios/borrar/:id", auth.checkAuthentication, async (req, res) => {
  try {
    let id = req.params.id;
    

    if (id < 1) {
      miError.MostrarError("usuario no encontrado",res);
    } else {
      return res
        .type("json")
        .send(JSON.stringify(await usuarios.delete(id), null, 2) + "\n");
    }
  } catch (e) {
    
    miError.MostrarError("usuario no encontrado",res);

  }
});



//-------------------------------------------------------------
router.post("/usuarios/login", async (req, res) => {
  try {
    //1-Busca el usuario   
        
     if(req.body.email){        
        if (req.body.email.length > 0 && req.body.password.length > 0) {         
          user = await usuarios.readByEmail(req.body.email); 
          if (!user) {
            return res.status(400).send("usuario no encontrado");
          }
        }         
     } else{
          if (req.body.username){        
            if(req.body.username.length > 0 && req.body.password.length > 0) {                  
              user= await usuarios.readByUser(req.body.username);                  
            } 
          } else{
            //2-Si no encuentra el usuario envía un mensaje 
              if (!user) {
                return res.status(400).send("usuario no encontrado");
              }
          }
     }
     
     //2-Si no encuentra el usuario envía un mensaje             
     if (!user) {
      return res.status(400).send("usuario no encontrado");
    }
     
    //3-si encuentra el usuario pero es incorrecta la password envía un mensaje
    if (!auth.isValidPassword(user.password, req.body.password)) {      
      return res.status(400).send("usuario/contraseña no valido");
    } 
    
    if(user && auth.isValidPassword(user.password, req.body.password)){      
      if (req.session.email && req.session.contador) {
        req.session.contador++;
        
      }
      else {
          req.session.email = req.body.email;
          req.session.contador=1;
          
      }
    }

    res.send({ token: auth.generateToken(user) });
  } catch (error) {
    console.log(error);
  }
});

router.post("/usuarios/loginHtml", async (req, res) => {
  try {
    //1-Busca el usuario   
        
     if(req.body.email){        
        if (req.body.email.length > 0 && req.body.password.length > 0) {         
          user = await usuarios.readByEmail(req.body.email); 
          if (!user) {
            return res.status(400).send("usuario no encontrado");
          }
        }         
     } else{
          if (req.body.username){        
            if(req.body.username.length > 0 && req.body.password.length > 0) {                  
              user= await usuarios.readByUser(req.body.username);                  
            } 
          } else{
            //2-Si no encuentra el usuario envía un mensaje 
              if (!user) {
                return res.status(400).send("usuario no encontrado");
              }
          }
     }
     
     //2-Si no encuentra el usuario envía un mensaje             
     if (!user) {
      return res.status(400).send("usuario no encontrado");
    }
     
    //3-si encuentra el usuario pero es incorrecta la password envía un mensaje
    if (!auth.isValidPassword(user.password, req.body.password)) {      
      return res.status(400).send("usuario/contraseña no valido");
    } 
    
    if(user && auth.isValidPassword(user.password, req.body.password)){      
      if (req.session.email && req.session.contador) {
        req.session.contador++;
        res.redirect('/registered.html');
      }
      else {
          req.session.email = req.body.email;
          req.session.contador=1;
          res.redirect('/registered.html');
      }
    }
    
  } catch (error) {
    console.log(error);
  }
});
router.get('/usuarios/logout', (req, res) => {
  req.session.destroy(err => {
      if (!err) {
        req.session=null;
        res.redirect('/index.html');
      }

      else {
        res.send({ status: 'Logout ERROR', body: err });
      }
  })
});


router.get('/usuarios/info', (req, res) => {  
    
  res.send({
      'req.session': req.session,
      'req.sessionID':req.sessionID,
      'req.cookies':req.cookies,
      'req.sessionStore':req.sessionStore
  })
});


module.exports = router;
