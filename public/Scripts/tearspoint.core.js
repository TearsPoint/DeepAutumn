/*
|------------------------------------------|
| @author:  王衡
| @version: v 1.0.0
| @website: 
| @email:	wangheng920411@163.com 
|------------------------------------------|
|AlterHistory:
|2014-05-16	create
*/

//url处理 
var UrlHelper = {
    queryStr: function (paraName) {
        var value = "";
        var url = window.location.toString();
        var paraStr = url.substring(url.indexOf("?") + 1, url.length);
        var paras = paraStr.split("&");
        var index = 0;
        $.each(paras, function (index, e) {
            var keyValuePair = e.split("=");
            if (keyValuePair[0] === paraName) {
                value = keyValuePair[1];
            }
        });
        return jQuery.isNumeric(value) ? parseInt(value) : value;
    },

    getURLParameter: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }
};

//String 扩展方法
String.prototype.parseURL = function () {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g,
        function (h) { return h.link(h) })
};

function key_value_pair()
{
    key = '';
    value = null;
};

Array.prototype.isExist = function(key)
{
    console.log('isExist for:',this);
    for(var i=0; i<this.length; i++)
    {
        console.log(this[i]);
        if(this[i].key==key)
            return true;
    }
    return false;
};

Array.prototype.getByKey = function(key)
{
    console.log('getByKey :',key,':',this);
    for(var i=0; i<this.length; i++)
    {
        console.log(this[i]);
        if(this[i].key==key)
            return this[i];
    }
    return null;
};


