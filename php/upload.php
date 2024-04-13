<?php
// 检测是否有文件被上传
$shuchu = "";
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["fileToUpload"])) {
    // $_FILES['fileToUpload']['name'] - 上传文件的原始名称
    // $_FILES['fileToUpload']['type'] - 文件的 MIME 类型
    // $_FILES['fileToUpload']['size'] - 文件的大小（字节）
    // $_FILES['fileToUpload']['tmp_name'] - 文件被上传后在服务器端储存的临时文件名
    // $_FILES['fileToUpload']['error'] - 和该文件上传相关的错误代码

    $target_dir = "../user_file/2210909/"; // 指定存储上传文件的目录

    if (!is_dir($target_dir)) {
        if (!mkdir($target_dir, 0777, true)) {
            $shuchu = "创建目录失败，请检查权限。";
            echo "alert('" . $shuchu . "')";
            return; // 创建目录失败，终止脚本
        }
    }

    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]); // 目标文件路径
    $uploadOk = 1; // 标记变量，判断上传是否成功

    // 检查文件是否已经存在
    if (file_exists($target_file)) {
        $shuchu = "抱歉，文件已经存在。";
        $uploadOk = 0;
    }

    // 检查文件大小
    if ($_FILES["fileToUpload"]["size"] > 500000) { // 示例限制大小为500KB
        $shuchu = "抱歉，您的文件太大（大于500KB），你可以找开发者申请更大的单个文件空间";
        $uploadOk = 0;
    }

    // 允许特定格式的文件
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    if (
        $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" && $imageFileType != "txt"
    ) {
        $shuchu = "抱歉，只允许 JPG, JPEG, PNG, TXT & GIF 文件格式。";
        $uploadOk = 0;
    }

    // 检查$uploadOk是否由于错误而设置为0
    if ($uploadOk == 0) {
        // $shuchu = "抱歉，您的文件未被上传。";
    } else {
        // 尝试上传文件
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            $shuchu = "文件 " . htmlspecialchars(basename($_FILES["fileToUpload"]["name"])) . " 已经被上传。";
        } else {
            $shuchu = "抱歉，在上传文件时出现错误。";
        }
    }
} else {
    $shuchu = "无效的请求。";
}
echo "alert('" . $shuchu . "')";
?>