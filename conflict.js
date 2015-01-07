chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.htm', {
        id:"Conflict",
        'bounds': {
            'width': 1200,
            'height': 800
        }
    });
});

var e=function(message,sender,sendResponse){
	if(message.action=='cache'){
		local.get('source',function(data){
			requestAllRss(data);
		});
	}
	if(message.action=='getRssTitleS'){
		for(var x in source){
			loadRssTitle(source[x],x);
		}
	}
}

var loadRssTitle=function(data,x){
	local.get(x,function(data){
		var i=data[x].indexOf('<rss');
		getRssTitle(data[x].slice(i));
	});
}

var getRssTitle=function(data){
	var parser=new DOMParser();
	var xmlDoc=parser.parseFromString(data,"text/xml");

	var title=xmlDoc.getElementsByTagName("title");
	console.log(title);

	/*for(var i=2;i<title.length;i++){
		var message={
			'action':'getRssTitleR',
			'data':title[i].childNodes[0].nodeValue,
			'time':i-2;
		}
		chrome.runtime.sendMessage(message);
	}*/
}

//clearAlllocal();

chrome.runtime.onMessage.addListener(e);

/*var requestAllRss=function(data){
	source=JSON.parse(data.source);
	for(var x in source){
		source[x].port=parseInt(source[x].port);
		source[x].name=x;
		source[x].xml='';
		createTcp(source[x]);
	}
}*/

/*
	var message={
					'action':'getRssTitleR',
					'data':data
				}
*/
