import { d as l } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as e from "@angular/core";
import { inject as h, ChangeDetectorRef as u, EventEmitter as d, TemplateRef as c, forwardRef as p } from "@angular/core";
import { NG_VALUE_ACCESSOR as f } from "@angular/forms";
import { NgTemplateOutlet as g } from "@angular/common";
function m(a, s) { if (a & 1 && e.\u0275\u0275text(0), a & 2) {
    let t = s.fill;
    e.\u0275\u0275textInterpolate(t === 100 ? "\u2605" : "\u2606");
} }
function _(a, s) { }
function x(a, s) { if (a & 1) {
    let t = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275elementStart(0, "span", 1), e.\u0275\u0275text(1), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(2, "span", 2), e.\u0275\u0275listener("mouseenter", function () { let n = e.\u0275\u0275restoreView(t).$index, r = e.\u0275\u0275nextContext(); return e.\u0275\u0275resetView(r.enter(n + 1)); })("click", function () { let n = e.\u0275\u0275restoreView(t).$index, r = e.\u0275\u0275nextContext(); return e.\u0275\u0275resetView(r.handleClick(n + 1)); }), e.\u0275\u0275template(3, _, 0, 0, "ng-template", 3), e.\u0275\u0275elementEnd();
} if (a & 2) {
    let t = s.$index, i = e.\u0275\u0275nextContext(), n = e.\u0275\u0275reference(1);
    e.\u0275\u0275advance(), e.\u0275\u0275textInterpolate1("(", t < i.nextRate ? "*" : " ", ")"), e.\u0275\u0275advance(), e.\u0275\u0275styleProp("cursor", i.isInteractive() ? "pointer" : "default"), e.\u0275\u0275advance(), e.\u0275\u0275property("ngTemplateOutlet", i.starTemplate || i.starTemplateFromContent || n)("ngTemplateOutletContext", i.contexts[t]);
} }
var b = (() => { class a {
    constructor() { this.max = 10, this.readonly = !1, this.resettable = !1, this.tabindex = 0; }
    static { this.\u0275fac = function (i) { return new (i || a); }; }
    static { this.\u0275prov = e.\u0275\u0275defineService({ token: a, factory: a.\u0275fac }); }
} return a; })(), F = (() => { class a {
    constructor() { this.contexts = [], this._config = h(b), this._changeDetectorRef = h(u), this.disabled = !1, this.max = this._config.max, this.readonly = this._config.readonly, this.resettable = this._config.resettable, this.tabindex = this._config.tabindex, this.hover = new d, this.leave = new d, this.rateChange = new d(!0), this.onChange = t => { }, this.onTouched = () => { }; }
    ariaValueText(t, i) { return `${t} out of ${i}`; }
    isInteractive() { return !this.readonly && !this.disabled; }
    enter(t) { this.isInteractive() && this._updateState(t), this.hover.emit(t); }
    handleBlur() { this.onTouched(); }
    handleClick(t) { this.isInteractive() && this.update(this.resettable && this.rate === t ? 0 : t); }
    handleKeyDown(t) { switch (t.key) {
        case "ArrowDown":
        case "ArrowLeft":
            this.update(this.rate - 1);
            break;
        case "ArrowUp":
        case "ArrowRight":
            this.update(this.rate + 1);
            break;
        case "Home":
            this.update(0);
            break;
        case "End":
            this.update(this.max);
            break;
        default: return;
    } t.preventDefault(); }
    ngOnChanges(t) { t.rate && this.update(this.rate), t.max && this._updateMax(); }
    ngOnInit() { this._setupContexts(), this._updateState(this.rate); }
    registerOnChange(t) { this.onChange = t; }
    registerOnTouched(t) { this.onTouched = t; }
    reset() { this.leave.emit(this.nextRate), this._updateState(this.rate); }
    setDisabledState(t) { this.disabled = t; }
    update(t, i = !0) { let n = l(t, this.max, 0); this.isInteractive() && this.rate !== n && (this.rate = n, this.rateChange.emit(this.rate)), i && (this.onChange(this.rate), this.onTouched()), this._updateState(this.rate); }
    writeValue(t) { this.update(t, !1), this._changeDetectorRef.markForCheck(); }
    _updateState(t) { this.nextRate = t, this.contexts.forEach((i, n) => i.fill = Math.round(l(t - n, 1, 0) * 100)); }
    _updateMax() { this.max > 0 && (this._setupContexts(), this.update(this.rate)); }
    _setupContexts() { this.contexts = Array.from({ length: this.max }, (t, i) => ({ fill: 0, index: i })); }
    static { this.\u0275fac = function (i) { return new (i || a); }; }
    static { this.\u0275cmp = e.\u0275\u0275defineComponent({ type: a, selectors: [["ngb-rating"]], contentQueries: function (i, n, r) { if (i & 1 && e.\u0275\u0275contentQuery(r, c, 5), i & 2) {
            let o;
            e.\u0275\u0275queryRefresh(o = e.\u0275\u0275loadQuery()) && (n.starTemplateFromContent = o.first);
        } }, hostAttrs: ["role", "slider", "aria-valuemin", "0", 1, "d-inline-flex"], hostVars: 6, hostBindings: function (i, n) { i & 1 && e.\u0275\u0275listener("blur", function () { return n.handleBlur(); })("keydown", function (o) { return n.handleKeyDown(o); })("mouseleave", function () { return n.reset(); }), i & 2 && (e.\u0275\u0275domProperty("tabIndex", n.disabled ? -1 : n.tabindex), e.\u0275\u0275attribute("aria-valuemax", n.max)("aria-valuenow", n.nextRate)("aria-valuetext", n.ariaValueText(n.nextRate, n.max))("aria-readonly", n.readonly && !n.disabled ? !0 : null)("aria-disabled", n.disabled ? !0 : null)); }, inputs: { disabled: "disabled", max: "max", rate: "rate", readonly: "readonly", resettable: "resettable", starTemplate: "starTemplate", tabindex: "tabindex", ariaValueText: "ariaValueText" }, outputs: { hover: "hover", leave: "leave", rateChange: "rateChange" }, features: [e.\u0275\u0275ProvidersFeature([{ provide: f, useExisting: p(() => a), multi: !0 }]), e.\u0275\u0275NgOnChangesFeature], decls: 4, vars: 0, consts: [["t", ""], [1, "visually-hidden"], [3, "mouseenter", "click"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function (i, n) { i & 1 && (e.\u0275\u0275template(0, m, 1, 1, "ng-template", null, 0, e.\u0275\u0275templateRefExtractor), e.\u0275\u0275repeaterCreate(2, x, 4, 5, null, null, e.\u0275\u0275repeaterTrackByIdentity)), i & 2 && (e.\u0275\u0275advance(2), e.\u0275\u0275repeater(n.contexts)); }, dependencies: [g], encapsulation: 2 }); }
} return a; })(), M = (() => { class a {
    static { this.\u0275fac = function (i) { return new (i || a); }; }
    static { this.\u0275mod = e.\u0275\u0275defineNgModule({ type: a }); }
    static { this.\u0275inj = e.\u0275\u0275defineInjector({}); }
} return a; })();
export { F as NgbRating, b as NgbRatingConfig, M as NgbRatingModule };
