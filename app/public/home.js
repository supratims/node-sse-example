(function() {
	var $main = $('.main');	
	function init(){
		if (!!window.EventSource) {
		    var source = new EventSource('/stream');
			source.addEventListener('message', function(e) {
			    //console.log(e.data);
			    $main.html(e.data);
			}, false);

			source.addEventListener('open', function(e) {
				console.log("Connection open");
			}, false);

			source.addEventListener('error', function(e) {
			    if (e.readyState == EventSource.CLOSED) {
			    	console.log("Connection closed");
			    }
			}, false);		  
		} else {
		    // Result to xhr polling , looks like its IE ! pack your bags and run.
		    alert("Use a modern browser will you");
		}
	}

	init();
})();