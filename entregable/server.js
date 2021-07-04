const express = require('express');
// Inicializamos express
const app = express();
// Le pasamos la constante que creamos app
const http = require('http').Server(app);
// Le pasamos la constante que creamos http
// se trabaja con http y no con express
//const io = require('socket.io')(http);

// Declaramos la api que tiene la Clase de acceso al archivo
//const carrito = require('./api/carrito');

// Inicializamos la librería handlebars
const handlebars = require('express-handlebars');



// creo una app de tipo express
//const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//establecemos la configuración de handlebars
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials/'
    })
);

app.set("view engine", "hbs");
app.set("views", __dirname + '/views');






// importo las rutas y las uso con el prefijo /api
const productosRouter = require('./routes/productos');
app.use('/productos', productosRouter);

const carritoRouter = require('./routes/carrito');
app.use('/carrito', carritoRouter);

// indico donde estan los archivos estaticos
app.use(express.static('public'));

/// GET api/-------------------------------------------------
// envio a renderizar el html en la raiz de la misma
app.get('/', (req, res) => {
    res.sendFile('/views/layouts/vista.hbs',{root:__dirname});
});



/// obtengo el puerto del enviroment o lo seteo por defecto
const PORT = process.env.PORT || 8080;

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

// SOCKET
// cuando se realice la conexion, se ejecutara una sola vez
//io.on('connection', (socket) => {
//    console.log("Usuario conectado");
//    socket.emit('actualizar', carrito.read());

//    socket.on('guardar', (data) => {
        //productos.save(data);
//        console.log(carrito.read());
//        io.sockets.emit('actualizar', carrito.read());
//    });
//});



// en caso de error, avisar
http.on('error', error => {
    console.log('error en el servidor:', error);
    res.status(500).send({error : 'ocurrió un error'});
});


//manejo de errores
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500).send({error : 'ocurrió un error'});
});
