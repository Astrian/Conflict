var local=chrome.storage.local;

var addLocal=function(key,srt){
	local.get(key,function(old){
		var data={};
		if(old[key]=='{}')
			data[key]=srt;
		else
			data[key]=srt.slice(0,-1)+','+old[key].slice(1);;
		console.log(data);
		local.set(data);
	});
}

var clearAlllocal=function(){
	local.clear();
}
