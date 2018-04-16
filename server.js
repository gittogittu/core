/*!
 *  author: Danj
 *  
 *  name: magister++
 *  MIT Licensed
 *
 *  using modules: -
 *  start command: 'node server.js'
 */

// Using the chicken modules (made by Danj) to make life easier: link
var chickencore = require('chickencore');
// Create web app
var app = chickencore();
// Set up webserver
var webserver = chickencore.listen(process.env.PORT || config.port, listen);

var fs = require('fs');


// classes for info
var classes = require('./classes.js');
// the config file for easiness
var config = require(./config.json);

//the server module
var server = classes.MakeServer(config.servername, webserver);


//------------Random Portion--------------

// This call back just tells us that the server has started, and on what ip
function listen() {
	var host = webserver.address().address;
	var port = webserver.address().port;
	if(host !== "::") {
		console.log('app listening at http://' + host + ':' + port);
	}else {
		console.log('app listening at http://localhost:' + port);
	}
}


//--------------------------

app.get('*', function(req, res) {
	
	if (JSON.parse(config.offline)) return res.sendFile(__dirname + "/html/website_offline.html");
	
	switch(req.originalUrl) {
		case '/':
			res.redirect('/magister');
			break;
		case '/magister':
			
		case '/magister/:id':
	}
	server.islogedin();
});
