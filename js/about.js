function local_start() {
  window.open(HOST, "_blank");
}

function next() {
  var tree_1 = document.getElementById("tree_1");
  var tree_2 = document.getElementById("tree_2");
  var tree_3 = document.getElementById("tree_3");
  var tree_1_display = window
    .getComputedStyle(tree_1)
    .getPropertyValue("display");
  var tree_2_display = window
    .getComputedStyle(tree_2)
    .getPropertyValue("display");
  var tree_3_display = window
    .getComputedStyle(tree_3)
    .getPropertyValue("display");

  if (tree_1_display === "block") {
    tree_2.classList.add("hiddent");
    setTimeout(function () {
      tree_1.style.display = "none";
      tree_2.style.display = "block";
      setTimeout(function () {
        tree_2.classList.remove("hiddent");
      }, 10);
    }, 500);
  }
  if (tree_2_display === "block") {
    tree_3.classList.add("hiddent");
    setTimeout(function () {
      tree_2.style.display = "none";
      tree_3.style.display = "block";
      setTimeout(function () {
        tree_3.classList.remove("hiddent");
      }, 10);
    }, 500);
  }
  if (tree_3_display === "block") {
    tree_1.classList.add("hiddent");
    setTimeout(function () {
      tree_3.style.display = "none";
      tree_1.style.display = "block";
      setTimeout(function () {
        tree_1.classList.remove("hiddent");
      }, 10);
    }, 500);
  }
}

function up() {
  var tree_1 = document.getElementById("tree_1");
  var tree_2 = document.getElementById("tree_2");
  var tree_3 = document.getElementById("tree_3");
  var tree_1_display = window
    .getComputedStyle(tree_1)
    .getPropertyValue("display");
  var tree_2_display = window
    .getComputedStyle(tree_2)
    .getPropertyValue("display");
  var tree_3_display = window
    .getComputedStyle(tree_3)
    .getPropertyValue("display");

  if (tree_1_display === "block") {
    tree_3.classList.add("hiddent");
    setTimeout(function () {
      tree_1.style.display = "none";
      tree_3.style.display = "block";
      setTimeout(function () {
        tree_3.classList.remove("hiddent");
      }, 10);
    }, 500);
  }
  if (tree_2_display === "block") {
    tree_1.classList.add("hiddent");
    setTimeout(function () {
      tree_2.style.display = "none";
      tree_1.style.display = "block";
      setTimeout(function () {
        tree_1.classList.remove("hiddent");
      }, 10);
    }, 500);
  }
  if (tree_3_display === "block") {
    tree_2.classList.add("hiddent");
    setTimeout(function () {
      tree_3.style.display = "none";
      tree_2.style.display = "block";
      setTimeout(function () {
        tree_2.classList.remove("hiddent");
      }, 10);
    }, 500);
  }
}

setInterval(function () {
  next();
}, 4000);