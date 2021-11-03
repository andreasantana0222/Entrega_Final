const { text } = require('express');
const nodemailer=require('nodemailer');
const fs = require('fs');

const factory = require("../persistencia/factory");
const instancia = factory.getPersistencia("mongo-local", "carrito");

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
       };

       const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST, //'smtp.ethereal.email',
        port: process.env.NODEMAILER_PORT, //587,
        auth: {
            user: process.env.NODEMAILER_AUTH_USER,
            pass: process.env.NODEMAILER_AUTH_PASS
        },
        tls: { rejectUnauthorized: false }
    });
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                
                return err
            }
            
        });
    }

    /**
     * 
     * @param {String} from 
     * @param {String} to 
     * @param {String} subject 
     * @param {String} text 
     * @param {String} idCarrito 
     */
    async sendMailNewOrder(from,to,subject,text,idCarrito){

        let unCarrito= await instancia.readById(idCarrito);
        let archivo ="";
        
        if (unCarrito){
            archivo = '<html><head></head><body>' + unCarrito.producto.id + " - " + unCarrito.producto.nombre  + '</body></html>';
        
        } else{
            archivo='<html><head></head><body>Error al leer producto</body></html>';
        
        }
        //let archivo = (__dirname+ "../../public") + "/email.txt";
        //let archivo = '<html><head></head><body>' + carrito.producto.nombre + '</body></html>';
        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST, //'smtp.ethereal.email',
            port: process.env.NODEMAILER_PORT, //587,
            auth: {
                user: process.env.NODEMAILER_AUTH_USER,
                pass: process.env.NODEMAILER_AUTH_PASS
            },
            tls: { rejectUnauthorized: false }
        });

        const mailOptions ={
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: archivo
           };
           
           
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                
                return err
            }
            
        });
    }

}

module.exports= new Mail();