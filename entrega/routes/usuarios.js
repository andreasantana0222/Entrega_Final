const express = require("express");
const router = express.Router();
const usuarios = require("../api/usuario");
const auth = require("../auth/auth");




router.get("/usuarios/listar", async (req, res) => {
  try {
    let usus = await usuarios.read();

    if (usus == []) {
      res
        .status(500)
        .type("json")
        .send(
          JSON.stringify({ error: "no hay productos cargados" }, null, 2) + "\n"
        );
    } else {
      res.type("json").send(JSON.stringify(usus));
    }
  } catch (e) {
    res
      .status(500)
      .send(JSON.stringify({ error: "no hay productos cargados" }));
  }
});

router.get("/usuarios/listar/:id", async (req, res) => {
  try {
    let idUsuario = req.params.id.toString();

    let buscarUsuario = await usuarios.readById(idUsuario);

    if (buscarUsuario == null || req.params.id < 1) {
      res
        .status(500)
        .type("json")
        .send(
          JSON.stringify({ error: "producto no encontrado" }, null, 2) + "\n"
        );
    } else {
      res.type("json").send(JSON.stringify(buscarUsuario, null, 2) + "\n");
    }
  } catch (e) {
    res.status(500).send(JSON.stringify({ error: "producto no encontrado" }));
  }
});

router.post("/usuarios/registrar", async (req, res) => {
  try {
    let objeto = req.body;

    res
      .type("json")
      .send(JSON.stringify(await usuarios.save(objeto), null, 2) + "\n");
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify({ error: "error al guardar" }));
  }
});


// PUT api/productos/actualizar/:id-------------------------------------------------
router.put("/usuarios/actualizar/:id", auth.checkAuthentication, async (req, res) => {
  try {
    let id = req.params.id.toString();

    if (id < 1) {
      res
        .type("json")
        .send(
          JSON.stringify({ error: "producto no encontrado" }, null, 2) + "\n"
        );
    } else {
      let objeto = req.body;
      return res
        .type("json")
        .send(
          JSON.stringify(await usuarios.update(id, objeto), null, 2) + "\n"
        );
    }
  } catch (e) {
    console.error({ error: "producto no encontrado" });
    res.status(500).send(JSON.stringify({ error: "producto no encontrado" }));
  }
});

// DELETE api/productos/borrar/:id-------------------------------------------------
router.delete("/usuarios/borrar/:id", auth.checkAuthentication, async (req, res) => {
  try {
    let id = req.params.id;
    

    if (id < 1) {
      res
        .type("json")
        .send(
          JSON.stringify({ error: "producto no encontrado" }, null, 2) + "\n"
        );
    } else {
      return res
        .type("json")
        .send(JSON.stringify(await usuarios.delete(id), null, 2) + "\n");
    }
  } catch (e) {
    console.error({ error: "producto no encontrado" });
    res.status(500).send(JSON.stringify({ error: "producto no encontrado" }));
  }
});



//-------------------------------------------------------------
router.post("/usuarios/login", async (req, res) => {
  try {
    //1-Busca el usuario
    let user = await usuarios.readByUser(
      (user) => user.username === req.body.username
      
    );
    
   
    //2-Si no encuentra el usuario envía un mensaje

    if (!user) {
      return res.status(400).send("usuario no encontrado");
    }

    //3-si encuentra el usuario pero es incorrecta la password envía un mensaje
    if (!auth.isValidPassword(user, req.body.password)) {

      return res.status(400).send("usuario/contraseña no valido");

    } 
    
    if(user && auth.isValidPassword(user, req.body.password)){
      
      if (req.session.username && req.session.contador) {
        req.session.contador++;
        res.send(`${req.session.username} ha visitado el sitio ${req.session.contador} veces.`)
      }
      else {
          req.session.username = req.body.username;
          req.session.contador=1
          res.send('Bienvenido a su primera visita al sitio!')
      }
    }

    //res.send({ token: auth.generateToken(user) });
  } catch (error) {
    console.log(error);
  }
});





module.exports = router;
