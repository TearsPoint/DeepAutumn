var requirejs, require, define;

(function (g) {
    function a(d, r) {
        var v, F, n, y, G, K, M, O, D, E = r && r.split("/"), P = A.map, u = P && P["*"] || {}; if (d && d.charAt(0) === ".") if (r) { E = E.slice(0, E.length - 1); d = E.concat(d.split("/")); for (O = 0; O < d.length; O += 1) { v = d[O]; if (v === ".") { d.splice(O, 1); O -= 1 } else if (v === "..") if (O === 1 && (d[2] === ".." || d[0] === "..")) break; else if (O > 0) { d.splice(O - 1, 2); O -= 2 } } d = d.join("/") } else if (d.indexOf("./") === 0) d = d.substring(2); if ((E || u) && P) {
            v = d.split("/"); for (O = v.length; O > 0; O -= 1) {
                F = v.slice(0, O).join("/"); if (E) for (D = E.length; D > 0; D -= 1) if (n =
                P[E.slice(0, D).join("/")]) if (n = n[F]) { y = n; G = O; break } if (y) break; if (!K && u && u[F]) { K = u[F]; M = O }
            } if (!y && K) { y = K; G = M } if (y) { v.splice(0, G, y); d = v.join("/") }
        } return d
    } function b(d, r) { return function () { return q.apply(g, B.call(arguments, 0).concat([d, r])) } } function c(d) { return function (r) { return a(r, d) } } function f(d) { return function (r) { t[d] = r } } function h(d) { if (w.call(C, d)) { var r = C[d]; delete C[d]; p[d] = true; m.apply(g, r) } if (!w.call(t, d) && !w.call(p, d)) throw Error("No " + d); return t[d] } function j(d) {
        var r, v = d ? d.indexOf("!") :
        -1; if (v > -1) { r = d.substring(0, v); d = d.substring(v + 1, d.length) } return [r, d]
    } function o(d) { return function () { return A && A.config && A.config[d] || {} } } var m, q, k, e, t = {}, C = {}, A = {}, p = {}, w = Object.prototype.hasOwnProperty, B = [].slice; k = function (d, r) { var v, F = j(d), n = F[0]; d = F[1]; if (n) { n = a(n, r); v = h(n) } if (n) d = v && v.normalize ? v.normalize(d, c(r)) : a(d, r); else { d = a(d, r); F = j(d); n = F[0]; d = F[1]; if (n) v = h(n) } return { f: n ? n + "!" + d : d, n: d, pr: n, p: v } }; e = {
        require: function (d) { return b(d) }, exports: function (d) {
            var r = t[d]; return typeof r !== "undefined" ?
                r : t[d] = {}
        }, module: function (d) { return { id: d, uri: "", exports: t[d], config: o(d) } }
    }; m = function (d, r, v, F) {
        var n, y, G, K, M = [], O; F = F || d; if (typeof v === "function") {
            r = !r.length && v.length ? ["require", "exports", "module"] : r; for (K = 0; K < r.length; K += 1) {
                G = k(r[K], F); y = G.f; if (y === "require") M[K] = e.require(d); else if (y === "exports") { M[K] = e.exports(d); O = true } else if (y === "module") n = M[K] = e.module(d); else if (w.call(t, y) || w.call(C, y) || w.call(p, y)) M[K] = h(y); else if (G.p) { G.p.load(G.n, b(F, true), f(y), {}); M[K] = t[y] } else throw Error(d + " missing " +
                y);
            } r = v.apply(t[d], M); if (d) if (n && n.exports !== g && n.exports !== t[d]) t[d] = n.exports; else if (r !== g || !O) t[d] = r
        } else if (d) t[d] = v
    }; requirejs = require = q = function (d, r, v, F, n) { if (typeof d === "string") { if (e[d]) return e[d](r); return h(k(d, r).f) } else if (!d.splice) { A = d; if (r.splice) { d = r; r = v; v = null } else d = g } r = r || function () { }; if (typeof v === "function") { v = F; F = n } F ? m(g, d, r, v) : setTimeout(function () { m(g, d, r, v) }, 4); return q }; q.config = function (d) { A = d; A.deps && q(A.deps, A.callback); return q }; requirejs._defined = t; define = function (d,
    r, v) { if (!r.splice) { v = r; r = [] } if (!w.call(t, d) && !w.call(C, d)) C[d] = [d, r, v] }; define.amd = { jQuery: true }
})(); define("requireLib", function () { });
(function () {
    var g = {
        $namespace: function (a) { if (!a) return window; nsArr = a.split("."); a = window; i = 0; for (l = nsArr.length; i < l; i++) { var b = nsArr[i]; a[b] = a[b] || {}; a = a[b] } return a }, $package: function (a, b) { var c; if (typeof a == "function") { b = a; c = window } else if (typeof a == "string") c = this.$namespace(a); else if (typeof a == "object") c = a; b.call(c, this) }, extend: function (a, b) { for (var c in b) if (b.hasOwnProperty(c)) a[c] = b[c]; return a }, bind: function (a, b) { var c = [].slice, f = c.call(arguments, 2); return function () { return a.apply(b, f.concat(c.call(arguments))) } },
        Class: function () {
            var a = arguments.length, b = arguments[a - 1]; b.init = b.init || function () { }; if (a === 2) {
                a = arguments[0].extend; var c = function () { }; c.prototype = a.prototype; var f = function () { return new f.prototype._init(arguments) }; f.superClass = a.prototype; f.callSuper = function (j, o) { var m = Array.prototype.slice, q = m.call(arguments, 2); (o = f.superClass[o]) && o.apply(j, q.concat(m.call(arguments))) }; f.prototype = new c; f.prototype.constructor = f; g.extend(f.prototype, b); f.prototype._init = function (j) { this.init.apply(this, j) };
                f.prototype._init.prototype = f.prototype; return f
            } else if (a === 1) { var h = function () { return new h.prototype._init(arguments) }; h.prototype = b; h.prototype._init = function (j) { this.init.apply(this, j) }; h.prototype.constructor = h; h.prototype._init.prototype = h.prototype; return h }
        }, toArray: function (a) { var b = [], c, f; try { return b.slice.call(a) } catch (h) { b = []; c = 0; for (f = a.length; c < f; ++c) b[c] = a[c]; return b } }, indexOf: function (a, b) {
            var c = g.type; if (a.length) return [].indexOf.call(a, b); else if (c.isObject(a)) for (var f in a) if (a.hasOwnProperty(f) &&
            a[f] === b) return f
        }, every: function (a, b) { if (a.length) return [].every.call(a, b); else if ($T.isObject(a)) { var c = true; this.each(a, function (f, h, j) { b(f, h, j) || (c = false) }); return c } }, some: function (a, b) { if (a.length) return [].some.call(a, b); else if ($T.isObject(a)) { var c = false; this.each(a, function (f, h, j) { if (b(f, h, j)) c = true }); return c } }, each: function (a, b) { var c = g.type; if (a.length) return [].forEach.call(a, b); else if (c.isObject(a)) for (var f in a) if (a.hasOwnProperty(f)) if (b.call(a[f], a[f], f, a) === false) break }, map: function (a,
        b) { var c = g.type; if (a.length)[].map.call(a, b); else if (c.isObject(a)) for (var f in a) if (a.hasOwnProperty(f)) a[f] = b.call(a[f], a[f], f, a) }, filter: function (a, b) { var c = g.type; if (a.length) return [].filter.call(a, b); else if (c.isObject(a)) { var f = {}; this.each(a, function (h, j) { if (b(h, j)) f[j] = h }); return f } }, isEmptyObject: function (a) { for (var b in a) return false; return true }, random: function (a, b) { return Math.floor(Math.random() * (b - a + 1) + a) }, $default: function (a, b) { if (typeof a === "undefined") return b; return a }
    }; window.JM =
    window.J = g
})(); J.$package(function (g) { g.connectType = ["unknow", "ethernet", "wifi", "cell_2g", "cell_3g"][(navigator.connection || { type: 0 }).type] });
J.$package(function (g) {
    var a = Object.prototype.toString; g.type = {
        isArray: function (b) { return b && (b.constructor === Array || a.call(b) === "[object Array]") }, isObject: function (b) { return b && (b.constructor === Object || a.call(b) === "[object Object]") }, isBoolean: function (b) { return (b === false || b) && b.constructor === Boolean }, isNumber: function (b) { return (b === 0 || b) && b.constructor === Number }, isUndefined: function (b) { return typeof b === "undefined" }, isNull: function (b) { return b === null }, isFunction: function (b) {
            return b && b.constructor ===
            Function
        }, isString: function (b) { return (b === "" || b) && b.constructor === String }
    }
});
J.$package(function (g) {
    var a = navigator.userAgent, b = {}; b.ieVersion = function () { var c = -1, f, h; if (navigator.appName === "Microsoft Internet Explorer") { f = navigator.userAgent; h = /MSIE ([0-9]{1,})/; if (h.exec(f) !== null) c = parseInt(RegExp.$1) } return c }(); b.ie = b.ieVersion !== -1; b.android = a.match(/Android/i) === null ? false : true; b.iPhone = a.match(/iPhone/i) === null ? false : true; b.iPad = a.match(/iPad/i) === null ? false : true; b.iPod = a.match(/iPod/i) === null ? false : true; b.winPhone = a.match(/Windows Phone/i) === null ? false : true; b.IOS =
    b.iPad || b.iPhone; b.touchDevice = "ontouchstart" in window; g.platform = b
});
J.$package(function (g) {
    var a, b, c = navigator.userAgent.toLowerCase(), f = navigator.plugins, h = function (j, o) { j = ("" + j).replace(/_/g, "."); o = o || 1; j = String(j).split("."); j = j[0] + "." + (j[1] || "0"); return j = Number(j).toFixed(o) }; b = {
        features: { xpath: !!document.evaluate, air: !!window.runtime, query: !!document.querySelector }, plugins: {
            flash: function () {
                var j = 0; if (f && f.length) { var o = f["Shockwave Flash"]; if (o && o.description) j = h(o.description.match(/\b(\d+)\.\d+\b/)[1], 1) || j } else for (o = 13; o--;) try {
                    new ActiveXObject("ShockwaveFlash.ShockwaveFlash." +
                    o); j = h(o); break
                } catch (m) { } return j
            }()
        }, getUserAgent: function () { return c }, name: "unknown", version: 0, ie: 0, firefox: 0, chrome: 0, opera: 0, safari: 0, mobileSafari: 0, adobeAir: 0, set: function (j, o) { this.name = j; this.version = o; this[j] = o }
    }; (a = c.match(/msie ([\d.]+)/)) ? b.set("ie", h(a[1])) : (a = c.match(/firefox\/([\d.]+)/)) ? b.set("firefox", h(a[1])) : (a = c.match(/chrome\/([\d.]+)/)) ? b.set("chrome", h(a[1])) : (a = c.match(/opera.([\d.]+)/)) ? b.set("opera", h(a[1])) : (a = c.match(/adobeair\/([\d.]+)/)) ? b.set("adobeAir", h(a[1])) : (a =
    c.match(/version\/([\d.]+).*safari/)) && b.set("safari", h(a[1])); g.browser = b
}); J.$package(function (g) { var a, b; if (window.getComputedStyle) { a = window.getComputedStyle(document.documentElement, ""); a = (Array.prototype.slice.call(a).join("").match(/-(moz|webkit|ms)-/) || a.OLink === "" && ["", "o"])[1]; b = "WebKit|Moz|MS|O".match(RegExp("(" + a + ")", "i"))[1]; g.prefix = { dom: b, lowercase: a, css: "-" + a + "-", js: a } } else g.prefix = { dom: "", lowercase: "", css: "", js: "" } });
J.$package(function (g) {
    var a = document, b = g.type, c = /^[\w-]+$/, f = /^#([\w-]*)$/, h = /^\.([\w-]+)$/, j = "classList" in document.documentElement, o = ["o", "ms", "moz", "webkit"], m = document.createElement("div"), q = {
        $: function (k, e) { var t; e = e || a; if (f.test(k)) return (t = this.id(k.replace("#", ""))) ? [t] : []; else t = c.test(k) ? this.tagName(k, e) : h.test(k) ? this.className(k.replace(".", ""), e) : e.querySelectorAll(k); return g.toArray(t) }, id: function (k) { return a.getElementById(k) }, tagName: function (k, e) { e = e || a; return e.getElementsByTagName(k) },
        node: function (k) { return a.createElement(k) }, className: function (k, e) { var t, C, A, p, w; e = e || a; if (e.getElementsByClassName) return e.getElementsByClassName(k); else { t = e.getElementsByTagName("*"); C = []; A = 0; for (p = t.length; A < p; ++A) if (w = t[A].className && g.indexOf(w.split(" "), k) >= 0) C.push(t[A]); return C } }, remove: function (k) { var e = k.parentNode; e && e.removeChild(k) }, setSelectorEngine: function () { }, matchesSelector: function (k, e) {
            if (k && e) {
                var t = k.webkitMatchesSelector || k.mozMatchesSelector || k.oMatchesSelector || k.matchesSelector;
                if (t) return t.call(k, e); t = this.$(e); if (g.indexOf(t, k) > 0) return true; return false
            }
        }, closest: function (k, e) { for (; k;) { if (q.matchesSelector(k, e)) return k; k = k.parentNode } }, toDomStyle: function (k) { if (b.isString(k)) return k.replace(/\-[a-z]/g, function (e) { return e.charAt(1).toUpperCase() }) }, toCssStyle: function (k) { if (b.isString(k)) return k.replace(/[A-Z]/g, function (e) { return "-" + e.toLowerCase() }) }, setStyle: function (k, e, t) {
            var C = this; if (k.length) g.each(k, function (p) { C.setStyle(p, e, t) }); else if (b.isObject(e)) for (var A in e) {
                if (e.hasOwnProperty(A)) k.style[A] =
                e[A]
            } else if (b.isString(e)) k.style[e] = t
        }, getStyle: function (k, e) { if (k) { if (e === "float") e = "cssFloat"; if (k.style[e]) return k.style[e]; else if (window.getComputedStyle) return window.getComputedStyle(k, null)[e]; else if (document.defaultView && document.defaultView.getComputedStyle) { e = e.replace(/([/A-Z])/g, "-$1"); e = e.toLowerCase(); var t = document.defaultView.getComputedStyle(k, ""); return t && t.getPropertyValue(e) } else if (k.currentStyle) return k.currentStyle[e] } }, getVendorPropertyName: function (k) {
            var e = m.style;
            if (k in e) return k; k = k.charAt(0).toUpperCase() + k.substr(1); for (var t = o.length; t--;) { var C = o[t] + k; if (C in e) return C }
        }, isSupprot3d: function () { var k = q.getVendorPropertyName("perspective"); return k && k in m.style }, filterSelector: function (k, e) { return g.filter(k, function (t) { return q.matchesSelector(t, e) }) }, addClass: function () { return j ? function (k, e) { !k || !e || q.hasClass(k, e) || k.classList.add(e) } : function (k, e) { !k || !e || q.hasClass(k, e) || (k.className += " " + e) } }(), hasClass: function () {
            return j ? function (k, e) {
                if (!k ||
                !e) return false; return k.classList.contains(e)
            } : function (k, e) { if (!k || !e) return false; return -1 < (" " + k.className + " ").indexOf(" " + e + " ") }
        }(), removeClass: function () { return j ? function (k, e) { !k || !e || !q.hasClass(k, e) || k.classList.remove(e) } : function (k, e) { if (!(!k || !e || !q.hasClass(k, e))) k.className = k.className.replace(RegExp("(?:^|\\s)" + e + "(?:\\s|$)"), " ") } }(), toggleClass: function (k, e) { q.hasClass(k, e) ? q.removeClass(k, e) : q.addClass(k, e) }, insertAfter: function (k, e, t) {
            (t = t.nextSibling) ? k.insertBefore(e, t) : k.appendChild(e);
            return e
        }
    }; g.dom = q
});
J.$package(function (g) {
    var a = {}, b = function (f, h) { var j = !/\W/.test(f) ? a[f] = a[f] || b(document.getElementById(f).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + f.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');"); return h ? j(h) : j }; g.string = g.string || {}; g.string.template = b; g.string.encodeHtml =
    function (f) { f = f.replace(/&/g, "&amp;"); f = f.replace(/>/g, "&gt;"); f = f.replace(/</g, "&lt;"); f = f.replace(/"/g, "&quot;"); return f = f.replace(/'/g, "&#39;") }; var c = function (f) { var h = null; if (null !== (h = c.RE.exec(f))) { f = {}; for (var j = 0, o = c.SPEC.length; j < o; j++) f[c.SPEC[j]] = h[j + 1]; h = f } return h }; c.SPEC = ["scheme", "user", "pass", "host", "port", "path", "query", "fragment"]; c.RE = /^([^:]+):\/\/(?:([^:@]+):?([^@]*)@)?(?:([^/?#:]+):?(\d*))([^?#]*)(?:\?([^#]+))?(?:#(.+))?$/; g.string.parseURL = c; g.string.buildURL = function (f) {
        for (var h =
        "", j = {}, o = {}, m = 0, q = c.SPEC.length; m < q; m++) { var k = c.SPEC[m]; if (f[k]) { switch (k) { case "scheme": o[k] = "://"; break; case "pass": j[k] = ":"; case "user": j.host = "@"; break; case "port": j[k] = ":"; break; case "query": j[k] = "?"; break; case "fragment": j[k] = "#" } if (k in j) h += j[k]; if (k in f) h += f[k]; if (k in o) h += o[k] } } return h
    }
});
J.$package(function (g) { g.format = g.format || {}; g.format.date = function (a, b) { var c = { "M+": a.getMonth() + 1, "D+": a.getDate(), "h+": a.getHours(), "m+": a.getMinutes(), "s+": a.getSeconds(), "q+": Math.floor((a.getMonth() + 3) / 3), S: a.getMilliseconds() }; if (/(Y+)/.test(b)) b = b.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)); for (var f in c) if (RegExp("(" + f + ")").test(b)) b = b.replace(RegExp.$1, RegExp.$1.length == 1 ? c[f] : ("00" + c[f]).substr(("" + c[f]).length)); return b } });
J.$package(function (g) {
    var a = window, b = a.document, c = a.navigator, f = g.dom, h = {
        fixed: function () { var j = document.body, o = f.node("div"); f.setStyle(o, { position: "fixed", top: "100px" }); j.appendChild(o); var m = j.style.height, q = j.scrollTop; f.setStyle(j, "height", "3000px"); j.scrollTop = 500; var k = o.getBoundingClientRect().top; m ? f.setStyle(j, "height", m + "px") : f.setStyle(j, "height", ""); j.removeChild(o); j.scrollTop = q; return k === 100 }(), transitionend: function () {
            var j, o, m, q; if ("ontransitionend" in a) return "transitionend"; else if ("onwebkittransitionend" in
            a) return "webkitTransitionEnd"; else if ("transition" in b.body.style) return "transitionend"; else if ("addEventListener" in a) {
                j = ["transitionend", "webkitTransitionEnd", "MozTransitionEnd", "MSTransitionEnd", "otransitionend", "oTransitionEnd"]; o = b.createElement("div"); m = function (k) { for (var e = j.length; e--;) this.removeEventListener(j[e], m); h.transitionend = k.type; m = null }; f.setStyle(o, {
                    position: "absolute", top: "0px", left: "-99999px", transition: "top 1ms", WebkitTransition: "top 1ms", MozTransition: "top 1ms", MSTransitionEnd: "top 1ms",
                    OTransitionEnd: "top 1ms"
                }); for (q = j.length; q--;) o.addEventListener(j[q], m, false); b.documentElement.appendChild(o); setTimeout(function () { o.style.top = "100px"; setTimeout(function () { o.parentNode.removeChild(o); m = o = null }, 100) }, 0)
            } return false
        }(), audio: function () {
            var j = document.createElement("audio"), o, m = /^no$/i; try {
                if (j.canPlayType) {
                    o = {}; o.mp3 = j.canPlayType("audio/mpeg;").replace(m, ""); o.wav = j.canPlayType('audio/wav; codecs="1"').replace(m, ""); o.ogg = j.canPlayType('audio/ogg; codecs="vorbis"').replace(m,
                    ""); o.m4a = (j.canPlayType("audio/x-m4a;") || j.canPlayType("audio/aac;")).replace(m, "")
                }
            } catch (q) { } return o
        }(), flash: function () { if (c.plugins && c.plugins.length && c.plugins["Shockwave Flash"]) return true; else if (c.mimeTypes && c.mimeTypes.length) { var j = c.mimeTypes["application/x-shockwave-flash"]; return j && j.enabledPlugin } else try { if (ActiveXObject) { new ActiveXObject("ShockwaveFlash.ShockwaveFlash"); return true } } catch (o) { } return false }()
    }; g.support = h
});
J.$package(function (g) {
    var a = g.type, b = g.support, c = window, f = function (p, w) { if (("on" + w).toLowerCase() in p) return w; else if (b.transitionend && (w === "transitionend" || w === b.transitionend)) return b.transitionend; return false }, h = function (p, w, B) { var d; if (p.addEventListener) p.addEventListener(w, B, false); else { w = w.toLowerCase(); if (p.attachEvent) p.attachEvent("on" + w, B); else { d = p["on" + w]; p["on" + w] = function () { d && d.apply(this, arguments); return B.apply(this, arguments) } } } }, j = function (p, w, B) {
        if (p.removeEventListener) p.removeEventListener(w,
        B, false); else { w = w.toLowerCase(); if (p.detachEvent) p.detachEvent("on" + w, B); else p["on" + w] = null }
    }, o = {
        on: function (p, w, B) {
            var d; if (a.isArray(p)) for (d = p.length; d--;) o.on(p[d], w, B); else if (a.isString(w) && w.indexOf(" ") > 0) { w = w.split(" "); for (d = w.length; d--;) o.on(p, w[d], B) } else if (a.isArray(B)) for (d = B.length; d--;) o.on(p, w, B[d]); else if (a.isObject(w)) for (d in w) o.on(p, d, w[d]); else if (d = f(p, w)) { w = d; h(p, w, B) } else if (p.elem && (d = f(p.elem, w))) { w = d; h(p.elem, w, B) } else if (A[w]) A[w](p, B); else {
                if (!p.events) p.events =
                {}; p.events[w] || (p.events[w] = []); p.events[w].push(B)
            }
        }, once: function (p, w, B) { var d = function () { B.apply(c, arguments); o.off(p, w, d) }; o.on(p, w, d) }, off: function (p, w, B) {
            if (a.isString(w) && w.indexOf(" ") > 0) { w = w.split(" "); for (var d = w.length; d--;) o.off(p, w[d], B) } else if (a.isArray(B)) for (d = B.length; d--;) o.off(p, w, B[d]); else if (a.isObject(w)) for (d in w) o.off(p, d, w[d]); else if (tmpEvtType = f(p, w)) { w = tmpEvtType; j(p, w, B) } else if (p.elem && (tmpEvtType = f(p.elem, w))) { w = tmpEvtType; j(p.elem, w, B) } else if (A[w]) A._off(p, w, B);
            else if (w) { if (p.events) if (B) { if (p.events[w]) { p = p.events[w]; for (d = p.length; d--;) if (p[d] == B) { p.splice(d, 1); break } } } else p.events[w] = [] } else p.events = {}
        }, fire: function (p, w) {
            var B = [].slice.call(arguments, 2), d; if (d = f(p, w)) { w = d; B = document.createEvent("HTMLEvents"); B.initEvent(w, true, true); p.dispatchEvent(B) } else if (p.elem && (d = f(p.elem, w))) { w = d; B = document.createEvent("HTMLEvents"); B.initEvent(w, true, true); p.elem.dispatchEvent(B) } else if (p.events && p.events[w]) {
                d = p.events[w]; for (var r = 0, v = d.length; r < v; r++) d[r].apply(window,
                B)
            }
        }, getActionTarget: function (p, w, B, d) { p = p.target; var r = w || 3; w = w !== -1; B = B || "cmd"; d = d || document.body; if (p === d) return p.getAttribute(B) ? p : null; for (; p && p !== d && (w ? r-- > 0 : true) ;) if (p.getAttribute(B)) return p; else p = p.parentNode; return null }, bindCommands: function (p, w, B, d) {
            var r = g.platform.touchDevice ? "tap" : "click"; if (arguments.length === 1) { B = p; p = document.body; w = r } else if (arguments.length === 2) { B = w; w = r } if (!p._commends) p._commends = {}; if (p._commends[w]) g.extend(p._commends[w], B); else {
                p._commends[w] = B; d = d || "cmd";
                p.getAttribute(d) || p.setAttribute(d, "void"); g.event.on(p, w, function (v) { var F = g.event.getActionTarget(v, -1, d, this.parentNode); if (F) { var n = F.getAttribute(d), y = F.getAttribute("param"); F.href && F.getAttribute("href").indexOf("#") === 0 && v.preventDefault(); this._commends[w][n] && this._commends[w][n](y, F, v) } })
            }
        }
    }, m, q, k; if (g.platform.touchDevice) { m = "touchstart"; q = "touchmove"; k = "touchend" } else { m = "mousedown"; q = "mousemove"; k = "mouseup" } var e = function (p) {
        var w = p.touches; if (w && w[0]) return { x: w[0].clientX, y: w[0].clientY };
        return { x: p.clientX, y: p.clientY }
    }, t = function (p, w) { if (!p || !w) return 0; return Math.sqrt((p.x - w.x) * (p.x - w.x) + (p.y - w.y) * (p.y - w.y)) }, C = [], A = {
        _fire: function (p, w, B) { g.each(C, function (d) { d.ele == p && w == d.evtType && B == d.handler && B.call(p, { type: w }) }) }, _off: function (p, w, B) { g.each(C, function (d, r) { var v = d.actions; if (d.ele == p && w == d.evtType && B == d.handler) { for (var F in v) { var n = v[F]; a.isObject(n) ? o.off(n.ele, F, n.handler) : o.off(p, F, n) } C.splice(r, 1) } }) }, tap: function (p, w) {
            var B, d, r, v, F, n = function (M) {
                var O = M.touches; if (!O ||
                O.length == 1) d = B = e(M)
            }, y = function (M) { M.preventDefault(); d = e(M) }, G = function (M) { var O = Date.now(), D = t(d, B), E = t(d, r); if (D < 20) { F = v && O - v < 300 && E < 20 ? "doubletap" : "tap"; w.call(p, { target: M.target, oriEvt: M, type: F }) } r = d; v = O }; o.on(p, m, n); o.on(p, q, y); o.on(p, k, G); var K = { ele: p, evtType: "tap", handler: w }; K.actions = {}; K.actions[m] = n; K.actions[q] = y; K.actions[k] = G; C.push(K)
        }, hold: function (p, w) {
            var B, d, r, v = function (G) {
                G.stopPropagation(); var K = G.touches; if (!K || K.length == 1) {
                    d = r = e(G); pt_time = Date.now(); B = setTimeout(function () {
                        K &&
                        K.length != 1 || t(d, r) < 20 && w.call(p, { oriEvt: G, target: G.target, type: "hold" })
                    }, 2E3)
                }
            }, F = function (G) { G.stopPropagation(); G.preventDefault(); r = e(G) }, n = function (G) { G.stopPropagation(); clearTimeout(B) }; o.on(p, m, v); o.on(p, q, F); o.on(p, k, n); var y = { ele: p, evtType: "hold", handler: w }; y.actions = {}; y.actions[m] = v; y.actions[q] = F; y.actions[k] = n; C.push(y)
        }, swipe: function (p, w) {
            var B, d, r, v, F, n = function (O, D) {
                var E = Math.atan2(-O.y + D.y, O.x - D.x) * 180 / Math.PI; if (E < 45 && E > -45) return "right"; if (E >= 45 && E < 135) return "top"; if (E >= 135 ||
                E < -135) return "left"; if (E >= -135 && E <= -45) return "bottom"
            }, y = function (O) { var D = O.touches; if (!D || D.length == 1) { B = d = e(O); r = Date.now() } }, G = function (O) { O.preventDefault(); d = e(O) }, K = function (O) { var D; F = d; v = Date.now(); if (t(B, F) > 30 && v - r < 500) { D = n(F, B); w.call(p, { oriEvt: O, target: O.target, type: "swipe", direction: D }) } }; o.on(p, m, y); o.on(p, q, G); o.on(p, k, K); var M = { ele: p, evtType: "swipe", handler: w }; M.actions = {}; M.actions[m] = y; M.actions[q] = G; M.actions[k] = K; C.push(M)
        }, transform: function (p, w) {
            var B, d, r, v = function (y) {
                var G =
                y.touches; if (G) if (G.length == 2) { B = e(y.touches[0]); d = e(y.touches[1]); r = t(B, d) }
            }, F = function (y) { y.preventDefault(); var G = y.touches; if (G) if (G.length == 2) { G = e(y.touches[0]); var K = e(y.touches[1]); G = t(G, K); w.call(p, { oriEvt: y, target: y.target, type: "transform", scale: G / r, rotate: rotate }) } }; o.on(p, m, v); o.on(p, q, F); var n = { ele: p, evtType: "transform", handler: w }; n.actions = {}; n.actions[m] = v; n.actions[q] = F; C.push(n)
        }, scrollstart: function (p, w) {
            var B, d, r = function (F) {
                if (!B) { B = true; w.call(p, { oriEvt: F, target: F.target, type: "scrollstart" }) } clearTimeout(d);
                d = setTimeout(function () { B = false }, 250)
            }; o.on(p, "scroll", r); var v = { ele: p, evtType: "scrollstart", handler: w }; v.actions = {}; v.actions.scroll = r; C.push(v)
        }, scrollend: function (p, w) { var B, d = function (v) { clearTimeout(B); B = setTimeout(function () { w.call(p, { oriEvt: v, target: v.target, type: "scrollend" }) }, 250) }; o.on(p, "scroll", d); var r = { ele: p, evtType: "scrollend", handler: w }; r.actions = {}; r.actions.scroll = d; C.push(r) }, scrolltobottom: function (p, w) {
            var B = document.body, d = function (v) {
                B.scrollHeight <= B.scrollTop + window.innerHeight &&
                w.call(p, { oriEvt: v, target: v.target, type: "scrolltobottom" })
            }; o.on(p, "scroll", d); var r = { ele: p, evtType: "scrolltobottom", handler: w }; r.actions = {}; r.actions.scroll = d; C.push(r)
        }, ortchange: function (p, w) { var B = window.innerWidth, d = function (v) { var F = window.innerWidth; if (B != F) { w.call(p, { oriEvt: v, target: v.target, type: "ortchange", orientation: F > window.innerHeight ? "landscape" : "portrait" }); B = F } }; o.on(window, "resize", d); var r = { ele: p, evtType: "ortchange", handler: w }; r.actions = {}; r.actions.resize = d; C.push(r) }
    }; g.event =
    o
});
J.$package(function (g) {
    var a = g.dom, b = g.event, c = g.type, f = function (j) { j.target.type !== "range" && j.preventDefault() }, h = function () { setTimeout(function () { if (!location.hash) { var j = window.innerHeight + 60; document.documentElement.clientHeight < j && a.setStyle(document.body, "minHeight", j + "px"); window.scrollTo(0, 1) } }, 200) }; g.Util = {
        hideUrlBar: function () { b.on(window, "load", h) }, preventScrolling: function () { b.on(document, "touchmove", f) }, activeScrolling: function () { b.off(document, "touchmove", f) }, scrollToTop: function (j, o) {
            var m =
            g.Animation, q = document.body, k = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop; a.setStyle(q, a.getVendorPropertyName("transform"), "translate3d(0," + -k + "px,0)"); q.scrollTop ? q.scrollTop = 0 : document.documentElement.scrollTop = 0; (new m({ selector: q, duration: j, runType: o, use3d: true })).translateY(0).transit()
        }, fixElement: function (j, o) {
            var m = c.isUndefined, q = window.innerHeight, k = window.innerWidth, e = j.clientHeight, t = j.clientWidth, C, A; g.support.fixed ? a.setStyle(j, {
                position: "fixed",
                top: o.top + "px", left: o.left + "px", bottom: o.bottom + "px", right: o.right + "px"
            }) : b.on(window, "scrollend", function () { C = window.pageYOffset + (m(o.top) ? m(o.bottom) ? "" : q - o.bottom - e : o.top); A = window.pageXOffset + (m(o.left) ? m(o.right) ? "" : k - o.right - t : o.left); a.setStyle(j, { position: "absolute", top: C + "px", left: A + "px" }) })
        }, hoverEffect: function (j, o) {
            var m, q, k, e; if (g.platform.touchDevice) { m = "touchstart"; q = "touchmove"; k = "touchend"; e = j } else { m = "mousedown"; q = "mousemove"; k = "mouseup"; e = document.body } b.on(j, m, function () {
                a.addClass(j,
                o)
            }); b.on(j, q, function (t) { t.preventDefault() }); b.on(e, k, function () { a.removeClass(j, o) })
        }
    }
});
J.$package(function (g) {
    var a = g.dom, b = g.event, c = g.type, f = a.isSupprot3d(), h = g.Class({
        init: function (j) { this.setElems(j.selector); this.setDuration(j.duration || 1E3); this.setRunType(j.runType || "ease-in-out"); this.setDelay(j.delay || 0); this.setUsed3d(j.use3d); this.transformArr = [] }, setDuration: function (j) { this.duration = j; return this }, setDelay: function (j) { this.delay = j; return this }, setElems: function (j) { if (c.isString(j)) this.elems = a.$(j); else if (c.isArray(j)) this.elems = j; else if (j.tagName) this.elems = [j]; return this },
        setRunType: function (j) { this.runType = j; return this }, setUsed3d: function (j) { this.use3d = j; return this }, scale: function (j) { this.transformArr.push("scale(" + j + ")"); return this }, scaleX: function (j) { this.transformArr.push("scalex(" + j + ")"); return this }, scaleY: function (j) { this.transformArr.push("scaley(" + j + ")"); return this }, rotate: function (j) { this.transformArr.push("rotate(" + j + "deg)"); return this }, rotateX: function (j) { this.transformArr.push("rotatex(" + j + "deg)"); return this }, rotateY: function () {
            this.transformArr.push("rotatey(" +
            rotateY + "deg)"); return this
        }, rotateZ: function (j) { this.transformArr.push("rotatez(" + j + "deg)"); return this }, translate: function (j, o, m) { f && m ? this.transformArr.push("translate3d(" + j + "," + o + "," + m + ")") : this.transformArr.push("translate(" + j + "," + o + ")"); return this }, translateX: function (j) { this.translate(j, 0); return this }, translateY: function (j) { this.translate(0, j); return this }, skew: function (j, o) { this.transformArr.push("skew(" + j + "deg," + o + "deg)"); return this }, skewX: function (j) {
            this.transformArr.push("skewx(" + j +
            "deg)"); return this
        }, skewY: function (j) { this.transformArr.push("skewy(" + j + "deg)"); return this }, setStyle: function (j, o) { var m = ""; if (c.isUndefined(this.styleStr)) this.styleStr = ""; if (c.isObject(j)) g.each(j, function (q, k) { m += a.toCssStyle(a.getVendorPropertyName(k)) + ":" + q + ";" }); else if (c.isString(j)) m += a.toCssStyle(a.getVendorPropertyName(j)) + ":" + o + ";"; this.styleStr += m; return this }, toOrigin: function () { this.transformArr = []; return this }, transit: function (j) {
            var o = this, m = this.elems; g.each(m, function (q) { o._transit(q) });
            window.setTimeout(function () { b.fire(o, "end"); g.each(m, function (q) { a.setStyle(q, a.getVendorPropertyName("transition"), "") }); j && j.call(o) }, this.duration); return this
        }, _transit: function (j) { var o = this.transformArr.join(" "); if (f && this.use3d) o += " translatez(0)"; var m = "all " + this.duration / 1E3 + "s " + this.runType + " " + this.delay / 1E3 + "s"; a.setStyle(j, a.getVendorPropertyName("transition"), m); j.style[a.getVendorPropertyName("transform")] = o; j.style.cssText += this.styleStr; b.fire(this, "start") }
    }); g.Animation = h
});
J.$package(function (g) {
    var a = window.location.host; g.cookie = {
        set: function (b, c, f, h, j) { if (j) { var o = new Date; o.setTime((new Date).getTime() + 36E5 * j) } window.document.cookie = b + "=" + c + "; " + (j ? "expires=" + o.toGMTString() + "; " : "") + (h ? "path=" + h + "; " : "path=/; ") + (f ? "domain=" + f + ";" : "domain=" + a + ";"); return true }, get: function (b) { b = window.document.cookie.match(RegExp("(?:^|;+|\\s+)" + b + "=([^;]*)")); return !b ? "" : b[1] }, remove: function (b, c, f) {
            window.document.cookie = b + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (f ? "path=" +
            f + "; " : "path=/; ") + (c ? "domain=" + c + ";" : "domain=" + a + ";")
        }
    }
});
J.$package(function (g) {
    var a = {
        serializeParam: function (b) { if (!b) return ""; var c = [], f; for (f in b) c.push(encodeURIComponent(f) + "=" + encodeURIComponent(b[f])); return c.join("&") }, getUrlParam: function (b, c, f) { b = (b = RegExp("(?:\\?|#|&)" + b + "=([^&]*)(?:$|&|#)", "i").exec(c)) ? b[1] : ""; return !f ? decodeURIComponent(b) : b }, ajax: function (b) {
            var c = b.method.toLocaleUpperCase(), f = "POST" == c, h = false, j = b.timeout, o = b.withCredentials, m = "async" in b ? b.async : true, q = window.XMLHttpRequest ? new XMLHttpRequest : false; if (!q) {
                b.error &&
                b.error.call(null, { ret: 999, msg: "Create XHR Error!" }); return false
            } var k = a.serializeParam(b.param); !f && (b.url += (b.url.indexOf("?") > -1 ? "&" : "?") + k); q.open(c, b.url, m); if (o) q.withCredentials = true; f && q.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); var e = 0; q.onreadystatechange = function () {
                if (4 == q.readyState) {
                    var C = q.status; if (C >= 200 && C < 300 || C == 304 || C == 0) { C = q.responseText.replace(/(\r|\n|\t)/gi, ""); var A = null; try { A = JSON.parse(C) } catch (p) { } b.onSuccess && b.onSuccess(A, q) } else b.onError &&
                    b.onError(q, +new Date - t); h = true; e && clearTimeout(e)
                }
            }; var t = +new Date; q.send(f ? k : void 0); if (j) e = setTimeout(function () { if (!h) { q.abort(); b.onTimeout && b.onTimeout(q) } }, j); return q
        }, offlineSend: function (b) { navigator.onLine ? a.ajax(b) : saveDataLocal(b) }
    }; g.http = a
}); typeof define === "function" && define("jm", [], function () { return J });
(function (g, a) {
    function b(u) { if (h === "") return u; u = u.charAt(0).toUpperCase() + u.substr(1); return h + u } var c = Math, f = a.createElement("div").style, h = function () { for (var u = "webkitT,MozT,msT,OT,t".split(","), s, z = 0, I = u.length; z < I; z++) { s = u[z] + "ransform"; if (s in f) return u[z].substr(0, u[z].length - 1) } return false }(), j = h ? "-" + h.toLowerCase() + "-" : "", o = b("transform"), m = b("transitionProperty"), q = b("transitionDuration"), k = b("transformOrigin"), e = b("transitionTimingFunction"), t = b("transitionDelay"), C = /android/gi.test(navigator.appVersion),
    A = /iphone|ipad/gi.test(navigator.appVersion), p = /hp-tablet/gi.test(navigator.appVersion), w = b("perspective") in f, B = "ontouchstart" in g && !p, d = !!h, r = b("transition") in f, v = "onorientationchange" in g ? "orientationchange" : "resize", F = B ? "touchstart" : "mousedown", n = B ? "touchmove" : "mousemove", y = B ? "touchend" : "mouseup", G = B ? "touchcancel" : "mouseup", K = h == "Moz" ? "DOMMouseScroll" : "mousewheel", M; M = h === false ? false : { "": "transitionend", webkit: "webkitTransitionEnd", Moz: "transitionend", O: "oTransitionEnd", ms: "MSTransitionEnd" }[h];
    var O = function () { return g.requestAnimationFrame || g.webkitRequestAnimationFrame || g.mozRequestAnimationFrame || g.oRequestAnimationFrame || g.msRequestAnimationFrame || function (u) { return setTimeout(u, 1) } }(), D = g.cancelRequestAnimationFrame || g.webkitCancelAnimationFrame || g.webkitCancelRequestAnimationFrame || g.mozCancelRequestAnimationFrame || g.oCancelRequestAnimationFrame || g.msCancelRequestAnimationFrame || clearTimeout, E = w ? " translateZ(0)" : "", P = function (u, s) {
        var z = this, I; z.wrapper = typeof u == "object" ? u : a.getElementById(u);
        z.wrapper.style.overflow = "hidden"; z.scroller = z.wrapper.children[0]; z.options = {
            hScroll: true, vScroll: true, x: 0, y: 0, bounce: true, bounceLock: false, momentum: true, lockDirection: true, useTransform: true, useTransition: false, topOffset: 0, checkDOMChanges: false, handleClick: true, hScrollbar: true, vScrollbar: true, fixedScrollbar: C, hideScrollbar: A, fadeScrollbar: A && w, scrollbarClass: "", zoom: false, zoomMin: 1, zoomMax: 4, doubleTapZoom: 2, wheelAction: "scroll", snap: false, snapThreshold: 1, onRefresh: null, onBeforeScrollStart: function (L) {
                for (var Q =
                L.target; Q.nodeType != 1;) Q = Q.parentNode; Q.tagName != "P" && L.preventDefault()
            }, onScrollStart: null, onBeforeScrollMove: null, onScrollMove: null, onBeforeScrollEnd: null, onScrollEnd: null, onTouchEnd: null, onDestroy: null, onZoomStart: null, onZoom: null, onZoomEnd: null
        }; for (I in s) z.options[I] = s[I]; z.x = z.options.x; z.y = z.options.y; z.options.useTransform = d && z.options.useTransform; z.options.hScrollbar = z.options.hScroll && z.options.hScrollbar; z.options.vScrollbar = z.options.vScroll && z.options.vScrollbar; z.options.zoom = z.options.useTransform &&
        z.options.zoom; z.options.useTransition = r && z.options.useTransition; if (z.options.zoom && C) E = ""; z.scroller.style[m] = z.options.useTransform ? j + "transform" : "top left"; z.scroller.style[q] = "0"; z.scroller.style[k] = "0 0"; if (z.options.useTransition) z.scroller.style[e] = "cubic-bezier(0.33,0.66,0.66,1)"; if (z.options.useTransform) z.scroller.style[o] = "translate(" + z.x + "px," + z.y + "px)" + E; else z.scroller.style.cssText += ";position:absolute;top:" + z.y + "px;left:" + z.x + "px"; if (z.options.useTransition) z.options.fixedScrollbar =
        true; z.refresh(); z._bind(v, g); z._bind(F); if (!B) { z._bind("mouseout", z.wrapper); z.options.wheelAction != "none" && z._bind(K) } if (z.options.checkDOMChanges) z.checkDOMTime = setInterval(function () { z._checkDOMChanges() }, 500)
    }; P.prototype = {
        enabled: true, x: 0, y: 0, steps: [], scale: 1, currPageX: 0, currPageY: 0, pagesX: [], pagesY: [], aniTime: null, wheelZoomCount: 0, handleEvent: function (u) {
            switch (u.type) {
                case F: if (!B && u.button !== 0) break; this._start(u); break; case n: this._move(u); break; case y: case G: this._end(u); break; case v: this._resize();
                    break; case K: this._wheel(u); break; case "mouseout": this._mouseout(u); break; case M: this._transitionEnd(u)
            }
        }, _checkDOMChanges: function () { this.moved || this.zoomed || this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale || this.refresh() }, _scrollbar: function (u) {
            var s; if (this[u + "Scrollbar"]) {
                if (!this[u + "ScrollbarWrapper"]) {
                    s = a.createElement("div"); if (this.options.scrollbarClass) s.className = this.options.scrollbarClass + u.toUpperCase(); else s.style.cssText =
                    "position:absolute;z-index:100;" + (u == "h" ? "height:7px;bottom:1px;left:2px;right:" + (this.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (this.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"); s.style.cssText += ";pointer-events:none;" + j + "transition-property:opacity;" + j + "transition-duration:" + (this.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (this.options.hideScrollbar ? "0" : "1"); this.wrapper.appendChild(s); this[u + "ScrollbarWrapper"] = s; s = a.createElement("div"); if (!this.options.scrollbarClass) s.style.cssText =
                    "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + j + "background-clip:padding-box;" + j + "box-sizing:border-box;" + (u == "h" ? "height:100%" : "width:100%") + ";" + j + "border-radius:3px;border-radius:3px"; s.style.cssText += ";pointer-events:none;" + j + "transition-property:" + j + "transform;" + j + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + j + "transition-duration:0;" + j + "transform: translate(0,0)" + E; if (this.options.useTransition) s.style.cssText += ";" + j + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)";
                    this[u + "ScrollbarWrapper"].appendChild(s); this[u + "ScrollbarIndicator"] = s
                } if (u == "h") { this.hScrollbarSize = this.hScrollbarWrapper.clientWidth; this.hScrollbarIndicatorSize = c.max(c.round(this.hScrollbarSize * this.hScrollbarSize / this.scrollerW), 8); this.hScrollbarIndicator.style.width = this.hScrollbarIndicatorSize + "px"; this.hScrollbarMaxScroll = this.hScrollbarSize - this.hScrollbarIndicatorSize; this.hScrollbarProp = this.hScrollbarMaxScroll / this.maxScrollX } else {
                    this.vScrollbarSize = this.vScrollbarWrapper.clientHeight;
                    this.vScrollbarIndicatorSize = c.max(c.round(this.vScrollbarSize * this.vScrollbarSize / this.scrollerH), 8); this.vScrollbarIndicator.style.height = this.vScrollbarIndicatorSize + "px"; this.vScrollbarMaxScroll = this.vScrollbarSize - this.vScrollbarIndicatorSize; this.vScrollbarProp = this.vScrollbarMaxScroll / this.maxScrollY
                } this._scrollbarPos(u, true)
            } else if (this[u + "ScrollbarWrapper"]) {
                if (d) this[u + "ScrollbarIndicator"].style[o] = ""; this[u + "ScrollbarWrapper"].parentNode.removeChild(this[u + "ScrollbarWrapper"]); this[u +
                "ScrollbarWrapper"] = null; this[u + "ScrollbarIndicator"] = null
            }
        }, _resize: function () { var u = this; setTimeout(function () { u.refresh() }, C ? 200 : 0) }, _pos: function (u, s) { if (!this.zoomed) { u = this.hScroll ? u : 0; s = this.vScroll ? s : 0; if (this.options.useTransform) this.scroller.style[o] = "translate(" + u + "px," + s + "px) scale(" + this.scale + ")" + E; else { u = c.round(u); s = c.round(s); this.scroller.style.left = u + "px"; this.scroller.style.top = s + "px" } this.x = u; this.y = s; this._scrollbarPos("h"); this._scrollbarPos("v") } }, _scrollbarPos: function (u,
        s) {
            var z = u == "h" ? this.x : this.y; if (this[u + "Scrollbar"]) {
                z = this[u + "ScrollbarProp"] * z; if (z < 0) { if (!this.options.fixedScrollbar) { z = this[u + "ScrollbarIndicatorSize"] + c.round(z * 3); if (z < 8) z = 8; this[u + "ScrollbarIndicator"].style[u == "h" ? "width" : "height"] = z + "px" } z = 0 } else if (z > this[u + "ScrollbarMaxScroll"]) if (this.options.fixedScrollbar) z = this[u + "ScrollbarMaxScroll"]; else {
                    z = this[u + "ScrollbarIndicatorSize"] - c.round((z - this[u + "ScrollbarMaxScroll"]) * 3); if (z < 8) z = 8; this[u + "ScrollbarIndicator"].style[u == "h" ? "width" : "height"] =
                    z + "px"; z = this[u + "ScrollbarMaxScroll"] + (this[u + "ScrollbarIndicatorSize"] - z)
                } this[u + "ScrollbarWrapper"].style[t] = "0"; this[u + "ScrollbarWrapper"].style.opacity = s && this.options.hideScrollbar ? "0" : "1"; this[u + "ScrollbarIndicator"].style[o] = "translate(" + (u == "h" ? z + "px,0)" : "0," + z + "px)") + E
            }
        }, _start: function (u) {
            var s = B ? u.touches[0] : u, z, I; if (this.enabled) {
                this.options.onBeforeScrollStart && this.options.onBeforeScrollStart.call(this, u); if (this.options.useTransition || this.options.zoom) this._transitionTime(0); this.zoomed =
                this.animating = this.moved = false; this.dirY = this.dirX = this.absDistY = this.absDistX = this.distY = this.distX = 0; if (this.options.zoom && B && u.touches.length > 1) {
                    I = c.abs(u.touches[0].pageX - u.touches[1].pageX); z = c.abs(u.touches[0].pageY - u.touches[1].pageY); this.touchesDistStart = c.sqrt(I * I + z * z); this.originX = c.abs(u.touches[0].pageX + u.touches[1].pageX - this.wrapperOffsetLeft * 2) / 2 - this.x; this.originY = c.abs(u.touches[0].pageY + u.touches[1].pageY - this.wrapperOffsetTop * 2) / 2 - this.y; this.options.onZoomStart && this.options.onZoomStart.call(this,
                    u)
                } if (this.options.momentum) { if (this.options.useTransform) { z = getComputedStyle(this.scroller, null)[o].replace(/[^0-9\-.,]/g, "").split(","); I = z[4] * 1; z = z[5] * 1 } else { I = getComputedStyle(this.scroller, null).left.replace(/[^0-9-]/g, "") * 1; z = getComputedStyle(this.scroller, null).top.replace(/[^0-9-]/g, "") * 1 } if (I != this.x || z != this.y) { this.options.useTransition ? this._unbind(M) : D(this.aniTime); this.steps = []; this._pos(I, z) } } this.absStartX = this.x; this.absStartY = this.y; this.startX = this.x; this.startY = this.y; this.pointX =
                s.pageX; this.pointY = s.pageY; this.startTime = u.timeStamp || Date.now(); this.options.onScrollStart && this.options.onScrollStart.call(this, u); this._bind(n); this._bind(y); this._bind(G)
            }
        }, _move: function (u) {
            var s = B ? u.touches[0] : u, z = s.pageX - this.pointX, I = s.pageY - this.pointY, L = this.x + z, Q = this.y + I, R = u.timeStamp || Date.now(); this.options.onBeforeScrollMove && this.options.onBeforeScrollMove.call(this, u); if (this.options.zoom && B && u.touches.length > 1) {
                L = c.abs(u.touches[0].pageX - u.touches[1].pageX); Q = c.abs(u.touches[0].pageY -
                u.touches[1].pageY); this.touchesDist = c.sqrt(L * L + Q * Q); this.zoomed = true; s = 1 / this.touchesDistStart * this.touchesDist * this.scale; if (s < this.options.zoomMin) s = 0.5 * this.options.zoomMin * Math.pow(2, s / this.options.zoomMin); else if (s > this.options.zoomMax) s = 2 * this.options.zoomMax * Math.pow(0.5, this.options.zoomMax / s); this.lastScale = s / this.scale; L = this.originX - this.originX * this.lastScale + this.x; Q = this.originY - this.originY * this.lastScale + this.y; this.scroller.style[o] = "translate(" + L + "px," + Q + "px) scale(" + s + ")" + E; this.options.onZoom &&
                this.options.onZoom.call(this, u)
            } else {
                this.pointX = s.pageX; this.pointY = s.pageY; if (L > 0 || L < this.maxScrollX) L = this.options.bounce ? this.x + z / 2 : L >= 0 || this.maxScrollX >= 0 ? 0 : this.maxScrollX; if (Q > this.minScrollY || Q < this.maxScrollY) Q = this.options.bounce ? this.y + I / 2 : Q >= this.minScrollY || this.maxScrollY >= 0 ? this.minScrollY : this.maxScrollY; this.distX += z; this.distY += I; this.absDistX = c.abs(this.distX); this.absDistY = c.abs(this.distY); if (!(this.absDistX < 6 && this.absDistY < 6)) {
                    if (this.options.lockDirection) if (this.absDistX >
                    this.absDistY + 5) { Q = this.y; I = 0 } else if (this.absDistY > this.absDistX + 5) { L = this.x; z = 0 } this.moved = true; this._pos(L, Q); this.dirX = z > 0 ? -1 : z < 0 ? 1 : 0; this.dirY = I > 0 ? -1 : I < 0 ? 1 : 0; if (R - this.startTime > 300) { this.startTime = R; this.startX = this.x; this.startY = this.y } this.options.onScrollMove && this.options.onScrollMove.call(this, u)
                }
            }
        }, _end: function (u) {
            if (!(B && u.touches.length !== 0)) {
                var s = this, z = B ? u.changedTouches[0] : u, I, L, Q = { dist: 0, time: 0 }, R = { dist: 0, time: 0 }, X = (u.timeStamp || Date.now()) - s.startTime, x = s.x, H = s.y; s._unbind(n);
                s._unbind(y); s._unbind(G); s.options.onBeforeScrollEnd && s.options.onBeforeScrollEnd.call(s, u); if (s.zoomed) { x = s.scale * s.lastScale; x = Math.max(s.options.zoomMin, x); x = Math.min(s.options.zoomMax, x); s.lastScale = x / s.scale; s.scale = x; s.x = s.originX - s.originX * s.lastScale + s.x; s.y = s.originY - s.originY * s.lastScale + s.y; s.scroller.style[q] = "200ms"; s.scroller.style[o] = "translate(" + s.x + "px," + s.y + "px) scale(" + s.scale + ")" + E; s.zoomed = false; s.refresh(); s.options.onZoomEnd && s.options.onZoomEnd.call(s, u) } else {
                    if (s.moved) {
                        if (X <
                        300 && s.options.momentum) {
                            Q = x ? s._momentum(x - s.startX, X, -s.x, s.scrollerW - s.wrapperW + s.x, s.options.bounce ? s.wrapperW : 0) : Q; R = H ? s._momentum(H - s.startY, X, -s.y, s.maxScrollY < 0 ? s.scrollerH - s.wrapperH + s.y - s.minScrollY : 0, s.options.bounce ? s.wrapperH : 0) : R; x = s.x + Q.dist; H = s.y + R.dist; if (s.x > 0 && x > 0 || s.x < s.maxScrollX && x < s.maxScrollX) Q = { dist: 0, time: 0 }; if (s.y > s.minScrollY && H > s.minScrollY || s.y < s.maxScrollY && H < s.maxScrollY) R = { dist: 0, time: 0 }; var N = JM.event.getActionTarget(u, 2); if (N && N.getAttribute("cmd") == "clickMemberItem") {
                                var T =
                                function (U) { U.stopPropagation(); U.preventDefault(); JM.event.off(N, "click", T) }; JM.event.on(N, "click", T)
                            }
                        } if (Q.dist || R.dist) { Q = c.max(c.max(Q.time, R.time), 10); if (s.options.snap) { R = x - s.absStartX; X = H - s.absStartY; if (c.abs(R) < s.options.snapThreshold && c.abs(X) < s.options.snapThreshold) s.scrollTo(s.absStartX, s.absStartY, 200); else { R = s._snap(x, H); x = R.x; H = R.y; Q = c.max(R.time, Q) } } s.scrollTo(c.round(x), c.round(H), Q) } else if (s.options.snap) {
                            R = x - s.absStartX; X = H - s.absStartY; if (c.abs(R) < s.options.snapThreshold && c.abs(X) <
                            s.options.snapThreshold) s.scrollTo(s.absStartX, s.absStartY, 200); else { R = s._snap(s.x, s.y); if (R.x != s.x || R.y != s.y) s.scrollTo(R.x, R.y, R.time) }
                        } else s._resetPos(200)
                    } else {
                        if (B) if (s.doubleTapTimer && s.options.zoom) { clearTimeout(s.doubleTapTimer); s.doubleTapTimer = null; s.options.onZoomStart && s.options.onZoomStart.call(s, u); s.zoom(s.pointX, s.pointY, s.scale == 1 ? s.options.doubleTapZoom : 1); s.options.onZoomEnd && setTimeout(function () { s.options.onZoomEnd.call(s, u) }, 200) } else if (this.options.handleClick) s.doubleTapTimer =
                        setTimeout(function () { s.doubleTapTimer = null; for (I = z.target; I.nodeType != 1;) I = I.parentNode; if (I.tagName != "SELECT" && I.tagName != "INPUT" && I.tagName != "TEXTAREA") { L = a.createEvent("MouseEvents"); L.initMouseEvent("click", true, true, u.view, 1, z.screenX, z.screenY, z.clientX, z.clientY, u.ctrlKey, u.altKey, u.shiftKey, u.metaKey, 0, null); L._fake = true; I.dispatchEvent(L) } }, s.options.zoom ? 250 : 0); s._resetPos(200)
                    } s.options.onTouchEnd && s.options.onTouchEnd.call(s, u)
                }
            }
        }, _resetPos: function (u) {
            var s = this.x >= 0 ? 0 : this.x < this.maxScrollX ?
            this.maxScrollX : this.x, z = this.y >= this.minScrollY || this.maxScrollY > 0 ? this.minScrollY : this.y < this.maxScrollY ? this.maxScrollY : this.y; if (s == this.x && z == this.y) {
                if (this.moved) { this.moved = false; this.options.onScrollEnd && this.options.onScrollEnd.call(this) } if (this.hScrollbar && this.options.hideScrollbar) { if (h == "webkit") this.hScrollbarWrapper.style[t] = "300ms"; this.hScrollbarWrapper.style.opacity = "0" } if (this.vScrollbar && this.options.hideScrollbar) {
                    if (h == "webkit") this.vScrollbarWrapper.style[t] = "300ms"; this.vScrollbarWrapper.style.opacity =
                    "0"
                }
            } else this.scrollTo(s, z, u || 0)
        }, _wheel: function (u) {
            var s = this, z, I; if ("wheelDeltaX" in u) { z = u.wheelDeltaX / 2; I = u.wheelDeltaY / 2 } else if ("wheelDelta" in u) z = I = u.wheelDelta / 2; else if ("detail" in u) z = I = -u.detail * 9; else return; if (s.options.wheelAction == "zoom") {
                I = s.scale * Math.pow(2, 1 / 3 * (I ? I / Math.abs(I) : 0)); if (I < s.options.zoomMin) I = s.options.zoomMin; if (I > s.options.zoomMax) I = s.options.zoomMax; if (I != s.scale) {
                    !s.wheelZoomCount && s.options.onZoomStart && s.options.onZoomStart.call(s, u); s.wheelZoomCount++; s.zoom(u.pageX,
                    u.pageY, I, 400); setTimeout(function () { s.wheelZoomCount--; !s.wheelZoomCount && s.options.onZoomEnd && s.options.onZoomEnd.call(s, u) }, 400)
                }
            } else { z = s.x + z; I = s.y + I; if (z > 0) z = 0; else if (z < s.maxScrollX) z = s.maxScrollX; if (I > s.minScrollY) I = s.minScrollY; else if (I < s.maxScrollY) I = s.maxScrollY; s.maxScrollY < 0 && s.scrollTo(z, I, 0) }
        }, _mouseout: function (u) { var s = u.relatedTarget; if (s) for (; s = s.parentNode;) if (s == this.wrapper) return; this._end(u) }, _transitionEnd: function (u) { if (u.target == this.scroller) { this._unbind(M); this._startAni() } },
        _startAni: function () {
            var u = this, s = u.x, z = u.y, I = Date.now(), L, Q, R; if (!u.animating) if (u.steps.length) {
                L = u.steps.shift(); if (L.x == s && L.y == z) L.time = 0; u.animating = true; u.moved = true; if (u.options.useTransition) { u._transitionTime(L.time); u._pos(L.x, L.y); u.animating = false; L.time ? u._bind(M) : u._resetPos(0) } else {
                    R = function () {
                        var X = Date.now(); if (X >= I + L.time) { u._pos(L.x, L.y); u.animating = false; u.options.onAnimationEnd && u.options.onAnimationEnd.call(u); u._startAni() } else {
                            X = (X - I) / L.time - 1; Q = c.sqrt(1 - X * X); X = (L.x - s) * Q +
                            s; u._pos(X, (L.y - z) * Q + z); if (u.animating) u.aniTime = O(R)
                        }
                    }; R()
                }
            } else u._resetPos(400)
        }, _transitionTime: function (u) { u += "ms"; this.scroller.style[q] = u; if (this.hScrollbar) this.hScrollbarIndicator.style[q] = u; if (this.vScrollbar) this.vScrollbarIndicator.style[q] = u }, _momentum: function (u, s, z, I, L) { s = c.abs(u) / s; var Q = s * s / 0.0012, R = 0; R = 0; if (u > 0 && Q > z) { R = L / (6 / (Q / s * 6.0E-4)); z += R; s = s * z / Q; Q = z } else if (u < 0 && Q > I) { R = L / (6 / (Q / s * 6.0E-4)); I += R; s = s * I / Q; Q = I } Q *= u < 0 ? -1 : 1; R = s / 6.0E-4; return { dist: Q, time: c.round(R) } }, _offset: function (u) {
            for (var s =
            -u.offsetLeft, z = -u.offsetTop; u = u.offsetParent;) { s -= u.offsetLeft; z -= u.offsetTop } if (u != this.wrapper) { s *= this.scale; z *= this.scale } return { left: s, top: z }
        }, _snap: function (u, s) {
            var z, I, L; L = this.pagesX.length - 1; z = 0; for (I = this.pagesX.length; z < I; z++) if (u >= this.pagesX[z]) { L = z; break } L == this.currPageX && L > 0 && this.dirX < 0 && L--; u = this.pagesX[L]; I = (I = c.abs(u - this.pagesX[this.currPageX])) ? c.abs(this.x - u) / I * 500 : 0; this.currPageX = L; L = this.pagesY.length - 1; for (z = 0; z < L; z++) if (s >= this.pagesY[z]) { L = z; break } L == this.currPageY &&
            L > 0 && this.dirY < 0 && L--; s = this.pagesY[L]; z = (z = c.abs(s - this.pagesY[this.currPageY])) ? c.abs(this.y - s) / z * 500 : 0; this.currPageY = L; L = c.round(c.max(I, z)) || 200; return { x: u, y: s, time: L }
        }, _bind: function (u, s, z) { (s || this.scroller).addEventListener(u, this, !!z) }, _unbind: function (u, s, z) { (s || this.scroller).removeEventListener(u, this, !!z) }, destroy: function () {
            this.scroller.style[o] = ""; this.vScrollbar = this.hScrollbar = false; this._scrollbar("h"); this._scrollbar("v"); this._unbind(v, g); this._unbind(F); this._unbind(n); this._unbind(y);
            this._unbind(G); if (!this.options.hasTouch) { this._unbind("mouseout", this.wrapper); this._unbind(K) } this.options.useTransition && this._unbind(M); this.options.checkDOMChanges && clearInterval(this.checkDOMTime); this.options.onDestroy && this.options.onDestroy.call(this)
        }, refresh: function () {
            var u, s, z, I = 0; s = 0; if (this.scale < this.options.zoomMin) this.scale = this.options.zoomMin; this.wrapperW = this.wrapper.clientWidth || 1; this.wrapperH = this.wrapper.clientHeight || 1; this.minScrollY = -this.options.topOffset || 0; this.scrollerW =
            c.round(this.scroller.offsetWidth * this.scale); this.scrollerH = c.round((this.scroller.offsetHeight + this.minScrollY) * this.scale); this.maxScrollX = this.wrapperW - this.scrollerW; this.maxScrollY = this.wrapperH - this.scrollerH + this.minScrollY; this.dirY = this.dirX = 0; this.options.onRefresh && this.options.onRefresh.call(this); this.hScroll = this.options.hScroll && this.maxScrollX < 0; this.vScroll = this.options.vScroll && (!this.options.bounceLock && !this.hScroll || this.scrollerH > this.wrapperH); this.hScrollbar = this.hScroll &&
            this.options.hScrollbar; this.vScrollbar = this.vScroll && this.options.vScrollbar && this.scrollerH > this.wrapperH; u = this._offset(this.wrapper); this.wrapperOffsetLeft = -u.left; this.wrapperOffsetTop = -u.top; if (typeof this.options.snap == "string") {
                this.pagesX = []; this.pagesY = []; z = this.scroller.querySelectorAll(this.options.snap); u = 0; for (s = z.length; u < s; u++) {
                    I = this._offset(z[u]); I.left += this.wrapperOffsetLeft; I.top += this.wrapperOffsetTop; this.pagesX[u] = I.left < this.maxScrollX ? this.maxScrollX : I.left * this.scale; this.pagesY[u] =
                    I.top < this.maxScrollY ? this.maxScrollY : I.top * this.scale
                }
            } else if (this.options.snap) {
                for (this.pagesX = []; I >= this.maxScrollX;) { this.pagesX[s] = I; I -= this.wrapperW; s++ } if (this.maxScrollX % this.wrapperW) this.pagesX[this.pagesX.length] = this.maxScrollX - this.pagesX[this.pagesX.length - 1] + this.pagesX[this.pagesX.length - 1]; s = I = 0; for (this.pagesY = []; I >= this.maxScrollY;) { this.pagesY[s] = I; I -= this.wrapperH; s++ } if (this.maxScrollY % this.wrapperH) this.pagesY[this.pagesY.length] = this.maxScrollY - this.pagesY[this.pagesY.length -
                1] + this.pagesY[this.pagesY.length - 1]
            } this._scrollbar("h"); this._scrollbar("v"); if (!this.zoomed) { this.scroller.style[q] = "0"; this._resetPos(200) }
        }, scrollTo: function (u, s, z, I) { var L = u; this.stop(); L.length || (L = [{ x: u, y: s, time: z, relative: I }]); u = 0; for (s = L.length; u < s; u++) { if (L[u].relative) { L[u].x = this.x - L[u].x; L[u].y = this.y - L[u].y } this.steps.push({ x: L[u].x, y: L[u].y, time: L[u].time || 0 }) } this._startAni() }, scrollToElement: function (u, s) {
            var z; if (u = u.nodeType ? u : this.scroller.querySelector(u)) {
                z = this._offset(u);
                z.left += this.wrapperOffsetLeft; z.top += this.wrapperOffsetTop; z.left = z.left > 0 ? 0 : z.left < this.maxScrollX ? this.maxScrollX : z.left; z.top = z.top > this.minScrollY ? this.minScrollY : z.top < this.maxScrollY ? this.maxScrollY : z.top; s = s === undefined ? c.max(c.abs(z.left) * 2, c.abs(z.top) * 2) : s; this.scrollTo(z.left, z.top, s)
            }
        }, scrollToPage: function (u, s, z) {
            z = z === undefined ? 400 : z; this.options.onScrollStart && this.options.onScrollStart.call(this); if (this.options.snap) {
                u = u == "next" ? this.currPageX + 1 : u == "prev" ? this.currPageX - 1 : u; s = s ==
                "next" ? this.currPageY + 1 : s == "prev" ? this.currPageY - 1 : s; u = u < 0 ? 0 : u > this.pagesX.length - 1 ? this.pagesX.length - 1 : u; s = s < 0 ? 0 : s > this.pagesY.length - 1 ? this.pagesY.length - 1 : s; this.currPageX = u; this.currPageY = s; u = this.pagesX[u]; s = this.pagesY[s]
            } else { u = -this.wrapperW * u; s = -this.wrapperH * s; if (u < this.maxScrollX) u = this.maxScrollX; if (s < this.maxScrollY) s = this.maxScrollY } this.scrollTo(u, s, z)
        }, disable: function () { this.stop(); this._resetPos(0); this.enabled = false; this._unbind(n); this._unbind(y); this._unbind(G) }, enable: function () {
            this.enabled =
            true
        }, stop: function () { this.options.useTransition ? this._unbind(M) : D(this.aniTime); this.steps = []; this.animating = this.moved = false }, zoom: function (u, s, z, I) {
            var L = z / this.scale; if (this.options.useTransform) {
                this.zoomed = true; I = I === undefined ? 200 : I; u = u - this.wrapperOffsetLeft - this.x; s = s - this.wrapperOffsetTop - this.y; this.x = u - u * L + this.x; this.y = s - s * L + this.y; this.scale = z; this.refresh(); this.x = this.x > 0 ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x; this.y = this.y > this.minScrollY ? this.minScrollY : this.y < this.maxScrollY ?
                this.maxScrollY : this.y; this.scroller.style[q] = I + "ms"; this.scroller.style[o] = "translate(" + this.x + "px," + this.y + "px) scale(" + z + ")" + E; this.zoomed = false
            }
        }, isReady: function () { return !this.moved && !this.zoomed && !this.animating }
    }; f = null; g.iScroll = P; typeof define === "function" && define("iscroll", [], function () { return P })
})(this, document); function pgvGetCookieByName(g) { g = Tcss.d.cookie.match(RegExp("(^|\\s)" + g + "([^;]*)(;|$)")); return g == null ? pvNone : unescape(g[2]) }
function pgvRealSetCookie(g) { Tcss.d.cookie = g + ";path=/;domain=" + Tcss.domainToSet + ";expires=Sun, 18 Jan 2038 00:00:00 GMT;" } function pgvGetDomainInfo() { typeof pvCurDomain != "undefined" && pvCurDomain != "" && (Tcss.dm = pvCurDomain); typeof pvCurUrl != "undefined" && pvCurUrl != "" && (Tcss.url = escape(pvCurUrl)); Tcss.arg == pvNone && (Tcss.arg = "") }
function pgvIsPgvDomain() { var g = Tcss.dm.split("."), a = Tcss.dm; return g.length >= 3 && g[g.length - 2] == "qq" && (a = g[g.length - 3]), !/(^qzone$)|(^cache$)|(^ossweb-img$)|(^ring$)|(^im$)|(^fo$)|(^shuqian$)|(^photo$)|(^pet$)|(^r2$)|(^bar$)|(^client$)|(^music$)|(^pay$)|(^sg$)|(^vip$)|(^show$)|(^qqtang$)|(^safe$)|(^service$)|(^love$)|(^mail$)|(^qqgamecdnimg$)|(^netbar$)|(^dnf$)|(^qqgame$)|(^mgp$)|(^magic$)|(^city$)|(^1314$)|(^wb$)|(^qun$)|(^aq$)|(^17roco$)|(^minigame$)|(^cf$)|(^zg$)|(^pc$)|(^shurufa$)|(^live$)|(\.3366\.com$)/.test(a) }
function pgvGetRefInfo() { typeof pvRefDomain != "undefined" && pvRefDomain != "" && (Tcss.rdm = pvRefDomain); Tcss.rdm = Tcss.rdm == pvNone ? "" : Tcss.rdm; typeof pvRefUrl != "undefined" && pvRefUrl != "" && (Tcss.rurl = pvRefUrl); Tcss.rurl == pvNone && (Tcss.rurl = ""); Tcss.rarg == pvNone && (Tcss.rarg = ""); if (pgvIsPgvDomain()) { if (Tcss.rdm == "") { var g = Tcss.l.href.match(/[?&#](((pgv_ref)|(ref)|(ptlang))=[^&#]+)(#|&|$)/); g && (Tcss.rdm = g[1] == null ? "" : escape(g[1])) } (g = Tcss.l.href.match(/[?&#](pref=[^&#]+)(&|#|$)/)) && (Tcss.rdm = g[1] == null ? "" : escape(g[1])) } }
function pgvGetColumn() { Tcss.column = ""; typeof vsPgvCol != "undefined" && vsPgvCol != "" && (Tcss.column += vsPgvCol) } function pgvGetTopic() { Tcss.subject = ""; typeof pvCSTM != "undefined" && pvCSTM != "" && (Tcss.subject = pvCSTM) } function trimUin(g) { var a = pvNone; return g != pvNone && (g = g.replace(RegExp("[^0-9]", "gm"), ""), a = g.replace(RegExp("^0+", "gm"), ""), a == "" && (a = pvNone)), a }
function pgvGetNewRand() {
    var g = trimUin(pgvGetCookieByName("uin_cookie=")), a = trimUin(pgvGetCookieByName("adid=")), b = trimUin(pgvGetCookieByName("uin=")), c = trimUin(pgvGetCookieByName("luin=")), f = trimUin(pgvGetCookieByName("clientuin=")), h = trimUin(pgvGetCookieByName("pt2gguin=")), j = trimUin(pgvGetCookieByName("zzpaneluin=")), o = trimUin(pgvGetCookieByName("o_cookie=")), m = pgvGetCookieByName("pgv_pvid="); return o.length > 13 && pgvRealSetCookie("o_cookie="), b != pvNone ? (pgvRealSetCookie("o_cookie=" + b), "&nrnd=" +
    b) : c != pvNone ? (pgvRealSetCookie("o_cookie=" + c), "&nrnd=" + c) : h != pvNone ? (pgvRealSetCookie("o_cookie=" + h), "&nrnd=" + h) : g != pvNone ? (pgvRealSetCookie("o_cookie=" + g), "&nrnd=" + g) : o != pvNone ? "&nrnd=" + o : a != pvNone ? (pgvRealSetCookie("o_cookie=" + a), "&nrnd=" + a) : f != pvNone ? (pgvRealSetCookie("o_cookie=" + f), "&nrnd=" + f) : j != pvNone ? (pgvRealSetCookie("o_cookie=" + j), "&nrnd=" + j) : m != pvNone ? "&nrnd=F" + m : "&nrnd=-"
}
function hotClick() { document.addEventListener ? document.addEventListener("click", clickEvent, false) : document.attachEvent && document.attachEvent("onclick", clickEvent); window.addEventListener ? window.addEventListener("onbeforeunload", staybounce, false) : window.attachEvent && window.attachEvent("onbeforeunload", staybounce) } function getScrollXY() { return document.body.scrollTop ? { x: document.body.scrollLeft, y: document.body.scrollTop } : { x: document.documentElement.scrollLeft, y: document.documentElement.scrollTop } }
function clickEvent(g) {
    g = g || window.event; var a = g.clientX + getScrollXY().x - document.getElementsByTagName("body")[0].offsetLeft, b = g.clientY + getScrollXY().y - document.getElementsByTagName("body")[0].offsetTop; if (!(a < 0 || b < 0)) try {
        var c = 1; typeof g.srcElement != "undefined" && g.srcElement == "[object]" && typeof g.srcElement.parentElement != "undefined" && g.srcElement.parentElement == "[object]" && (c = 0); pvClickCount += c; var f = new Image(1, 1); f.src = "http://trace.qq.com:80/collect?pj=8888&url=" + escape(location.href) + "&w=" +
        screen.width + "&x=" + a + "&y=" + b + "&v=" + c + "&u=" + trimUin(pgvGetCookieByName("o_cookie")); delete f
    } catch (h) { }
}
function tracert() {
    if (pgvIsPgvDomain()) {
        sendUrl = new Image(1, 1); var g = escape(window.location.href); g = "pj=1990&dm=" + Tcss.dm + "&url=" + Tcss.url + "&arg=" + Tcss.arg + "&rdm=" + Tcss.rdm + "&rurl=" + Tcss.rurl + "&rarg=" + Tcss.rarg + "&icache=" + Tcss.pgUserType + "&uv=&nu=&ol=&loc=" + g + "&column=" + Tcss.column + "&subject=" + Tcss.subject + pgvGetNewRand() + "&rnd=" + Math.round(Math.random() * 1E5); sendUrl.src = "http://trace.qq.com:80/collect?" + g; g = trimUin(pgvGetCookieByName("o_cookie=")); if (pvSetupHot == 1 && g != pvNone && g % 10 == 3 && !/\/a\//.test(location.href)) {
            hotClick();
            pvStartTime = (new Date).getTime()
        }
    }
} function staybounce() { dt = new Date; var g = dt.getTime(), a = new Image(1, 1); a.src = "http://trace.qq.com:80/collect?pj=8887&url=" + escape(location.href) + "&t=" + parseInt((g - pvStartTime) / 1E3) + "&v=" + pvClickCount + "&u=" + trimUin(pgvGetCookieByName("o_cookie")); delete a } var pvNone = "-", pvStartTime = 0, sendUrl, pvClickCount = 0, pvSetupHot = 1, pvCurDomain = "", pvCurUrl = "", pvRefDomain = "", pvRefUrl = ""; if (typeof pvRepeatCount == "undefined") var pvRepeatCount = 1;
(function () {
    function g(d) { this.url = []; this.init(d) } var a, b, c, f, h, j, o, m, q, k, e, t, C = 0, A = 0; _ver = "tcss.3.1.5"; _speedTestUrl = "http://jsqmt.qq.com/cdn_djl.js"; window.Tcss = {}; var p = typeof tracert == "function" && typeof pgvGetColumn == "function" && typeof pgvGetTopic == "function" && typeof pgvGetDomainInfo == "function" && typeof pgvGetRefInfo == "function"; if (typeof w == "undefined") var w = 1; g.prototype = {
        init: function (d) {
            d ? f = d : f = {}; a = document; if (!f.statIframe && window != top) try { a = top.document } catch (r) { } typeof a == "undefined" &&
            (a = document); b = a.location; c = a.body; p && (Tcss.d = a, Tcss.l = b); k = []; e = []; t = []
        }, run: function () {
            var d, r, v; d = (new Date).getTime(); B.init(); this.url.push(this.getDomainInfo()); this.coverCookie(); B.setCookie("ssid"); B.save(); this.url.unshift("http://pingfore." + this.getCookieSetDomain(h) + "/pingd?"); this.url.push(this.getRefInfo(f)); try { navigator.cookieEnabled ? this.url.push("&pvid=" + B.setCookie("pgv_pvid", true)) : this.url.push("&pvid=NoCookie") } catch (F) { this.url.push("&pvid=NoCookie") } this.url.push(this.getMainEnvInfo());
            this.url.push(this.getExtendEnvInfo()); Tcss.pgUserType = ""; if (f.pgUserType || f.reserved2) { r = f.pgUserType || f.reserved2; r = escape(r.substring(0, 256)); Tcss.pgUserType = r; t.push("pu=" + Tcss.pgUserType) } p && (pgvGetColumn(), pgvGetTopic(), this.url.push("&column=" + Tcss.column + "&subject=" + Tcss.subject), tracert()); this.url.push("&vs=" + _ver); B.setCookie("ts_uid", true); r = (new Date).getTime(); k.push("tm=" + (r - d)); C && k.push("ch=" + C); f.extParam ? v = f.extParam + "|" : v = ""; this.url.push("&ext=" + escape(v + k.join(";"))); this.url.push("&hurlcn=" +
            escape(e.join(";"))); this.url.push("&rand=" + Math.round(Math.random() * 1E5)); typeof _speedMark == "undefined" ? this.url.push("&reserved1=-1") : this.url.push("&reserved1=" + (new Date - _speedMark)); (d = this.getSud()) && t.push("su=" + escape(d.substring(0, 256))); this.url.push("&tt=" + escape(t.join(";"))); this.sendInfo(this.url.join("")); if (A == 1) { d = this.getParameter("tcss_rp_dm", a.URL); d != Tcss.dm && this.sendInfo(this.url.join("").replace(/\?dm=(.*?)\&/, "?dm=" + d + "&")) } f.hot && (document.attachEvent ? document.attachEvent("onclick",
            function (n) { pgvWatchClick(n) }) : document.addEventListener("click", function (n) { pgvWatchClick(n) }, false)); f.repeatApplay && f.repeatApplay == "true" && typeof w != "undefined" && (w = 1)
        }, getSud: function () { if (f.sessionUserType) return f.sessionUserType; return this.getParameter(f.sudParamName || "sessionUserType", a.URL) }, coverCookie: function () {
            if (f.crossDomain && f.crossDomain == "on") {
                var d = this.getParameter("tcss_uid", a.URL), r = this.getParameter("tcss_sid", a.URL), v = this.getParameter("tcss_refer", a.URL), F = this.getParameter("tcss_last",
                a.URL); r && d && (A = 1, B.setCookie("ssid", false, r), B.save(), B.setCookie("ts_refer", true, v), B.setCookie("ts_last", true, F), B.setCookie("pgv_pvid", true, d))
            }
        }, getDomainInfo: function (d) { var r; return r = b.hostname.toLowerCase(), f.virtualDomain && (e.push("ad=" + r), r = f.virtualDomain), this.getCurrentUrl(), Tcss.dm = r, p && pgvGetDomainInfo(), h = Tcss.dm, j || (j = this.getCookieSetDomain(b.hostname.toLowerCase()), p && (Tcss.domainToSet = j)), d && (Tcss.dm += ".hot"), "dm=" + Tcss.dm + "&url=" + Tcss.url }, getCurrentUrl: function () {
            var d = "", r =
            "-"; d = escape(b.pathname); b.search != "" && (r = escape(b.search.substr(1))); if (f.senseParam) { var v = this.getParameter(f.senseParam, a.URL); v && (d += "_" + v) } f.virtualURL && (e.push("au=" + d), d = f.virtualURL); Tcss.url = d; Tcss.arg = r
        }, getRefInfo: function (d) {
            var r = "-", v = "-", F = "-", n = a.referrer, y; d = this.getParameter(d.tagParamName || "ADTAG", a.URL); y = n.indexOf("://"); if (y > -1) (y = n.match(/(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i)) && (r = y[2], v = y[4] + (y[5] ? y[5] : "")); if (n.indexOf("?") != -1) {
                y = n.indexOf("?") +
                1; F = n.substr(y)
            } n = r; f.virtualRefDomain && (r != "-" && e.push("ard=" + r), r = f.virtualRefDomain); f.virtualRefURL && (v != "-" && e.push("aru=" + escape(v)), v = f.virtualRefURL); var G; d && (G = r + v, r = "ADTAG", v = d); o = r; m = escape(v); if (o == "-" || o == "ADTAG" && n == "-") { r = B.get("ts_last=", true); r != "-" && k.push("ls=" + r) } B.setCookie("ts_last", true, escape((b.hostname + b.pathname).substring(0, 128))); r = B.get("ts_refer=", true); r != "-" && k.push("rf=" + r); n = b.hostname; f.inner && (n = "," + n + "," + f.inner + ","); if (!(o == "-" || ("," + n + ",").indexOf(o) > -1 || A ==
            1)) { v = escape((o + v).substring(0, 128)); v != r && (C = 2); B.setCookie("ts_refer", true, v) } return Tcss.rdm = o, Tcss.rurl = m, Tcss.rarg = escape(F), p && pgvGetRefInfo(), G ? "&rdm=" + Tcss.rdm + "&rurl=" + Tcss.rurl + "&rarg=" + Tcss.rarg + "&or=" + G : "&rdm=" + Tcss.rdm + "&rurl=" + Tcss.rurl + "&rarg=" + Tcss.rarg
        }, getMainEnvInfo: function () {
            var d = ""; try {
                var r = "-", v = "-", F = "-", n = "-", y = "-", G = 0, K = navigator; self.screen && (r = screen.width + "x" + screen.height, v = screen.colorDepth + "-bit"); K.language ? F = K.language.toLowerCase() : K.browserLanguage && (F = K.browserLanguage.toLowerCase());
                G = K.javaEnabled() ? 1 : 0; n = K.platform; y = (new Date).getTimezoneOffset() / 60; d = "&scr=" + r + "&scl=" + v + "&lang=" + F + "&java=" + G + "&pf=" + n + "&tz=" + y
            } catch (M) { } finally { return d }
        }, getExtendEnvInfo: function () { var d = ""; try { var r = b.href, v = "-"; d += "&flash=" + this.getFlashInfo(); c.addBehavior && (c.addBehavior("#default#homePage"), c.isHomePage(r) && (d += "&hp=Y")); c.addBehavior && (c.addBehavior("#default#clientCaps"), v = c.connectionType); d += "&ct=" + v } catch (F) { } finally { return d } }, getFlashInfo: function () {
            var d = "-", r = navigator; try {
                if (r.plugins &&
                r.plugins.length) for (var v = 0; v < r.plugins.length; v++) { if (r.plugins[v].name.indexOf("Shockwave Flash") > -1) { d = r.plugins[v].description.split("Shockwave Flash ")[1]; break } } else if (window.ActiveXObject) for (v = 12; v >= 5; v--) try { if (eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + v + "');")) { d = v + ".0"; break } } catch (F) { }
            } catch (n) { } return d
        }, getParameter: function (d, r) { if (d && r) { var v = r.match(RegExp("(\\?|#|&)" + d + "=([^&^#]*)(#|&|$)")); return v ? v[2] : "" } return "" }, getCookieSetDomain: function (d) {
            for (var r, v, F,
            n = [], y = 0, G = 0; G < d.length; G++) d.charAt(G) == "." && (n[y] = G, y++); return r = n.length, v = d.indexOf(".cn"), v > -1 && r--, r == 1 || r > 1 && (F = d.substring(n[r - 2] + 1)), F
        }, watchClick: function (d) {
            try {
                var r = true, v = "", F; F = window.event ? window.event.srcElement : d.target; switch (F.tagName) {
                    case "A": v = "<A href=" + F.href + ">" + F.innerHTML + "</a>"; break; case "IMG": v = "<IMG src=" + F.src + ">"; break; case "INPUT": v = "<INPUT type=" + F.type + " value=" + F.value + ">"; break; case "BUTTON": v = "<BUTTON>" + F.innerText + "</BUTTON>"; break; case "SELECT": v = "SELECT";
                        break; default: r = false
                } if (r) { var n = new g(f), y = n.getElementPos(F); if (f.coordinateId) { var G = n.getElementPos(document.getElementById(f.coordinateId)); y.x -= G.x } n.url.push(n.getDomainInfo(true)); n.url.push("&hottag=" + escape(v)); n.url.push("&hotx=" + y.x); n.url.push("&hoty=" + y.y); n.url.push("&rand=" + Math.round(Math.random() * 1E5)); n.url.unshift("http://pinghot." + this.getCookieSetDomain(h) + "/pingd?"); n.sendInfo(n.url.join("")) }
            } catch (K) { }
        }, getElementPos: function (d) {
            if (d.parentNode === null || d.style.display == "none") return false;
            var r = navigator.userAgent.toLowerCase(), v = null, F = [], n; if (d.getBoundingClientRect) { var y, G, K, M; return n = d.getBoundingClientRect(), y = Math.max(document.documentElement.scrollTop, document.body.scrollTop), G = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft), K = document.body.clientTop, M = document.body.clientLeft, { x: n.left + G - M, y: n.top + y - K } } if (document.getBoxObjectFor) {
                n = document.getBoxObjectFor(d); F = [n.x - (d.style.borderLeftWidth ? Math.floor(d.style.borderLeftWidth) : 0), n.y - (d.style.borderTopWidth ?
                Math.floor(d.style.borderTopWidth) : 0)]
            } else { F = [d.offsetLeft, d.offsetTop]; v = d.offsetParent; if (v != d) for (; v;) { F[0] += v.offsetLeft; F[1] += v.offsetTop; v = v.offsetParent } if (r.indexOf("opera") > -1 || r.indexOf("safari") > -1 && d.style.position == "absolute") { F[0] -= document.body.offsetLeft; F[1] -= document.body.offsetTop } } for (d.parentNode ? v = d.parentNode : v = null; v && v.tagName != "BODY" && v.tagName != "HTML";) { F[0] -= v.scrollLeft; F[1] -= v.scrollTop; v.parentNode ? v = v.parentNode : v = null } return { x: F[0], y: F[1] }
        }, sendClick: function () {
            f.hottag &&
            (this.url.push(this.getDomainInfo(true)), this.url.push("&hottag=" + escape(f.hottag)), this.url.push("&hotx=9999&hoty=9999"), this.url.push("&rand=" + Math.round(Math.random() * 1E5)), this.url.unshift("http://pinghot." + this.getCookieSetDomain(h) + "/pingd?"), this.sendInfo(this.url.join("")))
        }, pgvGetArgs: function () {
            this.getDomainInfo(); var d = []; return d.push("tcss_rp_dm=" + Tcss.dm), d.push("tcss_uid=" + B.get("pgv_pvid=", true)), d.push("tcss_sid=" + B.get("ssid=", true)), d.push("tcss_refer=" + B.get("ts_refer=", true)),
            d.push("tcss_last=" + B.get("ts_last=", true)), d.join("&")
        }, sendInfo: function (d) { q = new Image(1, 1); Tcss.img = q; q.onload = q.onerror = q.onabort = function () { q.onload = q.onerror = q.onabort = null; Tcss.img = null }; q.src = d }
    }; var B = {
        sck: [], sco: {}, init: function () { var d = this.get("pgv_info=", true); if (d != "-") { d = d.split("&"); for (var r = 0; r < d.length; r++) { var v = d[r].split("="); this.set(v[0], unescape(v[1])) } } }, get: function (d, r) {
            var v = r ? a.cookie : this.get("pgv_info=", true), F = "-", n; n = v.indexOf(d); if (n > -1) {
                n += d.length; F = v.indexOf(";",
                n); F == -1 && (F = v.length); if (!r) { var y = v.indexOf("&", n); y > -1 && (F = Math.min(F, y)) } F = v.substring(n, F)
            } return F
        }, set: function (d, r) { this.sco[d] = r; for (var v = false, F = this.sck.length, n = 0; n < F; n++) if (d == this.sck[n]) { v = true; break } v || this.sck.push(d) }, setCookie: function (d, r, v) {
            var F = b.hostname, n = B.get(d + "=", r); if (n == "-" && !v) { switch (d) { case "ts_uid": k.push("nw=1"); break; case "ssid": C = 1 } r ? n = "" : n = "s"; v = (new Date).getUTCMilliseconds(); n += Math.round(Math.abs(Math.random() - 1) * 2147483647) * v % 1E10 } else n = v ? v : n; if (r) switch (d) {
                case "ts_uid": this.saveCookie(d +
                "=" + n, F, this.getExpires(1051200)); break; case "ts_refer": this.saveCookie(d + "=" + n, F, this.getExpires(259200)); break; case "ts_last": this.saveCookie(d + "=" + n, F, this.getExpires(30)); break; default: this.saveCookie(d + "=" + n, j, "expires=Sun, 18 Jan 2038 00:00:00 GMT;")
            } else this.set(d, n); return n
        }, getExpires: function (d) { var r = new Date; return r.setTime(r.getTime() + d * 60 * 1E3), "expires=" + r.toGMTString() }, save: function () {
            if (f.sessionSpan) { var d = new Date; d.setTime(d.getTime() + f.sessionSpan * 60 * 1E3) } for (var r = "", v = this.sck.length,
            F = 0; F < v; F++) r += this.sck[F] + "=" + this.sco[this.sck[F]] + "&"; r = "pgv_info=" + r.substr(0, r.length - 1); v = ""; d && (v = "expires=" + d.toGMTString()); this.saveCookie(r, j, v)
        }, saveCookie: function (d, r, v) { a.cookie = d + ";path=/;domain=" + r + ";" + v }
    }; window.pgvMain = function (d, r) { var v = ""; r ? (v = r, _ver = "tcsso.3.1.5") : (v = d, _ver = "tcss.3.1.5"); try { p && (typeof pvRepeatCount != "undefined" && pvRepeatCount == 1 ? (w = 1, pvRepeatCount = 2) : w = 2); if (w == 1) { w = 2; (new g(v)).run() } } catch (F) { } }; window.pgvSendClick = function (d) { (new g(d)).sendClick() }; window.pgvWatchClick =
    function (d) { (new g(d)).watchClick(d) }; window.pgvGetArgs = function (d) { return (new g(d)).pgvGetArgs() }; (function (d) { var r = document.createElement("script"), v = document.getElementsByTagName("script")[0]; r.src = d; r.type = "text/javascript"; r.async = true; v.parentNode.insertBefore(r, v) })(_speedTestUrl)
})(); define("ping", function () { });
(function (g) { var a = null; window.onerror = function (b, c, f) { b = "http://badjs.qq.com/cgi-bin/js_report?" + ["bid=130&", "msg=" + encodeURIComponent([b, c, f, navigator.userAgent].join("|_|"))].join("&"); a = new Image; a.src = b; new Image; a.src = "http://cgi.connect.qq.com/report/report_vm?monitors=[" + g + "]" } })(340059); define("error", function () { });
define("mq.portal", ["./ping", "./error", "jm"], function () {
    J.$package("mq", function () {
        this.MAIN_DOMAIN = window.location.host; this.MAIN_URL = "http://" + this.MAIN_DOMAIN + "/"; this.WEBQQ_MAIN_URL = "http://web2.qq.com/"; this.STATIC_CGI_URL = "http://s.web2.qq.com/"; this.DYNAMIC_CGI_URL = "http://d.web2.qq.com/"; this.FILE_SERVER = "http://file1.web.qq.com/"; this.setting = {}; this.getVersion = function () { return "0.0.1" }; this.log = function () { window.console && console.log && console.log.apply && console.log.apply(console, arguments) };
        this.debug = function () { if (window.console) { var a = console.error || console.debug || console.dir || console.log; a.apply && a.apply(console, arguments) } }; this.error = function () { window.console && console.error && console.log.apply && console.error.apply(console, arguments) }; typeof pgvMain == "function" && pgvMain(); this.pgvSendClick = function (a) { if (typeof pgvSendClick == "function") { pgvSendClick(a); this.pgvSendClick = pgvSendClick } else this.pgvSendClick = function () { } }; if (typeof localStorage == "undefined") localStorage = this.setting;
        var g = function (a, b) { return a in localStorage ? localStorage[a] == "true" : b }; this.loadSetting = function () { this.setting = { enableHttps: g("enableHttps", false), enableCtrlEnter: g("enableCtrlEnter", false), enableVoice: g("enableVoice", true), enableNotification: g("enableNotification", true) } }; this.saveSetting = function (a) { for (var b = ["enableVoice", "enableNotification", "enableHttps", "enableCtrlEnter"], c = 0, f; f = b[c]; c++) if (f in a) this.setting[f] = localStorage[f] = a[f] }
    })
});
define("tmpl", { load: function (g) { throw Error("Dynamic load not allowed: " + g); } });
define("tmpl!../tmpl/tmpl_main_top.html", [], function () {
    return function (g) {
        var a, b = ""; with (g || {}) b += '<div class="accountHeader">\r\n    <div class="avatar_wrap">\r\n        <img src="' + ((a = user.avatar) == null ? "" : a) + '" width="40" height="40"/>\r\n        <span id="user_online_state"></span>\r\n    </div>\r\n    <span class="text_ellipsis user_nick">' + ((a = encode(user.nick)) == null ? "" : a) + '</span>\r\n    <span class="text_ellipsis user_shuoshuo">' + ((a = encode(user.lnick)) == null ? "" : a) + '</span>\r\n    <div class="icons_list">\r\n    \t<a href="http://qzone.qq.com" class="i_qzone" target="_blank" title="QQ\u7a7a\u95f4">QQ\u7a7a\u95f4</a>\r\n    \t<a href="http://mail.qq.com" class="i_mail" target="_blank" title="QQ\u90ae\u7bb1">QQ\u90ae\u7bb1</a>\r\n    \t<a href="http://t.qq.com" class="i_weibo" target="_blank" title="\u817e\u8baf\u5fae\u535a">\u817e\u8baf\u5fae\u535a</a>\r\n    \t<a href="http://v.qq.com" class="i_video" target="_blank" title="\u817e\u8baf\u89c6\u9891">\u817e\u8baf\u89c6\u9891</a>\r\n    \t<a href="http://www.qq.com" class="i_qqwebsite" target="_blank" title="\u817e\u8baf\u7f51">\u817e\u8baf\u7f51</a>\r\n    \t<a href="http://y.qq.com" class="i_music" target="_blank" title="QQ\u97f3\u4e50">QQ\u97f3\u4e50</a>\r\n    \t<a href="http://wallet.tenpay.com/web/" class="i_wallet" target="_blank" title="QQ\u94b1\u5305">QQ\u94b1\u5305</a>\r\n    \t<a href="http://www.pengyou.com" class="i_pengyou" target="_blank" title="\u670b\u53cb\u7f51">\u670b\u53cb\u7f51</a>\r\n    \t<a href="http://www.weiyun.com" class="i_weiyun" target="_blank" title="\u5fae\u4e91">\u5fae\u4e91</a>\r\n    </div>\r\n</div>\r\n<div class="wallpaper-ctrl">\r\n    <a href="###" class="wallpaperImg pre" id="wp-ctrl-pre" title="\u70b9\u51fb\u5207\u6362\u80cc\u666f\u56fe\u7247" cmd="clickWPPre"> </a>\r\n    <a href="###" class="wallpaperImg next" id="wp-ctrl-next" title="\u70b9\u51fb\u5207\u6362\u80cc\u666f\u56fe\u7247" cmd="clickWPNext"> </a>\r\n</div>\r\n';
        return b
    }
});
define("../lib/mui/js/mui.tab", ["jm"], function () {
    JM.$package("MUI", function (g) {
        var a = g.dom, b = g.event, c = g.type; this.Tab = new g.Class({
            init: function (f) { this._arr = []; this._map = {}; this._selectedIndex = -1; f = f || {}; f.items && this.addRange(f.items); this._selectedClass = f.selectedClass || "selected"; this._selectOnCurrent = f.selectOnCurrent || false; "defaultSelected" in f && this.select(f.defaultSelected, true) }, select: function (f, h, j) {
                f = this.get(f); if (!f) return false; if (this._selectedIndex === f.index && !this._selectOnCurrent && !j) return false;
                j = f.item; var o = null, m = this._selectedIndex; if (this._selectedIndex !== -1 && (o = this._arr[this._selectedIndex])) { o.trigger && a.removeClass(o.trigger, this._selectedClass); o.sheet && a.removeClass(o.sheet, this._selectedClass) } if (this._selectedIndex === f.index) this._selectedIndex = -1; else { this._selectedIndex = f.index; j.trigger && a.addClass(j.trigger, this._selectedClass); j.sheet && a.addClass(j.sheet, this._selectedClass) } h || b.fire(this, "selected", { current: j, currentIndex: f.index, last: o, lastIndex: m }); return true
            }, add: function (f,
            h) { if (this._map[f.id]) return false; this._map[f.id] = f; if (typeof h == "undefined") this._arr.push(f); else { this._arr.splice(h, 0, f); this._selectedIndex >= h && this._selectedIndex++ } }, addRange: function (f) { for (var h = 0, j; j = f[h]; h++) this.add(j) }, remove: function (f) { f = this.get(f); if (!f) return false; this._arr.splice(f.index, 1); delete this._map[f.item.id]; this._selectedIndex === f.index && this.select(this._arr.length - 1); return f }, clear: function () { this._selectedIndex = -1; this._arr = []; this._map = {} }, get: function (f) {
                var h;
                if (c.isNumber(f)) { h = this._arr[f]; if (!h) return null; return { item: h, index: f } } else { h = this._map[f]; if (!h) return null; for (var j = 0, o; o = this._arr[j]; j++) if (o.id === f) return { item: h, index: j }; return null }
            }, getSelected: function () { if (this._selectedIndex !== -1) return { item: this._arr[this._selectedIndex], index: this._selectedIndex }; return null }, getSelectedIndex: function () { return this._selectedIndex }, length: function () { return this._arr.length }, unselect: function (f) { this.select(this._selectedIndex, f, true) }
        })
    })
});
define("../lib/mui/js/mui.textarea", ["jm"], function () {
    JM.$package("MUI", function (g) {
        var a = g.dom, b = g.event; this.AutoGrowTextarea = g.Class({
            init: function (c) { this.id = c.id; this.elem = a.id(this.id); this.maxHeight = c.maxHeight; this.initHeight = c.initHeight; this.hiddenTextarea = this.elem.cloneNode(); this.hiddenTextarea.id = ""; a.addClass(this.hiddenTextarea, "hidden_textarea"); this.elem.parentNode.appendChild(this.hiddenTextarea); this.bindHandler() }, _handleEvent: function (c) { c.type == "input" && this._onInput(c) }, bindHandler: function () {
                var c =
                this._handleEvent = g.bind(this._handleEvent, this); b.on(this.elem, "input", c)
            }, _onInput: function () { this.adjust() }, adjust: function () { this.hiddenTextarea.value = this.elem.value; this.hiddenTextarea.style.width = this.elem.clientWidth + "px"; var c = this.hiddenTextarea.scrollHeight; if (c > this.maxHeight) c = this.maxHeight; else if (c < this.initHeight) c = this.initHeight; if ((parseInt(a.getStyle(this.elem, "height")) || 0) !== c) { a.setStyle(this.elem, "height", c + "px"); b.fire(this, "heightChange", c) } }, reset: function () {
                a.setStyle(this.hiddenTextarea,
                "height", this.initHeight + "px"); a.setStyle(this.hiddenTextarea, "width", parseInt(a.getStyle(this.elem, "width")) + "px")
            }, getContent: function () { return this.elem.value }, setContent: function (c) { this.elem.value = c; this.reset(); this.adjust() }, destory: function () { b.off(this.elem, "input", this._handleEvent); a.remove(this.elem) }
        })
    })
});
define("../lib/mui/js/mui.lazyload", ["jm"], function () {
    JM.$package("MUI", function (g) {
        var a = g.dom, b = g.event; this.I_LazyLoadImgs = g.Class({
            init: function (c) { this.scrollObj = c.scrollObj; this.elem = this.scrollObj.wrapper; this.souceProperty = c.souceProperty || "_ori_src"; this.isFade = c.isFade; this.bindHandlers() }, _onScrollEnd: function () {
                var c = this, f = this._loadFunc, h = this.souceProperty, j = a.$("img[" + h + "]", this.elem), o; if (j.length != 0) {
                    g.each(j, function (m) { if (c.inVisibleArea(m) && (o = m.getAttribute(h))) f(m, o); else return false });
                    b.fire(this, "loadstart")
                }
            }, _loadFunc: function (c, f) { var h = this, j = c.cloneNode(); this.isFade && a.addClass(j, "lazyLoadImg"); b.once(j, "load", function () { if (c.parentNode) { c.parentNode.replaceChild(j, c); h.isFade && setTimeout(function () { a.addClass(j, "loaded") }, 0); b.fire(h, "loadImgOver") } }); b.once(j, "error", function () { c.setAttribute(h.souceProperty); j.setAttribute(h.souceProperty, f) }); c.removeAttribute(h.souceProperty); j.removeAttribute(h.souceProperty); j.src = f }, inVisibleArea: function (c) {
                var f = this.elem.getBoundingClientRect().top,
                h = document.documentElement.clientHeight; f = c.getBoundingClientRect().top - f; c = c.clientHeight; if (f > -c / 2) if (f < h - c / 2) return true; return false
            }, refresh: function () { this._onScrollEnd() }, bindHandlers: function () { var c = this, f, h; this._onScrollEnd = g.bind(this._onScrollEnd, this); this._loadFunc = g.bind(this._loadFunc, this); f = this.scrollObj.options; h = f.onScrollEnd; f.onScrollEnd = h ? function () { h.apply(this, arguments); c._onScrollEnd.apply(this, arguments) } : this._onScrollEnd; b.on(window, "load resize", this._onScrollEnd) },
            destory: function () { this.scrollObj.options.onScrollEnd = null; b.off(window, "load resize", this._onScrollEnd) }
        })
    })
});
define("../lib/mui/js/mui.imagechange", ["jm"], function () {
    JM.$package("MUI", function (g) {
        var a = g.dom, b = g.event; this.ImageChange = g.Class({
            init: function (c) {
                this.elem = a.id(c.id); this.imgsWrapClassName = c.imgsWrapClassName || "wrap"; this.btnsWrapClassName = c.btnsWrapClassName || "btnsWrap"; this.imgsContainer = a.className(this.imgsWrapClassName, this.elem)[0]; this.btnsContainer = a.className(this.btnsWrapClassName, this.elem)[0]; this.currentIndex = c.currentIndex || 0; this.contentsSwipe = MUI.SwipeChange({
                    id: c.id, wrapClassName: this.imgsWrapClassName,
                    fastChange: false
                }); this.preIndex = this.currentIndex; this.count = this.contentsSwipe.count; this.isAutoChange = c.isAutoChange; this.autoChangeTime = c.autoChangeTime || 3E3; this._initBtns(); this.bindHandlers(); this.isAutoChange && this.autoChange()
            }, _handleEvent: function (c) { c = c || window.event; var f = c.type; f == "changed" && this._onSwipeChanged(c); if (f == "click") { c = c.target || c.srcElement; if (c.tagName == "LI") { c = Number(c.getAttribute("_index")); this.slideTo(c); this._onSwipeChanged({ currentIndex: c }) } } }, _onSwipeChanged: function (c) {
                c =
                c.currentIndex; a.removeClass(this.btns[this.preIndex], "selected"); a.addClass(this.btns[c], "selected"); this.currentIndex = this.preIndex = c; this.isAutoChange && this.autoChange()
            }, autoChange: function () { var c = this, f = this.count; clearTimeout(this.runTimeId); this.runTimeId = setTimeout(function () { var h = c.currentIndex; if (h >= f - 1) h = 0; else h++; c.slideTo(h) }, c.autoChangeTime) }, slideTo: function (c) { this.contentsSwipe.slideTo(c) }, _initBtns: function () {
                for (var c = this.count, f = this.currentIndex, h = "", j = 0; j < c; j++) h += j === f ?
                "<li class='selected' _index='" + j + "'></li>" : "<li _index='" + j + "'></li>"; this.btnsContainer.innerHTML = h; this.btns = a.tagName("li", this.btnsContainer)
            }, bindHandlers: function () { var c = this._handleEvent = g.bind(this._handleEvent, this); b.on(this.contentsSwipe, "changed", c); b.on(this.btnsContainer, "click", c) }, destory: function () { b.off(this.contentsSwipe, "changed", this._handleEvent); this.contentsSwipe.destory(); a.remove(this.elem) }, refresh: function () { this.contentsSwipe.refresh() }
        })
    })
});
define("../lib/mui/js/mui.slide", ["jm"], function () {
    JM.$package("MUI", function (g) {
        var a = g.dom, b = g.event, c = "getBoundingClientRect" in document.body, f = "-webkit-transform" in document.body.style; this.Slide = g.Class({
            init: function (h) {
                this.elem = a.id(h.id) || h.id; this.wrapClassName = h.wrapClassName || "wrap"; this.contentWrap = a.$("." + this.wrapClassName, this.elem)[0]; this.contents = a.$("." + this.wrapClassName + ">li", this.elem); this.count = this.contents.length; this.currentIndex = h.currentIndex || 0; this.moveDist = 0; this.runType =
                h.runType || "ease-out"; this.slideTime = h.slideTime || 200; this.fastChange = h.fastChange; this._sizeAdjust(); this._moveTo(this.currentIndex * -this.contentWidth); this.bindHandlers()
            }, bindHandlers: function () {
                var h = this; b.on(this.contentWrap, ["webkitTransitionEnd", "mozTransitionEnd"], function () { alert("p"); b.fire(h, "changed", { type: "changed", currentIndex: h.currentIndex }) }); b.on(h, "changed", function (j) {
                    if (h.fastChange && h.hideArr) {
                        for (; h.hideArr[0];) { a.setStyle(h.hideArr[0], "display", ""); h.hideArr.shift() } h._removeAnimation();
                        h._moveTo(j.currentIndex * -h.contentWidth)
                    }
                }); b.on(window, "resize", function () { h.refresh() })
            }, _removeAnimation: function () { if (f) this.contentWrap.style["-webkit-transition"] = "" }, _sizeAdjust: function () { var h = this.elem, j = this.count, o = c ? h.getBoundingClientRect().width : h.offsetWidth; a.setStyle(this.contentWrap, "width", o * j + "px"); g.each(this.contents, function (m) { a.setStyle(m, "width", o + "px") }); this._removeAnimation(); this._moveTo(-o * this.currentIndex); this.contentWidth = o }, _moveTo: function (h) {
                if (f) this.contentWrap.style["-webkit-transform"] =
                "translate3d(" + h + "px, 0,0 )"; else { this.contentWrap.style.position = "relative"; this.contentWrap.style.left = h + "px" }
            }, slideTo: function (h) {
                var j = this, o = this.currentIndex, m = h - o; this.currentIndex = h; if (this.fastChange && m && Math.abs(m) != 1) if (m != 0) { var q, k = this.contents; if (!this.hideArr) this.hideArr = []; if (m > 0) { m = m - 1; q = 1; h = o + 1 } else { m = -(m + 1); q = -1; this._removeAnimation(); this._moveTo((this.currentIndex + 1) * -this.contentWidth) } for (var e = 1; e <= m; e++) { var t = k[o + e * q]; a.setStyle(t, "display", "none"); this.hideArr.push(t) } } setTimeout(function () {
                    if (f) j.contentWrap.style["-webkit-transition"] =
                    "all " + j.slideTime / 1E3 + "s " + j.runType; j._moveTo(h * -j.contentWidth)
                }, 0)
            }, next: function () { var h = this.currentIndex + 1; h >= this.count || this.slideTo(h) }, pre: function () { var h = this.currentIndex - 1; h < 0 || this.slideTo(h) }, refresh: function () { this._sizeAdjust() }
        })
    })
});
define("../lib/mui/js/mui.swipechange", ["jm", "./mui.slide"], function () {
    JM.$package("MUI", function (g) {
        var a = g.dom, b = g.event, c = g.platform.touchDevice, f, h = (c = g.platform.touchDevice) ? "touchstart" : "mousedown", j = c ? "touchmove" : "mousemove", o = c ? "touchend" : "mouseup", m = "getBoundingClientRect" in document.body, q = g.Class({ extend: MUI.Slide }, {
            init: function (k) { q.callSuper(this, "init", k); this.startX = 0 }, _handleEvent: function (k) {
                q.callSuper(this, "_handleEvent", k); switch (k.type) {
                    case h: this._onStartEvt(k); break; case j: this._onMoveEvt(k);
                        break; case o: this._onEndEvt(k)
                }
            }, _onStartEvt: function (k) { var e = this.elem, t = k.target || k.srcElement; if (a.closest(t, "." + this.wrapClassName)) { f = t; k = k.touches ? k.touches[0] : k; e = m ? e.getBoundingClientRect().left : e.offsetLeft; this.startX = k.clientX - e } }, _onMoveEvt: function (k) {
                if (f) {
                    k.preventDefault(); var e = this.elem; k = (k.touches ? k.touches[0] : k).clientX; e = m ? e.getBoundingClientRect().left : e.offsetLeft; var t = e + this.contentWidth; if (!(k < e || k > t)) {
                        k -= e; this.moveDist = k - this.startX; this._removeAnimation(); this._moveTo(this.currentIndex *
                        -this.contentWidth + this.moveDist)
                    }
                }
            }, _onEndEvt: function () { if (f) { var k = this.moveDist, e = this.elem, t = this.currentIndex; e = (m ? e.getBoundingClientRect().left : e.offsetLeft) + this.contentWidth / 3; if (k > e) t = Math.max(0, t - 1); else if (k < -e) t = Math.min(this.contents.length - 1, t + 1); this.slideTo(t); f = null; this.moveDist = 0 } }, bindHandlers: function () { var k = this._handleEvent = g.bind(this._handleEvent, this); q.callSuper(this, "bindHandlers"); c && b.on(this.elem, [h, j, o].join(" "), k) }, destory: function () {
                c && b.off(this.elem, [h, j, o].join(" "),
                this._handleEvent); q.callSuper(this, "destory")
            }
        }); this.SwipeChange = q
    })
});
define("mq.i18n", ["jm"], function () {
    J.$package("mq.i18n", function () {
        var g = {
            "return": "\u8fd4\u56de", close: "\u5173\u95ed", unname: "\u672a\u547d\u540d", session: "\u4f1a\u8bdd", contact: "\u8054\u7cfb\u4eba", setting: "\u8bbe\u7f6e", plugin: "\u53d1\u73b0", send: "\u53d1\u9001", cancel: "\u53d6\u6d88", search: "\u641c\u7d22", members: "\u6210\u5458", record: "\u804a\u5929\u8bb0\u5f55", beforeclose: "\u60a8\u786e\u5b9a\u8981\u79bb\u5f00\u5417\uff1f", profile: "\u8be6\u7ec6\u8d44\u6599", signature: "\u4e2a\u6027\u7b7e\u540d", publish: "\u516c\u544a",
            gender: "\u6027\u522b", male: "\u7537", female: "\u5973", unknown: "\u672a\u77e5", birthday: "\u751f\u65e5", country: "\u56fd\u5bb6", province: "\u7701\u4efd", city: "\u57ce\u5e02", phone: "\u7535\u8bdd", mobile: "\u624b\u673a", email: "\u7535\u5b50\u90ae\u7bb1", group_member: "\u7fa4\u6210\u5458", discuss_member: "\u8ba8\u8bba\u7ec4\u6210\u5458", buddy_unit: "\u4eba", account: "\u5e10\u53f7", about_qq: "\u5173\u4e8eQQ", loginout: "\u9000\u51fa\u5f53\u524d\u5e10\u53f7", place: "\u6240\u5728\u5730", version: "\u5f53\u524d\u7248\u672c",
            current_version: "V1.0 BETA", service: "\u670d\u52a1\u6761\u6b3e", help: "\u5e2e\u52a9\u4e0e\u53cd\u9988", notify_setting: "\u6d88\u606f\u76f8\u5173\u8bbe\u7f6e", voice: "\u58f0\u97f3", notification: "\u6d88\u606f\u6d6e\u7a97", https_setting: "HTTPS", https_msg: "\u4f7f\u7528 HTTPS \u52a0\u5bc6\u804a\u5929\u5185\u5bb9", send_msg_way: "\u6309Ctrl+Enter\u952e\u53d1\u9001\u6d88\u606f", qzone: "QQ\u7a7a\u95f4", qmail: "QQ\u90ae\u7bb1", qq_portal: "\u817e\u8baf\u7f51", soso_map: "soso\u5730\u56fe", online: "\u5728\u7ebf", offline: "\u79bb\u7ebf",
            away: "\u79bb\u5f00", hidden: "\u9690\u8eab", busy: "\u5fd9\u788c", callme: "Q\u6211", silent: "\u9759\u97f3", cface: "\u81ea\u5b9a\u4e49\u8868\u60c5"
        }; this.message = function (a) { return g[a] || a }; this.faceText = ["\u5fae\u7b11", "\u6487\u5634", "\u8272", "\u53d1\u5446", "\u5f97\u610f", "\u6d41\u6cea", "\u5bb3\u7f9e", "\u95ed\u5634", "\u7761", "\u5927\u54ed", "\u5c34\u5c2c", "\u53d1\u6012", "\u8c03\u76ae", "\u5472\u7259", "\u60ca\u8bb6", "\u96be\u8fc7", "\u9177", "\u51b7\u6c57", "\u6293\u72c2", "\u5410", "\u5077\u7b11", "\u53ef\u7231",
        "\u767d\u773c", "\u50b2\u6162", "\u9965\u997f", "\u56f0", "\u60ca\u6050", "\u6d41\u6c57", "\u61a8\u7b11", "\u5927\u5175", "\u594b\u6597", "\u5492\u9a82", "\u7591\u95ee", "\u5618", "\u6655", "\u6298\u78e8", "\u8870", "\u9ab7\u9ac5", "\u6572\u6253", "\u518d\u89c1", "\u64e6\u6c57", "\u62a0\u9f3b", "\u9f13\u638c", "\u7cd7\u5927\u4e86", "\u574f\u7b11", "\u5de6\u54fc\u54fc", "\u53f3\u54fc\u54fc", "\u54c8\u6b20", "\u9119\u89c6", "\u59d4\u5c48", "\u5feb\u54ed\u4e86", "\u9634\u9669", "\u4eb2\u4eb2", "\u5413", "\u53ef\u601c", "\u83dc\u5200",
        "\u897f\u74dc", "\u5564\u9152", "\u7bee\u7403", "\u4e52\u4e53", "\u5496\u5561", "\u996d", "\u732a\u5934", "\u73ab\u7470", "\u51cb\u8c22", "\u793a\u7231", "\u7231\u5fc3", "\u5fc3\u788e", "\u86cb\u7cd5", "\u95ea\u7535", "\u70b8\u5f39", "\u5200", "\u8db3\u7403", "\u74e2\u866b", "\u4fbf\u4fbf", "\u6708\u4eae", "\u592a\u9633", "\u793c\u7269", "\u62e5\u62b1", "\u5f3a", "\u5f31", "\u63e1\u624b", "\u80dc\u5229", "\u62b1\u62f3", "\u52fe\u5f15", "\u62f3\u5934", "\u5dee\u52b2", "\u7231\u4f60", "NO", "OK", "\u7231\u60c5", "\u98de\u543b", "\u8df3\u8df3",
        "\u53d1\u6296", "\u6004\u706b", "\u8f6c\u5708", "\u78d5\u5934", "\u56de\u5934", "\u8df3\u7ef3", "\u6325\u624b", "\u6fc0\u52a8", "\u8857\u821e", "\u732e\u543b", "\u5de6\u592a\u6781", "\u53f3\u592a\u6781", "\u53cc\u559c", "\u97ad\u70ae", "\u706f\u7b3c", "\u53d1\u8d22", "K\u6b4c", "\u8d2d\u7269", "\u90ae\u4ef6", "\u5e05", "\u559d\u5f69", "\u7948\u7977", "\u7206\u7b4b", "\u68d2\u68d2\u7cd6", "\u559d\u5976", "\u4e0b\u9762", "\u9999\u8549", "\u98de\u673a", "\u5f00\u8f66", "\u5de6\u8f66\u5934", "\u8f66\u53a2", "\u53f3\u8f66\u5934", "\u591a\u4e91",
        "\u4e0b\u96e8", "\u949e\u7968", "\u718a\u732b", "\u706f\u6ce1", "\u98ce\u8f66", "\u95f9\u949f", "\u6253\u4f1e", "\u5f69\u7403", "\u94bb\u6212", "\u6c99\u53d1", "\u7eb8\u5dfe", "\u836f", "\u624b\u67aa", "\u9752\u86d9"]
    })
});
define("mq.view.transitionmanager", ["jm"], function () {
    J.$package("mq.view.transitionManager", function (g) {
        var a = this, b = g.support, c = {}, f = g.prefix && g.prefix.lowercase, h = g.prefix && g.prefix.css; f || (f = ""); h || (h = ""); var j = function (m, q) { for (var k = 0, e = m.length; k < e; k++) if (m[k].id === q) return { item: m[k], index: k }; return null }; this.push = function (m) {
            var q = m.id, k = m.cate || "default", e = m.element, t = g.$default(m.transition, true), C = m.callback; c[k] || (c[k] = []); m = c[k]; var A = j(m, q); if (A !== null) {
                if (t !== true) t = A.index === m.length -
                1; m.splice(A.index, 1); k = A.item
            } else k = { element: e, id: q, cate: k }; e = m.length > 0 ? m[m.length - 1] : null; var p = null; if (e) { p = e.id; e = e.element } A = k.element; m.push(k); t && this.transition(e, A, false, function () { g.event.fire(a, "transitionEnd", { from: p, to: q }); C && C() })
        }; this.pop = function (m, q, k) {
            if (arguments.length === 2) { k = q; q = null } q || (q = "default"); if (c[q]) {
                var e = c[q], t = j(e, m); if (t !== null) {
                    e.splice(t.index); t = t.item.element; e = e.length > 0 ? e[e.length - 1] : null; var C = null; if (e) { C = e.id; e = e.element } this.transition(t, e, true, function () {
                        g.event.fire(a,
                        "transitionEnd", { from: m, to: C }); k && k()
                    })
                }
            }
        }; this.transition = function (m, q, k, e) {
            o(m, q, k, function () {
                if (k) {
                    if (m) { m.style.transition = "transform 0.4s cubic-bezier(0,1,0,1)"; m.style.transform = "translate3d(100%, 0, 0)"; if (h) { m.style[h + "transform"] = "translate3d(100%, 0, 0)"; m.style[h + "transition"] = h + "transform 0.4s cubic-bezier(0,1,0,1)".slice(0, 1).toUpperCase() + "transform 0.4s cubic-bezier(0,1,0,1)".slice(1) } } if (q) {
                        q.style.transition = "transform 0.4s cubic-bezier(0,1,0,1)"; q.style.transform = "translate3d(0, 0, 0)";
                        if (h) { q.style[h + "transform"] = "translate3d(0, 0, 0)"; q.style[h + "transition"] = h + "transform 0.4s cubic-bezier(0,1,0,1)".slice(0, 1).toUpperCase() + "transform 0.4s cubic-bezier(0,1,0,1)".slice(1) }
                    }
                } else {
                    if (m) { m.style.transition = "transform 0.4s cubic-bezier(0,1,0,1)"; m.style.transform = "translate3d(-100%, 0, 0)"; if (h) { m.style[h + "transition"] = h + "transform 0.4s cubic-bezier(0,1,0,1)".slice(0, 1).toUpperCase() + "transform 0.4s cubic-bezier(0,1,0,1)".slice(1); m.style[h + "transform"] = "translate3d(-100%, 0, 0)" } } if (q) {
                        q.style.transition =
                        "transform 0.4s cubic-bezier(0,1,0,1)"; q.style.transform = "translate3d(0, 0, 0)"; if (h) { q.style[h + "transition"] = h + "transform 0.4s cubic-bezier(0,1,0,1)".slice(0, 1).toUpperCase() + "transform 0.4s cubic-bezier(0,1,0,1)".slice(1); q.style[h + "transform"] = "translate3d(0, 0, 0)" }
                    }
                } var t = q || m, C = function () { if (m) m.style.display = "none"; e && e() }; if (window.matchMedia) if (window.matchMedia("(min-width:1000px)").matches) { C(); return } b.transitionend ? g.event.once(t, "transitionend", C) : C()
            })
        }; var o = function (m, q, k, e) {
            if (q) {
                q.style.transition =
                "none"; q.style.transform = "translate3d(" + (k ? "-" : "") + "100%, 0, 0)"; if (h) { q.style[h + "transition"] = "none"; q.style[h + "transform"] = "translate3d(" + (k ? "-" : "") + "100%, 0, 0)" } q.style.display = "block"; setTimeout(e, 20)
            }
        }
    })
});
define("mq.util", ["jm"], function () {
    J.$package("mq.util", function (g) {
        var a = { NORMAL: 0, ID_EXIST: 1, ID_NOT_EXIST: 2 }, b = {}; this.delay = function (h, j, o) { var m = arguments, q = a.NORMAL; if (m.length === 1) { o = h; j = 0; h = null } else if (m.length === 2) { o = j; j = h; h = null } j = j || 0; if (h && j) { if (h in b) { window.clearTimeout(b[h]); q = a.ID_EXIST } m = window.setTimeout(function () { b[h] = 0; delete b[h]; o.apply(window, [h]) }, j); b[h] = m } else window.setTimeout(o, j); return q }; this.clearDelay = function (h) {
            if (h in b) {
                window.clearTimeout(b[h]); b[h] = 0; delete b[h];
                return a.NORMAL
            } return a.ID_NOT_EXIST
        }; this.report2BNL = function (h) { if (!h) return false; if (!h.opername) h.opername = "mediacenter"; if (!h.obj) h.obj = 0; h = "http://cgi.connect.qq.com/report/report?strValue=" + JSON.stringify(h) + "&tag=0&qver=" + mq.getVersion(); qtracker.tracker.Img.send(h) }; this.report2BNL2 = function (h, j) { j = j || 0; var o = "http://cgi.connect.qq.com/report/report?strValue=" + j + "&nValue=" + h + "&tag=0&qver=" + mq.getVersion(); qtracker.tracker.Img.send(o) }; var c = {
            10: "online", 20: "offline", 30: "away", 40: "hidden",
            50: "busy", 60: "callme", 70: "silent"
        }; this.code2state = function (h) { return c[h] || "online" }; var f = { online: 10, offline: 20, away: 30, hidden: 40, busy: 50, callme: 60, silent: 70 }; this.state2code = function (h) { return f[h] || 0 }; this.download = function (h) { var j = g.dom.id("fileDownloader"); if (!j) { j = document.createElement("iframe"); j.id = "fileDownloader"; j.name = "fileDownloader"; j.src = mq.WEBQQ_MAIN_URL + "domain.html"; j.style.display = "none"; document.body.appendChild(j) } j.src = h }
    }); J.$package("mq.util", function () {
        function g(q, k) {
            function e() {
                t =
                t.onload = t.onerror = t.onreadystatechange = null; k()
            } var t = f.createElement("script"); if ("onload" in t) { t.onload = e; t.onerror = function () { e() } } else t.onreadystatechange = function () { /loaded|complete/.test(t.readyState) && e() }; t.async = true; t.src = q; b(t)
        } function a(q, k) {
            function e() { t = t.onload = t.onerror = t.onreadystatechange = null; k() } var t = f.createElement("link"), C = "onload" in t; if (!C || h) setTimeout(function () { c(t, k) }, 1); else if (C) { t.onload = e; t.onerror = function () { e() } } t.rel = "stylesheet"; t.type = "text/css"; t.href = q;
            b(t)
        } function b(q) { o ? j.insertBefore(q, o) : j.appendChild(q) } function c(q, k) { var e = q.sheet, t; if (h) { if (e) t = true } else if (e) try { if (e.cssRules) t = true } catch (C) { if (C.name === "NS_ERROR_DOM_SECURITY_ERR") t = true } setTimeout(function () { t ? k() : c(q, k) }, 20) } var f = window.document, h = +navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") < 536, j = f.getElementsByTagName("head")[0] || f.documentElement, o = j.getElementsByTagName("base")[0], m = /\.css(?:\?|$)/i; this.loadJs = g; this.loadCss = a; this.loadFile = function (q, k) {
            m.test(q) ?
            a(q, k) : g(q, k)
        }
    })
});
define("tmpl!../tmpl/tmpl_title_panel.html", [], function () {
    return function (g) {
        var a, b = ""; with (g || {}) {
            b += ""; if (hasHeader) {
                b += '\r\n<header id="panelHeader-' + ((a = id) == null ? "" : a) + '" class="panel_header">\r\n    '; if (leftButton) b += '\r\n    <div id="panelLeftButton-' + ((a = id) == null ? "" : a) + '" class="btn btn_small btn_left btn_black ' + ((a = leftButton.className) == null ? "" : a) + '" cmd="clickLeftButton">\r\n        <span id="panelLeftButtonText-' + ((a = id) == null ? "" : a) + '" class="' + ((a = leftButton.text ? "btn_text" : "btn_img") ==
                null ? "" : a) + '">' + ((a = encode(leftButton.text)) == null ? "" : a) + "</span>\r\n    </div>\r\n    "; b += '\r\n        <h1 id="panelTitle-' + ((a = id) == null ? "" : a) + '" class="text_ellipsis padding_20">' + ((a = encode(title)) == null ? "" : a) + "</h1>\r\n    "; if (rightButton) b += '\r\n    <button id="panelRightButton-' + ((a = id) == null ? "" : a) + '" class="btn btn_small btn_right btn_black ' + ((a = rightButton.className) == null ? "" : a) + '" cmd="clickRightButton">\r\n        <span id="panelRightButtonText-' + ((a = id) == null ? "" : a) + '" class="' + ((a =
                rightButton.text ? "btn_text" : "btn_img") == null ? "" : a) + '">' + ((a = encode(rightButton.text)) == null ? "" : a) + "</span>\r\n    </button>\r\n    "; b += "\r\n</header>\r\n"
            } b += '\r\n<div id="panelBodyWrapper-' + ((a = id) == null ? "" : a) + '" class="panel_body_container" style="' + ((a = hasHeader ? "top: 45px;" : "") == null ? "" : a) + " " + ((a = hasFooter ? "bottom: 50px;" : "") == null ? "" : a) + '">\r\n    <div id="panelBody-' + ((a = id) == null ? "" : a) + '" class="panel_body ' + ((a = body.className) == null ? "" : a) + '">' + ((a = body.html) == null ? "" : a) + '</div>\r\n    <ul id="pannelMenuList-' +
            ((a = id) == null ? "" : a) + '" class="pannel_menu_list">\r\n    </ul>\r\n</div>\r\n'; if (hasFooter) b += '\r\n<footer id="panelFooter-' + ((a = id) == null ? "" : a) + '" class="' + ((a = footer.className || "") == null ? "" : a) + '" >\r\n    ' + ((a = footer.html) == null ? "" : a) + "\r\n</footer>\r\n"; b += "\r\n"
        } return b
    }
});
define("tmpl!../tmpl/tmpl_main_menu.html", [], function () { return function (g) { var a, b = ""; with (g || {}) { b += ""; g = 0; for (var c; c = menuItems[g]; g++) b += '\r\n<li cmd="' + ((a = c.cmd) == null ? "" : a) + '" class="' + ((a = c.cmd) == null ? "" : a) + '">\r\n    <div class="menu_list_icon"></div>\r\n    ' + ((a = c.text) == null ? "" : a) + "\r\n</li>\r\n"; b += "" } return b } });
define("mq.view.TitlePanel", ["tmpl!../tmpl/tmpl_title_panel.html", "tmpl!../tmpl/tmpl_main_menu.html", "./mq.i18n", "./mq.view.transitionmanager"], function (g, a) {
    J.$package("mq.view", function (b) {
        var c = JM.event, f = JM.dom, h = JM.string, j = mq.i18n.message, o = 0; this.TitlePanel = b.Class({
            init: function (m) {
                m = m || {}; this.parent = m.parent || document.body; this.containerNode = m.containerNode || "div"; this.id = m.id || o++; this.option = m; var q = this.renderData = {
                    id: this.id, title: m.title || j("unname"), className: m.className || "", hasHeader: typeof m.hasHeader ===
                    "undefined" ? true : m.hasHeader, leftButton: m.leftButton || false, rightButton: m.rightButton || false, hasFooter: !!m.footer || m.hasFooter || false, footer: m.footer, body: b.extend({ html: "", className: "" }, m.body || {}), encode: h.encodeHtml
                }; if (m.leftButton) q.leftButton = b.extend({ text: j("return"), className: "" }, m.leftButton); if (m.hasBackButton) q.leftButton = { className: "btn_arrow_left", text: j("return") }; if (m.rightButton) q.rightButton = b.extend({ text: "", className: "" }, m.rightButton); this.create(g)
            }, create: function (m) {
                if (!m) throw Error("no panel template!");
                this.container = document.createElement(this.containerNode); this.container.setAttribute("class", "panel " + this.renderData.className); this.container.id = "panel-" + this.id; this.container.innerHTML = m(this.renderData); this.parent.appendChild(this.container); this.bodyWrapper = f.id("panelBodyWrapper-" + this.id); this.body = f.id("panelBody-" + this.id); this.title = f.id("panelTitle-" + this.id); this.header = f.id("panelHeader-" + this.id); this.footer = f.id("panelFooter-" + this.id); this.menuList = f.id("pannelMenuList-" + this.id);
                this.leftButton = f.id("panelLeftButton-" + this.id); this.rightButton = f.id("panelRightButton-" + this.id); if (this.option.hasScroller) this.scroller = new iScroll(this.bodyWrapper); c.fire(this, "create", this)
            }, destory: function () { c.fire(this, "beforeDestory", this); this.parent.removeChild(this.container); for (var m in this) if (this.hasOwnProperty(m)) { this[m] = null; delete this[m] } }, setTitle: function (m) { this.title.innerHTML = h.encodeHtml(m) }, setBody: function (m) { this.body.innerHTML = m }, show: function () {
                f.setStyle(this.container,
                "display", "block")
            }, hide: function () { f.setStyle(this.container, "display", "none") }, setLeftText: function (m) { if (!this.leftButtonText) this.leftButtonText = f.id("panelLeftButtonText-" + this.id); this.leftButtonText.innerHTML = h.encodeHtml(m) }, setMenuItems: function (m) { this.menuList.innerHTML = a({ menuItems: m }); this.hideMenuList(); f.setStyle(this.menuList, "display", "block") }, hideMenuList: function () { f.removeClass(this.menuList, "show") }, showMenuList: function () { f.addClass(this.menuList, "show") }, toggleMenuList: function () {
                var m =
                this.menuList; if (m) f.hasClass(m, "show") ? this.hideMenuList() : this.showMenuList()
            }
        })
    })
});
define("mq.rpcservice", ["./mq.portal"], function () {
    J.$package("alloy", function () { this.ajaxProxyCallback = function (g, a) { switch (g) { case 1: mq.rpcService.onAjaxFrameLoad(a) } } }); J.$package("mq.rpcService", function (g) {
        var a = this, b = JM.event, c = JM.dom, f = mq.DYNAMIC_CGI_URL + "channel/login2", h = mq.DYNAMIC_CGI_URL + "channel/poll2", j = mq.STATIC_CGI_URL + "api/getvfwebqq", o = mq.DYNAMIC_CGI_URL + "channel/refuse_file2", m = mq.DYNAMIC_CGI_URL + "channel/notify_offfile2", q = {
            "s.web2.qq.com": "http://s.web2.qq.com/proxy.html?v=20130916001",
            "d.web2.qq.com": "http://d.web2.qq.com/proxy.html?v=20130916001"
        }, k = 0, e, t = new g.Class({
            init: function (D) { this._ajaxRequestInstant = D }, send: function (D, E) {
                E = E || {}; E.cacheTime = E.cacheTime || 0; E.onSuccess = E.onSuccess; E.onError = E.onError; E.onTimeout = E.onTimeout; E.onComplete = E.onComplete; var P = {
                    iframeName: E.iframeName, method: E.method || "GET", contentType: E.contentType || "", enctype: E.enctype || "", data: E.data || {}, arguments: E.arguments || {}, context: E.context || null, timeout: E.timeout || 3E4, onSuccess: E.onSuccess && function (s) {
                        s =
                        s.responseText || "-"; var z = {}; try { z = JSON.parse(s) } catch (I) { mq.error("alloy.rpcservice: JSON \u683c\u5f0f\u51fa\u9519", "HttpRequest") } z.arguments = E.arguments || {}; E.onSuccess.call(E.context, z)
                    }, onError: E.onError && function (s) { E.onError.call(E.context, s) }, onTimeout: E.onTimeout && function () { var s = {}; s.arguments = E.arguments || {}; E.onTimeout.call(E.context, s) }, onComplete: E.onComplete && function () { var s = {}; s.arguments = E.arguments || {}; E.onComplete.call(E.context, s) }
                }; P.data = g.http.serializeParam(P.data); if (P.method ==
                "GET") { var u = P.data; if (E.cacheTime === 0) u += u ? "&t=" + (new Date).getTime() : "t=" + (new Date).getTime(); if (u) D = D + "?" + u; P.data = null } else if (!P.contentType) P.contentType = "application/x-www-form-urlencoded"; this._ajaxRequestInstant(D, P)
            }
        }), C = new g.Class({
            init: function (D, E) {
                var P = "qqweb_proxySendIframe_" + D, u = this, s; this.iframeName = P; this._ajaxCallbacks = []; this._proxyAjaxSend = this._proxySend = null; E += (/\?/.test(E) ? "&" : "?") + "id=" + D; s = document.body; var z = c.node("div"); z.setAttribute("class", "hiddenIframe"); z.innerHTML =
                '<iframe id="' + P + '" class="hiddenIframe" name="' + P + '" src="' + E + '" width="1" height="1"></iframe>'; s.appendChild(z); s = document.getElementById(P); this.id = D; this.onAjaxFrameLoad = function () { var I = window.frames[P]; try { if (I.ajax) { u._proxyAjaxSend = I.ajax; var L = u._ajaxCallbacks; I = 0; for (var Q = L.length; I < Q; I++) u.proxySend(L[I].url, L[I].option); u._ajaxCallbacks = [] } } catch (R) { mq.error("ProxyRequest >>>>> ajaxProxy error: " + R.message + " !!!!", "ProxyRequest") } }; g.browser.firefox && s.setAttribute("src", E)
            }, send: function (D,
            E) { if (this._proxyAjaxSend) { this.proxySend(D, E); this.send = this.proxySend } else this._ajaxCallbacks.push({ url: D, option: E }) }, proxySend: function (D, E) { if (!this._proxySend) this._proxySend = new t(this._proxyAjaxSend); E.iframeName = this.iframeName; this._proxySend.send(D, E) }
        }), A = new g.Class({
            init: function (D, E) {
                var P = "qqweb_proxySendIframe" + D; this.iframeName = P; var u = this; this._ajaxCallbacks = []; this._proxyAjaxSend = this._proxySend = null; var s = document.body, z = c.node("div"); z.setAttribute("class", "hiddenIframe"); z.innerHTML =
                '<iframe id="' + P + '" class="hiddenIframe" name="' + P + '" src="' + E + '" width="1" height="1"></iframe>'; s.appendChild(z); P = c.id(P); b.on(P, "load", function () { u._proxyAjaxSend = u.cfProxySend; for (var I = u._ajaxCallbacks, L = 0, Q = I.length; L < Q; L++) u.proxySend(I[L].url, I[L].option); u._ajaxCallbacks = [] }); P.setAttribute("src", E)
            }, send: function (D, E) { if (this._proxyAjaxSend) { this.proxySend(D, E); this.send = this.proxySend } else this._ajaxCallbacks.push({ url: D, option: E }) }, proxySend: function (D, E) {
                if (!this._proxySend) this._proxySend =
                new t(this._proxyAjaxSend); E.iframeName = this.iframeName; this._proxySend.send(D, E)
            }, cfProxySend: function (D, E) {
                var P = w.setOption(E); D = D.replace("http://", "https://"); P = JSON.stringify({ id: P, option: { method: E.method || "GET", data: E.data || null, isAsync: E.isAsync || true, timeout: E.timeout, contentType: E.contentType || "", type: E.type, uri: D }, uri: D, iframeName: E.iframeName, host: mq.MAIN_URL, timestamp: +new Date }); RegExp(/(^http(s)?:\/\/[\w\.]+)\//).test(D); var u = RegExp.$1; if ("postMessage" in window && !g.browser.ie) window.frames[E.iframeName].postMessage(P,
                u); else { var s = c.node("div"); u = u + "/app.rpc.proxy.html"; s.innerHTML = '<iframe class="hiddenCFProxy" name="' + encodeURIComponent(P) + '" src="' + u + '" onload="mq.rpcService.removeCF(this)"></iframe>'; document.body.appendChild(s) }
            }
        }), p = new g.Class({
            init: function () { this._proxyArr = {}; this._cFproxyArr = {}; this._proxyId = 1 }, getProxyId: function () { return this._proxyId++ }, getProxy: function (D, E) {
                if (E) D = D.replace("proxy.html", "cfproxy.html").replace("http://", "https://"); var P = this._proxyArr[D]; if (!P) {
                    P = E ? new A(this.getProxyId(),
                    D) : new C(this.getProxyId(), D); this._proxyArr[D] = P
                } return P
            }, getProxyById: function (D) { for (var E in this._proxyArr) if (this._proxyArr[E].id == D) return this._proxyArr[E]; return null }
        }); this.onAjaxFrameLoad = function (D) { (D = e.getProxyById(D)) && D.onAjaxFrameLoad() }; var w = { id: 0, map: {}, getOptionId: function () { return this.id++ }, setOption: function (D) { var E = this.getOptionId(); this.map[E] = D; return E }, getOption: function (D, E) { var P = this.map[D]; E || delete this.map[D]; return P } }; this.rpcProxyCallback = function (D) {
            D = g.type.isObject(D) ?
                D : JSON.parse(D); var E = D.type, P = w.getOption(D.id); P && P[E](D.option)
        }; var B = function (D) { var E = D.data; D.origin.indexOf("web2.qq.com") > -1 && E && a.rpcProxyCallback(E) }; if ("postMessage" in window) if (window.addEventListener) window.addEventListener("message", B, false); else if (window.attachEvent) window.attachEvent("onmessage", B); else window.onmessage = B; this.removeCF = function (D) { D && window.setTimeout(function () { var E = D.parentNode; E.parentNode.removeChild(E) }, 1E3) }; this.require = function (D) {
            var E = D.data || D.param ||
            {}, P = D.url, u = D.action, s = D.https; D.method = D.method || "GET"; D.data = D.method == "POST" ? { r: JSON.stringify(E) } : E; D.onSuccess = D.onSuccess || function (z) { ("retcode" in z ? z.retcode : "ret" in z ? z.ret : -1) === 0 ? b.fire(a, u + "Success", z) : b.fire(a, u + "Failure", z) }; D.onError = D.onError || function (z) { b.fire(a, u + "Failure", z) }; D.onTimeout = D.onTimeout || function (z) { b.fire(a, u + "Timeout", z) }; e || (e = new p); E = g.string.parseURL(P); if (E = q[E.host]) { E += (/\?/.test(E) ? "&" : "?") + "callback=1"; e.getProxy(E, s).send(P, D) } else mq.error("wrong url or no proxy!")
        };
        this.login = function () { var D = { ptwebqq: mq.ptwebqq, clientid: mq.clientid, psessionid: mq.psessionid }, E = mq.util.code2state(mq.main.loginType); D.status = E; this.require({ url: f, action: "login", method: "POST", data: D, onSuccess: d, onError: r, onTimeout: v }) }; var d = function (D) { switch (D.retcode) { case 0: b.fire(a, "LoginSuccess", D); break; default: b.fire(a, "LoginFailure", { text: "\u767b\u9646\u5931\u8d25" }) } }, r = function () { b.fire(a, "LoginFailure", { text: "\u767b\u9646\u5931\u8d25" }) }, v = function () { b.fire(a, "LoginFailure", { text: "\u767b\u9646\u5931\u8d25" }) };
        this.getVfWebQQ = function () { this.require({ url: j, action: "getVfWebQQ", method: "GET", data: { ptwebqq: mq.ptwebqq, clientid: mq.clientid, psessionid: mq.psessionid } }) }; this.sendPoll = function () { this.require({ url: h, https: mq.setting.enableHttps, action: "poll", method: "POST", data: { ptwebqq: mq.ptwebqq, clientid: mq.clientid, psessionid: mq.psessionid, key: "" }, timeout: 12E4, onSuccess: F, onError: n, onTimeout: y }) }; var F = function (D) {
            var E = D ? D.retcode : -1; if (E === 0 || E === 102) {
                k = 0; try { b.fire(a, "PollSuccess", D.result) } finally {
                    b.fire(a,
                    "PollComplete")
                }
            } else if (E === 100) b.fire(a, "NotReLogin"); else if (E === 120) b.fire(a, "ReLinkFailure", D); else if (E === 121) b.fire(a, "ReLinkFailure", D); else if (E === 116) { mq.main.setValidate({ ptwebqq: D.p }); try { b.fire(a, "PollComplete") } catch (P) { mq.debug("pollComplete notify error: " + P.message, P) } mq.pgvSendClick({ hottag: "smartqq.im.switchpw" }) } else { E != 109 && E != 110 && G(); try { b.fire(a, "PollComplete") } catch (u) { mq.debug("pollComplete notify error: " + u.message, u) } }
        }, n = function (D) { mq.debug("onPollError"); y(D) }, y = function () {
            G();
            try { b.fire(a, "PollComplete") } catch (D) { mq.debug("pollComplete notify error: " + D.message, D) } mq.pgvSendClick({ hottag: "smartqq.im.polltimeout" })
        }, G = function () { mq.debug("pool failure " + k); if (++k > 4) { k = 0; b.fire(a, "FailCountOverMax") } }; this.sendReLink = function () { var D = { ptwebqq: mq.ptwebqq, clientid: mq.clientid, psessionid: mq.psessionid, key: "", state: mq.util.code2state(mq.main.loginType) }; this.require({ url: f, action: "relink", method: "POST", data: D, onSuccess: K, onError: M, onTimeout: O }) }; var K = function (D) {
            switch (D.retcode) {
                case 0: pollMax =
                1; b.fire(a, "ReLinkSuccess", D.result); break; case 103: b.fire(a, "NotReLogin", D.result); break; case 113: case 115: case 112: b.fire(a, "ReLinkFailure", D); break; default: b.fire(a, "ReLinkStop")
            }
        }, M = function () { b.fire(a, "ReLinkFailure") }, O = function () { b.fire(a, "ReLinkFailure") }; this.sendRefuseFile = function (D) { D.psessionid = mq.psessionid; D.clientid = mq.clientid; this.require({ url: o, method: "GET", data: D }) }; this.sendRefuseOfflineFile = function (D) {
            D.psessionid = mq.psessionid; D.clientid = mq.clientid; this.require({
                url: m, method: "GET",
                data: D
            })
        }
    })
});
define("mq.view.MemberList", ["./mq.i18n", "./mq.view.transitionmanager"], function () {
    J.$package("mq.view", function (g) {
        var a = g.dom, b = g.string, c = mq.i18n.message, f = document; this.MemberList = g.Class({
            init: function (h) { h = h || {}; this.id = h.id; this.scrollArea = h.scrollArea; this.listContainer = h.listContainer; this.listTmpl = h.listTmpl; this.create() }, create: function () { this.scroll = new iScroll(this.scrollArea); this.lazyload = MUI.I_LazyLoadImgs({ scrollObj: this.scroll, isFade: true }) }, render: function (h, j) {
                this._preprocessData(h); h.dataType =
                h.prefix; this.listContainer.innerHTML = this.listTmpl(h); !j && this.refresh()
            }, renderAllCategory: function (h) { var j, o; j = 0; for (o = h.length; j < o; ++j) this.renderOneCategory(h[j]) }, renderOneCategory: function (h) { var j = [], o = h.list; h = h.index; g.each(["callme", "online", "away", "busy", "silent", "offline"], function (m) { j = j.concat(o[m]) }); this._renderOneCategory(j, h) }, _renderOneCategory: function (h, j) { if (container = a.id("groupBodyUl-" + j)) container.innerHTML = this.listTmpl({ type: "list", list: h, prefix: this.id, html: b.encodeHtml }) },
            renderOneSignature: function (h, j) { var o = this.listContainer.querySelector("#friend-item-friend-" + h), m, q; if (o) { m = o.querySelector(".member_signature"); q = b.encodeHtml; if (m) m.innerHTML = q(j); else { m = f.createElement("span"); m.setAttribute("class", "member_signature"); m.innerHTML = q(j); msgEle = o.querySelector(".member_msg"); msgEle.appendChild(m) } } }, renderOneState: function (h, j) { var o = this.listContainer.querySelector("#friend-item-friend-" + h); if (o) if (o = o.querySelector(".member_state")) o.innerHTML = "[" + c(j) + "]" },
            renderAllOnlineStateCount: function (h) { var j = a.className("onlinePercent"), o; g.each(h, function (m, q) { if (o = j[q]) o.innerHTML = m.count - m.list.offline.length + "/" + m.count }) }, append: function (h, j) { this._preprocessData(h); h.dataType = h.prefix; var o = this.listTmpl(h), m = document.createElement("div"); m.innerHTML = o; o = m.childNodes; for (m = document.createDocumentFragment() ; o[0];) m.appendChild(o[0]); this.listContainer.appendChild(m); !j && this.refresh() }, destory: function () {
                for (var h in this) if (this.hasOwnProperty(h)) {
                    this[h] =
                    null; delete this[h]
                }
            }, refresh: function () { this.scroll.refresh(); this.lazyload.refresh() }, renderCateItems: function (h) { var j = {}, o = [], m, q; for (m = 0; q = h[m]; m++) { q = g.extend({}, q); q.stateName = "[" + c(q.state) + "]"; if (!j[q.category]) { j[q.category] = []; o.push(q.category) } j[q.category].push(q) } h = o.length; for (m = 0; m <= h; m++) { var k = o[m]; if (j.hasOwnProperty(k)) { q = j[k]; this._renderOneCategory(q, k) } } this.refresh() }, _preprocessData: function (h) { h.html = b.encodeHtml; h.prefix = this.id; return h }
        })
    })
});
define("mq.model.memberlist", ["./mq.i18n", "./mq.portal"], function () {
    J.$package("mq.model.buddylist", function (g) {
        var a = JM.event, b = mq.i18n.message, c = this, f = [], h = [], j = [], o = [], m = [], q = [], k = {}, e = {}, t = {}, C = {}, A = {}, p = [], w = {}, B, d, r = mq.STATIC_CGI_URL + "api/get_user_friends2", v = mq.STATIC_CGI_URL + "api/get_group_name_list_mask2", F = mq.STATIC_CGI_URL + "api/get_discus_list", n = mq.DYNAMIC_CGI_URL + "channel/get_recent_list2", y = mq.STATIC_CGI_URL + "api/get_single_long_nick2", G = mq.STATIC_CGI_URL + "api/get_self_info2", K = mq.STATIC_CGI_URL +
        "api/get_group_info_ext2", M = mq.DYNAMIC_CGI_URL + "channel/get_discu_info", O = mq.STATIC_CGI_URL + "api/get_friend_info2", D = mq.STATIC_CGI_URL + "api/get_friend_uin2", E = mq.DYNAMIC_CGI_URL + "channel/get_online_buddies2", P = mq.DYNAMIC_CGI_URL + "channel/change_status2", u = function (x, H) {
            x += ""; for (var N = [], T = 0; T < H.length; T++) N[T % 4] ^= H.charCodeAt(T); var U = ["EC", "OK"], V = []; V[0] = x >> 24 & 255 ^ U[0].charCodeAt(0); V[1] = x >> 16 & 255 ^ U[0].charCodeAt(1); V[2] = x >> 8 & 255 ^ U[1].charCodeAt(0); V[3] = x & 255 ^ U[1].charCodeAt(1); U = []; for (T = 0; T <
            8; T++) U[T] = T % 2 == 0 ? N[T >> 1] : V[T >> 1]; N = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]; V = ""; for (T = 0; T < U.length; T++) { V += N[U[T] >> 4 & 15]; V += N[U[T] & 15] } return V
        }, s = function (x) { var H = {}; g.each(x.gmasklist, function (N) { H[N.gid] = N.mask }); g.each(x.gnamelist, function (N) { N.mask = H[N.gid] || 0; c.addGroup(new R(N)) }); a.fire(c, "groupListChange", h) }, z = function (x) { g.each(x.dnamelist, function (H) { c.addDiscuss(new X(H)) }); a.fire(c, "discussListChange", m) }, I = function (x, H, N, T, U) {
            N = 0; for (var V = x.length; N < V; N++) {
                var Y =
                x[N]; Y.count = 0; Y.onlineCount = 0; Y.list = { callme: [], online: [], away: [], busy: [], silent: [], offline: [] }; c.addCatagory(Y)
            } g.each(H, function (S, ba) { if (S.uin != B) { var W = T[ba]; W = { uin: W.uin, allow: W.allow, nick: W.nick, face: W.face, age: W.age, gender: W.gender, vip: W.vip, ruin: W.ruin, category: S.categories || 0 }; W.mark = U[W.uin] ? U[W.uin].markname : false; c.addFriend(new Q(W)); (W = c.getCatagoryById(S.categories)) && W.count++ } }); a.fire(c, "friendsListChange", f, o)
        }, L = {
            onGetFriendsListSuccess: function (x) {
                var H = x.categories || [], N = x.friends ||
                [], T = x.vipinfo || [], U = x.info || []; x = x.marknames || []; for (var V = {}, Y = false, S = 0; S < H.length; S++) if (H[S].index == 0) Y = true; for (S = 0; S < x.length; S++) V[x[S].uin] = x[S]; Y || H.unshift({ index: 0, name: "\u6211\u7684\u597d\u53cb" }); I(H, N, T, U, V)
            }, onGetFriendUinSuccess: function (x) { var H = c.getFriendByUin(x.uin); if (H) { H.ruin = x.account; a.fire(c, "friendInfoUpdate", H) } }, onGetGroupListSuccess: function (x) { s(x) }, onGetDiscussListSuccess: function (x) { z(x) }, onGetRecentListSuccess: function (x) { j = x; a.fire(c, "recentListChange", j) }, onGetSignatureSuccess: function (x,
            H) { c.addSignature(x, H); var N = c.getFriendByUin(x); N && N.setSignature(H); a.fire(c, "signatureGot", x, H) }, onGetSelfInfoSuccess: function (x) { c.setSelfInfo(x); a.fire(c, "selfInfoChange", x) }, onGetGroupInfoListSuccess: function (x) {
                var H = x.ginfo, N = H.members, T = x.minfo, U = x.vipinfo, V = x.cards || [], Y = V.length || 0, S = c.getGroupByGid(H.gid); g.extend(S, H); S.hasDetailInfo = true; S.members = []; g.each(N, function (ba, W) {
                    for (var Z = "", ca = ba.muin, $ = T[W], da = U[W], aa = 0; aa < Y; aa++) if (V[aa].muin == ca) { Z = V[aa].card; break } Z = new Q({
                        uin: ca, allow: $.allow,
                        nick: $.nick, face: $.face, age: $.age, gender: $.gender, vip: da.is_vip, country: $.country, city: $.city, province: $.province, group: H, cardName: Z
                    }); if (!c.getFriendByUin(Z.uin)) { Z.isStrange = 1; Z.groupUin = H.gid } c.addFriend(Z); S.members.push(Z)
                }); a.fire(c, "groupInfoUpdate", S)
            }, onGetDiscussInfoListSuccess: function (x) {
                var H = x.info, N = H.mem_list, T = x.mem_info, U = c.getDiscussById(H.did); U.hasDetailInfo = true; U.members = []; g.each(N, function (V, Y) {
                    var S = T[Y]; S = new Q({
                        uin: V.mem_uin, nick: S.nick, allow: S.allow, face: S.face, age: S.age,
                        gender: S.gender, country: S.country, city: S.city, province: S.province, discuss: H
                    }); if (!c.getFriendByUin(S.uin)) { S.isStrange = 1; S.discussUin = H.did } c.addFriend(S); U.members.push(S)
                }); a.fire(c, "discussInfoUpdate", U)
            }, onGetFriendInfo: function (x) { var H = c.getFriendByUin(x.uin); g.extend(H, x); H.hasDetailInfo = true; a.fire(c, "friendInfoUpdate", H) }, onGetBuddyOnlineStateSuccess: function (x) { c.setAllBuddyState(x) }
        }, Q = g.Class({
            init: function (x) {
                this.uin = this.account = x.uin; this.ruin = x.ruin; this.uiuin = x.uiuin; this.allow =
                x.allow; this.face = x.face; this.age = x.age; this.gender = x.gender; this.name = this.nick = x.nick; this.country = x.country; this.city = x.city; this.province = x.province; this.avatar = this.getAvatar(); this.category = x.category; this.group = x.group; this.discuss = x.discuss; this.vip = x.vip || false; this.clientType = x.clientType || "10000"; this.mark = x.mark || false; this.state = x.state || "offline"; this.stateName = "[" + b(this.state) + "]"; this.isStrange = x.isStrange; this.cardName = x.cardName || ""
            }, getAvatar: function () {
                return c.getAvatar(this.uin,
                1)
            }, setSignature: function (x) { if (x) { this.signature = x; a.fire(c, "userSignatureChange", this) } }, setState: function (x) { this.state = x; this.stateName = "[" + b(x) + "]" }
        }), R = g.Class({ init: function (x) { this.gid = this.account = x.gid; this.code = x.code; this.preMask = this.mask = parseInt(x.mask); this.name = x.name; this.markName = x.markName; this.type = x.type; this.hasManageAuthority = this.isLoadInfo = false; this.uin2members = {}; this.level = 0; this.avatar = this.getAvatar() }, getAvatar: function () { return c.getAvatar(this.gid, 4) } }), X = g.Class({
            init: function (x) {
                this.did =
                this.account = x.did; this.mask = parseInt(x.mask || 0); this.preMask = parseInt(this.mask); this.name = x.name; this.isLoadInfo = false; this.members = []; this.owner = ""; this.notSetName = false; this.hadModified = true; this.avatar = this.getAvatar()
            }, getAvatar: function () { return "http://0.web.qstatic.com/webqqpic/style/images/discu_avatar.png" }
        }); this.init = function (x) { B = x.selfUin }; this.bindHandlers = function () { }; this.getAvatar = function (x, H) {
            H = H || 1; return "http://face" + x % 10 + ".web.qq.com/cgi/svr/face/getface?cache=1&type=" + H + "&f=40&uin=" +
            x + "&t=" + Math.floor(new Date / 1E3) + "&vfwebqq=" + mq.vfwebqq
        }; this.getUserFriends = function () { var x = {}; x.vfwebqq = mq.vfwebqq; x.hash = u(B, mq.ptwebqq); return function (H) { mq.rpcService.require({ url: r, method: "POST", withCredentials: true, param: x, onSuccess: function (N) { if (N.retcode == 0) { H(); L.onGetFriendsListSuccess(N.result) } } }) } }; this.getGroupList = function () {
            var x = {}; x.vfwebqq = mq.vfwebqq; return function (H) {
                mq.rpcService.require({
                    url: v, method: "POST", withCredentials: true, param: x, onSuccess: function (N) {
                        if (N.retcode ==
                        0) { H(); L.onGetGroupListSuccess(N.result) }
                    }
                })
            }
        }; this.getDiscussList = function () { var x = {}; x.clientid = mq.clientid; x.psessionid = mq.psessionid; x.vfwebqq = mq.vfwebqq; return function (H) { mq.rpcService.require({ url: F, method: "GET", withCredentials: true, param: x, onSuccess: function (N) { if (N.retcode == 0) { H(); L.onGetDiscussListSuccess(N.result) } } }) } }; this.getRecentList = function (x) {
            var H = {}; H.vfwebqq = mq.vfwebqq; H.clientid = mq.clientid; H.psessionid = mq.psessionid; mq.rpcService.require({
                url: n, method: "POST", withCredentials: true,
                param: H, onSuccess: function (N) { if (N.retcode == 0) { L.onGetRecentListSuccess(N.result); x && x() } }
            })
        }; this.sendGetSignature = function (x) { mq.rpcService.require({ url: y, method: "GET", param: { tuin: x, vfwebqq: mq.vfwebqq }, withCredentials: true, onSuccess: function (H) { H.retcode === 0 && L.onGetSignatureSuccess(x, H.result[0].lnick) } }) }; this.getGroupInfoList = function (x) { var H = {}; H.gcode = x; H.vfwebqq = mq.vfwebqq; mq.rpcService.require({ url: K, method: "GET", param: H, withCredentials: true, onSuccess: function (N) { N.retcode === 0 && L.onGetGroupInfoListSuccess(N.result) } }) };
        this.getDiscussInfoList = function (x) { var H = {}; H.did = x; H.vfwebqq = mq.vfwebqq; H.clientid = mq.clientid; H.psessionid = mq.psessionid; mq.rpcService.require({ url: M, method: "GET", param: H, withCredentials: true, onSuccess: function (N) { N.retcode === 0 && L.onGetDiscussInfoListSuccess(N.result) } }) }; this.sendGetFriendUin = function (x) { var H = {}; H.tuin = x; H.type = 1; H.vfwebqq = mq.vfwebqq; mq.rpcService.require({ url: D, method: "GET", param: H, withCredentials: true, onSuccess: function (N) { N.retcode === 0 && L.onGetFriendUinSuccess(N.result) } }) };
        this.sendGetFriendInfo = function (x) { var H = {}; H.tuin = x; H.vfwebqq = mq.vfwebqq; H.clientid = mq.clientid; H.psessionid = mq.psessionid; mq.rpcService.require({ url: O, method: "GET", param: H, withCredentials: true, onSuccess: function (N) { N.retcode === 0 && L.onGetFriendInfo(N.result) } }) }; this.sendGetBuddyOnlineState = function () { var x = {}; x.vfwebqq = mq.vfwebqq; x.clientid = mq.clientid; x.psessionid = mq.psessionid; mq.rpcService.require({ url: E, method: "GET", param: x, withCredentials: true, onSuccess: function (H) { H.retcode === 0 && L.onGetBuddyOnlineStateSuccess(H.result) } }) };
        this.getBuddyInfo = function (x, H) { H = H || "friend"; var N; if (H == "friend") { N = this.getFriendByUin(x); "signature" in N || this.sendGetSignature(x); N.hasDetailInfo || this.sendGetFriendInfo(x) } else if (H == "group") { N = this.getGroupByGid(x); N.hasDetailInfo || this.getGroupInfoList(N.code) } else if (H == "discuss") { N = this.getDiscussById(x); N.hasDetailInfo || this.getDiscussInfoList(N.did) } return N }; this.getStrangeByUin = function (x) { return w[x] }; this.getFriendByUin = function (x) { return e[x] }; this.getFriends = function () { return o };
        this.getGroupByGid = function (x) { return t[x] }; this.getDiscussById = function (x) { return C[x] }; this.getSignatureByUin = function (x) { return A[x] || 1 }; this.getSelfInfo = function () { return d }; this.addStrange = function (x) { if (!w[x.uin]) { w[x.uin] = x; p.push(x) } return x }; this.addFriend = function (x) { if (!e[x.uin]) { if (!x.type) x.type = "friend"; e[x.uin] = x; o.push(x) } return x }; this.addGroup = function (x) { if (!t[x.gid]) { x.type = "group"; t[x.gid] = x; h.push(x) } return x }; this.addDiscuss = function (x) {
            if (!C[x.did]) {
                x.type = "discuss"; C[x.did] =
                x; m.push(x)
            } return x
        }; this.addSignature = function (x, H) { if (!A[x]) { A[x] = H; q.push(H) } return H }; this.addCatagory = function (x) { if (!k[x.index]) { k[x.index] = x; f.push(x) } return x }; this.getCatagories = function () { return f }; this.getCatagoryById = function (x) { return k[x] }; this.getSelfUin = function () { return B }; this.sendGetSelfInfo = function () { mq.rpcService.require({ url: G, method: "GET", withCredentials: true, onSuccess: function (x) { x.retcode == 0 && L.onGetSelfInfoSuccess(x.result) } }) }; this.setSelfInfo = function (x) {
            x.name = x.nick;
            x.avatar = this.getAvatar(B); x.isSelf = true; d = x; a.fire(c, "getFirstSelfInfo", d)
        }; this.searchFriends = function (x) { var H = [], N = o.concat(h).concat(m); x.length > 0 && g.each(N, function (T) { if (T.name.toUpperCase().indexOf(x.toUpperCase()) > -1 || T.mark && T.mark.toUpperCase().indexOf(x.toUpperCase()) > -1) H.push(T) }); return H }; this.setAllBuddyState = function (x) { for (var H = 0; H < x.length; H++) { var N = x[H]; N.uin != B && this.setState(N.uin, N.status, N.client_type) } a.fire(this, "allBuddyStateChange") }; this.setState = function (x, H) {
            var N =
            this.getFriendByUin(x); if (N && N.state !== H) { N.setState(H); a.fire(this, "buddyStateChange", { uin: x }) }
        }; this.sendChangeStatus = function (x) { x = x || { newstatus: "hidden" }; x.clientid = mq.clientid; x.psessionid = mq.psessionid; mq.rpcService.require({ url: P, method: "GET", param: x, withCredentials: true, onSuccess: function () { mq.rpcService.require({ url: E, method: "GET", param: x, withCredentials: true, onSuccess: function () { } }) } }) }
    })
});
define("mq.presenter.memberlist", ["jm"], function () {
    J.$package("mq.presenter.buddylist", function () {
        var g = JM.event, a = JM.dom, b = this, c = {
            onRecentListChange: function (f) { for (var h = b.model, j = h.getSelfUin(), o = [], m, q = 0, k; k = f[q]; q++) if (k.uin != j) { if (k.type == 0) m = h.getFriendByUin(k.uin); else if (k.type == 1) m = h.getGroupByGid(k.uin); else if (k.type == 2) m = h.getDiscussById(k.uin); m && o.push(m) } b.sessionView.render(o) }, onFriendsListChange: function (f, h) {
                var j = b.contactView; j.memberListAreas.friend.render({
                    type: "category",
                    list: f
                }, true); j.memberListAreas.friend.renderCateItems(h)
            }, onGroupListChange: function (f) { b.contactView.memberListAreas.group.render({ type: "list", list: f }) }, onDiscussListChange: function (f) { b.contactView.memberListAreas.discuss.render({ type: "list", list: f }) }, onUserSignatureChange: function (f) { b.contactView.memberListAreas.friend.renderOneSignature(f.uin, f.signature) }, onReceiveMessage: function (f) {
                var h = f.send_to || f.from_group || f.from_discuss || f.from_user; h = f.notNotify || mq.presenter.chat.isChating(h); b.sessionView.onReceiveMessage(f,
                h)
            }, onMemberInVisibleArea: function (f, h) { var j = b.model; if (h === "friend") { friend = j.getFriendByUin(f); friend.signature || j.sendGetSignature(f) } }, onFriendUinUpdate: function (f) { f = a.id("friend-uin-" + f.account); console.log(f) }, onBuddyStateChange: function (f) { f = f.uin; var h = b.model.getFriendByUin(f); b.contactView.memberListAreas.friend.renderOneState(f, h.state) }, onAllBuddyStateChange: function () {
                for (var f = b.model.getFriends(), h = b.model.getCatagories(), j = b.contactView.memberListAreas.friend, o = 0, m = f.length; o < m; o++) {
                    var q =
                    f[o]; b.model.getCatagoryById(q.category).list[q.state].push(q)
                } j.renderAllOnlineStateCount(h); j.renderAllCategory(h)
            }
        }; this.init = function () { this.contactView = mq.view.contact; this.sessionView = mq.view.session; this.model = mq.model.buddylist; this.view = mq.view.buddylist; this.bindHandlers() }; this.bindHandlers = function () {
            var f = this.model, h = mq.model.chat, j = this.contactView; g.on(f, "recentListChange", c.onRecentListChange); g.on(f, "groupListChange", c.onGroupListChange); g.on(f, "discussListChange", c.onDiscussListChange);
            g.on(f, "userSignatureChange", c.onUserSignatureChange); g.on(f, "getFriendUinUpdate", c.onFriendUinUpdate); g.on(f, "friendsListChange", c.onFriendsListChange); g.on(f, "buddyStateChange", c.onBuddyStateChange); g.on(f, "allBuddyStateChange", c.onAllBuddyStateChange); g.on(h, "messageReceived", c.onReceiveMessage); g.on(h, "groupMessageReceived", c.onReceiveMessage); g.on(h, "discussMessageReceived", c.onReceiveMessage); g.on(j, "memberInVisibleArea", c.onMemberInVisibleArea)
        }
    })
});
define("mq.model.chat", ["./mq.portal"], function () {
    J.$package("mq.model.chat", function (g) {
        var a = JM.event, b = mq.DYNAMIC_CGI_URL + "channel/send_buddy_msg2", c = mq.DYNAMIC_CGI_URL + "channel/send_sess_msg2", f = mq.DYNAMIC_CGI_URL + "channel/send_qun_msg2", h = mq.DYNAMIC_CGI_URL + "channel/send_discu_msg2", j = mq.DYNAMIC_CGI_URL + "channel/get_c2cmsg_sig2", o = this, m = {}, q = {}, k = {}, e = {}, t = {}, C, A = 0, p = (new Date).getTime(); p = (p - p % 1E3) / 1E3; p = p % 1E4 * 1E4; var w = function () { A++; return p + A }; this.addMessage = function (d, r) {
            m[d] || (m[d] = []);
            m[d].push(r); a.fire(o, "messageReceived", r); return r
        }; this.addGroupMessage = function (d, r) { q[d] || (q[d] = []); q[d].push(r); a.fire(o, "groupMessageReceived", r); return r }; this.addDiscussMessage = function (d, r) { k[d] || (k[d] = []); k[d].push(r); a.fire(o, "discussMessageReceived", r); return r }; var B = {
            onPollMessageSuccess: function (d) {
                var r = d.value, v = r.from_uin, F = null; switch (d.poll_type) {
                    case "sess_message": case "message": d = o.m_model.getFriendByUin(v); if (v === 0) { v = o.m_model.getSelfUin(); d = o.m_model.getSelfInfo() } if (d) {
                        F =
                        { content: r.content, from_uin: v, from_user: d, sender: d, sender_uin: v, time: r.time ? r.time * 1E3 : +new Date }; o.addMessage(v, F)
                    } break; case "group_message": var n = o.m_model.getGroupByGid(v); d = o.m_model.getFriendByUin(r.send_uin); for (var y = n.members || [], G = y.length || 0, K = 0; K < G; K++) if (y[K].uin == d.uin) { d.cardName = y[K].cardName; break } if (n && n.mask != 2) { F = { notNotify: !!n.mask, content: r.content, from_uin: v, from_group: n, sender_uin: r.send_uin, sender: d, time: r.time * 1E3 }; o.addGroupMessage(v, F) } break; case "discu_message": v = r.did;
                        n = o.m_model.getDiscussById(v); d = o.m_model.getFriendByUin(r.send_uin); if (n) { F = { content: r.content, from_uin: v, from_discuss: n, sender_uin: r.send_uin, sender: d, time: r.time * 1E3 }; o.addDiscussMessage(v, F) } break; case "filesrv_transfer": o.receiveTransferMsg(d.value); break; case "file_message": o.receiveFile(d.value); break; case "push_offfile": o.receiveOffFile(d.value); break; case "notify_offfile": o.receiveNotifyOffFile(d.value)
                } F && a.fire(o, "allMessageReceived", F)
            }
        }; this.init = function () {
            this.m_model = mq.model.buddylist;
            a.on(mq.main, "receiveMessage", B.onPollMessageSuccess); a.on(mq.main, "receiveFileMessage", B.onPollMessageSuccess)
        }; this.sendMsg = function (d) { d.clientid = mq.clientid; d.msg_id = w(); d.psessionid = mq.psessionid; mq.rpcService.require({ url: b, https: mq.setting.enableHttps, param: d, withCredentials: true, method: "POST", onSuccess: function () { } }) }; this.sendGetSessionSignature = function (d) {
            var r = { id: d.group_uin || d.discuss_uin, to_uin: d.to_uin, clientid: mq.clientid, psessionid: mq.psessionid }; if (d.group_uin) r.service_type = 0;
            else if (d.discuss_uin) r.service_type = 1; currentServiceType = r.service_type; mq.rpcService.require({ url: j, param: r, withCredentials: true, method: "GET", onSuccess: function (v) { if (v.retcode == 0) C = v.result.value } })
        }; this.sendSessMsg = function (d) { d.clientid = mq.clientid; d.msg_id = w(); d.psessionid = mq.psessionid; d.group_sig = C; d.service_type = currentServiceType; mq.rpcService.require({ url: c, param: d, withCredentials: true, method: "POST", onSuccess: function () { } }) }; this.sendGroupMsg = function (d) {
            d.clientid = mq.clientid; d.msg_id =
            w(); d.psessionid = mq.psessionid; mq.rpcService.require({ url: f, https: mq.setting.enableHttps, param: d, withCredentials: true, method: "POST", onSuccess: function () { } })
        }; this.sendDiscussMsg = function (d) { d.clientid = mq.clientid; d.msg_id = w(); d.psessionid = mq.psessionid; mq.rpcService.require({ url: h, https: mq.setting.enableHttps, param: d, withCredentials: true, method: "POST", onSuccess: function () { } }) }; this.getMsgByUin = function (d) { return m[d] }; this.getGroupMsgByGid = function (d) { return q[d] }; this.getDiscussMsgByDid = function (d) { return k[d] };
        this.getMessages = function (d, r) { r = r || "friend"; var v = []; if (r == "friend") v = this.getMsgByUin(d); else if (r == "group") v = this.getGroupMsgByGid(d); else if (r == "discuss") v = this.getDiscussMsgByDid(d); return v }; this.sendFile = function (d) {
            var r = [["sendfile", d.filename]], v = { type: "sendfile", name: d.filename, from_uin: d.to_uin, time: (new Date).getTime(), isread: true, session_id: d.lcid }; e[d.to_uin + "_" + d.lcid] = v; d = { notNotify: true, type: "send_file", system: true, content: r, attach: v, from_uin: o.m_model.getSelfUin(), to_uin: d.to_uin };
            o.receiveMessage(d)
        }; this.receiveTransferMsg = function (d) {
            var r = d.file_infos[0]; if (r.file_name != "") {
                var v = "", F = ""; if (r.file_status == 51) { v = [["transtimeout", r.file_name, d.lc_id]]; F = { type: "transtimeout", name: r.file_name, isread: true } } else if (r.file_status == 50) { v = [["transerror", r.file_name, d.lc_id]]; F = { type: "transerror", name: r.file_name, isread: true } } else if (r.file_status == 53) { v = [["refusedbyclient", r.file_name, d.lc_id]]; F = { type: "refusedbyclient", name: r.file_name, isread: true } } else if (r.file_status == 0) {
                    v =
                    [["transok", r.file_name, d.lc_id]]; F = { type: "transok", name: r.file_name, isread: true }
                } else return false; r = e[d.from_uin + "_" + d.lc_id] || {}; if (r.isFinished || typeof t[d.session_id] != "undefined" && t[d.session_id] === true) return false; else r.isFinished = true; this.receiveMessage({ type: "file_message", system: true, to_uin: d.to_uin, from_uin: d.from_uin, content: v, attach: F })
            }
        }; this.receiveMessage = function (d) {
            var r = d.from_uin, v, F = d.to_uin, n; n = this.m_model.getSelfUin(); v = !r || r == n ? this.m_model.getSelfInfo() : this.m_model.getFriendByUin(r);
            n = F == n ? this.m_model.getSelfInfo() : this.m_model.getFriendByUin(F); if (v) { F = { from_uin: r, from_user: v, sender_uin: r, sender: v, to_uin: F, to_user: n, time: d.time ? d.time * 1E3 : +new Date }; if (v.isSelf) F.send_to = n; F = g.extend(d, F); this.addMessage(r, F) }
        }; this.receiveFile = function (d) {
            if (d.mode === "recv") {
                var r = [["rfile", d.name, d.session_id]]; d.content = r; d.attach = { type: "rfile", name: d.name, from_uin: d.from_uin, time: d.time, isread: false, session_id: d.session_id, msg_type: d.msg_type }; r = d.from_uin + "_" + d.session_id; if (e[r]) e[r] =
                d.attach; else { e[r] = d.attach; d.type = "receive_file"; d.system = true; this.receiveMessage(d) }
            } else if (d.mode === "refuse") {
                if (d.type !== 161) {
                    if (d.cancel_type == 2) { t[d.session_id] = true; var v = parseInt(d.session_id, 10).toString(2); if (v.length >= 12) { v = v.substr(v.length - 12, 12); d.session_id = parseInt(v, 2).toString(10) } } r = d.from_uin + "_" + d.session_id; v = e[r]; if (typeof v == "undefined") return false; if (v.isFinished) return false; else e[r].isFinished = true; r = [["rffile", v.name]]; v.type = "rffile"; if (d.cancel_type == 2) {
                        r = [["wrffile",
                        v.name]]; v.type = "wrffile"
                    } else if (d.cancel_type == 3) { r = [["rtfile", v.name]]; v.type = "rtfile" } d.content = r; d.attach = v; d.type = "refuse_file"; d.system = true; this.receiveMessage(d)
                }
            } else if (d.mode === "send_ack") {
                v = parseInt(d.session_id, 10).toString(2); if (v.length < 12) return false; v = v.substr(v.length - 12, 12); d.session_id = parseInt(v, 2).toString(10); r = d.from_uin + "_" + d.session_id; v = e[r]; r = [["wrfile", v.name, v.session_id]]; d.content = r; d.attach = { type: "wrfile", name: v.name, from_uin: v.from_uin, time: d.time, session_id: d.session_id };
                d.type = "accept_file"; d.system = true; this.receiveMessage(d)
            }
        }; this.getFilesList = function () { return e }; this.receiveOffFile = function (d) { var r = d.from_uin + "_" + d.msg_id; d.msg_type = 9; d.content = [["offfile", "\u5bf9\u65b9\u7ed9\u4f60\u53d1\u9001\u79bb\u7ebf\u6587\u4ef6\u3002"]]; d.attach = d; d.attach.type = "offfile"; d.attach.fileid = r; e[r] = d.attach; d.type = "offfile"; d.system = true; this.receiveMessage(d) }; this.receiveNotifyOffFile = function (d) {
            var r = "", v = ""; if (d.action == 1) {
                r = '\u5bf9\u65b9\u5df2\u6210\u529f\u63a5\u6536\u4e86\u60a8\u53d1\u9001\u7684\u79bb\u7ebf\u6587\u4ef6"' +
                d.filename + '"\u3002'; v = "notifyagreeofffile"
            } else { r = '\u5bf9\u65b9\u62d2\u7edd\u63a5\u6536\u60a8\u53d1\u9001\u7684\u79bb\u7ebf\u6587\u4ef6"' + d.filename + '"\u3002'; v = "notifyrefuseofffile" } r = [[v, r]]; var F = { type: v, name: d.filename, from_uin: d.from_uin, time: (new Date).getTime() }; d = { type: v, from_uin: 0, to: d.from_uin, content: r, attach: F }; d.system = true; this.receiveMessage(d)
        }; this.agreeReceiveFile = function (d) {
            var r = [["agfile", d.name, d.session_id]]; d.type = "agfile"; d = { from_uin: 0, to_uin: d.from_uin, content: r, attach: d };
            d.system = true; this.receiveMessage(d)
        }; this.refuseReceiveFile = function (d) { var r = [["rffile", d.name, d.session_id]]; d.type = "rffile"; r = { from_uin: 0, to_uin: d.from_uin, content: r, attach: d }; r.system = true; this.receiveMessage(r); e[d.from_uin + "_" + d.session_id].isFinished = true; mq.rpcService.sendRefuseFile({ to: d.from_uin, lcid: d.session_id }) }; this.refuseOfflineFile = function (d) {
            mq.rpcService.sendRefuseOfflineFile({ to: d.from_uin, file_name: d.name, file_size: d.size, action: 2 }); d = {
                type: "single", from_uin: 0, to: d.from_uin,
                content: [["refuseofffile", "\u60a8\u62d2\u7edd\u63a5\u6536\u201c" + d.name + "\u201d\uff0c\u6587\u4ef6\u4f20\u8f93\u5931\u8d25\u3002"]], attach: { type: "refuseofffile", name: d.name, from_uin: d.from_uin, time: +new Date }
            }; d.system = true; this.receiveMessage(d)
        }; this.nextOfflineFile = function (d) {
            var r = [["nextofffile", '\u60a8\u53d6\u6d88\u4e86\u79bb\u7ebf\u6587\u4ef6"' + d.name + '"\u7684\u63a5\u6536\uff0c\u6211\u4eec\u5c06\u5728\u60a8\u4e0b\u6b21\u767b\u5f55\u540e\u8fdb\u884c\u63d0\u9192\u3002']], v = {
                type: "nextofffile",
                name: d.name, from_uin: d.from_uin, time: (new Date).getTime()
            }; d = { type: "single", from_uin: 0, to: d.from_uin, content: r, attach: v }; d.system = true; this.receiveMessage(d)
        }
    })
});
define("tmpl!../tmpl/tmpl_chat_footer.html", [], function () {
    return function (g) {
        var a, b = ""; with (g || {}) {
            b += '<div class="chat_toolbar">\r\n<!--     <div id="add_app_btn" class="btn btn_add_grey">\r\n        <span class="btn_img"></span>\r\n    </div> --\>\r\n    <div id="add_face_btn" class="btn btn_face" >\r\n        <span class="btn_img"></span>\r\n    </div>\r\n    <textarea id="chat_textarea" class="input input_white chat_textarea"></textarea>\r\n    <button id="send_chat_btn" class="btn btn_small btn_blue" cmd="sendMsg">\r\n        <span class="btn_text">' + ((a =
            $M("send")) == null ? "" : a) + '</span>\r\n    </button>\r\n</div>\r\n<div id="face_images" class="qq_face_area" style="display:none;">\r\n    <ul class="wrap">\r\n        '; for (g = 1; g < 7; g++) { b += '\r\n        <li class="faceIteam faceIteam' + ((a = g) == null ? "" : a) + '" cmd="chooseFace">\r\n            '; for (var c = 20 * (g - 1) ; c < 20 * g; c++) b += '\r\n        <i title="' + ((a = $F[c]) == null ? "" : a) + '" href="javascript:;"></i>\r\n            '; b += '\r\n            <i title="\u5220\u9664\u952e" href="javascript:;"></i>\r\n        </li>\r\n        ' } b +=
            '\r\n    </ul>\r\n    <ul class="btnsWrap"></ul>\r\n</div>\r\n<!-- <div id="qq_app_area" class="qq_app_area" style="display: none;">\r\n    <ul></ul>\r\n</div> --\>\r\n<iframe id="panel_uploadFilIframe" name="panel_uploadFilIframe" style="display:none"></iframe>'
        } return b
    }
});
define("tmpl!../tmpl/tmpl_chat_list.html", [], function () {
    return function (g) {
        var a, b = ""; with (g || {}) {
            b += ""; g = 0; for (var c; c = list[g]; g++) {
                var f = c.sender; if (c.htmlContent) {
                    b += "\r\n    "; if (lastMessage && isNearTime(lastMessage.time, c.time)) b += "\r\n    "; else { lastMessage = c; b += '\r\n<div class="chat_time"><span>' + ((a = formatChatTime(c.time)) == null ? "" : a) + "</span></div>\r\n    " } b += '\r\n\r\n<div class="chat_content_group ' + ((a = c.sender_uin == selfUin ? "self" : "buddy") == null ? "" : a) + " " + ((a = f ? "" : "need_update") == null ?
                    "" : a) + " " + ((a = c.system ? "system" : "") == null ? "" : a) + '" _sender_uin="' + ((a = c.sender_uin) == null ? "" : a) + '">\r\n    '; if (!c.system) { b += '\r\n    <img class="chat_content_avatar" src="' + ((a = f ? f.avatar : "") == null ? "" : a) + '" width="40px" height="40px">\r\n    '; b += c.from_group && f && f.cardName ? '\r\n        <p class="chat_nick">' + ((a = html(f.cardName + "")) == null ? "" : a) + "</p>\r\n    " : '\r\n        <p class="chat_nick">' + ((a = html((f ? f.name : c.sender_uin) + "")) == null ? "" : a) + "</p>\r\n    "; b += "\r\n    " } b += '\r\n    <p class="chat_content ">' +
                    ((a = translate(c.htmlContent)) == null ? "" : a) + "</p>\r\n</div>\r\n\r\n"
                }
            } b += "\r\n"
        } return b
    }
});
define("tmpl!../tmpl/tmpl_chat_tools.html", [], function () {
    return function (g) {
        var a, b = ""; with (g || {}) b += '\r\n<iframe id="panel_uploadFilIframe_' + ((a = friendUin) == null ? "" : a) + '" name="panel_uploadFilIframe_' + ((a = friendUin) == null ? "" : a) + '" style="display:none" src="http://web2.qq.com/domain.html"></iframe>\r\n<form id="panel_uploadFile_' + ((a = friendUin) == null ? "" : a) + '" name="panel_uploadFile_' + ((a = friendUin) == null ? "" : a) + '"  title="\u53d1\u9001\u6587\u4ef6..." class="panelSendForm" target="panel_uploadFilIframe_' +
        ((a = friendUin) == null ? "" : a) + '" action="" method="POST" enctype="multipart/form-data">\r\n   <a href="javascript:void(0)" id="panel_fileButton_' + ((a = friendUin) == null ? "" : a) + '" hidefocus="true" class="simpleMenuItem panel_sendFileButton" title="\u53d1\u9001\u6587\u4ef6...">\r\n        <input id="upload_file_' + ((a = friendUin) == null ? "" : a) + '" class="f" name="file" type="file" >\r\n   </a>\r\n</form>'; return b
    }
});
define("tmpl!../tmpl/tmpl_chat_sendfile.html", [], function () {
    return function (g) {
        var a, b = ""; with (g || {}) b += '<form id="panel_uploadFile_' + ((a = id) == null ? "" : a) + '" name="panel_uploadFile" title="' + ((a = title) == null ? "" : a) + '" class="panelSendForm" target="panel_uploadFilIframe" action="" method="POST" enctype="multipart/form-data">\r\n    <a href="#" hidefocus="true" class="panel_sendFileButton" title="' + ((a = title) == null ? "" : a) + '">\r\n        <input id="upload_file_' + ((a = id) == null ? "" : a) + '" class="file_input" name="file" type="file">\r\n    </a>\r\n</form>';
        return b
    }
});
define("mq.view.chat", ["tmpl!../tmpl/tmpl_chat_footer.html", "tmpl!../tmpl/tmpl_chat_list.html", "tmpl!../tmpl/tmpl_chat_tools.html", "tmpl!../tmpl/tmpl_chat_sendfile.html", "./mq.i18n", "./mq.view.transitionmanager"], function (g, a) {
    J.$package("mq.view.chat", function (b) {
        var c = this, f = JM.event, h = JM.dom, j = JM.string, o = mq.i18n.message; $F = mq.i18n.faceText; var m = null, q = null, k = false, e, t, C, A, p, w = {
            group: [{ text: "\u7fa4\u6210\u5458", cmd: "viewMembers" }, { text: "\u7fa4\u8d44\u6599", cmd: "viewInfo" }, { text: "\u804a\u5929\u8bb0\u5f55", cmd: "viewRecord" }],
            discuss: [{ text: "\u8ba8\u8bba\u7ec4\u6210\u5458", cmd: "viewMembers" }, { text: "\u8ba8\u8bba\u7ec4\u8d44\u6599", cmd: "viewInfo" }, { text: "\u804a\u5929\u8bb0\u5f55", cmd: "viewRecord" }], friend: [{ text: "QQ\u7a7a\u95f4", cmd: "viewQzone" }, { text: "\u4e2a\u4eba\u8d44\u6599", cmd: "viewInfo" }, { text: "\u804a\u5929\u8bb0\u5f55", cmd: "viewRecord" }]
        }; this.createPanel = function () {
            if (!this.panel) {
                var n = {
                    parent: mq.view.main.container, className: "chat-panel", leftButton: { className: "btn_setting", text: "" }, rightButton: {
                        className: "btn_setting",
                        text: o("close")
                    }, body: { className: "chat_container" }, footer: { className: "chat_toolbar_footer", html: g({ $F: $F, $M: o }) }
                }; this.panel = new mq.view.TitlePanel(n); this.scroll = new iScroll(this.panel.bodyWrapper); this.lazyload = MUI.I_LazyLoadImgs({ scrollObj: this.scroll, isFade: true }); e = this.chatTextarea = MUI.AutoGrowTextarea({ id: "chat_textarea", maxHeight: 80, initHeight: 32 }); f.bindCommands(c.panel.container, B); f.on(e, "heightChange", d.onTextAreaHeightChange); f.on(e, "keydown", d.onTextKeydown); f.on(h.id("add_face_btn"),
                b.platform.touchDevice ? "tap" : "click", d.onClickFace); f.on(c.lazyload, "loadImgOver", d.onLoadImgOver)
            } return this.panel
        }; this.setPannelMenu = function () { var n = w[m.type]; n && this.panel.setMenuItems(n); C = h.id("upload_file_sendFile"); t = h.id("panel_uploadFile_sendFile"); C && f.on(C, "change", this.uploadSendFile) }; this.init = function () { this.main_view = mq.main; this.model = mq.model.chat; this.m_model = mq.model.buddylist; this.presenter = mq.presenter.chat }; var B = {
            sendMsg: function () {
                var n = e.getContent(); if (n != "") {
                    e.setContent("");
                    e.reset(); f.fire(c, "sendMessage", { textContent: n })
                }
            }, clickLeftButton: function () { c.panel.toggleMenuList() }, clickRightButton: function () { m = null; mq.view.transitionManager.pop("chat"); f.fire(c, "close") }, chooseFace: function (n, y, G) { f.fire(c, "chooseFace", G) }, viewQzone: function () { if (m.ruin) { window.open("http://user.qzone.qq.com/" + m.ruin, "_blank"); c.panel.toggleMenuList() } }, viewInfo: function () { f.fire(mq.view, "viewProfile", { from: m.name, account: m.account, type: m.type }); c.panel.toggleMenuList() }, viewRecord: function () {
                f.fire(mq.view,
                "viewRecord", { user: m }); c.panel.toggleMenuList()
            }, viewMembers: function () { var n = m.type == "group" ? "viewGroupMember" : "viewDiscussMember", y = {}; y[m.type] = m; f.fire(mq.view, n, y); c.panel.toggleMenuList() }, sendPicture: function () { c.panel.hideMenuList() }, sendFile: function () { c.panel.hideMenuList() }, agreeFile: function (n, y) { var G = y.getAttribute("_fileid"); f.fire(c, "agreeReceiveFile", G) }, refuseFile: function (n, y) { var G = y.getAttribute("_fileid"); f.fire(c, "refuseReceiveFile", G) }, agreeOfflineFile: function (n, y) {
                var G =
                y.getAttribute("_fileid"); f.fire(c, "agreeOfflineFile", G)
            }, nextOfflineFile: function (n, y) { var G = y.getAttribute("_fileid"); f.fire(c, "nextOfflineFile", G) }, refuseOfflineFile: function (n, y) { var G = y.getAttribute("_fileid"); f.fire(c, "refuseOfflineFile", G) }
        }, d = {
            onTextAreaHeightChange: function () { var n = h.getStyle(c.panel.footer, "height"); h.setStyle(c.panel.bodyWrapper, "bottom", n); c.scroll.refresh() }, onClickFace: function () {
                A = h.id("face_images"); if (A.style.display == "none") {
                    A.style.display = "block"; h.addClass(c.panel.bodyWrapper,
                    "panelShowFace"); c.scroll.refresh(); c.scroll.scrollTo(0, c.scroll.maxScrollY, 0); if (k) p && p.refresh(); else { k = true; p = MUI.ImageChange({ id: "face_images", canSwipe: true }) }
                } else { A.style.display = "none"; var n = h.getStyle(c.panel.footer, "height"); h.setStyle(c.panel.bodyWrapper, "bottom", n); h.removeClass(c.panel.bodyWrapper, "panelShowFace"); c.scroll.refresh() }
            }, onTextKeydown: function (n) {
                var y = e.getContent(), G = function () {
                    if (n.ctrlKey && n.keyCode == 13) { n.preventDefault(); e.setContent(y + "\n"); return false } if (n.keyCode ==
                    13) { n.preventDefault(); if (y != "") { B.sendMsg(); return false } }
                }; if (b.platform.touchDevice) G(); else if (mq.setting.enableCtrlEnter) { if (n.ctrlKey && n.keyCode == 13) { n.preventDefault(); y != "" && B.sendMsg(); return false } if (n.keyCode == 13) { n.preventDefault(); e.setContent(y + "\n"); return false } } else G()
            }, onLoadImgOver: function () { c.scroll.refresh() }
        }, r = function (n) { return n.replace(/\n\r|\r\n|\r|\n/g, "<br/>") }, v = function (n, y) { return Math.abs(n - y) < 12E4 }, F = function (n) {
            n = new Date(n); var y = new Date; return n.getFullYear() ===
            y.getFullYear() && n.getMonth() === y.getMonth() && n.getDate() === y.getDate() ? b.format.date(n, "hh:mm") : b.format.date(n, "YYYY-MM-DD hh:mm")
        }; this.startChat = function (n) {
            if (n) {
                this.createPanel(); if (A && A.style.display == "block") { A.style.display = "none"; e.setContent(""); h.removeClass(c.panel.bodyWrapper, "panelShowFace"); c.scroll.refresh() } if (!(m && m.type === n.type && m.account === n.account)) { m = n; q = null; c.panel.setTitle(n.name); c.panel.body.innerHTML = ""; e.setContent(""); c.scroll.refresh(); c.presenter.initChatMessage(n) } this.setPannelMenu();
                mq.view.transitionManager.push({ id: "chat", element: this.panel.container, callback: function () { c.scroll.refresh(); e.reset(); c.scroll.scrollTo(0, c.scroll.maxScrollY, 0) } }); b.platform.touchDevice || setTimeout(function () { e.elem.focus() }, 200); f.fire(c, "startChat", n)
            }
        }; this.appendMessage = function (n) {
            var y = a({ selfUin: this.m_model.getSelfUin(), list: n, html: j.encodeHtml, translate: r, lastMessage: q, isNearTime: v, formatChatTime: F }); q = n[n.length - 1]; this.panel.body.innerHTML += y; this.scroll.refresh(); this.scroll.scrollTo(0,
            this.scroll.maxScrollY, 0); !b.platform.touchDevice && e.elem && e.elem.focus()
        }; this.updateBuddyInfo = function (n) { var y, G = this.panel.body.querySelectorAll('div[_sender_uin="' + n.account + '"]'); if (G.length) for (var K = 0, M; M = G[K]; K++) { (y = M.querySelector(".chat_content_avatar")) && (y.src = n.avatar); (y = M.querySelector(".chat_nick")) && (y.innerHTML = j.encodeHtml(n.name)); M.removeAttribute("_sender_uin") } }; this.getFileSize = function (n) {
            var y = new Image, G = n.value, K = 0; try { y.dynsrc = G } catch (M) { return 0 } try { K = y.fileSize || 0 } catch (O) { } if (K ==
            0) try { K = n.files[0].fileSize } catch (D) { } return K
        }; this.uploadSendFile = function () {
            var n = ""; n = C.value; if (n == "") alert("\u8bf7\u9009\u62e9\u6587\u4ef6!"); else if (c.getFileSize(C) > 10485760) { alert("\u6587\u4ef6\u5927\u5c0f\u8d85\u51fa10M\u9650\u5236!"); t.reset() } else {
                var y = (new Date).getTime() % 4096; t.action = mq.FILE_SERVER + "v2/" + mq.model.buddylist.getSelfUin() + "/" + m.account + "/" + y + "/" + mq.index + "/" + mq.port + "/1/f/1/0/0?psessionid=" + mq.psessionid; t.submit(); t.reset(); f.fire(c, "sendFile", {
                    filename: n, to_uin: m.account,
                    lcid: y
                })
            }
        }; this.removeReceiveFileLink = function (n) { var y = [], G = h.id("agree_" + n); G && y.push(G); (G = h.id("refuse_" + n)) && y.push(G); (G = h.id("next_" + n)) && y.push(G); for (n = 0; G = y[n]; n++) { G.style.color = "gray"; G.style.cursor = "default"; G.removeAttribute("cmd") } }; this.receiveFile = function (n) { mq.util.download(mq.DYNAMIC_CGI_URL + "channel/get_file2?lcid=" + n.session_id + "&guid=" + n.name + "&to=" + n.from_uin + "&psessionid=" + mq.psessionid + "&count=1&time=" + +new Date + "&clientid=" + mq.clientid) }; this.receiveOfflineFile = function (n) {
            mq.util.download("http://" +
            n.ip + ":" + n.port + "/" + n.name + "?ver=2173&rkey=" + n.rkey + "&range=0")
        }
    })
});
define("mq.presenter.chat", ["./mq.i18n"], function () {
    J.$package("mq.presenter.chat", function (g) {
        var a = JM.event, b = g.string, c = mq.i18n.message, f = mq.i18n.faceText, h = this, j, o, m, q, k = [], e = [], t = [14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 15, 16, 96, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 89, 113, 114, 115, 60, 61, 46, 63, 64, 116, 66, 67, 53, 54, 55, 56, 57, 117, 59, 75, 74, 69, 49, 76, 77, 78, 79, 118, 119, 120, 121, 122, 123, 124, 42, 85, 43, 41, 86, 125, 126, 127, 128,
        129, 130, 131, 132, 133, 134, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170], C = [14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 50, 51, 96, 53, 54, 73, 74, 75, 76, 77, 78, 55, 56, 57, 58, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 32, 113, 114, 115, 63, 64, 59, 33, 34, 116, 36, 37, 38, 91, 92, 93, 29, 117, 72, 45, 42, 39, 62, 46, 47, 71, 95, 118, 119, 120, 121, 122, 123, 124, 27, 21, 23, 25, 26, 125, 126, 127, 128, 129, 130, 131, 132, 133,
        134, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170], A = /\[([A-Z\u4e00-\u9fa5]{1,3}?)\]/gi, p = {
            "\u5fae\u7b11": 14, "\u6487\u5634": 1, "\u8272": 2, "\u53d1\u5446": 3, "\u5f97\u610f": 4, "\u6d41\u6cea": 5, "\u5bb3\u7f9e": 6, "\u95ed\u5634": 7, "\u7761": 8, "\u5927\u54ed": 9, "\u5c34\u5c2c": 10, "\u53d1\u6012": 11, "\u8c03\u76ae": 12, "\u5472\u7259": 13, "\u60ca\u8bb6": 0, "\u96be\u8fc7": 50, "\u9177": 51, "\u51b7\u6c57": 96, "\u6293\u72c2": 53, "\u5410": 54,
            "\u5077\u7b11": 73, "\u53ef\u7231": 74, "\u767d\u773c": 75, "\u50b2\u6162": 76, "\u9965\u997f": 77, "\u56f0": 78, "\u60ca\u6050": 55, "\u6d41\u6c57": 56, "\u61a8\u7b11": 57, "\u5927\u5175": 58, "\u594b\u6597": 79, "\u5492\u9a82": 80, "\u7591\u95ee": 81, "\u5618": 82, "\u6655": 83, "\u6298\u78e8": 84, "\u8870": 85, "\u9ab7\u9ac5": 86, "\u6572\u6253": 87, "\u518d\u89c1": 88, "\u64e6\u6c57": 97, "\u62a0\u9f3b": 98, "\u9f13\u638c": 99, "\u7cd7\u5927\u4e86": 100, "\u574f\u7b11": 101, "\u5de6\u54fc\u54fc": 102, "\u53f3\u54fc\u54fc": 103, "\u54c8\u6b20": 104,
            "\u9119\u89c6": 105, "\u59d4\u5c48": 106, "\u5feb\u54ed\u4e86": 107, "\u9634\u9669": 108, "\u4eb2\u4eb2": 109, "\u5413": 110, "\u53ef\u601c": 111, "\u83dc\u5200": 112, "\u897f\u74dc": 32, "\u5564\u9152": 113, "\u7bee\u7403": 114, "\u4e52\u4e53": 115, "\u5496\u5561": 63, "\u996d": 64, "\u732a\u5934": 59, "\u73ab\u7470": 33, "\u51cb\u8c22": 34, "\u793a\u7231": 116, "\u7231\u5fc3": 36, "\u5fc3\u788e": 37, "\u86cb\u7cd5": 38, "\u95ea\u7535": 91, "\u70b8\u5f39": 92, "\u5200": 93, "\u8db3\u7403": 29, "\u74e2\u866b": 117, "\u4fbf\u4fbf": 72, "\u6708\u4eae": 45,
            "\u592a\u9633": 42, "\u793c\u7269": 39, "\u62e5\u62b1": 62, "\u5f3a": 46, "\u5f31": 47, "\u63e1\u624b": 71, "\u80dc\u5229": 95, "\u62b1\u62f3": 118, "\u52fe\u5f15": 119, "\u62f3\u5934": 120, "\u5dee\u52b2": 121, "\u7231\u4f60": 122, NO: 123, OK: 124, "\u7231\u60c5": 27, "\u98de\u543b": 21, "\u8df3\u8df3": 23, "\u53d1\u6296": 25, "\u6004\u706b": 26, "\u8f6c\u5708": 125, "\u78d5\u5934": 126, "\u56de\u5934": 127, "\u8df3\u7ef3": 128, "\u6325\u624b": 129, "\u6fc0\u52a8": 130, "\u8857\u821e": 131, "\u732e\u543b": 132, "\u5de6\u592a\u6781": 133, "\u53f3\u592a\u6781": 134,
            "\u53cc\u559c": 136, "\u97ad\u70ae": 137, "\u706f\u7b3c": 138, "\u53d1\u8d22": 139, "K\u6b4c": 140, "\u8d2d\u7269": 141, "\u90ae\u4ef6": 142, "\u5e05": 143, "\u559d\u5f69": 144, "\u7948\u7977": 145, "\u7206\u7b4b": 146, "\u68d2\u68d2\u7cd6": 147, "\u559d\u5976": 148, "\u4e0b\u9762": 149, "\u9999\u8549": 150, "\u98de\u673a": 151, "\u5f00\u8f66": 152, "\u5de6\u8f66\u5934": 153, "\u8f66\u53a2": 154, "\u53f3\u8f66\u5934": 155, "\u591a\u4e91": 156, "\u4e0b\u96e8": 157, "\u949e\u7968": 158, "\u718a\u732b": 159, "\u706f\u6ce1": 160, "\u98ce\u8f66": 161,
            "\u95f9\u949f": 162, "\u6253\u4f1e": 163, "\u5f69\u7403": 164, "\u94bb\u6212": 165, "\u6c99\u53d1": 166, "\u7eb8\u5dfe": 167, "\u836f": 168, "\u624b\u67aa": 169, "\u9752\u86d9": 170
        }, w = ["font", { name: "\u5b8b\u4f53", size: 10, style: [0, 0, 0], color: "000000" }], B = {
            onMessageReceived: function (n) { var y = n.send_to || n.from_user; if (y.isSelf) y = n.to_user; if (y && o === "friend" && (y.uin == j || y.uin == m)) h.appendMessage([n]) }, onGroupMessageReceived: function (n) { var y = n.from_group, G = n.from_user; if (y && y.gid == j && o === "group" || G && G.uin == m) h.appendMessage([n]) },
            onDiscussMessageReceived: function (n) { var y = n.from_discuss, G = n.from_user; if (y && y.did == j && o === "discuss" || G && G.uin == m) h.appendMessage([n]) }, onLoginSuccess: function (n) { m = n.selfUin }, onStartChat: function (n) { var y; y = n.type; n = n.uin; var G = mq.model.buddylist; if (y == "friend") { G.sendGetFriendUin(n); var K = G.getFriendByUin(n); K.isStrange && h.model.sendGetSessionSignature({ to_uin: n, group_uin: K.groupUin, discuss_uin: K.discussUin }) } y = G.getBuddyInfo(n, y); j = y.uin || y.did || y.gid; o = y.type; h.view.startChat(y) }, onSendMessage: function (n) {
                if (mq.main.isOnline()) {
                    var y =
                    h.model, G = mq.model.buddylist, K = G.getSelfUin(), M = G.getSelfInfo(), O = h.getCurrentChatUin(), D = h.getCurrentChatType(), E = n.textContent; E = E.replace(A, "@#[$1]@# "); k = E.split("@#"); n = k.length; if (n > 1) { for (E = 0; E < n; E++) { k[E] == "" && k.splice(E, E + 1); if (A.test(k[E])) if ((q = p[k[E].replace("[", "").replace("]", "")]) || q === 0) k[E] = ["face", q] } k.push(w) } else k = [E, w]; n = JSON.stringify(k); K = { notNotify: true, content: k, from_uin: K, sender_uin: K, from_user: M, sender: M, to_uin: O, to_type: D, time: Date.now() }; if (D == "friend") {
                        G.getFriendByUin(O).isStrange ?
                        y.sendSessMsg({ to: O, content: n, face: M.face }) : y.sendMsg({ to: O, content: n, face: M.face }); K.send_to = G.getFriendByUin(O); y.addMessage(O, K)
                    } else if (D == "group") { y.sendGroupMsg({ group_uin: O, content: n, face: M.face }); K.send_to = G.getGroupByGid(O); y.addGroupMessage(O, K) } else if (D == "discuss") { y.sendDiscussMsg({ did: O, content: n, face: M.face }); K.send_to = G.getDiscussById(O); y.addDiscussMessage(O, K) }
                } else mq.bubble('\u60a8\u5df2\u7ecf\u79bb\u7ebf\uff0c\u8bf7\u91cd\u65b0<a href="javascript:void(0);" cmd="gotoLogin" title="\u767b\u5f55">\u767b\u5f55</a>')
            },
            onSendFile: function (n) { h.model.sendFile(n) }, onChooseFace: function (n) {
                if (n.target && n.target.title) {
                    var y = mq.view.chat.chatTextarea.getContent(); if (n.target.title === "\u5220\u9664\u952e") {
                        n = y.length; if (y.charAt(n - 1) === "]" && n >= 3) {
                            var G = y.substring(n - 5, n), K = y.substring(0, n - 5); G = G.replace(A, "@#[$1]@#"); e = G.split("@#"); G = e.length; var M = "", O = false; if (G > 1) {
                                for (var D = 0; D < G; D++) {
                                    e[D] == " " && e.splice(D, D + 1); if (A.test(e[D])) if ((q = p[e[D].replace("[", "").replace("]", "")]) || q === 0) { e.splice(D, D + 1); O = true } if (e[D]) M +=
                                    e[D]
                                } if (O) { mq.view.chat.chatTextarea.setContent(K + M); return }
                            }
                        } y = y.substring(0, n - 1); mq.view.chat.chatTextarea.setContent(y)
                    } else { mq.view.chat.chatTextarea.setContent(y + "[" + n.target.title + "]"); n.preventDefault() }
                }
            }, onBuddyInfoUpdate: function (n) { n.account === j && n.type === o && n.members && n.members.forEach(function (y) { h.view.updateBuddyInfo(y) }) }, onClose: function () { o = j = null }, onAgreeReceiveFile: function (n) { var y = h.model.getFilesList()[n]; y.isread = true; h.view.removeReceiveFileLink(n); h.view.receiveFile(y); h.model.agreeReceiveFile(y) },
            onRefuseReceiveFile: function (n) { var y = h.model.getFilesList(); y[n].isread = true; h.view.removeReceiveFileLink(n); h.model.refuseReceiveFile(y[n]) }, onAgreeOfflineFile: function (n) { var y = h.model.getFilesList()[n]; y.isread = true; h.view.removeReceiveFileLink(n); h.view.receiveOfflineFile(y); h.model.agreeReceiveFile(y) }, onNextOfflineFile: function (n) { h.model.getFilesList()[n].isread = true; h.view.removeReceiveFileLink(n) }, onRefuseOfflineFile: function (n) {
                var y = h.model.getFilesList()[n]; y.isread = true; h.view.removeReceiveFileLink(n);
                h.model.refuseOfflineFile(y)
            }
        }; this.init = function () { this.view = mq.view.chat; this.model = mq.model.chat; d() }; var d = function () {
            var n = h.model; a.on(n, "messageReceived", B.onMessageReceived); a.on(n, "groupMessageReceived", B.onGroupMessageReceived); a.on(n, "discussMessageReceived", B.onDiscussMessageReceived); a.on(mq.main, "loginSuccess", B.onLoginSuccess, this); a.on(mq.view, "startChat", B.onStartChat); a.on(mq.view.chat, "sendMessage", B.onSendMessage); a.on(mq.view.chat, "sendFile", B.onSendFile); a.on(mq.view.chat, "chooseFace",
            B.onChooseFace); a.on(mq.view.chat, "close", B.onClose); a.on(mq.view.chat, "agreeReceiveFile", B.onAgreeReceiveFile); a.on(mq.view.chat, "refuseReceiveFile", B.onRefuseReceiveFile); a.on(mq.view.chat, "agreeOfflineFile", B.onAgreeOfflineFile); a.on(mq.view.chat, "nextOfflineFile", B.onNextOfflineFile); a.on(mq.view.chat, "refuseOfflineFile", B.onRefuseOfflineFile); a.on(mq.model.buddylist, "groupInfoUpdate", B.onBuddyInfoUpdate); a.on(mq.model.buddylist, "discussInfoUpdate", B.onBuddyInfoUpdate)
        }; this.getCurrentChatUin =
        function () { return j }; this.getCurrentChatType = function () { return o }; this.isChating = function (n) { return n && n.account == j && n.type == o }; this.initChatMessage = function (n) { (n = h.model.getMessages(n.account, n.type)) && this.appendMessage(n) }; this.appendMessage = function (n) { n = this.translateMessages(n); this.view.appendMessage(n) }; this.translateMessages = function (n) { for (var y = 0, G; G = n[y]; y++) if (G.content) { if (!G.sender) G.sender = mq.model.buddylist.getFriendByUin(G.sender_uin); G.htmlContent = this.translateMessage(G) } return n };
        this.translateMessage = function (n) {
            for (var y = n.content, G = n.from_uin, K = !G || G == mq.model.buddylist.getSelfUin(), M = [], O = 0, D; D = y[O]; O++) if (g.type.isArray(D)) switch (D[0]) {
                case "font": break; case "face": D = C.indexOf(D[1]); M.push('<img class="EQQ_faceImg" src="http://pub.idqqimg.com/lib/qqface/' + t[D] + '.gif" width="24px" height="24px">'); break; case "cface": M.push("[\u81ea\u5b9a\u4e49\u8868\u60c5]"); break; case "offpic": M.push('<img rdata="offpic" src="/css/image/img_loading.gif" _ori_src="http://w.qq.com/d/channel/get_offpic2?file_path=' +
                encodeURIComponent(D[1].file_path) + "&f_uin=" + G + "&clientid=" + mq.clientid + "&psessionid=" + mq.psessionid + '" title="\u81ea\u5b9a\u4e49\u8868\u60c5\u56fe\u7247" style="max-width:100%" />'); break; case "sendfile": M.push('<span class="icon icon_info"></span>\u60a8\u53d1\u9001\u6587\u4ef6"' + b.encodeHtml(D[1]) + '"\u7ed9\u5bf9\u65b9\u3002'); break; case "transtimeout": M.push('<span class="icon icon_err"></span>\u63a5\u6536\u6587\u4ef6"' + b.encodeHtml(D[1]) + '"\u8d85\u65f6\uff0c\u6587\u4ef6\u4f20\u8f93\u5931\u8d25\u3002');
                    break; case "refusedbyclient": M.push('<span class="icon icon_err"></span>\u5bf9\u65b9\u53d6\u6d88\u4e86\u63a5\u6536\u6587\u4ef6"' + b.encodeHtml(D[1]) + '"\uff0c\u6587\u4ef6\u4f20\u8f93\u5931\u8d25\u3002'); break; case "transok": M.push('<span class="icon icon_succ"></span>\u6587\u4ef6"' + b.encodeHtml(D[1]) + '"\u4f20\u8f93\u6210\u529f\u3002'); break; case "transerror": M.push('<span class="icon icon_err"></span>\u5bf9\u65b9\u53d6\u6d88\u4e86\u63a5\u6536\u6587\u4ef6"' + b.encodeHtml(D[1]) + '"\u6216\u4f20\u8f93\u9519\u8bef\uff0c\u6587\u4ef6\u4f20\u8f93\u5931\u8d25\u3002');
                        break; case "rffile": K ? M.push('<span class="icon icon_err"></span>\u60a8\u62d2\u7edd\u63a5\u6536"' + b.encodeHtml(D[1]) + '"\uff0c\u6587\u4ef6\u4f20\u8f93\u5931\u8d25\u3002') : M.push('<span class="icon icon_err"></span>\u5bf9\u65b9\u53d6\u6d88\u4e86\u63a5\u6536\u6587\u4ef6"' + b.encodeHtml(D[1]) + '"\uff0c\u6587\u4ef6\u4f20\u8f93\u5931\u8d25\u3002'); break; case "agfile": M.push('<span class="icon icon_info"></span>\u60a8\u540c\u610f\u4e86\u63a5\u6536\u6587\u4ef6"' + b.encodeHtml(D[1]) + '"\u3002'); break; case "rtfile": M.push('<span class="icon icon_err"></span>\u63a5\u6536\u6587\u4ef6"' +
                        b.encodeHtml(D[1]) + '"\u8d85\u65f6\uff0c\u6587\u4ef6\u4f20\u8f93\u5931\u8d25\u3002'); break; case "wrfile": M.push('<span class="icon icon_info"></span>\u5bf9\u65b9\u5df2\u540c\u610f\u63a5\u6536"' + b.encodeHtml(D[1]) + '"\uff0c\u5f00\u59cb\u4f20\u8f93\u6587\u4ef6\u3002'); break; case "wrffile": M.push('<span class="icon icon_err"></span>\u5bf9\u65b9\u62d2\u7edd\u4e86\u63a5\u6536\u6587\u4ef6"' + b.encodeHtml(D[1]) + '"\uff0c\u6587\u4ef6\u4f20\u8f93\u5931\u8d25\u3002'); break; case "rfile": M.push(v(n)); break; case "offfile": M.push(F(n));
                            break; case "sendofffile": case "sendofffileerror": case "refuseofffile": case "nextofffile": case "canceloffupload": case "notifyagreeofffile": case "notifyrefuseofffile": M.push(b.encodeHtml(D[1])); break; default: M.push(b.encodeHtml(D[1]))
            } else { D = b.encodeHtml(D); M.push(D) } return M.join("")
        }; this.translateMessage2Text = function (n) {
            n = n.content; var y = [], G, K; for (G = 0; K = n[G]; ++G) if (g.type.isArray(K)) switch (K[0]) {
                case "face": y.push("[" + f[C.indexOf(K[1])] + "]"); break; case "cface": case "offpic": y.push("[" + c("cface") +
                "]")
            } else g.type.isString(K) && y.push(b.encodeHtml(K)); return y.join("")
        }; var r = function (n) {
            if (!(typeof n == "undefined" || n == "")) {
                n = n.split("."); n = n[n.length - 1].toLowerCase(); switch (n) {
                    case "excel": case "xls": case "xlsx": n = "excel"; break; case "doc": case "docx": n = "word"; break; case "ppt": case "pptx": n = "ppt"; break; case "bmp": case "png": case "gif": case "jpeg": case "jpg": case "ico": n = "pic"; break; case "tga": case "tif": case "psd": case "tiff": n = "pic"; break; case "mov": case "avi": case "mpeg": case "mpg": case "ra": case "rm": case "rmvb": case "qt": case "asf": case "wmv": case "swf": case "flv": case "mp4": n =
                    "media"; break; case "mp3": case "wav": case "mid": n = "music"; break; case "arj": case "rar": case "zip": case "jar": case "7z": case "tar": case "uc2": case "gz": case "lha": case "ace": case "tgz": n = "rar-zip"; break; case "txt": case "text": n = "share-txt"; break; case "pdf": n = "pdf16"; break; case "com": n = "exe16"; break; default: n = "others"
                } return n
            }
        }, v = function (n) {
            var y = n.content[0]; n = n.from_uin + "_" + y[2]; var G = mq.model.chat.getFilesList(); html = '<span class="icon icon_info" ></span>\u5bf9\u65b9\u7ed9\u60a8\u53d1\u9001\u6587\u4ef6: <br/><span class="file_icon icon_' +
            r(y[1]) + '">&nbsp;</span>' + b.encodeHtml(y[1]) + '<span class="fileAct">'; if (G[n].isread) html += "&nbsp;[\u540c\u610f][\u62d2\u7edd]"; else { html += '&nbsp;<span class="fileLink" id="agree_' + n + '" _fileid="' + n + '" cmd="agreeFile" >[\u540c\u610f]</span>'; html += '&nbsp;<span class="fileLink" id="refuse_' + n + '" _fileid="' + n + '" cmd="refuseFile">[\u62d2\u7edd]</span>' } html += "</span>"; return html
        }, F = function (n) {
            var y = n.attach.from_uin + "_" + n.attach.msg_id, G = g.format.date(new Date(n.attach.expire_time * 1E3), "YYYY-MM-DD"),
            K = '<span class="icon icon_info" ></span>\u5bf9\u65b9\u7ed9\u60a8\u53d1\u9001\u79bb\u7ebf\u6587\u4ef6:<br />'; K += '<span class="file_icon icon_' + r(n.attach.name) + '">&nbsp;</span>' + b.encodeHtml(n.attach.name) + "(" + G + '\u5230\u671f)<span class="fileAct">'; K += '&nbsp;<span class="fileLink" id="agree_' + y + '" _fileid="' + y + '" cmd="agreeOfflineFile">[\u63a5\u6536]</span>'; K += '&nbsp;<span class="fileLink" id="next_' + y + '" _fileid="' + y + '" cmd="nextOfflineFile">[\u4e0b\u6b21\u63a5\u6536]</span>'; K += '&nbsp;<span class="fileLink" id="refuse_' +
            y + '" _fileid="' + y + '" cmd="refuseOfflineFile" >[\u62d2\u7edd]</span>'; K += "</span>"; return K
        }
    })
});
define("mq.presenter.search", ["./mq.i18n", "./mq.view.transitionmanager"], function () { J.$package("mq.presenter.search", function () { var g = this, a = JM.event; this.init = function () { this.view = mq.view.search; this.model = mq.model.buddylist; a.on(mq.view, "startSearch", b.onStartSearch); a.on(g.view, "searchFriends", b.onSearchFriends) }; var b = { onStartSearch: function (c) { g.view.startSearch(c) }, onSearchFriends: function (c) { c = g.model.searchFriends(c.keyword); g.view.renderResult({ type: "list", list: c }) } } }) });
define("tmpl!../tmpl/tmpl_search_body.html", [], function () {
    return function (g) {
        var a, b = ""; with (g || {}) b += '<div id="searchBar" class="search_wrapper">\r\n    <div class="search_inner">\r\n        <input id="searchInput" type="text" class="searchInput" placeholder="' + ((a = $M("search")) == null ? "" : a) + '" autocapitalize="off" />\r\n        <button id="searchClear" class="searchClear" cmd="clearSearchWord"></button>\r\n    </div>\r\n    <button id="searchCancel" class="searchCancel" cmd="clearSearchWord">' + ((a =
        $M("cancel")) == null ? "" : a) + '</button>\r\n</div>\r\n<div id="search_container_scroll_area" class="scrollWrapper search">\r\n    <div id="search_container" class="search_container">\r\n        <ul id="search_result_list" class="list list_white catogory_List">\r\n        </ul>\r\n    </div>\r\n</div>'; return b
    }
});
define("tmpl!../tmpl/tmpl_member_list.html", [], function () {
    return function (g) {
        var a, b = ""; with (g || {}) {
            b += ""; g = 0; var c; b += "\r\n"; if (type === "category") {
                b += "\r\n"; for (g = 0; c = list[g]; g++) b += '\r\n<li class="list_group">\r\n    <div id="groupTitle-' + ((a = c.index) == null ? "" : a) + '" class="list_group_title list_group_white_title list_arrow_right" cmd="clickMemberGroup" param="' + ((a = c.index) == null ? "" : a) + '">\r\n        <span>' + ((a = html(c.name)) == null ? "" : a) + '</span>\r\n        <span class="onlinePercent"></span>\r\n    </div>\r\n    <ul id="groupBodyUl-' +
                ((a = c.index) == null ? "" : a) + '" class="list_group_body list list_white catogory_List"></ul>\r\n</li>\r\n'; b += "\r\n"
            } else if (type === "list") {
                b += "\r\n"; for (g = 0; c = list[g]; g++) {
                    b += '\r\n<li id="' + ((a = prefix ? prefix + "-" : "") == null ? "" : a) + "item-" + ((a = c.type + "-" + c.account) == null ? "" : a) + '" class="list_item" _uin="' + ((a = c.account) == null ? "" : a) + '" _type="' + ((a = c.type) == null ? "" : a) + '" cmd="clickMemberItem">\r\n    <a href="javascript:void(0);" class="avatar" cmd="clickMemberAvatar" _uin="' + ((a = c.account) == null ? "" : a) + '" _type="' +
                    ((a = c.type) == null ? "" : a) + '"><img  src="/css/image/avatar_default_40_40.gif" _ori_src="' + ((a = c.avatar) == null ? "" : a) + '" >\r\n        '; if (c.mask) b += '\r\n        <span class="group_mask" />\r\n        '; b += '\r\n    </a>\r\n    <p class="member_nick" id="userNick-' + ((a = c.account) == null ? "" : a) + '">\r\n    '; b += c.mark ? "\r\n        " + ((a = html(c.mark)) == null ? "" : a) + "<span>(" + ((a = html(c.name)) == null ? "" : a) + ")</span>\r\n    " : c.cardName ? "\r\n        " + ((a = html(c.cardName)) == null ? "" : a) + " <span> (" + ((a = html(c.name)) ==
                    null ? "" : a) + ")</span>\r\n    " : "\r\n        " + ((a = html(c.name)) == null ? "" : a) + "\r\n    "; b += "\r\n    </p>\r\n    "; if (typeof dataType != "undefined" && dataType === "recent") b += '\r\n    <p id="recent-item-' + ((a = c.type) == null ? "" : a) + "-" + ((a = c.account) == null ? "" : a) + '-msg" class="member_msg text_ellipsis">' + ((a = c.recentMessage || "") == null ? "" : a) + "</p>\t\r\n    "; else if (typeof dataType == "undefined" || dataType != "search") {
                        b += '\r\n    <p class="member_msg text_ellipsis" >\r\n    '; if (c.stateName) b += '\r\n    <span class="member_state">' +
                        ((a = c.stateName) == null ? "" : a) + "</span>\r\n    "; b += "\r\n    "; if (c.signature) b += '\r\n    <span class="member_signature" _signature_load="1">' + ((a = html(c.signature)) == null ? "" : a) + "</span>\r\n    "; b += "\t\r\n    </p>\r\n    "
                    } b += "\t\r\n\r\n    </li>\r\n    "
                } b += "\r\n    "
            } b += "\r\n\r\n"
        } return b
    }
});
define("mq.view.search", ["tmpl!../tmpl/tmpl_search_body.html", "tmpl!../tmpl/tmpl_member_list.html", "./mq.i18n", "./mq.view.transitionmanager"], function (g, a) {
    J.$package("mq.view.search", function () {
        var b = this, c = JM.event, f = JM.dom, h = mq.i18n.message; this.createPanel = function () {
            if (!this.panel) {
                var m = { parent: mq.view.main.container, className: "search-panel", title: h("search"), hasBackButton: true, body: { html: g({ $M: h }) } }; this.panel = new mq.view.TitlePanel(m); this.searchBar = f.id("searchBar"); this.searchInput = f.id("searchInput");
                m = this.scrollArea = f.id("search_container_scroll_area"); this.memberList = new mq.view.MemberList({ id: "search", scrollArea: m, listContainer: f.id("search_result_list"), listTmpl: a }); c.bindCommands(b.panel.container, j); c.on(b.searchInput, "input", o.onSearchInput)
            } return this.panel
        }; this.init = function () { }; var j = {
            clickMemberItem: function (m, q) { var k = q.getAttribute("_uin"), e = q.getAttribute("_type"); c.fire(mq.view, "startChat", { uin: k, type: e }) }, clickLeftButton: function () { mq.view.transitionManager.pop("search") }, clearSearchWord: function () {
                b.searchInput.value =
                ""; f.removeClass(b.searchBar, "hascontent")
            }
        }, o = { onSearchInput: function () { if (b.searchInput.value != "") f.hasClass(b.searchBar, "hascontent") || f.addClass(b.searchBar, "hascontent"); else f.removeClass(b.searchBar, "hascontent"); c.fire(b, "searchFriends", { keyword: b.searchInput.value }) } }; this.startSearch = function (m) { var q = this.createPanel(); m = m.from || h("return"); q.setLeftText(m); mq.view.transitionManager.push({ id: "search", element: q.container, callback: null }) }; this.renderResult = function (m) { this.memberList.render(m) }
    })
});
define("mq.presenter.profile", ["./mq.i18n", "./mq.view.transitionmanager"], function () {
    J.$package("mq.presenter.profile", function () {
        var g = this, a = JM.event, b = null; this.init = function () {
            this.view = mq.view.profile; this.model = mq.model.buddylist; a.on(mq.view, "viewProfile", c.onViewProfile); a.on(g.view, "dismiss", c.onDismiss); a.on(g.model, "friendInfoUpdate", c.onBuddyInfoUpdate); a.on(g.model, "discussInfoUpdate", c.onBuddyInfoUpdate); a.on(g.model, "groupInfoUpdate", c.onBuddyInfoUpdate); a.on(g.model, "userSignatureChange",
            c.onUserSignatureChange)
        }; var c = { onViewProfile: function (f) { var h = g.model.getBuddyInfo(f.account, f.type); b = f.profile = h; g.view.viewProfile(f) }, onBuddyInfoUpdate: function (f) { if (b && b.type === f.type && b.account === f.account) { b = f; g.view.refreshProfile(f) } }, onUserSignatureChange: function (f) { c.onBuddyInfoUpdate({ info: f }) }, onDismiss: function () { b = null } }
    })
});
define("tmpl!../tmpl/tmpl_profile_body.html", [], function () {
    return function (g) {
        var a, b = ""; with (g || {}) {
            b += '\r\n<div class="group">\r\n    <div class="row clearfix">\r\n        <div class="cloumn">\r\n            <img class="avatar" src="' + ((a = profile.avatar) == null ? "" : a) + '">\r\n        </div>\r\n        <div class="cloumn profile_title">\r\n            <div class="row profile_name">' + ((a = encode(profile.name)) == null ? "" : a) + '</div>\r\n            <div class="row profile_account">' + ((a = profile.ruin ? profile.ruin :
            "") == null ? "" : a) + "</div>\r\n        </div>\r\n        "; if (profile.type === "friend") b += '\r\n            <button class="sendMsg2Member" cmd="sendMsg2Member">\u53d1\u6d88\u606f</button>\r\n        '; b += "\r\n    </div>\r\n</div>\r\n"; if (profile.type === "friend") {
                b += "\r\n    "; if (profile.signature) b += '\r\n<div class="group">\r\n    <div class="row profile_signature">\r\n        <span class="label">' + ((a = $M("signature")) == null ? "" : a) + '</span><p class="row-content">' + ((a = encode(profile.signature)) == null ? "" :
                a) + "</p>\r\n    </div>\r\n</div>\r\n    "; b += '\r\n<div class="group">\r\n    '; if (profile.gender) { b += '\r\n    <div class="row ">\r\n        <span class="label">' + ((a = $M("gender")) == null ? "" : a) + "</span>"; b += profile.gender === "male" ? "" + ((a = $M("male")) == null ? "" : a) + "" : profile.gender === "female" ? "" + ((a = $M("female")) == null ? "" : a) + "" : "" + ((a = $M("unknown")) == null ? "" : a) + ""; b += "\r\n    </div>\r\n    " } b += "\r\n    "; if (profile.birthday) {
                    g = profile.birthday; b += '\r\n    <div class="row ">\r\n        <span class="label">' +
                    ((a = $M("birthday")) == null ? "" : a) + "</span>" + ((a = g.year + "/" + g.month + "/" + g.day) == null ? "" : a) + "\r\n    </div>\r\n    "
                } b += '\r\n</div>\r\n<div class="group">\r\n    '; if (profile.country) b += '\r\n    <div class="row ">\r\n        <span class="label">' + ((a = $M("country")) == null ? "" : a) + "</span>" + ((a = encode(profile.country)) == null ? "" : a) + "\r\n    </div>\r\n    "; b += "\r\n    "; if (profile.province) b += '\r\n    <div class="row ">\r\n        <span class="label">' + ((a = $M("province")) == null ? "" : a) + "</span>" + ((a = encode(profile.province)) ==
                null ? "" : a) + "\r\n    </div>\r\n    "; b += "\r\n    "; if (profile.city) b += '\r\n    <div class="row ">\r\n        <span class="label">' + ((a = $M("city")) == null ? "" : a) + "</span>" + ((a = encode(profile.city)) == null ? "" : a) + "\r\n    </div>\r\n    "; b += '\r\n</div>\r\n<div class="group">\r\n    '; if (profile.phone) b += '\r\n    <div class="row ">\r\n        <span class="label">' + ((a = $M("phone")) == null ? "" : a) + "</span>" + ((a = encode(profile.phone + "")) == null ? "" : a) + "\r\n    </div>\r\n    "; b += "\r\n    "; if (profile.mobile) b += '\r\n    <div class="row ">\r\n        <span class="label">' +
                ((a = $M("mobile")) == null ? "" : a) + "</span>" + ((a = encode(profile.mobile + "")) == null ? "" : a) + "\r\n    </div>\r\n    "; b += "\r\n    "; if (profile.email) b += '\r\n    <div class="row ">\r\n        <span class="label">' + ((a = $M("email")) == null ? "" : a) + "</span>" + ((a = encode(profile.email)) == null ? "" : a) + "\r\n    </div>\r\n    "; b += "\r\n</div>\r\n"
            } b += "\r\n"; if (profile.type === "group") {
                b += "\r\n"; if (profile.memo) b += '\r\n<div class="group">\r\n    <div class="row ">\r\n        <span class="label">' + ((a = $M("publish")) == null ?
                "" : a) + '</span><p class="row-content">' + ((a = encode(profile.memo)) == null ? "" : a) + "</p>\r\n    </div>\r\n</div>\r\n"; b += '\r\n<div class="group clickable">\r\n    <div class="row clearfix" cmd="viewGroupMember">\r\n        <span class="label">' + ((a = $M("group_member")) == null ? "" : a) + '</span><span class="more_icon"></span><span class="text_right">' + ((a = profile.members.length + $M("buddy_unit")) == null ? "" : a) + "</span>\r\n    </div>\r\n</div>\r\n"
            } b += "\r\n"; if (profile.type === "discuss") b += '\r\n<div class="group clickable">\r\n    <div class="row clearfix" cmd="viewDiscussMember">\r\n        <span class="label">' +
            ((a = $M("discuss_member")) == null ? "" : a) + '</span><span class="more_icon"></span><span class="text_right">' + ((a = profile.members.length + $M("buddy_unit")) == null ? "" : a) + "</span>\r\n    </div>\r\n</div>\r\n"; b += ""
        } return b
    }
});
define("mq.view.profile", ["tmpl!../tmpl/tmpl_profile_body.html", "./mq.i18n", "./mq.view.transitionmanager"], function (g) {
    J.$package("mq.view.profile", function () {
        var a = this, b = JM.event, c = JM.dom, f = JM.string, h = mq.i18n.message, j = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (q) { window.setTimeout(q, 1E3 / 60) }, o = null; this.createPanel = function () {
            if (!this.panel) {
                var q = {
                    id: "", parent: mq.view.main.container,
                    className: "profile-panel", title: h("profile"), hasBackButton: true, hasScroller: true, footer: { className: "profile-footer" }, body: { className: "list_page" }, rightButton: { text: h("record") }
                }; this.panel = new mq.view.TitlePanel(q); c.setStyle(this.panel.bodyWrapper, "background", "rgb(237, 237, 237)"); b.bindCommands(a.panel.container, m)
            } return this.panel
        }; this.init = function () { }; var m = {
            clickLeftButton: function () { o = null; mq.view.transitionManager.pop("profile"); b.fire(a, "dismiss") }, clickRightButton: function () {
                b.fire(mq.view,
                "viewRecord", { user: o })
            }, viewGroupMember: function () { b.fire(mq.view, "viewGroupMember", { group: o }) }, viewDiscussMember: function () { b.fire(mq.view, "viewDiscussMember", { discuss: o }) }, sendMsg2Member: function () { var q = o, k = { uin: q.uin, type: q.type }; if (q.group) k.group_uin = q.group.gid; else if (q.discuss) k.discuss_uin = q.discuss.did; b.fire(mq.view, "startChat", k) }
        }; this.viewProfile = function (q) {
            this.createPanel().setLeftText(q.from || h("return")); this.refreshProfile(q.profile); mq.view.transitionManager.push({
                id: "profile",
                element: this.panel.container, callback: null
            })
        }; this.refreshProfile = function (q) { o = q; var k = this.createPanel(); k.body.innerHTML = g({ profile: q, encode: f.encodeHtml, $M: h }); q = c.getStyle(a.panel.footer, "height"); c.setStyle(a.panel.bodyWrapper, "bottom", q); j(function () { k.scroller.refresh() }) }
    })
});
define("tmpl!../tmpl/tmpl_members_body.html", [], function () {
    return function (g) {
        var a, b = ""; with (g || {}) b += '<div id="member_searchBar" class="search_wrapper">\r\n    <div class="search_inner">\r\n        <input id="member_searchInput" type="text" class="input_search" placeholder="' + ((a = $M("search")) == null ? "" : a) + '" autocapitalize="off" />\r\n        <button id="member_searchClear" class="searchClear" cmd="clearSearchWord"></button> \r\n    </div>\r\n    <button id="searchCancel" class="searchCancel" cmd="clearSearchWord" >' +
        ((a = $M("cancel")) == null ? "" : a) + '</button>\r\n</div>\r\n<div id="member_search_container_scroll_area" class="scrollWrapper search">\r\n    <div id="member_search_container" class="search_container">\r\n        <ul id="member_search_result_list" class="list list_white catogory_List">\r\n        </ul>\r\n    </div>\r\n</div>'; return b
    }
});
define("mq.view.member", ["tmpl!../tmpl/tmpl_members_body.html", "tmpl!../tmpl/tmpl_member_list.html", "./mq.i18n", "./mq.view.transitionmanager"], function (g, a) {
    J.$package("mq.view.member", function () {
        var b = this, c = JM.event, f = JM.dom, h = mq.i18n.message; this.createPanel = function () {
            if (!this.panel) {
                var m = { parent: mq.view.main.container, className: "member-panel", title: h("members"), hasBackButton: true, body: { html: g({ $M: h }) } }; this.panel = new mq.view.TitlePanel(m); this.searchBar = f.id("member_searchBar"); this.searchInput =
                f.id("member_searchInput"); m = this.scrollArea = f.id("member_search_container_scroll_area"); this.memberList = new mq.view.MemberList({ id: "search", scrollArea: m, listContainer: f.id("member_search_result_list"), listTmpl: a }); c.bindCommands(b.panel.container, j); c.on(b.searchInput, "input", o.onSearchInput)
            } return this.panel
        }; this.init = function () { }; var j = {
            clickMemberItem: function (m, q) { var k = q.getAttribute("_uin"), e = q.getAttribute("_type"); c.fire(mq.view, "viewProfile", { from: h("session"), account: k, type: e }) }, clickLeftButton: function () { mq.view.transitionManager.pop("members") },
            clearSearchWord: function () { b.searchInput.value = ""; f.removeClass(b.searchBar, "hascontent"); c.fire(b, "searchMembers", { keyword: "" }) }
        }, o = { onSearchInput: function () { if (b.searchInput.value != "") f.hasClass(b.searchBar, "hascontent") || f.addClass(b.searchBar, "hascontent"); else f.removeClass(b.searchBar, "hascontent"); c.fire(b, "searchMembers", { keyword: b.searchInput.value }) } }; this.viewMembers = function (m) { var q = this.createPanel(); mq.view.transitionManager.push({ id: "members", element: q.container, callback: null }); this.renderMembers(m) };
        this.renderMembers = function (m) { this.memberList.render({ type: "list", list: m }) }
    })
});
define("mq.presenter.member", ["./mq.i18n", "./mq.view.transitionmanager"], function () {
    J.$package("mq.presenter.member", function (g) {
        var a = this, b = JM.event, c; this.init = function () { this.view = mq.view.member; this.model = mq.model.buddylist; b.on(mq.view, "viewGroupMember", f.onViewGroupMember); b.on(mq.view, "viewDiscussMember", f.onViewDiscussMember); b.on(a.view, "searchMembers", f.onSearchMembers) }; var f = {
            onViewGroupMember: function (h) { h = h.group; a.view.viewMembers(h.members); c = h.members }, onViewDiscussMember: function (h) {
                h =
                h.discuss; a.view.viewMembers(h.members); c = h.members
            }, onSearchMembers: function (h) { var j = h.keyword, o = []; if (j == "") a.view.renderMembers(c); else { g.each(c, function (m) { m.nick.indexOf(j) > -1 && o.push(m) }); a.view.renderMembers(o) } }, onGroupInfoUpdate: function () { }
        }
    })
});
define("mq.model.record", [], function () { J.$package("mq.model.record", function () { var g = JM.event; this.getRecordSuccess = function (a) { g.fire(this, "getRecordSuccess", a) }; this.sendGetRecord = function (a, b, c) { var f = document.createElement("script"); document.body.appendChild(f); f.src = "http://web2.qq.com/cgi-bin/webqq_chat/?cmd=1&tuin=" + a.uin + "&vfwebqq=" + mq.vfwebqq + "&page=" + b + "&row=" + c + "&callback=mq.model.record.getRecordSuccess" } }) });
define("tmpl!../tmpl/tmpl_record_footer.html", [], function () { return function (g) { var a = ""; with (g || {}) a += '<div>\r\n    <a href="javascript:" class="record_pre_page" cmd="selectPrePage"><</a>\r\n    <input id="record_page_input" class="record_page_input" value="1">\r\n    <span>/</span>\r\n    <span id="record_total_count">3</span>\r\n    <a href="javascript:" class="record_next_page" cmd="selectNextPage">></a>\r\n</div>'; return a } });
define("mq.view.record", ["tmpl!../tmpl/tmpl_record_footer.html", "./mq.i18n", "./mq.view.transitionmanager"], function (g) {
    J.$package("mq.view.record", function (a) {
        var b = this, c = JM.event, f = JM.dom, h = JM.string, j = mq.i18n.message, o, m; this.createPanel = function () {
            if (!this.panel) {
                var k = { parent: mq.view.main.container, className: "record-panel", title: j("record"), hasBackButton: true, body: { className: "record_container" }, footer: { className: "record_toolbar_footer", html: g({ $M: j }) } }; this.panel = new mq.view.TitlePanel(k); this.pageInput =
                f.id("record_page_input"); this.totalNumText = f.id("record_total_count"); this.scrollArea = f.id("record_container_scroll_area"); c.bindCommands(b.panel.container, q)
            } return this.panel
        }; this.init = function () { }; var q = { clickLeftButton: function () { mq.view.transitionManager.pop("record") }, selectPrePage: function () { if (!(o <= 1)) { o--; c.fire(b, "selectPage", { pageIndex: o }) } }, selectNextPage: function () { if (!(o >= m)) { o++; c.fire(b, "selectPage", { pageIndex: o }) } } }; this.viewRecord = function () {
            var k = this.createPanel(); mq.view.transitionManager.push({
                id: "record",
                element: k.container, callback: null
            })
        }; this.renderRecord = function (k) {
            var e = k.recordData, t = k.user; k = k.self; var C = "", A, p = e.chatlogs, w = this.panel.body; this.pageInput.value = o = e.page || 1; this.totalNumText.innerHTML = m = e.total || 1; w.innerHTML = ""; if (!p || p.length == 0) w.innerHTML += "<p class='no_record'>\u6682\u65e0\u804a\u5929\u8bb0\u5f55</p>"; else {
                e = 0; for (var B = p.length; e < B; e++) {
                    A = p[e]; var d = a.format.date(new Date(A.time * 1E3), "YYYY-MM-DD hh:mm:ss"); if (A.cmd == 16) {
                        A = A.msg[0]; C += '<dl class="me">                            <dt>' +
                        h.encodeHtml(k.name) + "<span>" + d + "</span></dt>                            <dd>" + h.encodeHtml(A) + "</dd>                        </dl>"
                    } else if (A.cmd == 17) { A = A.msg[0]; C += '<dl class="buddy">                            <dt>' + h.encodeHtml(t.nick) + "<span>" + d + "</span></dt>                            <dd>" + h.encodeHtml(A) + "</dd>                        </dl>" }
                } w.innerHTML = C
            }
        }
    })
});
define("mq.presenter.record", ["./mq.i18n", "./mq.view.transitionmanager"], function () {
    J.$package("mq.presenter.record", function () {
        var g = this, a = JM.event, b; this.init = function () { this.view = mq.view.record; this.model = mq.model.record; this.m_model = mq.model.buddylist; a.on(mq.view, "viewRecord", c.onViewRecord); a.on(g.view, "selectPage", c.onSelectPage); a.on(g.model, "getRecordSuccess", c.onGetRecordSuccess) }; var c = {
            onViewRecord: function (f) { b = f.user || b; g.view.viewRecord(f); a.fire(g.view, "selectPage", { pageIndex: 0, rowCount: 10 }) },
            onSelectPage: function (f) { pageNum = f.pageIndex || 0; rowCount = f.rowCount || 10; g.model.sendGetRecord(b, pageNum, rowCount) }, onGetRecordSuccess: function (f) { g.view.renderRecord({ recordData: f, user: b, self: g.m_model.getSelfInfo() }) }
        }
    })
}); define("tmpl!../tmpl/tmpl_session_body.html", [], function () { return function (g) { var a = ""; with (g || {}) a += '<div id="current_chat_scroll_area" class="scrollWrapper">\r\n    <ul id="current_chat_list" class="list list_white"></ul>\r\n</div>'; return a } });
define("mq.view.session", ["tmpl!../tmpl/tmpl_session_body.html", "tmpl!../tmpl/tmpl_member_list.html", "./mq.i18n", "./mq.view.transitionmanager"], function (g, a) {
    J.$package("mq.view.session", function () {
        var b = this, c = JM.event, f = JM.dom, h = mq.i18n.message, j = null, o = {}, m = 0; this.createPanel = function (e) {
            if (!this.panel) {
                e = { parent: e, title: h("session"), hasFooter: false, body: { html: g() } }; this.panel = new mq.view.TitlePanel(e); this.scrollArea = f.id("current_chat_scroll_area"); this.listContainer = f.id("current_chat_list");
                this.memberList = new mq.view.MemberList({ id: "recent", scrollArea: this.scrollArea, listContainer: this.listContainer, listTmpl: a })
            } return this.panel
        }; this.init = function () { c.bindCommands(b.scrollArea, q); c.on(mq.view.chat, "startChat", k.onStartChat); c.on(b, "show", k.onShow) }; var q = {
            clickMemberItem: function (e, t) { var C = t.getAttribute("_uin"), A = t.getAttribute("_type"); c.fire(mq.view, "startChat", { uin: C, type: A }); f.removeClass(t, "notify") }, clickMemberAvatar: function (e, t) {
                var C = t.parentNode.getAttribute("_uin"), A =
                t.parentNode.getAttribute("_type"); c.fire(mq.view, "viewProfile", { from: h("session"), account: C, type: A })
            }
        }, k = { onStartChat: function (e) { if (e) { m -= o[e.type + "-" + e.account] || 0; if (m < 1) { j || (j = f.id("session")); f.removeClass(j, "point") } } }, onShow: function () { b.memberList.refresh() } }; this.render = function (e) { e = e.slice(0, 10); this.memberList.render({ type: "list", list: e, dataType: "recent" }) }; this.onReceiveMessage = function (e, t) { t || this.updateNotify(e); this.updateMessagePreview(e, t) }; this.updateNotify = function (e) {
            e = e.send_to ||
            e.from_discuss || e.from_group || e.from_user; e = e.type + "-" + e.account; if (!o[e]) { o[e] = 1; m += 1 } j || (j = f.id("session")); f.addClass(j, "point")
        }; this.updateMessagePreview = function (e, t) {
            var C = e.send_to || e.from_discuss || e.from_group || e.from_user, A = "recent-item-" + (C.type + "-" + C.account), p = f.id(A); if (!p) { for (; this.listContainer.children.length >= 10;) this.listContainer.removeChild(this.listContainer.children[this.listContainer.children.length - 1]); this.memberList.append({ type: "list", list: [C] }, true); p = f.id(A); if (!p) return } t ||
            f.addClass(p, "notify"); C = f.id(A + "-msg"); if (!C) { C = document.createElement("p"); C.id = A + "-msg"; C.setAttribute("class", "member_msg text_ellipsis"); p.appendChild(C) } A = mq.presenter.chat.translateMessage(e); C.innerHTML = A; A = p.parentNode; A.children[0] && A.insertBefore(p, A.children[0]); this.memberList.refresh()
        }
    })
});
define("tmpl!../tmpl/tmpl_contact_body.html", [], function () { return function (g) { var a = ""; with (g || {}) a += '<div id="contactList" class="tab tab_animate member_tab">\r\n    <ul id="memberTab" class="tab_head">\r\n        <li cmd="clickMemberTab" param="friend">\u597d\u53cb</li>\r\n        <li cmd="clickMemberTab" param="group">\u7fa4</li>\r\n        <li cmd="clickMemberTab" param="discuss">\u8ba8\u8bba\u7ec4</li>\r\n    </ul>\r\n    <ul class="tab_body member_tab_body">\r\n        <li id="memberTabBody-friend">\r\n            <div id="f_list_scroll_area" class="member_scroll_area">\r\n                <ul id="friend_groupList" class="group_list member_group_list">\r\n                </ul> \r\n            </div>\r\n        </li>\r\n        <li id="memberTabBody-group">\r\n            <div id="group_list_scroll_area" class="member_scroll_area">\r\n                <ul id="g_list" class="list list_white catogory_List">\r\n                </ul>\r\n            </div>\r\n        </li>\r\n        <li id="memberTabBody-discuss">\r\n            <div id="discuss_list_scroll_area" class="member_scroll_area">\r\n                <ul id="d_list" class="list list_white catogory_List">\r\n                </ul>\r\n            </div>\r\n        </li>\r\n    </ul>\r\n</div>'; return a } });
define("mq.view.contact", ["tmpl!../tmpl/tmpl_contact_body.html", "tmpl!../tmpl/tmpl_member_list.html", "./mq.i18n", "./mq.view.transitionmanager"], function (g, a) {
    J.$package("mq.view.contact", function (b) {
        var c = this, f = JM.event, h = JM.dom, j = mq.i18n.message; this.createPanel = function (k) { if (!this.panel) { k = { parent: k, title: j("contact"), rightButton: { text: "", className: "btn_search" }, leftButton: { className: "contact_null_btn" }, body: { html: g() } }; this.panel = new mq.view.TitlePanel(k) } return this.panel }; this.init = function () {
            this.contactList =
            h.id("contactList"); this.memberListAreas = {}; for (var k = [], e = h.id("memberTab").children, t, C = 0, A, p, w; A = e[C]; C++) { p = A.getAttribute("param"); w = h.id("memberTabBody-" + p); k.push({ id: p, trigger: A, sheet: w }); this.memberListAreas[p] = new mq.view.MemberList({ id: p, scrollArea: w.children[0], listContainer: w.children[0].children[0], listTmpl: a }); if (p === "friend") { for (t in q) if (q.hasOwnProperty(t)) this.memberListAreas[p][t] = q[t]; this.memberListAreas[p].bindHandlers() } } this.tab = new MUI.Tab({ items: k, selectedClass: "active" });
            f.bindCommands(c.panel.container, o); f.on(c.tab, "selected", m.onTabItemSelected); this.tab.select(0)
        }; var o = { clickMemberTab: function (k) { c.tab.select(k) }, clickMemberGroup: function (k, e) { h.toggleClass(e.parentNode, "active"); c.memberListAreas.friend.refresh() }, clickMemberItem: function (k, e) { var t = e.getAttribute("_uin"), C = e.getAttribute("_type"); f.fire(mq.view, "startChat", { uin: t, type: C }) }, clickRightButton: function () { f.fire(mq.view, "startSearch", { from: j("contact") }) }, clickLeftButton: function () { } }, m = {
            onTabItemSelected: function (k) {
                k =
                k.current.id; c.memberListAreas[k] && c.memberListAreas[k].refresh()
            }
        }, q = {
            onScrollEnd: function () {
                var k = this.listContainer.querySelectorAll(".active"), e, t, C, A, p, w, B; if (k && k.length) {
                    if (!this._visibleContainer) this._visibleContainer = h.id("f_list_scroll_area"); t = 0; for (C = k.length; t < C; ++t) {
                        e = this._friendElements = k[t].querySelectorAll('[id^="friend-item"]'); if (this.inVisibleArea(k[t])) {
                            A = 0; for (p = e.length; A < p; ++A) {
                                friendEle = e[A]; if (this.inVisibleArea(friendEle)) {
                                    f.fire(c, "memberInVisibleArea", friendEle.getAttribute("_uin"),
                                    "friend"); w = true
                                } else if (w) { B = true; break }
                            } if (B) break
                        }
                    }
                }
            }, inVisibleArea: function (k, e) { e = e || this._visibleContainer; var t = e.getBoundingClientRect().top, C = e.clientHeight; t = k.getBoundingClientRect().top - t; return t >= 0 && t <= C }, bindHandlers: function () { var k = this, e = this.scroll.options.onScrollEnd; this.onScrollEnd = b.bind(this.onScrollEnd, this); this.scroll.options.onScrollEnd = function () { e.apply(this, arguments); k.onScrollEnd.apply(this, arguments) }; f.on(window, "load resize", this.onScrollEnd) }, destroy: function () {
                this.scroll &&
                this.scroll.options && (this.scroll.options.onScrollEnd = null); f.off(window, "load resize", this._onScrollEnd); this.constructor.prototype.destroy.apply(this, arguments)
            }, refresh: function () { this.onScrollEnd(); this.constructor.prototype.refresh.apply(this, arguments) }
        }
    })
});
define("tmpl!../tmpl/tmpl_setting_body.html", [], function () {
    return function (g) {
        var a, b = ""; with (g || {}) {
            b += '<div class="group">\r\n    <div class="row clearfix">\r\n        <div class="cloumn">\r\n            <img class="avatar" src="' + ((a = user.avatar) == null ? "" : a) + '">\r\n        </div>\r\n        <div class="cloumn profile_title_setting">\r\n            <div class="text_ellipsis profile_name row">' + ((a = encode(user.nick)) == null ? "" : a) + '</div>\r\n            <div class="row profile_account">' + ((a = user.account) ==
            null ? "" : a) + '</div>\r\n        </div>\r\n        <div id="online_state_setting" class="online_state_setting">\r\n            <i id="main_icon" class="main_icon online_icon"></i><i class="down_arrow"></i>\r\n            <ul>\r\n                <li><i class="online_icon"></i>' + ((a = $M("online")) == null ? "" : a) + '</li>\r\n                <li><i class="callme_icon"></i>' + ((a = $M("callme")) == null ? "" : a) + '</li>\r\n                <li><i class="away_icon"></i>' + ((a = $M("away")) == null ? "" : a) + '</li>\r\n                <li><i class="busy_icon"></i>' +
            ((a = $M("busy")) == null ? "" : a) + '</li>\r\n                <li><i class="silent_icon"></i>' + ((a = $M("silent")) == null ? "" : a) + '</li>\r\n                <li><i class="hidden_icon"></i>' + ((a = $M("hidden")) == null ? "" : a) + '</li>\r\n                <li><i class="offline_icon"></i>' + ((a = $M("offline")) == null ? "" : a) + "</li>\r\n            </ul>\r\n\r\n        </div>\r\n    </div> \r\n</div> \r\n\r\n"; if (user.lnick) b += '\r\n<div class="group">\r\n    <div class="row profile_signature">\r\n        <span class="label">' + ((a =
            $M("signature")) == null ? "" : a) + "</span>\r\n        <span>" + ((a = encode(user.lnick)) == null ? "" : a) + "</span>\r\n    </div>\r\n    \r\n</div>\r\n"; b += '  \r\n\r\n<div class="group clickAble" cmd="clickNotifySetting">\r\n    <div class="row ">\r\n        ' + ((a = $M("notify_setting")) == null ? "" : a) + '\r\n        <span class="more_icon"></span>\r\n    </div>\r\n</div>\r\n\r\n<div class="group clickAble" cmd="clickShowAbout">\r\n    <div class="row ">\r\n        ' + ((a = $M("about_qq")) == null ? "" : a) + '\r\n        <span class="more_icon"></span>\r\n    </div>\r\n</div>\r\n\r\n<div id="about_qq_all" class="group" style="display:none;">\r\n             <div class="row ">\r\n              <span class="label">' +
            ((a = $M("version")) == null ? "" : a) + "</span>\r\n              " + ((a = $M("current_version")) == null ? "" : a) + '\r\n            </div>\r\n            <div class="row ">\r\n            ' + ((a = $M("service")) == null ? "" : a) + '\r\n            </div>\r\n            <div class="row ">\r\n            ' + ((a = $M("help")) == null ? "" : a) + '\r\n            </div>\r\n\r\n</div>\r\n\r\n<div class="group clickAble" cmd="clickLogout">\r\n    <div class="row loginout">    \r\n            ' + ((a = $M("loginout")) == null ? "" : a) + "          \r\n    </div>\r\n</div>\r\n"
        } return b
    }
});
define("../lib/mui/js/mui.select", ["jm"], function () {
    JM.$package("MUI", function (g) {
        var a = g.dom, b = g.event; this.Select = g.Class({
            init: function (c) { this.elem = a.id(c.id) || c.id; this.select_list = a.tagName("ul", this.elem)[0]; this.onSelected = c.onSelected; this.listItems = a.tagName("li", this.select_list); this.bindHandlers() }, bindHandlers: function () {
                var c = this, f, h, j = this.listItems, o; b.on(this.elem, "click", function (m) {
                    m = m || window.event; m = m.target || m.srcElement; c.select_list.style.display != "block" ? a.setStyle(c.select_list,
                    "display", "block") : a.setStyle(c.select_list, "display", "none"); if (a.closest(m, "ul")) { f = a.closest(m, "li"); g.each(j, function (q, k) { if (q == f) h = k }); if (!g.type.isUndefined(h)) { o = { selectedIndex: h, selectedItem: f }; b.fire(c, "selected", o); c.onSelected && c.onSelected(o) } }
                })
            }
        })
    })
});
define("mq.view.setting", ["tmpl!../tmpl/tmpl_setting_body.html", "./mq.i18n", "./mq.view.transitionmanager", "../lib/mui/js/mui.select"], function (g) {
    J.$package("mq.view.setting", function () {
        var a = this, b = JM.event, c = JM.dom, f = JM.string, h = mq.i18n.message, j = ["online", "callme", "away", "busy", "silent", "hidden", "offline"]; this.createPanel = function () {
            if (!this.panel) {
                var m = { parent: mq.view.main.body, title: h("setting"), hasScroller: true, body: { className: "list_page setting" } }; this.panel = new mq.view.TitlePanel(m); b.bindCommands(a.panel.container,
                o)
            } return this.panel
        }; this.init = function () { b.bindCommands(a.panel.container, o) }; var o = { clickLogout: function () { b.fire(a, "logout") }, clickShowAbout: function (m, q) { b.fire(a, "showAbout", q) }, clickNotifySetting: function () { b.fire(a, "notifySetting") } }; this.viewSelfProfile = function (m) { this.createPanel(); this.refreshSelfProfile(m); this.onlineStateSelect = new MUI.Select({ id: "online_state_setting", onSelected: this.onSelectState }); this.setOnlieStateIcon(mq.main.getCurrentOnlineState()) }; this.refreshSelfProfile = function (m) {
            var q =
            this.createPanel(); q.body.innerHTML = g({ user: m, encode: f.encodeHtml, $M: h }); q.scroller.refresh()
        }; this.setOnlieStateIcon = function (m) { c.id("main_icon").className = "main_icon " + m + "_icon" }; this.onSelectState = function (m) { m = j[m.selectedIndex]; b.fire(mq, "onlineStateChange", { state: m }); a.setOnlieStateIcon(m) }
    })
});
define("mq.presenter.setting", ["./mq.i18n", "./mq.view.transitionmanager"], function () {
    J.$package("mq.presenter.setting", function () {
        var g = this, a = JM.event, b = JM.dom, c = mq.i18n.message, f; this.init = function () { this.view = mq.view.setting; this.model = mq.model.buddylist; a.on(mq, "onlineStateChange", h.onStateChanged); a.on(mq.view.setting, "show", h.onSettingShow); a.on(mq.view.setting, "notifySetting", h.onNotifySetting); a.on(mq.view.setting, "logout", h.onLogout); a.on(mq.view.setting, "showAbout", h.onShowAbout) }; var h =
        {
            onSettingShow: function () { var j = g.model.getSelfInfo(); g.view.viewSelfProfile(j) }, onNotifySetting: function () { a.fire(mq.view, "viewNotifySetting", { from: c("setting") }) }, onStateChanged: function (j) { g.model.sendChangeStatus({ newstatus: j.state }) }, onLogout: function () { if (confirm("\u60a8\u786e\u5b9a\u8981\u9000\u51fa\u5417\uff1f")) { mq.main.logout(); window.location.href = window.location.href } }, onShowAbout: function (j) {
                f = b.id("about_qq_all"); var o = mq.view.setting.createPanel(); if (f.style.display === "none") {
                    b.addClass(j,
                    "active"); f.style.display = "block"
                } else { b.removeClass(j, "active"); f.style.display = "none" } o.scroller.refresh()
            }
        }
    })
}); define("mq.presenter.pluginDisplayer", [], function () { J.$package("mq.presenter.pluginDisplayer", function () { var g = this, a = JM.event, b = { onStartDisplayPlugin: function (c) { g.view.startDisplayPlugin(c) } }; this.init = function () { this.view = mq.view.pluginDisplayer; a.on(mq.view, "startDisplayPlugin", b.onStartDisplayPlugin) } }) });
define("tmpl!../tmpl/tmpl_plugin_body.html", [], function () { return function (g) { var a, b = ""; with (g || {}) { b += '<ul id="plugin_list" class="clearfix">\r\n    '; g = 0; for (var c; c = items[g]; ++g) b += '\r\n    <li id="' + ((a = c.id) == null ? "" : a) + '" cmd="clickItem">\r\n        <span class="icon"></span>\r\n        <a>' + ((a = c.text) == null ? "" : a) + "</a>\r\n    </li>\r\n    "; b += "\r\n</ul>" } return b } });
define("mq.view.plugin", ["tmpl!../tmpl/tmpl_plugin_body.html", "jm", "./mq.i18n", "./mq.view.transitionmanager"], function (g) {
    J.$package("mq.view.plugin", function (a) {
        var b = this, c = JM.event, f = JM.dom, h = mq.i18n.message, j = a.platform.touchDevice, o = [{ id: "qzone", url: j ? "http://pt.3g.qq.com/s?aid=touchLogin&t=qzone&bid_code=qzoneLogin&go_url=http://m.qzone.com/infocenter" : "http://qz.qq.com/", text: h("qzone") }, {
            id: "qmail", url: j ? "http://w.mail.qq.com/" : "http://ptlogin2.qq.com/pt4_web_jump?pt4_token=g3jdGooid--jhmLnMc5mIA__&daid=4&appid=522005705&succ_url=http%3A%2F%2Fmail.qq.com%2Fcgi-bin%2Flogin%3Ffun%3Dpassport%26from%3Dwebqq",
            text: h("qmail")
        }, { id: "qq_portal", url: j ? "http://shipei.qq.com/" : "http://www.qq.com/", text: h("qq_portal") }], m = { clickItem: function (q, k, e) { f.id("plugin_displayer"); var t; for (q = o.length - 1; q >= 0; q--) if (o[q].id === k.id) { t = o[q]; break } if (t) j ? c.fire(mq.view, "startDisplayPlugin", t) : window.open(t.url, "_blank"); e.preventDefault() } }; this.createPanel = function (q) { if (!this.panel) { q = { parent: q, title: h("plugin"), hasScroller: true, body: { className: "plugin", html: g({ items: o }) } }; this.panel = new mq.view.TitlePanel(q) } return this.panel };
        this.init = function () { if (/^[.\w-]+\.qq\.com/i.test(document.domain)) document.domain = "qq.com"; c.bindCommands(b.panel.container, m) }
    })
});
define("mq.view.pluginDisplayer", ["./mq.i18n", "./mq.view.transitionmanager"], function () {
    J.$package("mq.view.pluginDisplayer", function (g) {
        var a = this, b = g.event, c = g.dom; g = mq; var f = g.view, h = g.i18n.message; $TM = f.transitionManager; var j = null; tmplDisplayer = function (m, q) { return ['<iframe id="', m, '" ', q ? 'src="' + q + '"' : "", ">"].join("") }; var o = { clickLeftButton: function () { $TM.pop("displayPlugin") } }; this.startDisplayPlugin = function (m) {
            var q, k, e; if (m) {
                e = this.createPanel(); if (j) {
                    q = false; for (k in m) if (m.hasOwnProperty(k) &&
                    m[k] !== j[k]) { q = true; break }
                } else q = true; if (q) { j = m; e.setTitle(m.text); c.remove(e.body.querySelector("#plugin_displayer")); e.body.innerHTML = tmplDisplayer("plugin_displayer", m.url) } $TM.push({ id: "displayPlugin", element: this.panel.container, callback: function () { a.scroll.refresh() } })
            }
        }; this.createPanel = function () {
            if (!this.panel) {
                this.panel = new f.TitlePanel({
                    parent: f.main.container, className: "plugin-displayer-panel", leftButton: { className: "btn_arrow_left", text: h("return") }, body: {
                        className: "plugin_displayer_container",
                        html: tmplDisplayer("plugin_displayer")
                    }
                }); this.scroll = new iScroll(this.panel.bodyWrapper); b.bindCommands(a.panel.container, o)
            } return this.panel
        }; this.init = function () { }
    })
});
define("jmAudio", ["jm"], function () {
    J.$package("J", function (g) {
        var a = function () { return 0 }, b = { NONE: 0, NATIVE: 1, WMP: 2, FLASH: 3, MOBILE: 4 }; a = g.Class({ init: function () { throw "BaseAudio does not implement a required interface"; }, play: a, pause: a, stop: a, getVolume: a, setVolume: a, getLoop: a, setLoop: a, setMute: a, getMute: a, getPosition: a, setPosition: a, getBuffered: a, getDuration: a, free: a, on: a, off: a }); var c = function () {
            var e; return function (t) {
                if (!e) {
                    var C = document.createElement("div"); C.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;margin:0;padding:0;left:0;top:0;";
                    (document.body || document.documentElement).appendChild(C); if (t == b.FLASH) {
                        C.innerHTML = '<object id="jmAudioObject" name="jmAudioObject" ' + (g.browser.ie ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="../../../audio/jmAudioObject.swf"') + ' width="1" height="1" align="top"><param name="movie" value="../../../audio/jmAudioObject.swf" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="quality" value="high" /><param name="wmode" value="opaque" /></object>';
                        e = g.dom.id("jmAudioObject") || window.jmAudioObject || document.jmAudioObject
                    } else e = C
                } return e
            }
        }(), f = function () { var e = 0; return function () { return e++ } }(), h = function () { if (window.Audio && (new Audio).canPlayType("audio/mpeg")) { if (/\bmobile\b/i.test(navigator.userAgent)) return b.MOBILE; return b.NATIVE } else { var e; if (g.browser.plugins.flash >= 9) e = b.FLASH; else { if (e = window.ActiveXObject) a: { try { new ActiveXObject("WMPlayer.OCX.7") } catch (t) { e = false; break a } e = true } e = e ? b.WMP : b.NONE } return e } }(); switch (h) {
            case b.NATIVE: case b.MOBILE: var j =
            g.Class({ extend: a }, {
                init: function (e) { e = e || {}; (this._el = new Audio).loop = Boolean(e.loop); e.src && this.play(e.src) }, play: function (e) { if (e) this._el.src = e; this._el.paused && this._el.play() }, pause: function () { this._el.pause() }, stop: function () { this._el.currentTime = Infinity }, getVolume: function () { return !this._el.muted && this._el.volume || 0 }, setVolume: function (e) { if (isFinite(e)) { this._el.volume = Math.max(0, Math.min(e, 1)); this._el.muted = false } }, getLoop: function () { return this._el.loop }, setLoop: function (e) {
                    this._el.loop =
                    e !== false
                }, getMute: function () { return this._el.muted }, setMute: function (e) { this._el.muted = e !== false }, getPosition: function () { return this._el.currentTime }, setPosition: function (e) { if (!isNaN(e)) this._el.currentTime = Math.max(0, e) }, getBuffered: function () { return this._el.buffered.length && this._el.buffered.end(0) || 0 }, getDuration: function () { return this._el.duration }, free: function () { this._el.pause(); this._el = null }, on: function (e, t) { this._el.addEventListener(e, t, false) }, off: function (e, t) {
                    this._el.removeEventListener(e,
                    t, false)
                }
            }); if (h = b.NATIVE) { g.Audio = j; break } var o = [], m = function () { var e = o.length; o.pop().off("ended", m); e >= 2 && o[e - 2]._el.play() }; g.Audio = g.Class({ extend: j }, { init: function (e) { j.prototype.init.call(this, e) }, play: function (e) { var t = o.length; if (t && o[t - 1] !== this) { t = g.indexOf(o, this); -1 !== t ? o.splice(t, 1) : this.on("ended", m) } o.push(this); if (e) this._el.src = e; this._el.paused && this._el.play() }, pause: function () { for (var e = 0, t = o.length; e < t; e++) o[e].off("ended", m); o = []; this._el.pause() } }); break; case b.FLASH: var q =
            function () { var e = 0, t = [], C = false, A = function () { ++e; var p = c(); if (p.audioLoad && typeof p.audioLoad === "function") { C = true; p = 0; for (var w = t.length; p < w; p++) t[p]._sync(); t = null } else e < 3E4 && setTimeout(A, 100) }; return function (p) { if (C) p._sync(); else { -1 === g.indexOf(t, p) && t.push(p); e === 0 && A() } } }(), k; (function () { var e = []; window.J.AudioEventDispatcher = function (t, C, A) { t = e[t]; var p; t && t._handler && (p = t._handler[C]); C = 0; for (var w = p && p.length; C < w; C++) p[C].call(t, A) }; k = function (t) { e[t._seq] = t } })(); g.Audio = g.Class({
                init: function (e) {
                    this._seq =
                    f(); this._volume = 1; this._muted = false; e = e || {}; this._loop = Boolean(e.loop); this._paused = true; c(b.FLASH); e.src && this.play(e.src)
                }, play: function (e) { var t = c(); if (e) { this._src = e; this._paused = false; t.audioLoad ? this._sync() : q(this) } else { this._paused = false; t.audioPlay && t.audioPlay(this._seq) } }, pause: function () { var e = c(); this._paused = true; e.audioPause && e.audioPause(this._seq) }, stop: function () { this._paused = true; var e = c(); e.audioStop && e.audioStop(this._seq) }, getVolume: function () {
                    return !this._muted && this._volume ||
                    0
                }, setVolume: function (e) { if (isFinite(e)) { this._volume = Math.max(0, Math.min(e, 1)); this._muted = false; e = c(); e.audioSetVolume && e.audioSetVolume(this._seq, this._volume) } }, getLoop: function () { return this._loop }, setLoop: function (e) { this._loop = e !== false; e = c(); e.audioSetLoop && e.audioSetLoop(this._loop) }, getMute: function () { return this._muted }, setMute: function (e) { this._muted = e !== false; e = c(); e.audioSetVolume && e.audioSetVolume(this._seq, this.getVolume()) }, getPosition: function () {
                    var e = c(); return e.audioGetPosition &&
                    e.audioGetPosition(this._seq) / 1E3 || 0
                }, setPosition: function (e) { isNaN(e) || c().audioSetPosition(this._seq, Math.max(0, e) * 1E3) }, getBuffered: function () { var e = c(); return e.audioGetBuffered && e.audioGetBuffered(this._seq) / 1E3 || 0 }, getDuration: function () { var e = c(); return e.audioGetDuration && e.audioGetDuration(this._seq) / 1E3 || 0 }, free: function () { this._paused = true; var e = c(); e.audioFree && e.audioFree(this._seq) }, on: function (e, t) {
                    if (!this._handler) { this._handler = {}; k(this) } if (!this._handler[e] || !this._handler[e].length) {
                        this._handler[e] =
                        [t]; var C = c(); C.audioOn && C.audioOn(this._seq, e)
                    } else -1 === g.indexOf(this._handler[e], t) && this._handler[e].push(t)
                }, off: function (e, t) { var C; if (this._handler && this._handler[e] && -1 !== (C = g.indexOf(this._handler[e], t))) { this._handler[e].splice(C, 1); if (!this._handler[e].length) { C = c(); C.audioOff && C.audioOff(this._seq, e); delete this._handler[e] } } }, _sync: function () {
                    if (this._src) {
                        var e = c(), t = this._seq; e.audioLoad(t, this._src); var C = this.getVolume(); C != 1 && e.audioSetVolume(t, C); this._loop && e.audioSetLoop(t, true);
                        for (var A in this._handler) e.audioOn(t, A); this._paused || e.audioPlay(t)
                    }
                }
            }); break; case b.WMP: g.Audio = g.Class({ extend: a }, {
                init: function (e) {
                    this._seq = f(); e = e || {}; var t = document.createElement("div"); c(b.WMP).appendChild(t); t.innerHTML = '<object id="WMPObject' + this._seq + '" classid="CLSID:6BF52A52-394A-11D3-B153-00C04F79FAA6" standby="" type="application/x-oleobject" width="0" height="0">                        <param name="AutoStart" value="true"><param name="ShowControls" value="0"><param name="uiMode" value="none"></object>';
                    this._el = g.dom.id("WMPObject" + this._seq) || window["WMPObject" + this._seq]; e.loop && this._el.settings.setMode("loop", true); e.src && this.play(e.src)
                }, play: function (e) { if (e) { var t = document.createElement("a"); t.href = e; g.dom.getHref(t); this._canPlayThroughFired = this._isBuffering = this._isPlaying = false; this._el.URL = g.dom.getHref(t) } this._el.playState !== 3 && this._el.controls.play(); this._hasPoll() && this._startPoll() }, pause: function () { this._el.controls.pause() }, stop: function () { this._el.controls.stop() }, getVolume: function () {
                    return !this._el.settings.mute &&
                    this._el.settings.volume / 100 || 0
                }, setVolume: function (e) { if (isFinite(e)) { e = Math.max(0, Math.min(e, 1)) * 100; if (this._el.settings.volume !== e || this._el.settings.mute) { this._el.settings.volume = e; this._el.settings.mute = false; this._fire("volumechange") } } }, getLoop: function () { return this._el.settings.getMode("loop") }, setLoop: function (e) { this._el.settings.setMode("loop", e !== false) }, getMute: function () { return this._el.settings.mute }, setMute: function (e) {
                    e = e !== false; if (this._el.settings.mute !== e) {
                        this._el.settings.mute =
                        e; this._fire("volumechange")
                    }
                }, getPosition: function () { return this._el.controls.currentPosition }, setPosition: function (e) { if (!isNaN(e)) { this._fire("seeking"); this._el.controls.currentPosition = Math.max(0, e) } }, getBuffered: function () { return this._el.network.downloadProgress * 0.01 * this.getDuration() }, getDuration: function () { return (this._el.currentMedia || 0).duration || 0 }, free: function () { this._el.controls.stop(); this._el = null }, on: function (e, t) {
                    if (!this._handler) this._handler = {}; var C = this; switch (e) {
                        case "timeupdate": this._startPoll();
                        case "seeked": if (!this._hasPositionChange()) { this._onPositionChange = function () { C._fire("timeupdate"); C._fire("seeked") }; this._el.attachEvent("PositionChange", this._onPositionChange) } break; case "waiting": case "playing": if (!this._hasBuffering()) { this._onBuffering = function (A) { if ((C._el.currentMedia || 0).sourceURL) if (A) { C._isBuffering = true; C._fire("waiting") } else { C._isBuffering = false; C._fire("playing") } }; this._el.attachEvent("Buffering", this._onBuffering) } break; case "error": this._el.attachEvent("Error",
                        t); break; case "progress": case "ended": case "play": case "pause": if (!this._hasPlayStateChange()) { this._onPlayStateChange = function (A) { if ((C._el.currentMedia || 0).sourceURL) if (A === 2) { C._isPlaying = false; C._fire("pause") } else if (A === 3) { if (!C._isPlaying) { C._isPlaying = true; C._fire("play") } } else if (A === 6) C._fire("progress"); else if (A === 1) if (C._isPlaying) { C._isPlaying = false; C._fire("ended"); C._stopPoll() } }; this._el.attachEvent("PlayStateChange", this._onPlayStateChange) } break; case "loadstart": case "loadeddata": case "canplay": if (!this._hasOpenStateChange()) {
                            this._onOpenStateChange =
                            function (A) { if ((C._el.currentMedia || 0).sourceURL) if (A === 21) C._fire("loadstart"); else if (A === 13) { C._fire("loadeddata"); C._fire("canplay") } }; this._el.attachEvent("OpenStateChange", this._onOpenStateChange)
                        } break; case "canplaythrough": case "durationchange": this._startPoll()
                    } (this._handler[e] || (this._handler[e] = [])).push(t)
                }, off: function (e, t) {
                    if (this._handler) {
                        var C; if (this._handler && this._handler[e] && -1 !== (C = g.indexOf(this._handler[e], t))) this._handler[e].splice(C, 1); switch (e) {
                            case "timeupdate": this._hasPoll() ||
                            this._stopPoll(); case "seeked": this._hasPositionChange() || this._el.detachEvent("PositionChange", this._onPositionChange); break; case "waiting": case "playing": this._hasBuffering() || this._el.detachEvent("Buffering", this._onBuffering); break; case "error": this._el.detachEvent("Error", t); break; case "progress": case "ended": case "play": case "pause": this._hasPlayStateChange() || this._el.detachEvent("PlayStateChange", this._onPlayStateChange); break; case "loadstart": case "loadeddata": case "canplay": this._hasOpenStateChange() ||
                            this._el.detachEvent("OpenStateChange", this._onOpenStateChange); break; case "canplaythrough": case "durationchange": this._hasPoll() || this._stopPoll()
                        }
                    }
                }, _fire: function (e) { var t; if (this._handler && (t = this._handler[e])) { e = 0; for (var C = t.length; e < C; e++) t[e].call(this) } }, _startPoll: function () {
                    if (this._timer === undefined) {
                        this._canPlayThroughFired = this._canPlayThroughFired || this._el.network.downloadProgress === 100; this._duration = this.getDuration(); var e = this; this._timer = setInterval(function () {
                            if (e._isPlaying &&
                            !e._isBuffering && (e._handler.timeupdate || 0).length && (e._el.currentMedia || 0).sourceURL) e._fire("timeupdate"); var t = e.getDuration(); if (e._duration !== t) { e._duration = t; e._fire("durationchange") } if (!e._canPlayThroughFired) if (e._el.network.downloadProgress === 100) { e._canPlayThroughFired = true; e._fire("canplaythrough") }
                        }, 1E3)
                    }
                }, _stopPoll: function () { clearInterval(this._timer); delete this._timer }, _hasPositionChange: function () {
                    return this._handler.timeupdate && this._handler.timeupdate.length || this._handler.seeked &&
                    this._handler.seeked.length
                }, _hasBuffering: function () { return this._handler.waiting && this._handler.waiting.length || this._handler.playing && this._handler.playing.length }, _hasPlayStateChange: function () { return this._handler.progress && this._handler.progress.length || this._handler.ended && this._handler.ended.length || this._handler.play && this._handler.play.length || this._handler.pause && this._handler.pause.length }, _hasOpenStateChange: function () {
                    return this._handler.loadstart && this._handler.loadstart.length || this._handler.loadeddata &&
                    this._handler.loadeddata.length || this._handler.canplay && this._handler.canplay.length
                }, _hasPoll: function () { return this._handler.timeupdate && this._handler.timeupdate.length || this._handler.canplaythrough && this._handler.canplaythrough.length || this._handler.durationchange && this._handler.durationchange.length }
            }); break; case b.NONE: g.Audio = g.Class({ extend: a }, { init: function () { console.log("Audio is not supported", "Audio") } })
        }
    })
});
define("mq.view.audioNotification", ["jmAudio"], function () { J.$package("mq.view.audioNotification", function (g) { var a = g.Audio; this.init = function () { this.audio = new a }; this.onAllMessageReceived = function (b) { b || this.audio.play("../audio/classic.mp3") } }) });
define("mq.view.desktopNotificationManager", ["jm"], function () {
    J.$package("mq.view.desktopNotificationManager", function (g) {
        function a(p, w) { var B; if (j.Notification) B = new j.Notification(p, { icon: h.isString(w.icon) ? w.icon : e, body: w.body || e, tag: w.tag || undefined }); else if (j.webkitNotifications) { B = j.webkitNotifications.createNotification(w.icon, p, w.body); B.show() } else if (o.mozNotification) { B = o.mozNotification.createNotification(p, w.body, w.icon); B.show() } return B } function b() {
            var p; if (t) if ((p = j.Notification) &&
            p.permission) return p.permission; else if ((p = j.webkitNotifications) && p.checkPermission) return k[j.webkitNotifications.checkPermission()]; else if (o.mozNotification) return q; else if ((p = j.Notification) && p.permission) permission = p.permissionLevel()
        } function c(p) {
            if (p) return {
                primal: p, close: function () { var w; if (h.isFunction(p.close)) w = p.close(); else if (h.isFunction(p.cancel)) w = p.cancel(); h.isNumber(this.timer) && j.clearTimeout(this.timer); return w }, on: function (w, B) {
                    if (w === "show" && "ondisplay" in p) w = "display";
                    if (p.addEventListener) p.addEventListener(w, B, false); else p["on" + w] = B
                }, once: function (w, B) { function d() { B.apply(j, arguments); r.off(w, d) } var r = this; this.on(w, d) }, off: function (w) { if (w === "show" && "ondisplay" in p) w = "display"; if (p.removeEventListener) p.removeEventListener(w); else p["on" + w] = null }
            }
        } function f(p) { p.timer = j.setTimeout(function () { p.close() }, A.autoClose) } var h = g.type, j = window, o = navigator, m = document, q = "granted", k = [q, "default", "denied"], e = "", t = function () {
            var p = false; try {
                p = !!(j.Notification || j.webkitNotifications ||
                o.mozNotification)
            } catch (w) { } return p
        }(), C = function () { }, A = { autoClose: 0, detectPageVisibilify: true }; this.PERMISSION_DEFAULT = "default"; this.PERMISSION_GRANTED = q; this.PERMISSION_DENIED = "denied"; this.isSupported = t; this.config = function (p) { p && h.isObject(p) && g.extend(A, p); return A }; this.createNotificationWrapper = function (p, w) {
            var B, d; if (!(!t || b() !== q)) if (!(A.detectPageVisibilify && !(m.hidden || m.mozHidden || m.webkitHidden))) {
                if (h.isString(p) && w && h.isString(w.icon)) {
                    B = a(p, w); d = c(B); if (A.autoClose) o.mozNotification ?
                    f(d) : d.on("show", function () { f(d) })
                } return d
            }
        }; this.permissionLevel = b; this.requestPermission = function (p) { if (t) { p = h.isFunction(p) ? p : C; if (j.webkitNotifications && j.webkitNotifications.requestPermission) return j.webkitNotifications.requestPermission(); else if (j.Notification && j.Notification.requestPermission) return j.Notification.requestPermission(p) } }
    })
});
define("mq.view.desktopNotification", ["./mq.view.desktopNotificationManager", "./mq.presenter.chat"], function () {
    J.$package("mq.view.desktopNotification", function (g) {
        var a = this, b = g.event, c = mq.view.desktopNotificationManager, f = window, h = f.document, j = mq.presenter.chat.translateMessage2Text, o = [], m = { onClose: function (q) { q = a.getNotificationIndex(q.target); q < 0 || o.splice(q, 1) }, onBeforeUnload: function () { g.each(o, function (q) { q.close() }) } }; this.init = function () {
            c.config({ detectPageVisibilify: true, autoClose: 3E3 });
            if (c.permissionLevel() === c.PERMISSION_DEFAULT) b.once(h.querySelector("body"), g.platform.touchDevice ? "tap" : "click", function () { c.requestPermission() }); b.on(f, "beforeunload", m.onBeforeUnload)
        }; this.onAllMessageReceived = function (q, k) { k || !c.isSupported || c.permissionLevel() !== c.PERMISSION_GRANTED || this.appendNotification(q) }; this.appendNotification = function (q) { o.length === 3 && o[0].close(); if (q = c.createNotificationWrapper(q.name, { icon: q.avatar, body: j(q) })) { q.once("close", m.onClose); o.push(q) } }; this.getNotificationIndex =
        function (q) { var k; for (k = 0; k < o.length; ++k) if (q === o[k].primal) return k; return -1 }
    })
});
define("mq.presenter.notification", ["./mq.model.chat", "./mq.model.memberlist", "./mq.view.desktopNotification", "./mq.view.audioNotification"], function () {
    J.$package("mq.presenter.notification", function (g) {
        var a = this, b = g.event, c = {
            onAllMessageReceived: function (f) {
                var h = f.from_group || f.from_user || f.from_discuss; h = a.buddylistModel.getBuddyInfo(h.account, h.type); var j = f.notNotify; a.desktopView.onAllMessageReceived({ content: f.content, avatar: h.avatar, name: h.name }, !mq.setting.enableNotification || j); a.audioView.onAllMessageReceived(!mq.setting.enableVoice ||
                j)
            }
        }; this.init = function () { this.chatModel = mq.model.chat; this.buddylistModel = mq.model.buddylist; this.desktopView = mq.view.desktopNotification; this.audioView = mq.view.audioNotification; this.bindHandlers() }; this.bindHandlers = function () { b.on(this.chatModel, "allMessageReceived", c.onAllMessageReceived) }
    })
});
define("tmpl!../tmpl/tmpl_notify_setting.html", [], function () {
    return function (g) {
        var a, b = ""; with (g || {}) {
            b += '\r\n<div class="group">\r\n    <div class="row clearfix">\r\n        <span class="label">' + ((a = $M("voice")) == null ? "" : a) + '</span>\r\n        <label class="switch switch-white" cmd="clickVoiceSetting">\r\n            <input id="enableVoiceBtn" type="checkbox" ' + ((a = data.enableVoice ? "checked" : "") == null ? "" : a) + '>\r\n            <span/>\r\n        </label>\r\n    </div>\r\n    <div class="row clearfix">\r\n        <span class="label">' +
            ((a = $M("notification")) == null ? "" : a) + '</span>\r\n        <label class="switch switch-white" cmd="clickNotificationSetting">\r\n            <input id="enableNotificationBtn" type="checkbox" ' + ((a = data.enableNotification ? "checked" : "") == null ? "" : a) + '>\r\n            <span/>\r\n        </label>\r\n    </div>\r\n</div>\r\n\r\n<div class="group">\r\n    <div class="row">\r\n        <div class="clearfix">\r\n            <span class="label">' + ((a = $M("https_setting")) == null ? "" : a) + '</span>\r\n            <label class="switch switch-white" cmd="clickHttpsSetting">\r\n                <input id="enableHttpsBtn" type="checkbox" ' +
            ((a = data.enableHttps ? "checked" : "") == null ? "" : a) + '>\r\n                <span/>\r\n            </label>\r\n        </div>\r\n        <div class="tips">' + ((a = $M("https_msg")) == null ? "" : a) + "</div>\r\n    </div>\r\n</div>\r\n"; J.platform.touchDevice || (b += '\r\n<div class="group">\r\n    <div class="row">\r\n        <div class="clearfix">\r\n            <span class="long_label">' + ((a = $M("send_msg_way")) == null ? "" : a) + '</span>\r\n            <label class="switch switch-white" cmd="clickCtrlEnterSetting">\r\n                <input id="enableCtrlEnterBtn" type="checkbox" ' +
            ((a = data.enableCtrlEnter ? "checked" : "") == null ? "" : a) + ">\r\n                <span/>\r\n            </label>\r\n        </div>\r\n    </div>\r\n</div>\r\n"); b += "\r\n"
        } return b
    }
});
define("mq.view.notifySetting", ["tmpl!../tmpl/tmpl_notify_setting.html", "./mq.i18n", "./mq.view.transitionmanager"], function (g) {
    J.$package("mq.view.notifySetting", function () {
        var a = this, b = JM.event, c = JM.dom, f = JM.string, h = mq.i18n.message, j, o, m; this.createPanel = function () {
            if (!this.panel) {
                var k = { id: "notifySetting", parent: mq.view.main.container, className: "profile-panel", title: h("notify_setting"), body: { className: "list_page notify_setting" }, hasBackButton: true, hasScroller: true }; this.panel = new mq.view.TitlePanel(k);
                b.bindCommands(a.panel.container, q)
            } return this.panel
        }; this.init = function () { }; var q = {
            clickLeftButton: function () { currentProfile = null; mq.view.transitionManager.pop("notifySetting"); b.fire(a, "dismiss") }, clickVoiceSetting: function () { b.fire(a, "settingChange", { enableVoice: j.checked || false }) }, clickNotificationSetting: function () { b.fire(a, "settingChange", { enableNotification: o.checked || false }) }, clickHttpsSetting: function () { b.fire(a, "settingChange", { enableHttps: m.checked || false }) }, clickCtrlEnterSetting: function () {
                b.fire(a,
                "settingChange", { enableCtrlEnter: enableCtrlEnterBtn.checked || false })
            }
        }; this.show = function (k) { var e = this.createPanel(); e.setLeftText(k.from || h("return")); e.body.innerHTML = g({ encode: f.encodeHtml, $M: h, data: k.setting }); j = c.id("enableVoiceBtn"); o = c.id("enableNotificationBtn"); m = c.id("enableHttpsBtn"); mq.view.transitionManager.push({ id: "notifySetting", element: this.panel.container, callback: function () { e.scroller.refresh() } }) }
    })
});
define("mq.presenter.notifySetting", ["./mq.i18n", "./mq.view.transitionmanager"], function () { J.$package("mq.presenter.notifySetting", function () { var g = this, a = JM.event; this.init = function () { this.view = mq.view.notifySetting; a.on(mq.view, "viewNotifySetting", b.onViewNotifySetting); a.on(g.view, "settingChange", b.onSettingChange) }; var b = { onViewNotifySetting: function (c) { c || (c = {}); c.setting = mq.setting; g.view.show(c) }, onSettingChange: function (c) { mq.saveSetting(c) } } }) });
define("tmpl!../tmpl/tmpl_main_footer.html", [], function () {
    return function (g) {
        var a, b = ""; with (g || {}) {
            b += '<nav id="nav_tab">\r\n    <ul class="nav_tab_head">\r\n        '; g = 0; for (var c; c = items[g]; g++) b += '\r\n        <li id="' + ((a = c.id) == null ? "" : a) + '" class="' + ((a = c.className) == null ? "" : a) + '" cmd="clickNav" param="' + ((a = c.id) == null ? "" : a) + '">\r\n            <a>\r\n                <div class="icon"></div>\r\n                <span>' + ((a = c.text) == null ? "" : a) + "</span>\r\n            </a>\r\n        </li>\r\n        ";
            b += '\r\n    </ul>\r\n    <div class="wallpaper-ctrl">\r\n        <a href="###" class="wallpaperImg pre" id="wp-ctrl-pre" title="\u70b9\u51fb\u5207\u6362\u80cc\u666f\u56fe\u7247" cmd="clickWPPre"> </a>\r\n        <a href="###" class="wallpaperImg next" id="wp-ctrl-next" title="\u70b9\u51fb\u5207\u6362\u80cc\u666f\u56fe\u7247" cmd="clickWPNext"> </a>\r\n    </div>\r\n    <div class="suggestion"><a href = "http://support.qq.com/discuss/513_1.shtml" target="_blank">\u610f\u89c1\u53cd\u9988</a></div>\r\n</nav>\r\n\r\n'
        } return b
    }
});
define("mq.view.main", ["tmpl!../tmpl/tmpl_main_footer.html", "./mq.i18n", "./mq.view.transitionmanager"], function (g) {
    J.$package("mq.view.main", function (a) {
        var b = this, c, f, h, j = window.localStorage.localBgImage, o = JM.event, m = JM.dom, q = mq.i18n.message; this.init = function () {
            var A; this.container = m.id("container"); if (a.platform.touchDevice) A = m.id("container"); else {
                A = window.innerWidth > 1E3 ? m.id("main_container") : m.id("container"); o.on(window, "resize", function () {
                    var y = m.className("main-panel", document.body)[0]; A =
                    window.innerWidth < 1E3 ? m.id("container") : m.id("main_container"); A.appendChild(y)
                })
            } var p = { parent: A, hasHeader: false, className: "main-panel" }, w = [{ id: "session", className: "contact", text: q("session") }, { id: "contact", className: "conversation", text: q("contact") }, { id: "plugin", className: "plugin", text: q("plugin") }, { id: "setting", className: "setup", text: q("setting") }], B = g({ items: w }); p.footer = { html: B }; p = new mq.view.TitlePanel(p); this.body = p.body; this.body.innerHTML = "<div id='mainTopAll'></div>"; B = m.id("nav_tab"); for (var d =
            B.children[0].children, r = [], v, F = 0, n; n = d[F]; F++) { v = mq.view[w[F].id].createPanel(p.body); r.push({ id: w[F].id, trigger: n, sheet: v.container }) } w = this.nav = new MUI.Tab({ items: r }); o.bindCommands(B, e); o.on(b.nav, "selected", t.onNavItemSelected); o.on(mq.view.transitionManager, "transitionEnd", t.onTransitionEnd); o.on(window, "beforeunload", t.closeHook); p.show(); mq.view.transitionManager.push({ id: "main", element: p.container, transition: false }); w.select(0); if (m.id("bgAllImage") && !a.platform.IOS && !a.platform.android &&
            !a.platform.winPhone) { w = j ? j : "1"; c = parseInt(Math.random() * 28); w = "img/bg/" + w + ".jpg"; p = document.createElement("img"); p.setAttribute("class", "bgAllImage"); p.src = w; m.id("bgAllImage").appendChild(p) }
        }; var k = function () { setTimeout(function () { if (f == c) window.localStorage && window.localStorage.setItem("localBgImage", f); else { f = c; k() } }, 8E3) }, e = {
            clickNav: function (A) { b.nav.select(A) }, clickWPPre: function () {
                if (c === 0) c = 28; else c--; m.id("bgAllImage").innerHTML = "<img class='bgAllImage' src='img/bg/" + c + ".jpg'/>"; if (!h) {
                    f =
                    c; h = true
                } k()
            }, clickWPNext: function () { if (c === 28) c = 0; else c++; m.id("bgAllImage").innerHTML = "<img class='bgAllImage' src='img/bg/" + c + ".jpg'/>"; if (!h) { f = c; h = true } k() }
        }, t = { onNavItemSelected: function (A) { A = A.current.id; mq.view[A] && o.fire(mq.view[A], "show") }, onTransitionEnd: function (A) { if (A.to === "main") { A = b.nav.getSelected().item.id; mq.view[A] && o.fire(mq.view[A], "show") } }, closeHook: function () { if (mq.main.isOnline()) return q("beforeclose") } }; this.showGuide = function () {
            var A = m.id("guide"), p = m.id("container"),
            w = m.id("main_container"), B = navigator.platform; (window.orientation != undefined ? "iPod" : (B.match(/mac|win|linux/i) || ["unknown"])[0]).match(/mac|win|linux/i) || m.setStyle(m.id("qrcode"), "display", "none"); m.setStyle(A, "display", "block"); m.setStyle(p, "display", "none"); m.setStyle(w, "display", "none")
        }; this.removeGuide = function () { var A = m.id("guide"), p = m.id("container"), w = m.id("main_container"); A && A.parentNode.removeChild(A); m.setStyle(p, "display", "block"); m.setStyle(w, "display", "block") }; this.setOnlineState =
        function (A) { if (!this.onlineState) this.onlineState = m.id("user_online_state"); this.onlineState.className = "state_" + A }; var C = {
            init: function () {
                this._init = true; var A = this._el = document.createElement("div"); A.setAttribute("class", "message_bubble"); A.innerHTML = '<div class="message_body"><div cmd="closeBubble" class="close" title="\u5173\u95ed">X</div><div class="message_content"></div></div>'; this._msgEl = A.firstChild.lastChild; var p = this; o.bindCommands(A.firstChild, { closeBubble: function () { p.hide() }, gotoLogin: function () { mq.main.gotoLogin() } });
                document.body.appendChild(A)
            }, show: function (A, p) { this._init || this.init(); this._timeout && clearTimeout(this._timeout); this._msgEl.innerHTML = A; var w = this; if (p) this._timeout = setTimeout(function () { w.hide(); w._timeout = 0 }, p); m.addClass(this._el, "show") }, hide: function () { this._init && m.removeClass(this._el, "show") }
        }; mq.bubble = function (A, p) { C.show(A, p) }; mq.hideBubble = function () { C.hide() }
    })
});
define("mq.view.loginPanel", ["./mq.i18n", "./mq.view.transitionmanager"], function () {
    J.$package("mq.view.loginPanel", function () {
        var g = this, a = JM.event, b = JM.dom, c = JM.http, f, h; this.init = function () { }; this.show = function () {
            if (!h) {
                h = document.createElement("div"); h.setAttribute("class", "masker"); document.body.appendChild(h); f = document.createElement("div"); f.setAttribute("class", "login-panel"); f.innerHTML = '<iframe noscroll frameborder="0" style="position:absolute;width:100%;height:100%;border:0;"></iframe>';
                a.on(f.lastChild, "click", j); document.body.appendChild(f)
            } f.firstChild.src = "https://ui.ptlogin2.qq.com/cgi-bin/login?" + c.serializeParam({ daid: 164, target: "self", style: 16, mibao_css: "m_webqq", appid: 501004106, enable_qlogin: 0, no_verifyimg: 1, s_url: "http://w.qq.com/proxy.html", f_url: "loginerroralert", strong_login: 1, login_state: 10, t: 20131024001 }); b.setStyle(h, "display", "block"); b.setStyle(f, "display", "block"); setTimeout(function () { b.addClass(f, "show") }, 0)
        }; this.hide = function () {
            h && b.setStyle(h, "display", "none");
            f && b.setStyle(f, "display", "none"); b.removeClass(f, "show")
        }; var j = function () { g.hide() }
    })
});
define("qtracker", [], function () {
    (function (g, a) {
        var b; window[g] || (b = window[g] = {}); var c = { utils: { halt: function () { } } }, f = function () { }, h = {}, j = function (k, e) {
            var t = function () { if (this instanceof arguments.callee) this.__init__ && this.__init__.apply(this, arguments); else throw Error("You must new an instance"); }; if (e) {
                t.prototype = new e; for (var C in k) if (k.hasOwnProperty(C)) {
                    if (C == "__init__") {
                        var A = t.prototype.__init__, p = k[C]; if (A) {
                            t.prototype.__init__ = function () { A.apply(this, arguments); p.apply(this, arguments) };
                            continue
                        }
                    } t.prototype[C] = k[C]
                }
            } else t.prototype = k; return t
        }, o = j({ send: function () { throw Error("This method should be rewrite!"); } }), m = j({
            __init__: function (k) { k = k || {}; this._initOption(k); k = this.size; this.len = k - 1; this.array = []; this.array[k - 1] = a; this.errors = this.pointer = 0 }, _initOption: function (k) { this.size = k.size || 20; this.timeout = k.timeout || 3; this.errorMax = k.errormax || 10 }, send: function (k) {
                for (var e = this.pointer, t = 0, C = this.len, A = this.array; t <= C; t++) {
                    e = e + 1 > C ? e - C : e + 1; c.utils.halt("check if " + e + " is free.");
                    if (this._isFree(A[e], e)) { this.pointer = e; this._send(k, e); c.utils.halt(e + " is free!"); break }
                }
            }, _onError: function () { this.errors++; if (this.errors >= this.errorMax) { this.send = f; c.utils.halt("stop report") } }, _isFree: function (k, e) { if (k && "ts" in k && +new Date - k.ts < this.timeout * 1E3) return false; else if (k && "ts" in k) { if (!k.finish) { this._onError(); this._setFree(e); c.utils.halt("report time out!"); return false } return true } return true }, _setFree: function (k) { this.array[k].finish = true }, release: function () {
                return window.CollectGarbage ?
                window.CollectGarbage : function () { }
            }(), _send: function (k) { var e = this.array[this.pointer]; if (!(e && "ts" in e)) { e = this.array[this.pointer] = {}; e.dom = new Image; e.dom.onload = function () { e.finish = true }; e.dom.onerror = function () { e.finish = true } } e.ts = +new Date; e.dom.src = k + "&t=" + e.ts; e.finish = false }
        }, o); o = j({
            __init__: function (k) {
                k = k || {}; this.interval = k.interval || 10; this.urlLimit = k.urlLimit || 1024; this.errorTimeout = k.errorTimeout || 4; this.transport = new m; this.urlHead = "http://isdspeed.qq.com/cgi-bin/r.cgi?"; this.pages =
                {}
            }, registerPage: function (k, e) { return this.pages[k] = new q({ transport: this.transport, urlHead: this.urlHead, flags: e }) }, add: function (k) { k = this.pages[k]; console.info(k, this.pages[k], this.pages); if (k) k.add.apply(k, Array.prototype.slice.call(arguments, 1)); else throw Error("No such Page!Check the page name."); }, send: function (k) { if (k = this.pages[k]) k.send(); else throw Error("No such Page!Check the page name."); }
        }); var q = j({
            __init__: function (k) {
                this.transport = k.transport; for (var e = [], t = 0; t < k.flags.length; t++) e.push("flag" +
                (1 + t) + "=" + k.flags[t]); this.urlHead = k.urlHead + e.join("&") + "&"; this.itemsHash = {}
            }, add: function (k, e, t, C) { var A = this.itemsHash[k] = this.itemsHash[k] || []; A[0] = A[0] || h[k]; A[2] = e || A[2]; A[3] = t || A[3]; A[1] = A[3] - A[2]; C && this.send() }, send: function (k) { var e = this.urlHead, t = [], C; for (C in this.itemsHash) if (this.itemsHash.hasOwnProperty(C)) if (k = this.itemsHash[C]) if (!isNaN(k[1])) { t.push(k.slice(0, 2).join("=")); delete this.itemsHash[C] } t.length && this.transport.send(e + t.join("&")) }, disable: function () {
                if (!this.isDisable) {
                    this.add =
                    this.send = f; this.isDisable = true
                }
            }
        }); b.setPageItemsHash = function (k) { h = k }; b.tracker = { Isd: new o({}), Img: new m }
    })("qtracker")
});
define("mq.main", ["tmpl!../tmpl/tmpl_main_top.html", "../lib/mui/js/mui.tab", "../lib/mui/js/mui.textarea", "../lib/mui/js/mui.lazyload", "../lib/mui/js/mui.imagechange", "../lib/mui/js/mui.slide", "../lib/mui/js/mui.swipechange", "./mq.i18n", "./mq.view.transitionmanager", "./mq.util", "./mq.view.TitlePanel", "./mq.rpcservice", "./mq.view.MemberList", "./mq.model.memberlist", "./mq.presenter.memberlist", "./mq.model.chat", "./mq.view.chat", "./mq.presenter.chat", "./mq.presenter.search", "./mq.view.search", "./mq.presenter.profile",
"./mq.view.profile", "./mq.view.member", "./mq.presenter.member", "./mq.model.record", "./mq.view.record", "./mq.presenter.record", "./mq.view.session", "./mq.view.contact", "./mq.view.setting", "./mq.presenter.setting", "./mq.presenter.pluginDisplayer", "./mq.view.plugin", "./mq.view.pluginDisplayer", "./mq.view.audioNotification", "./mq.view.desktopNotificationManager", "./mq.view.desktopNotification", "./mq.presenter.notification", "./mq.view.notifySetting", "./mq.presenter.notifySetting", "./mq.view.main", "./mq.view.loginPanel",
"./mq.main", "./qtracker"], function (g) {
    J.$package("mq.main", function (a) {
        var b = JM.event, c = JM.dom, f = JM.http, h = JM.string, j = this, o = "poll", m, q = 3, k = 0, e = function (p, w) { var B = p.length, d = function () { B--; B == 0 && w() }; a.each(p, function (r) { r(d) }) }, t = function (p, w) { return (p.value && p.value.time || 0) < (w.value && w.value.time || 0) ? 1 : -1 }, C = {}, A = {
            onLoginSuccess: function (p) {
                p = p.result; j.setValidate({ psessionid: p.psessionid }); mq.port = p.port; mq.index = p.index; mq.view.main.init(); mq.view.contact.init(); mq.view.session.init(); mq.presenter.buddylist.init();
                mq.model.buddylist.init({ selfUin: p.uin }); mq.model.chat.init(); mq.view.chat.init(); mq.presenter.chat.init(); mq.view.search.init(); mq.presenter.search.init(); mq.view.profile.init(); mq.presenter.profile.init(); mq.view.setting.init(); mq.presenter.setting.init(); mq.presenter.member.init(); mq.presenter.record.init(); mq.view.plugin.init(); mq.view.pluginDisplayer.init(); mq.presenter.pluginDisplayer.init(); mq.view.audioNotification.init(); mq.view.desktopNotification.init(); mq.presenter.notification.init();
                mq.presenter.notifySetting.init(); var w = mq.model.buddylist; e([w.getUserFriends(), w.getGroupList(), w.getDiscussList()], function () { w.sendGetBuddyOnlineState(); w.getRecentList(function () { j.startPoll() }) }); w.sendGetSelfInfo(); b.fire(j, "loginSuccess", { selfUin: p.uin }); if (c.id("mainTopAll") && !a.platform.IOS && !a.platform.android && !a.platform.winPhone) { var B = c.id("mainTopAll"); b.bindCommands(B, C) } m = p.status
            }, onGetVfWebQQSuccess: function (p) { j.setValidate({ vfwebqq: p.result.vfwebqq }); mq.rpcService.login() }, onGetVfWebQQFailure: function () { j.gotoLogin() },
            onLoginFailure: function () { j.gotoLogin() }, onPollSuccess: function (p) { if (p) { p.sort(t); for (var w = 0, B; B = p[w]; w++) switch (B.poll_type) { case "sess_message": case "message": case "group_message": case "discu_message": b.fire(j, "receiveMessage", B); break; case "kick_message": j.stopPoll(); j.logout(); mq.log("kick message"); b.fire(j, "SelfOffline", { message: B.value.reason, action: "relogin" }); break; case "filesrv_transfer": case "file_message": case "push_offfile": case "notify_offfile": b.fire(j, "receiveFileMessage", B) } } },
            onPollComplete: function () { j.keepPoll() }, onGetFirstSelfInfo: function (p) { if (c.id("mainTopAll") && !a.platform.IOS && !a.platform.android && !a.platform.winPhone) { c.id("mainTopAll").innerHTML = g({ user: p, encode: h.encodeHtml }); mq.view.main.setOnlineState(m) } }, onOnlineStateChange: function (p) { m = p.state; mq.view.main.setOnlineState(m) }, onReLinkSuccess: function (p) { q = 3; k = 0; mq.debug("\u91cd\u8fde\u6210\u529f."); mq.hideBubble(); j.setValidate(p); j.startPoll(); mq.pgvSendClick({ hottag: "smartqq.im.relinksuccess" }) }, onReLinkStop: function () {
                mq.debug("\u5f88\u52aa\u529b\u5730\u91cd\u8fde\u4e86, \u8fd8\u662f\u5931\u8d25\u4e86.");
                j.stopPoll(); mq.hideBubble(); b.fire(j, "SelfOffline", { message: "\u8eab\u4efd\u9a8c\u8bc1\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55", action: "relogin" }); mq.pgvSendClick({ hottag: "smartqq.im.relinkstop" })
            }, onFailCountOverMax: function () {
                j.stopPoll(); if (k < q) { setTimeout(function () { j.reLink() }, 1E3); b.fire(j, "SelfOffline", { message: "\u56e0\u7f51\u7edc\u6216\u5176\u4ed6\u539f\u56e0\u4e0e\u670d\u52a1\u5668\u5931\u53bb\u8054\u7cfb\uff0c\u6b63\u5728\u5c1d\u8bd5\u91cd\u65b0\u767b\u5f55...", action: "relink" }) } else A.onReLinkStop();
                k++
            }, onNotLogin: function () { b.fire(j, "SelfOffline", { message: "\u4f60\u7684\u767b\u5f55\u5df2\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002", action: "login" }) }, onNotReLogin: function () { b.fire(j, "SelfOffline", { message: "\u56e0\u7f51\u7edc\u6216\u5176\u4ed6\u539f\u56e0\u4e0e\u670d\u52a1\u5668\u5931\u53bb\u8054\u7cfb\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002", action: "login" }) }, onSelfOffline: function (p) { mq.bubble(p.message, p.action == "relogin" ? 0 : 5E3) }
        }; this.bindHandlers = function () {
            b.on(mq.rpcService,
            "LoginSuccess", A.onLoginSuccess); b.on(mq.rpcService, "LoginFailure", A.onLoginFailure); b.on(mq.rpcService, "getVfWebQQSuccess", A.onGetVfWebQQSuccess); b.on(mq.rpcService, "getVfWebQQFailure", A.onGetVfWebQQFailure); b.on(mq.rpcService, "PollComplete", A.onPollComplete); b.on(mq.rpcService, "PollSuccess", A.onPollSuccess); b.on(mq, "onlineStateChange", A.onOnlineStateChange); b.on(mq.model.buddylist, "getFirstSelfInfo", A.onGetFirstSelfInfo); b.on(mq.rpcService, "NotLogin", A.onNotLogin); b.on(mq.rpcService, "NotReLogin",
            A.onNotReLogin); b.on(mq.rpcService, "ReLinkStop", A.onReLinkStop); b.on(mq.rpcService, "FailCountOverMax", A.onFailCountOverMax); b.on(mq.rpcService, "ReLinkSuccess", A.onReLinkSuccess); b.on(mq.rpcService, "ReLinkFailure", A.onFailCountOverMax); b.on(j, "SelfOffline", A.onSelfOffline)
        }; this.start = function () {
            mq.loadSetting(); this.setValidate({ clientid: 53999199, ptwebqq: a.cookie.get("ptwebqq"), skey: a.cookie.get("skey") }); if (f.getUrlParam("guide", location.href) == 1) mq.view.main.showGuide(); else !mq.ptwebqq || !mq.skey ?
            this.gotoLogin() : this.onPTLoginSuccess(); mq.util.report2BNL2("11201")
        }; this.setValidate = function (p) { mq.psessionid = p.psessionid || mq.psessionid || ""; mq.vfwebqq = p.vfwebqq || mq.vfwebqq || ""; mq.ptwebqq = p.ptwebqq || mq.ptwebqq || ""; p.ptwebqq && a.cookie.set("ptwebqq", p.ptwebqq, "qq.com"); mq.clientid = p.clientid || mq.clientid || ""; mq.skey = p.skey || mq.skey || "" }; this.onPTLoginSuccess = function (p) {
            this.loginType = p || 10; mq.view.loginPanel.hide(); this.setValidate({ ptwebqq: a.cookie.get("ptwebqq"), skey: a.cookie.get("skey") });
            mq.view.main.removeGuide(); this.bindHandlers(); mq.rpcService.getVfWebQQ(); mq.util.report2BNL2("11202")
        }; this.gotoLogin = function () { mq.util.report2BNL2("11203"); mq.pgvSendClick({ hottag: "smartqq.portal.jumptologin" }); mq.view.loginPanel.show() }; this.logout = function () { a.cookie.remove("ptwebqq", "qq.com"); a.cookie.remove("skey", "qq.com") }; this.isOnline = function () { return o == "poll" }; this.startPoll = function () { o = "poll"; this.keepPoll() }; this.stopPoll = function () { o = "stop" }; this.keepPoll = function () {
            o === "poll" &&
            mq.rpcService.sendPoll()
        }; this.reLink = function () { mq.debug("reLink "); this.stopPoll(); mq.rpcService.sendReLink(); mq.pgvSendClick({ hottag: "smartqq.im.relink" }) }; this.getCurrentOnlineState = function () { return m }
    })
}); require.config({ paths: { jm: "../lib/jm/jm", jmAudio: "../lib/jm/jm.audio", iscroll: "../lib/iscroll/iscroll", tmpl: "../lib/require/tmpl" } });
require(["jm", "iscroll", "./mq.portal", "./mq.main"], function () {
    var g = window.navigator.userAgent.toLowerCase(), a, b, c; if (J.platform.touchDevice || g.indexOf("webkit") >= 1 || g.indexOf("gecko") >= 1) mq.main.start(); else if (J.platform.ieVersion > 8 && document.documentMode > 8) {
        g = document.getElementsByTagName("html")[0]; a = "ie ie" + J.platform.ieVersion; if (g.className) a = " " + a; g.className = a; g = document.getElementsByTagName("head")[0] || document.documentElement; if (J.platform.ieVersion <= 8) {
            a = document.createElement("script");
            a.src = "lib/html5shiv/html5shiv.js"; g.appendChild(a)
        } a = document.createElement("link"); a.type = "text/css"; a.rel = "stylesheet"; a.href = "css/ie.css"; g.appendChild(a); b = ["js/ie.js"]; g = function () { ++c; c === b.length && mq.main.start() }; a = mq.util.loadFile; for (c = b.length; c--;) a(b[c], g); c = 0
    } else {
        g = document.createElement("div"); g.className = "newMaskAll"; g.innerHTML = "<div class='newMaskText'>\u8bf7\u4f7f\u7528\u4ee5\u4e0b\u6d4f\u89c8\u5668\u8fdb\u884c\u8bbf\u95ee\uff1a</div><div class='newMaskLogo'><a class='newMaskChrome'href='https://www.google.com/intl/en/chrome/browser/' target='_blank' title='\u70b9\u51fb\u8df3\u8f6c\u5230chrome\u6d4f\u89c8\u5668\u4e0b\u8f7d\u9875'></a><a class='newMaskFirefox' href='http://firefox.com.cn/' target='_blank' title='\u70b9\u51fb\u8df3\u8f6c\u5230Firefox\u6d4f\u89c8\u5668\u4e0b\u8f7d\u9875'></a></div>";
        a = document.getElementById("container"); a.parentNode.insertBefore(g, a)
    }
}); define("main.js", function () { });
