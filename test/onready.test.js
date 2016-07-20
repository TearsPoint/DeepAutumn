

MyExt = {
    version: '1.0',     // 全局静态对象
    isReady: false,     //文档是否加载完成标志
    funcs: [],          // 缓存函数的数组
    onReady: function (f) {
        if (MyExt.isReady) f();
        else MyExt.funcs.push(f);
    },
    run: function () {
        if (MyExt.isReady)
            return;
        for (var i = 0; i < MyExt.funcs.length; i++) {
            try {
                var f = MyExt.funcs[i];
                f();
            } catch (e) {
                alert(" 事件发生异常了 " + e);
            }
        }
        MyExt.isReady = true;
        funcs = []; // 清空一下
    }
}



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
