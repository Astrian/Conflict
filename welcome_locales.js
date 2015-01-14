document.getElementById("message_hello").innerHTML = chrome.i18n.getMessage("initGuide_Hello");
document.getElementById("message_welcome").innerHTML = chrome.i18n.getMessage("initGuide_welcome");
document.getElementById("message_description").innerHTML = chrome.i18n.getMessage("initGuide_description");
document.getElementById("message_whatsyourname").innerHTML = chrome.i18n.getMessage("whatsyourname");
document.getElementById("message_continue").innerHTML = chrome.i18n.getMessage("initGuide_continue");
document.getElementById("message_continue").onclick=function() {
	var message={
		"action":"start",
		"name":document.getElementById("nickname").value,
	}

	if(message.name=="")
		return;

	chrome.app.window.current().close();

	chrome.runtime.sendMessage(message);
}