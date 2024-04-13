<?php
header('Content-Type: text/html; charset=utf-8');

$username = $_GET['username'];
$password = $_GET['password'];
$path = $_GET['path'];
$url = "http://127.0.0.1/class_app/php/account.php?style=login&username=$username&password=$password";

$response = file_get_contents($url);

if ($response != "true") {
    echo "<script>alert('Username or password error');</script>";
    exit();
}
$panduan_dir = "../user_file/" . $username;
if (!is_dir($panduan_dir)) {
    mkdir($panduan_dir, 0755, true);
    // echo "目录创建成功。";
} else {
    // echo "目录已存在。";
}
$directoryPath = $panduan_dir . $path;

function formatSize($bytes)
{
    if ($bytes >= 1073741824) {
        $bytes = number_format($bytes / 1073741824, 2) . ' GB';
    } elseif ($bytes >= 1048576) {
        $bytes = number_format($bytes / 1048576, 2) . ' MB';
    } elseif ($bytes >= 1024) {
        $bytes = number_format($bytes / 1024, 2) . ' KB';
    } elseif ($bytes > 1) {
        $bytes = $bytes . ' b';
    } elseif ($bytes == 1) {
        $bytes = $bytes . ' b';
    } else {
        $bytes = '0 b';
    }

    return $bytes;
}

function getDirSize($dir)
{
    $size = 0;
    $files = array_diff(scandir($dir), array('.', '..'));

    foreach ($files as $file) {
        $currentFile = $dir . DIRECTORY_SEPARATOR . $file;
        if (is_file($currentFile)) {
            $size += filesize($currentFile);
        } elseif (is_dir($currentFile)) {
            $size += getDirSize($currentFile);
        }
    }

    return $size;
}

$items = scandir($directoryPath);

$results = [];

foreach ($items as $item) {
    if ($item == '.' || $item == '..') {
        continue;
    }

    $itemPath = $directoryPath . DIRECTORY_SEPARATOR . $item;

    $isFile = is_file($itemPath);
    $type = $isFile ? 'File' : 'Folder';

    $size = $isFile ? filesize($itemPath) : getDirSize($itemPath);
    $formattedSize = formatSize($size);

    $time = filemtime($itemPath);

    $name = basename($itemPath);

    $results[] = [
        'name' => $name,
        'size' => $formattedSize,
        'time' => date("Y-m-d H:i:s", $time),
        'type' => $type
    ];
}

$jsonResult = json_encode($results);

echo $jsonResult;
?>