const express = require("express");
const router = express.Router();
const orden = require("../api/orden");

const miError=require('../auth/error');

router.get("/orden/listar", async (req, res) => {
  try {
    let prods = await orden.read();

    if (prods == []) {
      miError.MostrarError("orden no encontrada",res);
    } else {
      res.type("json").send(JSON.stringify(prods));
    }
  } catch (e) {
    miError.MostrarError("orden no encontrada",res);
  }
});

router.get("/orden/listar/:id", async (req, res) => {
  try {
    let idOrden = req.params.id.toString();

    let buscarOrden = await orden.readById(idOrden);

    if (buscarOrden == null || req.params.id < 1) {
      miError.MostrarError("orden no encontrada",res);
    } else {
      res.type("json").send(JSON.stringify(buscarOrden, null, 2) + "\n");
    }
  } catch (e) {
    miError.MostrarError("orden no encontrada",res);
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
    miError.MostrarError("orden no encontrada",res);
  }
});

// PUT /api/productos/actualizar/:id-------------------------------------------------
router.put("/orden/actualizar/:id", async (req, res) => {
  try {
    let id = req.params.id;

    if (id < 1) {
      miError.MostrarError("orden no encontrada",res);
    } else {
      let objeto = req.body;
      return res
        .type("json")
        .send(JSON.stringify(await orden.update(id, objeto), null, 2) + "\n");
    }
  } catch (e) {
    miError.MostrarError("orden no encontrada",res);
  }
});

// DELETE /api/productos/borrar/:id-------------------------------------------------
router.delete("/orden/borrar/:id", async (req, res) => {
  try {
    let id = req.params.id;
    if (id < 1) {
      miError.MostrarError("orden no encontrada",res);
    } else {
      return res
        .type("json")
        .send(JSON.stringify(await orden.delete(id), null, 2) + "\n");
    }
  } catch (e) {
    
          miError.MostrarError("orden no encontrada",res);
  }
});



module.exports = router;
