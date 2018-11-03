const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

exports.sendEmail = (name, mail) => {
	let transporter = nodemailer.createTransport({
		host: process.env.MAILHOST,
		port: process.env.MAILPORT,
		secure: false, // true for 465, false for other ports
		tls: {
			rejectUnauthorized: false
		},
		auth: {
			user: process.env.MAILUSER,
			pass: process.env.MAILPASS
		}
	});

	//using engine for mail view
	transporter.use("compile", hbs({
		viewEngine: "handlebars",
		viewPath: "./src/lib/template/",
		extName: ".html"
	}));

	transporter.sendMail({
		from: "Tenant Registration <contact@adp.ng>", // sender address
		to: `${mail}`, // list of receivers
		subject: `${name} Registered Successfully`, // Subject line
		template: "emailtempl", // email template
		context: {
			fullName: `${name}`,
		}
	}, (err, info) => {
		if (!err) {
			console.log("Message sent: %s", info.messageId);
		} else {
			console.log(err.message);
		}
	});
};

