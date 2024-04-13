var PATH = "/";
var pathStack = [];
let element_id = "";

// 回退到上一级目录的函数
function goBack() {
    if (pathStack.length > 0) {
        start_load1();
        pathStack.pop();
        updatePath();
        getFileList(PATH);
        stop_load1();
    } else {
        console.log("已经在根目录，无法再回退。");
    }
}

// 刷新当前目录下的文件列表的函数
function refreshFileList() {
    start_load1();
    getFileList(PATH);
    stop_load1();
}


// 更新PATH和PATH_HTML变量的函数
function updatePath() {
    PATH = "/" + pathStack.join("/") + (pathStack.length > 0 ? "/" : "");
    PATH_HTML = `<div>root : /</div>` + pathStack.map(function (name) {
        return `<div>${name}</div>`;
    }).join("");
}

// 获取文件列表并更新视图的函数
function getFileList(path, name) {
    start_load1();
    if (name) {
        pathStack.push(name);
    } else if (pathStack.length > 0) {
        // pathStack.pop();
    }

    updatePath();

    let xhr = new XMLHttpRequest();
    let params = new URLSearchParams({
        username: username,
        password: password,
        path: PATH
    });

    xhr.open("POST", HOST_FILE_URL + `user_file.php?${params.toString()}`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            var output = "<ul>";
            for (let i = 0; i < result.length; i++) {
                var value = result[i];
                if (value.type == "Folder") {
                    output += `<li id="${"_" + i}" class="content-area">
                    <span class="style" title="文件夹">📁</span>
                    <div class="list_name" title="${value.name}" onclick="getFileList('${PATH}','${value.name}')">
                        ${value.name}
                    </div>
                    <div class="size" title="大小">${value.size}</div>
                    <div class="time" title="最后一次修改时间">${value.time}</div>
                    </li>`;
                } else if (value.type == "File") {
                    output += `<li id="${"_" + i}" class="content-area">
                    <span class="style" title="文件">📄</span>
                    <div class="list_name" title="${value.name}">
                        ${value.name}
                    </div>
                    <div class="size" title="大小">${value.size}</div>
                    <div class="time" title="最后一次修改时间">${value.time}</div>
                    </li>`;
                }
            }
            output += "</ul>";
            document.getElementById("list").innerHTML = output;
            document.getElementById("url").innerHTML = PATH_HTML;
            icon();
            bangdin();
            stop_load1();
        }
    };
}

// 获取URL参数中的username和password
let username = new URLSearchParams(window.location.search).get("username");
let password = new URLSearchParams(window.location.search).get("password");

// 初始化文件列表
getFileList(PATH, '');

function start_load1() {
    // var loader = document.getElementById("loader1");
    // var overlay = document.getElementById("overlay1");
    // loader.style.display = "block";
    // overlay.style.display = "block";
}

function stop_load1() {
    var loader = document.getElementById("loader1");
    var overlay = document.getElementById("overlay1");

    loader.style.display = "none";
    overlay.style.display = "none";
}

function bangdin() {
    var customMenu = document.getElementById("custom-menu");
    document.querySelectorAll(".content-area").forEach(function (element) {
        element.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            // 使用 closest 方法来获取最外层 li 元素的引用
            var liParent = e.target.closest('li');
            // 检查我们是否找到了 li 元素并且该元素有一个 ID
            if (liParent && liParent.id) {
                var elementId = liParent.id;
                showMenu(e.pageX, e.pageY, elementId);
            } else {
                showMenu(e.pageX, e.pageY, "main_id")
            }
        });
    });

    function showMenu(x, y, id) {
        element_id = id;
        console.log("element id = " + element_id)
        console.log("SET Element ID:", element_id);
        customMenu.style.left = x + "px";
        customMenu.style.top = y + "px";
        customMenu.style.display = "block";
        customMenu.style.opacity = "1";
    }

    function hideMenu() {
        customMenu.style.opacity = "0";
        setTimeout(() => {
            customMenu.style.display = "none";
        }, 250);
    }

    document.addEventListener("click", function (event) {
        if (!customMenu.contains(event.target)) {
            hideMenu();
        }
    });

    customMenu.addEventListener("click", function (e) {
        e.stopPropagation();
    });

    document.addEventListener("click", function () {
        hideMenu();
    });

    customMenu.addEventListener("click", function (e) {
        e.stopPropagation();
    });
}

function hideMenu() {
    var customMenu = document.getElementById("custom-menu");
    customMenu.style.opacity = "0";
    setTimeout(() => {
        customMenu.style.display = "none";
    }, 250);
}

