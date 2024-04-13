window.onload = function () {
    stop_load();
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