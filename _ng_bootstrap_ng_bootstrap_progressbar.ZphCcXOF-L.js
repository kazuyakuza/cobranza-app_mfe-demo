import { d as s, f as o } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as e from "@angular/core";
import { inject as r } from "@angular/core";
import { PercentPipe as p } from "@angular/common";
var l = ["*"];
function c(t, _) { if (t & 1 && (e.\u0275\u0275domElementStart(0, "span"), e.\u0275\u0275i18n(1, 0), e.\u0275\u0275pipe(2, "percent"), e.\u0275\u0275domElementEnd()), t & 2) {
    let a = e.\u0275\u0275nextContext();
    e.\u0275\u0275advance(2), e.\u0275\u0275i18nExp(e.\u0275\u0275pipeBind1(2, 1, a.getValue() / a.max)), e.\u0275\u0275i18nApply(1);
} }
var d = (() => { class t {
    constructor() { this.max = 100, this.animated = !1, this.ariaLabel = "progress bar", this.striped = !1, this.showValue = !1; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = e.\u0275\u0275defineService({ token: t, factory: t.\u0275fac }); }
} return t; })(), y = (() => { class t {
    set max(a) { this._max = !o(a) || a <= 0 ? 100 : a; }
    get max() { return this._max; }
    constructor() { this._config = r(d), this.stacked = r(g, { optional: !0 }), this.animated = this._config.animated, this.ariaLabel = this._config.ariaLabel, this.striped = this._config.striped, this.showValue = this._config.showValue, this.textType = this._config.textType, this.type = this._config.type, this.value = 0, this.height = this._config.height, this.max = this._config.max; }
    getValue() { return s(this.value, this.max); }
    getPercentValue() { return 100 * this.getValue() / this.max; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275cmp = e.\u0275\u0275defineComponent({ type: t, selectors: [["ngb-progressbar"]], hostAttrs: ["role", "progressbar", "aria-valuemin", "0", 1, "progress"], hostVars: 7, hostBindings: function (n, i) { n & 2 && (e.\u0275\u0275attribute("aria-valuenow", i.getValue())("aria-valuemax", i.max)("aria-label", i.ariaLabel), e.\u0275\u0275styleProp("width", i.stacked ? i.getPercentValue() : null, "%")("height", i.height)); }, inputs: { max: "max", animated: "animated", ariaLabel: "ariaLabel", striped: "striped", showValue: "showValue", textType: "textType", type: "type", value: "value", height: "height" }, ngContentSelectors: l, decls: 3, vars: 11, consts: () => { let a; return typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? a = goog.getMsg("{$interpolation}", { interpolation: "\uFFFD0\uFFFD" }, { original_code: { interpolation: "{{ getValue() / max | percent }}" } }) : a = $localize `:@@ngb.progressbar.value:${"\uFFFD0\uFFFD"}:INTERPOLATION:`, [a]; }, template: function (n, i) { n & 1 && (e.\u0275\u0275projectionDef(), e.\u0275\u0275domElementStart(0, "div"), e.\u0275\u0275conditionalCreate(1, c, 3, 3, "span"), e.\u0275\u0275projection(2), e.\u0275\u0275domElementEnd()), n & 2 && (e.\u0275\u0275classMap(e.\u0275\u0275interpolate2("progress-bar", i.type ? i.textType ? " bg-" + i.type : " text-bg-" + i.type : "", "", i.textType ? " text-" + i.textType : "")), e.\u0275\u0275styleProp("width", i.stacked ? null : i.getPercentValue(), "%"), e.\u0275\u0275classProp("progress-bar-animated", i.animated)("progress-bar-striped", i.striped), e.\u0275\u0275advance(), e.\u0275\u0275conditional(i.showValue ? 1 : -1)); }, dependencies: [p], encapsulation: 2 }); }
} return t; })(), g = (() => { class t {
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275cmp = e.\u0275\u0275defineComponent({ type: t, selectors: [["ngb-progressbar-stacked"]], hostAttrs: [1, "progress-stacked"], ngContentSelectors: l, decls: 1, vars: 0, template: function (n, i) { n & 1 && (e.\u0275\u0275projectionDef(), e.\u0275\u0275projection(0)); }, encapsulation: 2 }); }
} return t; })(), N = (() => { class t {
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275mod = e.\u0275\u0275defineNgModule({ type: t }); }
    static { this.\u0275inj = e.\u0275\u0275defineInjector({}); }
} return t; })();
export { y as NgbProgressbar, d as NgbProgressbarConfig, N as NgbProgressbarModule, g as NgbProgressbarStacked };
