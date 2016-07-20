


if (window.addEventListener) {
    // 标准的 DOM2 事件注册方式
    window.addEventListener("load", MyExt.run, false);
} else if (window.attachEvent) {
    //IE 的事件注册方式
    window.attachEvent("onload", MyExt.run);
} else {
    // 原始的0级 DOM 的事件注册方式
    window.onload = MyExt.run;
}
