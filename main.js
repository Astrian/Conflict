var IP="202.108.22.5";
var PORT=80;

chrome.sockets.tcp.create({}, function(createInfo) {
    chrome.sockets.tcp.connect(createInfo.socketId,IP, PORT, function(){
        var data=str2ab("GET / HTTP/1.1\nHost: www.baidu.com\nConnection: keep-alive\nCache-Control: max-age=0\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\nUser-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36\nDNT: 1\nAccept-Encoding: gzip,deflate,sdch\nAccept-Language: zh-CN,zh;q=0.8\r\n\r\n")
        chrome.sockets.tcp.send(createInfo.socketId, data, function(c){
            console.log(c);
        });
    });
});

chrome.sockets.tcp.onReceive.addListener(function(info) {
    console.log(ab2str(info.data));
});

chrome.sockets.tcp.onReceiveError.addListener(function(info){
    console.log(info);
});

function str2ab(str){
	var buf = new ArrayBuffer(str.length*2);
		bufView = new Uint16Array(buf);
		for(var i=0; i<str.length; i++){
				bufView[i] = str.charCodeAt(i);
		}
		return buf;
}
function ab2str(buf){
		return String.fromCharCode.apply(null, new Uint16Array(buf));
}