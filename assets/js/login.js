$(function () {
  $("#link_reg").click(function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").click(function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });
  layui.form.verify({
    pwd: [/^[\S]{6,15}$/, "密码必须6到15位，且不能出现空格"],
    isSamePwd: function (value, item) {
      var password = $(".reg-box input[name = password]").val();
      if (value !== password) return "两次密码不一致";
    },
  });

  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    var username = $(".reg-box input[name = username]").val();
    var password = $(".reg-box input[name = password]").val();
    $.ajax({
      method: "POST",
      url: "/api/reguser",
      data: {
        username,
        password,
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message, { icon: 5 });
        }
        layer.msg(res.message, { icon: 6 });
        $("#link_login").click();
      },
    });
  });
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      method: "post",
      url: "/api/login",
      data: data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) return layer.msg(res.message, { icon: 5 });
        layer.msg(res.message, { icon: 6, time: 1000 }, function () {
          location.href = "/index.html";
          localStorage.setItem("token", res.token);
        });
      },
    });
  });
});
