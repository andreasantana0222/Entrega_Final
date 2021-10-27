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

//-------------------------------------------------------------
router.post("/usuarios/login", async (req, res) => {
  try {
    let user = await usuarios.readByUser(
      (user) => user.username === req.body.username
    );

    if (!user) {
      return res.status(400).send("usuario no encontrado");
    }

    if (!auth.isValidPassword(user, req.body.password)) {
      return res.status(400).send("usuario/contraseña no valido");
    } else{
      //req.session.username=await req.body.username;
    }

    res.send({ token: auth.generateToken(user) });
  } catch (error) {
    console.log(error);
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

//*TEST */
router.get("/usuarios/datos", auth.checkAuthentication, async (req, res) => {
  try {
    res.send("<h1>datos protegidos por middleware</h1>");
  } catch (error) {
    console.log(error);
  }
});
/*FIN TEST*/

module.exports = router;
