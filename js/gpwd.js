function check() {
    var username = document.getElementsByName("username")[0].value;
    var mail = document.getElementsByName("mail")[0].value;
    var yzm = document.getElementsByName("yzm")[0].value;
    if (username == "" || mail == "" || yzm == "") {
        return false;
    }
    return true;
}

function check_username() {
    //检查是否是7位数字
    var username = document.getElementsByName("username")[0].value;
    if (username.length != 7) {
        document.getElementById("username_p").innerHTML = "请输入7位数字的学号";
        return false;
    } else {
        //判断是否全是数字
        for (var i = 0; i < username.length; i++) {
            if (isNaN(username[i])) {
                document.getElementById("username_p").innerHTML = "请输入7位数字的学号";
                return false;
            }
        }
    }
    document.getElementById("username_p").innerHTML = "";
    return true;
}

function check_mail() {
    var mail = document.getElementsByName("mail")[0].value;
    //判断是否是邮箱格式
    var pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!pattern.test(mail)) {
        document.getElementById("mail_p").innerHTML = "请输入正确的邮箱格式";
        return false;
    }
    document.getElementById("mail_p").innerHTML = "";
    return true;
}

function check_yzm() {
    var yzm = document.getElementsByName("yzm")[0].value;
    //判断是否是5位数字
    if (yzm.length != 5) {
        document.getElementById("yzm_p").innerHTML = "请输入5位数字的验证码";
        return false;
    } else {
        for (var i = 0; i < yzm.length; i++) {
            if (isNaN(yzm[i])) {
                document.getElementById("yzm_p").innerHTML = "请输入5位数字的验证码";
                return false;
            }
        }
        document.getElementById("yzm_p").innerHTML = "";
        return true;
    }
}

const url = HOST;
var key = "";
function go() {
    document.getElementById("go").innerHTML = "发送中...";
    if (check_username()) {
        if (check_mail()) {
            var username = document.getElementById("username").value;
            var mail = document.getElementById("mail").value;
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url + "mail/mail.php");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(`username=${username}&mail=${mail}&style=update_password`);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var result = JSON.parse(xhr.responseText);
                    if (result.code == "200") {
                        key = result.data;
                        document.getElementById("yzm_p").innerHTML = "发送成功";
                        document.getElementById("go").innerHTML = "发送成功";
                        set_time();
                    } else {
                        document.getElementById("yzm_p").innerHTML = "发送失败: " + result.msg;
                        document.getElementById("go").innerHTML = "发送验证码";
                    }
                }
            };
        } else {
            document.getElementById("go").innerHTML = "发送验证码";
        }
    } else {
        document.getElementById("go").innerHTML = "发送验证码";
    }

}

function set_time() {
    //禁止点击go按钮
    document.getElementById("go").disabled = true;
    var time = 90;
    var timer = setInterval(function () {
        if (time == 0) {
            clearInterval(timer);
            document.getElementById("go").innerHTML = "发送验证码";
            document.getElementById("yzm_p").innerHTML = "点击按钮重新发送";
            document.getElementById("go").disabled = false;
        } else {
            time--;
            document.getElementById("go").innerHTML = time + "秒后重新发送";
        }
    }, 1000);
}

function start() {

    check();
    check_username();
    check_mail();
    check_yzm()

    if (check() && check_username() && check_mail() && check_yzm()) {
        var yzm = document.getElementById("yzm").value;
        var username = document.getElementById("username").value;
        var mail = document.getElementById("mail").value;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url + "mail/mail-server.php");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`username=${username}&mail=${mail}&style=update_password&yzm=${yzm}&key=${key}`);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);
                if (result.code == "200") {
                    var url = result.data;
                    window.location.href = url;
                    set_time();
                } else {
                    document.getElementById("yzm_p").innerHTML = "发送失败: " + result.msg;
                    document.getElementById("go").innerHTML = "发送验证码";
                }
            }
        };
    }
}