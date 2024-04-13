<?php
$targetDir = "uploads/";
$imageName = uniqid() . '.png'; // 生成唯一的文件名
$targetFilePath = $targetDir . $imageName;

// 确保上传目录存在
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // 检查是否有文件上传
    if (isset($_FILES['image']['tmp_name'])) {
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
            echo "The file has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    } else {
        echo "No file uploaded.";
    }
} else {
    echo "Invalid request.";
}
?>
