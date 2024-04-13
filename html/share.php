<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../css/share.css">
</head>

<body>
    <div style="display: flex;">
        <div class="main">
            <div class="left">

                <?php
                $conn = new mysqli("localhost", "root", "Lihuarong5887", "users");
                if ($conn->connect_error) {
                    die("数据库连接失败: " . $conn->connect_error);
                }
                $username = $_GET['username'];
                $password = $_GET['password'];
                $sql = "SELECT * FROM users.class09 WHERE username='$username' AND password='$password'";
                $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $name = $row['name'];
                    $now_name = $row['now_name'];
                    if ($now_name == null) {
                        $now_name = $name; //姓名
                    }
                    $sql = "SELECT * FROM share.list WHERE username='$username'";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                        $html = "<h2>
                        已共享的文件清单
                    </h2>
                    ";
                        while ($row = $result->fetch_assoc()) {
                            $time = $row['time'];
                            $file_name = $row['filename'];
                            $num = $row['num'];
                            $id = $row['turl'];
                            $html .= "
                            <div class='file-share'>
                            <img src='' class='file_icon'>
                            
                            <div class='file-info'>
                                <h4>$file_name</h4>
                                <p>到期时间：$time</p>
                                <p>上传用户：$now_name</p>
                            </div>
                            <span class='downloads'>下载次数：$num</span>
                            <a href='https://lihuarong.cn:8080/share/?id=$id' class='download-btn'>下载</a>
                            <div class='cancel-btn' onclick=\"cancel_share('$id')\">取消共享</div>
                            </div>
                            ";
                        }
                        echo $html;
                    } else {
                        echo "<h2>已共享的文件清单</h2>您没有分享过文件，列表为空（在侧边栏文件栏目上传文件后右键设置分享）";
                    }
                } else {
                    echo "无法验证安全性，可能是密码与与父级不匹配，若您是管理员，请检查数据库或检查代码结构，若您非管理员，请联系管理员解决或重新登录";
                }
                ?>
                <!-- <h2>
                    已共享的文件清单
                </h2>
                <div class="file-share">
                    <img src="./img/user1.jpg" alt="分享者头像">
                    <div class="file-info">
                        <h4>is</h4>
                        <p>到期时间：2024-02-19 08:30</p>
                        <p>文件名：example.txt</p>
                    </div>
                    <span class="downloads">下载次数：10</span>
                    <a href="download.php?file=example.txt" class="download-btn">下载</a>
                    <div href="#" class="cancel-btn">取消共享</div>
                </div> -->

            </div>
        </div>
        <div class="main">
            <div class="right">
                <!-- <h2>大厅</h2>
                <div class="file-share">
                    <img src="./img/user1.jpg" alt="分享者头像" class="user_img">
                    <div class="file-info">
                        <h4>is</h4>
                        <p>分享时间：2024-02-19 08:30</p>
                        <p>文件名：example.txt</p>
                    </div>
                    <span class="downloads">下载次数：10</span>
                    <a href="download.php?file=example.txt" class="download-btn">下载</a>
                </div> -->
                <?php
                $sql = "SELECT * FROM share.list";
                $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                    $html = "<h2>大厅</h2>";
                    while ($row = $result->fetch_assoc()) {
                        $user_username = $row['username'];
                        $time = $row['time'];
                        $file_name = $row['filename'];
                        $num = $row['num'];
                        $id = $row['turl'];
                        $sql = "SELECT name, now_name FROM users.class09 WHERE username='$user_username'";
                        $result_user = $conn->query($sql);
                        $row_user = $result_user->fetch_assoc();
                        $name = $row_user['name'];
                        $now_name = $row_user['now_name'];
                        if ($now_name == null) {
                            $now_name = $name; //姓名
                        }
                        $html .= "
                            <div class='file-share'>
                            <img src='' class='file_icon'>
                            
                            <div class='file-info'>
                                <h4>$file_name</h4>
                                <p>到期时间：$time</p>
                                <p>上传用户：$now_name</p>
                            </div>
                            <span class='downloads'>下载次数：$num</span>
                            <a href='https://lihuarong.cn:8080/share/?id=$id' class='download-btn'>下载</a>
                            
                            </div>
                            ";
                    }
                    echo $html;
                } else {
                    echo "<h2>大厅</h2>大厅中所包含的是所有用户的共享文件，列表为空（在侧边栏文件栏目上传文件后右键设置分享）";
                }
                ?>
            </div>
        </div>
    </div>
    <div id="qp">消息</div>
</body>
<script>
    function start_qp(value) {
        try {
            clearTimeout(qp_timeout);
        } catch (e) {
            console.log("无冲突");
        }
        var notification = document.getElementById('qp');
        notification.innerHTML = value;
        notification.style.display = 'block';
        var qp_timeout = setTimeout(function() {
            notification.style.display = 'none';
            notification.innerHTML = '消息';
        }, 6000); // 设置3秒后自动消失
    }

    function cancel_share(id) {
        let urlParams = new URLSearchParams(window.location.search); //获取搜索栏的字符串
        let username = urlParams.get("username");
        let password = urlParams.get("password");
        let xhr = new XMLHttpRequest();
        let encodedUrl = `https://lihuarong.cn:3324/php/cancel_share.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&file_id=${encodeURIComponent(id)}`;
        xhr.open("GET", encodedUrl, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);
                if (result.code == "200") {
                    start_qp("已取消共享文件id为：" + id + " 的分享");
                    window.location.reload();
                } else {
                    start_qp("操作失败，未知原因，请重试或者反馈给开发者<br>报错信息如下: " + result.msg);
                    console.log(result.msg);
                }
            }
        }
    }

    //刷新图标
    var home_url = "https://lihuarong.cn:8080/class_app/website/img/ico/";
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

    function getFileExtension(filename_1) {
        return filename_1.split('.').pop();
    }


    function icon() {
        var name = document.querySelectorAll(".file-info");
        for (var i = 0; i < name.length; i++) {
            var one_name = name[i].querySelector("h4").innerHTML;
            var extension = getFileExtension(one_name);
            var img = name[i].previousElementSibling;;
            if (ico_arr[extension]) {
                img.src = ico_arr[extension];
            } else {
                img.src = ico_arr["txt"];
            }
        }
    }
    icon()
</script>

</html>