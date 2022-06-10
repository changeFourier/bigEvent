$(function () {
  var $image = $("#image");
  var options = {
    aspectRatio: 1,
    preview: ".img-preview",
  };
  $image.cropper(options);

  $("#btnChooseImage").on("click", function () {
    $("#file").click();
  });

  $("#file").on("change", function () {
    var filelist = $(this)[0].files;
    if (filelist <= 0) return layui.layer.msg("请上传文件");
    var fileInfo = filelist[0];
    var imgURL = URL.createObjectURL(fileInfo);
    $image.cropper("destroy").attr("src", imgURL).cropper(options);
  });

  $("#btnUpload").on("click", function () {
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        width: 160,
        height: 90,
      })
      .toDataURL();
    $.ajax({
      method: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        if (res.status !== 0)
          return layui.layer.msg("更换头像失败", { icon: 5 });
        layui.layer.msg("更换头像成功", { icon: 6 });
        window.parent.getUserInfo();
      },
    });
  });
});
