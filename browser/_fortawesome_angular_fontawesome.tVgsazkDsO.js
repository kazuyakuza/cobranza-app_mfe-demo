import { a as v, b } from "@nf-internal/chunk-PZNONLPT";
import * as o from "@angular/core";
import { input as s, effect as T, computed as u, model as d, inject as a, CSP_NONCE as p, DOCUMENT as g } from "@angular/core";
import { DomSanitizer as D } from "@angular/platform-browser";
import { config as W, dom as O, icon as S, parse as x, counter as H, text as A } from "@fortawesome/fontawesome-svg-core";
var k = ["*"], h = (() => { class e {
    defaultPrefix = "fas";
    fallbackIcon = null;
    fixedWidth;
    set autoAddCss(n) { W.autoAddCss = n, this._autoAddCss = n; }
    get autoAddCss() { return this._autoAddCss; }
    _autoAddCss = !0;
    static \u0275fac = function (t) { return new (t || e); };
    static \u0275prov = o.\u0275\u0275defineInjectable({ token: e, factory: e.\u0275fac, providedIn: "root" });
} return e; })(), P = (() => { class e {
    definitions = {};
    addIcons(...n) { for (let t of n) {
        t.prefix in this.definitions || (this.definitions[t.prefix] = {}), this.definitions[t.prefix][t.iconName] = t;
        for (let i of t.icon[2])
            typeof i == "string" && (this.definitions[t.prefix][i] = t);
    } }
    addIconPacks(...n) { for (let t of n) {
        let i = Object.keys(t).map(r => t[r]);
        this.addIcons(...i);
    } }
    getIconDefinition(n, t) { return n in this.definitions && t in this.definitions[n] ? this.definitions[n][t] : null; }
    static \u0275fac = function (t) { return new (t || e); };
    static \u0275prov = o.\u0275\u0275defineInjectable({ token: e, factory: e.\u0275fac, providedIn: "root" });
} return e; })(), $ = e => { throw new Error(`Could not find icon with iconName=${e.iconName} and prefix=${e.prefix} in the icon library.`); }, j = () => { throw new Error("Property `icon` is required for `fa-icon`/`fa-duotone-icon` components."); }, M = e => e != null && (e === 90 || e === 180 || e === 270 || e === "90" || e === "180" || e === "270"), w = e => { let c = M(e.rotate), n = { [`fa-${e.animation}`]: e.animation != null && !e.animation.startsWith("spin"), "fa-spin": e.animation === "spin" || e.animation === "spin-reverse", "fa-spin-pulse": e.animation === "spin-pulse" || e.animation === "spin-pulse-reverse", "fa-spin-reverse": e.animation === "spin-reverse" || e.animation === "spin-pulse-reverse", "fa-pulse": e.animation === "spin-pulse" || e.animation === "spin-pulse-reverse", "fa-fw": e.fixedWidth, "fa-border": e.border, "fa-inverse": e.inverse, "fa-layers-counter": e.counter, "fa-flip-horizontal": e.flip === "horizontal" || e.flip === "both", "fa-flip-vertical": e.flip === "vertical" || e.flip === "both", [`fa-${e.size}`]: e.size != null, [`fa-rotate-${e.rotate}`]: c, "fa-rotate-by": e.rotate != null && !c, [`fa-pull-${e.pull}`]: e.pull != null, [`fa-stack-${e.stackItemSize}`]: e.stackItemSize != null }; return Object.keys(n).map(t => n[t] ? t : null).filter(t => t != null); }, C = new WeakSet, I = "fa-auto-css";
function y(e, c, n) { if (!c.autoAddCss || C.has(e))
    return; if (e.getElementById(I) != null) {
    c.autoAddCss = !1, C.add(e);
    return;
} let t = e.createElement("style"); t.setAttribute("type", "text/css"), t.setAttribute("id", I), n && t.setAttribute("nonce", n), t.innerHTML = O.css(); let i = e.head.childNodes, r = null; for (let f = i.length - 1; f > -1; f--) {
    let l = i[f], m = l.nodeName.toUpperCase();
    ["STYLE", "LINK"].indexOf(m) > -1 && (r = l);
} e.head.insertBefore(t, r), c.autoAddCss = !1, C.add(e); }
var B = e => e.prefix !== void 0 && e.iconName !== void 0, E = (e, c) => B(e) ? e : Array.isArray(e) && e.length === 2 ? { prefix: e[0], iconName: e[1] } : { prefix: c, iconName: e }, R = (() => { class e {
    stackItemSize = s("1x");
    size = s();
    _effect = T(() => { if (this.size())
        throw new Error('fa-icon is not allowed to customize size when used inside fa-stack. Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.'); });
    static \u0275fac = function (t) { return new (t || e); };
    static \u0275dir = o.\u0275\u0275defineDirective({ type: e, selectors: [["fa-icon", "stackItemSize", ""], ["fa-duotone-icon", "stackItemSize", ""]], inputs: { stackItemSize: [1, "stackItemSize"], size: [1, "size"] } });
} return e; })(), V = (() => { class e {
    size = s();
    classes = u(() => { let n = this.size(), t = n ? { [`fa-${n}`]: !0 } : {}; return b(v({}, t), { "fa-stack": !0 }); });
    static \u0275fac = function (t) { return new (t || e); };
    static \u0275cmp = o.\u0275\u0275defineComponent({ type: e, selectors: [["fa-stack"]], hostVars: 2, hostBindings: function (t, i) { t & 2 && o.\u0275\u0275classMap(i.classes()); }, inputs: { size: [1, "size"] }, ngContentSelectors: k, decls: 1, vars: 0, template: function (t, i) { t & 1 && (o.\u0275\u0275projectionDef(), o.\u0275\u0275projection(0)); }, encapsulation: 2 });
} return e; })(), _ = (() => {
    class e {
        icon = d();
        title = d();
        animation = d();
        mask = d();
        flip = d();
        size = d();
        pull = d();
        border = d();
        inverse = d();
        symbol = d();
        rotate = d();
        fixedWidth = d();
        transform = d();
        a11yRole = d();
        renderedIconHTML = u(() => {
            let n = this.icon() ?? this.config.fallbackIcon;
            if (!n)
                return j(), "";
            let t = this.findIconDefinition(n);
            if (!t)
                return "";
            let i = this.buildParams();
            y(this.document, this.config, this.cspNonce);
            let r = S(t, i);
            return this.sanitizer.bypassSecurityTrustHtml(r.html.join(`
`));
        });
        cspNonce = a(p);
        document = a(g);
        sanitizer = a(D);
        config = a(h);
        iconLibrary = a(P);
        stackItem = a(R, { optional: !0 });
        stack = a(V, { optional: !0 });
        constructor() { this.stack != null && this.stackItem == null && console.error('FontAwesome: fa-icon and fa-duotone-icon elements must specify stackItemSize attribute when wrapped into fa-stack. Example: <fa-icon stackItemSize="2x" />.'); }
        findIconDefinition(n) { let t = E(n, this.config.defaultPrefix); if ("icon" in t)
            return t; let i = this.iconLibrary.getIconDefinition(t.prefix, t.iconName); return i ?? ($(t), null); }
        buildParams() { let n = this.fixedWidth(), t = { flip: this.flip(), animation: this.animation(), border: this.border(), inverse: this.inverse(), size: this.size(), pull: this.pull(), rotate: this.rotate(), fixedWidth: typeof n == "boolean" ? n : this.config.fixedWidth, stackItemSize: this.stackItem != null ? this.stackItem.stackItemSize() : void 0 }, i = this.transform(), r = typeof i == "string" ? x.transform(i) : i, f = this.mask(), l = f != null ? this.findIconDefinition(f) : null, m = {}, N = this.a11yRole(); N != null && (m.role = N); let z = {}; return t.rotate != null && !M(t.rotate) && (z["--fa-rotate-angle"] = `${t.rotate}`), { title: this.title(), transform: r, classes: w(t), mask: l ?? void 0, symbol: this.symbol(), attributes: m, styles: z }; }
        static \u0275fac = function (t) { return new (t || e); };
        static \u0275cmp = o.\u0275\u0275defineComponent({ type: e, selectors: [["fa-icon"]], hostAttrs: [1, "ng-fa-icon"], hostVars: 2, hostBindings: function (t, i) { t & 2 && (o.\u0275\u0275domProperty("innerHTML", i.renderedIconHTML(), o.\u0275\u0275sanitizeHtml), o.\u0275\u0275attribute("title", i.title() ?? void 0)); }, inputs: { icon: [1, "icon"], title: [1, "title"], animation: [1, "animation"], mask: [1, "mask"], flip: [1, "flip"], size: [1, "size"], pull: [1, "pull"], border: [1, "border"], inverse: [1, "inverse"], symbol: [1, "symbol"], rotate: [1, "rotate"], fixedWidth: [1, "fixedWidth"], transform: [1, "transform"], a11yRole: [1, "a11yRole"] }, outputs: { icon: "iconChange", title: "titleChange", animation: "animationChange", mask: "maskChange", flip: "flipChange", size: "sizeChange", pull: "pullChange", border: "borderChange", inverse: "inverseChange", symbol: "symbolChange", rotate: "rotateChange", fixedWidth: "fixedWidthChange", transform: "transformChange", a11yRole: "a11yRoleChange" }, decls: 0, vars: 0, template: function (t, i) { }, encapsulation: 2 });
    }
    return e;
})(), Z = (() => { class e extends _ {
    swapOpacity = s();
    primaryOpacity = s();
    secondaryOpacity = s();
    primaryColor = s();
    secondaryColor = s();
    findIconDefinition(n) { let t = super.findIconDefinition(n); if (t != null && !Array.isArray(t.icon[4]))
        throw new Error(`The specified icon does not appear to be a Duotone icon. Check that you specified the correct style: <fa-duotone-icon [icon]="['fad', '${t.iconName}']" /> or use: <fa-icon icon="${t.iconName}" /> instead.`); return t; }
    buildParams() { let n = super.buildParams(), t = this.swapOpacity(); (t === !0 || t === "true") && (Array.isArray(n.classes) ? n.classes.push("fa-swap-opacity") : typeof n.classes == "string" ? n.classes = [n.classes, "fa-swap-opacity"] : n.classes = ["fa-swap-opacity"]), n.styles == null && (n.styles = {}); let i = this.primaryOpacity(); i != null && (n.styles["--fa-primary-opacity"] = i.toString()); let r = this.secondaryOpacity(); r != null && (n.styles["--fa-secondary-opacity"] = r.toString()); let f = this.primaryColor(); f != null && (n.styles["--fa-primary-color"] = f); let l = this.secondaryColor(); return l != null && (n.styles["--fa-secondary-color"] = l), n; }
    static \u0275fac = (() => { let n; return function (i) { return (n || (n = o.\u0275\u0275getInheritedFactory(e)))(i || e); }; })();
    static \u0275cmp = o.\u0275\u0275defineComponent({ type: e, selectors: [["fa-duotone-icon"]], inputs: { swapOpacity: [1, "swapOpacity"], primaryOpacity: [1, "primaryOpacity"], secondaryOpacity: [1, "secondaryOpacity"], primaryColor: [1, "primaryColor"], secondaryColor: [1, "secondaryColor"] }, features: [o.\u0275\u0275InheritDefinitionFeature], decls: 0, vars: 0, template: function (t, i) { }, encapsulation: 2 });
} return e; })(), F = (e, c, n) => { if (!e)
    throw new Error(`${n} should be used as child of ${c} only.`); }, L = (() => { class e {
    size = s();
    fixedWidth = s();
    faFw = u(() => { let n = this.fixedWidth(); return typeof n == "boolean" ? n : this.config.fixedWidth; });
    classes = u(() => { let n = this.size(), t = n ? { [`fa-${n}`]: !0 } : {}; return b(v({}, t), { "fa-fw": this.faFw(), "fa-layers": !0 }); });
    cspNonce = a(p);
    document = a(g);
    config = a(h);
    ngOnInit() { y(this.document, this.config, this.cspNonce); }
    static \u0275fac = function (t) { return new (t || e); };
    static \u0275cmp = o.\u0275\u0275defineComponent({ type: e, selectors: [["fa-layers"]], hostVars: 2, hostBindings: function (t, i) { t & 2 && o.\u0275\u0275classMap(i.classes()); }, inputs: { size: [1, "size"], fixedWidth: [1, "fixedWidth"] }, ngContentSelectors: k, decls: 1, vars: 0, template: function (t, i) { t & 1 && (o.\u0275\u0275projectionDef(), o.\u0275\u0275projection(0)); }, encapsulation: 2 });
} return e; })(), ee = (() => { class e {
    content = s.required();
    title = s();
    position = s();
    renderedHTML = u(() => { let n = this.buildParams(); return this.updateContent(n); });
    cspNonce = a(p);
    document = a(g);
    config = a(h);
    parent = a(L, { optional: !0 });
    sanitizer = a(D);
    constructor() { F(this.parent, "FaLayersComponent", "FaLayersCounterComponent"); }
    buildParams() { let n = this.position(); return { title: this.title(), classes: n != null ? [`fa-layers-${n}`] : void 0 }; }
    updateContent(n) { return y(this.document, this.config, this.cspNonce), this.sanitizer.bypassSecurityTrustHtml(H(this.content() || "", n).html.join("")); }
    static \u0275fac = function (t) { return new (t || e); };
    static \u0275cmp = o.\u0275\u0275defineComponent({ type: e, selectors: [["fa-layers-counter"]], hostAttrs: [1, "ng-fa-layers-counter"], hostVars: 1, hostBindings: function (t, i) { t & 2 && o.\u0275\u0275domProperty("innerHTML", i.renderedHTML(), o.\u0275\u0275sanitizeHtml); }, inputs: { content: [1, "content"], title: [1, "title"], position: [1, "position"] }, decls: 0, vars: 0, template: function (t, i) { }, encapsulation: 2 });
} return e; })(), te = (() => {
    class e {
        content = s.required();
        title = s();
        flip = s();
        size = s();
        pull = s();
        border = s();
        inverse = s();
        rotate = s();
        fixedWidth = s();
        transform = s();
        renderedHTML = u(() => { let n = this.buildParams(); return this.updateContent(n); });
        cspNonce = a(p);
        document = a(g);
        config = a(h);
        parent = a(L, { optional: !0 });
        sanitizer = a(D);
        constructor() { F(this.parent, "FaLayersComponent", "FaLayersTextComponent"); }
        buildParams() { let n = { flip: this.flip(), border: this.border(), inverse: this.inverse(), size: this.size(), pull: this.pull(), rotate: this.rotate(), fixedWidth: this.fixedWidth() }, t = this.transform(), i = typeof t == "string" ? x.transform(t) : t, r = {}; return n.rotate != null && !M(n.rotate) && (r["--fa-rotate-angle"] = `${n.rotate}`), { transform: i, classes: w(n), title: this.title(), styles: r }; }
        updateContent(n) {
            return y(this.document, this.config, this.cspNonce), this.sanitizer.bypassSecurityTrustHtml(A(this.content() || "", n).html.join(`
`));
        }
        static \u0275fac = function (t) { return new (t || e); };
        static \u0275cmp = o.\u0275\u0275defineComponent({ type: e, selectors: [["fa-layers-text"]], hostAttrs: [1, "ng-fa-layers-text"], hostVars: 1, hostBindings: function (t, i) { t & 2 && o.\u0275\u0275domProperty("innerHTML", i.renderedHTML(), o.\u0275\u0275sanitizeHtml); }, inputs: { content: [1, "content"], title: [1, "title"], flip: [1, "flip"], size: [1, "size"], pull: [1, "pull"], border: [1, "border"], inverse: [1, "inverse"], rotate: [1, "rotate"], fixedWidth: [1, "fixedWidth"], transform: [1, "transform"] }, decls: 0, vars: 0, template: function (t, i) { }, encapsulation: 2 });
    }
    return e;
})(), ne = (() => { class e {
    static \u0275fac = function (t) { return new (t || e); };
    static \u0275mod = o.\u0275\u0275defineNgModule({ type: e });
    static \u0275inj = o.\u0275\u0275defineInjector({});
} return e; })();
export { h as FaConfig, Z as FaDuotoneIconComponent, _ as FaIconComponent, P as FaIconLibrary, L as FaLayersComponent, ee as FaLayersCounterComponent, te as FaLayersTextComponent, V as FaStackComponent, R as FaStackItemSizeDirective, ne as FontAwesomeModule };
