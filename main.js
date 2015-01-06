var getRssS=function(){
	var message={
		action:'getRssS',
		ip:'yui-nya.com',
		port:80,
		file:'/feed'
	}
	chrome.runtime.sendMessage(message);
}

document.getElementById('test').onclick=getRssS;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	if(message.action=='getRssR'){
		console.log(message);
		//document.getElementById('link1').innerHTML=message.rss[0];
	}
});
