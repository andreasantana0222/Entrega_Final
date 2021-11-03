const express = require('express');
const router = express.Router();
const productos = require('../api/producto');
const auth = require("../auth/auth");



let administrador= () => true;

// GET api/productos/listar-------------------------------------------------
router.get('/productos/listar',async (req, res) => {
  try {
      let prods=await productos.read();

      if(prods.length==0){
        const ejs = require('ejs');        
            html = ejs.render('<%= err; %>', {err: "no hay productos cargados"});        
          res.status(500).render("../viewsEjs/layout.ejs",{html});
      }else{
        res.type('json').send(JSON.stringify(prods, null, 2) + '\n');
      }

    } catch (e) {
         

    const ejs = require('ejs');        
            html = ejs.render('<%= err; %>', {err: "no hay productos cargados"});        
        res.status(500).render("../viewsEjs/layout.ejs",{html});

  }
});


// GET api/productos/listar/:id-------------------------------------------------
router.get('/productos/listar/:id', async (req, res) => {

  try {

    let idProducto=req.params.id.toString();
    let prods=await productos.read();
    let buscarProducto= await productos.readById(idProducto);    

    if ((buscarProducto==null) || req.params.id<1){
      const ejs = require('ejs');        
      html = ejs.render('<%= err; %>', {err: "producto no encontrado"});        
      res.status(500).render("../viewsEjs/layout.ejs",{html});
    } else{      
      
      res.type('json').send(JSON.stringify(buscarProducto, null, 2) + '\n');
    }
  } catch (e) {
    
    const ejs = require('ejs');        
            html = ejs.render('<%= err; %>', {err: "producto no encontrado"});        
          res.status(500).render("../viewsEjs/layout.ejs",{html});
  }
});



// POST api/productos/agregar-------------------------------------------------
router.post('/productos/agregar', auth.checkAuthentication, async (req, res) => {

  try {
    let objeto=req.body;
      res.type('json').send(JSON.stringify(await productos.save(objeto), null, 2) + '\n');

  } catch (e) {
    const ejs = require('ejs');        
    html = ejs.render('<%= err; %>', {err: "error al agregar"});        
  res.status(500).render("../viewsEjs/layout.ejs",{html});
  }
});


// PUT api/productos/actualizar/:id-------------------------------------------------
router.put('/productos/actualizar/:id', auth.checkAuthentication, async (req, res) => {

  try {
    let prods=await productos.read();
    let id=req.params.id.toString();

    if (id<1){
      const ejs = require('ejs');        
            html = ejs.render('<%= err; %>', {err: "producto no encontrado"});        
          res.status(500).render("../viewsEjs/layout.ejs",{html});
    } else{
      
      let objeto=req.body;
      return res.type('json').send(JSON.stringify(await productos.update(id,objeto), null, 2) + '\n');
    }
  } catch (e) {
    const ejs = require('ejs');        
            html = ejs.render('<%= err; %>', {err: "producto no encontrado"});        
          res.status(500).render("../viewsEjs/layout.ejs",{html});
  }

  });

// DELETE api/productos/borrar/:id-------------------------------------------------
  router.delete('/productos/borrar/:id',auth.checkAuthentication, async (req, res) => {


    try {
      let id=req.params.id.toString();

      if (id<1){
        const ejs = require('ejs');        
            html = ejs.render('<%= err; %>', {err: "producto no encontrado"});        
          res.status(500).render("../viewsEjs/layout.ejs",{html});
      } else{
        
        
        return res.type('json').send(JSON.stringify(await productos.delete(id), null, 2) + '\n');
      }
    } catch (e) {
      const ejs = require('ejs');        
            html = ejs.render('<%= err; %>', {err: "producto no encontrado"});        
          res.status(500).render("../viewsEjs/layout.ejs",{html});
    }

    });



// GET api/productos/vista-------------------------------------------------
router.get('/productos/vista',async (req, res) => {
  try {
    let prods=await productos.read();
    if(prods.length=0){
      const ejs = require('ejs');        
            html = ejs.render('<%= err; %>', {err: "producto no encontrado"});        
          res.status(500).render("../viewsEjs/layout.ejs",{html});
    }else{
      
      

        res.render('vista', { hayProductos : true, productos:prods});
    }


    } catch (e) {
      const ejs = require('ejs');        
      html = ejs.render('<%= err; %>', {err: "producto no encontrado"});        
    res.status(500).render("../viewsEjs/layout.ejs",{html});

  }
});



module.exports = router;
