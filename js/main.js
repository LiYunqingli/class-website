let urlParams = new URLSearchParams(window.location.search); //获取搜索栏的字符串
let username = urlParams.get("username");
let password = urlParams.get("password");
let xhr = new XMLHttpRequest();
xhr.open(
  "POST",
  HOST_URL + "return_image_path.php?ms=index_main"
);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let result = JSON.parse(xhr.responseText);
    let images = Array();
    for (let i = 0; i < result.length; i++) {
      let url = result[i].path;
      images.push(url);
    }
    var currentIndex = 0;
    var indexLeft = document.querySelector(".index_left");

    function showImage(index) {
      indexLeft.style.backgroundImage = "url('" + images[index] + "')";
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }

    function previousImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    }

    showImage(currentIndex);

    // 自动播放
    setInterval(nextImage, 4000);

    indexLeft.style.backgroundSize = "cover";
    indexLeft.style.backgroundPosition = "center";
  }
};

let xhr_1 = new XMLHttpRequest();
xhr_1.open(
  "GET",
  HOST_URL + "account.php?style=return_account_all&username=" +
  username
);
xhr_1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr_1.send();
xhr_1.onreadystatechange = function () {
  if (xhr_1.readyState === 4 && xhr_1.status === 200) {
    let result_1 = JSON.parse(xhr_1.responseText);
    let account = result_1;
    let name = account.name;
    let post = account.post;
    let gender = account.gender;
    let photo_path = account.photo_path;
    let total_score = account.total_score;

    document.querySelector("#tit_p").innerHTML = "Hi, " + name + ", 别来无恙啊!"
  }
};