const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");


//impoer module
const routes = require("./api/src/routes/index");
const errorHandlers = require("./api/src/lib/handleErrors");



// import environmental variables from our variables.env file
require("dotenv").config({ path: "./api/keys.env" });


// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`${err.message}`);
});


// init Express app
const app = express();

//route logger
app.use(logger("dev"));
//use helmet security wrapper
app.use(helmet());
// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());

// Create link to Angular build directory
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());


//handling CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if(req.method === "OPTIONS"){
		res.header("Access-Control-Allow-Methods","POST, PUT, GET, DELETE, PATCH");
		return res.status(200).json({});
	}
	next();
});

//use route module
app.use("/", routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);


// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get("env") === "development") {
	/* Development Error Handler - Prints stack trace */
	app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);



app.set("port", process.env.PORT);
const server = app.listen(app.get("port"), () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
