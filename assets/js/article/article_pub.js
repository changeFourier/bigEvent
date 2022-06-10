$(function () {
  function renderArt() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 });
        var str = template("art_cate", res);
        $("[name=cate_id]").html(str);
        layui.form.render("select");
      },
    });
  }

  renderArt();

  initEditor();

  var $image = $("#image");
  var options = {
    aspectRatio: 1,
    preview: ".img-preview",
  };
  $image.cropper(options);

  $("#btnChooseImage").on("click", function () {
    $("#coverFile").click();
  });
  $("#coverFile").on("change", function () {
    var filelist = $(this)[0].files;
    if (filelist.length <= 0)
      return layui.layer.msg("选择图片失败", { icon: 5 });
    var fileinfo = filelist[0];
    var imgURL = URL.createObjectURL(fileinfo);
    $image.cropper("destroy").attr("src", imgURL).cropper(options);
  });

  var state = "已发布";
  $("#btnSave2").click(function () {
    state = "草稿";
  });
  $("#form-pub").on("submit", function (e) {
    e.preventDefault();
    var fd = new FormData($(this)[0]);
    fd.append("state", state);
    $image
      .cropper("getCroppedCanvas", {
        width: 100,
        height: 100,
      })
      .toBlob(function (blob) {
        fd.append("cover_img", blob);
        $.ajax({
          method: "post",
          url: "/my/article/add",
          data: fd,
          processData: false,
          contentType: false,
          success: function (res) {
            if (res.status !== 0)
              return layui.layer.msg(res.message, { icon: 5 });
            layui.layer.msg(res.message, { icon: 6 });
            $("#form-pub")[0].reset();
            location.href = "/article/art_list.html";
            window.parent
              .$(".layui-nav-itemed dl>dd")
              .removeClass("layui-this")
              .eq(1)
              .addClass("layui-this");
          },
        });
      });
  });
});
