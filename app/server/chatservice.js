var Kaiseki = require('kaiseki'); //parse api client for nodejs, yay !
var APP_ID = 'kMzJgU6VdaMGTOxf4HWinneuzwlmto61Y0VLDA4p';
var REST_API_KEY = '1CkIJnkfY6UfvyZ9TG6HCQ0PdLD8eKzLRBEI1hWH';
var parse = new Kaiseki(APP_ID, REST_API_KEY);
var messageClassName = 'Message';


exports.getMessage = function(user, callback) {
	if (user) {
		var params = {
		  where: { username: user.username },
		  order: '-createdAt'
		};
		parse.getObjects(messageClassName, params, function(err, res, body, success) {
			//console.log(body);
			callback(body[0]);
		});
	} else {
		callback(null);
	}
}

exports.sendMessage = function(user, message, callback) {

	var message = {
	    username: user.username,
	    message: message
	};

	parse.createObject(messageClassName, message, function(err, res, body, success) {
	    console.log('object created = ', body + " with id " + body.objectId);
	    callback(body);
	});

}

