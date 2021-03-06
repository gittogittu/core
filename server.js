/*!
 *  author: Danj
 *  
 *  name: magister++
 *  *** licensed
 *
 *  using modules: chickencore
 *  start command: 'node server.js'
 */

// Using the chicken modules (made by Danj) to make life easier: link
var chickencore = require('chickencore');
// the logger from chickencore
var logger = chickencore.logger;
// fs, for file system
var fs = require('fs');


// classes for info
var classes = require('./classes.js');
// the config file for easiness
var config = require(./config.json);

// Create web app
var app = chickencore(config.servername]);
// Set up webserver
var webserver = chickencore.listen(process.env.PORT || config.port, listen);


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
	
	if (config.offline) return res.sendFile(__dirname + "/html/website_offline.html");
	
	switch(req.originalUrl) {
		case '/':
			res.redirect('/magister');
			break;
		case '/login':
			res.sendFile(__dirname + "/html/login.html" );
			break;
		case '/logout':
			res.redirect('/login');
			break;
		case '/magister':
			res.redirect('/magister/' + config.magister.homepage);
			break;
		case '/magister/:id':
			if(app.isAuth(req, res)) {
				if(fs.existsSync(__dirname + "/html/" + req.params.id + ".html")) {
					res.sendFile(__dirname + "/html/" + req.params.id + ".html");
				}else {
					app.Render(__dirname + "/html/errorpage.html", "403error", config.lang, function(str){res.send(str)});	
				}
			}else {
				res.redirect('/login');
			}
			break;
		default:
			app.Render("errorpage.html", "403error", config.lang, function(str){res.send(str)});
			return;
			break;
	}
});

app.post('/login', function(req, res) {
	if (req.body.name) {
		if(req.body.password) {
			app.login(req, res);
			return;
		}
	}
	res.sendFile(__dirname + "/html/login.html" );
});

app.post('/logout', function(req, res) {
	app.logout(req, res);
});
