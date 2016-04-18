(function (s) {
    var r = {
        init: function (b) {
            var q = "slidelefttoright slidelefttoleft slidelefttotop slidelefttobottom sliderighttoleft sliderighttoright sliderighttotop sliderighttobottom slidetoptotop slidetoptobottom slidetoptoleft slidetoptoright slidebottomtotop slidebottomtobottom slidebottomtoleft slidebottomtoright".split(" "),
                h = jQuery(this);
            jQuery('<div id="hidden_fsbs" />').hide().html(jQuery(this).html()).appendTo("body");
            if (Modernizr.csstransitions) {
                var p = b.animation_type;
                "randomslide" == b.animation_type && (p = q[Math.floor(Math.random() * q.length)]);
                jQuery(h).children().children().css(
                    {
                        "-webkit-animation-duration": parseInt(b.animation_time) + "s",
                        "-moz-animation-duration": parseInt(b.animation_time) + "s",
                        "-o-animation-duration": parseInt(b.animation_time) + "s",
                        "-ms-animation-duration": parseInt(b.animation_time) + "s",
                        "animation-duration": parseInt(b.animation_time) + "s"
                    });
                jQuery(this).children().each(function (a) {
                    "randomslide" == b.animation_type
                    && "randomslide" == b.animation_type
                    && (p = q[Math.floor(Math.random() * q.length)]);
                    jQuery(this).children(1).css(
                        "background-image",
                        "url(" + jQuery(this).children(1).children().attr("src") + ")");
                    var c = a * (b.animation_time / jQuery(h).children().length);
                    jQuery(this).children(0).css(
                        {
                            "-webkit-animation-name": p,
                            "-moz-animation-name": p,
                            "-o-animation-name": p,
                            "-ms-animation-name": p,
                            "animation-name": p,
                            "-webkit-animation-fill-mode": "forwards",
                            "-moz-animation-fill-mode": "forwards",
                            "-o-animation-fill-mode": "forwards",
                            "-ms-animation-fill-mode": "forwards",
                            "animation-fill-mode": "forwards",
                            "-webkit-animation-delay": c + "s",
                            "-moz-animation-delay": c + "s",
                            "-o-animation-delay": c + "s",
                            "-ms-animation-delay": c + "s",
                            "animation-delay": c + "s",
                            "-webkit-animation-iteration-count": "infinite",
                            "-moz-animation-iteration-count": "infinite",
                            "-o-animation-iteration-count": "infinite",
                            "-ms-animation-iteration-count": "infinite",
                            "animation-iteration-count": "infinite"
                        });
                    jQuery(this).children(0).html("Slider Image " + (a + 1))
                })
            }
            else {
                var m = 1,
                    l = function () {
                        var k = b.animation_type;
                        jQuery(h).children().each(
                            function (c) {
                                "randomslide" == b.animation_type
                                && (k = q[Math.floor(Math.random() * q.length)]);
                                "none" == jQuery(this).children(1).css("background-image")
                                && (jQuery(this).children(1).css(
                                    "background-image",
                                    "url(" + jQuery(this).children(1).children().attr("src") + ")"),
                                jQuery(this).children(1).css(
                                    "filter",
                                    "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + jQuery(this).children(1).children().attr("src") + "',sizingMethod='scale');"),
                                jQuery(this).children(1).css(
                                    "-ms-filter",
                                    "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + jQuery(this).children(1).children().attr("src") + "',sizingMethod='scale');"),
                                jQuery(this).children(0).html("Slider Image " + (c + 1)));
                                "crossfade" == k
                                && (jQuery(this).children(0).css("top", "0px").css("left", "0px").css("width", jQuery(window).width() + "px").css("height", jQuery(window).height() + "px"),
                                jQuery(this).children(0).delay(c * n).fadeTo(f, 0.2),
                                jQuery(this).children(0).delay(c * n).animate(
                                    {
                                        top: "-5px",
                                        left: "-15px",
                                        width: 1.05 * jQuery(this).children(0).width() + "px",
                                        height: 1.05 * jQuery(window).height() + "px"
                                    },
                                    f,
                                    "easeInOutQuad",
                                    function () {
                                        jQuery(this).children(0).fadeTo(a, 0.2);
                                        jQuery(this).children(0).animate(
                                            {
                                                top: "-1px",
                                                left: "-1px",
                                                width: 1.1 * jQuery(this).children(0).width() + "px",
                                                height: 1.1 * jQuery(window).height() + "px"
                                            },
                                            a,
                                            "easeInOutQuad")
                                    }),
                                jQuery(this).children(0).delay(f).fadeTo(d, 0.7),
                                jQuery(this).children(0).delay(f).animate(
                                    {
                                        top: "-5px",
                                        left: "-5px",
                                        width: 1.2 * jQuery(this).children(0).width() + "px",
                                        height: 1.2 * jQuery(window).height() + "px"
                                    },
                                    d,
                                    "easeInOutQuad",
                                    function () { }),
                                c == parseInt(jQuery(h).children().length - 1)
                                ? (jQuery(this).children(0).delay(f).animate(
                                    {
                                        top: "-7px", left: "-3px",
                                        width: 1.1 * jQuery(this).children(0).width() + "px", height: 1.1 * jQuery(window).height() + "px"
                                    }, d, "easeInOutQuad",
                                    function () {
                                        jQuery(this).children().children().first().css("top", "0px").css("left", "0px").css("width", jQuery(window).width() + "px").css("height", jQuery(window).height() + "px"); jQuery(this).children().children().first().fadeTo(f, 0.2)
                                    }),
                                jQuery(this).children(0).delay(a).fadeOut(e, function () { l() }))
                                : (jQuery(this).children(0).delay(f).animate(
                                    {
                                        top: "-3px", left: "-7px",
                                        width: 1.07 * jQuery(this).children(0).width() + "px", height: 1.07 * jQuery(window).height() + "px"
                                    },
                                    d, "easeInOutQuad", function () { }),
                                jQuery(this).children(0).delay(a).fadeOut(e)));
                                if ("slidefade" == k || "rotatefade" == k) {
                                    var g = 0 < c
                                        ? c * (n + f + a)
                                        : 0; 1 < m && 0 == c
                                        ? (jQuery(this).children(0).fadeTo(a, 0.2),
                                            jQuery(this).children(0).animate(
                                            {
                                                top: "-1px", left: "-1px",
                                                width: 1.1 * jQuery(window).width() + "px", height: 1.1 * jQuery(window).height() + "px"
                                            }, a, "easeInOutQuad"))
                                        : (jQuery(this).children(0)
                                            .css("top", jQuery(window).height() / 4 + "px")
                                            .css("left", jQuery(window).width() / 4 + "px")
                                            .css("width", jQuery(window).width() / 2 + "px")
                                            .css("height", jQuery(window).height() / 2 + "px"),
                                        jQuery(this).children(0)
                                            .delay(c * n + g)
                                            .fadeTo(f, 0.2)
                                            .animate({
                                                top: "-5px", left: "-15px", width: 1.05 * jQuery(window).width() + "px",
                                                height: 1.05 * jQuery(window).height() + "px"
                                            }, f, "easeInOutQuad", function () { jQuery(this).children(0).fadeTo(a, 0.2); jQuery(this).children(0).animate({ top: "-1px", left: "-1px", width: 1.1 * jQuery(window).width() + "px", height: 1.1 * jQuery(window).height() + "px" }, a, "easeInOutQuad", function () { }) })); jQuery(this).children(0).delay(f).fadeTo(d, 0.7); jQuery(this).children(0).delay(f).animate({ top: "-5px", left: "-5px", width: 1.2 * jQuery(window).width() + "px", height: 1.2 * jQuery(window).height() + "px" }, d, "easeInOutQuad", function () { }); c == parseInt(jQuery(h).children().length - 1) ? (jQuery(this).children(0).delay(f).fadeTo(a, 0.2), jQuery(this).children(0).delay(f).animate({ top: jQuery(window).height() / 4 + "px", left: jQuery(window).width() / 4 + "px", width: jQuery(window).width() / 2 + "px", height: jQuery(window).height() / 2 + "px" }, d, "easeInOutQuad", function () { }), jQuery(this).children(0).delay(a).fadeOut(a, function () { l() })) : (jQuery(this).children(0).delay(f).animate({ top: jQuery(window).height() / 4 + "px", left: jQuery(window).width() / 4 + "px", width: jQuery(window).width() / 2 + "px", height: jQuery(window).height() / 2 + "px" }, d, "easeInOutQuad", function () { }), jQuery(this).children(0).delay(a).fadeOut(a, function () { c == parseInt(jQuery(h).children().length - 2) && (jQuery(this).children().children().first().css("top", jQuery(window).height() / 4 + "px").css("left", jQuery(window).width() / 4 + "px").css("width", jQuery(window).width() / 2 + "px").css("height", jQuery(window).height() / 2 + "px"), jQuery(this).children().children().first().fadeTo(f, 0.2).animate({ top: "-5px", left: "-15px", width: 1.05 * jQuery(window).width() + "px", height: 1.05 * jQuery(window).height() + "px" }, f, "easeInOutQuad", function () { jQuery(this).children(0).fadeTo(a, 0.2); jQuery(this).children(0).animate({ top: "-1px", left: "-1px", width: 1.1 * jQuery(window).width() + "px", height: 1.1 * jQuery(window).height() + "px" }, a, "easeInOutQuad") })) }))
                                } "slidelefttoright" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", jQuery(window).height() / 8 + "px").css("left", "-" + jQuery(this).width() + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ left: jQuery(window).width() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ left: jQuery(window).width() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "slidelefttoleft" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", jQuery(window).height() / 8 + "px").css("left", "-" + jQuery(this).width() + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ left: jQuery(window).width() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ left: "-" + jQuery(window).width() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "slidelefttotop" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", jQuery(window).height() / 8 + "px").css("left", "-" + jQuery(this).width() + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ left: jQuery(window).width() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ top: "-" + jQuery(window).height() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "slidelefttobottom" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", jQuery(window).height() / 8 + "px").css("left", "-" + jQuery(this).width() + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ left: jQuery(window).width() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ top: 2 * jQuery(window).height() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "sliderighttoright" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", jQuery(window).height() / 8 + "px").css("left", 1.5 * jQuery(this).width() + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ left: jQuery(window).width() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ left: 1.5 * jQuery(window).width() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "sliderighttoleft" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", jQuery(window).height() / 8 + "px").css("left", 1.5 * jQuery(this).width() + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ left: jQuery(window).width() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ left: "-" + jQuery(window).width() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "sliderighttotop" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", jQuery(window).height() / 8 + "px").css("left", 1.5 * jQuery(this).width() + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ left: jQuery(window).width() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ top: "-" + jQuery(window).height() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "sliderighttobottom" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", jQuery(window).height() / 8 + "px").css("left", 1.5 * jQuery(this).width() + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ left: jQuery(window).width() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ top: 2 * jQuery(window).height() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "slidetoptotop" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", "-" + jQuery(window).height() + "px").css("left", jQuery(this).width() / 8 + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ top: jQuery(window).height() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ top: "-" + jQuery(window).height() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "slidetoptobottom" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", "-" + jQuery(window).height() + "px").css("left", jQuery(this).width() / 8 + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ top: jQuery(window).height() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ top: 2 * jQuery(window).height() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "slidetoptoleft" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", "-" + jQuery(window).height() + "px").css("left", jQuery(this).width() / 8 + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ top: jQuery(window).height() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ left: "-" + jQuery(window).width() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "slidetoptoright" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", "-" + jQuery(window).height() + "px").css("left", jQuery(this).width() / 8 + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ top: jQuery(window).height() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ left: 2 * jQuery(window).width() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "slidebottomtobottom" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", 2 * jQuery(window).height() + "px").css("left", jQuery(this).width() / 8 + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ top: jQuery(window).height() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ top: 2 * jQuery(window).height() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "slidebottomtotop" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", 2 * jQuery(window).height() + "px").css("left", jQuery(this).width() / 8 + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ top: jQuery(window).height() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ top: "-" + jQuery(window).height() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "slidebottomtoleft" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", 2 * jQuery(window).height() + "px").css("left", jQuery(this).width() / 8 + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ top: jQuery(window).height() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ left: "-" + jQuery(window).width() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); "slidebottomtoright" == k && (g = 2 * (a + d + e), 1 < m && 0 == c && (g = 0), jQuery(this).children(0).css("top", 2 * jQuery(window).height() + "px").css("left", jQuery(this).width() / 8 + "px").css("width", 0.75 * jQuery(this).width() + "px").css("height", 0.75 * jQuery(window).height() + "px"), jQuery(this).children(0).delay(g * c).fadeTo(f, 0.2).animate({ top: jQuery(window).height() / 8 + "px" }, f, "easeInOutQuad").animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, a, "easeInOutQuad").fadeTo(a, 0.7).animate({ left: "0px", top: "0px", width: jQuery(window).width() + "px", height: jQuery(window).height() + "px" }, d, "easeInOutQuad").fadeTo(d, 0.2).animate({ top: jQuery(window).height() / 8 + "px", left: jQuery(window).width() / 8 + "px", width: 0.75 * jQuery(window).width() + "px", height: 0.75 * jQuery(window).height() + "px" }, e, "easeInOutQuad").animate({ left: 2 * jQuery(window).width() + "px" }, e, "easeInOutQuad", function () { c == parseInt(jQuery(h).children().length - 1) && l() })); m++
                            })
                    };
                jQuery(this).children().children().css("display", "none");
                jQuery(this).children(0).css("top", "0px").css("left", "0px").css("width", jQuery(window).width() + "px").css("height", jQuery(window).height() + "px"); var n = 1E3 * b.animation_time / jQuery(h).children().length, f = n / 100 * 12, a = n / 100 * 8, d = n / 100 * 16, e = n / 100 * 12; l(b.animation_type, n)
            }
            jQuery(this)
                .removeClass("hidepattern")
                .removeClass("pattern")
                .removeClass("pattern1")
                .removeClass("pattern2")
                .removeClass("pattern3")
                .removeClass("pattern4")
                .removeClass("pattern5")
                .removeClass("pattern6")
                .removeClass("pattern7")
                .removeClass("pattern8")
                .removeClass("pattern9")
                .removeClass("pattern10")
                .removeClass("pattern11")
                .removeClass("pattern12")
                .removeClass("pattern13")
                .removeClass("pattern14")
                .removeClass("pattern15")
                .removeClass("pattern16")
                .removeClass("pattern17")
                .removeClass("pattern18")
                .removeClass("pattern19")
                .removeClass("pattern20");
            !1 == b.pattern
            ? jQuery(this).addClass("hidepattern")
            : "pattern" == b.pattern
            ? jQuery(this).addClass("pattern")
            : "pattern1" == b.pattern
            ? jQuery(this).addClass("pattern1")
            : "pattern2" == b.pattern
            ? jQuery(this).addClass("pattern2")
            : "pattern3" == b.pattern
            ? jQuery(this).addClass("pattern3")
            : "pattern4" == b.pattern
            ? jQuery(this).addClass("pattern4")
            : "pattern5" == b.pattern
            ? jQuery(this).addClass("pattern5")
            : "pattern6" == b.pattern
            ? jQuery(this).addClass("pattern6")
            : "pattern7" == b.pattern
            ? jQuery(this).addClass("pattern7")
            : "pattern8" == b.pattern
            ? jQuery(this).addClass("pattern8")
            : "pattern9" == b.pattern
            ? jQuery(this).addClass("pattern9")
            : "pattern10" == b.pattern
            ? jQuery(this).addClass("pattern10")
            : "pattern11" == b.pattern
            ? jQuery(this).addClass("pattern11")
            : "pattern12" == b.pattern
            ? jQuery(this).addClass("pattern12")
            : "pattern13" == b.pattern
            ? jQuery(this).addClass("pattern13")
            : "pattern14" == b.pattern
            ? jQuery(this).addClass("pattern14")
            : "pattern15" == b.pattern
            ? jQuery(this).addClass("pattern15")
            : "pattern16" == b.pattern
            ? jQuery(this).addClass("pattern16")
            : "pattern17" == b.pattern
            ? jQuery(this).addClass("pattern17")
            : "pattern18" == b.pattern
            ? jQuery(this).addClass("pattern18")
            : "pattern19" == b.pattern
            ? jQuery(this).addClass("pattern19")
            : "pattern20" == b.pattern
            && jQuery(this).addClass("pattern20")
        },
        destroy: function () {
            jQuery(this).html(jQuery("#hidden_fsbs").html());
            jQuery("#hidden_fsbs").remove();
            jQuery(this)
                .removeClass("pattern").removeClass("pattern1").removeClass("pattern2").removeClass("pattern3")
                .removeClass("pattern4").removeClass("pattern5").removeClass("pattern6").removeClass("pattern7")
                .removeClass("pattern8").removeClass("pattern9").removeClass("pattern10").removeClass("pattern11")
                .removeClass("pattern12").removeClass("pattern13").removeClass("pattern14").removeClass("pattern15")
                .removeClass("pattern16").removeClass("pattern17").removeClass("pattern18").removeClass("pattern19")
                .removeClass("pattern20")
                .addClass("hidepattern");
            fsbslider = null; return 1
        },
        updatepattern: function (b) {
            jQuery(this).removeClass("hidepattern").removeClass("pattern").removeClass("pattern1").removeClass("pattern2")
                .removeClass("pattern3").removeClass("pattern4").removeClass("pattern5").removeClass("pattern6")
                .removeClass("pattern7").removeClass("pattern8").removeClass("pattern9").removeClass("pattern10")
                .removeClass("pattern11").removeClass("pattern12").removeClass("pattern13").removeClass("pattern14")
                .removeClass("pattern15").removeClass("pattern16").removeClass("pattern17").removeClass("pattern18")
                .removeClass("pattern19").removeClass("pattern20");
            "disable" == b.pattern
            ? jQuery(this).addClass("hidepattern")
            : "pattern" == b.pattern
            ? jQuery(this).addClass("pattern")
            : "pattern1" == b.pattern
            ? jQuery(this).addClass("pattern1")
            : "pattern2" == b.pattern
            ? jQuery(this).addClass("pattern2")
            : "pattern3" == b.pattern
            ? jQuery(this).addClass("pattern3")
            : "pattern4" == b.pattern
            ? jQuery(this).addClass("pattern4")
            : "pattern5" == b.pattern
            ? jQuery(this).addClass("pattern5")
            : "pattern6" == b.pattern
            ? jQuery(this).addClass("pattern6")
            : "pattern7" == b.pattern
            ? jQuery(this).addClass("pattern7")
            : "pattern8" == b.pattern
            ? jQuery(this).addClass("pattern8")
            : "pattern9" == b.pattern
            ? jQuery(this).addClass("pattern9")
            : "pattern10" == b.pattern
            ? jQuery(this).addClass("pattern10")
            : "pattern11" == b.pattern
            ? jQuery(this).addClass("pattern11")
            : "pattern12" == b.pattern
            ? jQuery(this).addClass("pattern12")
            : "pattern13" == b.pattern
            ? jQuery(this).addClass("pattern13")
            : "pattern14" == b.pattern
            ? jQuery(this).addClass("pattern14")
            : "pattern15" == b.pattern
            ? jQuery(this).addClass("pattern15")
            : "pattern16" == b.pattern
            ? jQuery(this).addClass("pattern16")
            : "pattern17" == b.pattern
            ? jQuery(this).addClass("pattern17")
            : "pattern18" == b.pattern
            ? jQuery(this).addClass("pattern18")
            : "pattern19" == b.pattern
            ? jQuery(this).addClass("pattern19")
            : "pattern20" == b.pattern
            && jQuery(this).addClass("pattern20")
        }
    };
    s.fn.fsbslider = function (b) {
        if (r[b])
            return r[b].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" !== typeof b && b)
            s.error("Method " + b + " does not exist on jQuery.fsbslider");
        else return r.init.apply(this, arguments)
    }
})(jQuery);
