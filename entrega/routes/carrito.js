const express = require("express");
const router = express.Router();
const carrito = require("../api/carrito");

router.get("/carrito/listar", async (req, res) => {
  try {
    let prods = await carrito.read();

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

router.get("/carrito/listar/:id", async (req, res) => {
  try {
    let idCarrito = req.params.id.toString();

    let buscarCarrito = await carrito.readById(idCarrito);

    if (buscarCarrito == null || req.params.id < 1) {
      res
        .status(500)
        .type("json")
        .send(
          JSON.stringify({ error: "producto no encontrado" }, null, 2) + "\n"
        );
    } else {
      res.type("json").send(JSON.stringify(buscarCarrito, null, 2) + "\n");
    }
  } catch (e) {
    res.status(500).send(JSON.stringify({ error: "producto no encontrado" }));
  }
});

router.post("/carrito/agregar", async (req, res) => {
  try {
    let objeto = req.body;

    res
      .type("json")
      .send(JSON.stringify(await carrito.save(objeto), null, 2) + "\n");
  } catch (e) {
    res.status(500).send(JSON.stringify({ error: "error al guardar" }));
  }
});

// PUT /api/productos/actualizar/:id-------------------------------------------------
router.put("/carrito/actualizar/:id", async (req, res) => {
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
        .send(JSON.stringify(await carrito.update(id, objeto), null, 2) + "\n");
    }
  } catch (e) {
    res.status(500).send(JSON.stringify({ error: "producto no encontrado" }));
  }
});

// DELETE /api/productos/borrar/:id-------------------------------------------------
router.delete("/carrito/borrar/:id", async (req, res) => {
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
        .send(JSON.stringify(await carrito.delete(id), null, 2) + "\n");
    }
  } catch (e) {
    res.status(500).send(JSON.stringify({ error: "producto no encontrado" }));
  }
});

// GET api/productos/vista-------------------------------------------------
router.get("/carrito/vista", async (req, res) => {
  try {
    let prods = await carrito.read();

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
