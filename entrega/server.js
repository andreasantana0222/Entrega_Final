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
const usuarios = require('./api/usuario');

// Declaramos la api que tiene la Clase de acceso al archivo
const chat = require('./api/chat');

// Inicializamos la librería handlebars
const handlebars = require('express-handlebars');

// Librería DotEnv
const dotenv = require('dotenv');   
// obtengo la config del .env
dotenv.config();

//Manejo de Errores
const miError = require('./auth/error');

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

// TEMPLATE-ENGINES-----------------------------------------
//Handlebars
app.set("view engine", "hbs");
app.set("views", __dirname + '/views');

//Pug

const pug = require('pug');




// envio a renderizar el html en la raiz de la misma
app.get('/pug', (req, res) => {
    
    // Compile template.pug, and render a set of data
    res.send(pug.renderFile('./viewsPug/layout.pug',{
        twitter:'Twitter',
        twitter1:process.env.TWITTER_APP_ID,
        twitter2:process.env.TWITTER_CONSUMER_KEY,
        twitter3:process.env.TWITTER_SECRET,
        facebook:'Facebook',
        facebook1:process.env.FACEBOOK_CLIENT_ID,
        facebook2:process.env.FACEBOOK_CLIENT_SECRET,
        google:'Google',
        google1:process.env.GOOGLE_CLIENT_ID,
        google2:process.env.GOOGLE_CLIENT_SECRET       

    }));
});

//Ejs


app.get('/ejs',(req, res) => {
    miError.MostrarError("Modelo EJS",res);
});

//------------------FIN TEMPLATE-ENGINES

/// SESSION Punto  6-----------------------------------------
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo');
const config = require('./src/mongo-local/config/config.json');



// TO DO pasar las variables al .env

app.use(cookieParser());


var hour = 3600000;

app.use(sessions({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,//el objeto de sesión se almacenará en el almacén de sesión 
    cookie: {
        originalMaxAge: hour,
        expires: new Date(Date.now() + hour),
        httpOnly:true
    },
    store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        ttl: 14 * 24 * 60 * 60,// = 14 days The maximum lifetime (in seconds) of the session which will be used to set session.cookie.expires if it is not yet set. Default is 14 days.
        autoRemove: 'native', //Behavior for removing expired sessions. Possible values: 'native', 'interval' and 'disabled'.
        touchAfter: 24 * 3600, // time period in seconds. Interval (in seconds) between session updates.
        collectionName: 'sessions' //A name of collection used for storing sessions.
    })
}));



///----------------FIN SESSION

// PASSPORT-FACEBOOK-------------------------------

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// inicializamos passport
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback",
    profile: ['id', 'displayName', 'photos', 'email']

},
function(accesToken,refreshToken,profile, done){
    let unUsuario= {
            timestamp: "",
            nombre: profile.displayName,
            email: profile.email,
            password: "",
            foto: profile.photos[0].toString()
        };
        
        usuarios.save(unUsuario);        
        return done(null, profile); 
    }

));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',{
    successRedirect: '/registered.html',
    failureRedirect: '/auth/faillogin'
}));

//----------------------FIN PASSPORT-FACEBOOK



// PASSPORT-TWITTER-------------------------------

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_SECRET = process.env.TWITTER_SECRET;

app.set('trust proxy', 1);

const TwitterStrategy = require('passport-twitter').Strategy;

// inicializamos passport
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_SECRET,
    userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
    callbackURL: '/auth/twitter/callback',
    include_email:true,
    include_entities:true

},
function(accesToken,refreshToken,profile, done){
    
    let unUsuario= {
            timestamp: "",
            nombre: profile.displayName,
            email: profile.emails[0].value,
            password: "123",
            foto: profile.photos[0].toString()
        };
        
        usuarios.save(unUsuario);
        return done(null, profile);    
    }

));



passport.serializeUser(function (user, done) {
    //console.log('2 - serializar el usuario', user); // --> req.user
    let userString = JSON.stringify(user._json);
    done(null, userString);
});

passport.deserializeUser(function (user, done) {
    //console.log('3 - deserializar el usuario', user);
    done(null, JSON.parse(user));
});

// inicializamos passport
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter',
    {
        successRedirect: '/registered.html',
        failureRedirect: '/auth/faillogin'
    }
));

app.get('/auth/faillogin', (req, res) => {
    
    miError.MostrarError("No se pudo autenticar",res);
});

app.get('/auth/datos', (req, res) => {
    if (req.isAuthenticated()) {        
        res.send({datos: req.user});
        
    } else {
        
        miError.MostrarError("debe autenticarse primero",res);
    }
});

//----------------------FIN PASSPORT-TWITTER

// PASSPORT-GOOGLE-------------------------------

const GOOGLE_CLIENT_ID= process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET= process.env.GOOGLE_CLIENT_SECRET;

var GoogleStrategy = require('passport-google-oauth20').Strategy;

/**
 * This scope tells google what information we want to request.
 */
 const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email'
  ];

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: defaultScope,
    access_type: 'offline',
    prompt: 'consent'
  },
  function(accessToken, refreshToken, profile, done) {
    let unUsuario= {
        timestamp: "",
        nombre: profile.displayName,
        email: profile.emails[0].value,
        password: "123",
        foto: profile.photos[0].value
    };
    
    usuarios.save(unUsuario);
    return done(null, profile);   

  }

  
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['openid', 'email','profile'] }));

app.get('/auth/google/callback', passport.authenticate('google',
    {
        successRedirect: '/registered.html',
        failureRedirect: '/auth/faillogin'
    }
));
//----------------------FIN PASSPORT-GOOGLE

// importo las rutas y las uso con el prefijo /api
const productosRouter = require('./routes/productos');
const carritoRouter = require('./routes/carrito');
const usuariosRouter = require('./routes/usuarios');
const ordenRouter = require('./routes/orden');

app.use('/api', productosRouter);
app.use('/api', carritoRouter);
app.use('/api', usuariosRouter);
app.use('/api', ordenRouter);

// indico donde estan los archivos estaticos
app.use(express.static('public'));

/// GET api/-------------------------------------------------
// envio a renderizar el html en la raiz de la misma
app.get('/', (req, res) => {
    
    if (req.isAuthenticated()) {
        res.redirect('registered.html');
    } else {
        res.sendFile('index.html',{root:__dirname});
    }
    
});

app.get('/registered.html', (req,res) =>{
    if (req.isAuthenticated()) {
        res.redirect('registered.html');
    } else {
        res.sendFile('index.html',{root:__dirname});
    }
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



// en caso de error, avisar
http.on('error', error => {
    console.log('error en el servidor:', error);
    
    miError.MostrarError("error en el servidor",res);
});


//manejo de errores
app.use(function(err,req,res,next){
  console.error(err.stack);
  

  //Ejs

  miError.MostrarError("error en el servidor",res);
        
  });
