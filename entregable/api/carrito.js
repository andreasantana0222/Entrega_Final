let archivo='carrito.txt';
const fs=require ('fs');

class Carrito {
    constructor() {
        // incializar variables
        this.listaProductos=[{}];
        this.archivo=archivo;
    }

    read(){
      console.log('read/contenido');
     const contenido = fs.readFileSync(this.archivo, 'utf-8');
     this.listaProductos=JSON.parse(contenido);
     console.log(JSON.parse(contenido));
     //Envio objeto
     return JSON.parse(contenido);

   }

   //TO DO agregar más de una foto

   save(objeto){
     console.log('save');
     const productos =  this.read();

     let id=productos.length+1;
     //"id":2,
   	//"timestamp":"27 July 2016 13:30:00 UTC+05:45",
   	//"producto":{
     let item={
       title:objeto.title,
       price:objeto.price,
       thumbnail:objeto.thumbnail,
       id:id
     }
     productos.push(item);
      fs.writeFileSync(archivo,JSON.stringify(productos,null,'\t'));
     return item;
   }

   update(id,objeto){
     const productos =  this.read();
     let idProducto=id-1;
     let item={
       title:objeto.title,
       price:objeto.price,
       thumbnail:objeto.thumbnail,
       id:id
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

module.exports = new Carrito();
