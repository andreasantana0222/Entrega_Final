const express = require('express');
const router = express.Router();
const productos = require('../api/producto');
const auth = require("../auth/auth");
const miError=require('../auth/error');


let administrador= () => true;

// GET api/productos/listar-------------------------------------------------
router.get('/productos/listar',async (req, res) => {
  try {
      let prods=await productos.read();

      if(prods.length==0){
        miError.MostrarError("no hay productos cargados",res);
      }else{
        res.type('json').send(JSON.stringify(prods, null, 2) + '\n');
      }

    } catch (e) {         

      miError.MostrarError("producto no encontrado",res);

  }
});


// GET api/productos/listar/:id-------------------------------------------------
router.get('/productos/listar/:id', async (req, res) => {

  try {

    let idProducto=req.params.id.toString();
    let prods=await productos.read();
    let buscarProducto= await productos.readById(idProducto);    

    if ((buscarProducto==null) || req.params.id<1){
      miError.MostrarError("producto no encontrado",res);
    } else{      
      
      res.type('json').send(JSON.stringify(buscarProducto, null, 2) + '\n');
    }
  } catch (e) {
    
    miError.MostrarError("producto no encontrado",res);
  }
});



// POST api/productos/agregar-------------------------------------------------
router.post('/productos/agregar', auth.checkAuthentication, async (req, res) => {

  try {
    let objeto=req.body;
      res.type('json').send(JSON.stringify(await productos.save(objeto), null, 2) + '\n');

  } catch (e) {
    miError.MostrarError("producto no encontrado",res);
  }
});


// PUT api/productos/actualizar/:id-------------------------------------------------
router.put('/productos/actualizar/:id', auth.checkAuthentication, async (req, res) => {

  try {
    let prods=await productos.read();
    let id=req.params.id.toString();

    if (id<1){
      miError.MostrarError("producto no encontrado",res);
    } else{
      
      let objeto=req.body;
      return res.type('json').send(JSON.stringify(await productos.update(id,objeto), null, 2) + '\n');
    }
  } catch (e) {
    miError.MostrarError("producto no encontrado",res);
  }

  });

// DELETE api/productos/borrar/:id-------------------------------------------------
  router.delete('/productos/borrar/:id',auth.checkAuthentication, async (req, res) => {


    try {
      let id=req.params.id.toString();

      if (id<1){
        miError.MostrarError("producto no encontrado",res);
      } else{
        
        
        return res.type('json').send(JSON.stringify(await productos.delete(id), null, 2) + '\n');
      }
    } catch (e) {
      miError.MostrarError("producto no encontrado",res);
    }

    });



// GET api/productos/vista-------------------------------------------------
router.get('/productos/vista',async (req, res) => {
  try {
    let prods=await productos.read();
    if(prods.length=0){
      miError.MostrarError("producto no encontrado",res);
    }else{
      
      

        res.render('vista', { hayProductos : true, productos:prods});
    }


    } catch (e) {
      miError.MostrarError("producto no encontrado",res);

  }
});



module.exports = router;
