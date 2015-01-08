//通知相关
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
    $(".noti").pin();
}

//「关于」弹出框相关
document.getElementById("aboutlink").onclick = popupAbout;
function popupAbout(){
    $('#about').modal();
}

//「源管理」弹出框相关
//打开框
document.getElementById("sourcemanagerlink").onclick = popupSourcemanager;
function popupSourcemanager(){
    $('#sourcemanager').modal();
}
//新增源
document.getElementById("addsourcetrigger").onclick = addsource;
function addsource(){
    document.getElementById("addsourcetrigger").style.display = "none";
    document.getElementById("addsourceurl").style.display = "inherit";
    document.getElementById("addsourcesave").style.display = "inherit";
}
document.getElementById("addsourcesave").onclick = addsourcesave;
function addsourcesave(){
    document.getElementById("addsourcetrigger").style.display = "inherit";
    document.getElementById("addsourceurl").style.display = "none";
    document.getElementById("addsourcesave").style.display = "none";
}

//进入文章详细页
function intoArticle(articleID){ //articleID 为文章 ID
    document.getElementById("articledetil-title").innerHTML = "文章名称，请从 RSS 中抓取";
    document.getElementById("articledetil-content").innerHTML = "文章内容，请从 RSS 中抓取";
    document.getElementById("list").style.display = "none";
    document.getElementById("article-detil").style = "inherit";
    document.getElementById("mainmenu").style.display = "none";
    document.getElementById("backbutton").style.display="inherit"
}

//返回文章列表
function backtolist(){ //articleID 为文章 ID
    document.getElementById("article-detil").style.display = "none";
    document.getElementById("list").style = "inherit";
    document.getElementById("back").style.display = "none";
    document.getElementById("mainmenubutton").style.display="inherit"
}

console.log(chrome.i18n.getMessage("refresh"));