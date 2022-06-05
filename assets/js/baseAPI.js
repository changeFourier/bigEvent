$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  options.url = "http://www.liulongbin.top:3007" + options.url;
  if (options.url.includes("/my")) {
    options.headers = { Authorization: localStorage.getItem("token") || "" };
  }
  options.complete = function (xhr) {
    var { responseJSON } = xhr;
    if (responseJSON.status === 1 && responseJSON.message === "身份认证失败！") {
      location.href = "/login.html";
      localStorage.removeItem("token");
    }
  };
});
