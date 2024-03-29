/*!
 * HC-Sticky
 * =========
 * Version: 2.1.0
 * Author: Some Web Media
 * Author URL: http://somewebmedia.com
 * Plugin URL: https://github.com/somewebmedia/hc-sticky
 * Description: Cross-browser plugin that makes any element on your page visible while you scroll
 * License: MIT
 */
!
function(t, e) {
	"use strict";
	if ("object" == typeof module && "object" == typeof module.exports) {
		if (!t.document) throw new Error("HC-Sticky requires a browser to run.");
		module.exports = e(t)
	} else "function" == typeof define && define.amd ? define("hcSticky", [], e(t)) : e(t)
}("undefined" != typeof window ? window : this, function(t) {
	"use strict";
	var e = {
		top: 0,
		bottom: 0,
		bottomEnd: 0,
		innerTop: 0,
		innerSticker: null,
		stickyClass: "sticky",
		stickTo: null,
		followScroll: !0,
		queries: null,
		queryFlow: "down",
		onStart: null,
		onStop: null,
		onBeforeResize: null,
		onResize: null,
		resizeDebounce: 100,
		disable: !1
	},
		o = t.document,
		i = function(n, s) {
			if ("string" == typeof n && (n = o.querySelector(n)), !n) return !1;
			var r = {},
				l = i.Helpers,
				a = n.parentNode;
			"static" === l.getStyle(a, "position") && (a.style.position = "relative");
			var c = function() {
					var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					l.isEmptyObject(t) && r || (r = Object.assign({}, e, r, t))
				},
				f = function() {
					return r.disable
				},
				d = function() {
					if (r.queries) {
						var o = t.innerWidth,
							i = r.queryFlow,
							n = r.queries;
						if (function(t) {
							r = Object.assign({}, e, t || {})
						}(s), "up" === i) for (var a in n) o >= a && !l.isEmptyObject(n[a]) && c(n[a]);
						else {
							var f = [];
							for (var d in r.queries) {
								var u = {};
								u[d] = n[d], f.push(u)
							}
							for (var p = f.length - 1; p >= 0; p--) {
								var g = f[p],
									m = Object.keys(g)[0];
								o <= m && !l.isEmptyObject(g[m]) && c(g[m])
							}
						}
					}
				},
				u = {
					css: {},
					position: null,
					stick: function() {
						var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
						l.hasClass(n, r.stickyClass) || (!1 === p.isAttached && p.attach(), u.position = "fixed", n.style.position = "fixed", n.style.left = p.offsetLeft + "px", n.style.width = p.width, void 0 === t.bottom ? n.style.bottom = "auto" : n.style.bottom = t.bottom + "px", void 0 === t.top ? n.style.top = "auto" : n.style.top = t.top + "px", n.classList ? n.classList.add(r.stickyClass) : n.className += " " + r.stickyClass, r.onStart && r.onStart.call(n, r))
					},
					reset: function() {
						var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
						if (t.disable = t.disable || !1, "fixed" === u.position || null === u.position || !(void 0 === t.top && void 0 === t.bottom || void 0 !== t.top && (parseInt(l.getStyle(n, "top")) || 0) === t.top || void 0 !== t.bottom && (parseInt(l.getStyle(n, "bottom")) || 0) === t.bottom)) {
							!0 === t.disable ? !0 === p.isAttached && p.detach() : !1 === p.isAttached && p.attach();
							var e = t.position || u.css.position;
							u.position = e, n.style.position = e, n.style.left = !0 === t.disable ? u.css.left : p.positionLeft + "px", n.style.width = "absolute" !== e ? u.css.width : p.width, void 0 === t.bottom ? n.style.bottom = !0 === t.disable ? "" : "auto" : n.style.bottom = t.bottom + "px", void 0 === t.top ? n.style.top = !0 === t.disable ? "" : "auto" : n.style.top = t.top + "px", n.classList ? n.classList.remove(r.stickyClass) : n.className = n.className.replace(new RegExp("(^|\\b)" + r.stickyClass.split(" ").join("|") + "(\\b|$)", "gi"), " "), r.onStop && r.onStop.call(n, r)
						}
					}
				},
				p = {
					el: o.createElement("div"),
					offsetLeft: null,
					positionLeft: null,
					width: null,
					isAttached: !1,
					init: function() {
						for (var t in u.css) p.el.style[t] = u.css[t];
						var e = l.getStyle(n);
						p.offsetLeft = l.offset(n).left - (parseInt(e.marginLeft) || 0), p.positionLeft = l.position(n).left, p.width = l.getStyle(n, "width")
					},
					attach: function() {
						a.insertBefore(p.el, n.nextSibling), p.isAttached = !0
					},
					detach: function() {
						p.el = a.removeChild(p.el), p.isAttached = !1
					}
				},
				g = void 0,
				m = void 0,
				v = void 0,
				h = void 0,
				y = void 0,
				b = void 0,
				S = void 0,
				w = void 0,
				k = void 0,
				x = void 0,
				L = void 0,
				E = void 0,
				T = void 0,
				C = void 0,
				j = void 0,
				z = void 0,
				N = void 0,
				O = void 0,
				R = function() {
					u.css = function(t) {
						var e = l.getCascadedStyle(t),
							o = l.getStyle(t),
							i = {
								height: t.offsetHeight + "px",
								left: e.left,
								right: e.right,
								top: e.top,
								bottom: e.bottom,
								position: o.position,
								display: o.display,
								verticalAlign: o.verticalAlign,
								boxSizing: o.boxSizing,
								marginLeft: e.marginLeft,
								marginRight: e.marginRight,
								marginTop: e.marginTop,
								marginBottom: e.marginBottom,
								paddingLeft: e.paddingLeft,
								paddingRight: e.paddingRight
							};
						return e.float && (i.float = e.float || "none"), e.cssFloat && (i.cssFloat = e.cssFloat || "none"), o.MozBoxSizing && (i.MozBoxSizing = o.MozBoxSizing), i.width = "auto" !== e.width ? e.width : "border-box" === i.boxSizing || "border-box" === i.MozBoxSizing ? t.offsetWidth + "px" : o.width, i
					}(n), p.init(), g = !(!r.stickTo || !("document" === r.stickTo || r.stickTo.nodeType && 9 === r.stickTo.nodeType || "object" == typeof r.stickTo && r.stickTo instanceof("undefined" != typeof HTMLDocument ? HTMLDocument : Document))), m = r.stickTo ? g ? o : "string" == typeof r.stickTo ? o.querySelector(r.stickTo) : r.stickTo : a, j = (O = function() {
						var t = n.offsetHeight + (parseInt(u.css.marginTop) || 0) + (parseInt(u.css.marginBottom) || 0),
							e = (j || 0) - t;
						return e >= -1 && e <= 1 ? j : t
					})(), h = (N = function() {
						return g ? Math.max(o.documentElement.clientHeight, o.body.scrollHeight, o.documentElement.scrollHeight, o.body.offsetHeight, o.documentElement.offsetHeight) : m.offsetHeight
					})(), y = g ? 0 : l.offset(m).top, b = r.stickTo ? g ? 0 : l.offset(a).top : y, S = t.innerHeight, z = n.offsetTop - (parseInt(u.css.marginTop) || 0), v = r.innerSticker ? "string" == typeof r.innerSticker ? o.querySelector(r.innerSticker) : r.innerSticker : null, w = isNaN(r.top) && r.top.indexOf("%") > -1 ? parseFloat(r.top) / 100 * S : r.top, k = isNaN(r.bottom) && r.bottom.indexOf("%") > -1 ? parseFloat(r.bottom) / 100 * S : r.bottom, x = v ? v.offsetTop : r.innerTop ? r.innerTop : 0, L = isNaN(r.bottomEnd) && r.bottomEnd.indexOf("%") > -1 ? parseFloat(r.bottomEnd) / 100 * S : r.bottomEnd, E = y - w + x + z
				},
				H = t.pageYOffset || o.documentElement.scrollTop,
				B = 0,
				I = void 0,
				q = function() {
					j = O(), h = N(), T = y + h - w - L, C = j > S;
					var e = t.pageYOffset || o.documentElement.scrollTop,
						i = l.offset(n).top,
						s = i - e,
						c = void 0;
					I = e < H ? "up" : "down", B = e - H, H = e, e > E ? T + w + (C ? k : 0) - (r.followScroll && C ? 0 : w) <= e + j - x - (j - x > S - (E - x) && r.followScroll && (c = j - S - x) > 0 ? c : 0) ? u.reset({
						position: "absolute",
						bottom: b + a.offsetHeight - T - w
					}) : C && r.followScroll ? "down" === I ? s + j + k <= S ? u.stick({
						bottom: k
					}) : "fixed" === u.position && u.reset({
						position: "absolute",
						top: i - w - E - B + x
					}) : s + x < 0 && "fixed" === u.position ? u.reset({
						position: "absolute",
						top: i - w - E + x - B
					}) : i >= e + w - x && u.stick({
						top: w - x
					}) : u.stick({
						top: w - x
					}) : u.reset({
						disable: !0
					})
				},
				A = !1,
				F = !1,
				M = function() {
					A && (l.event.unbind(t, "scroll", q), A = !1)
				},
				D = function() {
					R(), j >= h ? M() : (q(), A || (l.event.bind(t, "scroll", q), A = !0))
				},
				W = function() {
					n.style.position = "", n.style.left = "", n.style.top = "", n.style.bottom = "", n.style.width = "", n.classList ? n.classList.remove(r.stickyClass) : n.className = n.className.replace(new RegExp("(^|\\b)" + r.stickyClass.split(" ").join("|") + "(\\b|$)", "gi"), " "), u.css = {}, u.position = null, !0 === p.isAttached && p.detach()
				},
				P = function() {
					W(), d(), f() ? M() : D()
				},
				V = function() {
					r.onBeforeResize && r.onBeforeResize.call(n, r), P(), r.onResize && r.onResize.call(n, r)
				},
				Y = r.resizeDebounce ? l.debounce(V, r.resizeDebounce) : V,
				$ = function() {
					F && (l.event.unbind(t, "resize", Y), F = !1), M()
				},
				Q = function() {
					F || (l.event.bind(t, "resize", Y), F = !0), d(), f() ? M() : D()
				};
			this.options = function(t) {
				return t ? r.option || null : Object.assign({}, r)
			}, this.reinit = P, this.update = function(t) {
				c(t), P()
			}, this.attach = Q, this.detach = $, this.destroy = function() {
				$(), W()
			}, c(s), Q(), l.event.bind(t, "load", P)
		};
	if (void 0 !== t.jQuery) {
		var n = t.jQuery;
		n.fn.extend({
			hcSticky: function(t) {
				return this.length ? this.each(function() {
					var e = n.data(this, "hcSticky");
					e ? e.update(t) : (e = new i(this, t), n.data(this, "hcSticky", e))
				}) : this
			}
		})
	}
	return t.hcSticky = t.hcSticky || i, i
}), function(t) {
	"use strict";
	var e = t.hcSticky,
		o = t.document;
	"function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
		value: function(t, e) {
			if (null == t) throw new TypeError("Cannot convert undefined or null to object");
			for (var o = Object(t), i = 1; i < arguments.length; i++) {
				var n = arguments[i];
				if (null != n) for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (o[s] = n[s])
			}
			return o
		},
		writable: !0,
		configurable: !0
	});
	var i = function() {
			function e(e) {
				var o = t.event;
				return o.target = o.target || o.srcElement || e, o
			}
			var i = o.documentElement,
				n = function() {};
			i.addEventListener ? n = function(t, e, o) {
				t.addEventListener(e, o, !1)
			} : i.attachEvent && (n = function(t, o, i) {
				t[o + i] = i.handleEvent ?
				function() {
					var o = e(t);
					i.handleEvent.call(i, o)
				} : function() {
					var o = e(t);
					i.call(t, o)
				}, t.attachEvent("on" + o, t[o + i])
			});
			var s = function() {};
			return i.removeEventListener ? s = function(t, e, o) {
				t.removeEventListener(e, o, !1)
			} : i.detachEvent && (s = function(t, e, o) {
				t.detachEvent("on" + e, t[e + o]);
				try {
					delete t[e + o]
				} catch (i) {
					t[e + o] = void 0
				}
			}), {
				bind: n,
				unbind: s
			}
		}(),
		n = function(e, i) {
			return t.getComputedStyle ? i ? o.defaultView.getComputedStyle(e, null).getPropertyValue(i) : o.defaultView.getComputedStyle(e, null) : e.currentStyle ? i ? e.currentStyle[i.replace(/-\w/g, function(t) {
				return t.toUpperCase().replace("-", "")
			})] : e.currentStyle : void 0
		},
		s = function(e) {
			var i = e.getBoundingClientRect(),
				n = t.pageYOffset || o.documentElement.scrollTop,
				s = t.pageXOffset || o.documentElement.scrollLeft;
			return {
				top: i.top + n,
				left: i.left + s
			}
		};
	e.Helpers = {
		isEmptyObject: function(t) {
			for (var e in t) return !1;
			return !0
		},
		debounce: function(t, e, o) {
			var i = void 0;
			return function() {
				var n = this,
					s = arguments,
					r = o && !i;
				clearTimeout(i), i = setTimeout(function() {
					i = null, o || t.apply(n, s)
				}, e), r && t.apply(n, s)
			}
		},
		hasClass: function(t, e) {
			return t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className)
		},
		offset: s,
		position: function(t) {
			var e = t.offsetParent,
				o = s(e),
				i = s(t),
				r = n(e),
				l = n(t);
			return o.top += parseInt(r.borderTopWidth) || 0, o.left += parseInt(r.borderLeftWidth) || 0, {
				top: i.top - o.top - (parseInt(l.marginTop) || 0),
				left: i.left - o.left - (parseInt(l.marginLeft) || 0)
			}
		},
		getStyle: n,
		getCascadedStyle: function(e) {
			var i = e.cloneNode(!0);
			i.style.display = "none", e.parentNode.insertBefore(i, e.nextSibling);
			var n = void 0;
			i.currentStyle ? n = i.currentStyle : t.getComputedStyle && (n = o.defaultView.getComputedStyle(i, null));
			var s = {};
			for (var r in n)!isNaN(r) || "string" != typeof n[r] && "number" != typeof n[r] || (s[r] = n[r]);
			if (Object.keys(s).length < 3) {
				s = {};
				for (var l in n) isNaN(l) || (s[n[l].replace(/-\w/g, function(t) {
					return t.toUpperCase().replace("-", "")
				})] = n.getPropertyValue(n[l]))
			}
			if (s.margin || "auto" !== s.marginLeft ? s.margin || s.marginLeft !== s.marginRight || s.marginLeft !== s.marginTop || s.marginLeft !== s.marginBottom || (s.margin = s.marginLeft) : s.margin = "auto", !s.margin && "0px" === s.marginLeft && "0px" === s.marginRight) {
				var a = e.offsetLeft - e.parentNode.offsetLeft,
					c = a - (parseInt(s.left) || 0) - (parseInt(s.right) || 0),
					f = e.parentNode.offsetWidth - e.offsetWidth - a - (parseInt(s.right) || 0) + (parseInt(s.left) || 0) - c;
				0 !== f && 1 !== f || (s.margin = "auto")
			}
			return i.parentNode.removeChild(i), i = null, s
		},
		event: i
	}
}(window);