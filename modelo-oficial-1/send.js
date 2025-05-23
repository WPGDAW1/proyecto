const fs = require('fs');
const mjml = require('mjml');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Leer y convertir el archivo MJML a HTML
const mjmlTemplate = fs.readFileSync('oficial.mjml', 'utf8');
const htmlOutput = mjml(mjmlTemplate).html;

// Configurar el transporter SMTP de Office365
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.O365_USER,
    pass: process.env.O365_PASS,
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

// Opciones del correo
const mailOptions = {
  from: process.env.O365_USER,
  to: process.env.TO,
  subject: 'TITULAR',
  html: htmlOutput
};

// Enviar el correo
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error al enviar correo:', error);
  }
  console.log('Correo enviado:', info.response);
});
