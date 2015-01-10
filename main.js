var createDom=function(domName,domClass,domHtml){
	if(arguments.length<2)
		var domClass="";
	if(arguments.length<3)
		var domHtml="";
	var r=document.createElement(domName);
	r.className=domClass;
	r.innerHTML=domHtml;
	return r;
}
var createList=function(title,source,time,author){
	var r=createDom("div","card card-head");
	var c=createDom("div","cardcontent");
	var list=createDom("h3","list-title",title);

	var small=createDom("small");

	var span1=createDom("span","list-source",source);
	var span2=createDom("span","list-time",time);
	var span3=createDom("span","author",author);

	r.appendChild(c);
	c.appendChild(list);
	c.appendChild(small);
	small.appendChild(span1);
	small.innerHTML=small.innerHTML+("&#8226");
	small.appendChild(span2);
	small.innerHTML=small.innerHTML+("&#8226");
	small.appendChild(span3);

	return r;
}

var createFeedList=function(name,url){
	var r=createDom("tr");

	var feedName=createDom("td","feed-name",name);
	var feedUrl=createDom("td","feed-url",url);
	var feedOptions=createDom("td","feed-options");

	var options=createDom("span","glyphicon glyphicon-pencil");
	var del=createDom("span","glyphicon glyphicon-trash");

	options.title="编辑";
	del.title="删除";

	r.appendChild(feedName);
	r.appendChild(feedUrl);
	r.appendChild(feedOptions);
	feedOptions.appendChild(options);
	feedOptions.innerHTML=feedOptions.innerHTML+" ";
	feedOptions.appendChild(del);

	return r;
}

var write=function(data){
	var list=document.getElementById("list");
	for(var i=0;i<data.length;i++)
		list.appendChild(createList(data[i].title,data[i].name,data[i].pubDate,data[i].author));
}

var add=function(){
	var url = document.getElementById("addSourceUrl").value;
	url=url.slice(url.indexOf("//")+2);
	var message={
		"action":"addRssSource",
		"ip":url.slice(0,url.indexOf("/")),
		"port":"80",
		"file":url.slice(url.indexOf("/")),
		"name":"test",
		"class":"test"
	}
	chrome.runtime.sendMessage(message);
}

var lookAllRss=function(){
	var message={
		"action":"lookAllRssS"
	}
	chrome.runtime.sendMessage(message);
}

var clearAlllocal=function(){
	var message={
		'action':'clearAlllocal'
	}
	chrome.runtime.sendMessage(message);
}

var updata=function(){
	var message={
		"action":"getRssTitleS"
	}
	chrome.runtime.sendMessage(message);

	lookAllRss();
}

var e=function(message, sender, sendResponse){
	if(message.action=="getRssTitleR"){
		write(message.data);
	}
	if(message.action=="lookAllRssR"){
		var feed=document.getElementById("feedManagement");
		var data=JSON.parse(message.data.source);
		for(var i in data)
			feed.appendChild(createFeedList(i,"http://"+data[i].ip+data[i].file));
	}
	if(message.action=="cacheOK")
		updata();
}

chrome.runtime.onMessage.addListener(e);

document.getElementById("message_add").onclick=add;

updata();

//clearAlllocal();
