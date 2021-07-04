const express = require('express');
const router = express.Router();
const carrito = require('../api/carrito');
const items=carrito.read();






/// GET api/carrito/listar-------------------------------------------------
router.get('/listar',(req, res) => {
  try {

    console.log('carrito/listar');
    //items=carrito.read();
    console.log('items');
    console.log(items);
      if(carrito.read().length=0){
        res.type('json').send(JSON.stringify({error : 'no hay carrito guardado'}, null, 2) + '\n');
      }else{

        res.type('json').send(JSON.stringify(carrito.read(), null, 2) + '\n');
      }


    } catch (e) {
    console.error({error : 'no hay productos seleccionados'})
    res.status(500).send(JSON.stringify({error : 'no hay productos seleccionados'}));

  }
});



// GET api/mensajes/:id-------------------------------------------------
router.get('/listar/:id', async (req, res) => {

  try {

    if (req.params.id>carrito.read().length || req.params.id<1){
      res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      let id=req.params.id-1;
      res.type('json').send(JSON.stringify(items[id], null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : 'producto no encontrada'})
    res.status(500).send(JSON.stringify({error : 'producto no encontrada'}));
  }
});

// POST /api/carrito/guardar-------------------------------------------------
router.post('/agregar/:id_producto', async (req, res) => {

  try {
    let producto=req.body;
    id=items(items.length()-1).id+1;
     let item={
       id:id,
       timestamp:Date.now(),
       producto:producto
     }
     console.log("agregar ", item);
     items.push(item);
    //return res.type('json').send(JSON.stringify(carrito.save(objeto), null, 2) + '\n');
    //carrito.save(items);
    //res.redirect('/api/carrito/cargar');

  } catch (e) {
    console.error({error : 'error al guardar'})
    res.status(500).send(JSON.stringify({error : 'error al guardar'}));
  }

});


// PUT /api/carrito/actualizar/:id-------------------------------------------------
router.put('/actualizar/:id', async (req, res) => {

  try {

    if (req.params.id>carrito.read().length || req.params.id<1){
      res.type('json').send(JSON.stringify({error : 'producto no encontrada'}, null, 2) + '\n');
    } else{
      let id=req.params.id;
      let objeto=req.body;
      return res.type('json').send(JSON.stringify(carrito.update(id,objeto), null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : 'producto no encontrada'})
    res.status(500).send(JSON.stringify({error : 'producto no encontrada'}));
  }
  });

  // DELETE /api/carrito/borrar/:id-------------------------------------------------
  router.delete('/borrar/:id', async (req, res) => {

    try {

      if (req.params.id<1){
        res.type('json').send(JSON.stringify({error : 'producto no encontrada'}, null, 2) + '\n');
      } else{
        let id=req.params.id;

        items.forEach((item, i) => {
          if(item.producto.id==id){
            items.splice(i,1);
          }
        });

        res.render('carrito', { hayProductos : true, productos:items});
      }
    } catch (e) {
      console.error({error : 'producto no encontrada'})
      res.status(500).send(JSON.stringify({error : 'producto no encontrada'}));
    }
    });


    // GET api/productos/vista-------------------------------------------------
    router.get('/vista',(req, res) => {
      try {
        console.log("carrito/vista");
        //items=carrito.read();
        console.log(items);
        if(items.length=0){
          res.type('json').send(JSON.stringify({error : 'no hay productos cargados'}, null, 2) + '\n');
        }else{
          //res.type('json').send(JSON.stringify(controller.read(), null, 2) + '\n');


            res.render('carrito', { hayProductos : true, productos:carrito.read()});
        }


        } catch (e) {
        console.error({error : 'no hay productos cargados'})
        res.status(500).send(JSON.stringify({error : 'no hay productos cargados'}));

      }
    });




module.exports = router;
