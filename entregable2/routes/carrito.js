const express = require('express');
const router = express.Router();
const carrito = require('../api/carrito');
const productos = require('../api/producto');


/// 2-a. '/listar/:id?' : Me permite listar todos los productos guardados en el carrito ó un
/// producto por su id de carrito (disponible para usuarios y administradores)
router.get('/carrito/listar',(req, res) => {
  try {

    if(carrito.read().length=0){
      res.type('json').send(JSON.stringify({error : 'no hay productos cargados'}, null, 2) + '\n');
    }else{
      res.type('json').send(JSON.stringify(carrito.read(), null, 2) + '\n');
    }


    } catch (e) {
    console.error({error : 'no hay productos cargados'})
    res.status(500).send(JSON.stringify({error : 'no hay productos cargados'}));

  }
});


/// 2-a. '/listar/:id?' : Me permite listar todos los productos guardados en el carrito ó un
/// producto por su id de carrito (disponible para usuarios y administradores)
router.get('/carrito/listar/:id', async (req, res) => {

  try {

    if (req.params.id>carrito.read().length || req.params.id<1){
      res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      let id=req.params.id-1;
      res.type('json').send(JSON.stringify(carrito.read()[id], null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : 'producto no encontrado'})
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }
});

/// 2-b. '/agregar/:id_producto' : Para incorporar productos al carrito por su id de producto
//(disponible para usuarios y administradores)
router.post('/carrito/agregar', async (req, res) => {

  try {
    let objeto=req.body;
    console.log('guardar');
    carrito.save(objeto);


  } catch (e) {

    console.error({error : 'error al guardar'})
    res.status(500).send(JSON.stringify({error : 'error al guardar'}));
  }

});

/// 2-b. '/agregar/:id_producto' : Para incorporar productos al carrito por su id de producto
//(disponible para usuarios y administradores)
router.get('/carrito/agregar/:id', async (req, res) => {

  try {

    if (req.params.id>productos.read().length || req.params.id<1){
      res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      let id=req.params.id-1;
      let objeto=productos.read()[id];
      console.log(objeto);
      res.type('json').send(JSON.stringify(carrito.save(objeto), null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : 'producto no encontrado'})
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }
});

// PUT /api/productos/actualizar/:id-------------------------------------------------
router.put('/carrito/actualizar/:id', async (req, res) => {

  try {

    if (req.params.id>carrito.read().length || req.params.id<1){
      res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      let id=req.params.id;
      let objeto=req.body;
      return res.type('json').send(JSON.stringify(carrito.update(id,objeto), null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : 'producto no encontrado'})
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }
  });

/// 2-c. '/borrar/:id' : Eliminar un producto del carrito por su id de carrito (disponible para
// usuarios y administradores)
  router.delete('/carrito/borrar/:id', async (req, res) => {

    try {
      //console.log(`id ${req.params.id} `);
      //if (req.params.id>controller.read().length || req.params.id<1){
      if (req.params.id<1){
        res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
      } else{
        let id=req.params.id;
        //console.log(id);
        return res.type('json').send(JSON.stringify(carrito.delete(id), null, 2) + '\n');
      }
    } catch (e) {
      console.error({error : 'producto no encontrado'})
      res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
    }
    });



// GET api/productos/vista-------------------------------------------------
router.get('/carrito/vista',(req, res) => {
  try {

    if(productos.read().length=0){
      res.type('json').send(JSON.stringify({error : 'no hay productos cargados'}, null, 2) + '\n');
    }else{
      //res.type('json').send(JSON.stringify(controller.read(), null, 2) + '\n');
      let data=productos.read();

        res.render('vista', { hayProductos : true, productos:data});
    }


    } catch (e) {
    console.error({error : 'no hay productos cargados'})
    res.status(500).send(JSON.stringify({error : 'no hay productos cargados'}));

  }
});



module.exports = router;
