chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('window.html', {
        'bounds': {
            'width': 400,
            'height': 500
        }
    });
    aa();
});
function aa(){
    var opt = {
        type: "list",
        title: "桌面提醒",
        message: "msg",
        iconUrl: "icon.png",
        items: [{ title: "1.", message: "下班了"},
                { title: "2.", message: "吃饭了."},
                { title: "3.", message: "中奖了."}]
      }
  chrome.notifications.create('',opt,function(id){
  })
}