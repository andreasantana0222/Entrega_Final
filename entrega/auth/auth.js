//JWT
//JASON TOKEN
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.TOKEN_SECRET; // || 'secret'



class AuthUser{
    constructor(){}

    async  encryptPassword(password){
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        return await bcrypt.hash(password,salt);
    }

    async  comparePassword(password,receivedPassword){
       return await bcrypt.compare(password,receivedPassword);
    }

    checkAuthentication(req, res, next) {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(403).send('debe proveer el token');
        }
    
        jwt.verify(token, process.env.TOKEN_SECRET, (err, value) => {
            if (err) return res.status(500).send('fallo la autenticacion con token');
    
            req.user = value;
            next();
        });
    }
    
     isValidPassword  (user, password)  {
        return bcrypt.compareSync(password, user.password);
    }
    
     generateToken(user) {
        return jwt.sign({ data: user }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION});
    }
    
     createHash (password)  {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(Number(process.env.SALT)), null);
    }
    
}

module.exports= new AuthUser();

