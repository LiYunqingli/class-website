

let urlParams_1 = new URLSearchParams(window.location.search); //获取搜索栏的字符串
let username = urlParams_1.get("username");
let xhr_2 = new XMLHttpRequest();
xhr_2.open(
    "GET",
    HOST_URL + "account.php?style=return_account_all&username=" +
    username
);
xhr_2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr_2.send();
xhr_2.onreadystatechange = function () {
    if (xhr_2.readyState === 4 && xhr_2.status === 200) {
        let result_2 = JSON.parse(xhr_2.responseText);
        let account = result_2;
        let name = account.name;
        let photo_path = account.photo_path;

        document.getElementById('userimg').src = photo_path;
        document.getElementById("user_name").innerHTML = name;
        document.getElementById("username").innerHTML = username;
    }
};


var img = document.querySelector('.user_img img');

img.addEventListener('mouseover', function () {
    img.classList.add('rotate'); // 添加旋转样式类
});

img.addEventListener('mouseout', function () {
    img.classList.remove('rotate'); // 移除旋转样式类
});


// 点击关闭按钮，隐藏所有弹窗和黑色div
let closeButtons = document.querySelectorAll('.close');
let elementsToHide = document.querySelectorAll('.overlay_1, .popup');

closeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        elementsToHide.forEach(function (element) {
            element.style.display = 'none';
        });
    });
});


function start_div(id) {
    let div = document.getElementById(id);
    div.style.display = 'block';
    let overlay = document.querySelector('.overlay_1');
    overlay.style.display = 'block';
}


function post(style) {
    if (style == "update_pwd") {
        let old_pwd = document.getElementById("update_pwd_old_pwd").value;
        let new_pwd = document.getElementById("update_pwd_new_pwd").value;
        let two_pwd = document.getElementById("update_pwd_two_pwd").value;
        if (old_pwd == "" || new_pwd == "" || two_pwd == "") {
            alert("三项都不能为空！");
        } else if (new_pwd != two_pwd) {
            alert("两次输入的密码不一致！");
        } else {
            let urlParams_1 = new URLSearchParams(window.location.search); //获取搜索栏的字符串
            let username = urlParams_1.get("username");
            let xhr_2 = new XMLHttpRequest();
            xhr_2.open(
                "GET",
                HOST_URL + "account.php?style=update_password&username=" +
                username +
                "&old_password=" +
                old_pwd +
                "&new_password=" +
                new_pwd,
                true
            );
            xhr_2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr_2.send();
            xhr_2.onreadystatechange = function () {
                if (xhr_2.readyState === 4 && xhr_2.status === 200) {
                    let result_2 = JSON.parse(xhr_2.responseText);
                    console.log(result_2);
                    if (result_2 == "true") {
                        alert("修改密码成功！");
                        // 获取包含 iframe 的父窗口对象
                        var parentWindow = window.parent;

                        parentWindow.location.href = "../login.html";
                    } else if (result_2 == "false") {
                        alert("修改密码失败！");
                    } else if (result_2 == "old password error") {
                        alert("原密码错误！");
                    }
                }
            };
        }
    }
}