const mongoose=require('mongoose');
const url="mongodb+srv://root:admin@cluster0.3lx2s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


//conexion mongoose
//mongoose.connect("mongodb://localhost:27017/mensaje", { useNewUrlParser: true, useUnifiedTopology: true })

async function connect(){
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    return;
}

connect();
