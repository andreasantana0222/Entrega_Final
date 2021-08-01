let archivo='carrito.txt';
const fs=require ('fs');

class Carrito {
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

   save(objeto){
     //console.log('save');
     const productos =  this.read() || [] ;
// 5. El carrito de compras tendrá la siguiente estructura:
//id, timestamp(carrito), producto: { id, timestamp(producto), nombre, descripcion, código,
//foto(url), precio, stock }

     let id=productos.length+1 || 1;
     //console.log(id);
     let item={
       id:id,
       timestamp:(new Date(Date.now())).toLocaleString(),
       producto:objeto
     }
     //console.log(item);
     productos.push(item);
      fs.writeFileSync(archivo,JSON.stringify(productos,null,'\t'));
     return item;
   }

   update(id,objeto){
     const productos =  this.read() || [];
     let idProducto=id-1 || 1;
     let item={
       id:id,
       timestamp:(new Date(Date.now())).toLocaleString(),
       producto:objeto
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

module.exports = new Carrito();
