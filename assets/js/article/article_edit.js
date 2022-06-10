$(function () {
  function rendercate() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 });
        var str = template("art_cate", res);
        $("[name=cate_id]").html(str);
        layui.form.render();
      },
    });
  }
  rendercate();

  initEditor();

  var $image = $("img");
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
  var id = location.search.split("=")[1];
  $.ajax({
    method: "get",
    url: `/my/article/${id}`,
    success: function (res) {
      if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 });
      layui.form.val("edit-form", res.data);
      var imageUrl = "http://www.liulongbin.top:3007" + res.data.cover_img;
      $image.cropper("destroy").attr("src", imageUrl).cropper(options);
    },
  });
  $("#form-edit").on("submit", function (e) {
    e.preventDefault();
    var fd = new FormData($(this)[0]);
    fd.append("Id", id);
    $image
      .cropper("getCroppedCanvas", {
        width: 100,
        height: 100,
      })
      .toBlob(function (blob) {
        fd.append("cover_img", blob);
        $.ajax({
          method: "post",
          url: "/my/article/edit",
          data: fd,
          processData: false,
          contentType: false,
          success: function (res) {
            if (res.status !== 0)
              return layui.layer.msg(res.message, { icon: 5 });
            layui.layer.msg(res.message, { icon: 6 });
            location.href = "/article/art_list.html";
          },
        });
      });
  });
});
