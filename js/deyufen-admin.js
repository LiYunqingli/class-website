let urlParams_1 = new URLSearchParams(window.location.search); //获取搜索栏的字符串
let username = urlParams_1.get("username");
let password = urlParams_1.get("password");

let xhr_6 = new XMLHttpRequest();
xhr_6.open(
    "GET",
    HOST_URL_P + "login-admin.php?username=" + username + "&password=" + password
);
xhr_6.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr_6.send();
xhr_6.onreadystatechange = function () {
    if (xhr_6.readyState === 4 && xhr_6.status === 200) {
        var data = xhr_6.responseText;
        if (data == "true") {
            console.log("管理员");
        } else {
            console.log("非管理员");
            window.location.href = "./deyufen.html?username=" + username + "&password=" + password;
        }
    }
}

let xhr = new XMLHttpRequest();
xhr.open(
    "POST",
    HOST_URL + "search_account.php?search_str="
);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var usernames = JSON.parse(xhr.responseText);
        var shuchu = "";
        var option = "";
        for (let i = 0; i < usernames.length; i++) {
            var data = usernames[i];
            shuchu += `
            <div class="user" onclick="start('${data.username}')">
            <div class="user_img_div">
                <img src="${data.qqnum}" class="user_img">
            </div>
            <div class="user_name_username">
                <div class="user_name">${data.name} ${data.gender}</div>
                <div class="user_username">账户：${data.username}</div>
            </div>
            <div class="user_score">
                ${data.total_score}
            </div>
        </div>
            `;
            option += `
                <option value="${data.username}">${data.username}</option>
                `;
        }
        document.querySelector(".left").innerHTML = shuchu;
        document.querySelector(".insert #username").innerHTML = option;
    }
}


function start(username) {
    // console.log(username);
    deyufen_list(username);
}

function deyufen_list(username) {
    //获取分数列表
    let xhr_1 = new XMLHttpRequest();
    xhr_1.open(
        "POST",
        HOST_URL + "return_deyufen_all.php?username=" + username
    );
    xhr_1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_1.send();
    xhr_1.onreadystatechange = function () {
        if (xhr_1.readyState === 4 && xhr_1.status === 200) {
            var deyufen = JSON.parse(xhr_1.responseText);
            // console.log(deyufen);
            var shuchu = `<h4>${username}</h4>
                <button onclick="start_insert()">插入数据</button>
        <table>
            <tr>
                <th>序号</th>
                <th>数据ID</th>
                <th>分数</th>
                <th>详情</th>
                <th>类型</th>
                <th>时间</th>
                <th>管理员</th>
            </tr>`;
            for (var i = 0; i < deyufen.length; i++) {
                var data = deyufen[i];
                shuchu += `
            <tr>
                <td>${data.number}</td>
                <td>未完善</td>
                <td>${data.score}</td>
                <td>${data.details}</td>
                <td>${data.style}</td>
                <td>${data.date}</td>
                <td>root-2210909</td>
            </tr>`;
            }
            shuchu += `</table>`;
            document.querySelector('.right').innerHTML = shuchu;
        }
    }
}


function start_insert() {
    document.querySelector('.insert').style.display = 'block';
    document.querySelector('#overlay').style.display = 'block';

    var user_id = document.querySelector('.right h4').innerHTML;
    document.querySelector('#username').value = user_id;

}

function stop_insert() {
    document.querySelector('.insert').style.display = 'none';
    document.querySelector('#overlay').style.display = 'none';
}

function tijiao() {
    var user_username = document.querySelector('#username').value;
    var user_score = document.querySelector('#score').value;
    var user_detail = document.querySelector('#detail').value;
    var user_style = document.querySelector('#style').value;
    var user_date = document.querySelector('#date').value;
    //如何任意一个为空返回false
    if (user_username == '' || user_score == '' || user_detail == '' || user_style == '' || user_date == '') {
        alert('请填写完整，每一项都要');
    }else{
        tijiao_ok();
    }
}

function tijiao_ok() {

    
    var user_score = document.querySelector('#score').value;
    var user_detail = document.querySelector('#detail').value;
    var user_style = document.querySelector('#style').value;
    var user_date = document.querySelector('#date').value;
    // PILIANG_T_F
    if(PILIANG_T_F == "false"){
        var user_username = document.querySelector('#username').value;
    }else{
        var user_username = document.querySelector('input[name="ed_username"]:checked').value;
    }
    console.log(user_username);

    var request_1 = new XMLHttpRequest();
    request_1.open('POST', HOST_URL + 'insert_deyufen.php');
    request_1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request_1.onreadystatechange = function () {
        if (request_1.readyState === 4 && request_1.status === 200) {
            alert(request_1.responseText);
            location.reload();
        }
    };
    var aaa =`panduan=${PILIANG_T_F}` + `&score=${user_score}` + `&detail=${user_detail}` + `&date=${user_date}` + `&username=${user_username}` + `&style=${user_style}` + `&username_admin=${username}` + `&password=${password}`;
    request_1.send(aaa);

}
//按照成绩排序
function paixu() {
    var users = document.getElementsByClassName("user");
    var arr = [];
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var score = Number(user.querySelector('.user_score').innerHTML);
        // console.log(score);
        arr.push({
            score: score,
            user: user
        });
    }

    arr.sort(function (a, b) {
        return b.score - a.score;
    });
    var paixu_html = "";
    for (var i = 0; i < arr.length; i++) {
        paixu_html += arr[i].user.outerHTML;
    }
    document.querySelector(".left").innerHTML = paixu_html;
    // console.log(arr);
}

//此变量默认为false（用来判断是否执行批量插入数据模式）
var PILIANG_T_F = "false";
//

function amns(){
    //方法实现插入数据
    if(PILIANG_T_F == "false"){
        piliang();
    }else if(PILIANG_T_F == "true"){
        unpiliang();
    }else{
        console.log("error");
        alert("error，未知错误，建议刷新解决一切，若还是如此请联系开发者或自行查看js解决");
    }
}

function piliang(){
    document.getElementById("label_for_username").innerHTML = "批量插入数据：";
    document.getElementById("username").style.display = "none";
    document.getElementById("checkbox_for_username").style.display = "block";
    PILIANG_T_F = "true";
    console.log("piliang");
}

function unpiliang(){
    document.getElementById("label_for_username").innerHTML = "学号：";
    document.getElementById("username").style.display = "block";
    document.getElementById("checkbox_for_username").style.display = "none";
    PILIANG_T_F = "false";
    console.log("unpiliang");
}