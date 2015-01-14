var requestAllRss=function(data){
	for(var x in source){
		source[x].port=parseInt(source[x].port);
		source[x].name=x;
		source[x].xml='';
		createTcp(source[x]);
	}
}

var createTcp=function(obj){
	tcp.create({},function(info){
		obj.id=info.socketId;
		connectRss(obj);
	});
}

var connectRss=function(obj){
	tcp.connect(obj.id, obj.ip, obj.port, function(info){
		var data="GET " + obj.file + " HTTP/1.1\r\nHost: " + obj.ip + "\r\n\r\n";
		tcp.send(obj.id, str2ab(data), function(){});
	});
}

tcp.onReceive.addListener(function(info) {
	for(x in source){
		if(source[x].id==info.socketId)
			source[x].xml=source[x].xml+ab2Utf8(info.data);
	}
});

var resultCounter=0;
tcp.onReceiveError.addListener(function(info){
	if(info.resultCode==-15){
		resultCounter++;
		for(x in source){
			if(source[x].id==info.socketId){
				/*if(source[x].xml.indexOf("HTTP/1.1 200")==-1){
					chrome.runtime.sendMessage({"action":"rssError"});
					return;
				}*/

				var data={};
				data[source[x].name]=source[x].xml;

				local.set(data,function(){});

				tcp.close(info.socketId);

				if(resultCounter==getJSONLength(source)){
					var message={
						'action':'cacheOK'
					}
					resultCounter=0;
					chrome.runtime.sendMessage(message);
				}
				return;
			}
		}
	}
});
