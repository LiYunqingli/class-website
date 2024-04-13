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
    let photo_path = account.photo_path;
    document.querySelector("#user_img").src = photo_path;
    document.querySelector("#name").innerHTML = name;
    document.querySelector("iframe").src =
      "./html/main.html?username=" + username;
    //将所有.jingru的img元素的onclick值“start("原来的值")”增加一个值，例如“start("原来的值","2210909")”
    document.querySelectorAll(".icon").forEach((item) => {
      // item.onclick = function () {
        // 假设每个元素上的 onclick 属性中已经包含了类似于 start('首页') 的调用
        let originalOnclickValue = item.getAttribute("onclick");

        // 提取原始 onclick 字符串中的参数值，假设它总是形如 start('someValue')
        let originalArgumentMatch =
          originalOnclickValue.match(/start\('([^']+)'\)/);
        if (originalArgumentMatch && originalArgumentMatch[1]) {
          let originalArgument = originalArgumentMatch[1];

          // 构造新的 onclick 字符串，包括原始参数和 username
          let newOnclickValue = `start('${originalArgument}', '${username}')`;

          // 将新的 onclick 字符串设置回元素的 onclick 属性
          item.setAttribute("onclick", newOnclickValue);

          // 如果需要立即执行 start 函数，可以在这里调用
          // start(originalArgument, username);
          console.log("onclick value set to:", newOnclickValue);
        } else {
          console.error(
            "Original onclick value does not match expected format:",
            originalOnclickValue
          );
        }
      // };
    });
  }
};