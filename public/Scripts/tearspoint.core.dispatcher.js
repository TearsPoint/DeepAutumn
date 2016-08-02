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


/* 雨滴 */
function raindrops() {
    var image = document.getElementById('background');
    image.onload = function () {
        var engine = new RainyDay('canvas', 'background', window.innerWidth, window.innerHeight, 1, UrlHelper.getURLParameter("blur") || 20);

        var preset = UrlHelper.getURLParameter("preset") || 1;
        if (preset == 1) {
            engine.gravity = engine.GRAVITY_NON_LINEAR;
            engine.trail = engine.TRAIL_DROPS;
            engine.rain([engine.preset(3, 3, 0.88), engine.preset(5, 5, 0.9), engine.preset(6, 2, 1)], 100);
        } else if (preset == 2) {
            engine.gravity = engine.GRAVITY_NON_LINEAR;
            engine.trail = engine.TRAIL_DROPS;
            engine.VARIABLE_GRAVITY_ANGLE = Math.PI / 8;
            engine.rain([engine.preset(0, 2, 0.5), engine.preset(4, 4, 1)], 50);
        } else if (preset == 3) {
            engine.gravity = engine.GRAVITY_NON_LINEAR;
            engine.trail = engine.TRAIL_SMUDGE;
            engine.rain([engine.preset(0, 2, 0.5), engine.preset(4, 4, 1)], 50);
        }
    };
    image.src = "../images/bg.jpg";
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
}



//改变时间轴显示模式
function changeTimeLineDisplay(type, is_mobile) {
    $('#timeline').remove();
    var wrapper = $('<div>').attr('id', 'timeline').appendTo('#main');

    if (is_mobile) {
        wrapper.addClass('mobile');
    }

    var timeline_data = [];
    var options = {};

    $('#timeline').addClass('demo' + type);

    timeline_data = [
               {
                   type: 'blog_post',
                   date: '2014-05-17',
                   title: '文摘',
                   content: '终于明白，有些路，只能一个人走。那些邀约好同行的人，一起相伴雨季，走过年华，但有一天终究会在某个渡口离散。红尘陌上，独自行走，绿萝拂过衣襟，青云打湿诺言。山和水可以两两相忘，日与月可以毫无瓜葛。那时候，只一个人的浮世清欢，一个人的细水长流'
               },
               {
                   type: 'blog_post',
                   date: '2014-04-16',
                   title: '文摘',
                   content: '都说世相迷离，我们常常在如烟世海中丢失了自己，而凡尘缭绕的烟火又总是呛得你我不敢自由呼吸。千帆过尽，回首当年，那份纯净的梦想早已渐行渐远，如今岁月留下的，只是满目荒凉'
               },
               {
                   type: 'slider',
                   date: '2013-12-16',
                   width: 400,
                   height: 150,
                   images: ['../images/bg2.jpg', '../images/bg3.jpg'],
                   speed: 5000
               },
               {
                   type: 'blog_post',
                   date: '2013-12-01',
                   title: '文摘',
                   content: '有人说，爱上一座城，是因为城中住着某个喜欢的人。其实不然，爱上一座城，也许是为城里的一道生动风景，为一段青梅往事，为一座熟悉老宅。或许，仅仅为的只是这座城。就像爱上一个人，有时候不需要任何理由，没有前因，无关风月，只是爱了。'
               },
                {
                    type: 'blog_post',
                    date: '2013-01-01',
                    title: '文摘',
                    content: '邂逅一个人，只需片刻，爱上一个人，往往会是一生。萍水相逢随即转身不是过错，刻骨相爱天荒地老也并非完美。在注定的因缘际遇里，我们真的是别无他法。'
                },
                {
                    type: 'blog_post',
                    date: '2013-02-01',
                    title: '文摘',
                    content: '每个人都知道天下没有不散的宴席，可还是信誓旦旦地承诺永远。永远到底有多远？多少人问过这句话。有人说，永远是明天；也有人说，永远是一辈子；还有人说，永远是永生永世。或许他们都说对了，也或许都说错了，又或许人间原本就没有什么是永远。你曾经千里迢迢来赶赴一场盟约，有一天也会骤然离去，再相逢已成隔世。'
                }, {
                    type: 'blog_post',
                    date: '2013-03-01',
                    title: '文摘',
                    content: '许多人都做了岁月的奴，匆匆地跟在时光背后，忘记自己当初想要追求的是什么，如今得到的又是什么。'
                },
               {
                   type: 'gallery',
                   date: '2011-04-12',
                   title: '画廊',
                   width: 400,
                   height: 150,
                   images: ['../images/bg1.jpg', '../images/bg2.jpg', '../images/bg3.jpg']
               },
               {
                   type: 'blog_post',
                   date: '2011-08-03',
                   title: '相信',
                   width: 400,
                   content: "我们应当相信，每个人都是带着使命来到人间的。无论他多么的平凡渺小，多么的微不足道，总有一个角落会将他搁置，总有一个人需要他的存在。有些人在属于自己的狭小世界里，守着简单的安稳与幸福，不惊不扰地过一生。有些人在纷扰的世俗中，以华丽的姿态尽情地演绎一场场悲喜人生",
                   image: '../images/love.jpg',
                   readmore: ''
               }
    ];

    switch (type) {
        case 1:

            options = {
                animation: true,
                lightbox: true,
                showYear: true,
                allowDelete: false,
                columnMode: 'dual'
            };
            break;
        case 2:
            options = {
                animation: true,
                lightbox: true,
                showYear: false,
                allowDelete: true,
                columnMode: 'dual'
            };
            break;
        case 3:
            options = {
                animation: true,
                lightbox: true,
                showYear: false,
                allowDelete: false,
                columnMode: 'left'
            };
            break;
        case 4:
            options = {
                animation: true,
                lightbox: true,
                showYear: false,
                allowDelete: false,
                columnMode: 'right'
            };
            break;
        case 5:
            options = {
                animation: true,
                lightbox: true,
                showYear: true,
                allowDelete: false,
                columnMode: 'center'
            };
            break;
    }

    var timeline = new Timeline($('#timeline'), timeline_data);
    timeline.setOptions(options);
    timeline.display();
}


