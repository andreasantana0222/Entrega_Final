# Entrega_Final 

## 1) Contendrá las rutas necesarias que permitan listar los productos existentes, ingresar productos nuevos, borrar y modificar sus detalles, así como interactuar con el carrito de compras.
## 2) Se implementará una API RESTful con los verbos get, post, put y delete para cumplir con todas las acciones necesarias.
## 3) Debe brindar al frontend un mecanismo de ingreso autorizado al sistema basado en JWT (Json Web Token).
### CARRITO
* LISTAR GET http://localhost:3000/api/carrito/listar
* LISTAR UNO GET http://localhost:3000/api/carrito/listar/:id
* AGREGAR POST http://localhost:3000/api/carrito/agregar
* BORRAR UNO DELETE http://localhost:3000/api/carrito/borrar/:id
* ACTUALIZAR UNO PUT http://localhost:3000/api/carrito/actualizar/:id

### PRODUCTO
* LISTAR GET http://localhost:3000/api/productos/listar
* LISTAR UNO GET http://localhost:3000/api/productos/listar/:id
* AGREGAR POST http://localhost:3000/api/productos/agregar
* BORRAR UNO DELETE + TOKEN http://localhost:3000/api/productos/borrar/:id
* ACTUALIZAR UNO PUT + TOKEN http://localhost:3000/api/productos/actualizar/:id

### USUARIO
* LISTAR GET http://localhost:3000/api/usuarios/listar
* LISTAR UNO GET http://localhost:3000/api/usuarios/listar/:id
* AGREGAR POST http://localhost:3000/api/usuarios/registrar
* BORRAR UNO DELETE + TOKEN http://localhost:3000/api/usuarios/borrar/:id
* ACTUALIZAR UNO PUT + TOKEN http://localhost:3000/api/usuarios/actualizar/:id
* LOGIN POST http://localhost:3000/api/usuarios/login

## 4) Los productos ingresados se almacenarán en una base de datos MongoDB.
Mongo Local + Mongoose
* show dbs
###### ecommerce
* use ecommerce
* show collections
###### carritos
###### chats
###### productos
###### usuarios

## 5) El usuario podrá registrar sus credenciales de acceso (email y password) para luego poder ingresar a su cuenta. Estas credenciales serán guardadas en la base de datos MongoDB encriptando la contraseña.
* libreria bcrypt 

## 6) El cliente tendrá una sesión activa de usuario con tiempo de expiración
configurable.
