var createDom=function(nameX,classX,innerHTMLX){
	if(arguments.length<2)
		var classX="";
	if(arguments.length<3)
		var innerHTMLX="";
	var R=document.createElement(nameX);
	R.className=classX;
	R.innerHTML=innerHTMLX;
	return R;
}
var createList=function(title,source,time,author){
	var R=createDom("div","card card-head");
	var c=createDom("div","cardcontent");
	var list=createDom("h3","list-title",title);

	var small=createDom("small");

	var span1=createDom("span","list-source",source);
	var span2=createDom("span","list-time",time);
	var span3=createDom("span","author",author);

	R.appendChild(c);
	c.appendChild(list);
	c.appendChild(small);
	small.appendChild(span1);
	small.innerHTML=small.innerHTML+("&#8226");
	small.appendChild(span2);
	small.innerHTML=small.innerHTML+("&#8226");
	small.appendChild(span3);

	return R;
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