function right_start() {
    console.log("right_start");
    console.log(element_id);
    if (element_id == "main_id") {
        start_qp("无效的打开操作");
        hideMenu();
        return;
    }
    var title = document.querySelector("#" + element_id.replace(/\./g, "\\.") + " .style").title;
    if (title != "文件夹") {
        start_qp("文件在线编辑器还在完善开发者，您暂时无法在线预览文件");
        hideMenu();
        return;
    }
    var element = document.querySelector("#" + element_id + " .list_name");
    var onclickValue = element.getAttribute("onclick");
    // 使用正则表达式匹配函数中的参数
    var regex = /getFileList\('([^']*)','([^']*)'\)/;
    var matches = onclickValue.match(regex);

    // 如果匹配成功，matches[1]和matches[2]将包含两个参数值
    if (matches) {
        var pathArg = matches[1];
        var nameArg = matches[2];

        // 输出匹配结果
        console.log("Path argument:", pathArg);
        console.log("Name argument:", nameArg);
        getFileList(pathArg, nameArg);
    }
    hideMenu();
}

//右键菜单

//剪切
var SHEAR_PATH_A = "";

function right_shear() {
    console.log("right_shear");
    // var title = document.getElementById(element_id).querySelector('.list_name').title;
    // SHEAR_PATH_A = PATH + title;
    // console.log("shear path :" + SHEAR_PATH_A)
    start_qp("剪切功能存在严重bug，将会导致服务器严重过载（死循环复制文件），您暂时只能通过复制，然后执行删除操作完成模拟剪切操作，十分抱歉");
    hideMenu();
}
var PATH_COPY_A = "";

function right_copy() {
    console.log("right_copy");
    console.log(element_id);
    if (element_id == "main_id") {
        start_qp("无效的复制操作");
        hideMenu();
        return;
    }
    var title = document.getElementById(element_id).querySelector('.list_name').title;
    PATH_COPY_A = PATH + title;
    console.log("copy path : " + PATH_COPY_A)
    hideMenu();
}

function right_paste() {
    //粘贴
    console.log("right_paste");
    console.log("A path = " + PATH_COPY_A);
    if (PATH_COPY_A != "") {
        // 提示用户点击确认将覆盖文件（如果文件存在的话）
        // var confirmPaste = confirm("确认将覆盖文件（如果文件存在的话）？");
        // if (confirmPaste) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", HOST_FILE_URL + `paste.php?id=${username}&A=${encodeURIComponent(PATH_COPY_A)}&B=${encodeURIComponent(PATH)}`, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText === "true") {
                    start_qp("操作成功！");
                    PATH_COPY_A = "";
                    refreshFileList();
                } else {
                    start_qp("操作失败！请检查文件结构是否能够复制（ps1:父级目录a复制到a的子目录  ps2:同目录下存在与文件同名的文件夹，也会报错），请检查\n报错信息如下:\n" + xhr.responseText);
                }
            }
        }
        // } else {
        // start_qp("已取消粘贴操作！");
        // }
    } else if (SHEAR_PATH_A != "") { //剪切粘贴
        // 提示用户点击确认将覆盖文件（如果文件存在的话）
        // var confirmPaste = confirm("确认将覆盖文件（如果文件存在的话）？");
        // if (confirmPaste) {
        //     var xhr = new XMLHttpRequest();
        //     xhr.open("GET", HOST_FILE_URL + `shear.php?id=${username}&A=${PATH_COPY_A}&B=${PATH}`, true);
        //     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //     xhr.send();
        //     xhr.onreadystatechange = function () {
        //         if (xhr.readyState === 4 && xhr.status === 200) {
        //             if (xhr.responseText === "true") {
        //                 start_qp("操作成功！");
        //                 SHEAR_PATH_A = "";
        //                 refreshFileList();
        //             } else {
        //                 start_qp("操作失败！请检查文件结构是否能够剪切（ps1:父级目录a剪切到a的子目录），请检查\n报错信息如下:\n" + xhr.responseText);
        //             }
        //         }
        //     }
        // } else {
        //     start_qp("已取消粘贴操作！");
        // }
        console.log("pass");
    } else {
        start_qp("请先复制一个目录或者文件再进行粘贴操作！！");
    }
    hideMenu();
}

function right_rename() {
    console.log("right_rename");
    hideMenu();
}

