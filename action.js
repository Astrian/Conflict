function popupNotification(){       
    document.getElementById("noti").style.top = "90%";
    document.getElementById("noti").style.display = "inherit";
    document.getElementById("noti").style.webkitAnimation = "popNotification 0.15s";     
    document.getElementById("noti").style.opacity = "1"; 
    
}
document.getElementById("closenoti").onclick = closenoti;
function closenoti(){
    document.getElementById("noti").style.opacity = "0";
    document.getElementById("noti").style.webkitAnimation = "closeNotification 0.2s"; 
}
