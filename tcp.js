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
var tcp=function(){
	this._tcp=chrome.sockets.tcp;
	this.id=0;
	this.info={};

	this.create=function(call){
		this._tcp.create(this.info,function(info){
			this.id=info.socketId;
			call(info);
		}.bind(this));
	}.bind(this);
	this.connect=function(ip,port,back){
		this._tcp.connect(this.id,ip,port,back);
	}.bind(this);
	this.send=function(data,back){
		this._tcp.send(this.id,str2ab(data),back);
	}.bind(this);
	this.close=function(back){
		this._tcp.close(this.id,back);
	}.bind(this);
	this.disconnect=function(back){
		this._tcp.disconnect(this.id,back);
	}.bind(this);
}
