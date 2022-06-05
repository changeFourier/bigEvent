$(function () {
  layui.form.verify({
    pwd: [/^[\S]{6,15}$/, "密码必须6到15位之间"],
    samePwd: function (value) {
      var newPwd = $(".layui-form input[name=newPwd]").val();
      if (value !== newPwd) {
        return "两次密码不一致";
      }
    },
    diffPwd: function (newPwd) {
      var oldPwd = $(".layui-form input[name=oldPwd]").val();
      if (newPwd === oldPwd) {
        return "与原密码一致";
      }
    },
  });
  
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/my/updatepwd",
      data: data,
      success: function (res) {
          console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg("更新密码失败", { icon: 5 });
        }
        layui.layer.msg("更新密码成功", { icon: 6 });
        $(".layui-form")[0].reset();
      },
    });
  });
});
