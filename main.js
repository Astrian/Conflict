var cache=function(){
	var message={
		'action':'cache'
	}
	chrome.runtime.sendMessage(message);
}

document.getElementById('tongBu').onclick=cache;

var message={
	'action':'getRssTitleS'
}
chrome.runtime.sendMessage(message);


var e=function(message, sender, sendResponse){
	if(message.action=='getRssTitleR'){
		console.log(message.data);
	}
}

chrome.runtime.onMessage.addListener(e);

var add=function(){
	var message={
		'action':'addRssSource',
		'ip':document.getElementById('ip').value,
		'port':document.getElementById('port').value,
		'file':document.getElementById('file').value,
		'name':document.getElementById('name').value
	}
	chrome.runtime.sendMessage(message);
}

var clearAlllocal=function(){
	var message={
		'action':'clearAlllocal'
	}
	chrome.runtime.sendMessage(message);
}

var lookAllRss=function(){
	var message={
		'action':'lookAllRss'
	}
	chrome.runtime.sendMessage(message);
}

document.getElementById('lookAllRss').onclick=lookAllRss;

document.getElementById('add').onclick=add;

document.getElementById('clearAlllocal').onclick=clearAlllocal;


/*
getRssTitleR
	action
	title
	name
	n
*/
