const fs = require('fs');
const mjml = require('mjml');
const nodemailer = require('nodemailer');
const mysql = require('mysql2/promise');
require('dotenv').config();

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
	(async () => {
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	});
	const [usuarios] = await connection.execute('SELECT nombre,email,idioma FROM suscriptores WHERE suscrito = 1');
	for (const user of usuarios){
		const lang = user.idioma;
		let mjmlPath = `oficial_${lang}.mjml`;

	if(!fs.existsSync(mjmlPath)){
		console.warn(`Plantilla no encontrada para idioma ${lang}, usando español por defecto.`);
		mjmlPath = 'oficial.mjml';
	}

	// leemos el archivo
	let mjmlTemplate = fs.readFileSync(mjmlPath, 'utf8');
	// Remplazando variables
	mjmlTemplate = mjmlTemplate.replace('{{nombre}}', user.nombre);

	const htmlOutput = mjml(mjmlTemplate).html;
	const subjects = {
		es: "SORTEO ENTRADAS GP CHESTE",
		en: "GP CHESTE ENTRIES GIVEAWAY",
		val: "SORTEIG ENTRADES GP XEST",
	};
	const subject = subjects[lang]
// Opciones del correo
const mailOptions = {
  from: process.env.O365_USER,
  to: user.email,
  subject: subject,
  html: htmlOutput
};

// Enviar el correo
	try{
	const info = await transporter.sendMail(mailOptions);
		console.log(`Correo enviado a ${user.email}:`, info.response);
	}catch (err) {
	console.error(`Error al enviar a ${user.email}:`, err);
	}
}

	await connection.end();
})();
