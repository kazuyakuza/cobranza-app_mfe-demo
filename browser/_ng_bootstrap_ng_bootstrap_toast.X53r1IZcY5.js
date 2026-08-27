import { l as d, o as r } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as t from "@angular/core";
import { inject as a, NgZone as h, Injector as u, ElementRef as m, EventEmitter as l, afterNextRender as g, TemplateRef as f } from "@angular/core";
import { NgbConfig as p } from "@ng-bootstrap/ng-bootstrap/config";
import { NgTemplateOutlet as T } from "@angular/common";
var O = ["*"];
function b(e, s) { if (e & 1 && (t.\u0275\u0275elementStart(0, "strong", 3), t.\u0275\u0275text(1), t.\u0275\u0275elementEnd()), e & 2) {
    let i = t.\u0275\u0275nextContext();
    t.\u0275\u0275advance(), t.\u0275\u0275textInterpolate(i.header);
} }
function v(e, s) { }
function N(e, s) { if (e & 1) {
    let i = t.\u0275\u0275getCurrentView();
    t.\u0275\u0275elementStart(0, "div", 1), t.\u0275\u0275template(1, v, 0, 0, "ng-template", 4), t.\u0275\u0275elementStart(2, "button", 5), t.\u0275\u0275listener("click", function () { t.\u0275\u0275restoreView(i); let o = t.\u0275\u0275nextContext(); return t.\u0275\u0275resetView(o.hide()); }), t.\u0275\u0275elementEnd()();
} if (e & 2) {
    let i = t.\u0275\u0275nextContext(), n = t.\u0275\u0275reference(1);
    t.\u0275\u0275advance(), t.\u0275\u0275property("ngTemplateOutlet", i.contentHeaderTpl || n);
} }
var M = (() => { class e {
    constructor() { this._ngbConfig = a(p), this.autohide = !0, this.delay = 5e3, this.ariaLive = "polite"; }
    get animation() { return this._animation ?? this._ngbConfig.animation; }
    set animation(i) { this._animation = i; }
    static { this.\u0275fac = function (n) { return new (n || e); }; }
    static { this.\u0275prov = t.\u0275\u0275defineService({ token: e, factory: e.\u0275fac }); }
} return e; })(), C = (e, s) => { let { classList: i } = e; if (s)
    i.add("fade");
else {
    i.add("show");
    return;
} return d(e), i.add("show", "showing"), () => { i.remove("showing"); }; }, y = ({ classList: e }) => (e.add("showing"), () => { e.remove("show", "showing"); }), E = (() => { class e {
    static { this.\u0275fac = function (n) { return new (n || e); }; }
    static { this.\u0275dir = t.\u0275\u0275defineDirective({ type: e, selectors: [["", "ngbToastHeader", ""]] }); }
} return e; })(), k = (() => {
    class e {
        constructor(i) { this.ariaLive = i, this._config = a(M), this._zone = a(h), this._injector = a(u), this._element = a(m), this.animation = this._config.animation, this.delay = this._config.delay, this.autohide = this._config.autohide, this.contentHeaderTpl = null, this.shown = new l, this.hidden = new l, this.ariaLive ??= this._config.ariaLive; }
        ngAfterContentInit() { g({ mixedReadWrite: () => { this._init(), this.show(); } }, { injector: this._injector }); }
        ngOnChanges(i) { "autohide" in i && (this._clearTimeout(), this._init()); }
        hide() { this._clearTimeout(); let i = r(this._zone, this._element.nativeElement, y, { animation: this.animation, runningTransition: "stop" }); return i.subscribe(() => { this.hidden.emit(); }), i; }
        show() { let i = r(this._zone, this._element.nativeElement, C, { animation: this.animation, runningTransition: "continue" }); return i.subscribe(() => { this.shown.emit(); }), i; }
        _init() { this.autohide && !this._timeoutID && (this._timeoutID = setTimeout(() => this.hide(), this.delay)); }
        _clearTimeout() { this._timeoutID && (clearTimeout(this._timeoutID), this._timeoutID = null); }
        static { this.\u0275fac = function (n) { return new (n || e)(t.\u0275\u0275injectAttribute("aria-live")); }; }
        static {
            this.\u0275cmp = t.\u0275\u0275defineComponent({ type: e, selectors: [["ngb-toast"]], contentQueries: function (n, o, _) { if (n & 1 && t.\u0275\u0275contentQuery(_, E, 7, f), n & 2) {
                    let c;
                    t.\u0275\u0275queryRefresh(c = t.\u0275\u0275loadQuery()) && (o.contentHeaderTpl = c.first);
                } }, hostAttrs: ["role", "alert", "aria-atomic", "true", 1, "toast"], hostVars: 3, hostBindings: function (n, o) { n & 2 && (t.\u0275\u0275attribute("aria-live", o.ariaLive), t.\u0275\u0275classProp("fade", o.animation)); }, inputs: { animation: "animation", delay: "delay", autohide: "autohide", header: "header" }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbToast"], features: [t.\u0275\u0275NgOnChangesFeature], ngContentSelectors: O, decls: 5, vars: 1, consts: () => { let i; return typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? i = goog.getMsg("Close") : i = $localize `:@@ngb.toast.close-aria:Close`, [["headerTpl", ""], [1, "toast-header"], [1, "toast-body"], [1, "me-auto"], [3, "ngTemplateOutlet"], ["type", "button", "aria-label", i, 1, "btn-close", 3, "click"]]; }, template: function (n, o) { n & 1 && (t.\u0275\u0275projectionDef(), t.\u0275\u0275template(0, b, 2, 1, "ng-template", null, 0, t.\u0275\u0275templateRefExtractor), t.\u0275\u0275conditionalCreate(2, N, 3, 1, "div", 1), t.\u0275\u0275elementStart(3, "div", 2), t.\u0275\u0275projection(4), t.\u0275\u0275elementEnd()), n & 2 && (t.\u0275\u0275advance(2), t.\u0275\u0275conditional(o.contentHeaderTpl || o.header ? 2 : -1)); }, dependencies: [T], styles: [`ngb-toast{display:block}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}
`], encapsulation: 2, changeDetection: 1 });
        }
    }
    return e;
})(), V = (() => { class e {
    static { this.\u0275fac = function (n) { return new (n || e); }; }
    static { this.\u0275mod = t.\u0275\u0275defineNgModule({ type: e }); }
    static { this.\u0275inj = t.\u0275\u0275defineInjector({}); }
} return e; })();
export { k as NgbToast, M as NgbToastConfig, E as NgbToastHeader, V as NgbToastModule };
