const express = require('express');
const router = express.Router();
const productos = require('../api/producto');


let administrador= () => true;

/// 1-a. '/listar/:id?' : Me permite listar todos los productos disponibles ó un producto por su id
/// (disponible para usuarios y administradores)
router.get('/productos/listar',(req, res) => {
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


/// 1-a. '/listar/:id?' : Me permite listar todos los productos disponibles ó un producto por su id
/// (disponible para usuarios y administradores)
router.get('/productos/listar/:id', async (req, res) => {

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



/// 1-b. '/agregar' : Para incorporar productos al listado (disponible para administradores)
router.post('/productos/agregar', async (req, res) => {


if (administrador()){
  try {
    let objeto=req.body;
    console.log('agregar');
      res.type('json').send(JSON.stringify(productos.save(objeto), null, 2) + '\n');

  } catch (e) {

    console.error({error : 'error al agregar'})
    res.status(500).send(JSON.stringify({error : 'error al agregar'}));
  }
}else{
  res.status(500).send(JSON.stringify({ error : -1, descripcion: "ruta 'agregar' método 'post' no autorizada"}));
}


});


/// 1-c. '/actualizar/:id' : Actualiza un producto por su id (disponible para administradores)
router.put('/productos/actualizar/:id', async (req, res) => {

if (administrador()){
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

}else{
  res.status(500).send(JSON.stringify({ error : -1, descripcion: "ruta 'agregar' método 'post' no autorizada"}));
}
  });

/// 1-d. '/borrar/:id' : Borra un producto por su id (disponible para administradores)
  router.delete('/productos/borrar/:id', async (req, res) => {

if (administrador()){
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

  }else{
    res.status(500).send(JSON.stringify({ error : -1, descripcion: "ruta 'agregar' método 'post' no autorizada"}));
  }
    });



// GET api/productos/vista-------------------------------------------------
router.get('/productos/vista',(req, res) => {
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
