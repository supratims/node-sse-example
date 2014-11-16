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
	app.get('/logout', function(req, res) {
		req.session.destroy(function(e){
			res.redirect('/');
		});
	});
	app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

};

var log = function(str) {
	var DEBUG = true;
	DEBUG && console && console.log('[ROUTER]: %j', str);
};


