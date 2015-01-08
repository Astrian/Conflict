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
	if(message.action=='clearAlllocal'){
		clearAlllocal();
		local.set({'source':'{}'},function(){});
	}
	if(message.action=='subRss'){
		rmRss('source',message.name,function(){});
	}
	if(message.action=='addRssSource'){
		var data={};
		data[message.name]={
			'ip':message.ip,
			'port':message.port,
			'file':message.file,
			'class':message.class
		}
		addLocal('source',JSON.stringify(data),function(){
			local.get('source',function(data){
				source=JSON.parse(data.source);
				requestAllRss(data);
			});
		});
	}
	if(message.action=='lookAllRss'){
		local.get('source',function(data){
			console.log(JSON.parse(data.source));
		});
	}
}

var loadRssTitle=function(obj,name){
	local.get(name,function(data){
		var i=data[name].indexOf('<rss');
		getRssTitle(data[name].slice(i),obj,name);
	});
}

var getJSONLength=function(JSON){
	var i=0;
	for(var x in JSON){
		i++;
	}
	return i;
}

var data=new Array();
var counter=0;

var getRssTitle=function(xml,obj,name){
	counter++;
	var parser=new DOMParser();
	var xmlDoc=parser.parseFromString(xml,"text/xml");

	var item=xmlDoc.getElementsByTagName("item");
	
	for(var i=0;i<item.length;i++){
		var rssData={
			'title':item[i].getElementsByTagName("title")[0].childNodes[0].nodeValue,
			'link':item[i].getElementsByTagName("link")[0].childNodes[0].nodeValue,
			'pubDate':item[i].getElementsByTagName("pubDate")[0].childNodes[0].nodeValue,
			'name':name,
			'class':obj.class,
			'description':item[i].getElementsByTagName("description")[0].childNodes[0].nodeValue
		}
		data.push(rssData);
	}

	if(counter!=getJSONLength(source))
		return;
	
	var message={
		'action':'getRssTitleR',
		'data':data
	}
	chrome.runtime.sendMessage(message);
}

chrome.runtime.onMessage.addListener(e);
