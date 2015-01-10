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

var write=function(txt){
	var list=document.getElementById("list");
	for(var i in txt)
		list.appendChild(createList(txt[i][0],txt[i][1],txt[i][2],txt[i][3]));
}

testData=[
	["a1","s1","t1","a1"],
	["a2","s2","t2","a2"]
]

write(testData);

document.getElementById("feedManagement").appendChild(createFeedList("123","456"));
