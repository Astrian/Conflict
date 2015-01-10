var local=chrome.storage.local;

var addLocal=function(key,srt,back){
	local.get(key,function(old){
		var data={};
		if(old[key]=='{}')
			data[key]=srt;
		else
			data[key]=srt.slice(0,-1)+','+old[key].slice(1);
		local.set(data,back);
	});
}

var clearAlllocal=function(){
	local.clear();
}

var rmRss=function(key,srt,back){
	local.get(key,function(old){
		var data={};
		json=JSON.parse(old[key]);
		delete json[srt];
		data[key]=JSON.stringify(json);
		local.set(data,back);
	});
}
