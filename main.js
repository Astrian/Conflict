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


/*
getRssTitleR
	action
	title
	name
	n
*/
