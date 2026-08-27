var R = "top", j = "bottom", D = "right", S = "left", kt = "auto", Q = [R, j, D, S], z = "start", st = "end", Te = "clippingParents", Vt = "viewport", ht = "popper", Ce = "reference", Jt = Q.reduce(function (t, e) { return t.concat([e + "-" + z, e + "-" + st]); }, []), Ht = [].concat(Q, [kt]).reduce(function (t, e) { return t.concat([e, e + "-" + z, e + "-" + st]); }, []), or = "beforeRead", nr = "read", ir = "afterRead", ar = "beforeMain", sr = "main", pr = "afterMain", fr = "beforeWrite", lr = "write", cr = "afterWrite", De = [or, nr, ir, ar, sr, pr, fr, lr, cr];
function M(t) { return t ? (t.nodeName || "").toLowerCase() : null; }
function b(t) { if (t == null)
    return window; if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
} return t; }
function H(t) { var e = b(t).Element; return t instanceof e || t instanceof Element; }
function T(t) { var e = b(t).HTMLElement; return t instanceof e || t instanceof HTMLElement; }
function xt(t) { if (typeof ShadowRoot > "u")
    return !1; var e = b(t).ShadowRoot; return t instanceof e || t instanceof ShadowRoot; }
function ur(t) { var e = t.state; Object.keys(e.elements).forEach(function (r) { var o = e.styles[r] || {}, n = e.attributes[r] || {}, i = e.elements[r]; !T(i) || !M(i) || (Object.assign(i.style, o), Object.keys(n).forEach(function (s) { var a = n[s]; a === !1 ? i.removeAttribute(s) : i.setAttribute(s, a === !0 ? "" : a); })); }); }
function mr(t) { var e = t.state, r = { popper: { position: e.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} }; return Object.assign(e.elements.popper.style, r.popper), e.styles = r, e.elements.arrow && Object.assign(e.elements.arrow.style, r.arrow), function () { Object.keys(e.elements).forEach(function (o) { var n = e.elements[o], i = e.attributes[o] || {}, s = Object.keys(e.styles.hasOwnProperty(o) ? e.styles[o] : r[o]), a = s.reduce(function (p, l) { return p[l] = "", p; }, {}); !T(n) || !M(n) || (Object.assign(n.style, a), Object.keys(i).forEach(function (p) { n.removeAttribute(p); })); }); }; }
var Me = { name: "applyStyles", enabled: !0, phase: "write", fn: ur, effect: mr, requires: ["computeStyles"] };
function L(t) { return t.split("-")[0]; }
var q = Math.max, pt = Math.min, Z = Math.round;
function wt() { var t = navigator.userAgentData; return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function (e) { return e.brand + "/" + e.version; }).join(" ") : navigator.userAgent; }
function Et() { return !/^((?!chrome|android).)*safari/i.test(wt()); }
function _(t, e, r) { e === void 0 && (e = !1), r === void 0 && (r = !1); var o = t.getBoundingClientRect(), n = 1, i = 1; e && T(t) && (n = t.offsetWidth > 0 && Z(o.width) / t.offsetWidth || 1, i = t.offsetHeight > 0 && Z(o.height) / t.offsetHeight || 1); var s = H(t) ? b(t) : window, a = s.visualViewport, p = !Et() && r, l = (o.left + (p && a ? a.offsetLeft : 0)) / n, f = (o.top + (p && a ? a.offsetTop : 0)) / i, v = o.width / n, u = o.height / i; return { width: v, height: u, top: f, right: l + v, bottom: f + u, left: l, x: l, y: f }; }
function ft(t) { var e = _(t), r = t.offsetWidth, o = t.offsetHeight; return Math.abs(e.width - r) <= 1 && (r = e.width), Math.abs(e.height - o) <= 1 && (o = e.height), { x: t.offsetLeft, y: t.offsetTop, width: r, height: o }; }
function Rt(t, e) { var r = e.getRootNode && e.getRootNode(); if (t.contains(e))
    return !0; if (r && xt(r)) {
    var o = e;
    do {
        if (o && t.isSameNode(o))
            return !0;
        o = o.parentNode || o.host;
    } while (o);
} return !1; }
function k(t) { return b(t).getComputedStyle(t); }
function Qt(t) { return ["table", "td", "th"].indexOf(M(t)) >= 0; }
function N(t) { return ((H(t) ? t.ownerDocument : t.document) || window.document).documentElement; }
function G(t) { return M(t) === "html" ? t : t.assignedSlot || t.parentNode || (xt(t) ? t.host : null) || N(t); }
function Le(t) { return !T(t) || k(t).position === "fixed" ? null : t.offsetParent; }
function dr(t) { var e = /firefox/i.test(wt()), r = /Trident/i.test(wt()); if (r && T(t)) {
    var o = k(t);
    if (o.position === "fixed")
        return null;
} var n = G(t); for (xt(n) && (n = n.host); T(n) && ["html", "body"].indexOf(M(n)) < 0;) {
    var i = k(n);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none")
        return n;
    n = n.parentNode;
} return null; }
function U(t) { for (var e = b(t), r = Le(t); r && Qt(r) && k(r).position === "static";)
    r = Le(r); return r && (M(r) === "html" || M(r) === "body" && k(r).position === "static") ? e : r || dr(t) || e; }
