var IP='bangumi.tv';
var PORT=80;
var rss=new String();
var parser=new DOMParser();
var file='/feed/blog/anime';

chrome.sockets.tcp.create({}, function(createInfo) {
		chrome.sockets.tcp.connect(createInfo.socketId,IP, PORT, function(){
				var data="GET " + file + " HTTP/1.1\r\nHost: " + IP + "\r\n\r\n";
				chrome.sockets.tcp.send(createInfo.socketId, str2ab(data), function(c){});
		});
});

chrome.sockets.tcp.onReceive.addListener(function(info) {
		rss=rss+ab2Utf8(info.data);
});

chrome.sockets.tcp.onReceiveError.addListener(function(info){
		console.log(info);
		var i = rss.indexOf("<rss");
		rss=rss.slice(i);
		
		if(info.resultCode==-15){
            xmlDoc=parser.parseFromString(rss,"text/xml");

            document.getElementById("link1").innerHTML=xmlDoc.getElementsByTagName("item")[0].children[0].textContent;
            document.getElementById("link2").innerHTML=xmlDoc.getElementsByTagName("item")[1].children[0].textContent;
            document.getElementById("link3").innerHTML=xmlDoc.getElementsByTagName("item")[2].children[0].textContent;
		}
});

function str2ab(str){//要转换的字符串不能有中文
	var buf = new ArrayBuffer(str.length+1);
	bufView = new Uint8Array(buf);
	for(var i=0;i<str.length;i++){
			bufView[i] = str.charCodeAt(i);
	}
	return buf;
}
function ab2Utf8(buf){
	var i = 0;
	var pos = 0;
	var str ="";
	var unicode = 0;
	var flag = 0;
	var bufView = new Uint8Array(buf);
	for (pos = 0; pos < bufView.length;){
		flag= bufView[pos];
		if ((flag >>>7) === 0 ) {
			str+= String.fromCharCode(bufView[pos]);
			pos += 1;
			
		}
		else if ((flag &0xFC) === 0xFC ){
			unicode = (bufView[pos] & 0x3) << 30;
			unicode |= (bufView[pos+1] & 0x3F) << 24;
			unicode |= (bufView[pos+2] & 0x3F) << 18;
			unicode |= (bufView[pos+3] & 0x3F) << 12;
			unicode |= (bufView[pos+4] & 0x3F) << 6;
			unicode |= (bufView[pos+5] & 0x3F);
			str+= String.fromCharCode(unicode);
			pos += 6;
			
		}else if ((flag &0xF8) === 0xF8 ){
			unicode = (bufView[pos] & 0x7) << 24;
			unicode |= (bufView[pos+1] & 0x3F) << 18;
			unicode |= (bufView[pos+2] & 0x3F) << 12;
			unicode |= (bufView[pos+3] & 0x3F) << 6;
			unicode |= (bufView[pos+4] & 0x3F);
			str+= String.fromCharCode(unicode);
			pos += 5;
			
		}
		else if ((flag &0xF0) === 0xF0 ){
			unicode = (bufView[pos] & 0xF) << 18;
			unicode |= (bufView[pos+1] & 0x3F) << 12;
			unicode |= (bufView[pos+2] & 0x3F) << 6;
			unicode |= (bufView[pos+3] & 0x3F);
			str+= String.fromCharCode(unicode);
			pos += 4;
			
		}
		
		else if ((flag &0xE0) === 0xE0 ){
			unicode = (bufView[pos] & 0x1F) << 12;;
			unicode |= (bufView[pos+1] & 0x3F) << 6;
			unicode |= (bufView[pos+2] & 0x3F);
			str+= String.fromCharCode(unicode);
			pos += 3;
			
		}
		else if ((flag &0xC0) === 0xC0 ){ //110
			unicode = (bufView[pos] & 0x3F) << 6;
			unicode |= (bufView[pos+1] & 0x3F);
			str+= String.fromCharCode(unicode);
			pos += 2;
			
		}
		else{
			str+= String.fromCharCode(bufView[pos]);
			pos += 1;
		}
	}
	return str;
}

function saveData (key,data) {
    chrome.storage.sync.set({key: data}, function() {});
}
function loadData (key) {
    var data;
    chrome.storage.sync.get(data, function(valueArray) {
            data=valueArray;
    });
    return data;
}
function clearData(){
    chrome.storage.sync.clear({key: data}, function() {});
}
