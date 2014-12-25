function udp(){
    this.joinGroup = function(address, callback){
        _udp.joinGroup(this.socketId, address, function(code){
            if(code<0){
                this.error(code);
                return false;
            }
            else{
                callback();
            }
        }.bind(this));
    }.bind(this),
    this.leaveGroup = function(address, callback){
        _udp.leaveGroup(this.socketId, address, function(code){
            if(code<0){
                this.error(code);
                return false;
            }
            else{
                callback();
            }
        }.bind(this));
    }.bind(this),
    this.setMilticastTTL = function(ttl, callback){
        _udp.setMulticastTimeToLive(this.socketId, ttl, function(code){
            if(code<0){
                this.error(code);
                return false;
            }
            else{
                callback();
            }
        }.bind(this));
    }.bind(this),
    this.setMilticastLoopback = function(enabled, callback){
        _udp.setMulticastLoopbackMode(this.sockedId, enabled, function(code){
            if(code<0){
                this.error(code);
                return false;
            }
            else{
                callback();
            }
        }.bind(this));
    }.bind(this)
}