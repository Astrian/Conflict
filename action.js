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
//点击了某一项删除
document.getElementById("delete-listid-button").onclick = confirmDelete;
function confirmDelete(){
    document.getElementById("delete-listid").innerHTML = '<button type="button" class="btn btn-danger btn-xs">Confirm Delete</button> <button type="button" class="btn btn-default  btn-xs" id="canceldelete">Cancel</button>';
    document.getElementById("canceldelete").onclick = cancelDelete;
}
//从删除返回
function cancelDelete(){
    document.getElementById("delete-listid").innerHTML = '<a href="#" id="delete-listid-button" onclick="confirmDelete"><span class="glyphicon glyphicon-trash" title="删除"></span></a>';
    document.getElementById("delete-listid-button").onclick = confirmDelete;
}
//新增源界面进入
document.getElementById("addAtomSourceLink").onclick = goToAddAtomSource;
function goToAddAtomSource(){
    document.getElementById("atomList").style.display = "none";
    document.getElementById("sourcemanager_footerbutton").style.display = "none";
    document.getElementById("add_detil").style.display = "inherit";
}
//新增源界面退出
document.getElementById("addsource_back").onclick = goToAtomSourceList;
function goToAtomSourceList(){
    document.getElementById("atomList").style.display = "inherit";
    document.getElementById("sourcemanager_footerbutton").style.display = "inherit";
    document.getElementById("add_detil").style.display = "none";
}
//正在处理
document.getElementById("addsource_submit").onclick = submitting;
function submitting(){
    document.getElementById("addsource_form").disabled = true;
}

//偏好设置弹出框相关
//打开框
document.getElementById("preferenceLink").onclick = popupPreference;
function popupPreference(){
    $('#preferencemodal').modal();
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
