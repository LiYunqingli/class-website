function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", HOST_URL + "login.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`username=${username}&password=${password}`);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let result = xhr.responseText;
      if (result == "true") {
        //登录成功
        window.location.href = `index.html?username=${username}&password=${password}`;
      } else {
        //登录失败
        alert("用户名或密码错误");
        document.getElementById("password").value = "";
      }
    }
  };
}

//监听键盘事件
document.addEventListener("DOMContentLoaded", function () {
  var usernameInput = document.getElementById("username");
  var passwordInput = document.getElementById("password");
  usernameInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      passwordInput.focus();
    }
  });
  passwordInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      login();
    }
  });
});