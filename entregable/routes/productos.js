const express = require('express');
const router = express.Router();
const productos = require('../api/productos');



/// GET api/productos/listar-------------------------------------------------
router.get('/listar',(req, res) => {
  try {

    if(productos.read().length=0){
      res.type('json').send(JSON.stringify({error : 'no hay productos cargados'}, null, 2) + '\n');
    }else{
      res.type('json').send(JSON.stringify(productos.read(), null, 2) + '\n');
    }


    } catch (e) {
    console.error({error : 'no hay productos cargados'})
    res.status(500).send(JSON.stringify({error : 'no hay productos cargados'}));

  }
});


// GET api/productos/listar/:id-------------------------------------------------
router.get('/listar/:id', async (req, res) => {

  try {

    if (req.params.id>productos.read().length || req.params.id<1){
      res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      let id=req.params.id-1;
      res.type('json').send(JSON.stringify(productos.read()[id], null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : 'producto no encontrado'})
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }
});

// POST /api/productos/guardar-------------------------------------------------
router.post('/agregar', async (req, res) => {

  try {
    let objeto=req.body;
    console.log('aregarr');
    productos.save(objeto);


  } catch (e) {

    console.error({error : 'error al guardar'})
    res.status(500).send(JSON.stringify({error : 'error al guardar'}));
  }

});


// PUT /api/productos/actualizar/:id-------------------------------------------------
router.put('/actualizar/:id', async (req, res) => {

  try {

    if (req.params.id>productos.read().length || req.params.id<1){
      res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      let id=req.params.id;
      let objeto=req.body;
      return res.type('json').send(JSON.stringify(productos.update(id,objeto), null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : 'producto no encontrado'})
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }
  });

  // DELETE /api/productos/borrar/:id-------------------------------------------------
  router.delete('/borrar/:id', async (req, res) => {

    try {
      //console.log(`id ${req.params.id} `);
      //if (req.params.id>controller.read().length || req.params.id<1){
      if (req.params.id<1){
        res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
      } else{
        let id=req.params.id;
        //console.log(id);
        return res.type('json').send(JSON.stringify(productos.delete(id), null, 2) + '\n');
      }
    } catch (e) {
      console.error({error : 'producto no encontrado'})
      res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
    }
    });



// GET api/productos/vista-------------------------------------------------
router.get('/vista',(req, res) => {
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

// POST /api/productos/cargar-------------------------------------------------
router.get('/cargar', async (req, res) => {

  try {
    //let objeto=req.body;
    //return res.type('json').send(JSON.stringify(controller.save(objeto), null, 2) + '\n');
      res.render('formulario');


  } catch (e) {
    console.error({error : 'error al guardar'})
    res.status(500).send(JSON.stringify({error : 'error al guardar'}));
  }

});

router.get('/lista', (req, res) => {
    let prods = controller.read();
    res.render('lista', { productos: prods, hayProductos: prods.length });
});

module.exports = router;
