$(function () {
  function getUserMsg() {
    $.ajax({
      method: "get",
      url: "/my/userinfo",
      success: function (res) {
        var { status, message, data } = res;
        if (status !== 0) {
          layer.msg(message, { icon: 5 });
        }
        layui.form.val("formUserInfo", data);
      },
    });
  }
  getUserMsg();
  layui.form.verify({
    name: [/^[\S]{1,8}$/, "昵称必须1到8位之间"],
  });

  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message, { icon: 5 });
        }
        layui.layer.msg(res.message, { icon: 6 });
        window.parent.getUserInfo();
      },
    });
  });

  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    getUserMsg();
  });
});
