/*hacky nonsense because my db connection broke*/
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0' // Also did this: npm config set strict-ssl=false and added ssl=true to queries.js //should probably be able to fix this now
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
const admin = require('./admin')                                    			// reference queries.js to interact with postgreSQL database

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

app.post("/insert_items", (req, res) => {
        actions.insert_into_items_table(req, res)
    });

app.post("/sql_query", (req, res) => {
	actions.sql_query(req, res)
});

app.post('/admin', 														        // admin button
    admin.create_items_table
)

//------------------------------------------------------------------------------
//---------------------------INITIALIZE DB CONNECTION---------------------------
//------------------------------------------------------------------------------
const Pool = require('pg').Pool
const pool = new Pool({
	user: 'ogljtmsfsccehp',
	host: 'ec2-44-208-88-195.compute-1.amazonaws.com',
	database: 'd4c18r3meh2uhu',
	password: '66ee89ea6005539c144cf6e141e27a30776a2c2f1456dadbbd9f3a5591490b80',
	port: 5432,
	ssl: true,
})

var pg = require('pg')
  , session = require('express-session')
  , pgSession = require('connect-pg-simple')(session);

app.use(session({
		  store: new pgSession({
			pool : pool,                										// Connection pool
		  }),
		secret: 'keyboard cat', 
		resave: false, 
		saveUninitialized: true, 
		cookie: { maxAge: 60 * 60 * 1000 }										// 1 hour cookie
	})
);