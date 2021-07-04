let archivo='productos.txt';
const fs=require ('fs');

class Productos {
    constructor() {
        // incializar variables
        this.listaProductos=[{}];
        this.archivo=archivo;
    }

    read(){
      //console.log('read');
     const contenido = fs.readFileSync(this.archivo, 'utf-8');
     this.listaProductos=JSON.parse(contenido);
     //console.log(JSON.parse(contenido));
     //Envio objeto
     return JSON.parse(contenido);

   }

   //TO DO agregar más de una foto

   save(objeto){
     console.log('save');
     const productos =  this.read();

     let id=productos.length+1;
     let item={
       id:id,
       timestamp:Date.now(),
       nombre:objeto.nombre,
       descripcion:objeto.descripcion,
       codigo:objeto.codigo,
       foto:objeto.foto,
       precio:objeto.precio,
       stock:objeto.stock

     }
     productos.push(item);
      fs.writeFileSync(archivo,JSON.stringify(productos,null,'\t'));
     return item;
   }

   update(id,objeto){
     const productos =  this.read();
     let idProducto=id-1;
     let item={
       id:id,
       timestamp:Date.now(),
       nombre:objeto.nombre,
       descripcion:objeto.descripcion,
       codigo:objeto.codigo,
       foto:objeto.foto,
       precio:objeto.precio,
       stock:objeto.stock

     }
     productos[idProducto]=item;
     fs.writeFileSync(archivo,JSON.stringify(productos,null,'\t'));
    return item;

   }

   delete(id){
     const productos =  this.read();


       for (var i =0; i < productos.length; i++){

          if (productos[i].id == id) {
            let item=productos[i];
              productos.splice(i,1);
              fs.writeFileSync(archivo,JSON.stringify(productos,null,'\t'));
               return item;
            }
          }
        }

}

module.exports = new Productos();
