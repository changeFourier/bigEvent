$.ajaxPrefilter(function (options,originalOptions,jqXHR) {
  options.url = "http://www.liulongbin.top:3007" + options.url;
});
