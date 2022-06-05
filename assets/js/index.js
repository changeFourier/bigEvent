$(function () {
  $("#logout").on("click", function () {
    layer.confirm(
      "确定退出登录?",
      { icon: 3, title: "提示" },
      function (index) {
        localStorage.removeItem("token");
        location.href = "/login.html";
        layer.close(index);
      }
    );
  });

  getUserInfo();
});

function getUserInfo() {
  $.ajax({
    method: "get",
    url: "/my/userinfo",
    success: function (res) {
      var { status, data, message } = res;
      if (status !== 0) {
        return layui.layer.msg(message, { icon: 5 });
      }
      var name = data.nickname || data.username;
      $("#welcome").html(`欢迎 ${name}`);
      if (data.user_pic) {
        $(".text-avatar").hide();
        $(".layui-nav-img").attr("src", data.user_pic).show();
      } else {
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".text-avatar").html(text).show();
      }
    },
  });
}
