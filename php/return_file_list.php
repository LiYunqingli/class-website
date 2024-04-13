<?php
$conn = new mysqli("localhost", "root", "Lihuarong5887", "users");

if ($conn->connect_error) {
    die("数据库连接失败: " . $conn->connect_error);
}

$username = $_GET['username'];
$password = $_GET['password'];


function scanDirectory($dir)
{
    $data = [];

    $files = array_diff(scandir($dir), array('.', '..'));

    foreach ($files as $file) {
        $path = $dir . '/' . $file;
        if (is_dir($path)) {
            $size = formatSizeUnits(getFolderSize($path));
            $data[] = [
                'type' => '文件夹',
                'size' => $size,
                'path' => $path
            ];
            $data = array_merge($data, scanDirectory($path));
        } else {
            $size = formatSizeUnits(filesize($path));
            $data[] = [
                'type' => '文件',
                'size' => $size,
                'path' => $path
            ];
        }
    }

    return $data;
}

function getFolderSize($dir)
{
    $totalSize = 0;

    $files = array_diff(scandir($dir), array('.', '..'));

    foreach ($files as $file) {
        $path = $dir . '/' . $file;
        if (is_dir($path)) {
            $totalSize += getFolderSize($path);
        } else {
            $totalSize += filesize($path);
        }
    }

    return $totalSize;
}

function formatSizeUnits($bytes)
{
    $units = array('B', 'KB', 'MB', 'GB', 'TB');
    $index = 0;
    while ($bytes >= 1024 && $index < 4) {
        $bytes /= 1024;
        $index++;
    }
    return round($bytes, 2) . ' ' . $units[$index];
}

$dir = '../user_file/' . $username . '/';

if (is_dir($dir)) {
    $directoryData = scanDirectory($dir);
    //判断$directoryData的长度是否为0
    if (count($directoryData) > 0) {
        echo json_encode($directoryData);
    } else {
        echo "null";
    }
} else {
    echo "null";
}
?>