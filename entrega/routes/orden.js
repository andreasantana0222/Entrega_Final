const express = require("express");
const router = express.Router();
const orden = require("../api/orden");

router.get("/orden/listar", async (req, res) => {
  try {
    let prods = await orden.read();

    if (prods == []) {
      res
        .status(500)
        .type("json")
        .send(
          JSON.stringify({ error: "no hay productos cargados" }, null, 2) + "\n"
        );
    } else {
      res.type("json").send(JSON.stringify(prods));
    }
  } catch (e) {
    res
      .status(500)
      .send(JSON.stringify({ error: "no hay productos cargados" }));
  }
});

router.get("/orden/listar/:id", async (req, res) => {
  try {
    let idOrden = req.params.id.toString();

    let buscarOrden = await orden.readById(idOrden);

    if (buscarOrden == null || req.params.id < 1) {
      res
        .status(500)
        .type("json")
        .send(
          JSON.stringify({ error: "producto no encontrado" }, null, 2) + "\n"
        );
    } else {
      res.type("json").send(JSON.stringify(buscarOrden, null, 2) + "\n");
    }
  } catch (e) {
    res.status(500).send(JSON.stringify({ error: "producto no encontrado" }));
  }
});

router.post("/orden/agregar", async (req, res) => {
  try {
    let objeto = req.body;

    //Cookie
    res.cookie('orden',objeto);

    res
      .type("json")
      .send(JSON.stringify(await orden.save(objeto), null, 2) + "\n");
  } catch (e) {
    res.status(500).send(JSON.stringify({ error: e.stack }));
  }
});

// PUT /api/productos/actualizar/:id-------------------------------------------------
router.put("/orden/actualizar/:id", async (req, res) => {
  try {
    let id = req.params.id;

    if (id < 1) {
      res
        .status(500)
        .type("json")
        .send(
          JSON.stringify({ error: "producto no encontrado" }, null, 2) + "\n"
        );
    } else {
      let objeto = req.body;
      return res
        .type("json")
        .send(JSON.stringify(await orden.update(id, objeto), null, 2) + "\n");
    }
  } catch (e) {
    res.status(500).send(JSON.stringify({ error: "producto no encontrado" }));
  }
});

// DELETE /api/productos/borrar/:id-------------------------------------------------
router.delete("/orden/borrar/:id", async (req, res) => {
  try {
    let id = req.params.id;
    if (id < 1) {
      res
        .status(500)
        .type("json")
        .send(
          JSON.stringify({ error: "producto no encontrado" }, null, 2) + "\n"
        );
    } else {
      return res
        .type("json")
        .send(JSON.stringify(await orden.delete(id), null, 2) + "\n");
    }
  } catch (e) {
    res.status(500).send(JSON.stringify({ error: "producto no encontrado" }));
  }
});

// GET api/productos/vista-------------------------------------------------
router.get("/orden/vista", async (req, res) => {
  try {
    let prods = await orden.read();

    if ((prods.length = 0)) {
      res
        .status(500)
        .type("json")
        .send(
          JSON.stringify({ error: "no hay productos cargados" }, null, 2) + "\n"
        );
    } else {
      res.render("vista", { hayProductos: true, productos: prods });
    }
  } catch (e) {
    res
      .status(500)
      .send(JSON.stringify({ error: "no hay productos cargados" }));
  }
});

module.exports = router;
