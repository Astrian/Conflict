chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.htm', {
        id:"Conflict",
        'bounds': {
            'width': 1200,
            'height': 800
        }
    });
});

var rss=new String();

var tcp=new tcp();
tcp.create(function(info){
	console.log('create! id = ', tcp.id);
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	console.log(message);
	if(message.action=='getRssS')
		tcp.connect(message.ip,message.port,function(info){
			message.action='connectOk';
			chrome.runtime.sendMessage(message);
		});
	if(message.action=='connectOk'){
		var data="GET " + message.file + " HTTP/1.1\r\nHost: " + message.ip + "\r\n\r\n";
		tcp.send(data,function(){});
	}
});

chrome.sockets.tcp.onReceive.addListener(function(info) {
	rss=rss+ab2Utf8(info.data);
});

chrome.sockets.tcp.onReceiveError.addListener(function(info){
	if(info.resultCode==-15){
		var i = rss.indexOf("<rss");
		rss=rss.slice(i);

		var message={
			action:'getRssR',
			rss:rss
		}

		chrome.runtime.sendMessage(message);
	}
});
