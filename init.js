chrome.app.runtime.onLaunched.addListener(function() {
	local.get('source',function(data){
		if(JSON.stringify(data) == "{}"){
			local.set({'source':'{}'},function(){});
			chrome.app.window.create('welcome.htm', {
		        id:"start",
		        'bounds': {
		            'width': 1200,
		            'height': 800
		        }
		    });
		}else{
			chrome.app.window.create('index.htm', {
		        id:"Conflict",
		        'bounds': {
		            'width': 1200,
		            'height': 800
		        }
		    });
		}
	});
});

var source=null;
