# Entrega_Final 

## 1) Contendrá las rutas necesarias que permitan listar los productos existentes, ingresar productos nuevos, borrar y modificar sus detalles, así como interactuar con el carrito de compras.
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
