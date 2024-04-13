<?php

//判断当前是第几周
$currentDate = date("Y-m-d");
// 将 2023 年 9 月 1 日作为起始日期
$startDate = "2024-02-26";
$weekDiff = floor((strtotime($currentDate) - strtotime($startDate)) / (7 * 24 * 3600)) + 1;
$weekDiff = $weekDiff - 1; //当前周数

$year = 2024; // 要判断的年份
$startWeek = $weekDiff - 6; // 起始周数
$endWeek = $weekDiff; // 结束周数

// 设置起始日期为当年的9月1日
$startDate = date("Y-m-d", strtotime("{$year}-02-26"));
$dateRanges = []; //七周的范围列表
for ($week = $startWeek; $week <= $endWeek; $week++) {
    $startOfWeek = date("Y-m-d", strtotime("{$startDate} +" . ($week - 1) . " week"));
    $endOfWeek = date("Y-m-d", strtotime("{$startOfWeek} +6 days"));
    $dateRanges[] = [$startOfWeek, $endOfWeek];
}

$servername = "localhost";
$username = "root";
$password = "Lihuarong5887";
$dbname = "users";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("数据库连接失败: " . $conn->connect_error);
}

$username = $_GET["username"];
$data = array();
$first_score = "80";
for ($i = 0; $i < 7; $i++) {
    $sql = "SELECT SUM(score)+80 as total_score FROM deyufen.`" . $username . "` WHERE date < '" . $dateRanges[$i][1] . "'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $totalScore = $row["total_score"];
        $data[] = $totalScore;
        $first_score = $totalScore;
    } else {
        $data[] = $first_score;
    }
}
$conn->close();
$data_number = $weekDiff - 5;

$result = array();

for ($i = 0; $i < count($data); $i++) {
    $result["$data_number"] = $data[$i];
    $data_number++;
}

echo json_encode($result);

?>
