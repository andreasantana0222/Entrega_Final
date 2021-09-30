const express = require('express');
const router = express.Router();
const productos = require('../api/producto');


let administrador= () => true;

// GET api/productos/listar-------------------------------------------------
router.get('/productos/listar',async (req, res) => {
  try {
    let prods=await productos.read();
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


// GET api/productos/listar/:id-------------------------------------------------
router.get('/productos/listar/:id', async (req, res) => {

  try {
    let prods=await productos.read();
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



// POST api/productos/agregar-------------------------------------------------
router.post('/productos/agregar', async (req, res) => {


if (administrador()){
  try {
    let objeto=req.body;
      res.type('json').send(JSON.stringify(await productos.save(objeto), null, 2) + '\n');

  } catch (e) {

    console.error({error : 'error al agregar'})
    res.status(500).send(JSON.stringify({error : 'error al agregar'}));
  }
}else{
  res.status(500).send(JSON.stringify({ error : -1, descripcion: "ruta 'agregar' método 'post' no autorizada"}));
}


});


// PUT api/productos/actualizar/:id-------------------------------------------------
router.put('/productos/actualizar/:id', async (req, res) => {

if (administrador()){
  try {
    let prods=await productos.read();
    if (req.params.id>prods.length || req.params.id<1){
      res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      let id=req.params.id;
      let objeto=req.body;
      return res.type('json').send(JSON.stringify(await productos.update(id,objeto), null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : 'producto no encontrado'})
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }

}else{
  res.status(500).send(JSON.stringify({ error : -1, descripcion: "ruta 'agregar' método 'post' no autorizada"}));
}
  });

// DELETE api/productos/borrar/:id-------------------------------------------------
  router.delete('/productos/borrar/:id', async (req, res) => {

if (administrador()){
    try {

      if (req.params.id<1){
        res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
      } else{
        let id=req.params.id;
        
        return res.type('json').send(JSON.stringify(await productos.delete(id), null, 2) + '\n');
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
router.get('/productos/vista',async (req, res) => {
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
