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
});
