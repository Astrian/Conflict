chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        id:"Conflict",
        'bounds': {
            'width': 1200,
            'height': 800
        }
    });
});