function right_delete() {
    console.log("right_delete");
    console.log(element_id);
    if (element_id == "main_id") {
        start_qp("无效的删除操作");
        hideMenu();
        return;
    }
    var title = document.getElementById(element_id).querySelector('.list_name').title;
    var DELETE_PATH = PATH + title;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", HOST_FILE_URL + `delete.php?id=${username}&path=${encodeURIComponent(DELETE_PATH)}`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText === "true") {
                start_qp("目录或者文件已经删除");
                refreshFileList();

            } else {
                start_qp("删除目录发生错误，请检查是否存在问题，也有可能是平台的原因，也可告知开发者报错信息优化代码<br>报错信息如下: " + xhr.responseText);

            }
        }
    }
    hideMenu();
}

//共享文件
function right_share() {
    console.log("right_share");
    console.log(element_id);
    if (element_id == "main_id") {
        start_qp("无效的共享操作");
        hideMenu();
        return;
    }
    var title = document.querySelector("#" + element_id + " .style").title;
    console.log("要共享的类型：" + title);
    if (title == "文件夹") {
        start_qp("当前无法提供共享目录操作（原因：未开发），请选择一个文件进行共享，或等待作者开发完毕");
        hideMenu();
        return;
    }
    console.log("START window with shre")
    document.getElementById("share_window").style.display = "flex";
    document.getElementById("overlay").style.display = "block";
    hideMenu();
}

//提交share的表单
function share_ok() {
    var password = document.getElementById('password_share').value;
    var validity = document.querySelector('input[name="validity_share"]:checked').value;

    if (password.length != 4 || !(/^\d{4}$/.test(password))) {
        if (password.length == 0) {
            if (validity === '') {
                start_qp('请选择有效期！');
                return;
            } else {
                // 如果通过验证，可以在这里编写提交表单的逻辑
                //true
                share_ok_go();
            }
        } else {
            start_qp("密码必须是4为字符（非特殊字符！）");
        }
        return;
    } else {
        share_ok_go();
    }
}

function share_ok_go() {
    var title = document.querySelector("#" + element_id + " .style").title;
    console.log("要共享的类型：" + title);
    var name = document.getElementById(element_id).querySelector('.list_name').title;
    var SHARE_PATH = PATH + name;
    console.log("要共享的路径：" + SHARE_PATH);
    // console.log("用户密码：" + password)

    var share_pwd = document.getElementById('password_share').value;
    if (share_pwd == "") {
        var pwd_yn = "false";
    } else {
        var pwd_yn = "true";
    }
    var time = document.querySelector('input[name="validity_share"]:checked').value;
    let xhr = new XMLHttpRequest();
    let encodedUrl = HOST_FILE_URL + `share.php?pwd_yn=${encodeURIComponent(pwd_yn)}&time=${encodeURIComponent(time)}&share_pwd=${encodeURIComponent(share_pwd)}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&path=${encodeURIComponent(SHARE_PATH)}`;
    xhr.open("GET", encodedUrl, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.code == "200") {
                start_qp("文件已共享，可以前往侧边栏-共享 左侧盒子查看");
                close_share_window();

            } else {
                start_qp("共享文件发生错误，未知原因，请重试或者反馈给开发者<br>报错信息如下: " + result.msg);
                console.log(result.msg);
            }
        }
    }
}

//关闭共享窗口
function close_share_window() {
    document.getElementById("share_window").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

//判断代理状态
let xhr = new XMLHttpRequest();
xhr.open("GET", HOST_FILE_URL + `y_n.php?style=panduan&username=${username}`, true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.responseText === "true") {
            console.log("代理已开启")
            // 设置checkbox为选中状态
            document.getElementById('start_btn').checked = true;

        } else if (xhr.responseText === "false") {
            console.log("代理未开启或未激活")
            // document.getElementById('start_btn').checked = false;
        }
    }
}

//当开关变化的时候
function y_n() {
    var value = document.getElementById('start_btn').checked;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", HOST_FILE_URL + `y_n.php?style=set&username=${username}&value=${value}`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText === "true") {
                if (value == false) {
                    console.log("已关闭代理")
                } else if (value == true) {
                    console.log("已开启代理")
                }

            } else {
                console.log("操作失败")
            }
        }
    }
}

//设置跳转首页的标签
document.getElementById('user_url_a').href = HOST + "agent/?id=" + username;
document.getElementById('user_url').innerHTML = HOST + "agent/?id=" + username;

//气泡消息

function start_qp(value) {
    try {
        clearTimeout(qp_timeout);
    } catch (e) {
        console.log("无冲突");
    }
    var notification = document.getElementById('qp');
    notification.innerHTML = value;
    notification.style.display = 'block';
    var qp_timeout = setTimeout(function () {
        notification.style.display = 'none';
        notification.innerHTML = '消息';
    }, 6000); // 设置3秒后自动消失
}


