const express = require('express');
// Inicializamos express
const app = express();
// Le pasamos la constante que creamos app
const http = require('http').Server(app);
// Le pasamos la constante que creamos http
// se trabaja con http y no con express
const io = require('socket.io')(http);

// Declaramos la api que tiene la Clase de acceso al archivo
const productos = require('./api/producto');
const carrito = require('./api/carrito');

// Declaramos la api que tiene la Clase de acceso al archivo
const chat = require('./api/chat');

// Inicializamos la librería handlebars
const handlebars = require('express-handlebars');

// Librería DotEnv
const dotenv = require('dotenv');   
// obtengo la config del .env
dotenv.config();



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
const carritoRouter = require('./routes/carrito');
app.use('/api', productosRouter);
app.use('/api', carritoRouter);

// indico donde estan los archivos estaticos
app.use(express.static('public'));

/// GET api/-------------------------------------------------
// envio a renderizar el html en la raiz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html',{root:__dirname});
});



// obtengo el puerto del enviroment o lo seteo por defecto
const PORT = process.env.PORT || 3000;
//const PORT = process.env.PORT || config.PORT;

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});


// SOCKET
// cuando se realice la conexion, se ejecutara una sola vez
io.on('connection', async(socket) => {
    console.log("Usuario conectado");

    //Actualiza la lista de productos en index.html
    socket.emit('actualizar', await productos.read(), await carrito.read());

    //Actualiza los mensajes en el index.html
    socket.emit('messages', await chat.read());

    //Guarda un nuevo producto en la base de datos
    socket.on('guardar', async(data) => {
        await productos.save(data);        
        io.sockets.emit('actualizar', await productos.read(), await carrito.read());
    });

    //Guarda un nuevo mensaje en la base de datos
    socket.on('new-message',async function(data){
      await chat.save(data);      
      io.sockets.emit('messages', await chat.read());
    });

    //Filtrar producto en el index.html
    socket.on('filtrar', async(data) => {
        await productos.filtrar(data);        
        io.sockets.emit('actualizar', await productos.filtrado(), await carrito.read());
    });
});

//JWT
//JASON TOKEN
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = 'secret'; //process.env.MY_SECRET_TOKEN || 'secret'
const usuarios = [];

app.post('/registrar', (req, res) => {
    try {
        let user = req.body;
        user.password = createHash(user.password);
        usuarios.push(user);
        res.send({ status:'Registro exitoso' });
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/login', (req, res) => {
    let user = usuarios.find(user => user.username === req.body.username);

    if (!user) {
        return res.status(400).send('usuario no encontrado');
    }

    if (!isValidPassword(user, req.body.password)) {
        return res.status(400).send('usuario/contraseña no valido');
    }

    res.send({ token: generateToken(user) });
});

app.get('/datos', checkAuthentication, (req, res) => {
    res.send('<h1>datos protegidos por middleware</h1>');
});

function checkAuthentication(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(403).send('debe proveer el token');
    }

    jwt.verify(token, secret, (err, value) => {
        if (err) return res.status(500).send('fallo la autenticacion con token');

        req.user = value;
        next();
    });
}

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

function generateToken(user) {
    return jwt.sign({ data: user }, secret, { expiresIn: '10m' });
}

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

//---------------------------------------fin  JWT



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
