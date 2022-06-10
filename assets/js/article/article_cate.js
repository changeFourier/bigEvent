$(function () {
  function renderArticle() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        var { data, status } = res;
        if (status !== 0)
          return layui.layer.msg("文章分类数据获取失败", { icon: 5 });
        var str = template("dialog", data);
        $("tbody").html(str);
      },
    });
  }
  renderArticle();

  $("#btnAddCate").on("click", function () {
    var index = layui.layer.open({
      title: "添加文章分类",
      type: 1,
      area: ["500px", "300px"],
      content: $("#dialog-add").html(),
    });
    $("#form-add").on("submit", function (e) {
      e.preventDefault();
      var data = $(this).serialize();
      $.ajax({
        method: "POST",
        url: "/my/article/addcates",
        data: data,
        success: function (res) {
          if (res.status !== 0)
            return layui.layer.msg(res.message, { icon: 5 });
          layui.layer.msg(res.message, { icon: 6 });
          layui.layer.close(index);
          renderArticle();
        },
      });
    });
  });
  $("tbody").on("click", ".btn-delete", function () {
    var id = $(this).attr("data_id");
    layui.layer.confirm("是否删除？", function (index) {
      $.ajax({
        method: "get",
        url: `/my/article/deletecate/${id}`,
        success: function (res) {
          if (res.status !== 0) return layui.layer.msg("删除失败", { icon: 5 });
          layui.layer.msg("删除成功", { icon: 6 });
          renderArticle();
        },
      });
      layer.close(index);
    });
  });
  var editIndex;
  $("tbody").on("click", ".btn-edit", function () {
    editIndex = layui.layer.open({
      title: "修改分类名称",
      type: 1,
      area: ["500px", "300px"],
      content: $("#dialog-edit").html(),
    });
    var id = $(this).attr("data-id");
    $.ajax({
      method: "get",
      url: `/my/article/cates/${id}`,
      success: function (res) {
        if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 });
        layui.form.val("form-edit", res.data);
      },
    });
  });
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      method: "post",
      url: "/my/article/updatecate",
      data: data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 });
        layui.layer.msg(res.message, { icon: 6 });
        layui.layer.close(editIndex);
        renderArticle();
      },
    });
  });
});