//站点基础控制
(function () {
    window.site_nav = {
        username:  'UNameb',
        menus: null,
        page_box: $('#page_box'),
        pageKey:null,
        cache_page_boxs:new Array(),
        current_menu: null,
        is_live: false,
        is_windows_socketserver:false,
        domain: '',
        page_cache: [],
        ie7: false,
        init: function () {
            console.log('window.site_nav.init');
            socket_client = new SocketClient();

            var pattern = new RegExp(site_nav.domain, 'gi');
            site_nav.is_live = pattern.test(window.location.href);

            site_nav.ie7 = ($.browser.msie && parseInt($.browser.version, 10) <= 7) ? true : false;

            site_nav.cacheElements();
            site_nav.addEvents();

            if (window.location.hash !== '' && window.location.hash !== '#') {
                $(document.body).addClass('first_hit');
                site_nav.openMenu(window.location.hash);
                setTimeout(function () {
                    $(document.body).removeClass('first_hit');
                }, 100);
            }
        },

        cacheElements: function () {
            this.menus = $('a.s');
            this.page_box = $('#page_box');
        },

        addEvents: function () {
            this.menus.unbind("click", this.Events.menuClick);
            this.menus.bind("click", this.Events.menuClick);
            $(window).unbind('hashchange', this.Events.onHashChange);
            $(window).bind('hashchange', this.Events.onHashChange);
        },

        openMenu: function (hash) {
            console.log('openMenu()');
            hash = '#!' + hash.replace(/#|!/gi, '');

            var is_blog = hash.match(/blog/) ? true : false;
            var menu_name = is_blog ? 'blog' : hash.replace(/#|!/gi, '');
            var menu = this.menus.filter('[data-name="' + menu_name + '"]');

            if (menu.length) {
                if (!this.current_menu) {
                    $(document.body).addClass('page_view');
                }

                menu.removeClass('closed').addClass('open');
                this.menus.not(menu).addClass('closed');

                if (hash.match(/blog/)) {
                     site_nav.pageKey = 'blog';
                } else {
                    site_nav.pageKey = menu_name + '';
                }

                var document_title = hash.replace(/#|!/gi, '');
                document_title = document_title.charAt(0).toUpperCase() + document_title.slice(1);
                document.title = 'DeepAutumn | ' + document_title;

                if ("undefined" !== iTimeout)
                    clearTimeout(iTimeout);

                if(site_nav.cache_page_boxs.isExist(menu_name))
                {
                    var pbc = site_nav.cache_page_boxs.getByKey(menu_name);
                    for(var i=0; i<pbc.value.length; i++)
                    {
                        console.log(pbc.value[i]);
                        window.site_nav.page_box.append(pbc.value[i]);
                    }
                }
                else
                {
                    var iTimeout = setTimeout(function() {
                        $.ajax({
                            url: site_nav.pageKey,
                            cache: false,
                            type: 'POST',
                            data: { hash: hash },
                            beforeSend: function (jqXHR, settings) {
                                site_nav.page_box.addClass('loading');
                            },
                            complete: function (jqXHR, textStatus) {
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                            },
                            success: function (page_data, textStatus, jqXHR) {
                                site_nav.page_box.removeClass('loading');
                                site_nav.DoCheckLogin();
                                site_nav.page_box.html(page_data);
                                console.log(site_nav.page_box);
                                site_nav.buildPageView(site_nav.pageKey);
                            }
                        });
                    }, 2000);
                }
                this.current_menu = menu_name;
                if (this.is_live) {

                }
            } else {
                if(!this.cache_page_boxs.isExist(this.current_menu))
                {
                    var c = new key_value_pair();
                    c.key = this.current_menu;
                    $("#page_box").wrapInner('<div id="'+ this.current_menu +'_view_wrap"></div>');
                    c.value = $("#page_box").children();
                    this.cache_page_boxs.push(c);
                    console.log(this.cache_page_boxs);
                }

                $("#overlay").children().remove();
                $("#overlay").hide();
                this.current_menu = null;
                $("#page_box").children().detach();
                $(document.body).removeClass('page_view');

                //重新缓存相关元素
                this.cacheElements();
                //重新注册相关事件
                this.addEvents();
                site_nav.menus.removeClass('closed open');
            }
        },
        DoCheckLogin : function(){
            var isLogin = site_nav.getCookie("is_login");
            if (!isLogin) {
                $("#overlay").show();
                $.ajax({
                    url: "../account/login_pv",
                    cache: false,
                    type: 'POST',
                    data: {},
                    beforeSend: function (jqXHR, settings) {

                    },
                    complete: function (jqXHR, textStatus) {
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    },
                    success: function (data, textStatus, jqXHR) {
                        $("#overlay").html(data);
                        //alert($("#login_from").serialize());
                        $("#login_from").submit(function ()
                            {
                                $.ajax(
                                    {
                                        url: "../account/LoginSvc",
                                        data: $("#login_from").serialize(),
                                        type: 'POST',
                                        success: function (data_auth) {
                                            if (data_auth === "-1") { alert("登录失败"); return; }
                                            else
                                            {
                                                $("#overlay").hide();
                                                site_nav.setCookie("is_login",true);
                                                site_nav.username= $("#login_from > #login_key").text();
                                                ResetAccountInfo();
                                                site_nav.openMenu(hash);
                                            }
                                        } //显示操作提示
                                    });
                                return false;
                            }
                        );
                    }
                });
                return;
            }
        } ,
    afterBuildPageView: function (pageKey) { console.log('afterBuildPageView'); /*to override*/ },
        //构建页面视图
        buildPageView: function (pageKey) {
            console.log('buildPageView()');
            if (pageKey === "timeline") {
                if ("undefined" !== typeof (Timeline)) {
                    var timelineType = UrlHelper.queryStr("typeId");
                    if (undefined === timelineType)
                        timelineType = 1;
                    changeTimeLineDisplay(timelineType, window.is_mobile());
                }
            }
            else if (pageKey === "chat") {
               if(!socket_client.isConnected)
                    socket_client.connect();
                $("#btn_send_chat").bind("click", this, socket_client.send);
            }
            if(this.afterBuildPageView!==null)
                this.afterBuildPageView(pageKey);
        },
        isColorMenu: function (e) {
            var i = 1;
            var flag = false;

            if (e[0].className.indexOf("s tp_color") >= 0) {
                flag = true;
            }
            return flag
        },

        getCookieVal: function (offset) {
            var endstr = document.cookie.indexOf(";", offset);
            if (endstr == -1) {
                endstr = document.cookie.length;
            }
            return unescape(document.cookie.substring(offset, endstr));
        },

        getCookie: function (name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen) {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg) {
                    return this.getCookieVal(j);
                }
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0) break;
            }
            return null;
        },

        setCookie: function (name, value, expires, path, domain, secure) {
            document.cookie = name + "=" + escape(value) +
            ((expires) ? "; expires=" + expires : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
        },

        deleteCookie: function (name, path, domain) {
            if (this.getCookie(name)) {
                document.cookie = name + "=" +
              ((path) ? "; path=" + path : "") +
              ((domain) ? "; domain=" + domain : "") +
              "; expires=Thu, 01-Jan-1970 00:00:01 GMT";
            }
        },
        Events: {
            onHashChange: function (e) {
                e.preventDefault();
                var hash = '#!' + window.location.hash.replace(/#|!/gi, '');
                site_nav.openMenu(hash);
            },

            menuClick: function (e) {
                var s_m = $(this);   //当前单击选择的菜单项

                if (site_nav.isColorMenu(s_m)) {
                    e.preventDefault();

                    if (!s_m.hasClass('open')) {
                        var hash = s_m.attr('href') !== '#' ? s_m.attr('href').replace(/#|!/gi, '') : s_m.data('name');
                        window.location.hash = '#!' + hash;

                        if (site_nav.ie7) {
                            site_nav.openMenu('#!' + hash);
                        }
                    }
                }
            }
        }
    };
}());


var myid = 0;
//socket通信客户端
function SocketClient() {
    var a = this, b = document.body;
    this.isConnected = false;
    this.socket = null;
    this.readyStatus = new Array("正在连接", "已建立连接", "正在关闭连接", "已关闭连接");
    this.socket_server_url = site_nav.is_windows_socketserver ? "ws://" + '192.168.179.1' +":8023/" : "ws://" + location.hostname+':8025/';  //ws://192.168.179.1:8088
    alert(this.socket_server_url);
    this.addMsg = function (msg) {
        var now = new Date();
        var time = now.toLocaleTimeString();
        var message = document.getElementById("message");
        if (message !== null)
            message.innerHTML += "" + time + ":" + msg + "</p>";
    };

    this.getUserName = function (id) {
        var name = "All";
        for (var n = 0; n < document.getElementById("selOnline").options.length; n++) {
            if (document.getElementById("selOnline").options[n].value == id) {
                name = document.getElementById("selOnline").options[n].text;
                break;
            }
        }
        return name;
    };

    //连接至服务器
    this.connect = function () {
        var name = "user" + Math.floor(Math.random() * 10000 + 1);
        if (name.length < 2) { alert("请输入您的昵称."); return; }

        //尝试连接至服务器
        try {
            var Socket = window.MozWebSocket || window.WebSocket;
            //var protos = ['foo', 'bar', 'xmpp'];
            console.log(Socket);
            console.log(a.socket_server_url);
            a.socket = new Socket(a.socket_server_url);
        } catch (exception) {
            console.log(exception);
            a.isConnected = false;
            this.addMsg("对不起，您所使用的浏览器不支持WebSocket.");
            return;
        }
        //连接成功
        a.socket.onopen = function () {
            if (!a.checkStatus()) return;
            a.socket.send("LIN,0,0," + name);
            a.isConnected = true;
        }

        //收到消息
        a.socket.onmessage = function (msg) {
            console.log(msg.data);
            if (!a.checkStatus()) return;
            //返回的数据msg.data，包含了协议中的4部分
            var arrays = msg.data.split(',');
            if (arrays.length != 4) return;

            if (arrays[0] == "LIN") {
                document.getElementById("selOnline").options.add(new Option(arrays[3], arrays[1]));
                document.getElementById("selMsgTo").options.add(new Option(arrays[3], arrays[1]));
                a.addMsg("[" + arrays[3] + "] Hello 大家好 .");
            }
            else if (arrays[0] == "OLN") {
                //如果返回的是在线好友列表，则协议串中的去向即代表自己的ID，第4个为好友列表的内容，格式如：1|张三丰;2|梅超风
                myid = arrays[2];
                var ss = arrays[3].split(';');
                document.getElementById("selMsgTo").options.length = 0;
                document.getElementById("selOnline").options.length = 0;
                document.getElementById("selMsgTo").options.add(new Option("所有人", "0"));
                //刷新在线列表和发送对象列表
                for (var n = 0; n < ss.length; n++) {
                    var items = ss[n].split('|');
                    var item = new Option(items[1], items[0]);
                    var item1 = new Option(items[1], items[0]);
                    document.getElementById("selOnline").options.add(item);
                    document.getElementById("selMsgTo").options.add(item1);
                }
            }
            else if (arrays[0] == "MSG") {
                var from = a.getUserName(arrays[1]);
                var to = a.getUserName(arrays[2]);
                a.addMsg(from + "     @" + to + ":" + arrays[3]);
            }
            else if (arrays[0] == "OUT") {
                var from = a.getUserName(arrays[1]);
                var to = a.getUserName(arrays[2]);
                a.addMsg(from + " 退出.");
            }
        }

        //连接断开
        a.socket.onclose = function (event) {
            a.isConnected = false;
            a.addMsg("\t  Socket状态:" + a.readyStatus[a.socket.readyState]);
        }
    };


    //发送
    this.send = function () {
        if (!a.checkStatus()) return;
        var text = document.getElementById("txtSend").value;
        var message = document.getElementById("message");

        if (text == "") {
            alert("发送的消息不能为空.");
            return;
        }
        try {
            a.socket.send("MSG," + myid + "," + document.getElementById("selMsgTo").value + "," + text);
            a.addMsg("我说：" + text);
        }
        catch (exception) {
            message.innerHTML += "<p>发送数据出错.</p>";
        }
    };

    this.checkStatus = function () {
        var flag = false;
        if (document.getElementById("chat_panel") === null)
            flag = false;
        else if (a.socket.readyState == 1)
            flag = true;
        else
            a.addMsg("\t  Socket状态:" + a.readyStatus[a.socket.readyState]);
        return flag;
    };

    //断开连接
    this.disconnect = function () {
        if (!a.checkStatus()) return;
        a.socket.close();
        isConnected = false;
    };
};

//时间轴定义
function Timeline(h, p, r) {
    var a = this,
        s = $(document.body);
    this._lightbox = this._overlay = this._spine = this._container = null;
    this._data = p;         //时间轴数据
    this._options = {
        separator: "year",  //按年分隔
        columnMode: "dual",
        order: "desc",      //默认降序
        defaultElementWidth: 400,   //时间轴元素的默认宽度
        animation: !0,              //是否使用动画
        lightbox: !0,
        allowDelete: !0,            //是否允许删除
        max: null
    };
    this._years = [];
    this._months = [];
    this._readmore_text = "更多>>";
    this._month_translation = "一月 二月 三月 四月 五月 六月 七月 八月 九月 十月 十一月 十二月".split(" ");
    this._spine_margin = 100;
    this._max_element_width = 0;
    this._elements = [];
    this._separators = [];
    this._iframe_queue = [];
    this._use_css3 = function () {
        var a = document.body.style;
        if ("string" == typeof a.transition)
            return !0;
        for (var d = ["Webkit", "Moz", "Khtml", "O", "ms"], c = 0; c < d.length; c++)
            if ("string" == typeof a[d[c] + "Transition"])
                return !0;
        return !1
    }();
    this._default_element_data = {
        type: "blog_post",
        date: "2000-01-01",
        dateFormat: "YYYY年 MMMM DD日",
        width: 400,
        title: null,
        content: null,
        image: null,
        readmore: null,
        height: 300,
        images: [],
        speed: 5E3,
        url: null
    };

    this._createElement = function (b, d, column_direction) {
        b.width || (b.width = a._options.defaultElementWidth);
        b = $.extend({}, a._default_element_data, b);
        var c = $("<div>").addClass("timeline_element " + b.type).width(b.width);
        a._options.animation || c.addClass("animated");
        null !== b.title ?
        $("<div>").addClass("title").html('<span class="label">' + b.title + '</span><span class="date">' + a._getDateString(b.date, b.dateFormat) + "</span>").appendTo(c) : c.addClass("notitle");

        if ("undefine" !== column_direction) {
            var trigon_container = $("<div>").addClass("trigon_container_" + column_direction).appendTo(c);
        }

        switch (b.type) {
            case "iframe":
                var f = $("<div>").addClass("content loading").height(b.height).appendTo(c);
                a._iframe_queue.push({ element: f, url: b.url }); break;
            case "blog_post":
                null !== b.image && (f = $("<div>").addClass("img_container").append($("<img>").attr("src", b.image)).appendTo(c),
                a._options.lightbox && f.append($("<div>").addClass("img_overlay").html('<span class="magnifier" data-type="blog_post" data-img="' + b.image + '"></span>')));
                null !== b.content && $("<div>").addClass("content").html(b.content).appendTo(c);
                null !== b.readmore && $("<div>").addClass("readmore").html('<a href="' + b.readmore + '">' + a._readmore_text + "</a>").appendTo(c); break;
            case "gallery":
                if (b.images.length) {
                    var f = $("<div>").addClass("scroll_container").appendTo(c), g = "";
                    $(b.images).each(function (c, d) {
                        g += '<div class="img_container"><img height="' + b.height + '" src="' + d + '" />';
                        a._options.lightbox && (g += '<div class="img_overlay"><span class="magnifier" data-total="' + b.images.length + '" data-order="' + c + '" data-type="gallery" data-img="' + d + '"></span></div>');
                        g += "</div>"
                    });
                    f.html(g)
                } break;
            case "slider":
                var e = "";
                $(b.images).each(function (c, d) {
                    e += '<div data-total="' +
                    b.images.length + '" data-order="' + c + '" class="img_container' + (0 === c ? " active" : "") + '" style="display:' + (0 === c ? "block" : "none") + ';"><img src="' + d + '" />';
                    a._options.lightbox && (e += '<div class="img_overlay"><span class="magnifier" data-total="' + b.images.length + '" data-order="' + c + '" data-type="slider" data-img="' + d + '"></span></div>');
                    e += "</div>"
                });
                1 < b.images.length && (e += '<span class="slider_prev"></span><span class="slider_next"></span>');
                $("<div>").addClass("content").width(b.width).height(b.height).html(e).appendTo(c);
                1 < b.images.length && (c.data("speed", b.speed), setTimeout(function () { a._updateSlider(c, "next") }, b.speed))
        }
        a._options.allowDelete && $("<div>").addClass("del").data("timeline_element", c).text("删除").appendTo(c);
        c.appendTo(d);
        a._max_element_width = Math.max(a._max_element_width, b.width);
        a._elements.push(c);
        return c
    };

    this._deleteElement = function (a) {
        var d = a.parent();
        a.fadeOut();
        d.children(".timeline_element").length || d.fadeOut()
    };

    this._createSeparator = function (b) {
        b = $("<div>").addClass("date_separator").attr("id",
        "timeline_date_separator_" + b).html("<span>" + b + "</span>").appendTo(a._container);
        a._options.animation || b.addClass("animated"); a._separators.push(b)
    };

    this._setContinerWidth = function () {
        a._max_element_width && (
        "dual" === a._options.columnMode
        ? a._container.width(2 * a._max_element_width + a._spine_margin)
        : a._container.width(a._max_element_width + a._spine_margin))
    };

    this._render = function (b, d) {
        a._sortData(b);
        var c = null, f = null, g = null, e = !0;
        $(b).each(function (b, m) {
            if (null !== a._options.max && a._options.max <= b)
                return !1;
            var n = parseInt(m.date.split("-")[0], 10),
                l = parseInt(m.date.split("-")[1], 10);
            10 > l && (l = "0" + l);
            var l = n + "-" + l,
                q = !1;

            -1 !== $.inArray(n, a._years)
            || "year" !== a._options.separator
            && null !== a._options.separator
            || (q = !0, a._years.push(n));

            -1 !== $.inArray(l, a._months)
            || "month" !== a._options.separator
            && "month_year" !== a._options.separator
            || (q = !0, a._months.push(l));

            var k = "";
            if ("year" === a._options.separator)
                k = "year_" + n;
            else if ("month" === a._options.separator || "month_year" === a._options.separator)
                k = "month_" + l;
            if (q) {
                "year" === a._options.separator
                ? 1 < a._years.length && a._createSeparator(n)
                : ("month" === a._options.separator
                || "month_year" === a._options.separator) && 1 < a._months.length &&
                (
                    l = a._month_translation[parseInt(l.split("-")[1], 10) - 1],
                    "month_year" === a._options.separator && (l = l + " " + n),
                    a._createSeparator(l)
                );
                switch (a._options.columnMode) {
                    case "dual":
                        c = $("<div>").addClass("column column_left " + k).appendTo(a._container);
                        f = $("<div>").addClass("column column_right " + k).appendTo(a._container); break;
                    case "left":
                        c = $("<div>").addClass("column column_left " + k).appendTo(a._container); break;
                    case "right":
                        f = $("<div>").addClass("column column_right " + k).appendTo(a._container); break;
                    case "center":
                        g = $("<div>").addClass("column column_center " + k).appendTo(a._container)
                }
                e = !0
            }
            else if (!0 === d)
                switch (a._options.columnMode) {
                    case "dual":
                        null === c && (c = a._container.find(".column_left." + k), e = 0 === a._container.find(k).children().length % 2 ? !0 : !1);
                        null === f && (f = a._container.find(".column_right." + k), e = 0 === a._container.find(k).children().length % 2 ? !0 : !1); break;
                    case "left":
                        c = null !== c
                            ? c : $(".column_left." + k); break;
                    case "right":
                        f = null !== f ? f : $(".column_right." + k); break;
                    case "center":
                        g = null !== g ? g : $(".column_center." + k)
                }
            switch (a._options.columnMode) {
                case "dual":
                    a._createElement(m, e ? c : f, e ? "left" : "right"); break;
                case "left":
                    a._createElement(m, c, "left"); break;
                case "right":
                    a._createElement(m, f, "right"); break;
                case "center":
                    a._createElement(m, g)
            }
            e = e ? !1 : !0
        });
        a._setContinerWidth()
    };

    this._updateSlider = function (b, d) {
        b.data("timeout_id") && clearTimeout(b.data("timeout_id"));
        if (!this._options.lightbox || !a._overlay.hasClass("open")) {
            var c = b.find(".img_container.active").removeClass("active"),
                f = "next" === d ? c.data("order") === c.data("total") - 1
                ? b.find(".img_container:first").addClass("active")
                : c.next().addClass("active") : 0 === c.data("order")
                ? b.find(".img_container:last").addClass("active")
                : c.prev().addClass("active");
            c.fadeOut();
            f.fadeIn()
        }
        c = setTimeout(function () {
            a._updateSlider(b, d)
        }, b.data("speed"));
        b.data("timeout_id", c)
    };

    this._startAnimation = function (b, d) {
        $(window).width();
        a._use_css3
        ? a._spine.addClass("animated")
        : a._spine.animate(
            { bottom: "0%" },
            500,
            function () {
                a._spine.addClass("animated")
            });
        "year" !== a._options.separator
        && "month" !== a._options.separator
        && "month_year" !== a._options.separator
        || setTimeout(
            function () {
                $(a._separators).each(
                    function (b, c) {
                        a._use_css3 ? c.addClass("animated")
                        : c.children("span").animate({ opacity: 1, top: "50%" }, 300, function () { c.addClass("animated") })
                    })
            }, 500);
        var c = 0;
        $(a._elements).each(
            function (d, g) {
                g.hasClass("animated") || (c++, setTimeout(function (c) {
                    a._use_css3 ? g.addClass("animated") : g.hide().addClass("animated").fadeIn();
                    d === a._elements.length - 1 && setTimeout(b, 200)
                },
                ("year" === a._options.separator || "month" === a._options.separator || "month_year" === a._options.separator ? 1E3 : 500) + 100 * c))
            });
        return !0
    };

    this._getDateString = function (a, d) {
        var c = a.split("-");
        if (3 <= c.length)
            var f = c[0], g = c[1], e = c[2];
        else 2 === c.length
            ? (f = c[0], g = c[1], e = "01")
            : 1 === c.length && (f = c[0], e = g = "01");
        return moment(f + "-" + g + "-" + e).format(d)
    };

    this._sortData = function (b) {
        b.sort(function (b, c) {
            return "desc" === a._options.order
                ? parseInt(c.date.replace(/-/g, ""), 10) - parseInt(b.date.replace(/-/g, ""), 10)
                : parseInt(b.date.replace(/-/g, ""), 10) - parseInt(c.date.replace(/-/g, ""), 10)
        });
        return b
    };

    this._display = function () {
        !0 !== $(document).data("timeline_events_binded")
        && $(document).data("timeline_events_binded", !0).click(a._handleClick).keydown(a._handleKeyDown);
        a._options.lightbox &&
        (
            a._overlay = $(".timeline_overlay"),
            a._overlay.length
            ? a._lightbox = a._overlay.children(".lightbox")
            : (a._overlay = $("<div>").addClass("timeline_overlay"),
            a._lightbox = $("<div>").addClass("lightbox").html('<span class="prev"></span><span class="next"></span>').appendTo(a._overlay),
            a._overlay.appendTo(s))
        );
        a._container = $("<div>").addClass("timeline " + a._options.columnMode);
        $.support.opacity || a._container.addClass("opacityFilter"); a._use_css3 || a._container.addClass("noneCSS3");
        a._spine = $("<div>").addClass("spine").appendTo(a._container);
        a._options.animation || a._spine.addClass("animated");
        a._render(a._data);
        a._container.data("loaded", !0).appendTo(h);
        a._options.animation
        ? setTimeout(function () { a._startAnimation(a._processIframeQueue) }, 200)
        : a._processIframeQueue();
        return !0
    };

    this._openLightBox =
    function (b, d) {
        b.parent().addClass("loading");
        "gallery" === b.data("type") || "slider" === b.data("type")
        ? (a._lightbox.children("span").show(), a._lightbox.data("magnifier", b), a._toggleLightBoxControl(parseInt(b.data("total"), 10), parseInt(b.data("order"), 10)))
        : a._lightbox.children("span").hide();
        setTimeout(function () {
            var c = new Image;
            c.onload = function () {
                b.parent().removeClass("loading");
                a._overlay.addClass("open");
                $("<img>").attr("src", d).appendTo(a._lightbox);
                var f = a._getLightboxSize(c.width, c.height),
                    f = { width: f.width, height: f.height, margin: "-" + f.height / 2 + "px 0px 0px -" + f.width / 2 + "px" };
                a._use_css3 ? a._lightbox.addClass("loaded").css(f) : a._lightbox.css(f).animate({ top: "50%", opacity: 1 }, 300,
                    function () { a._lightbox.addClass("loaded") })
            };
            c.src = d
        }, 1E3);
        return d
    };

    this._closeLightBox = function (b) {
        a._use_css3 ? a._lightbox.removeClass("loaded")
        : a._lightbox.animate({ top: 0, opacity: 0 }, 300,
            function () { a._lightbox.removeClass("loaded") });
        setTimeout(function () {
            a._overlay.removeClass("open");
            a._lightbox.removeAttr("style").children("img").remove()
        },
        300)
    };

    this._getLightboxSize = function (width, height) {
        var c = 0.9 * $(window).width(),
            f = 0.9 * $(window).height(),
            g = width,
            e = height;
        if (width > c || height > f)
            width > c && height <= f
                ? (g = c, e = height / (width / g))
                : height > f && width <= c
                ? (e = f, g = width / (height / e))
                : (g = c, e = height / (width / g), e > f && (e = f, g = width / (height / e)));
        return { width: g, height: e }
    };

    this._navLightBox = function (b, d) {
        var c = "next" === d
            ? a._lightbox.data("magnifier").parents(".img_container:first").next().find("span.magnifier")
            : a._lightbox.data("magnifier").parents(".img_container:first").prev().find("span.magnifier"),
            f = c.data("img"),
            g = new Image;
        g.onload = function () {
            a._lightbox.data("magnifier", c).addClass("updating");
            a._lightbox.children("img").attr("src", f);
            var b = a._getLightboxSize(g.width, g.height),
                b = { width: b.width, height: b.height, margin: "-" + b.height / 2 + "px 0px 0px -" + b.width / 2 + "px" };
            a._use_css3 ? a._lightbox.css(b) : a._lightbox.animate(b, 500);
            a._toggleLightBoxControl(parseInt(c.data("total"), 10), parseInt(c.data("order"), 10));
            setTimeout(function () {
                a._lightbox.removeClass("updating")
            }, 500)
        };
        g.src = f
    };

    this._toggleLightBoxControl = function (total, order) {
        1 >= total
        ? a._lightbox.children("span").hide()
        : (0 === order
            ? a._lightbox.children("span.prev").hide()
            : a._lightbox.children("span.prev").show(),
            order === total - 1
            ? a._lightbox.children("span.next").hide()
            : a._lightbox.children("span.next").show())
    };

    this._processIframeQueue = function () {
        $(a._iframe_queue).each(function (a, d) {
            d.element.removeClass("loading").html('<iframe frameborder="0" src="' + d.url + '"></iframe>')
        })
    };

    this._handleClick = function (b) {
        var d = $(b.target);
        d.hasClass("timeline_overlay")
        ? a._closeLightBox(b)
        : d.hasClass("magnifier")
        ? a._openLightBox(d, d.data("img"))
        : d.hasClass("prev")
        ? a._navLightBox(d, "prev")
        : d.hasClass("next")
        ? a._navLightBox(d, "next")
        : d.hasClass("slider_prev")
        ? a._updateSlider(d.parents(".timeline_element:first"), "prev")
        : d.hasClass("slider_next")
        ? a._updateSlider(d.parents(".timeline_element:first"), "next")
        : d.hasClass("del") && a._deleteElement(d.data("timeline_element"));
        return !0
    };

    this._handleKeyDown = function (b) {
        switch (parseInt(b.which, 10)) {
            case 27:
                a._overlay.hasClass("open") && a._closeLightBox(b);
                break;
            case 37:
                if (a._lightbox.hasClass("loaded") && a._lightbox.children("span.prev").is(":visible"))
                    return a._lightbox.children("span.prev").click(), !1;
                break;
            case 39:
                if (a._lightbox.hasClass("loaded") && a._lightbox.children("span.next").is(":visible"))
                    return a._lightbox.children("span.next").click(), !1
        }
    };

    this.setOptions = function (b) {
        a._options = $.extend(a._options, b);
        return a._options
    };

    this.display = function () {
        if (a._data)
            a._display()
    };

    this.appendData = function (b) {
        var d = parseInt(a._data[a._data.length - 1].date.replace(/-/g, ""), 10),
            c = [];
        "desc" === a._options.order
        ? $(b).each(function (a, b) {
            parseInt(b.date.replace(/-/g, ""), 10) <= d && c.push(b)
        })
        : $(b).each(function (a, b) {
            parseInt(b.date.replace(/-/g, ""), 10) >= d && c.push(b)
        });
        a._data = a._data.concat(c);
        a._render(c, !0);
        a._options.animation
        ? a._startAnimation(a._processIframeQueue, !0)
        : a._processIframeQueue()
    }
};
 