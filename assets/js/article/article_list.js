$(function () {
  function zero(data) {
    return data >= 10 ? data : "0" + data;
  }
  template.defaults.imports.dateFormat = function (data) {
    data = new Date(data);
    var y = data.getFullYear();
    var m = zero(data.getMonth() + 1);
    var d = zero(data.getDate());
    var h = zero(data.getHours());
    var f = zero(data.getMinutes());
    var s = zero(data.getSeconds());
    return `${y}-${m}-${d} ${h}:${f}:${s}`;
  };

  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: "",
    state: "",
  };

  function renderArtList() {
    $.ajax({
      method: "get",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 });
        var str = template("art_list", res);
        $("tbody").html(str);
        $("#pageBox").html("");
        if (res.data.length !== 0) {
          renderPage(res.total);
        }
      },
    });
  }
  renderArtList();

  function renderArtCate() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 });
        var str = template("select", res);
        $("[name=cate_id]").html(str);
        layui.form.render("select");
      },
    });
  }
  renderArtCate();

  $("#form-search").on("submit", function (e) {
    e.preventDefault();
    var cate_id = $("[name = cate_id]").val();
    var state = $("[name = state]").val();
    q.cate_id = cate_id;
    q.state = state;
    renderArtList();
  });

  function renderPage(total) {
    layui.laypage.render({
      elem: "pageBox",
      count: total,
      limit: q.pagesize,
      curr: q.pagenum,
      layout: ["limit", "prev", "page", "next", "skip"],
      limits: [1, 2, 5, 10],
      jump: function (obj, first) {
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        if (!first) {
          renderArtList();
        }
      },
    });
  }

  $("tbody").on("click", ".layui-btn-danger", function () {
    var num = $(".layui-btn-danger").length;
    var id = $(this).attr("data-id");
    layui.layer.confirm("是否删除?", function (index) {
      $.ajax({
        method: "get",
        url: `/my/article/delete/${id}`,
        success: function (res) {
          if (res.status !== 0)
            return layui.layer.msg(res.message, { icon: 5 });
          if (num === 1) {
            q.pagenum = q.pagenum === 1 ? q.pagenum - 1 : 1;
          }
          renderArtList();
        },
      });
      layer.close(index);
    });
  });

  $("tbody").on("click", "#btn-edit", function () {
    var id = $(this).attr("data-id");
    location.href = `/article/art_edit.html?id=${id}`;
  });
});
