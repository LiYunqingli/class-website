//验证是被是否可以登录
var system = {};
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = p == "X11" || p.indexOf("Linux") == 0;
if (system.win || system.mac || system.xll) {
  //如果是电脑跳转到
  console.log("this is conputer");
} else {
  //如果是手机,跳转到
  alert("手机端请使用班级app应用查询");
  //如果是手window.location.href = "./login.html;
}

//验证账号密码
let urlParams = new URLSearchParams(window.location.search); //获取搜索栏的字符串
let username = urlParams.get("username");
let password = urlParams.get("password");
let xhr = new XMLHttpRequest();
xhr.open("POST", HOST_URL_P + "login_second.php");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send(`username=${username}&password=${password}`);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let result = xhr.responseText;
    if (result == "true") {
      console.log("username and password is yes!");
      console.log("yunqingli © 2023");
    } else {
      //登录失败
      alert("用户名或密码错误");
      window.location.href = "./login.html";
    }
  }
};

function expandLeft() {
  //悬停在侧边栏的时候
  document.querySelector(".left").style.width = "20vh";
  document.querySelector(".head img").style.position = "absolute";
  document.querySelector(".head img").style.transform = "translateX(15%)";
  document.querySelector(".head .title").style.display = "block";

  document.querySelector(".icon_div").style.position = "relative";
  document.querySelector(".icon_div").style.transform = "translateX(-4.2vh)";

  var elements = document.querySelectorAll(".jingru img"); //以下三行用来显示箭头
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "block";
  }

  document.querySelector(".main").style.transform = "translateX(20vh)";
}

function collapseLeft() {
  //取消悬停的时候
  document.querySelector(".left").style.width = "10vh";
  document.querySelector(".head img").style.position = "static";
  document.querySelector(".head img").style.transform = "translateX(0)";
  document.querySelector(".head .title").style.display = "none";

  document.querySelector(".icon_div").style.position = "static";
  document.querySelector(".icon_div").style.transform = "translateX(0)";

  var elements = document.querySelectorAll(".jingru img"); //以下三行用来影藏箭头
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }

  document.querySelector(".main").style.transform = "translateX(10vh)";
}

function start(str, username) {
  var iframe = document.getElementById("main");
  if(str != "music"){
    iframe.style.display = "block";
    document.getElementById("music").style.display = "none";
  }
  if (str == "首页") {
    iframe.src = "./html/main.html?username=" + username;
  } else if (str == "德育分") {
    iframe.src = "./html/deyufen.html?username=" + username + "&password=" + password;
  } else if (str == "文件") {
    iframe.src = "./html/file.html?username=" + username + "&password=" + password;
    // alert("作者正在努力开发中。我知道你很急，但是你先别急");
  } else if (str == "关于") {
    iframe.src = "./html/about.html?username=" + username;
  } else if (str == "账户") {
    iframe.src = "./html/account.html?username=" + username;
    // alert("未开发完，预计下周一开发并测试完成");
  } else if (str == "共享") {
    // alert("帖子需要的接口太多例，测试需要一定的时间，正在完善审核系统，不要急~");
    iframe.src = "./html/share.php?username=" + username + "&password=" + password;
  } else if (str == "music") {
    iframe.style.display = "none";
    document.getElementById("music").style.display = "block";
  }
}