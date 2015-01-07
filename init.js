var source;

local.get('source',function(data){
	source=JSON.parse(data.source);
});

local.set({'source':'{}'},function(){
	var yym={
		'yym':{
			'ip':'yui-nya.com',
			'port':'80',
			'file':'/feed'
		}
	}
	addLocal('source',JSON.stringify(yym));
});
