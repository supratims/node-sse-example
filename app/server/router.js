var chatservice = require('./chatservice.js');
module.exports = function(app) {
	app.get('/', function(req, res){
		requiresLogin(req, res);
	});

	app.post('/', function(req, res){
		res.redirect('/home');
	});
	app.get('/login', function(req, res){
		res.render('login');
	});
	app.post('/login', function(req, res){
		//log(req.param('user'));
		doLogin(req, res, function() {
			requiresLogin(req, res);
		});
	});
	app.get('/home', function(req, res) {
		requiresLogin(req, res);
	});
	app.post('/home', function(req, res) {
	    res.render('home');
	});
	app.get('/system', function(req, res) {
		res.render('system');
	});
	app.post('/system', function(req, res) {
		if (req.param('message')) {
			chatservice.sendMessage({username: 'lucy'}, req.param('message'), function(msg) {
				res.render('system', {message: 'Message Sent !'});
			});
		} else {
			res.render('system');
		}
	});
	app.get('/stream', function(req, res) {
	  if (req.headers.accept && req.headers.accept == 'text/event-stream') {
	      sendChats(req, res);
	  }
	});

	app.get('/logout', function(req, res) {
		req.session.destroy(function(e){
			res.redirect('/');
		});
	});
	app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

};

function sendChats(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  var id = (new Date()).toLocaleTimeString();
  setInterval(function() {
    chatservice.getMessage(req.session.user, function(msg) {
		constructSSE(res, id,  msg ? msg.message : null);
    })
  }, 3000);

  chatservice.getMessage(req.session.user, function(msg) {
      constructSSE(res, id, msg ? msg.message : null);
  })
}

function constructSSE(res, id, data) {
  if (data != null) {
	  res.write('id: ' + id + '\n');
	  res.write("data: " + data + '\n\n');
  }
}

function doLogin(req, res, callback) {
	if (req.param('user')) {
		req.session.user = {username: req.param('user')};
	}
	callback();
}

function requiresLogin(req, res) {
	if (req.session.user == null) {
		res.redirect('/login');
	} else {
		res.render('home', { user: req.session.user });
	}
}

var log = function(str) {
	var DEBUG = true;
	DEBUG && console && console.log('[ROUTER]: %j', str);
};

/*
function sendServerTimeAsSSE(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  var id = (new Date()).toLocaleTimeString();

  // Sends a SSE every 5 seconds on a single connection.
  setInterval(function() {
    constructSSE(res, id, (new Date()).toLocaleTimeString());
  }, 5000);

  constructSSE(res, id, (new Date()).toLocaleTimeString());
}
*/
function debugHeaders(req) {
  sys.puts('URL: ' + req.url);
  for (var key in req.headers) {
    sys.puts(key + ': ' + req.headers[key]);
  }
  sys.puts('\n\n');
}