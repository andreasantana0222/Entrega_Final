const express = require('express');
const router = express.Router();
const carrito = require('../api/carrito');
const productos = require('../api/producto');


router.get('/carrito/listar',async (req, res) => {
  try {
    let prods=await carrito.read();
    if(prods.length=0){
      res.type('json').send(JSON.stringify({error : 'no hay productos cargados'}, null, 2) + '\n');
    }else{
      res.type('json').send(JSON.stringify(prods, null, 2) + '\n');
    }


    } catch (e) {
    console.error({error : 'no hay productos cargados'})
    res.status(500).send(JSON.stringify({error : 'no hay productos cargados'}));

  }
});


router.get('/carrito/listar/:id', async (req, res) => {

  try {
    let prods=await carrito.read();
    if (req.params.id>prods.length || req.params.id<1){
      res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      let id=req.params.id-1;
      let item=prods.findIndex(x=>x.id==id);
      res.type('json').send(JSON.stringify(item, null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : 'producto no encontrado'})
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }
});


router.post('/carrito/agregar', async (req, res) => {

  try {
    let objeto=req.body;
    console.log('guardar');   
    

    res.type('json').send(JSON.stringify(await carrito.save(objeto), null, 2) + '\n');

  } catch (e) {

    console.error({error : 'error al guardar'})
    res.status(500).send(JSON.stringify({error : 'error al guardar'}));
  }

});


router.get('/carrito/agregar/:id', async (req, res) => {

  try {
    let prods=await carrito.read();

    if (req.params.id>prods.length || req.params.id<1){
      res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      let id=req.params.id-1;
      let objeto=prods[id];
      
      res.type('json').send(JSON.stringify(await carrito.save(objeto), null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : 'producto no encontrado'})
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }
});

// PUT /api/productos/actualizar/:id-------------------------------------------------
router.put('/carrito/actualizar/:id', async (req, res) => {

  try {
    let prods=await carrito.read();

    if (req.params.id>prods.length || req.params.id<1){
      res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      let id=req.params.id;
      let objeto=req.body;
      return res.type('json').send(JSON.stringify(await carrito.update(id,objeto), null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : 'producto no encontrado'})
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }
  });

// DELETE /api/productos/borrar/:id-------------------------------------------------
  router.delete('/carrito/borrar/:id', async (req, res) => {

    try {
      
      if (req.params.id<1){
        res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
      } else{
        let id=req.params.id;
        
        return res.type('json').send(JSON.stringify(await carrito.delete(id), null, 2) + '\n');
      }
    } catch (e) {
      console.error({error : 'producto no encontrado'})
      res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
    }
    });



// GET api/productos/vista-------------------------------------------------
router.get('/carrito/vista',async (req, res) => {
  try {
    let prods=await productos.read();
    if(prods.length=0){
      res.type('json').send(JSON.stringify({error : 'no hay productos cargados'}, null, 2) + '\n');
    }else{    
      
        res.render('vista', { hayProductos : true, productos:prods});
    }


    } catch (e) {
    console.error({error : 'no hay productos cargados'})
    res.status(500).send(JSON.stringify({error : 'no hay productos cargados'}));

  }
});



module.exports = router;
