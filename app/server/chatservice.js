var msgpool = {};

exports.getMessage = function(user) {
	return user ? msgpool[user.username] ? msgpool[user.username].pop() : null : null;
}

exports.sendMessage = function(user, message) {
	if (!msgpool[user.username]) {
		msgpool[user.username] = [];
	}
	msgpool[user.username].push(message);
}