//上传文件
function dragOverHandler(event) {
    event.preventDefault();
    // 添加一些视觉效果，比如改变背景颜色等
    // var id = event.target.id;
    // var element = document.getElementById(id);
    // element.dataTransfer.dropEffect = 'copy'; // 显示允许拖放的图标
    // element.style.backgroundColor = '#5f5f5f';
    // element.style.color = '#fff';
    // element.boxShadow = '0 0 1vh #000';
}

function dropHandler(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    // 处理上传文件的逻辑
    handleFiles(files);
}

//字节转换成适当单位
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function handleFiles(files) {
    // 遍历所有文件
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // 检查文件大小和类型
        if (file.size > 10 * 1024 * 1024) {
            start_qp('上传失败！文件大小超过10MB！');
            continue;
        }
        if (file.type === 'application/x-php') {
            start_qp('上传失败！不允许上传php文件！');
            continue;
        }

        // 检查文件名后缀
        if (file.name.endsWith('.php')) {
            start_qp('上传失败！不允许上传php文件！');
            continue;
        }

        // 处理上传文件的逻辑，比如使用FormData和AJAX上传文件
        var formData = new FormData();
        formData.append('file', file);
        console.log(file);
        var xhr = new XMLHttpRequest();

        xhr.open('POST', HOST_FILE_URL + `upload.php?id=${username}&url=${encodeURIComponent(PATH)}`, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (xhr.responseText === 'true') {
                        start_qp(`文件${file.name}上传成功！`);
                        refreshFileList();
                    } else {
                        start_qp("文件上传失败！\n" + xhr.responseText);
                    }
                } else {
                    // 处理请求失败的情况
                }
            }
        };

        xhr.send(formData);
    }
}


function create_dir() {
    //弹出输入框(类似alert，提示输入名称)
    var dir_name = prompt("请输入目录名称(如果不填值则不会创建)：");
    //如果用户点击确认
    if (dir_name) {
        if (dir_name.trim() === '') {
            alert("目录名称不能为空！")
            return;
        }
        var elements = document.querySelectorAll(".style[title='文件夹']");
        for (var i = 0; i < elements.length; i++) {
            console.log(elements[i])
            if (elements[i].nextElementSibling.title === dir_name) {
                alert("目录已存在！");
                return;
            }
        }
        let xhr = new XMLHttpRequest();
        xhr.open("GET", HOST_FILE_URL + `create_dir.php?id=${username}&path=${PATH + "/" + dir_name}`, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText === "true") {
                    start_qp("创建成功！");
                    refreshFileList();
                } else {
                    start_qp("创建失败！" + xhr.responseText);
                }
            }
        }
    }
}


//刷新图标
var home_url = HOST + "class_app/website/img/ico/";
var ico_arr = {
    "txt": home_url + "TXT.png",
    "aep": home_url + "AEP.png",
    "ai": home_url + "AI.png",
    "avi": home_url + "AVI.png",
    "cdr": home_url + "CDI.png",
    "css": home_url + "CSS.png",
    "docx": home_url + "DOC.png",
    "gif": home_url + "GIF.png",
    "html": home_url + "HTML.png",
    "jpeg": home_url + "JPEG.png",
    "mov": home_url + "MOV.png",
    "mp3": home_url + "MP3.png",
    "pdf": home_url + "PDF.png",
    "php": home_url + "PHP.png",
    "png": home_url + "PNG.png",
    "ppt": home_url + "PPT.png",
    "psd": home_url + "PSD.png",
    "rar": home_url + "RAR.png",
    "ttf": home_url + "TTF.png",
    "url": home_url + "URL.png",
    "xls": home_url + "XLS.png",
    "zip": home_url + "ZIP.png"
}

function getFileExtension(filename) {
    return filename.split('.').pop();
}

function setFileIcon(element, extension) {
    if (ico_arr[extension]) {
        // element.src = ico_arr[extension];
        //增加img标签
        element.innerHTML = "<img style='width:100%' src='" + ico_arr[extension] + "' alt='" + extension + "'>";
    } else {
        // 设置默认图标或者未知文件类型的图标
        // element.src = home_url + "default.png";
    }
}

function icon() {
    var elements = document.querySelectorAll(".style:not([title='文件夹'])");
    for (var i = 0; i < elements.length; i++) {

        var file_name = elements[i].nextElementSibling.title;
        var suffix = getFileExtension(file_name);
        setFileIcon(elements[i], suffix);
    }
}