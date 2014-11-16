module.exports = function(app) {
	app.get('/', function(req, res){
		res.render('home');
	});

	app.post('/', function(req, res){
		res.redirect('/home');
	});

	app.get('/home', function(req, res) {
	    res.render('home');
	});
	app.post('/home', function(req, res) {
	    res.render('home');
	});

	app.get('/stream', function(req, res) {
	  if (req.headers.accept && req.headers.accept == 'text/event-stream') {	    
	      sendSSE(req, res);
	  } 	    
	});

	app.get('/logout', function(req, res) {
		req.session.destroy(function(e){
			res.redirect('/');
		});
	});
	app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

};

function sendSSE(req, res) {
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

function constructSSE(res, id, data) {
  res.write('id: ' + id + '\n');
  res.write("data: " + data + '\n\n');
}

function debugHeaders(req) {
  sys.puts('URL: ' + req.url);
  for (var key in req.headers) {
    sys.puts(key + ': ' + req.headers[key]);
  }
  sys.puts('\n\n');
}

var log = function(str) {
	var DEBUG = true;
	DEBUG && console && console.log('[ROUTER]: %j', str);
};


