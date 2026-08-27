import { o as r } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as t from "@angular/core";
import { inject as s, ElementRef as a, NgZone as l, EventEmitter as _ } from "@angular/core";
import { NgbConfig as c } from "@ng-bootstrap/ng-bootstrap/config";
var d = ["*"];
function m(e, f) { if (e & 1) {
    let i = t.\u0275\u0275getCurrentView();
    t.\u0275\u0275domElementStart(0, "button", 1), t.\u0275\u0275domListener("click", function () { t.\u0275\u0275restoreView(i); let o = t.\u0275\u0275nextContext(); return t.\u0275\u0275resetView(o.close()); }), t.\u0275\u0275domElementEnd();
} }
var u = (() => { class e {
    constructor() { this._ngbConfig = s(c), this.dismissible = !0, this.type = "warning"; }
    get animation() { return this._animation ?? this._ngbConfig.animation; }
    set animation(i) { this._animation = i; }
    static { this.\u0275fac = function (n) { return new (n || e); }; }
    static { this.\u0275prov = t.\u0275\u0275defineService({ token: e, factory: e.\u0275fac }); }
} return e; })(), g = ({ classList: e }) => { e.remove("show"); }, T = (() => {
    class e {
        constructor() { this._config = s(u), this._elementRef = s(a), this._zone = s(l), this.animation = this._config.animation, this.dismissible = this._config.dismissible, this.type = this._config.type, this.closed = new _; }
        close() { let i = r(this._zone, this._elementRef.nativeElement, g, { animation: this.animation, runningTransition: "continue" }); return i.subscribe(() => this.closed.emit()), i; }
        static { this.\u0275fac = function (n) { return new (n || e); }; }
        static {
            this.\u0275cmp = t.\u0275\u0275defineComponent({ type: e, selectors: [["ngb-alert"]], hostAttrs: ["role", "alert"], hostVars: 6, hostBindings: function (n, o) { n & 2 && (t.\u0275\u0275classMap("alert show" + (o.type ? " alert-" + o.type : "")), t.\u0275\u0275classProp("fade", o.animation)("alert-dismissible", o.dismissible)); }, inputs: { animation: "animation", dismissible: "dismissible", type: "type" }, outputs: { closed: "closed" }, exportAs: ["ngbAlert"], ngContentSelectors: d, decls: 2, vars: 1, consts: () => { let i; return typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? i = goog.getMsg("Close") : i = $localize `:@@ngb.alert.close:Close`, [["type", "button", "aria-label", i, 1, "btn-close"], ["type", "button", "aria-label", i, 1, "btn-close", 3, "click"]]; }, template: function (n, o) { n & 1 && (t.\u0275\u0275projectionDef(), t.\u0275\u0275projection(0), t.\u0275\u0275conditionalCreate(1, m, 1, 0, "button", 0)), n & 2 && (t.\u0275\u0275advance(), t.\u0275\u0275conditional(o.dismissible ? 1 : -1)); }, styles: [`ngb-alert{display:block}
`], encapsulation: 2 });
        }
    }
    return e;
})(), y = (() => { class e {
    static { this.\u0275fac = function (n) { return new (n || e); }; }
    static { this.\u0275mod = t.\u0275\u0275defineNgModule({ type: e }); }
    static { this.\u0275inj = t.\u0275\u0275defineInjector({}); }
} return e; })();
export { T as NgbAlert, u as NgbAlertConfig, y as NgbAlertModule };
