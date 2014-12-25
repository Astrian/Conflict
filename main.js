var socketId;

// 处理 onReceive 事件。
var onReceive = function(info) {
  if (info.socketId !== socketId)
    return;
  console.log(info.data);
};

// 创建套接字
chrome.sockets.udp.create({}, function(socketInfo) {
  socketId = socketInfo.socketId;
  // 设置事件处理程序并绑定套接字。
  chrome.sockets.udp.onReceive.addListener(onReceive);
  chrome.sockets.udp.bind(socketId,
    "0.0.0.0", 0, function(result) {
      if (result < 0) {
        console.log("无法绑定套接字。");
        return;
      }
      var arrayBuffer = str2ab("123456789");
      chrome.sockets.udp.send(socketId, arrayBuffer,
        '127.0.0.1', 8888, function(sendInfo) {
          console.log("已发送 " + sendInfo.bytesSent + " 字节");
      });
  });
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