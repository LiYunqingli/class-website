<?php
$conn = new mysqli("localhost", "root", "Lihuarong5887", "deyufen");

// 检查连接是否成功
if ($conn->connect_error) {
    die("连接数据库失败: " . $conn->connect_error);
}

// 解析表单数据
$score = $_POST['score'];
$details = $_POST['detail'];
$date = $_POST['date'];
$username_a = $_POST['username'];
$style = $_POST['style'];
$username_admin = $_POST['username_admin'];
$password = $_POST['password'];
$panduan = $_POST['panduan'];
if ($panduan == "true") {
    //all
    //all,bgb,3602,3603,3604,2702

    if($username_a == 'all'){
        $sql = "SELECT";

    }else if($username_a == 'bgb'){

    }else{

    }


} else {
    //验证用户为管理员
    $sql = "SELECT * FROM users.class09 WHERE username = '$username_admin' AND password = '$password' AND (rule = 'root' or rule = 'admin')";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {


        //获取现在的时间
        $now = date("Y-m-d H:i:s");

        $sql = "SELECT count(number) from `" . $username_a . "`";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $number = ($row["count(number)"]) + 1;
        $sql = "INSERT INTO `" . $username_a . "` (number, score, details, style, date, time) VALUES ('$number', '$score', '$details', '$style', '$date', '$now')";
        $str = "Bound SQL: " . $sql;
        $result = $conn->query($sql);
        // 执行插入操作
        // $sql_1 = "INSERT INTO `" . $username_a . "` (number, score, details, style, date, time) SELECT IFNULL(MAX(number), 0) + 1, ?, ?, ?, ?, NOW() FROM `" . $username_a . "`";
        // $stmt = $conn->prepare($sql_1);
        // $stmt->bind_param("dsss", $score, $details, $style, $date);
        // $stmt->execute();


        // 输出绑定后的SQL语句和参数
        // $str = "Bound SQL: " . $sql;
        $str = $conn->real_escape_string($str);
        $sql = "INSERT INTO users.access_admin values ('$username_admin','$str',NOW())";
        $conn->query($sql);

        echo "数据插入成功！";
    } else {
        $response = "你不是管理员！！！你在执行非法操作！！！";
        echo $response;
    }
}
