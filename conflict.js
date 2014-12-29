chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.htm', {
        id:"Conflict",
        'bounds': {
            'width': 1200,
            'height': 800
        }
    });
});