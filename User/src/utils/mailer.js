const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
	  user: "elliot.schultz93@ethereal.email",
	  pass: "PKVS4G18QewgwMbZpM",
	},
  });

  const sendForgotPasswordMail = async (req, res) => {
	const data = req.body;
	try {
	  await transporter.sendMail({
		from: `"Admin Sophie's Burgers" <info@sophiesburgers.com>`,
		to: data?.email,
		subject: "Forgot password",
		html: `<p>Hola ${data?.name},</p><p>Gracias por contactarnos. Aquí están tus datos:</p> <ul> <li>Nombre: ${data?.name} </li> <li>Correo: ${data.email}</li> <li><a href="https://sophies-burgers.vercel.app/restore-password/data.id" target="_blank">Recuperar contraseña</a></li> </ul>`,
	  });
	} catch (error) {
	  console.error("Error enviando el correo:", error);
	  res.status(200).json({
		code: '0',
		message: error?.body,
	  });
	}

	res.status(200).json({ code: '1', message: 'Email, send successfully' });
  };

  const sendRegistrationOtpMail = async (req, res) => {
	const data = req.body;
	try {
	  await transporter.sendMail({
		from: `"Admin Sophie's Burgers" <info@sophiesburgers.com>`,
		to: data?.email,
		subject: "Registration Otp",
		html: `<p>Hi ${data?.name},</p> <li>User registered successfully. OTP sent to email: ${data.email}</li>  </ul>`,
	  });
	} catch (error) {
	  console.error("Error enviando el correo:", error);
	  res.status(200).json({
		code: '0',
		message: error?.body,
	  });
	}

	return res.status(200).json({ code: '1', message: 'User registered successfully. OTP sent to email.' });
  };

  module.exports = { sendRegistrationOtpMail, sendForgotPasswordMail };