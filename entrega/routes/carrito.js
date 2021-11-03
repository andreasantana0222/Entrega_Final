const express = require("express");
const router = express.Router();
const carrito = require("../api/carrito");
const miError = require('../auth/error');

router.get("/carrito/listar", async (req, res) => {
  try {
    let prods = await carrito.read();

    if (prods == []) {
      miError.MostrarError("carrito no encontrado",res);
    } else {
      res.type("json").send(JSON.stringify(prods));
    }
  } catch (e) {
    miError.MostrarError("carrito no encontrado",res);
  }
});

router.get("/carrito/listar/:id", async (req, res) => {
  try {
    let idCarrito = req.params.id.toString();

    let buscarCarrito = await carrito.readById(idCarrito);

    if (buscarCarrito == null || req.params.id < 1) {
      miError.MostrarError("carrito no encontrado",res);
    } else {
      res.type("json").send(JSON.stringify(buscarCarrito, null, 2) + "\n");
    }
  } catch (e) {
    miError.MostrarError("carrito no encontrado",res);
  }
});

router.post("/carrito/agregar", async (req, res) => {
  try {
    let objeto = req.body;

    //Cookie
    res.cookie('carrito',objeto);

    res
      .type("json")
      .send(JSON.stringify(await carrito.save(objeto), null, 2) + "\n");
  } catch (e) {
    miError.MostrarError("error al guardar",res);
  }
});

// PUT /api/productos/actualizar/:id-------------------------------------------------
router.put("/carrito/actualizar/:id", async (req, res) => {
  try {
    let id = req.params.id;

    if (id < 1) {
      miError.MostrarError("carrito no encontrado",res);
    } else {
      let objeto = req.body;
      return res
        .type("json")
        .send(JSON.stringify(await carrito.update(id, objeto), null, 2) + "\n");
    }
  } catch (e) {
    miError.MostrarError("carrito no encontrado",res);
  }
});

// DELETE /api/productos/borrar/:id-------------------------------------------------
router.delete("/carrito/borrar/:id", async (req, res) => {
  try {
    let id = req.params.id;
    if (id < 1) {
      miError.MostrarError("carrito no encontrado",res);
    } else {
      return res
        .type("json")
        .send(JSON.stringify(await carrito.delete(id), null, 2) + "\n");
    }
  } catch (e) {
    miError.MostrarError("carrito no encontrado",res);
  }
});



module.exports = router;
