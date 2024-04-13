<?php
$servername = "localhost";
$username = "root";
$password = "Lihuarong5887";
$dbname = "users";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("数据库连接失败: " . $conn->connect_error);
}

$username = $_GET["username"];
$password = $_GET["password"];

$sql = "SELECT * FROM class09 WHERE username = '$username' AND password = '$password' AND (rule = 'root' or rule = 'admin')";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

  $response = "true";
  echo $response;
} else {
  $response = "false";
  echo $response;
}

$conn->close();
