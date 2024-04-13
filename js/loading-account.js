window.onload = function () {
    stop_load();
    setTimeout
    (function () {
      // 获取id为userimg的元素
      var userImg = document.querySelector('.user_img img');

      // 模拟悬停在元素上一秒
      userImg.dispatchEvent(new Event('mouseover'));

      // 一秒后移除悬停效果
      setTimeout(function () {
        userImg.dispatchEvent(new Event('mouseout'));
      }, 1000);
    }, 500);
  };
  
  function start_load(){
    var loader = document.getElementById("loader");
    var overlay = document.getElementById("overlay");
    loader.style.display = "block";
    overlay.style.display = "block";
  }

  function stop_load(){
    var loader = document.getElementById("loader");
    var overlay = document.getElementById("overlay");
    
    setTimeout(function () {
      loader.style.display = "none";
      overlay.style.display = "none";
    }, 500);
  }