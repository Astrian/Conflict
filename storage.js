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