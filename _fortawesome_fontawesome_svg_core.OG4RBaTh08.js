import "@nf-internal/chunk-PZNONLPT";
function xa(a, n) { (n == null || n > a.length) && (n = a.length); for (var t = 0, e = Array(n); t < n; t++)
    e[t] = a[t]; return e; }
function _t(a) { if (Array.isArray(a))
    return a; }
function $t(a) { if (Array.isArray(a))
    return xa(a); }
function Mt(a, n) { if (!(a instanceof n))
    throw new TypeError("Cannot call a class as a function"); }
function Va(a, n) { for (var t = 0; t < n.length; t++) {
    var e = n[t];
    e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(a, Pn(e.key), e);
} }
function Dt(a, n, t) { return n && Va(a.prototype, n), t && Va(a, t), Object.defineProperty(a, "prototype", { writable: !1 }), a; }
function ta(a, n) {
    var t = typeof Symbol < "u" && a[Symbol.iterator] || a["@@iterator"];
    if (!t) {
        if (Array.isArray(a) || (t = _a(a)) || n && a && typeof a.length == "number") {
            t && (a = t);
            var e = 0, r = function () { };
            return { s: r, n: function () { return e >= a.length ? { done: !0 } : { done: !1, value: a[e++] }; }, e: function (f) { throw f; }, f: r };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var o, i = !0, s = !1;
    return { s: function () { t = t.call(a); }, n: function () { var f = t.next(); return i = f.done, f; }, e: function (f) { s = !0, o = f; }, f: function () { try {
            i || t.return == null || t.return();
        }
        finally {
            if (s)
                throw o;
        } } };
}
function g(a, n, t) { return (n = Pn(n)) in a ? Object.defineProperty(a, n, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : a[n] = t, a; }
function Lt(a) { if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null)
    return Array.from(a); }
function Rt(a, n) { var t = a == null ? null : typeof Symbol < "u" && a[Symbol.iterator] || a["@@iterator"]; if (t != null) {
    var e, r, o, i, s = [], f = !0, u = !1;
    try {
        if (o = (t = t.call(a)).next, n === 0) {
            if (Object(t) !== t)
                return;
            f = !1;
        }
        else
            for (; !(f = (e = o.call(t)).done) && (s.push(e.value), s.length !== n); f = !0)
                ;
    }
    catch (d) {
        u = !0, r = d;
    }
    finally {
        try {
            if (!f && t.return != null && (i = t.return(), Object(i) !== i))
                return;
        }
        finally {
            if (u)
                throw r;
        }
    }
    return s;
} }
function Wt() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ut() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ba(a, n) { var t = Object.keys(a); if (Object.getOwnPropertySymbols) {
    var e = Object.getOwnPropertySymbols(a);
    n && (e = e.filter(function (r) { return Object.getOwnPropertyDescriptor(a, r).enumerable; })), t.push.apply(t, e);
} return t; }
function l(a) { for (var n = 1; n < arguments.length; n++) {
    var t = arguments[n] != null ? arguments[n] : {};
    n % 2 ? Ba(Object(t), !0).forEach(function (e) { g(a, e, t[e]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : Ba(Object(t)).forEach(function (e) { Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(t, e)); });
} return a; }
function fa(a, n) { return _t(a) || Rt(a, n) || _a(a, n) || Wt(); }
function z(a) { return $t(a) || Lt(a) || _a(a) || Ut(); }
function Yt(a, n) { if (typeof a != "object" || !a)
    return a; var t = a[Symbol.toPrimitive]; if (t !== void 0) {
    var e = t.call(a, n || "default");
    if (typeof e != "object")
        return e;
    throw new TypeError("@@toPrimitive must return a primitive value.");
} return (n === "string" ? String : Number)(a); }
function Pn(a) { var n = Yt(a, "string"); return typeof n == "symbol" ? n : n + ""; }
function ia(a) {
    "@babel/helpers - typeof";
    return ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (n) { return typeof n; } : function (n) { return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n; }, ia(a);
}
function _a(a, n) { if (a) {
    if (typeof a == "string")
        return xa(a, n);
    var t = {}.toString.call(a).slice(8, -1);
    return t === "Object" && a.constructor && (t = a.constructor.name), t === "Map" || t === "Set" ? Array.from(a) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? xa(a, n) : void 0;
} }
var qa = function () { }, $a = {}, zn = {}, En = null, Fn = { mark: qa, measure: qa };
try {
    typeof window < "u" && ($a = window), typeof document < "u" && (zn = document), typeof MutationObserver < "u" && (En = MutationObserver), typeof performance < "u" && (Fn = performance);
}
catch { }
var Xt = $a.navigator || {}, Ja = Xt.userAgent, Ka = Ja === void 0 ? "" : Ja, T = $a, b = zn, Qa = En, Q = Fn, mo = !!T.document, C = !!b.documentElement && !!b.head && typeof b.addEventListener == "function" && typeof b.createElement == "function", On = ~Ka.indexOf("MSIE") || ~Ka.indexOf("Trident/"), Z, Ht = /fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|gt|jr|jfr|jdr|usb|ufsb|udsb|cr|ss|sr|sl|st|sds|sdr|sdl|sdt|sldr|slpdr|pr|ms|vs)?[\-\ ]/, Gt = /Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Graphite|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Utility|Utility Fill|Utility Duo|Slab Press|Slab|Slab Duo|Slab Press Duo|Pixel|Mosaic|Vellum|Whiteboard)?.*/i, jn = { classic: { fa: "solid", fas: "solid", "fa-solid": "solid", far: "regular", "fa-regular": "regular", fal: "light", "fa-light": "light", fat: "thin", "fa-thin": "thin", fab: "brands", "fa-brands": "brands" }, duotone: { fa: "solid", fad: "solid", "fa-solid": "solid", "fa-duotone": "solid", fadr: "regular", "fa-regular": "regular", fadl: "light", "fa-light": "light", fadt: "thin", "fa-thin": "thin" }, sharp: { fa: "solid", fass: "solid", "fa-solid": "solid", fasr: "regular", "fa-regular": "regular", fasl: "light", "fa-light": "light", fast: "thin", "fa-thin": "thin" }, "sharp-duotone": { fa: "solid", fasds: "solid", "fa-solid": "solid", fasdr: "regular", "fa-regular": "regular", fasdl: "light", "fa-light": "light", fasdt: "thin", "fa-thin": "thin" }, slab: { "fa-regular": "regular", faslr: "regular" }, "slab-press": { "fa-regular": "regular", faslpr: "regular" }, "slab-duo": { "fa-regular": "regular", fasldr: "regular" }, "slab-press-duo": { "fa-regular": "regular", faslpdr: "regular" }, thumbprint: { "fa-light": "light", fatl: "light" }, vellum: { "fa-solid": "solid", favs: "solid" }, pixel: { "fa-regular": "regular", fapr: "regular" }, mosaic: { "fa-solid": "solid", fams: "solid" }, whiteboard: { "fa-semibold": "semibold", fawsb: "semibold" }, notdog: { "fa-solid": "solid", fans: "solid" }, "notdog-duo": { "fa-solid": "solid", fands: "solid" }, etch: { "fa-solid": "solid", faes: "solid" }, graphite: { "fa-thin": "thin", fagt: "thin" }, jelly: { "fa-regular": "regular", fajr: "regular" }, "jelly-fill": { "fa-regular": "regular", fajfr: "regular" }, "jelly-duo": { "fa-regular": "regular", fajdr: "regular" }, chisel: { "fa-regular": "regular", facr: "regular" }, utility: { "fa-semibold": "semibold", fausb: "semibold" }, "utility-duo": { "fa-semibold": "semibold", faudsb: "semibold" }, "utility-fill": { "fa-semibold": "semibold", faufsb: "semibold" } }, Vt = { GROUP: "duotone-group", SWAP_OPACITY: "swap-opacity", PRIMARY: "primary", SECONDARY: "secondary" }, Cn = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone", "fa-thumbprint", "fa-whiteboard", "fa-notdog", "fa-notdog-duo", "fa-chisel", "fa-etch", "fa-graphite", "fa-jelly", "fa-jelly-fill", "fa-jelly-duo", "fa-slab", "fa-slab-press", "fa-slab-press-duo", "fa-slab-duo", "fa-mosaic", "fa-pixel", "fa-vellum", "fa-utility", "fa-utility-duo", "fa-utility-fill"], w = "classic", q = "duotone", Nn = "sharp", Tn = "sharp-duotone", _n = "chisel", $n = "etch", Mn = "graphite", Dn = "jelly", Ln = "jelly-duo", Rn = "jelly-fill", Wn = "mosaic", Un = "notdog", Yn = "notdog-duo", Xn = "pixel", Hn = "slab", Gn = "slab-duo", Vn = "slab-press", Bn = "slab-press-duo", qn = "thumbprint", Jn = "utility", Kn = "utility-duo", Qn = "utility-fill", Zn = "vellum", at = "whiteboard", Bt = "Classic", qt = "Duotone", Jt = "Sharp", Kt = "Sharp Duotone", Qt = "Chisel", Zt = "Etch", ae = "Graphite", ne = "Jelly", te = "Jelly Duo", ee = "Jelly Fill", re = "Mosaic", ie = "Notdog", oe = "Notdog Duo", se = "Pixel", fe = "Slab", le = "Slab Duo", ue = "Slab Press", ce = "Slab Press Duo", me = "Thumbprint", de = "Utility", ge = "Utility Duo", ve = "Utility Fill", pe = "Vellum", be = "Whiteboard", nt = [w, q, Nn, Tn, _n, $n, Mn, Dn, Ln, Rn, Wn, Un, Yn, Xn, Hn, Gn, Vn, Bn, qn, Jn, Kn, Qn, Zn, at], go = (Z = {}, g(g(g(g(g(g(g(g(g(g(Z, w, Bt), q, qt), Nn, Jt), Tn, Kt), _n, Qt), $n, Zt), Mn, ae), Dn, ne), Ln, te), Rn, ee), g(g(g(g(g(g(g(g(g(g(Z, Wn, re), Un, ie), Yn, oe), Xn, se), Hn, fe), Gn, le), Vn, ue), Bn, ce), qn, me), Jn, de), g(g(g(g(Z, Kn, ge), Qn, ve), Zn, pe), at, be)), he = { classic: { 900: "fas", 400: "far", normal: "far", 300: "fal", 100: "fat" }, duotone: { 900: "fad", 400: "fadr", 300: "fadl", 100: "fadt" }, sharp: { 900: "fass", 400: "fasr", 300: "fasl", 100: "fast" }, "sharp-duotone": { 900: "fasds", 400: "fasdr", 300: "fasdl", 100: "fasdt" }, slab: { 400: "faslr" }, "slab-press": { 400: "faslpr" }, "slab-duo": { 400: "fasldr" }, "slab-press-duo": { 400: "faslpdr" }, vellum: { 900: "favs" }, mosaic: { 900: "fams" }, pixel: { 400: "fapr" }, whiteboard: { 600: "fawsb" }, thumbprint: { 300: "fatl" }, notdog: { 900: "fans" }, "notdog-duo": { 900: "fands" }, etch: { 900: "faes" }, graphite: { 100: "fagt" }, chisel: { 400: "facr" }, jelly: { 400: "fajr" }, "jelly-fill": { 400: "fajfr" }, "jelly-duo": { 400: "fajdr" }, utility: { 600: "fausb" }, "utility-duo": { 600: "faudsb" }, "utility-fill": { 600: "faufsb" } }, ye = { "Font Awesome 7 Free": { 900: "fas", 400: "far" }, "Font Awesome 7 Pro": { 900: "fas", 400: "far", normal: "far", 300: "fal", 100: "fat" }, "Font Awesome 7 Brands": { 400: "fab", normal: "fab" }, "Font Awesome 7 Duotone": { 900: "fad", 400: "fadr", normal: "fadr", 300: "fadl", 100: "fadt" }, "Font Awesome 7 Sharp": { 900: "fass", 400: "fasr", normal: "fasr", 300: "fasl", 100: "fast" }, "Font Awesome 7 Sharp Duotone": { 900: "fasds", 400: "fasdr", normal: "fasdr", 300: "fasdl", 100: "fasdt" }, "Font Awesome 7 Jelly": { 400: "fajr", normal: "fajr" }, "Font Awesome 7 Jelly Fill": { 400: "fajfr", normal: "fajfr" }, "Font Awesome 7 Jelly Duo": { 400: "fajdr", normal: "fajdr" }, "Font Awesome 7 Slab": { 400: "faslr", normal: "faslr" }, "Font Awesome 7 Slab Press": { 400: "faslpr", normal: "faslpr" }, "Font Awesome 7 Slab Duo": { 400: "fasldr", normal: "fasldr" }, "Font Awesome 7 Slab Press Duo": { 400: "faslpdr", normal: "faslpdr" }, "Font Awesome 7 Pixel": { 400: "fapr", normal: "fapr" }, "Font Awesome 7 Mosaic": { 900: "fams", normal: "fams" }, "Font Awesome 7 Vellum": { 900: "favs", normal: "favs" }, "Font Awesome 7 Thumbprint": { 300: "fatl", normal: "fatl" }, "Font Awesome 7 Notdog": { 900: "fans", normal: "fans" }, "Font Awesome 7 Notdog Duo": { 900: "fands", normal: "fands" }, "Font Awesome 7 Etch": { 900: "faes", normal: "faes" }, "Font Awesome 7 Graphite": { 100: "fagt", normal: "fagt" }, "Font Awesome 7 Chisel": { 400: "facr", normal: "facr" }, "Font Awesome 7 Whiteboard": { 600: "fawsb", normal: "fawsb" }, "Font Awesome 7 Utility": { 600: "fausb", normal: "fausb" }, "Font Awesome 7 Utility Duo": { 600: "faudsb", normal: "faudsb" }, "Font Awesome 7 Utility Fill": { 600: "faufsb", normal: "faufsb" } }, xe = new Map([["classic", { defaultShortPrefixId: "fas", defaultStyleId: "solid", styleIds: ["solid", "regular", "light", "thin", "brands"], futureStyleIds: [], defaultFontWeight: 900 }], ["duotone", { defaultShortPrefixId: "fad", defaultStyleId: "solid", styleIds: ["solid", "regular", "light", "thin"], futureStyleIds: [], defaultFontWeight: 900 }], ["sharp", { defaultShortPrefixId: "fass", defaultStyleId: "solid", styleIds: ["solid", "regular", "light", "thin"], futureStyleIds: [], defaultFontWeight: 900 }], ["sharp-duotone", { defaultShortPrefixId: "fasds", defaultStyleId: "solid", styleIds: ["solid", "regular", "light", "thin"], futureStyleIds: [], defaultFontWeight: 900 }], ["chisel", { defaultShortPrefixId: "facr", defaultStyleId: "regular", styleIds: ["regular"], futureStyleIds: [], defaultFontWeight: 400 }], ["etch", { defaultShortPrefixId: "faes", defaultStyleId: "solid", styleIds: ["solid"], futureStyleIds: [], defaultFontWeight: 900 }], ["graphite", { defaultShortPrefixId: "fagt", defaultStyleId: "thin", styleIds: ["thin"], futureStyleIds: [], defaultFontWeight: 100 }], ["jelly", { defaultShortPrefixId: "fajr", defaultStyleId: "regular", styleIds: ["regular"], futureStyleIds: [], defaultFontWeight: 400 }], ["jelly-duo", { defaultShortPrefixId: "fajdr", defaultStyleId: "regular", styleIds: ["regular"], futureStyleIds: [], defaultFontWeight: 400 }], ["jelly-fill", { defaultShortPrefixId: "fajfr", defaultStyleId: "regular", styleIds: ["regular"], futureStyleIds: [], defaultFontWeight: 400 }], ["mosaic", { defaultShortPrefixId: "fams", defaultStyleId: "solid", styleIds: ["solid"], futureStyleIds: [], defaultFontWeight: 900 }], ["notdog", { defaultShortPrefixId: "fans", defaultStyleId: "solid", styleIds: ["solid"], futureStyleIds: [], defaultFontWeight: 900 }], ["notdog-duo", { defaultShortPrefixId: "fands", defaultStyleId: "solid", styleIds: ["solid"], futureStyleIds: [], defaultFontWeight: 900 }], ["pixel", { defaultShortPrefixId: "fapr", defaultStyleId: "regular", styleIds: ["regular"], futureStyleIds: [], defaultFontWeight: 400 }], ["slab", { defaultShortPrefixId: "faslr", defaultStyleId: "regular", styleIds: ["regular"], futureStyleIds: [], defaultFontWeight: 400 }], ["slab-duo", { defaultShortPrefixId: "fasldr", defaultStyleId: "regular", styleIds: ["regular"], futureStyleIds: [], defaultFontWeight: 400 }], ["slab-press", { defaultShortPrefixId: "faslpr", defaultStyleId: "regular", styleIds: ["regular"], futureStyleIds: [], defaultFontWeight: 400 }], ["slab-press-duo", { defaultShortPrefixId: "faslpdr", defaultStyleId: "regular", styleIds: ["regular"], futureStyleIds: [], defaultFontWeight: 400 }], ["thumbprint", { defaultShortPrefixId: "fatl", defaultStyleId: "light", styleIds: ["light"], futureStyleIds: [], defaultFontWeight: 300 }], ["utility", { defaultShortPrefixId: "fausb", defaultStyleId: "semibold", styleIds: ["semibold"], futureStyleIds: [], defaultFontWeight: 600 }], ["utility-duo", { defaultShortPrefixId: "faudsb", defaultStyleId: "semibold", styleIds: ["semibold"], futureStyleIds: [], defaultFontWeight: 600 }], ["utility-fill", { defaultShortPrefixId: "faufsb", defaultStyleId: "semibold", styleIds: ["semibold"], futureStyleIds: [], defaultFontWeight: 600 }], ["vellum", { defaultShortPrefixId: "favs", defaultStyleId: "solid", styleIds: ["solid"], futureStyleIds: [], defaultFontWeight: 900 }], ["whiteboard", { defaultShortPrefixId: "fawsb", defaultStyleId: "semibold", styleIds: ["semibold"], futureStyleIds: [], defaultFontWeight: 600 }]]), we = { chisel: { regular: "facr" }, classic: { brands: "fab", light: "fal", regular: "far", solid: "fas", thin: "fat" }, duotone: { light: "fadl", regular: "fadr", solid: "fad", thin: "fadt" }, etch: { solid: "faes" }, graphite: { thin: "fagt" }, jelly: { regular: "fajr" }, "jelly-duo": { regular: "fajdr" }, "jelly-fill": { regular: "fajfr" }, mosaic: { solid: "fams" }, notdog: { solid: "fans" }, "notdog-duo": { solid: "fands" }, pixel: { regular: "fapr" }, sharp: { light: "fasl", regular: "fasr", solid: "fass", thin: "fast" }, "sharp-duotone": { light: "fasdl", regular: "fasdr", solid: "fasds", thin: "fasdt" }, slab: { regular: "faslr" }, "slab-duo": { regular: "fasldr" }, "slab-press": { regular: "faslpr" }, "slab-press-duo": { regular: "faslpdr" }, thumbprint: { light: "fatl" }, utility: { semibold: "fausb" }, "utility-duo": { semibold: "faudsb" }, "utility-fill": { semibold: "faufsb" }, vellum: { solid: "favs" }, whiteboard: { semibold: "fawsb" } }, tt = ["fak", "fa-kit", "fakd", "fa-kit-duotone"], Za = { kit: { fak: "kit", "fa-kit": "kit" }, "kit-duotone": { fakd: "kit-duotone", "fa-kit-duotone": "kit-duotone" } }, Se = ["kit"], Ae = "kit", ke = "kit-duotone", Ie = "Kit", Pe = "Kit Duotone", vo = g(g({}, Ae, Ie), ke, Pe), ze = { kit: { "fa-kit": "fak" }, "kit-duotone": { "fa-kit-duotone": "fakd" } }, Ee = { "Font Awesome Kit": { 400: "fak", normal: "fak" }, "Font Awesome Kit Duotone": { 400: "fakd", normal: "fakd" } }, Fe = { kit: { fak: "fa-kit" }, "kit-duotone": { fakd: "fa-kit-duotone" } }, an = { kit: { kit: "fak" }, "kit-duotone": { "kit-duotone": "fakd" } }, aa, na = { GROUP: "duotone-group", SWAP_OPACITY: "swap-opacity", PRIMARY: "primary", SECONDARY: "secondary" }, Oe = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone", "fa-thumbprint", "fa-whiteboard", "fa-notdog", "fa-notdog-duo", "fa-chisel", "fa-etch", "fa-graphite", "fa-jelly", "fa-jelly-fill", "fa-jelly-duo", "fa-slab", "fa-slab-press", "fa-slab-press-duo", "fa-slab-duo", "fa-mosaic", "fa-pixel", "fa-vellum", "fa-utility", "fa-utility-duo", "fa-utility-fill"], je = "classic", Ce = "duotone", Ne = "sharp", Te = "sharp-duotone", _e = "chisel", $e = "etch", Me = "graphite", De = "jelly", Le = "jelly-duo", Re = "jelly-fill", We = "mosaic", Ue = "notdog", Ye = "notdog-duo", Xe = "pixel", He = "slab", Ge = "slab-duo", Ve = "slab-press", Be = "slab-press-duo", qe = "thumbprint", Je = "utility", Ke = "utility-duo", Qe = "utility-fill", Ze = "vellum", ar = "whiteboard", nr = "Classic", tr = "Duotone", er = "Sharp", rr = "Sharp Duotone", ir = "Chisel", or = "Etch", sr = "Graphite", fr = "Jelly", lr = "Jelly Duo", ur = "Jelly Fill", cr = "Mosaic", mr = "Notdog", dr = "Notdog Duo", gr = "Pixel", vr = "Slab", pr = "Slab Duo", br = "Slab Press", hr = "Slab Press Duo", yr = "Thumbprint", xr = "Utility", wr = "Utility Duo", Sr = "Utility Fill", Ar = "Vellum", kr = "Whiteboard", po = (aa = {}, g(g(g(g(g(g(g(g(g(g(aa, je, nr), Ce, tr), Ne, er), Te, rr), _e, ir), $e, or), Me, sr), De, fr), Le, lr), Re, ur), g(g(g(g(g(g(g(g(g(g(aa, We, cr), Ue, mr), Ye, dr), Xe, gr), He, vr), Ge, pr), Ve, br), Be, hr), qe, yr), Je, xr), g(g(g(g(aa, Ke, wr), Qe, Sr), Ze, Ar), ar, kr)), Ir = "kit", Pr = "kit-duotone", zr = "Kit", Er = "Kit Duotone", bo = g(g({}, Ir, zr), Pr, Er), Fr = { classic: { "fa-brands": "fab", "fa-duotone": "fad", "fa-light": "fal", "fa-regular": "far", "fa-solid": "fas", "fa-thin": "fat" }, duotone: { "fa-regular": "fadr", "fa-light": "fadl", "fa-thin": "fadt" }, sharp: { "fa-solid": "fass", "fa-regular": "fasr", "fa-light": "fasl", "fa-thin": "fast" }, "sharp-duotone": { "fa-solid": "fasds", "fa-regular": "fasdr", "fa-light": "fasdl", "fa-thin": "fasdt" }, slab: { "fa-regular": "faslr" }, "slab-press": { "fa-regular": "faslpr" }, "slab-duo": { "fa-regular": "fasldr" }, "slab-press-duo": { "fa-regular": "faslpdr" }, pixel: { "fa-regular": "fapr" }, mosaic: { "fa-solid": "fams" }, vellum: { "fa-solid": "favs" }, whiteboard: { "fa-semibold": "fawsb" }, thumbprint: { "fa-light": "fatl" }, notdog: { "fa-solid": "fans" }, "notdog-duo": { "fa-solid": "fands" }, etch: { "fa-solid": "faes" }, graphite: { "fa-thin": "fagt" }, jelly: { "fa-regular": "fajr" }, "jelly-fill": { "fa-regular": "fajfr" }, "jelly-duo": { "fa-regular": "fajdr" }, chisel: { "fa-regular": "facr" }, utility: { "fa-semibold": "fausb" }, "utility-duo": { "fa-semibold": "faudsb" }, "utility-fill": { "fa-semibold": "faufsb" } }, Or = { classic: ["fas", "far", "fal", "fat", "fad"], duotone: ["fadr", "fadl", "fadt"], sharp: ["fass", "fasr", "fasl", "fast"], "sharp-duotone": ["fasds", "fasdr", "fasdl", "fasdt"], slab: ["faslr"], "slab-press": ["faslpr"], "slab-duo": ["fasldr"], "slab-press-duo": ["faslpdr"], pixel: ["fapr"], mosaic: ["fams"], vellum: ["favs"], whiteboard: ["fawsb"], thumbprint: ["fatl"], notdog: ["fans"], "notdog-duo": ["fands"], etch: ["faes"], graphite: ["fagt"], jelly: ["fajr"], "jelly-fill": ["fajfr"], "jelly-duo": ["fajdr"], chisel: ["facr"], utility: ["fausb"], "utility-duo": ["faudsb"], "utility-fill": ["faufsb"] }, wa = { classic: { fab: "fa-brands", fad: "fa-duotone", fal: "fa-light", far: "fa-regular", fas: "fa-solid", fat: "fa-thin" }, duotone: { fadr: "fa-regular", fadl: "fa-light", fadt: "fa-thin" }, sharp: { fass: "fa-solid", fasr: "fa-regular", fasl: "fa-light", fast: "fa-thin" }, "sharp-duotone": { fasds: "fa-solid", fasdr: "fa-regular", fasdl: "fa-light", fasdt: "fa-thin" }, slab: { faslr: "fa-regular" }, "slab-press": { faslpr: "fa-regular" }, "slab-duo": { fasldr: "fa-regular" }, "slab-press-duo": { faslpdr: "fa-regular" }, pixel: { fapr: "fa-regular" }, mosaic: { fams: "fa-solid" }, vellum: { favs: "fa-solid" }, whiteboard: { fawsb: "fa-semibold" }, thumbprint: { fatl: "fa-light" }, notdog: { fans: "fa-solid" }, "notdog-duo": { fands: "fa-solid" }, etch: { faes: "fa-solid" }, graphite: { fagt: "fa-thin" }, jelly: { fajr: "fa-regular" }, "jelly-fill": { fajfr: "fa-regular" }, "jelly-duo": { fajdr: "fa-regular" }, chisel: { facr: "fa-regular" }, utility: { fausb: "fa-semibold" }, "utility-duo": { faudsb: "fa-semibold" }, "utility-fill": { faufsb: "fa-semibold" } }, jr = ["fa-solid", "fa-regular", "fa-light", "fa-thin", "fa-duotone", "fa-brands", "fa-semibold"], et = ["fa", "fas", "far", "fal", "fat", "fad", "fadr", "fadl", "fadt", "fab", "fass", "fasr", "fasl", "fast", "fasds", "fasdr", "fasdl", "fasdt", "faslr", "faslpr", "fasldr", "faslpdr", "fapr", "fams", "favs", "fawsb", "fatl", "fans", "fands", "faes", "fagt", "fajr", "fajfr", "fajdr", "facr", "fausb", "faudsb", "faufsb"].concat(Oe, jr), Cr = ["solid", "regular", "light", "thin", "duotone", "brands", "semibold"], rt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], Nr = rt.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), Tr = ["aw", "fw", "pull-left", "pull-right"], _r = [].concat(z(Object.keys(Or)), Cr, Tr, ["2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "beat-fade", "border", "bounce", "buzz", "canvas-square", "canvas-roomy", "fade", "flip-360", "flip-both", "flip-horizontal", "flip-vertical", "flip", "float", "inverse", "jello", "layers", "layers-bottom-left", "layers-bottom-right", "layers-counter", "layers-text", "layers-top-left", "layers-top-right", "li", "pull-end", "pull-start", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "spin-snap", "spin-snap-4", "spin-snap-8", "stack-1x", "stack-2x", "stack", "swing", "ul", "wag", "width-auto", "width-fixed", na.GROUP, na.SWAP_OPACITY, na.PRIMARY, na.SECONDARY]).concat(rt.map(function (a) { return "".concat(a, "x"); })).concat(Nr.map(function (a) { return "w-".concat(a); })), $r = { "Font Awesome 5 Free": { 900: "fas", 400: "far" }, "Font Awesome 5 Pro": { 900: "fas", 400: "far", normal: "far", 300: "fal" }, "Font Awesome 5 Brands": { 400: "fab", normal: "fab" }, "Font Awesome 5 Duotone": { 900: "fad" } }, O = "___FONT_AWESOME___", Sa = 16, it = "fa", ot = "svg-inline--fa", D = "data-fa-i2svg", Aa = "data-fa-pseudo-element", Mr = "data-fa-pseudo-element-pending", Ma = "data-prefix", Da = "data-icon", nn = "fontawesome-i2svg", Dr = "async", Lr = ["HTML", "HEAD", "STYLE", "SCRIPT"], st = ["::before", "::after", ":before", ":after"], ft = (function () { try {
    return !0;
}
catch {
    return !1;
} })();
function J(a) { return new Proxy(a, { get: function (t, e) { return e in t ? t[e] : t[w]; } }); }
var lt = l({}, jn);
lt[w] = l(l(l(l({}, { "fa-duotone": "duotone" }), jn[w]), Za.kit), Za["kit-duotone"]);
var Rr = J(lt), ka = l({}, we);
ka[w] = l(l(l(l({}, { duotone: "fad" }), ka[w]), an.kit), an["kit-duotone"]);
var tn = J(ka), Ia = l({}, wa);
Ia[w] = l(l({}, Ia[w]), Fe.kit);
var La = J(Ia), Pa = l({}, Fr);
Pa[w] = l(l({}, Pa[w]), ze.kit);
var ho = J(Pa), Wr = Ht, ut = "fa-layers-text", Ur = Gt, Yr = l({}, he), yo = J(Yr), Xr = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"], va = Vt, Hr = [].concat(z(Se), z(_r)), G = T.FontAwesomeConfig || {};
function Gr(a) { var n = b.querySelector("script[" + a + "]"); if (n)
    return n.getAttribute(a); }