var scripts = {
    // 'baidu_stat': '//hm.baidu.com/hm.js?7b75b0a60e7eee892a399711f7358a01',
    //'top':'http://l.tbcdn.cn/apps/top/x/sdk.js?appkey=21792936'
}

var images = {
    'orderedList0': '../images/orderedList0.png',
    'orderedList1': '../images/orderedList1.png',
    'orderedList2': '../images/orderedList2.png',
    'orderedList3': '../images/orderedList3.png',
    'orderedList4': '../images/orderedList4.png',
    'orderedList5': '../images/orderedList5.png',
    'orderedList6': '../images/orderedList6.png',
    'orderedList7': '../images/orderedList7.png',
    'orderedList8': '../images/orderedList8.png',
    'orderedList9': '../images/orderedList9.png'
};


window.is_mobile = function is_mobile() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag;
}

window.is_loaded = false;
window.onload = function () {
    //绑定事件
    $(".a-exit").bind('click', DoClose);
    ResetAccountInfo();

    if ("undefined" !== typeof (Royal_Preloader)) {
        Royal_Preloader.config({
            scripts : scripts,
            images: images,
            mode: 'text',
            text: 'welcome 13hike - loding...',
            background: ['#000']   //#2bc9fd
        });


        Royal_Preloader.onLoadFinish = (function () {
            if (window.is_loaded) return;
            window.is_loaded = true;

            var bgc = document.getElementById("bgAllImage");
            var h_container = document.getElementById("header_container");
            if (bgc === null && h_container !== null) {
                bgc = $("<div>").attr("id", "bgAllImage");
                $("<img>").addClass("bgAllImage").attr("src", "../images/mac_bg/Andromeda Galaxy.jpg").appendTo(bgc);
                $(bgc).insertBefore($(h_container));
                $(h_container).slideDown(2000);
            }

            setTimeout(function () {
                $(document.body).addClass('loaded');
            }, 500);

            $(document.body).css("background-image", "url(" + images.wallpaper0 + ")");

            site_nav.init();


            var trees = $(".tree");
            trees.each(function (index, element) {
                var childs = $(element).children();  //取得树面板下的几个结点
                initTree(childs);
            });
        });
        if ("undefined" !== typeof (jQuery)) {
            $(document).ready(function () {
                Royal_Preloader._init();
            });
        }
    }

    if ("undefined" !== typeof (RainyDay))
        raindrops();
};

function ResetAccountInfo()
{
    var isLogin = site_nav.getCookie("is_login");
    if (!isLogin) {
        console.log(  $(".div_account"));
        window.site_nav.username="游客";
        $(".div_account > #account-name").text(window.site_nav.username);
       $(".div_account").hide();
    }
    else
    {
        if(site_nav.getCookie("u_name")!==undefined)
            window.site_nav.username = site_nav.getCookie("u_name");
      console.log(site_nav.getCookie("u_name"));
        $(".div_account > #account-name").text(window.site_nav.username);
        $(".div_account").show();
    }
}


function DoClose()
{
    alert("doclose()");
    window.site_nav.setCookie('is_login',false);
    window.site_nav.DoCheckLogin();
}
 
