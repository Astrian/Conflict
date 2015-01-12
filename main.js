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
	var feedDelete=createDom("td");

	var deleteListid=createDom("a");
	deleteListid.id="delete-listid-button";
	deleteListid.href="#";

	var glyphicon=createDom("span","glyphicon glyphicon-trash");
	glyphicon.title="删除";
	glyphicon.onclick=glyDel;

	r.appendChild(feedName);
	r.appendChild(feedUrl);
	r.appendChild(feedDelete);
	feedDelete.appendChild(deleteListid);
	deleteListid.appendChild(glyphicon);

	return r;
}

var glyDel=function(){
	var del=createDom("button","btn btn-danger btn-xs","Confirm Delete");
	del.type="button";
	del.onclick=function(){
		var message={
			"action":"delRssSource",
			"name":this.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].nodeValue
		};
		chrome.runtime.sendMessage(message);
	};

	var cancel=createDom("button","btn btn-default  btn-xs","Cancel");
	cancel.type="button";
	cancel.onclick=glyCancel;

	var parent=this.parentNode;
	rmAllChind(parent);
	parent.appendChild(cancel);
	parent.appendChild(del);
}

var glyCancel=function(){
	var parent=this.parentNode;
	rmAllChind(parent);

	var glyphicon=createDom("span","glyphicon glyphicon-trash");
	glyphicon.title="删除";
	glyphicon.onclick=glyDel;

	parent.appendChild(glyphicon);
}

var writeList=function(data){
	var list=document.getElementById("list");
	rssTitleSort(data);
	for(var i=0;i<data.length;i++){
		data[i].pubDate=getDateShow(data[i].pubDate);
		list.appendChild(createList(data[i].title,data[i].name,data[i].pubDate,data[i].author));
	}
}

var getDateShow=function(data){
	var r=new Date(data);
	return r.toUTCString();
}

var rssTitleSort=function(arr){
	var i=arr.length,j;
	var tempExchangVal;
	while(i>0){
		for(j=0;j<i-1;j++){
			if(isDateGT(arr[j+1].pubDate,arr[j].pubDate)){
				tempExchangVal=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=tempExchangVal;
			}
		}
		i--;
	}
	return arr;
}

var isDateGT=function(date1,date2){
	var d1=new Date(date1);
	var d2=new Date(date2);

	if(d1>d2)
		return 1;

	return 0;
}

var addSource=function(){
	var url = document.getElementById("sourceURL").value;
	url=url.slice(url.indexOf("//")+2);
	var message={
		"action":"addRssSource",
		"ip":url.slice(0,url.indexOf("/")),
		"port":"80",
		"file":url.slice(url.indexOf("/")),
		"name":document.getElementById("sourceName").value,
		"class":"test"
	}
	chrome.runtime.sendMessage(message);
}

var lookAllRssSource=function(){
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
	rmAllChind(document.getElementById("list"));
	rmAllChind(document.getElementById("feedManagement"));

	var message={
		"action":"getRssTitleS"
	}
	chrome.runtime.sendMessage(message);

	lookAllRssSource();
}

var rmAllChind=function(obj){
	var child=obj.childNodes;
	while(child.length!=0)
		obj.removeChild(child[0]);
}

var e=function(message, sender, sendResponse){
	if(message.action=="getRssTitleR"){
		writeList(message.data);
	}
	if(message.action=="lookAllRssR"){
		var feed=document.getElementById("feedManagement");
		var data=JSON.parse(message.data.source);
		for(var i in data)
			feed.appendChild(createFeedList(i,"http://"+data[i].ip+data[i].file));
	}
	if(message.action=="cacheOK"){
		updata();
	}
}

chrome.runtime.onMessage.addListener(e);

document.getElementById("message_addsource_submit").onclick=addSource;

updata();

//clearAlllocal();