function Vr(a) { return a === "" ? !0 : a === "false" ? !1 : a === "true" ? !0 : a; }
b && typeof b.querySelector == "function" && (en = [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-search-pseudo-elements-warnings", "searchPseudoElementsWarnings"], ["data-search-pseudo-elements-full-scan", "searchPseudoElementsFullScan"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]], en.forEach(function (a) { var n = fa(a, 2), t = n[0], e = n[1], r = Vr(Gr(t)); r != null && (G[e] = r); }));
var en, ct = { styleDefault: "solid", familyDefault: w, cssPrefix: it, replacementClass: ot, autoReplaceSvg: !0, autoAddCss: !0, searchPseudoElements: !1, searchPseudoElementsWarnings: !0, searchPseudoElementsFullScan: !1, observeMutations: !0, mutateApproach: "async", keepOriginalSource: !0, measurePerformance: !1, showMissingIcons: !0 };
G.familyPrefix && (G.cssPrefix = G.familyPrefix);
var Y = l(l({}, ct), G);
Y.autoReplaceSvg || (Y.observeMutations = !1);
var m = {};
Object.keys(ct).forEach(function (a) { Object.defineProperty(m, a, { enumerable: !0, set: function (t) { Y[a] = t, V.forEach(function (e) { return e(m); }); }, get: function () { return Y[a]; } }); });
Object.defineProperty(m, "familyPrefix", { enumerable: !0, set: function (n) { Y.cssPrefix = n, V.forEach(function (t) { return t(m); }); }, get: function () { return Y.cssPrefix; } });
T.FontAwesomeConfig = m;
var V = [];
function Br(a) { return V.push(a), function () { V.splice(V.indexOf(a), 1); }; }
var N = Sa, E = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
function qr(a) { if (!(!a || !C)) {
    var n = b.createElement("style");
    n.setAttribute("type", "text/css"), n.innerHTML = a;
    for (var t = b.head.childNodes, e = null, r = t.length - 1; r > -1; r--) {
        var o = t[r], i = (o.tagName || "").toUpperCase();
        ["STYLE", "LINK"].indexOf(i) > -1 && (e = o);
    }
    return b.head.insertBefore(n, e), a;
} }
var Jr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function rn() { for (var a = 12, n = ""; a-- > 0;)
    n += Jr[Math.random() * 62 | 0]; return n; }
function X(a) { for (var n = [], t = (a || []).length >>> 0; t--;)
    n[t] = a[t]; return n; }
function Ra(a) { return a.classList ? X(a.classList) : (a.getAttribute("class") || "").split(" ").filter(function (n) { return n; }); }
function mt(a) { return "".concat(a).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function Kr(a) { return Object.keys(a || {}).reduce(function (n, t) { return n + "".concat(t, '="').concat(mt(a[t]), '" '); }, "").trim(); }
function la(a) { return Object.keys(a || {}).reduce(function (n, t) { return n + "".concat(t, ": ").concat(a[t].trim(), ";"); }, ""); }
function Wa(a) { return a.size !== E.size || a.x !== E.x || a.y !== E.y || a.rotate !== E.rotate || a.flipX || a.flipY; }
function Qr(a) { var n = a.transform, t = a.containerWidth, e = a.iconWidth, r = { transform: "translate(".concat(t / 2, " 256)") }, o = "translate(".concat(n.x * 32, ", ").concat(n.y * 32, ") "), i = "scale(".concat(n.size / 16 * (n.flipX ? -1 : 1), ", ").concat(n.size / 16 * (n.flipY ? -1 : 1), ") "), s = "rotate(".concat(n.rotate, " 0 0)"), f = { transform: "".concat(o, " ").concat(i, " ").concat(s) }, u = { transform: "translate(".concat(e / 2 * -1, " -256)") }; return { outer: r, inner: f, path: u }; }
function Zr(a) { var n = a.transform, t = a.width, e = t === void 0 ? Sa : t, r = a.height, o = r === void 0 ? Sa : r, i = a.startCentered, s = i === void 0 ? !1 : i, f = ""; return s && On ? f += "translate(".concat(n.x / N - e / 2, "em, ").concat(n.y / N - o / 2, "em) ") : s ? f += "translate(calc(-50% + ".concat(n.x / N, "em), calc(-50% + ").concat(n.y / N, "em)) ") : f += "translate(".concat(n.x / N, "em, ").concat(n.y / N, "em) "), f += "scale(".concat(n.size / N * (n.flipX ? -1 : 1), ", ").concat(n.size / N * (n.flipY ? -1 : 1), ") "), f += "rotate(".concat(n.rotate, "deg) "), f; }
var ai = `:root, :host {
  --fa-font-solid: normal 900 1em/1 'Font Awesome 7 Free';
  --fa-font-regular: normal 400 1em/1 'Font Awesome 7 Free';
  --fa-font-light: normal 300 1em/1 'Font Awesome 7 Pro';
  --fa-font-thin: normal 100 1em/1 'Font Awesome 7 Pro';
  --fa-font-duotone: normal 900 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-regular: normal 400 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-light: normal 300 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-thin: normal 100 1em/1 'Font Awesome 7 Duotone';
  --fa-font-brands: normal 400 1em/1 'Font Awesome 7 Brands';
  --fa-font-sharp-solid: normal 900 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-regular: normal 400 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-light: normal 300 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-thin: normal 100 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-duotone-solid: normal 900 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-regular: normal 400 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-light: normal 300 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-thin: normal 100 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-slab-regular: normal 400 1em/1 'Font Awesome 7 Slab';
  --fa-font-slab-press-regular: normal 400 1em/1 'Font Awesome 7 Slab Press';
  --fa-font-slab-duo-regular: normal 400 1em/1 'Font Awesome 7 Slab Duo';
  --fa-font-slab-press-duo-regular: normal 400 1em/1 'Font Awesome 7 Slab Press Duo';
  --fa-font-pixel-regular: normal 400 1em/1 'Font Awesome 7 Pixel';
  --fa-font-mosaic-solid: normal 900 1em/1 'Font Awesome 7 Mosaic';
  --fa-font-vellum-solid: normal 900 1em/1 'Font Awesome 7 Vellum';
  --fa-font-whiteboard-semibold: normal 600 1em/1 'Font Awesome 7 Whiteboard';
  --fa-font-thumbprint-light: normal 300 1em/1 'Font Awesome 7 Thumbprint';
  --fa-font-notdog-solid: normal 900 1em/1 'Font Awesome 7 Notdog';
  --fa-font-notdog-duo-solid: normal 900 1em/1 'Font Awesome 7 Notdog Duo';
  --fa-font-etch-solid: normal 900 1em/1 'Font Awesome 7 Etch';
  --fa-font-graphite-thin: normal 100 1em/1 'Font Awesome 7 Graphite';
  --fa-font-jelly-regular: normal 400 1em/1 'Font Awesome 7 Jelly';
  --fa-font-jelly-fill-regular: normal 400 1em/1 'Font Awesome 7 Jelly Fill';
  --fa-font-jelly-duo-regular: normal 400 1em/1 'Font Awesome 7 Jelly Duo';
  --fa-font-chisel-regular: normal 400 1em/1 'Font Awesome 7 Chisel';
  --fa-font-utility-semibold: normal 600 1em/1 'Font Awesome 7 Utility';
  --fa-font-utility-duo-semibold: normal 600 1em/1 'Font Awesome 7 Utility Duo';
  --fa-font-utility-fill-semibold: normal 600 1em/1 'Font Awesome 7 Utility Fill';
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-canvas-square {
  padding-block: 0.125em;
  margin-block-end: -0.125em;
}

.fa-canvas-roomy {
  padding-block: 0.25em;
  padding-inline: 0.125em;
  margin-block-end: -0.25em;
  box-sizing: content-box;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1.5s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-flip-360 {
  animation-name: fa-flip-360;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 0.75s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

.fa-spin-snap {
  animation-name: fa-spin-snap;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 3s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-snap-4 {
  animation-name: fa-spin-snap-4;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2.4s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-snap-8 {
  animation-name: fa-spin-snap-8;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 4s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-buzz {
  animation-name: fa-buzz;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 0.6s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-wag {
  animation-name: fa-wag;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 0.9s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-out);
  transform-origin: bottom center;
}

.fa-float {
  animation-name: fa-float;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 3s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
  will-change: transform;
}

.fa-swing {
  animation-name: fa-swing;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1.2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-out);
  transform-origin: top center;
}

.fa-jello {
  animation-name: fa-jello;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 0.9s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-out);
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-flip-360,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse,
  .fa-buzz,
  .fa-float,
  .fa-jello,
  .fa-spin-snap,
  .fa-spin-snap-4,
  .fa-spin-snap-8,
  .fa-swing,
  .fa-wag {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(calc(1.25 * var(--fa-beat-scale, 1.25)));
  }
  45% {
    transform: scale(calc(1.22 * var(--fa-beat-scale, 1.22)));
  }
  65% {
    transform: scale(calc(1.25 * var(--fa-beat-scale, 1.25)));
  }
  90% {
    transform: scale(1);
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
    animation-timing-function: var(--fa-animation-timing);
  }
  14% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.06), var(--fa-bounce-start-scale-y, 0.94)) translateY(var(--fa-bounce-anticipation, 3px));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  32% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.94), var(--fa-bounce-jump-scale-y, 1.12)) translateY(calc(-1 * var(--fa-bounce-height, 0.5em)));
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  52% {
    transform: scale(1, 1) translateY(calc(-1 * var(--fa-bounce-height, 0.5em) * 1.1));
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  70% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.06), var(--fa-bounce-land-scale-y, 0.92)) translateY(0);
    animation-timing-function: cubic-bezier(0.33, 0.33, 0.66, 1);
  }
  85% {
    transform: scale(0.98, 1.04) translateY(calc(-2px * var(--fa-bounce-rebound, 1)));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  0% {
    opacity: 1;
    transform: scale(1);
    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
  }
  40% {
    opacity: var(--fa-fade-opacity, 0.4);
    transform: scale(0.98);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes fa-beat-fade {
  0% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
  }
  25% {
    opacity: calc(var(--fa-beat-fade-opacity, 0.4) + 0.4);
    transform: scale(var(--fa-beat-fade-scale, 1.28));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  45% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.25));
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  65% {
    opacity: calc(var(--fa-beat-fade-opacity, 0.4) + 0.4);
    transform: scale(var(--fa-beat-fade-scale, 1.28));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
}
@keyframes fa-flip {
  0% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
  }
  8% {
    transform: perspective(2em) scale(var(--fa-flip-anticipation-scale, 0.95)) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  35% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * 0.6));
    animation-timing-function: linear;
  }
  65% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * 0.5));
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  92% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * var(--fa-flip-overshoot, 1.04)));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
  }
  100% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -360deg));
  }
}
@keyframes fa-flip-360 {
  0% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
  }
  8% {
    transform: perspective(2em) scale(var(--fa-flip-anticipation-scale, 0.95)) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  50% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * 0.6));
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  80% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * var(--fa-flip-overshoot, 1.04)));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
  }
  100% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -360deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
  }
  8% {
    transform: rotate(35deg) translateX(1px);
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  20% {
    transform: rotate(-22deg) translateX(-1px);
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  35% {
    transform: rotate(15deg) translateX(1px);
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  50% {
    transform: rotate(-9deg);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  65% {
    transform: rotate(5deg);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  78% {
    transform: rotate(-3deg);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  90% {
    transform: rotate(1deg);
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fa-spin-snap {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  12% {
    transform: rotate(60deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  16.67% {
    transform: rotate(60deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  28.67% {
    transform: rotate(120deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  33.33% {
    transform: rotate(120deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  45.33% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  62% {
    transform: rotate(240deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  66.67% {
    transform: rotate(240deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  78.67% {
    transform: rotate(300deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  83.33% {
    transform: rotate(300deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  95.33% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fa-spin-snap-4 {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  15% {
    transform: rotate(90deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  25% {
    transform: rotate(90deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  40% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  65% {
    transform: rotate(270deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  75% {
    transform: rotate(270deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  90% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fa-spin-snap-8 {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  9% {
    transform: rotate(45deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  12.5% {
    transform: rotate(45deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  21.5% {
    transform: rotate(90deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  25% {
    transform: rotate(90deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  34% {
    transform: rotate(135deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  37.5% {
    transform: rotate(135deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  46.5% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  59% {
    transform: rotate(225deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  62.5% {
    transform: rotate(225deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  71.5% {
    transform: rotate(270deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  75% {
    transform: rotate(270deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  84% {
    transform: rotate(315deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  87.5% {
    transform: rotate(315deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  96.5% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fa-buzz {
  0% {
    transform: translateX(0) rotate(0deg);
    animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);
  }
  5% {
    transform: translateX(var(--fa-buzz-distance, 4px)) rotate(0.5deg);
  }
  10% {
    transform: translateX(calc(-1 * var(--fa-buzz-distance, 4px))) rotate(-0.5deg);
  }
  15% {
    transform: translateX(var(--fa-buzz-distance, 4px)) rotate(0.3deg);
  }
  20% {
    transform: translateX(calc(-1 * var(--fa-buzz-distance, 4px))) rotate(-0.3deg);
  }
  25% {
    transform: translateX(calc(var(--fa-buzz-distance, 4px) * 0.7)) rotate(0.2deg);
  }
  30% {
    transform: translateX(calc(-1 * var(--fa-buzz-distance, 4px) * 0.7)) rotate(-0.2deg);
  }
  35% {
    transform: translateX(calc(var(--fa-buzz-distance, 4px) * 0.4)) rotate(0.1deg);
  }
  40% {
    transform: translateX(0) rotate(0deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
}
@keyframes fa-wag {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
  }
  12% {
    transform: rotate(var(--fa-wag-angle, 12deg));
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  24% {
    transform: rotate(2deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
  }
  36% {
    transform: rotate(calc(var(--fa-wag-angle, 12deg) * 0.85));
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  48% {
    transform: rotate(1deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
  }
  58% {
    transform: rotate(calc(var(--fa-wag-angle, 12deg) * 0.6));
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  68% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-float {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x, 1.02), var(--fa-float-squash-y, 0.98));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  15% {
    transform: translateY(calc(-0.4 * var(--fa-float-height, 6px))) translateX(var(--fa-float-drift, 1px)) rotate(var(--fa-float-tilt, 1deg)) scale(1, 1);
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  35% {
    transform: translateY(calc(-1 * var(--fa-float-height, 6px))) translateX(0) rotate(0deg) scale(var(--fa-float-stretch-x, 0.98), var(--fa-float-stretch-y, 1.03));
    animation-timing-function: cubic-bezier(0.5, 0, 0.5, 0);
  }
  50% {
    transform: translateY(calc(-0.92 * var(--fa-float-height, 6px))) translateX(calc(-0.5 * var(--fa-float-drift, 1px))) rotate(calc(-0.5 * var(--fa-float-tilt, 1deg))) scale(0.995, 1.01);
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  70% {
    transform: translateY(calc(-0.3 * var(--fa-float-height, 6px))) translateX(calc(-1 * var(--fa-float-drift, 1px))) rotate(calc(-1 * var(--fa-float-tilt, 1deg))) scale(1, 1);
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  90% {
    transform: translateY(calc(0.05 * var(--fa-float-height, 6px))) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x, 1.02), var(--fa-float-squash-y, 0.98));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x, 1.02), var(--fa-float-squash-y, 0.98));
  }
}
@keyframes fa-swing {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
  }
  8% {
    transform: rotate(var(--fa-swing-angle, 22deg));
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  18% {
    transform: rotate(calc(-1 * var(--fa-swing-angle, 22deg) * 0.85));
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  28% {
    transform: rotate(calc(var(--fa-swing-angle, 22deg) * 0.65));
    animation-timing-function: cubic-bezier(0.35, 0, 0.65, 1);
  }
  38% {
    transform: rotate(calc(-1 * var(--fa-swing-angle, 22deg) * 0.45));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  48% {
    transform: rotate(calc(var(--fa-swing-angle, 22deg) * 0.25));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  56% {
    transform: rotate(calc(-1 * var(--fa-swing-angle, 22deg) * 0.1));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  64% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-jello {
  0% {
    transform: scale(1, 1);
    animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
  }
  12% {
    transform: scale(var(--fa-jello-scale-x, 1.15), calc(2 - var(--fa-jello-scale-x, 1.15)));
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  24% {
    transform: scale(calc(2 - var(--fa-jello-scale-y, 1.12)), var(--fa-jello-scale-y, 1.12));
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  36% {
    transform: scale(calc(1 + (var(--fa-jello-scale-x, 1.15) - 1) * 0.5), calc(2 - (1 + (var(--fa-jello-scale-x, 1.15) - 1) * 0.5)));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  48% {
    transform: scale(calc(2 - (1 + (var(--fa-jello-scale-y, 1.12) - 1) * 0.3)), calc(1 + (var(--fa-jello-scale-y, 1.12) - 1) * 0.3));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  58% {
    transform: scale(1.02, 0.98);
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  68% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`;
function dt() { var a = it, n = ot, t = m.cssPrefix, e = m.replacementClass, r = ai; if (t !== a || e !== n) {
    var o = new RegExp("\\.".concat(a, "\\-"), "g"), i = new RegExp("\\--".concat(a, "\\-"), "g"), s = new RegExp("\\.".concat(n), "g");
    r = r.replace(o, ".".concat(t, "-")).replace(i, "--".concat(t, "-")).replace(s, ".".concat(e));
} return r; }
var on = !1;
function pa() { m.autoAddCss && !on && (qr(dt()), on = !0); }
var ni = { mixout: function () { return { dom: { css: dt, insertCss: pa } }; }, hooks: function () { return { beforeDOMElementCreation: function () { pa(); }, beforeI2svg: function () { pa(); } }; } }, j = T || {};
j[O] || (j[O] = {});
j[O].styles || (j[O].styles = {});
j[O].hooks || (j[O].hooks = {});
j[O].shims || (j[O].shims = []);
var P = j[O], gt = [], vt = function () { b.removeEventListener("DOMContentLoaded", vt), oa = 1, gt.map(function (n) { return n(); }); }, oa = !1;
C && (oa = (b.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(b.readyState), oa || b.addEventListener("DOMContentLoaded", vt));
function ti(a) { C && (oa ? setTimeout(a, 0) : gt.push(a)); }
function K(a) { var n = a.tag, t = a.attributes, e = t === void 0 ? {} : t, r = a.children, o = r === void 0 ? [] : r; return typeof a == "string" ? mt(a) : "<".concat(n, " ").concat(Kr(e), ">").concat(o.map(K).join(""), "</").concat(n, ">"); }
function sn(a, n, t) { if (a && a[n] && a[n][t])
    return { prefix: n, iconName: t, icon: a[n][t] }; }
var ei = function (n, t) { return function (e, r, o, i) { return n.call(t, e, r, o, i); }; }, ba = function (n, t, e, r) { var o = Object.keys(n), i = o.length, s = r !== void 0 ? ei(t, r) : t, f, u, d; for (e === void 0 ? (f = 1, d = n[o[0]]) : (f = 0, d = e); f < i; f++)
    u = o[f], d = s(d, n[u], u, n); return d; };
function pt(a) { return z(a).length !== 1 ? null : a.codePointAt(0).toString(16); }
function fn(a) { return Object.keys(a).reduce(function (n, t) { var e = a[t], r = !!e.icon; return r ? n[e.iconName] = e.icon : n[t] = e, n; }, {}); }
function za(a, n) { var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, e = t.skipHooks, r = e === void 0 ? !1 : e, o = fn(n); typeof P.hooks.addPack == "function" && !r ? P.hooks.addPack(a, fn(n)) : P.styles[a] = l(l({}, P.styles[a] || {}), o), a === "fas" && za("fa", n); }
var B = P.styles, ri = P.shims, bt = Object.keys(La), ii = bt.reduce(function (a, n) { return a[n] = Object.keys(La[n]), a; }, {}), Ua = null, ht = {}, yt = {}, xt = {}, wt = {}, St = {};
function oi(a) { return ~Hr.indexOf(a); }
function si(a, n) { var t = n.split("-"), e = t[0], r = t.slice(1).join("-"); return e === a && r !== "" && !oi(r) ? r : null; }
var At = function () { var n = function (o) { return ba(B, function (i, s, f) { return i[f] = ba(s, o, {}), i; }, {}); }; ht = n(function (r, o, i) { if (o[3] && (r[o[3]] = i), o[2]) {
    var s = o[2].filter(function (f) { return typeof f == "number"; });
    s.forEach(function (f) { r[f.toString(16)] = i; });
} return r; }), yt = n(function (r, o, i) { if (r[i] = i, o[2]) {
    var s = o[2].filter(function (f) { return typeof f == "string"; });
    s.forEach(function (f) { r[f] = i; });
} return r; }), St = n(function (r, o, i) { var s = o[2]; return r[i] = i, s.forEach(function (f) { r[f] = i; }), r; }); var t = "far" in B || m.autoFetchSvg, e = ba(ri, function (r, o) { var i = o[0], s = o[1], f = o[2]; return s === "far" && !t && (s = "fas"), typeof i == "string" && (r.names[i] = { prefix: s, iconName: f }), typeof i == "number" && (r.unicodes[i.toString(16)] = { prefix: s, iconName: f }), r; }, { names: {}, unicodes: {} }); xt = e.names, wt = e.unicodes, Ua = ua(m.styleDefault, { family: m.familyDefault }); };
Br(function (a) { Ua = ua(a.styleDefault, { family: m.familyDefault }); });
At();
function Ya(a, n) { return (ht[a] || {})[n]; }
function fi(a, n) { return (yt[a] || {})[n]; }
function M(a, n) { return (St[a] || {})[n]; }
function kt(a) { return xt[a] || { prefix: null, iconName: null }; }
function li(a) { var n = wt[a], t = Ya("fas", a); return n || (t ? { prefix: "fas", iconName: t } : null) || { prefix: null, iconName: null }; }
function _() { return Ua; }
var It = function () { return { prefix: null, iconName: null, rest: [] }; };
function ui(a) { var n = w, t = bt.reduce(function (e, r) { return e[r] = "".concat(m.cssPrefix, "-").concat(r), e; }, {}); return nt.forEach(function (e) { (a.includes(t[e]) || a.some(function (r) { return ii[e].includes(r); })) && (n = e); }), n; }
function ua(a) { var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = n.family, e = t === void 0 ? w : t, r = Rr[e][a]; if (e === q && !a)
    return "fad"; var o = tn[e][a] || tn[e][r], i = a in P.styles ? a : null, s = o || i || null; return s; }
function ci(a) { var n = [], t = null; return a.forEach(function (e) { var r = si(m.cssPrefix, e); r ? t = r : e && n.push(e); }), { iconName: t, rest: n }; }
function ln(a) { return a.sort().filter(function (n, t, e) { return e.indexOf(n) === t; }); }
var un = et.concat(tt);
function ca(a) { var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = n.skipLookups, e = t === void 0 ? !1 : t, r = null, o = ln(a.filter(function (v) { return un.includes(v); })), i = ln(a.filter(function (v) { return !un.includes(v); })), s = o.filter(function (v) { return r = v, !Cn.includes(v); }), f = fa(s, 1), u = f[0], d = u === void 0 ? null : u, c = ui(o), p = l(l({}, ci(i)), {}, { prefix: ua(d, { family: c }) }); return l(l(l({}, p), vi({ values: a, family: c, styles: B, config: m, canonical: p, givenPrefix: r })), mi(e, r, p)); }
function mi(a, n, t) { var e = t.prefix, r = t.iconName; if (a || !e || !r)
    return { prefix: e, iconName: r }; var o = n === "fa" ? kt(r) : {}, i = M(e, r); return r = o.iconName || i || r, e = o.prefix || e, e === "far" && !B.far && B.fas && !m.autoFetchSvg && (e = "fas"), { prefix: e, iconName: r }; }
var di = nt.filter(function (a) { return a !== w || a !== q; }), gi = Object.keys(wa).filter(function (a) { return a !== w; }).map(function (a) { return Object.keys(wa[a]); }).flat();
function vi(a) { var n = a.values, t = a.family, e = a.canonical, r = a.givenPrefix, o = r === void 0 ? "" : r, i = a.styles, s = i === void 0 ? {} : i, f = a.config, u = f === void 0 ? {} : f, d = t === q, c = n.includes("fa-duotone") || n.includes("fad"), p = u.familyDefault === "duotone", v = e.prefix === "fad" || e.prefix === "fa-duotone"; if (!d && (c || p || v) && (e.prefix = "fad"), (n.includes("fa-brands") || n.includes("fab")) && (e.prefix = "fab"), !e.prefix && di.includes(t)) {
    var y = Object.keys(s).find(function (S) { return gi.includes(S); });
    if (y || u.autoFetchSvg) {
        var h = xe.get(t).defaultShortPrefixId;
        e.prefix = h, e.iconName = M(e.prefix, e.iconName) || e.iconName;
    }
} return (e.prefix === "fa" || o === "fa") && (e.prefix = _() || "fas"), e; }
var pi = (function () { function a() { Mt(this, a), this.definitions = {}; } return Dt(a, [{ key: "add", value: function () { for (var t = this, e = arguments.length, r = new Array(e), o = 0; o < e; o++)
            r[o] = arguments[o]; var i = r.reduce(this._pullDefinitions, {}); Object.keys(i).forEach(function (s) { t.definitions[s] = l(l({}, t.definitions[s] || {}), i[s]), za(s, i[s]); var f = La[w][s]; f && za(f, i[s]), At(); }); } }, { key: "reset", value: function () { this.definitions = {}; } }, { key: "_pullDefinitions", value: function (t, e) { var r = e.prefix && e.iconName && e.icon ? { 0: e } : e; return Object.keys(r).map(function (o) { var i = r[o], s = i.prefix, f = i.iconName, u = i.icon, d = u[2]; t[s] || (t[s] = {}), d.length > 0 && d.forEach(function (c) { typeof c == "string" && (t[s][c] = u); }), t[s][f] = u; }), t; } }]); })(), cn = [], W = {}, U = {}, bi = Object.keys(U);
function hi(a, n) { var t = n.mixoutsTo; return cn = a, W = {}, Object.keys(U).forEach(function (e) { bi.indexOf(e) === -1 && delete U[e]; }), cn.forEach(function (e) { var r = e.mixout ? e.mixout() : {}; if (Object.keys(r).forEach(function (i) { typeof r[i] == "function" && (t[i] = r[i]), ia(r[i]) === "object" && Object.keys(r[i]).forEach(function (s) { t[i] || (t[i] = {}), t[i][s] = r[i][s]; }); }), e.hooks) {
    var o = e.hooks();
    Object.keys(o).forEach(function (i) { W[i] || (W[i] = []), W[i].push(o[i]); });
} e.provides && e.provides(U); }), t; }
function Ea(a, n) { for (var t = arguments.length, e = new Array(t > 2 ? t - 2 : 0), r = 2; r < t; r++)
    e[r - 2] = arguments[r]; var o = W[a] || []; return o.forEach(function (i) { n = i.apply(null, [n].concat(e)); }), n; }
function L(a) { for (var n = arguments.length, t = new Array(n > 1 ? n - 1 : 0), e = 1; e < n; e++)
    t[e - 1] = arguments[e]; var r = W[a] || []; r.forEach(function (o) { o.apply(null, t); }); }
function $() { var a = arguments[0], n = Array.prototype.slice.call(arguments, 1); return U[a] ? U[a].apply(null, n) : void 0; }
function Fa(a) { a.prefix === "fa" && (a.prefix = "fas"); var n = a.iconName, t = a.prefix || _(); if (n)
    return n = M(t, n) || n, sn(Pt.definitions, t, n) || sn(P.styles, t, n); }
var Pt = new pi, yi = function () { m.autoReplaceSvg = !1, m.observeMutations = !1, L("noAuto"); }, xi = { i2svg: function () { var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}; return C ? (L("beforeI2svg", n), $("pseudoElements2svg", n), $("i2svg", n)) : Promise.reject(new Error("Operation requires a DOM of some kind.")); }, watch: function () { var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = n.autoReplaceSvgRoot; m.autoReplaceSvg === !1 && (m.autoReplaceSvg = !0), m.observeMutations = !0, ti(function () { Si({ autoReplaceSvgRoot: t }), L("watch", n); }); } }, wi = { icon: function (n) { if (n === null)
        return null; if (ia(n) === "object" && n.prefix && n.iconName)
        return { prefix: n.prefix, iconName: M(n.prefix, n.iconName) || n.iconName }; if (Array.isArray(n) && n.length === 2) {
        var t = n[1].indexOf("fa-") === 0 ? n[1].slice(3) : n[1], e = ua(n[0]);
        return { prefix: e, iconName: M(e, t) || t };
    } if (typeof n == "string" && (n.indexOf("".concat(m.cssPrefix, "-")) > -1 || n.match(Wr))) {
        var r = ca(n.split(" "), { skipLookups: !0 });
        return { prefix: r.prefix || _(), iconName: M(r.prefix, r.iconName) || r.iconName };
    } if (typeof n == "string") {
        var o = _();
        return { prefix: o, iconName: M(o, n) || n };
    } } }, k = { noAuto: yi, config: m, dom: xi, parse: wi, library: Pt, findIconDefinition: Fa, toHtml: K }, Si = function () { var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = n.autoReplaceSvgRoot, e = t === void 0 ? b : t; (Object.keys(P.styles).length > 0 || m.autoFetchSvg) && C && m.autoReplaceSvg && k.dom.i2svg({ node: e }); };
function ma(a, n) { return Object.defineProperty(a, "abstract", { get: n }), Object.defineProperty(a, "html", { get: function () { return a.abstract.map(function (e) { return K(e); }); } }), Object.defineProperty(a, "node", { get: function () { if (C) {
        var e = b.createElement("div");
        return e.innerHTML = a.html, e.children;
    } } }), a; }
function Ai(a) { var n = a.children, t = a.main, e = a.mask, r = a.attributes, o = a.styles, i = a.transform; if (Wa(i) && t.found && !e.found) {
    var s = t.width, f = t.height, u = { x: s / f / 2, y: .5 };
    r.style = la(l(l({}, o), {}, { "transform-origin": "".concat(u.x + i.x / 16, "em ").concat(u.y + i.y / 16, "em") }));
} return [{ tag: "svg", attributes: r, children: n }]; }
function ki(a) { var n = a.prefix, t = a.iconName, e = a.children, r = a.attributes, o = a.symbol, i = o === !0 ? "".concat(n, "-").concat(m.cssPrefix, "-").concat(t) : o; return [{ tag: "svg", attributes: { style: "display: none;" }, children: [{ tag: "symbol", attributes: l(l({}, r), {}, { id: i }), children: e }] }]; }
function Ii(a) { var n = ["aria-label", "aria-labelledby", "title", "role"]; return n.some(function (t) { return t in a; }); }
function Xa(a) { var n = a.icons, t = n.main, e = n.mask, r = a.prefix, o = a.iconName, i = a.transform, s = a.symbol, f = a.maskId, u = a.extra, d = a.watchable, c = d === void 0 ? !1 : d, p = e.found ? e : t, v = p.width, y = p.height, h = [m.replacementClass, o ? "".concat(m.cssPrefix, "-").concat(o) : ""].filter(function (F) { return u.classes.indexOf(F) === -1; }).filter(function (F) { return F !== "" || !!F; }).concat(u.classes).join(" "), S = { children: [], attributes: l(l({}, u.attributes), {}, { "data-prefix": r, "data-icon": o, class: h, role: u.attributes.role || "img", viewBox: "0 0 ".concat(v, " ").concat(y) }) }; !Ii(u.attributes) && !u.attributes["aria-hidden"] && (S.attributes["aria-hidden"] = "true"), c && (S.attributes[D] = ""); var x = l(l({}, S), {}, { prefix: r, iconName: o, main: t, mask: e, maskId: f, transform: i, symbol: s, styles: l({}, u.styles) }), A = e.found && t.found ? $("generateAbstractMask", x) || { children: [], attributes: {} } : $("generateAbstractIcon", x) || { children: [], attributes: {} }, I = A.children, R = A.attributes; return x.children = I, x.attributes = R, s ? ki(x) : Ai(x); }
function mn(a) { var n = a.content, t = a.width, e = a.height, r = a.transform, o = a.extra, i = a.watchable, s = i === void 0 ? !1 : i, f = l(l({}, o.attributes), {}, { class: o.classes.join(" ") }); s && (f[D] = ""); var u = l({}, o.styles); Wa(r) && (u.transform = Zr({ transform: r, startCentered: !0, width: t, height: e }), u["-webkit-transform"] = u.transform); var d = la(u); d.length > 0 && (f.style = d); var c = []; return c.push({ tag: "span", attributes: f, children: [n] }), c; }
function Pi(a) { var n = a.content, t = a.extra, e = l(l({}, t.attributes), {}, { class: t.classes.join(" ") }), r = la(t.styles); r.length > 0 && (e.style = r); var o = []; return o.push({ tag: "span", attributes: e, children: [n] }), o; }
var ha = P.styles;
function Oa(a) { var n = a[0], t = a[1], e = a.slice(4), r = fa(e, 1), o = r[0], i = null; return Array.isArray(o) ? i = { tag: "g", attributes: { class: "".concat(m.cssPrefix, "-").concat(va.GROUP) }, children: [{ tag: "path", attributes: { class: "".concat(m.cssPrefix, "-").concat(va.SECONDARY), fill: "currentColor", d: o[0] } }, { tag: "path", attributes: { class: "".concat(m.cssPrefix, "-").concat(va.PRIMARY), fill: "currentColor", d: o[1] } }] } : i = { tag: "path", attributes: { fill: "currentColor", d: o } }, { found: !0, width: n, height: t, icon: i }; }
var zi = { found: !1, width: 512, height: 512 };
function Ei(a, n) { !ft && !m.showMissingIcons && a && console.error('Icon with name "'.concat(a, '" and prefix "').concat(n, '" is missing.')); }
function ja(a, n) { var t = n; return n === "fa" && m.styleDefault !== null && (n = _()), new Promise(function (e, r) { if (t === "fa") {
    var o = kt(a) || {};
    a = o.iconName || a, n = o.prefix || n;
} if (a && n && ha[n] && ha[n][a]) {
    var i = ha[n][a];
    return e(Oa(i));
} Ei(a, n), e(l(l({}, zi), {}, { icon: m.showMissingIcons && a ? $("missingIconAbstract") || {} : {} })); }); }
var dn = function () { }, Ca = m.measurePerformance && Q && Q.mark && Q.measure ? Q : { mark: dn, measure: dn }, H = 'FA "7.3.1"', Fi = function (n) { return Ca.mark("".concat(H, " ").concat(n, " begins")), function () { return zt(n); }; }, zt = function (n) { Ca.mark("".concat(H, " ").concat(n, " ends")), Ca.measure("".concat(H, " ").concat(n), "".concat(H, " ").concat(n, " begins"), "".concat(H, " ").concat(n, " ends")); }, Ha = { begin: Fi, end: zt }, ea = function () { };
function gn(a) { var n = a.getAttribute ? a.getAttribute(D) : null; return typeof n == "string"; }
function Oi(a) { var n = a.getAttribute ? a.getAttribute(Ma) : null, t = a.getAttribute ? a.getAttribute(Da) : null; return n && t; }
function ji(a) { return a && a.classList && a.classList.contains && a.classList.contains(m.replacementClass); }
function Ci() { if (m.autoReplaceSvg === !0)
    return ra.replace; var a = ra[m.autoReplaceSvg]; return a || ra.replace; }
function Ni(a) { return b.createElementNS("http://www.w3.org/2000/svg", a); }
function Ti(a) { return b.createElement(a); }
function Et(a) { var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = n.ceFn, e = t === void 0 ? a.tag === "svg" ? Ni : Ti : t; if (typeof a == "string")
    return b.createTextNode(a); var r = e(a.tag); Object.keys(a.attributes || []).forEach(function (i) { r.setAttribute(i, a.attributes[i]); }); var o = a.children || []; return o.forEach(function (i) { r.appendChild(Et(i, { ceFn: e })); }), r; }
function _i(a) { var n = " ".concat(a.outerHTML, " "); return n = "".concat(n, "Font Awesome fontawesome.com "), n; }
var ra = { replace: function (n) { var t = n[0]; if (t.parentNode)
        if (n[1].forEach(function (r) { t.parentNode.insertBefore(Et(r), t); }), t.getAttribute(D) === null && m.keepOriginalSource) {
            var e = b.createComment(_i(t));
            t.parentNode.replaceChild(e, t);
        }
        else
            t.remove(); }, nest: function (n) {
        var t = n[0], e = n[1];
        if (~Ra(t).indexOf(m.replacementClass))
            return ra.replace(n);
        var r = new RegExp("".concat(m.cssPrefix, "-.*"));
        if (delete e[0].attributes.id, e[0].attributes.class) {
            var o = e[0].attributes.class.split(" ").reduce(function (s, f) { return f === m.replacementClass || f.match(r) ? s.toSvg.push(f) : s.toNode.push(f), s; }, { toNode: [], toSvg: [] });
            e[0].attributes.class = o.toSvg.join(" "), o.toNode.length === 0 ? t.removeAttribute("class") : t.setAttribute("class", o.toNode.join(" "));
        }
        var i = e.map(function (s) { return K(s); }).join(`
`);
        t.setAttribute(D, ""), t.innerHTML = i;
    } };
function vn(a) { a(); }
function Ft(a, n) { var t = typeof n == "function" ? n : ea; if (a.length === 0)
    t();
else {
    var e = vn;
    m.mutateApproach === Dr && (e = T.requestAnimationFrame || vn), e(function () { var r = Ci(), o = Ha.begin("mutate"); a.map(r), o(), t(); });
} }
var Ga = !1;
function Ot() { Ga = !0; }
function Na() { Ga = !1; }
var sa = null;
function pn(a) { if (Qa && m.observeMutations) {
    var n = a.treeCallback, t = n === void 0 ? ea : n, e = a.nodeCallback, r = e === void 0 ? ea : e, o = a.pseudoElementsCallback, i = o === void 0 ? ea : o, s = a.observeMutationsRoot, f = s === void 0 ? b : s;
    sa = new Qa(function (u) { if (!Ga) {
        var d = _();
        X(u).forEach(function (c) { if (c.type === "childList" && c.addedNodes.length > 0 && !gn(c.addedNodes[0]) && (m.searchPseudoElements && i(c.target), t(c.target)), c.type === "attributes" && c.target.parentNode && m.searchPseudoElements && i([c.target], !0), c.type === "attributes" && gn(c.target) && ~Xr.indexOf(c.attributeName))
            if (c.attributeName === "class" && Oi(c.target)) {
                var p = ca(Ra(c.target)), v = p.prefix, y = p.iconName;
                c.target.setAttribute(Ma, v || d), y && c.target.setAttribute(Da, y);
            }
            else
                ji(c.target) && r(c.target); });
    } }), C && sa.observe(f, { childList: !0, attributes: !0, characterData: !0, subtree: !0 });
} }
function $i() { sa && sa.disconnect(); }
function Mi(a) { var n = a.getAttribute("style"), t = []; return n && (t = n.split(";").reduce(function (e, r) { var o = r.split(":"), i = o[0], s = o.slice(1); return i && s.length > 0 && (e[i] = s.join(":").trim()), e; }, {})), t; }
function Di(a) { var n = a.getAttribute("data-prefix"), t = a.getAttribute("data-icon"), e = a.innerText !== void 0 ? a.innerText.trim() : "", r = ca(Ra(a)); return r.prefix || (r.prefix = _()), n && t && (r.prefix = n, r.iconName = t), r.iconName && r.prefix || (r.prefix && e.length > 0 && (r.iconName = fi(r.prefix, a.innerText) || Ya(r.prefix, pt(a.innerText))), !r.iconName && m.autoFetchSvg && a.firstChild && a.firstChild.nodeType === Node.TEXT_NODE && (r.iconName = a.firstChild.data)), r; }
function Li(a) { var n = X(a.attributes).reduce(function (t, e) { return t.name !== "class" && t.name !== "style" && (t[e.name] = e.value), t; }, {}); return n; }
function Ri() { return { iconName: null, prefix: null, transform: E, symbol: !1, mask: { iconName: null, prefix: null, rest: [] }, maskId: null, extra: { classes: [], styles: {}, attributes: {} } }; }
function bn(a) { var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { styleParser: !0 }, t = Di(a), e = t.iconName, r = t.prefix, o = t.rest, i = Li(a), s = Ea("parseNodeAttributes", {}, a), f = n.styleParser ? Mi(a) : []; return l({ iconName: e, prefix: r, transform: E, mask: { iconName: null, prefix: null, rest: [] }, maskId: null, symbol: !1, extra: { classes: o, styles: f, attributes: i } }, s); }
var Wi = P.styles;
function jt(a) { var n = m.autoReplaceSvg === "nest" ? bn(a, { styleParser: !1 }) : bn(a); return ~n.extra.classes.indexOf(ut) ? $("generateLayersText", a, n) : $("generateSvgReplacementMutation", a, n); }
function Ui() { return [].concat(z(tt), z(et)); }
function hn(a) { var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null; if (!C)
    return Promise.resolve(); var t = b.documentElement.classList, e = function (c) { return t.add("".concat(nn, "-").concat(c)); }, r = function (c) { return t.remove("".concat(nn, "-").concat(c)); }, o = m.autoFetchSvg ? Ui() : Cn.concat(Object.keys(Wi)); o.includes("fa") || o.push("fa"); var i = [".".concat(ut, ":not([").concat(D, "])")].concat(o.map(function (d) { return ".".concat(d, ":not([").concat(D, "])"); })).join(", "); if (i.length === 0)
    return Promise.resolve(); var s = []; try {
    s = X(a.querySelectorAll(i));
}
catch { } if (s.length > 0)
    e("pending"), r("complete");
else
    return Promise.resolve(); var f = Ha.begin("onTree"), u = s.reduce(function (d, c) { try {
    var p = jt(c);
    p && d.push(p);
}
catch (v) {
    ft || v.name === "MissingIcon" && console.error(v);
} return d; }, []); return new Promise(function (d, c) { Promise.all(u).then(function (p) { Ft(p, function () { e("active"), e("complete"), r("pending"), typeof n == "function" && n(), f(), d(); }); }).catch(function (p) { f(), c(p); }); }); }
function Yi(a) { var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null; jt(a).then(function (t) { t && Ft([t], n); }); }
function Xi(a) { return function (n) { var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = (n || {}).icon ? n : Fa(n || {}), r = t.mask; return r && (r = (r || {}).icon ? r : Fa(r || {})), a(e, l(l({}, t), {}, { mask: r })); }; }
var Hi = function (n) { var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = t.transform, r = e === void 0 ? E : e, o = t.symbol, i = o === void 0 ? !1 : o, s = t.mask, f = s === void 0 ? null : s, u = t.maskId, d = u === void 0 ? null : u, c = t.classes, p = c === void 0 ? [] : c, v = t.attributes, y = v === void 0 ? {} : v, h = t.styles, S = h === void 0 ? {} : h; if (n) {
    var x = n.prefix, A = n.iconName, I = n.icon;
    return ma(l({ type: "icon" }, n), function () { return L("beforeDOMElementCreation", { iconDefinition: n, params: t }), Xa({ icons: { main: Oa(I), mask: f ? Oa(f.icon) : { found: !1, width: null, height: null, icon: {} } }, prefix: x, iconName: A, transform: l(l({}, E), r), symbol: i, maskId: d, extra: { attributes: y, styles: S, classes: p } }); });
} }, Gi = { mixout: function () { return { icon: Xi(Hi) }; }, hooks: function () { return { mutationObserverCallbacks: function (t) { return t.treeCallback = hn, t.nodeCallback = Yi, t; } }; }, provides: function (n) { n.i2svg = function (t) { var e = t.node, r = e === void 0 ? b : e, o = t.callback, i = o === void 0 ? function () { } : o; return hn(r, i); }, n.generateSvgReplacementMutation = function (t, e) { var r = e.iconName, o = e.prefix, i = e.transform, s = e.symbol, f = e.mask, u = e.maskId, d = e.extra; return new Promise(function (c, p) { Promise.all([ja(r, o), f.iconName ? ja(f.iconName, f.prefix) : Promise.resolve({ found: !1, width: 512, height: 512, icon: {} })]).then(function (v) { var y = fa(v, 2), h = y[0], S = y[1]; c([t, Xa({ icons: { main: h, mask: S }, prefix: o, iconName: r, transform: i, symbol: s, maskId: u, extra: d, watchable: !0 })]); }).catch(p); }); }, n.generateAbstractIcon = function (t) { var e = t.children, r = t.attributes, o = t.main, i = t.transform, s = t.styles, f = la(s); f.length > 0 && (r.style = f); var u; return Wa(i) && (u = $("generateAbstractTransformGrouping", { main: o, transform: i, containerWidth: o.width, iconWidth: o.width })), e.push(u || o.icon), { children: e, attributes: r }; }; } }, Vi = { mixout: function () { return { layer: function (t) { var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = e.classes, o = r === void 0 ? [] : r; return ma({ type: "layer" }, function () { L("beforeDOMElementCreation", { assembler: t, params: e }); var i = []; return t(function (s) { Array.isArray(s) ? s.map(function (f) { i = i.concat(f.abstract); }) : i = i.concat(s.abstract); }), [{ tag: "span", attributes: { class: ["".concat(m.cssPrefix, "-layers")].concat(z(o)).join(" ") }, children: i }]; }); } }; } }, Bi = { mixout: function () { return { counter: function (t) { var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = e.title, o = r === void 0 ? null : r, i = e.classes, s = i === void 0 ? [] : i, f = e.attributes, u = f === void 0 ? {} : f, d = e.styles, c = d === void 0 ? {} : d; return ma({ type: "counter", content: t }, function () { return L("beforeDOMElementCreation", { content: t, params: e }), Pi({ content: t.toString(), title: o, extra: { attributes: u, styles: c, classes: ["".concat(m.cssPrefix, "-layers-counter")].concat(z(s)) } }); }); } }; } }, qi = { mixout: function () { return { text: function (t) { var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = e.transform, o = r === void 0 ? E : r, i = e.classes, s = i === void 0 ? [] : i, f = e.attributes, u = f === void 0 ? {} : f, d = e.styles, c = d === void 0 ? {} : d; return ma({ type: "text", content: t }, function () { return L("beforeDOMElementCreation", { content: t, params: e }), mn({ content: t, transform: l(l({}, E), o), extra: { attributes: u, styles: c, classes: ["".concat(m.cssPrefix, "-layers-text")].concat(z(s)) } }); }); } }; }, provides: function (n) { n.generateLayersText = function (t, e) { var r = e.transform, o = e.extra, i = null, s = null; if (On) {
        var f = parseInt(getComputedStyle(t).fontSize, 10), u = t.getBoundingClientRect();
        i = u.width / f, s = u.height / f;
    } return Promise.resolve([t, mn({ content: t.innerHTML, width: i, height: s, transform: r, extra: o, watchable: !0 })]); }; } }, Ct = new RegExp('"', "ug"), yn = [1105920, 1112319], xn = l(l(l(l({}, { FontAwesome: { normal: "fas", 400: "fas" } }), ye), $r), Ee), Ta = Object.keys(xn).reduce(function (a, n) { return a[n.toLowerCase()] = xn[n], a; }, {}), Ji = Object.keys(Ta).reduce(function (a, n) { var t = Ta[n]; return a[n] = t[900] || z(Object.entries(t))[0][1], a; }, {});
function Ki(a) { var n = a.replace(Ct, ""); return pt(z(n)[0] || ""); }
function Qi(a) { var n = a.getPropertyValue("font-feature-settings").includes("ss01"), t = a.getPropertyValue("content"), e = t.replace(Ct, ""), r = e.codePointAt(0), o = r >= yn[0] && r <= yn[1], i = e.length === 2 ? e[0] === e[1] : !1; return o || i || n; }
function Zi(a, n) { var t = a.replace(/^['"]|['"]$/g, "").toLowerCase(), e = parseInt(n), r = isNaN(e) ? "normal" : e; return (Ta[t] || {})[r] || Ji[t]; }
function wn(a, n) {
    var t = "".concat(Mr).concat(n.replace(":", "-"));
    return new Promise(function (e, r) {
        if (a.getAttribute(t) !== null)
            return e();
        var o = X(a.children), i = o.filter(function (da) { return da.getAttribute(Aa) === n; })[0], s = T.getComputedStyle(a, n), f = s.getPropertyValue("font-family"), u = f.match(Ur), d = s.getPropertyValue("font-weight"), c = s.getPropertyValue("content");
        if (i && !u)
            return a.removeChild(i), e();
        if (u && c !== "none" && c !== "") {
            var p = s.getPropertyValue("content"), v = Zi(f, d), y = Ki(p), h = u[0].startsWith("FontAwesome"), S = Qi(s), x = Ya(v, y), A = x;
            if (h) {
                var I = li(y);
                I.iconName && I.prefix && (x = I.iconName, v = I.prefix);
            }
            if (x && !S && (!i || i.getAttribute(Ma) !== v || i.getAttribute(Da) !== A)) {
                a.setAttribute(t, A), i && a.removeChild(i);
                var R = Ri(), F = R.extra;
                F.attributes[Aa] = n, ja(x, v).then(function (da) {
                    var Nt = Xa(l(l({}, R), {}, { icons: { main: da, mask: It() }, prefix: v, iconName: A, extra: F, watchable: !0 })), ga = b.createElementNS("http://www.w3.org/2000/svg", "svg");
                    n === "::before" ? a.insertBefore(ga, a.firstChild) : a.appendChild(ga), ga.outerHTML = Nt.map(function (Tt) { return K(Tt); }).join(`
`), a.removeAttribute(t), e();
                }).catch(r);
            }
            else
                e();
        }
        else
            e();
    });
}
function ao(a) { return Promise.all([wn(a, "::before"), wn(a, "::after")]); }
function no(a) { return a.parentNode !== document.head && !~Lr.indexOf(a.tagName.toUpperCase()) && !a.getAttribute(Aa) && (!a.parentNode || a.parentNode.tagName !== "svg"); }
var to = function (n) { return !!n && st.some(function (t) { return n.includes(t); }); }, eo = function (n) { if (!n)
    return []; var t = new Set, e = n.split(/,(?![^()]*\))/).map(function (f) { return f.trim(); }); e = e.flatMap(function (f) { return f.includes("(") ? f : f.split(",").map(function (u) { return u.trim(); }); }); var r = ta(e), o; try {
    for (r.s(); !(o = r.n()).done;) {
        var i = o.value;
        if (to(i)) {
            var s = st.reduce(function (f, u) { return f.replace(u, ""); }, i);
            s !== "" && s !== "*" && t.add(s);
        }
    }
}
catch (f) {
    r.e(f);
}
finally {
    r.f();
} return t; };
function Sn(a) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (C) {
        var t;
        if (n)
            t = a;
        else if (m.searchPseudoElementsFullScan)
            t = a.querySelectorAll("*");
        else {
            var e = new Set, r = ta(document.styleSheets), o;
            try {
                for (r.s(); !(o = r.n()).done;) {
                    var i = o.value;
                    try {
                        var s = ta(i.cssRules), f;
                        try {
                            for (s.s(); !(f = s.n()).done;) {
                                var u = f.value, d = eo(u.selectorText), c = ta(d), p;
                                try {
                                    for (c.s(); !(p = c.n()).done;) {
                                        var v = p.value;
                                        e.add(v);
                                    }
                                }
                                catch (h) {
                                    c.e(h);
                                }
                                finally {
                                    c.f();
                                }
                            }
                        }
                        catch (h) {
                            s.e(h);
                        }
                        finally {
                            s.f();
                        }
                    }
                    catch (h) {
                        m.searchPseudoElementsWarnings && console.warn("Font Awesome: cannot parse stylesheet: ".concat(i.href, " (").concat(h.message, `)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`));
                    }
                }
            }
            catch (h) {
                r.e(h);
            }
            finally {
                r.f();
            }
            if (!e.size)
                return;
            var y = Array.from(e).join(", ");
            try {
                t = a.querySelectorAll(y);
            }
            catch { }
        }
        return new Promise(function (h, S) { var x = X(t).filter(no).map(ao), A = Ha.begin("searchPseudoElements"); Ot(), Promise.all(x).then(function () { A(), Na(), h(); }).catch(function () { A(), Na(), S(); }); });
    }
}
var ro = { hooks: function () { return { mutationObserverCallbacks: function (t) { return t.pseudoElementsCallback = Sn, t; } }; }, provides: function (n) { n.pseudoElements2svg = function (t) { var e = t.node, r = e === void 0 ? b : e; m.searchPseudoElements && Sn(r); }; } }, An = !1, io = { mixout: function () { return { dom: { unwatch: function () { Ot(), An = !0; } } }; }, hooks: function () { return { bootstrap: function () { pn(Ea("mutationObserverCallbacks", {})); }, noAuto: function () { $i(); }, watch: function (t) { var e = t.observeMutationsRoot; An ? Na() : pn(Ea("mutationObserverCallbacks", { observeMutationsRoot: e })); } }; } }, kn = function (n) { var t = { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 }; return n.toLowerCase().split(" ").reduce(function (e, r) { var o = r.toLowerCase().split("-"), i = o[0], s = o.slice(1).join("-"); if (i && s === "h")
    return e.flipX = !0, e; if (i && s === "v")
    return e.flipY = !0, e; if (s = parseFloat(s), isNaN(s))
    return e; switch (i) {
    case "grow":
        e.size = e.size + s;
        break;
    case "shrink":
        e.size = e.size - s;
        break;
    case "left":
        e.x = e.x - s;
        break;
    case "right":
        e.x = e.x + s;
        break;
    case "up":
        e.y = e.y - s;
        break;
    case "down":
        e.y = e.y + s;
        break;
    case "rotate":
        e.rotate = e.rotate + s;
        break;
} return e; }, t); }, oo = { mixout: function () { return { parse: { transform: function (t) { return kn(t); } } }; }, hooks: function () { return { parseNodeAttributes: function (t, e) { var r = e.getAttribute("data-fa-transform"); return r && (t.transform = kn(r)), t; } }; }, provides: function (n) { n.generateAbstractTransformGrouping = function (t) { var e = t.main, r = t.transform, o = t.containerWidth, i = t.iconWidth, s = { transform: "translate(".concat(o / 2, " 256)") }, f = "translate(".concat(r.x * 32, ", ").concat(r.y * 32, ") "), u = "scale(".concat(r.size / 16 * (r.flipX ? -1 : 1), ", ").concat(r.size / 16 * (r.flipY ? -1 : 1), ") "), d = "rotate(".concat(r.rotate, " 0 0)"), c = { transform: "".concat(f, " ").concat(u, " ").concat(d) }, p = { transform: "translate(".concat(i / 2 * -1, " -256)") }, v = { outer: s, inner: c, path: p }; return { tag: "g", attributes: l({}, v.outer), children: [{ tag: "g", attributes: l({}, v.inner), children: [{ tag: e.icon.tag, children: e.icon.children, attributes: l(l({}, e.icon.attributes), v.path) }] }] }; }; } }, ya = { x: 0, y: 0, width: "100%", height: "100%" };
function In(a) { var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0; return a.attributes && (a.attributes.fill || n) && (a.attributes.fill = "black"), a; }
function so(a) { return a.tag === "g" ? a.children : [a]; }
var fo = { hooks: function () { return { parseNodeAttributes: function (t, e) { var r = e.getAttribute("data-fa-mask"), o = r ? ca(r.split(" ").map(function (i) { return i.trim(); })) : It(); return o.prefix || (o.prefix = _()), t.mask = o, t.maskId = e.getAttribute("data-fa-mask-id"), t; } }; }, provides: function (n) { n.generateAbstractMask = function (t) { var e = t.children, r = t.attributes, o = t.main, i = t.mask, s = t.maskId, f = t.transform, u = o.width, d = o.icon, c = i.width, p = i.icon, v = Qr({ transform: f, containerWidth: c, iconWidth: u }), y = { tag: "rect", attributes: l(l({}, ya), {}, { fill: "white" }) }, h = d.children ? { children: d.children.map(In) } : {}, S = { tag: "g", attributes: l({}, v.inner), children: [In(l({ tag: d.tag, attributes: l(l({}, d.attributes), v.path) }, h))] }, x = { tag: "g", attributes: l({}, v.outer), children: [S] }, A = "mask-".concat(s || rn()), I = "clip-".concat(s || rn()), R = { tag: "mask", attributes: l(l({}, ya), {}, { id: A, maskUnits: "userSpaceOnUse", maskContentUnits: "userSpaceOnUse" }), children: [y, x] }, F = { tag: "defs", children: [{ tag: "clipPath", attributes: { id: I }, children: so(p) }, R] }; return e.push(F, { tag: "rect", attributes: l({ fill: "currentColor", "clip-path": "url(#".concat(I, ")"), mask: "url(#".concat(A, ")") }, ya) }), { children: e, attributes: r }; }; } }, lo = { provides: function (n) { var t = !1; T.matchMedia && (t = T.matchMedia("(prefers-reduced-motion: reduce)").matches), n.missingIconAbstract = function () { var e = [], r = { fill: "currentColor" }, o = { attributeType: "XML", repeatCount: "indefinite", dur: "2s" }; e.push({ tag: "path", attributes: l(l({}, r), {}, { d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z" }) }); var i = l(l({}, o), {}, { attributeName: "opacity" }), s = { tag: "circle", attributes: l(l({}, r), {}, { cx: "256", cy: "364", r: "28" }), children: [] }; return t || s.children.push({ tag: "animate", attributes: l(l({}, o), {}, { attributeName: "r", values: "28;14;28;28;14;28;" }) }, { tag: "animate", attributes: l(l({}, i), {}, { values: "1;0;1;1;0;1;" }) }), e.push(s), e.push({ tag: "path", attributes: l(l({}, r), {}, { opacity: "1", d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z" }), children: t ? [] : [{ tag: "animate", attributes: l(l({}, i), {}, { values: "1;0;0;0;0;1;" }) }] }), t || e.push({ tag: "path", attributes: l(l({}, r), {}, { opacity: "0", d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z" }), children: [{ tag: "animate", attributes: l(l({}, i), {}, { values: "0;0;1;1;0;0;" }) }] }), { tag: "g", attributes: { class: "missing" }, children: e }; }; } }, uo = { hooks: function () { return { parseNodeAttributes: function (t, e) { var r = e.getAttribute("data-fa-symbol"), o = r === null ? !1 : r === "" ? !0 : r; return t.symbol = o, t; } }; } }, co = [ni, Gi, Vi, Bi, qi, ro, io, oo, fo, lo, uo];
hi(co, { mixoutsTo: k });
var xo = k.noAuto, wo = k.config, So = k.library, Ao = k.dom, ko = k.parse, Io = k.findIconDefinition, Po = k.toHtml, zo = k.icon, Eo = k.layer, Fo = k.text, Oo = k.counter;
export { k as api, wo as config, Oo as counter, Ao as dom, Io as findIconDefinition, zo as icon, Eo as layer, So as library, xo as noAuto, ko as parse, Fo as text, Po as toHtml };
/*! Bundled license information:

@fortawesome/fontawesome-svg-core/index.mjs:
  (*!
   * Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com
   * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
   * Copyright 2026 Fonticons, Inc.
   *)
*/
