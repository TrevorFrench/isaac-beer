//------------------------------------------------------------------------------
//---------------------------------ACTION LIST----------------------------------
//------------------------------------------------------------------------------
/* -
   -
   -
*/

//------------------------------------------------------------------------------
//-----------------------------ENVIRONMENT VARIABLES----------------------------
//------------------------------------------------------------------------------
const express = require('express');                                 			// easier to work with than the HTTP module.
const path = require('path');                                       			// works with diretories and file paths
var bodyParser = require("body-parser");                            			// middleware
const app = express();                                              			// instantiate the module into a variable

const upload = require("express-fileupload")
const csvtojson = require("csvtojson")
let csvData = "test";
app.use(upload());

const actions = require('./actions')                                    			// reference queries.js to interact with postgreSQL database
// var passport = require('passport');												// login framework
// var Strategy = require('passport-local').Strategy;								// method which is used within the login framework
// var db = require('./db');														// folder which contains database files
// var theme = require('./theme')													// reference the theme.js file which contains theme change references
// const ip = require("ip")														// ip package for logging a users ip address
// require('dotenv').config();


//------------------------------------------------------------------------------
//-------------------------------ENVIRONMENT SETUP------------------------------
//------------------------------------------------------------------------------
app.use(bodyParser.json());                                         			// not sure exactly what this is used for
app.set('views', __dirname + '/public/views');                      			// sets filepath for view rendering
app.set('view engine', 'ejs');                                      			// sets the view engine to 'ejs'
app.use(require('morgan')('combined'));                             			// Use application-level middleware for common functionality, including
app.use(bodyParser.urlencoded({ extended: true }));                 			// logging, parsing, and session handling.

app.set("port", (process.env.PORT || 5000));                        			// sets the port to 5000
app.use(express.static(path.join(__dirname, '')));                  			// this allows js and css files to be linked to the HTML

app.listen(app.get("port"), function () {                           			// listens on the port and displays a message to the console
	console.log("Now listening on port: " + app.get("port"));
});

//------------------------------------------------------------------------------
//------------------------------------ROUTES------------------------------------
//------------------------------------------------------------------------------
app.get('/', 																	// when the root directory loads, send the landing.html file to the client
	(req, res) => 																// does this function even do anything?
		res.sendFile(
			path.join(__dirname, 'landing.html')
		)
	);

app.post("/upload_csv", (req, res) => {
    /** convert req buffer into csv string , 
    *   "csvfile" is the name of my file given at name attribute in input tag */
        csvData = req.files.csvfile.data.toString('utf8');
        return csvtojson().fromString(csvData).then(json => 
        {return res.status(201).json({csv:csvData, json:json})})
    });

//------------------------------------------------------------------------------
//---------------------------INITIALIZE DB CONNECTION---------------------------
//------------------------------------------------------------------------------
// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'xdlepbswgkuwsn',
//   host: 'ec2-54-236-146-234.compute-1.amazonaws.com',
//   database: 'd216rqdgnn6371',
//   password: '43fc7fd35e724f6a212661eb4fd3ae514003079f9d3a56a56b2d96eb959dbaeb',
//   port: 5432,
//   ssl: true,
// })

// var pg = require('pg')
//   , session = require('express-session')
//   , pgSession = require('connect-pg-simple')(session);

// app.use(session({
// 		  store: new pgSession({
// 			pool : pool,                										// Connection pool
// 		  }),
// 		secret: 'keyboard cat', 
// 		resave: false, 
// 		saveUninitialized: true, 
// 		cookie: { maxAge: 60 * 60 * 1000 }										// 1 hour cookie
// 	})
// );

//------------------------------------------------------------------------------
//---------------------------------LOGIN MODULES--------------------------------
//------------------------------------------------------------------------------
// passport.use(new Strategy(														// Configure the local strategy for use by Passport.
// 	function(username, password, cb) {								
// 	  db.users.findByUsername(username, function(err, user) {					// The local strategy require a `verify` function which receives the credentials
// 	    if (err) { return cb(err); }											// (`username` and `password`) submitted by the user.  The function must verify
// 		if (!user) { return cb(null, false); }									// that the password is correct and then invoke `cb` with a user object, which
// 		if (user.password != password) { return cb(null, false); }				// will be set at `req.user` in route handlers after authentication.
// 		return cb(null, user);
// 	  });
// 	}
// ));

// passport.serializeUser(function(user, cb) {										// Configure Passport authenticated session persistence.
// 	cb(null, user.id);															// In order to restore authentication state across HTTP requests, Passport needs
// });																				// to serialize users into and deserialize users out of the session.  The

// passport.deserializeUser(function(id, cb) {										// typical implementation of this is as simple as supplying the user ID when
// 	db.users.findById(id, function (err, user) {								// serializing, and querying the user record by ID from the database when
// 		if (err) { return cb(err); }											// deserializing.
// 		cb(null, user);
// 	});
// });

// app.use(passport.initialize());													// Initialize Passport and restore authentication state, if any, from the session
// app.use(passport.session());