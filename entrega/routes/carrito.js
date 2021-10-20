const express = require('express');
const router = express.Router();
const carrito = require('../api/carrito');


// TEST-----------------------------------------------------------
router.get('/carrito/product', async(req,res)=>{
  res.send(200).send({products:[]});
});

router.get('/carrito/product/:productId', async(req,res)=>{
  res.send(200).send({message:`hola ${req.params.productId}`});
});

router.post('/carrito/product', async(req,res)=>{
  console.log(req.body);
  res.status(200).send({message:'el producto se ha recibido'});
});

router.put('/carrito/product/:productId', async(req,res)=>{
  res.send(200).send({products:[]});
});

router.delete('/carrito/product/:productId', async(req,res)=>{
  res.send(200).send({products:[]});
});

//------------------------------------------------------------
router.get('/carrito/listar', async(req, res) => {
  try {
    console.log('routes - /carrito/listar');   

    let prods = await carrito.read();
    
    if(prods==[]){
      
      res.status(500).type('json').send(JSON.stringify({error : 'no hay productos cargados'}, null, 2) + '\n');
      
    }else{
        
      res.type('json').send(JSON.stringify(prods));
    }


    } catch (e) {
      console.error({error : e});
    res.status(500).send(JSON.stringify({error : 'no hay productos cargados'}));

  }
});


router.get('/carrito/listar/:id', async (req, res) => {

  try {
    console.log('/carrito/listar/:id');

    let idCarrito=req.params.id.toString();

    let buscarCarrito= await carrito.readById(idCarrito);

    console.log(idCarrito);

    if ((buscarCarrito==null) || req.params.id<1){
      console.error({error : e});
      res.status(500).type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    
    } else{
      
      res.type('json').send(JSON.stringify(buscarCarrito, null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : e});
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }
});


router.post('/carrito/agregar', async (req, res) => {

  try {
    console.log('/carrito/agregar');

    let objeto=req.body;     
    

    res.type('json').send(JSON.stringify(await carrito.save(objeto), null, 2) + '\n');

  } catch (e) {

    console.error({error : e});
    res.status(500).send(JSON.stringify({error : 'error al guardar'}));
  }

});


router.get('/carrito/agregar/:id', async (req, res) => {

  try {
    console.log('/carrito/agregar/:id');

    let prods= await carrito.read();

    console.log(prods);

    if (req.params.id>prods.length || req.params.id<1){
      res.status(500).type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      let id=req.params.id-1;
      let objeto=prods[id];
      
      res.type('json').send(JSON.stringify(await carrito.save(objeto), null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : e});
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }
});

// PUT /api/productos/actualizar/:id-------------------------------------------------
router.put('/carrito/actualizar/:id', async (req, res) => {

  try {
    console.log('/carrito/actualizar/:id');

    let id=req.params.id;

    if (id<1){
      res.status(500).type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      
      let objeto=req.body;
      return res.type('json').send(JSON.stringify(await carrito.update(id,objeto), null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : e});
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }
  });

// DELETE /api/productos/borrar/:id-------------------------------------------------
  router.delete('/carrito/borrar/:id', async (req, res) => {

    try {
      console.log('/carrito/borrar/:id');
      let id=req.params.id;
      if (id<1){
        res.status(500).type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
      } else{        
        
        return res.type('json').send(JSON.stringify(await carrito.delete(id), null, 2) + '\n');
      }
    } catch (e) {
      console.error({error : e});
      res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
    }
    });



// GET api/productos/vista-------------------------------------------------
router.get('/carrito/vista',async (req, res) => {
  try {
    console.log('/carrito/vista');

    let prods=await carrito.read();

    if(prods.length=0){
      
      res.status(500).type('json').send(JSON.stringify({error : 'no hay productos cargados'}, null, 2) + '\n');
    }else{    
      
        res.render('vista', { hayProductos : true, productos:prods});
    }


    } catch (e) {
      console.error({error : e});
    res.status(500).send(JSON.stringify({error : 'no hay productos cargados'}));

  }
});



module.exports = router;
