let urlParams_1 = new URLSearchParams(window.location.search); //获取搜索栏的字符串
let username = urlParams_1.get("username");
let password = urlParams_1.get("password");
let xhr_2 = new XMLHttpRequest();
xhr_2.open(
    "POST",
    HOST_URL + "account.php?style=return_account_all&username=" + username
);
xhr_2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr_2.send();
xhr_2.onreadystatechange = function () {
    if (xhr_2.readyState === 4 && xhr_2.status === 200) {
        let result_2 = JSON.parse(xhr_2.responseText);
        if(result_2.code != "200"){
            console.log("deyufen_account_error code:" + result_2.code);
        }
        let account = result_2;
        let name = account.name;
        let total_score = account.total_score;
        document.querySelector("#tit_p").innerHTML =
            "Hi, " + name + ", 你的德育分看起来怎么样？";
        document.querySelector("#total_score").innerHTML = total_score;
        let score = total_score;
        if (score >= 85) {
            document.querySelector("#smile").innerHTML = "😃";
        } else if (score >= 75) {
            document.querySelector("#smile").innerHTML = "😁";
        } else if (score >= 60) {
            document.querySelector("#smile").innerHTML = "😐";
        } else {
            document.querySelector("#smile").innerHTML = "😢";
        }
    }
};

let xhr_3 = new XMLHttpRequest();
xhr_3.open(
    "POST",
    HOST_URL + "return_deyufen_all.php?username=" + username
);
xhr_3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr_3.send();
xhr_3.onreadystatechange = function () {
    if (xhr_3.readyState === 4 && xhr_3.status === 200) {
        let result_3 = JSON.parse(xhr_3.responseText);
        let length = result_3.length;
        document.querySelector("#count_score").innerHTML = length;
    }
};

function fetchUserData(username) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let obj = JSON.parse(xhr.responseText);
                console.log(obj);
                // 初始化两个空数组用于存放键和值
                let keys = [];
                let values = [];

                // 遍历对象中的所有键值对
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        // 确保key是obj自身的属性，而不是原型链上的
                        keys.push(key + "周"); // 将键放入keys数组
                        values.push(obj[key]); // 将值放入values数组
                    }
                }

                console.log(keys); // 输出键的数组
                console.log(values); // 输出值的数组

                const data = {
                    labels: keys,
                    datasets: [{
                        label: "德育分",
                        data: values,
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "#fff",
                        tension: 0.1,
                    }, ],
                };

                const config = {
                    type: "line",
                    data: data,
                    options: {},
                };
                const chartElement = document.getElementById("myChart");
                new Chart(chartElement, config);
            } else {}
        }
    };
    xhr.open(
        "GET",
        HOST_URL_P + "return_deyufen_total_list.php?username=" + username,
        true
    );
    xhr.send();
}
fetchUserData(username);


function showInput() {
    document.getElementById("text").style.display = "none";
    document.getElementById("input").style.display = "inline-block";
    document.querySelector(".right_table_row2_left_div").style.border = "0";
    document.querySelector(".right_table_row2_right_div").style.display =
        "none";
}

function hideInput() {
    document.getElementById("text").style.display = "inline-block";
    document.getElementById("input").style.display = "none";
    document.querySelector(".right_table_row2_left_div").style.borderRight =
        "0.1vh solid #000";
    document.querySelector(".right_table_row2_right_div").style.display =
        "block";
}


//德育分列表
function deyufen_list(_username) {
    let xhr = new XMLHttpRequest();
    xhr.open(
        "POST",
        HOST_URL + "return_deyufen_all.php?username=" +
        _username
    );
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            if (result.username == _username) {
                let html = "<p style='text-align:center;'>无数据</p>";
                console.log("no fdsa");
                document.getElementById("deyufen_list").innerHTML = html;
                stop_load();
            } else {
                let html = "";
                if (_username != username) {
                    html = `<div style="width:100%;height:5vh;border-radius: 1vh;text-align:center;background-color:#e2e1e1d1;line-height: 5vh;position: relative;top: 1vh;">${_username}</div>`;
                }
                for (let i = result.length; i > 0; i--) {
                    let data = result[i - 1];
                    html += `<div class="score_tip">
                        <p class="no">
                          No.${data.number}
                        </p>
                        <p class="two">
                          <span class="score">${data.score}</span>
                          <span class="details">${data.details}</span>
                        </p>
                        <div class="date">
                          ${data.date}
                        </div>
                      </div>`;
                }
                document.getElementById("deyufen_list").innerHTML = html;
                stop_load();
            }
        }
    };
}
deyufen_list(username);


//查询后点击卡片之后的内容
function search_detail(__username, search_str) {
    start_load();
    deyufen_list(__username)
}

function search(str) {
    start_load();
    let input = str;
    let xhr = new XMLHttpRequest();
    xhr.open(
        "POST",
        HOST_URL + "search_account.php?search_str=" +
        input
    );
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            let html = "";
            for (let i = 0; i < result.length; i++) {
                let data = result[i];
                html += `<div class="score_tip" ondblclick="search_detail('${data.username}','${str}')">
                        <div class="search">
                          <div class="search_img_div">
                            <img src="${data.qqnum}" class="search_img">
                          </div>
                          <div class="search_name_username">
                            <div class="search_name">${data.name} ${data.gender}</div>
                            <div class="search_username">账户：${data.username}</div>
                          </div>
                          <div class="search_score">
                            ${data.total_score}
                          </div>
                        </div>
                      </div>`;
            }
            document.getElementById("deyufen_list").innerHTML = html;
            document.getElementById("sousuo").style.display = "none";
            document.getElementById("quanban").style.display = "none";
            document.getElementById("return").style.display = "block";

            stop_load();
        }
    };
}

function _return() {
    start_load();
    document.getElementById("sousuo").style.display = "table-cell";
    document.getElementById("quanban").style.display = "table-cell";
    document.getElementById("return").style.display = "none";
    document.getElementById("input").value = "";
    deyufen_list(username);
}

const input = document.getElementById("input");
// 绑定键盘回车事件
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        let input = document.getElementById("input").value;
        search(input);
    }
});

let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    HOST_URL_P + "login-admin.php?username=" + username + "&password=" + password
  );
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = xhr.responseText;
      if(data == "true"){
        var btn = document.createElement("button");
        btn.setAttribute("onclick","window.location.href='./deyufen-admin.html?username="+username+"&password="+password + "'");
        btn.innerHTML = "进入管理员界面";
        document.body.appendChild(btn);
      }else{
        console.log("非管理员");
      }
    }
  }