const { text } = require('express');
const nodemailer=require('nodemailer');
const fs = require('fs');

class Mail{
    constructor(){}

    /**
     * Nodemailer configuration and Method to send the email
     * @param {String} from 
     * @param {String} to 
     * @param {String} subject 
     * @param {String} text 
     */
    sendMailWelcome(from,to,subject,text){
        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST, //'smtp.ethereal.email',
            port: process.env.NODEMAILER_PORT, //587,
            auth: {
                user: process.env.NODEMAILER_AUTH_USER,
                pass: process.env.NODEMAILER_AUTH_PASS
            },
            tls: { rejectUnauthorized: false }
        });
        
        /*
        const mailOptions = {
            from: 'Servidor Node.js',
            //to: 'emanuelbalcazar13@gmail.com',
            to: 'malena.santana.dev@gmail.com',
            subject: 'Mail de prueba desde Node.js',
            html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
        }
        */
        let archivo = (__dirname+ "../../public") + "/email.txt";
       const mailOptions ={
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: fs.readFileSync(archivo, 'utf-8')
       }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                return err
            }
            
        });
    }

}

module.exports= new Mail();