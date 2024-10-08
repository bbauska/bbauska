!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : ((t = "undefined" != typeof globalThis ? globalThis : t || self).Ukiyo = e());
})(this, function () {
    "use strict";
    var t = function (t) {
            return Array.prototype.slice.call(t);
        },
        e = function () {
            var t = window.navigator.userAgent,
                e = !!t.match(/iPad/i) || !!t.match(/iPhone/i),
                i = !!t.match(/WebKit/i);
            return e && i && !t.match(/CriOS/i);
        },
        i = { scale: 1.5, speed: 1.5, wrapperClass: null, willChange: !1, externalRAF: !1 },
        n = function (t, e) {
            var n = this;
            if (
                ((this.element = t),
                (this.wrapper = document.createElement("div")),
                (this.options = Object.assign({}, i, e)),
                this.updateOptions(),
                (this.vh = document.documentElement.clientHeight),
                (this.isVisible = !1),
                (this.damp = this.calcDamp(document.documentElement.clientWidth)),
                (this.elementTagName = t.tagName.toLowerCase()),
                "img" === this.elementTagName)
            ) {
                var o = t.getAttribute("src");
                if (!o) return;
                (async function (t) {
                    var e = new Image();
                    return (e.src = t), await e.decode(), e;
                })(o).then(function () {
                    n.createParallax();
                });
            } else this.createParallax();
        };
    (n.prototype.createParallax = function () {
        this.setStyle(!0), this.wrapElement(), e() || this.createObserver();
    }),
        (n.prototype.updateOptions = function () {
            var t = this.element.getAttribute("data-u-scale"),
                e = this.element.getAttribute("data-u-speed"),
                i = this.element.getAttribute("data-u-willchange");
            null !== t && (this.options.scale = Number(t)), null !== e && (this.options.speed = Number(e)), null !== i && (this.options.willChange = !0);
        }),
        (n.prototype.setStyle = function (t) {
            void 0 === t && (t = !1);
            var e = this.element.clientHeight,
                i = this.element.clientWidth,
                n = window.getComputedStyle(this.element),
                o = "absolute" === n.position,
                r = this.wrapper.style,
                a = this.element.style,
                s = this.options.scale;
            o && "0px" !== n.marginRight && "0px" !== n.marginLeft && n.marginLeft === n.marginRight && (r.margin = "auto"),
                ("0px" === n.marginTop && "0px" === n.marginBottom) || ((r.marginTop = n.marginTop), (r.marginBottom = n.marginBottom), (a.marginTop = "0"), (a.marginBottom = "0")),
                "auto" !== n.inset && ((r.top = n.top), (r.right = n.right), (r.bottom = n.bottom), (r.left = n.left), (a.top = "0"), (a.right = "0"), (a.bottom = "0"), (a.left = "0")),
                "none" !== n.transform && (r.transform = n.transform),
                "auto" !== n.zIndex && (r.zIndex = n.zIndex),
                (r.position = o ? "absolute" : "relative"),
                "auto" !== n.gridArea && "auto / auto / auto / auto" !== n.gridArea && ((r.gridArea = n.gridArea), (a.gridArea = "auto")),
                t &&
                    ((r.width = "100%"),
                    (r.overflow = "hidden"),
                    (a.display = "block"),
                    (a.overflow = "hidden"),
                    (a.backfaceVisibility = "hidden"),
                    "0px" !== n.padding && (a.padding = "0"),
                    "img" === this.elementTagName ? (a.objectFit = "cover") : "video" !== this.elementTagName && (a.backgroundPosition = "center")),
                "0px" !== n.borderRadius &&
                    ((r.borderRadius = n.borderRadius),
                    r.isolation || (r.isolation = "isolate"),
                    "0px" !== n.marginLeft && ((r.marginLeft = n.marginLeft), (a.marginLeft = "0")),
                    "0px" !== n.marginRight && ((r.marginRight = n.marginRight), (a.marginRight = "0")),
                    (r.width = i + "px")),
                o && ((r.width = i + "px"), (a.width = "100%")),
                "none" !== n.maxHeight && ((r.maxHeight = n.maxHeight), (a.maxHeight = "none")),
                "0px" !== n.minHeight && ((r.minHeight = n.minHeight), (a.minHeight = "none")),
                (a.width = i + "px"),
                r.setProperty("height", e + "px", "important"),
                a.setProperty("height", e * s + "px", "important"),
                (this.wrapperHeight = e),
                (this.overflow = Math.floor(10 * (e - e * s)) / 10);
        }),
        (n.prototype.wrapElement = function () {
            var t = this.element.getAttribute("data-u-wrapper-class") || this.options.wrapperClass;
            t && this.wrapper.classList.add(t);
            var e = this.element.closest("picture"),
                i = null !== e ? e : this.element,
                n = i.parentNode;
            null !== n && n.insertBefore(this.wrapper, i), this.wrapper.appendChild(i);
        }),
        (n.prototype.checkVisible = function () {
            var t = this.wrapper.getBoundingClientRect();
            t.bottom > 0 && t.top < window.innerHeight ? this.onEnter() : this.onLeave();
        }),
        (n.prototype.createObserver = function () {
            var t = this;
            (this.observer = new IntersectionObserver(
                function (e) {
                    e[0].isIntersecting ? t.onEnter() : t.onLeave();
                },
                { root: null, rootMargin: "0px", threshold: 0 }
            )),
                this.observer.observe(this.wrapper);
        }),
        (n.prototype.onEnter = function () {
            var t = this.element.style,
                e = "transform";
            this.options.willChange && t.willChange !== e && (t.willChange = e), (this.isVisible = !0);
        }),
        (n.prototype.onLeave = function () {
            var t = this.element;
            this.options.willChange && "transform" === t.style.willChange && (t.style.willChange = ""), (this.isVisible = !1);
        }),
        (n.prototype.calcTranslateValue = function () {
            var t = window.pageYOffset;
            t < 0 && (t = 0);
            var e = this.wrapper.getBoundingClientRect().top + t,
                i = (t + this.vh - e) / ((this.vh + this.wrapperHeight) / 100),
                n = Math.min(100, Math.max(0, i)) / 100,
                o = this.overflow,
                r = this.options.speed,
                a = (o * r - o) / 2,
                s = o * (1 - n) * r * this.damp - a;
            return Number(s.toFixed(4));
        }),
        (n.prototype.calcDamp = function (t) {
            var e = this.options.scale,
                i = this.options.speed;
            if (!(i >= 1.4 || e >= 1.4) || !(t <= 1e3)) return 1;
            e < 1 && (e = 1), i < 1 && (i = 1);
            var n = 1.2 - (1 - (t / 1e3 + (3 - (e + i)))),
                o = Math.max(0.5, Math.min(1, n));
            return Math.floor(100 * o) / 100;
        }),
        (n.prototype.applyParallax = function () {
            this.element.style.transform = "translate3d(0 , " + this.calcTranslateValue() + "px , 0)";
        }),
        (n.prototype.animate = function () {
            e() && this.checkVisible(), window.pageYOffset < 0 || (this.isVisible && this.applyParallax());
        }),
        (n.prototype.reset = function () {
            this.damp = this.calcDamp(window.innerWidth);
            var t = this.wrapper.style,
                e = this.element.style;
            (this.vh = document.documentElement.clientHeight),
                (t.width = ""),
                (t.position = ""),
                (t.height = "100%"),
                (e.width = ""),
                "img" === this.elementTagName && "absolute" === t.position && (t.height = "100%"),
                "" === t.gridArea ? (e.height = "") : (e.height = "100%"),
                "0px" !== t.margin && ((t.margin = ""), (e.margin = "")),
                "auto" !== t.inset && ((t.top = ""), (t.right = ""), (t.bottom = ""), (t.left = ""), (e.top = ""), (e.right = ""), (e.bottom = ""), (e.left = "")),
                "none" !== t.transform && ((t.transform = ""), (e.transform = "")),
                "auto" !== t.zIndex && (t.zIndex = ""),
                "0px" !== t.borderRadius && ((t.borderRadius = ""), (t.isolation = "")),
                this.setStyle(),
                this.applyParallax();
        }),
        (n.prototype.destroy = function () {
            var t;
            this.observer && this.observer.disconnect(), this.wrapper.removeAttribute("style"), this.element.removeAttribute("style"), (t = this.wrapper).replaceWith.apply(t, this.wrapper.childNodes);
        });
    var o = function (e, i) {
        if (!e) throw new Error("Argument 'elements' cannot be null.");
        var n, o;
        (this.instances = []),
            (this.externalRAF = (i && i.externalRAF) || !1),
            (this.onResizeEvent = this.resize.bind(this)),
            (n = "undefined" != typeof Promise && -1 !== Promise.toString().indexOf("[native code]")),
            (o = "undefined" != typeof Element && Element.prototype.closest),
            n &&
                o &&
                "IntersectionObserver" in window &&
                this.init(
                    (function (e) {
                        return Array.isArray(e) ? e : "string" == typeof e ? t(document.querySelectorAll(e)) : e instanceof HTMLElement ? [e] : e instanceof NodeList || e instanceof HTMLCollection ? t(e) : [e];
                    })(e),
                    i
                );
    };
    return (
        (o.prototype.init = function (t, e) {
            (this.instances = t.map(function (t) {
                return new n(t, e);
            })),
                this.externalRAF || this.animate(),
                navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/) ? window.addEventListener("orientationchange", this.onResizeEvent) : window.addEventListener("resize", this.onResizeEvent);
        }),
        (o.prototype.animate = function () {
            this.instances.forEach(function (t) {
                t.animate();
            }),
                this.externalRAF || (this.requestId = window.requestAnimationFrame(this.animate.bind(this)));
        }),
        (o.prototype.reset = function () {
            this.instances.forEach(function (t) {
                t.reset();
            });
        }),
        (o.prototype.resize = function () {
            clearTimeout(this.timer), (this.timer = window.setTimeout(this.reset.bind(this), 500)), this.reset.bind(this);
        }),
        (o.prototype.destroy = function () {
            this.requestId && window.cancelAnimationFrame(this.requestId),
                window.removeEventListener("resize", this.onResizeEvent),
                window.removeEventListener("orientationchange", this.onResizeEvent),
                this.instances.forEach(function (t) {
                    t.destroy();
                });
        }),
        o
    );
});
