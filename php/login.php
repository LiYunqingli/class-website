<?php
$servername = "localhost";
$username = "root";
$password = "Lihuarong5887";
$dbname = "users";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("数据库连接失败: " . $conn->connect_error);
}

$username = $_POST["username"];
$password = $_POST["password"];

$sql = "SELECT * FROM class09 WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

  $response = "true";
  //向access表中插入数据
  $insertSql = "INSERT INTO users.access (username, time, style) VALUES ('" . $username . "', NOW(), 'new_website')";
  $insertStmt = $conn->prepare($insertSql);
  $insertStmt->execute();
  //更新登录次数
  $updateSql = "UPDATE users.class09 SET num = num + 1 WHERE username = ?";
  $updateStmt = $conn->prepare($updateSql);
  $updateStmt->bind_param("s", $username);
  $updateStmt->execute();
  echo $response;
} else {
  $response = "false";
  echo $response;
}

$conn->close();