function lt(t) { return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y"; }
function ct(t, e, r) { return q(t, pt(e, r)); }
function Be(t, e, r) { var o = ct(t, e, r); return o > r ? r : o; }
function At() { return { top: 0, right: 0, bottom: 0, left: 0 }; }
function St(t) { return Object.assign({}, At(), t); }
function Tt(t, e) { return e.reduce(function (r, o) { return r[o] = t, r; }, {}); }
var vr = function (e, r) { return e = typeof e == "function" ? e(Object.assign({}, r.rects, { placement: r.placement })) : e, St(typeof e != "number" ? e : Tt(e, Q)); };
function gr(t) { var e, r = t.state, o = t.name, n = t.options, i = r.elements.arrow, s = r.modifiersData.popperOffsets, a = L(r.placement), p = lt(a), l = [S, D].indexOf(a) >= 0, f = l ? "height" : "width"; if (!(!i || !s)) {
    var v = vr(n.padding, r), u = ft(i), c = p === "y" ? R : S, h = p === "y" ? j : D, m = r.rects.reference[f] + r.rects.reference[p] - s[p] - r.rects.popper[f], d = s[p] - r.rects.reference[p], y = U(i), O = y ? p === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, E = m / 2 - d / 2, g = v[c], x = O - u[f] - v[h], w = O / 2 - u[f] / 2 + E, P = ct(g, w, x), B = p;
    r.modifiersData[o] = (e = {}, e[B] = P, e.centerOffset = P - w, e);
} }
function hr(t) { var e = t.state, r = t.options, o = r.element, n = o === void 0 ? "[data-popper-arrow]" : o; n != null && (typeof n == "string" && (n = e.elements.popper.querySelector(n), !n) || Rt(e.elements.popper, n) && (e.elements.arrow = n)); }
var te = { name: "arrow", enabled: !0, phase: "main", fn: gr, effect: hr, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
function F(t) { return t.split("-")[1]; }
var xr = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function wr(t, e) { var r = t.x, o = t.y, n = e.devicePixelRatio || 1; return { x: Z(r * n) / n || 0, y: Z(o * n) / n || 0 }; }
function je(t) { var e, r = t.popper, o = t.popperRect, n = t.placement, i = t.variation, s = t.offsets, a = t.position, p = t.gpuAcceleration, l = t.adaptive, f = t.roundOffsets, v = t.isFixed, u = s.x, c = u === void 0 ? 0 : u, h = s.y, m = h === void 0 ? 0 : h, d = typeof f == "function" ? f({ x: c, y: m }) : { x: c, y: m }; c = d.x, m = d.y; var y = s.hasOwnProperty("x"), O = s.hasOwnProperty("y"), E = S, g = R, x = window; if (l) {
    var w = U(r), P = "clientHeight", B = "clientWidth";
    if (w === b(r) && (w = N(r), k(w).position !== "static" && a === "absolute" && (P = "scrollHeight", B = "scrollWidth")), w = w, n === R || (n === S || n === D) && i === st) {
        g = j;
        var C = v && w === x && x.visualViewport ? x.visualViewport.height : w[P];
        m -= C - o.height, m *= p ? 1 : -1;
    }
    if (n === S || (n === R || n === j) && i === st) {
        E = D;
        var A = v && w === x && x.visualViewport ? x.visualViewport.width : w[B];
        c -= A - o.width, c *= p ? 1 : -1;
    }
} var W = Object.assign({ position: a }, l && xr), I = f === !0 ? wr({ x: c, y: m }, b(r)) : { x: c, y: m }; if (c = I.x, m = I.y, p) {
    var $;
    return Object.assign({}, W, ($ = {}, $[g] = O ? "0" : "", $[E] = y ? "0" : "", $.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + c + "px, " + m + "px)" : "translate3d(" + c + "px, " + m + "px, 0)", $));
} return Object.assign({}, W, (e = {}, e[g] = O ? m + "px" : "", e[E] = y ? c + "px" : "", e.transform = "", e)); }
function yr(t) { var e = t.state, r = t.options, o = r.gpuAcceleration, n = o === void 0 ? !0 : o, i = r.adaptive, s = i === void 0 ? !0 : i, a = r.roundOffsets, p = a === void 0 ? !0 : a, l = { placement: L(e.placement), variation: F(e.placement), popper: e.elements.popper, popperRect: e.rects.popper, gpuAcceleration: n, isFixed: e.options.strategy === "fixed" }; e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, je(Object.assign({}, l, { offsets: e.modifiersData.popperOffsets, position: e.options.strategy, adaptive: s, roundOffsets: p })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, je(Object.assign({}, l, { offsets: e.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: p })))), e.attributes.popper = Object.assign({}, e.attributes.popper, { "data-popper-placement": e.placement }); }
var Ne = { name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: yr, data: {} };
var _t = { passive: !0 };
function br(t) { var e = t.state, r = t.instance, o = t.options, n = o.scroll, i = n === void 0 ? !0 : n, s = o.resize, a = s === void 0 ? !0 : s, p = b(e.elements.popper), l = [].concat(e.scrollParents.reference, e.scrollParents.popper); return i && l.forEach(function (f) { f.addEventListener("scroll", r.update, _t); }), a && p.addEventListener("resize", r.update, _t), function () { i && l.forEach(function (f) { f.removeEventListener("scroll", r.update, _t); }), a && p.removeEventListener("resize", r.update, _t); }; }
var We = { name: "eventListeners", enabled: !0, phase: "write", fn: function () { }, effect: br, data: {} };
var Or = { left: "right", right: "left", bottom: "top", top: "bottom" };
function yt(t) { return t.replace(/left|right|bottom|top/g, function (e) { return Or[e]; }); }
var Pr = { start: "end", end: "start" };
function Ft(t) { return t.replace(/start|end/g, function (e) { return Pr[e]; }); }
function ut(t) { var e = b(t), r = e.pageXOffset, o = e.pageYOffset; return { scrollLeft: r, scrollTop: o }; }
function mt(t) { return _(N(t)).left + ut(t).scrollLeft; }
function ee(t, e) { var r = b(t), o = N(t), n = r.visualViewport, i = o.clientWidth, s = o.clientHeight, a = 0, p = 0; if (n) {
    i = n.width, s = n.height;
    var l = Et();
    (l || !l && e === "fixed") && (a = n.offsetLeft, p = n.offsetTop);
} return { width: i, height: s, x: a + mt(t), y: p }; }
function re(t) { var e, r = N(t), o = ut(t), n = (e = t.ownerDocument) == null ? void 0 : e.body, i = q(r.scrollWidth, r.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), s = q(r.scrollHeight, r.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), a = -o.scrollLeft + mt(t), p = -o.scrollTop; return k(n || r).direction === "rtl" && (a += q(r.clientWidth, n ? n.clientWidth : 0) - i), { width: i, height: s, x: a, y: p }; }
function dt(t) { var e = k(t), r = e.overflow, o = e.overflowX, n = e.overflowY; return /auto|scroll|overlay|hidden/.test(r + n + o); }
function It(t) { return ["html", "body", "#document"].indexOf(M(t)) >= 0 ? t.ownerDocument.body : T(t) && dt(t) ? t : It(G(t)); }
function tt(t, e) { var r; e === void 0 && (e = []); var o = It(t), n = o === ((r = t.ownerDocument) == null ? void 0 : r.body), i = b(o), s = n ? [i].concat(i.visualViewport || [], dt(o) ? o : []) : o, a = e.concat(s); return n ? a : a.concat(tt(G(s))); }
function bt(t) { return Object.assign({}, t, { left: t.x, top: t.y, right: t.x + t.width, bottom: t.y + t.height }); }
function Er(t, e) { var r = _(t, !1, e === "fixed"); return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r; }
function $e(t, e, r) { return e === Vt ? bt(ee(t, r)) : H(e) ? Er(e, r) : bt(re(N(t))); }
function Rr(t) { var e = tt(G(t)), r = ["absolute", "fixed"].indexOf(k(t).position) >= 0, o = r && T(t) ? U(t) : t; return H(o) ? e.filter(function (n) { return H(n) && Rt(n, o) && M(n) !== "body"; }) : []; }
function oe(t, e, r, o) { var n = e === "clippingParents" ? Rr(t) : [].concat(e), i = [].concat(n, [r]), s = i[0], a = i.reduce(function (p, l) { var f = $e(t, l, o); return p.top = q(f.top, p.top), p.right = pt(f.right, p.right), p.bottom = pt(f.bottom, p.bottom), p.left = q(f.left, p.left), p; }, $e(t, s, o)); return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a; }
function Ct(t) { var e = t.reference, r = t.element, o = t.placement, n = o ? L(o) : null, i = o ? F(o) : null, s = e.x + e.width / 2 - r.width / 2, a = e.y + e.height / 2 - r.height / 2, p; switch (n) {
    case R:
        p = { x: s, y: e.y - r.height };
        break;
    case j:
        p = { x: s, y: e.y + e.height };
        break;
    case D:
        p = { x: e.x + e.width, y: a };
        break;
    case S:
        p = { x: e.x - r.width, y: a };
        break;
    default: p = { x: e.x, y: e.y };
} var l = n ? lt(n) : null; if (l != null) {
    var f = l === "y" ? "height" : "width";
    switch (i) {
        case z:
            p[l] = p[l] - (e[f] / 2 - r[f] / 2);
            break;
        case st:
            p[l] = p[l] + (e[f] / 2 - r[f] / 2);
            break;
        default:
    }
} return p; }
function et(t, e) { e === void 0 && (e = {}); var r = e, o = r.placement, n = o === void 0 ? t.placement : o, i = r.strategy, s = i === void 0 ? t.strategy : i, a = r.boundary, p = a === void 0 ? Te : a, l = r.rootBoundary, f = l === void 0 ? Vt : l, v = r.elementContext, u = v === void 0 ? ht : v, c = r.altBoundary, h = c === void 0 ? !1 : c, m = r.padding, d = m === void 0 ? 0 : m, y = St(typeof d != "number" ? d : Tt(d, Q)), O = u === ht ? Ce : ht, E = t.rects.popper, g = t.elements[h ? O : u], x = oe(H(g) ? g : g.contextElement || N(t.elements.popper), p, f, s), w = _(t.elements.reference), P = Ct({ reference: w, element: E, strategy: "absolute", placement: n }), B = bt(Object.assign({}, E, P)), C = u === ht ? B : w, A = { top: x.top - C.top + y.top, bottom: C.bottom - x.bottom + y.bottom, left: x.left - C.left + y.left, right: C.right - x.right + y.right }, W = t.modifiersData.offset; if (u === ht && W) {
    var I = W[n];
    Object.keys(A).forEach(function ($) { var rt = [D, j].indexOf($) >= 0 ? 1 : -1, ot = [R, j].indexOf($) >= 0 ? "y" : "x"; A[$] += I[ot] * rt; });
} return A; }
function ne(t, e) { e === void 0 && (e = {}); var r = e, o = r.placement, n = r.boundary, i = r.rootBoundary, s = r.padding, a = r.flipVariations, p = r.allowedAutoPlacements, l = p === void 0 ? Ht : p, f = F(o), v = f ? a ? Jt : Jt.filter(function (h) { return F(h) === f; }) : Q, u = v.filter(function (h) { return l.indexOf(h) >= 0; }); u.length === 0 && (u = v); var c = u.reduce(function (h, m) { return h[m] = et(t, { placement: m, boundary: n, rootBoundary: i, padding: s })[L(m)], h; }, {}); return Object.keys(c).sort(function (h, m) { return c[h] - c[m]; }); }
function Ar(t) { if (L(t) === kt)
    return []; var e = yt(t); return [Ft(t), e, Ft(e)]; }
function Sr(t) { var e = t.state, r = t.options, o = t.name; if (!e.modifiersData[o]._skip) {
    for (var n = r.mainAxis, i = n === void 0 ? !0 : n, s = r.altAxis, a = s === void 0 ? !0 : s, p = r.fallbackPlacements, l = r.padding, f = r.boundary, v = r.rootBoundary, u = r.altBoundary, c = r.flipVariations, h = c === void 0 ? !0 : c, m = r.allowedAutoPlacements, d = e.options.placement, y = L(d), O = y === d, E = p || (O || !h ? [yt(d)] : Ar(d)), g = [d].concat(E).reduce(function (gt, J) { return gt.concat(L(J) === kt ? ne(e, { placement: J, boundary: f, rootBoundary: v, padding: l, flipVariations: h, allowedAutoPlacements: m }) : J); }, []), x = e.rects.reference, w = e.rects.popper, P = new Map, B = !0, C = g[0], A = 0; A < g.length; A++) {
        var W = g[A], I = L(W), $ = F(W) === z, rt = [R, j].indexOf(I) >= 0, ot = rt ? "width" : "height", V = et(e, { placement: W, boundary: f, rootBoundary: v, altBoundary: u, padding: l }), X = rt ? $ ? D : S : $ ? j : R;
        x[ot] > w[ot] && (X = yt(X));
        var Bt = yt(X), nt = [];
        if (i && nt.push(V[I] <= 0), a && nt.push(V[X] <= 0, V[Bt] <= 0), nt.every(function (gt) { return gt; })) {
            C = W, B = !1;
            break;
        }
        P.set(W, nt);
    }
    if (B)
        for (var jt = h ? 3 : 1, zt = function (J) { var Pt = g.find(function (Wt) { var it = P.get(Wt); if (it)
            return it.slice(0, J).every(function (Zt) { return Zt; }); }); if (Pt)
            return C = Pt, "break"; }, Ot = jt; Ot > 0; Ot--) {
            var Nt = zt(Ot);
            if (Nt === "break")
                break;
        }
    e.placement !== C && (e.modifiersData[o]._skip = !0, e.placement = C, e.reset = !0);
} }
var ie = { name: "flip", enabled: !0, phase: "main", fn: Sr, requiresIfExists: ["offset"], data: { _skip: !1 } };
function Tr(t, e, r) { var o = L(t), n = [S, R].indexOf(o) >= 0 ? -1 : 1, i = typeof r == "function" ? r(Object.assign({}, e, { placement: t })) : r, s = i[0], a = i[1]; return s = s || 0, a = (a || 0) * n, [S, D].indexOf(o) >= 0 ? { x: a, y: s } : { x: s, y: a }; }
function Cr(t) { var e = t.state, r = t.options, o = t.name, n = r.offset, i = n === void 0 ? [0, 0] : n, s = Ht.reduce(function (f, v) { return f[v] = Tr(v, e.rects, i), f; }, {}), a = s[e.placement], p = a.x, l = a.y; e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += p, e.modifiersData.popperOffsets.y += l), e.modifiersData[o] = s; }
var ae = { name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: Cr };
function Dr(t) { var e = t.state, r = t.name; e.modifiersData[r] = Ct({ reference: e.rects.reference, element: e.rects.popper, strategy: "absolute", placement: e.placement }); }
var ke = { name: "popperOffsets", enabled: !0, phase: "read", fn: Dr, data: {} };
function se(t) { return t === "x" ? "y" : "x"; }
function Mr(t) { var e = t.state, r = t.options, o = t.name, n = r.mainAxis, i = n === void 0 ? !0 : n, s = r.altAxis, a = s === void 0 ? !1 : s, p = r.boundary, l = r.rootBoundary, f = r.altBoundary, v = r.padding, u = r.tether, c = u === void 0 ? !0 : u, h = r.tetherOffset, m = h === void 0 ? 0 : h, d = et(e, { boundary: p, rootBoundary: l, padding: v, altBoundary: f }), y = L(e.placement), O = F(e.placement), E = !O, g = lt(y), x = se(g), w = e.modifiersData.popperOffsets, P = e.rects.reference, B = e.rects.popper, C = typeof m == "function" ? m(Object.assign({}, e.rects, { placement: e.placement })) : m, A = typeof C == "number" ? { mainAxis: C, altAxis: C } : Object.assign({ mainAxis: 0, altAxis: 0 }, C), W = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, I = { x: 0, y: 0 }; if (w) {
    if (i) {
        var $, rt = g === "y" ? R : S, ot = g === "y" ? j : D, V = g === "y" ? "height" : "width", X = w[g], Bt = X + d[rt], nt = X - d[ot], jt = c ? -B[V] / 2 : 0, zt = O === z ? P[V] : B[V], Ot = O === z ? -B[V] : -P[V], Nt = e.elements.arrow, gt = c && Nt ? ft(Nt) : { width: 0, height: 0 }, J = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : At(), Pt = J[rt], Wt = J[ot], it = ct(0, P[V], gt[V]), Zt = E ? P[V] / 2 - jt - it - Pt - A.mainAxis : zt - it - Pt - A.mainAxis, Ke = E ? -P[V] / 2 + jt + it + Wt + A.mainAxis : Ot + it + Wt + A.mainAxis, Gt = e.elements.arrow && U(e.elements.arrow), Je = Gt ? g === "y" ? Gt.clientTop || 0 : Gt.clientLeft || 0 : 0, we = ($ = W?.[g]) != null ? $ : 0, Qe = X + Zt - we - Je, tr = X + Ke - we, ye = ct(c ? pt(Bt, Qe) : Bt, X, c ? q(nt, tr) : nt);
        w[g] = ye, I[g] = ye - X;
    }
    if (a) {
        var be, er = g === "x" ? R : S, rr = g === "x" ? j : D, at = w[x], $t = x === "y" ? "height" : "width", Oe = at + d[er], Pe = at - d[rr], Kt = [R, S].indexOf(y) !== -1, Ee = (be = W?.[x]) != null ? be : 0, Re = Kt ? Oe : at - P[$t] - B[$t] - Ee + A.altAxis, Ae = Kt ? at + P[$t] + B[$t] - Ee - A.altAxis : Pe, Se = c && Kt ? Be(Re, at, Ae) : ct(c ? Re : Oe, at, c ? Ae : Pe);
        w[x] = Se, I[x] = Se - at;
    }
    e.modifiersData[o] = I;
} }
var pe = { name: "preventOverflow", enabled: !0, phase: "main", fn: Mr, requiresIfExists: ["offset"] };
function fe(t) { return { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }; }
function le(t) { return t === b(t) || !T(t) ? ut(t) : fe(t); }
function Lr(t) { var e = t.getBoundingClientRect(), r = Z(e.width) / t.offsetWidth || 1, o = Z(e.height) / t.offsetHeight || 1; return r !== 1 || o !== 1; }
function ce(t, e, r) { r === void 0 && (r = !1); var o = T(e), n = T(e) && Lr(e), i = N(e), s = _(t, n, r), a = { scrollLeft: 0, scrollTop: 0 }, p = { x: 0, y: 0 }; return (o || !o && !r) && ((M(e) !== "body" || dt(i)) && (a = le(e)), T(e) ? (p = _(e, !0), p.x += e.clientLeft, p.y += e.clientTop) : i && (p.x = mt(i))), { x: s.left + a.scrollLeft - p.x, y: s.top + a.scrollTop - p.y, width: s.width, height: s.height }; }
function Br(t) { var e = new Map, r = new Set, o = []; t.forEach(function (i) { e.set(i.name, i); }); function n(i) { r.add(i.name); var s = [].concat(i.requires || [], i.requiresIfExists || []); s.forEach(function (a) { if (!r.has(a)) {
    var p = e.get(a);
    p && n(p);
} }), o.push(i); } return t.forEach(function (i) { r.has(i.name) || n(i); }), o; }
function ue(t) { var e = Br(t); return De.reduce(function (r, o) { return r.concat(e.filter(function (n) { return n.phase === o; })); }, []); }
function me(t) { var e; return function () { return e || (e = new Promise(function (r) { Promise.resolve().then(function () { e = void 0, r(t()); }); })), e; }; }
function de(t) { var e = t.reduce(function (r, o) { var n = r[o.name]; return r[o.name] = n ? Object.assign({}, n, o, { options: Object.assign({}, n.options, o.options), data: Object.assign({}, n.data, o.data) }) : o, r; }, {}); return Object.keys(e).map(function (r) { return e[r]; }); }
var Ve = { placement: "bottom", modifiers: [], strategy: "absolute" };
function He() { for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r]; return !e.some(function (o) { return !(o && typeof o.getBoundingClientRect == "function"); }); }
function _e(t) { t === void 0 && (t = {}); var e = t, r = e.defaultModifiers, o = r === void 0 ? [] : r, n = e.defaultOptions, i = n === void 0 ? Ve : n; return function (a, p, l) { l === void 0 && (l = i); var f = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Ve, i), modifiersData: {}, elements: { reference: a, popper: p }, attributes: {}, styles: {} }, v = [], u = !1, c = { state: f, setOptions: function (y) { var O = typeof y == "function" ? y(f.options) : y; m(), f.options = Object.assign({}, i, f.options, O), f.scrollParents = { reference: H(a) ? tt(a) : a.contextElement ? tt(a.contextElement) : [], popper: tt(p) }; var E = ue(de([].concat(o, f.options.modifiers))); return f.orderedModifiers = E.filter(function (g) { return g.enabled; }), h(), c.update(); }, forceUpdate: function () { if (!u) {
        var y = f.elements, O = y.reference, E = y.popper;
        if (He(O, E)) {
            f.rects = { reference: ce(O, U(E), f.options.strategy === "fixed"), popper: ft(E) }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function (A) { return f.modifiersData[A.name] = Object.assign({}, A.data); });
            for (var g = 0; g < f.orderedModifiers.length; g++) {
                if (f.reset === !0) {
                    f.reset = !1, g = -1;
                    continue;
                }
                var x = f.orderedModifiers[g], w = x.fn, P = x.options, B = P === void 0 ? {} : P, C = x.name;
                typeof w == "function" && (f = w({ state: f, options: B, name: C, instance: c }) || f);
            }
        }
    } }, update: me(function () { return new Promise(function (d) { c.forceUpdate(), d(f); }); }), destroy: function () { m(), u = !0; } }; if (!He(a, p))
    return c; c.setOptions(l).then(function (d) { !u && l.onFirstUpdate && l.onFirstUpdate(d); }); function h() { f.orderedModifiers.forEach(function (d) { var y = d.name, O = d.options, E = O === void 0 ? {} : O, g = d.effect; if (typeof g == "function") {
    var x = g({ state: f, name: y, instance: c, options: E }), w = function () { };
    v.push(x || w);
} }); } function m() { v.forEach(function (d) { return d(); }), v = []; } return c; }; }
var jr = [We, ke, Ne, Me], ve = _e({ defaultModifiers: jr });
import * as Ut from "@angular/core";
import { inject as Y, DOCUMENT as Yt, ApplicationRef as Nr, Injector as Wr, ViewContainerRef as $r, NgZone as kr, afterNextRender as Vr, TemplateRef as Hr, InjectionToken as _r } from "@angular/core";
import { Observable as Fr, EMPTY as ge, of as ze, Subject as he, fromEvent as vt, timer as Ir, race as Ze } from "rxjs";
import { endWith as Xr, takeUntil as K, filter as qt, tap as Ge, map as Mt, withLatestFrom as xe, delay as qr, mergeMap as Ur } from "rxjs/operators";
var Yr = (() => { class t {
    constructor() { this._element = Y(Yt).documentElement; }
    isRTL() { return (this._element.getAttribute("dir") || "").toLowerCase() === "rtl"; }
    static { this.\u0275fac = function (o) { return new (o || t); }; }
    static { this.\u0275prov = Ut.\u0275\u0275defineService({ token: t, factory: t.\u0275fac }); }
} return t; })(), zr = /\s+/, Zr = /  +/gi, Gr = { top: ["top"], bottom: ["bottom"], start: ["left", "right"], left: ["left"], end: ["right", "left"], right: ["right"], "top-start": ["top-start", "top-end"], "top-left": ["top-start"], "top-end": ["top-end", "top-start"], "top-right": ["top-end"], "bottom-start": ["bottom-start", "bottom-end"], "bottom-left": ["bottom-start"], "bottom-end": ["bottom-end", "bottom-start"], "bottom-right": ["bottom-end"], "start-top": ["left-start", "right-start"], "left-top": ["left-start"], "start-bottom": ["left-end", "right-end"], "left-bottom": ["left-end"], "end-top": ["right-start", "left-start"], "right-top": ["right-start"], "end-bottom": ["right-end", "left-end"], "right-bottom": ["right-end"] };
function Kr(t, e) { let [r, o] = Gr[t]; return e && o || r; }
var Jr = /^left/, Qr = /^right/, to = /^start/, eo = /^end/;
function ro(t, e) { let [r, o] = e.split("-"), n = r.replace(Jr, "start").replace(Qr, "end"), i = [n]; if (o) {
    let s = o;
    (r === "left" || r === "right") && (s = s.replace(to, "top").replace(eo, "bottom")), i.push(`${n}-${s}`);
} return t && (i = i.map(s => `${t}-${s}`)), i.join(" "); }
function Fe({ placement: t, baseClass: e }, r) { let o = Array.isArray(t) ? t : t.split(zr), n = ["top", "bottom", "start", "end", "top-start", "top-end", "bottom-start", "bottom-end", "start-top", "start-bottom", "end-top", "end-bottom"], i = o.findIndex(l => l === "auto"); i >= 0 && n.forEach(function (l) { o.find(f => f.search("^" + l) !== -1) == null && o.splice(i++, 1, l); }); let s = o.map(l => Kr(l, r.isRTL())); return { placement: s.shift(), modifiers: [{ name: "bootstrapClasses", enabled: !!e, phase: "write", fn({ state: l }) { let f = new RegExp(e + "(-[a-z]+)*", "gi"), v = l.elements.popper, u = l.placement, c = v.className; c = c.replace(f, ""), c += ` ${ro(e, u)}`, c = c.trim().replace(Zr, " "), v.className = c; } }, ie, pe, te, { enabled: !0, name: "flip", options: { fallbackPlacements: s } }] }; }
function Ie(t) { return t; }
function gs() { let t = Y(Yr), e = null; return { createPopper(r) { if (!e) {
        let n = (r.updatePopperOptions || Ie)(Fe(r, t));
        e = ve(r.hostElement, r.targetElement, n);
    } }, update() { e && e.update(); }, setOptions(r) { if (e) {
        let n = (r.updatePopperOptions || Ie)(Fe(r, t));
        e.setOptions(n);
    } }, destroy() { e && (e.destroy(), e = null); } }; }
