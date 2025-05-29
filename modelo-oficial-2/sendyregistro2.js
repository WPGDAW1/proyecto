// este será para expositores
const fs = require('fs');
const mjml = require('mjml');
const nodemailer = require('nodemailer');
const mysql = require('mysql2/promise');
require('dotenv').config();

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

(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
	let exp = "expositor";
  const [usuarios] = await connection.execute(
    'SELECT idUsuario, nombre, email, idioma FROM suscriptores WHERE suscrito = 1 AND tipoUsuario = ?',[exp]
  );

  const subjects = {
    es: "OPTIMIZA TU PARTICIPACIÓN EN EXPOJOVE",
    en: "OPTIMIZE YOUIR PARTICIPATION IN EXPOJOVE",
    val: "OPTIMITZA LA TEUA PARTICIPACIÓ EN EXPOJOVE",
  };

  for (const user of usuarios) {
    const lang = user.idioma;
    const subject = subjects[lang] || subjects['es'];
    const fechaEnvio = new Date();

    let mjmlPath = `oficial2_${lang}.mjml`;
    if (!fs.existsSync(mjmlPath)) {
      console.warn(`Plantilla no encontrada para idioma ${lang}, usando español por defecto.`);
      mjmlPath = 'oficial2_es.mjml';
    }

    let mjmlTemplate = fs.readFileSync(mjmlPath, 'utf8');
    mjmlTemplate = mjmlTemplate.replace('{{nombre}}', user.nombre);
    mjmlTemplate = mjmlTemplate.replace('{{email}}', user.email);
    const htmlOutput = mjml(mjmlTemplate).html;

    let id_mensaje = null;
    try {
      const [mensajeRows] = await connection.execute(
        'SELECT idMensaje FROM mensaje WHERE nombre = ?',
        [subject]
      );

      if (mensajeRows.length === 0) {
        const [insertResult] = await connection.execute(
          'INSERT INTO mensaje (nombre, tipo) VALUES (?, ?)',
          [subject, 'exposición']
        );
        idMensaje = insertResult.insertId;
        console.log(`Mensaje insertado con ID ${id_mensaje}`);
      } else {
        idMensaje = mensajeRows[0].idMensaje;
      }
    } catch (err) {
      console.error('Error al procesar la tabla mensaje:', err);
      continue;
    }

    if (!user.idUsuario || !idMensaje || !fechaEnvio) {
      console.error('Datos incompletos para registrar envío:', {
        idUsuario: user.idUsuario,
        idMensaje,
        fechaEnvio
      });
      continue;
    }

    const mailOptions = {
      from: process.env.O365_USER,
      to: user.email,
      subject: subject,
      html: htmlOutput
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Correo enviado a ${user.email}:`, info.response);

      await connection.execute(
        'INSERT INTO envios (idUsuario, idMensaje, fecha_envio) VALUES (?, ?, ?)',
        [user.idUsuario, idMensaje, fechaEnvio]
      );
    } catch (err) {
      console.error(`Error al enviar a ${user.email}:`, err);
    }
  }

  await connection.end();
})();
