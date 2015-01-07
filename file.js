var local=chrome.storage.local;

var addSync=function(key,srt){
	sync.get(key,function(old){
		var data={};
		data[key]=srt.slice(0,-1)+','+old[key].slice(1);;
		console.log(data);
		sync.set(data);
	});
}

var clearAllSync=function(){
	sync.clear();
}
