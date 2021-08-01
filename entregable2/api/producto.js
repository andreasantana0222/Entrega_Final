let archivo='productos.txt';
const fs=require ('fs');

class Productos {
    constructor() {
        // incializar variables
        this.listaProductos=[{}];
        this.archivo=archivo;
    }

    read(){
      console.log('read carrito');
     const contenido = fs.readFileSync(this.archivo, 'utf-8');
     this.listaProductos=JSON.parse(contenido);
     //console.log(JSON.parse(contenido));
     //Envio objeto
     return JSON.parse(contenido);

   }

   save(objeto){
     console.log('save');
     console.log((new Date(Date.now())).toLocaleString());
     const productos =  this.read() || [];
//4. Un producto dispondrá de los siguientes campos: id, timestamp, nombre, descripcion,
// código, foto (url), precio, stock.
     let id=productos.length+1 || 1;
     let item={
       id:id,
       timestamp:(new Date(Date.now())).toLocaleString(),
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
     let idProducto=id-1 || 1;
     let item={
       id:id,
       timestamp:(new Date(Date.now())).toLocaleString(),
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
     const productos =  this.read() || [];


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