function oo(t) { return parseInt(`${t}`, 10); }
function hs(t) { return t != null ? `${t}` : ""; }
function xs(t, e, r = 0) { return Math.max(Math.min(t, e), r); }
function ws(t) { return typeof t == "string"; }
function no(t) { return !isNaN(oo(t)); }
function ys(t) { return typeof t == "number" && isFinite(t) && Math.floor(t) === t; }
function bs(t) { return t != null; }
function Os(t) { return t && t.then; }
function Ps(t) { return no(t) ? `0${t}`.slice(-2) : ""; }
function Es(t) { return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"); }
function io(t, e) { return !e || typeof t.closest > "u" ? null : t.closest(e); }
function ao(t) { return (t || document.body).getBoundingClientRect(); }
function so(t) { return e => new Fr(r => { let o = s => t.run(() => r.next(s)), n = s => t.run(() => r.error(s)), i = () => t.run(() => r.complete()); return e.subscribe({ next: o, error: n, complete: i }); }); }
function Rs(t) { return t.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function po(t = document) { let e = t?.activeElement; return e ? e.shadowRoot ? po(e.shadowRoot) : e : null; }
function fo(t) { let { transitionDelay: e, transitionDuration: r } = window.getComputedStyle(t), o = parseFloat(e), n = parseFloat(r); return (o + n) * 1e3; }
var lo = () => { }, co = { getTransitionTimerDelayMs: () => 5 }, Dt = new Map, Xe = (t, e, r, o) => { let n = o.context || {}, i = Dt.get(e); if (i)
    switch (o.runningTransition) {
        case "continue": return ge;
        case "stop": t.run(() => i.transition$.complete()), n = Object.assign(i.context, n), Dt.delete(e);
    } let s = r(e, o.animation, n) || lo; if (!o.animation || window.getComputedStyle(e).transitionProperty === "none")
    return t.run(() => s()), ze(void 0).pipe(so(t)); let a = new he, p = new he, l = a.pipe(Xr(!0)); Dt.set(e, { transition$: a, complete: () => { p.next(), p.complete(); }, context: n }); let f = fo(e); return t.runOutsideAngular(() => { let v = vt(e, "transitionend").pipe(K(l), qt(({ target: c }) => c === e)), u = Ir(f + co.getTransitionTimerDelayMs()).pipe(K(l)); Ze(u, v, p).pipe(K(l)).subscribe(() => { Dt.delete(e), t.run(() => { s(), a.next(), a.complete(); }); }); }), a.asObservable(); }, As = t => { Dt.get(t)?.complete(); };
function uo(t, e) { if (typeof navigator > "u")
    return "0px"; let { classList: r } = t, o = r.contains("show"); o || r.add("show"), t.style[e] = ""; let n = t.getBoundingClientRect()[e] + "px"; return o || r.remove("show"), n; }
var Ss = (t, e, r) => { let { direction: o, maxSize: n, dimension: i } = r, { classList: s } = t; function a() { s.add("collapse"), o === "show" ? s.add("show") : s.remove("show"); } if (!e) {
    a();
    return;
} return n || (n = uo(t, i), r.maxSize = n, t.style[i] = o !== "show" ? n : "0px", s.remove("collapse", "collapsing", "show"), ao(t), s.add("collapsing")), t.style[i] = o === "show" ? n : "0px", () => { a(), s.remove("collapsing"), t.style[i] = ""; }; }, Xt = (t, e) => e ? e.some(r => r.contains(t)) : !1, qe = (t, e) => !e || io(t, e) != null, mo = (() => { let t = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2, e = () => /Android/.test(navigator.userAgent); return typeof navigator < "u" ? !!navigator.userAgent && (t() || e()) : !1; })(), vo = t => mo ? () => setTimeout(() => t(), 100) : t;
function Ts(t, e, r, o, n, i, s, a) { r && t.runOutsideAngular(vo(() => { let p = u => { let c = u.target; return u.button === 2 || Xt(c, s) ? !1 : r === "inside" ? Xt(c, i) && qe(c, a) : r === "outside" ? !Xt(c, i) : qe(c, a) || !Xt(c, i); }, l = vt(e, "keydown").pipe(K(n), qt(u => u.key === "Escape"), Ge(u => u.preventDefault())), f = vt(e, "mousedown").pipe(Mt(p), K(n)), v = vt(e, "mouseup").pipe(xe(f), qt(([u, c]) => c), qr(0), K(n)); Ze([l.pipe(Mt(u => 0)), v.pipe(Mt(u => 1))]).subscribe(u => t.run(() => o(u))); })); }
var go = ["a[href]", "button:not([disabled])", 'input:not([disabled]):not([type="hidden"])', "select:not([disabled])", "textarea:not([disabled])", "[contenteditable]", '[tabindex]:not([tabindex="-1"])'].join(", ");
function ho(t) { let e = Array.from(t.querySelectorAll(go)).filter(r => r.tabIndex !== -1); return [e[0], e[e.length - 1]]; }
var Cs = (t, e, r, o = !1) => { t.runOutsideAngular(() => { let n = vt(e, "focusin").pipe(K(r), Mt(i => i.target)); vt(e, "keydown").pipe(K(r), qt(i => i.key === "Tab"), xe(n)).subscribe(([i, s]) => { let [a, p] = ho(e); (s === a || s === e) && i.shiftKey && (p.focus(), i.preventDefault()), s === p && !i.shiftKey && (a.focus(), i.preventDefault()); }), o && vt(e, "click").pipe(K(r), xe(n), Mt(i => i[1])).subscribe(i => i.focus()); }); };
function Ds(t) { return e => (e.modifiers.push(ae, { name: "offset", options: { offset: () => t } }), e); }
var Lt = class {
    constructor(e, r, o) { this.nodes = e, this.viewRef = r, this.componentRef = o; }
}, Ue = class {
    constructor(e) { this._componentType = e, this._windowRef = null, this._contentRef = null, this._document = Y(Yt), this._applicationRef = Y(Nr), this._injector = Y(Wr), this._viewContainerRef = Y($r), this._ngZone = Y(kr); }
    open(e, r, o = !1) { this._windowRef || (this._contentRef = this._getContentRef(e, r), this._windowRef = this._viewContainerRef.createComponent(this._componentType, { injector: this._injector, projectableNodes: this._contentRef.nodes })); let { nativeElement: n } = this._windowRef.location, i = new he; Vr({ mixedReadWrite: () => { i.next(), i.complete(); } }, { injector: this._injector }); let s = i.pipe(Ur(() => Xe(this._ngZone, n, ({ classList: a }) => a.add("show"), { animation: o, runningTransition: "continue" }))); return { windowRef: this._windowRef, transition$: s }; }
    close(e = !1) { return this._windowRef ? Xe(this._ngZone, this._windowRef.location.nativeElement, ({ classList: r }) => r.remove("show"), { animation: e, runningTransition: "stop" }).pipe(Ge(() => { this._windowRef?.destroy(), this._contentRef?.viewRef?.destroy(), this._windowRef = null, this._contentRef = null; })) : ze(void 0); }
    _getContentRef(e, r) { if (e)
        if (e instanceof Hr) {
            let o = e.createEmbeddedView(r);
            return this._applicationRef.attachView(o), new Lt([o.rootNodes], o);
        }
        else
            return new Lt([[this._document.createTextNode(`${e}`)]]);
    else
        return new Lt([]); }
}, Ms = (() => { class t {
    constructor() { this._document = Y(Yt); }
    hide() { let r = Math.abs(window.innerWidth - this._document.documentElement.clientWidth), o = this._document.body, n = o.style, { overflow: i, paddingRight: s } = n; if (r > 0) {
        let a = parseFloat(window.getComputedStyle(o).paddingRight);
        n.paddingRight = `${a + r}px`;
    } return n.overflow = "hidden", () => { r > 0 && (n.paddingRight = s), n.overflow = i; }; }
    static { this.\u0275fac = function (o) { return new (o || t); }; }
    static { this.\u0275prov = Ut.\u0275\u0275defineService({ token: t, factory: t.\u0275fac }); }
} return t; })(), xo = { hover: ["mouseenter", "mouseleave"], focus: ["focusin", "focusout"] };
function wo(t) { let e = (t || "").trim(); if (e.length === 0)
    return []; let r = e.split(/\s+/).map(n => n.split(":")).map(n => xo[n[0]] || n), o = r.filter(n => n.includes("manual")); if (o.length > 1)
    throw "Triggers parse error: only one manual trigger is allowed"; if (o.length === 1 && r.length > 1)
    throw "Triggers parse error: manual trigger can't be mixed with other triggers"; return o.length ? [] : r; }
function Ls(t, e, r, o, n, i = 0, s = 0, a = ge, p = ge) { let l = wo(e); if (l.length === 0)
    return () => { }; let f = new Set, v = [], u; function c(m, d) { t.addEventListener(m, d), v.push(() => t.removeEventListener(m, d)); } function h(m, d) { clearTimeout(u), d > 0 ? u = setTimeout(m, d) : m(); } for (let [m, d] of l)
    if (d ? (c(m, () => { f.add(m), h(() => f.size > 0 && o(), i); }), c(d, () => { f.delete(m), h(() => f.size === 0 && n(), s); })) : c(m, () => r() ? h(n, s) : h(o, i)), m === "mouseenter" && d === "mouseleave" && s > 0) {
        let y = a.subscribe(() => { f.delete(m), clearTimeout(u); }), O = p.subscribe(() => { f.delete(m), h(() => f.size === 0 && n(), s); });
        v.push(() => y.unsubscribe(), () => O.unsubscribe());
    } return v.push(() => clearTimeout(u)), () => v.forEach(m => m()); }
var yo = new _r("live announcer delay", { providedIn: "root", factory: () => 100 });
function Ye(t, e = !1) { let r = t.body.querySelector("#ngb-live"); return r == null && e && (r = t.createElement("div"), r.setAttribute("id", "ngb-live"), r.setAttribute("aria-live", "polite"), r.setAttribute("aria-atomic", "true"), r.classList.add("visually-hidden"), t.body.appendChild(r)), r; }
var Bs = (() => { class t {
    constructor() { this._document = Y(Yt), this._delay = Y(yo); }
    ngOnDestroy() { let r = Ye(this._document); r && r.parentElement.removeChild(r); }
    say(r) { let o = Ye(this._document, !0), n = this._delay; if (o != null) {
        o.textContent = "";
        let i = () => o.textContent = r;
        n === null ? i() : setTimeout(i, n);
    } }
    static { this.\u0275fac = function (o) { return new (o || t); }; }
    static { this.\u0275prov = Ut.\u0275\u0275defineService({ token: t, factory: t.\u0275fac }); }
} return t; })();
export { gs as a, oo as b, hs as c, xs as d, ws as e, no as f, ys as g, bs as h, Os as i, Ps as j, Es as k, ao as l, Rs as m, po as n, Xe as o, As as p, Ss as q, Ts as r, go as s, ho as t, Cs as u, Ds as v, Lt as w, Ue as x, Ms as y, Ls as z, Bs as A };
