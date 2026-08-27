import { b as c, f as l, g as a, j as O } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as e from "@angular/core";
import { inject as h, LOCALE_ID as C, forwardRef as b } from "@angular/core";
import { NG_VALUE_ACCESSOR as f } from "@angular/forms";
import { formatDate as N } from "@angular/common";
function B(i, o) { if (i & 1) {
    let t = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275domElementStart(0, "button", 15), e.\u0275\u0275domListener("click", function () { e.\u0275\u0275restoreView(t); let n = e.\u0275\u0275nextContext(); return e.\u0275\u0275resetView(n.changeHour(n.hourStep)); }), e.\u0275\u0275domElement(1, "span", 16), e.\u0275\u0275domElementStart(2, "span", 17), e.\u0275\u0275i18n(3, 0), e.\u0275\u0275domElementEnd()();
} if (i & 2) {
    let t = e.\u0275\u0275nextContext();
    e.\u0275\u0275classProp("btn-sm", t.isSmallSize)("btn-lg", t.isLargeSize)("disabled", t.disabled), e.\u0275\u0275domProperty("disabled", t.disabled);
} }
function D(i, o) { if (i & 1) {
    let t = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275domElementStart(0, "button", 15), e.\u0275\u0275domListener("click", function () { e.\u0275\u0275restoreView(t); let n = e.\u0275\u0275nextContext(); return e.\u0275\u0275resetView(n.changeHour(-n.hourStep)); }), e.\u0275\u0275domElement(1, "span", 18), e.\u0275\u0275domElementStart(2, "span", 17), e.\u0275\u0275i18n(3, 1), e.\u0275\u0275domElementEnd()();
} if (i & 2) {
    let t = e.\u0275\u0275nextContext();
    e.\u0275\u0275classProp("btn-sm", t.isSmallSize)("btn-lg", t.isLargeSize)("disabled", t.disabled), e.\u0275\u0275domProperty("disabled", t.disabled);
} }
function G(i, o) { if (i & 1) {
    let t = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275domElementStart(0, "button", 15), e.\u0275\u0275domListener("click", function () { e.\u0275\u0275restoreView(t); let n = e.\u0275\u0275nextContext(); return e.\u0275\u0275resetView(n.changeMinute(n.minuteStep)); }), e.\u0275\u0275domElement(1, "span", 16), e.\u0275\u0275domElementStart(2, "span", 17), e.\u0275\u0275i18n(3, 2), e.\u0275\u0275domElementEnd()();
} if (i & 2) {
    let t = e.\u0275\u0275nextContext();
    e.\u0275\u0275classProp("btn-sm", t.isSmallSize)("btn-lg", t.isLargeSize)("disabled", t.disabled), e.\u0275\u0275domProperty("disabled", t.disabled);
} }
function I(i, o) { if (i & 1) {
    let t = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275domElementStart(0, "button", 15), e.\u0275\u0275domListener("click", function () { e.\u0275\u0275restoreView(t); let n = e.\u0275\u0275nextContext(); return e.\u0275\u0275resetView(n.changeMinute(-n.minuteStep)); }), e.\u0275\u0275domElement(1, "span", 18), e.\u0275\u0275domElementStart(2, "span", 17), e.\u0275\u0275i18n(3, 3), e.\u0275\u0275domElementEnd()();
} if (i & 2) {
    let t = e.\u0275\u0275nextContext();
    e.\u0275\u0275classProp("btn-sm", t.isSmallSize)("btn-lg", t.isLargeSize)("disabled", t.disabled), e.\u0275\u0275domProperty("disabled", t.disabled);
} }
function w(i, o) { if (i & 1) {
    let t = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275domElementStart(0, "button", 15), e.\u0275\u0275domListener("click", function () { e.\u0275\u0275restoreView(t); let n = e.\u0275\u0275nextContext(2); return e.\u0275\u0275resetView(n.changeSecond(n.secondStep)); }), e.\u0275\u0275domElement(1, "span", 16), e.\u0275\u0275domElementStart(2, "span", 17), e.\u0275\u0275i18n(3, 4), e.\u0275\u0275domElementEnd()();
} if (i & 2) {
    let t = e.\u0275\u0275nextContext(2);
    e.\u0275\u0275classProp("btn-sm", t.isSmallSize)("btn-lg", t.isLargeSize)("disabled", t.disabled), e.\u0275\u0275domProperty("disabled", t.disabled);
} }
function k(i, o) { if (i & 1) {
    let t = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275domElementStart(0, "button", 15), e.\u0275\u0275domListener("click", function () { e.\u0275\u0275restoreView(t); let n = e.\u0275\u0275nextContext(2); return e.\u0275\u0275resetView(n.changeSecond(-n.secondStep)); }), e.\u0275\u0275domElement(1, "span", 18), e.\u0275\u0275domElementStart(2, "span", 17), e.\u0275\u0275i18n(3, 5), e.\u0275\u0275domElementEnd()();
} if (i & 2) {
    let t = e.\u0275\u0275nextContext(2);
    e.\u0275\u0275classProp("btn-sm", t.isSmallSize)("btn-lg", t.isLargeSize)("disabled", t.disabled), e.\u0275\u0275domProperty("disabled", t.disabled);
} }
function y(i, o) { if (i & 1) {
    let t = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275domElementStart(0, "div", 12), e.\u0275\u0275text(1, ":"), e.\u0275\u0275domElementEnd(), e.\u0275\u0275domElementStart(2, "div", 19), e.\u0275\u0275conditionalCreate(3, w, 4, 7, "button", 10), e.\u0275\u0275domElementStart(4, "input", 20), e.\u0275\u0275domListener("change", function (n) { e.\u0275\u0275restoreView(t); let r = e.\u0275\u0275nextContext(); return e.\u0275\u0275resetView(r.updateSecond(n.target.value)); })("blur", function () { e.\u0275\u0275restoreView(t); let n = e.\u0275\u0275nextContext(); return e.\u0275\u0275resetView(n.handleBlur()); })("input", function (n) { e.\u0275\u0275restoreView(t); let r = e.\u0275\u0275nextContext(); return e.\u0275\u0275resetView(r.formatInput(n.target)); })("keydown.ArrowUp", function (n) { e.\u0275\u0275restoreView(t); let r = e.\u0275\u0275nextContext(); return r.changeSecond(r.secondStep), e.\u0275\u0275resetView(n.preventDefault()); })("keydown.ArrowDown", function (n) { e.\u0275\u0275restoreView(t); let r = e.\u0275\u0275nextContext(); return r.changeSecond(-r.secondStep), e.\u0275\u0275resetView(n.preventDefault()); }), e.\u0275\u0275domElementEnd(), e.\u0275\u0275conditionalCreate(5, k, 4, 7, "button", 10), e.\u0275\u0275domElementEnd();
} if (i & 2) {
    let t = e.\u0275\u0275nextContext();
    e.\u0275\u0275advance(3), e.\u0275\u0275conditional(t.spinners ? 3 : -1), e.\u0275\u0275advance(), e.\u0275\u0275classProp("form-control-sm", t.isSmallSize)("form-control-lg", t.isLargeSize), e.\u0275\u0275domProperty("value", t.formatMinSec(t.model == null ? null : t.model.second))("readOnly", t.readonlyInputs)("disabled", t.disabled), e.\u0275\u0275advance(), e.\u0275\u0275conditional(t.spinners ? 5 : -1);
} }
function F(i, o) { if (i & 1 && (e.\u0275\u0275domElementContainerStart(0), e.\u0275\u0275i18n(1, 6), e.\u0275\u0275domElementContainerEnd()), i & 2) {
    let t = e.\u0275\u0275nextContext(2);
    e.\u0275\u0275advance(), e.\u0275\u0275i18nExp(t.i18n.getAfternoonPeriod()), e.\u0275\u0275i18nApply(1);
} }
function v(i, o) { if (i & 1 && (e.\u0275\u0275domElementContainerStart(0), e.\u0275\u0275text(1), e.\u0275\u0275domElementContainerEnd()), i & 2) {
    let t = e.\u0275\u0275nextContext(2);
    e.\u0275\u0275advance(), e.\u0275\u0275textInterpolate(t.i18n.getMorningPeriod());
} }
function x(i, o) { if (i & 1) {
    let t = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275domElement(0, "div", 12), e.\u0275\u0275domElementStart(1, "div", 21)(2, "button", 22), e.\u0275\u0275domListener("click", function () { e.\u0275\u0275restoreView(t); let n = e.\u0275\u0275nextContext(); return e.\u0275\u0275resetView(n.toggleMeridian()); }), e.\u0275\u0275conditionalCreate(3, F, 2, 1, "ng-container")(4, v, 2, 1, "ng-container"), e.\u0275\u0275domElementEnd()();
} if (i & 2) {
    let t = e.\u0275\u0275nextContext();
    e.\u0275\u0275advance(2), e.\u0275\u0275classProp("btn-sm", t.isSmallSize)("btn-lg", t.isLargeSize)("disabled", t.disabled), e.\u0275\u0275domProperty("disabled", t.disabled), e.\u0275\u0275advance(), e.\u0275\u0275conditional(t.model && t.model.hour >= 12 ? 3 : 4);
} }
var u = class {
    constructor(o, t, _) { this.hour = c(o), this.minute = c(t), this.second = c(_); }
    changeHour(o = 1) { this.updateHour((isNaN(this.hour) ? 0 : this.hour) + o); }
    updateHour(o) { l(o) ? this.hour = (o < 0 ? 24 + o : o) % 24 : this.hour = NaN; }
    changeMinute(o = 1) { this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + o); }
    updateMinute(o) { l(o) ? (this.minute = o % 60 < 0 ? 60 + o % 60 : o % 60, this.changeHour(Math.floor(o / 60))) : this.minute = NaN; }
    changeSecond(o = 1) { this.updateSecond((isNaN(this.second) ? 0 : this.second) + o); }
    updateSecond(o) { l(o) ? (this.second = o < 0 ? 60 + o % 60 : o % 60, this.changeMinute(Math.floor(o / 60))) : this.second = NaN; }
    isValid(o = !0) { return l(this.hour) && l(this.minute) && (o ? l(this.second) : !0); }
    toString() { return `${this.hour || 0}:${this.minute || 0}:${this.second || 0}`; }
}, U = (() => { class i {
    constructor() { this.meridian = !1, this.spinners = !0, this.seconds = !1, this.hourStep = 1, this.minuteStep = 1, this.secondStep = 1, this.disabled = !1, this.readonlyInputs = !1, this.size = "medium"; }
    static { this.\u0275fac = function (_) { return new (_ || i); }; }
    static { this.\u0275prov = e.\u0275\u0275defineService({ token: i, factory: i.\u0275fac }); }
} return i; })();
function K() { return new H; }
var P = (() => { class i {
    static { this.\u0275fac = function (_) { return new (_ || i); }; }
    static { this.\u0275prov = e.\u0275\u0275defineService({ token: i, factory: () => K() }); }
} return i; })(), H = (() => { class i extends P {
    fromModel(t) { return t && a(t.hour) && a(t.minute) ? { hour: t.hour, minute: t.minute, second: a(t.second) ? t.second : null } : null; }
    toModel(t) { return t && a(t.hour) && a(t.minute) ? { hour: t.hour, minute: t.minute, second: a(t.second) ? t.second : null } : null; }
    static { this.\u0275fac = function (_) { return new (_ || i); }; }
    static { this.\u0275prov = e.\u0275\u0275defineService({ token: i, factory: i.\u0275fac, autoProvided: !1 }); }
} return i; })(), R = (() => { class i {
    static { this.\u0275fac = function (_) { return new (_ || i); }; }
    static { this.\u0275prov = e.\u0275\u0275defineService({ token: i, factory: () => new L }); }
} return i; })(), L = (() => { class i extends R {
    constructor() { super(...arguments), this._locale = h(C), this._periods = [N(new Date(36e5), "a", this._locale, "UTC"), N(new Date(36e5 * 13), "a", this._locale, "UTC")]; }
    getMorningPeriod() { return this._periods[0]; }
    getAfternoonPeriod() { return this._periods[1]; }
    static { this.\u0275fac = function (_) { return new (_ || i); }; }
    static { this.\u0275prov = e.\u0275\u0275defineService({ token: i, factory: i.\u0275fac, autoProvided: !1 }); }
} return i; })(), Z = /[^0-9]/g, ee = (() => {
    class i {
        set hourStep(t) { this._hourStep = a(t) ? t : this._config.hourStep; }
        get hourStep() { return this._hourStep; }
        set minuteStep(t) { this._minuteStep = a(t) ? t : this._config.minuteStep; }
        get minuteStep() { return this._minuteStep; }
        set secondStep(t) { this._secondStep = a(t) ? t : this._config.secondStep; }
        get secondStep() { return this._secondStep; }
        constructor(t, _, n, r) { this._config = t, this._ngbTimeAdapter = _, this._cd = n, this.i18n = r, this.onChange = s => { }, this.onTouched = () => { }, this.meridian = t.meridian, this.spinners = t.spinners, this.seconds = t.seconds, this.hourStep = t.hourStep, this.minuteStep = t.minuteStep, this.secondStep = t.secondStep, this.disabled = t.disabled, this.readonlyInputs = t.readonlyInputs, this.size = t.size; }
        writeValue(t) { let _ = this._ngbTimeAdapter.fromModel(t); this.model = _ ? new u(_.hour, _.minute, _.second) : new u, !this.seconds && (!_ || !l(_.second)) && (this.model.second = 0), this._cd.markForCheck(); }
        registerOnChange(t) { this.onChange = t; }
        registerOnTouched(t) { this.onTouched = t; }
        setDisabledState(t) { this.disabled = t; }
        changeHour(t) { this.model?.changeHour(t), this.propagateModelChange(); }
        changeMinute(t) { this.model?.changeMinute(t), this.propagateModelChange(); }
        changeSecond(t) { this.model?.changeSecond(t), this.propagateModelChange(); }
        updateHour(t) { let _ = this.model ? this.model.hour >= 12 : !1, n = c(t); this.meridian && (_ && n < 12 || !_ && n === 12) ? this.model?.updateHour(n + 12) : this.model?.updateHour(n), this.propagateModelChange(); }
        updateMinute(t) { this.model?.updateMinute(c(t)), this.propagateModelChange(); }
        updateSecond(t) { this.model?.updateSecond(c(t)), this.propagateModelChange(); }
        toggleMeridian() { this.model && l(this.model.hour) && this.meridian && this.changeHour(12); }
        formatInput(t) { t.value = t.value.replace(Z, ""); }
        formatHour(t) { return l(t) ? this.meridian ? O(t % 12 === 0 ? 12 : t % 12) : O(t % 24) : O(NaN); }
        formatMinSec(t) { return O(l(t) ? t : NaN); }
        handleBlur() { this.onTouched(); }
        get isSmallSize() { return this.size === "small"; }
        get isLargeSize() { return this.size === "large"; }
        ngOnChanges(t) { t.seconds && !this.seconds && this.model && !l(this.model.second) && (this.model.second = 0, this.propagateModelChange(!1)); }
        propagateModelChange(t = !0) { t && this.onTouched(), this.model?.isValid(this.seconds) ? this.onChange(this._ngbTimeAdapter.toModel({ hour: this.model.hour, minute: this.model.minute, second: this.model.second })) : this.onChange(this._ngbTimeAdapter.toModel(null)); }
        static { this.\u0275fac = function (_) { return new (_ || i)(e.\u0275\u0275directiveInject(U), e.\u0275\u0275directiveInject(P), e.\u0275\u0275directiveInject(e.ChangeDetectorRef), e.\u0275\u0275directiveInject(R)); }; }
        static {
            this.\u0275cmp = e.\u0275\u0275defineComponent({ type: i, selectors: [["ngb-timepicker"]], inputs: { meridian: "meridian", spinners: "spinners", seconds: "seconds", hourStep: "hourStep", minuteStep: "minuteStep", secondStep: "secondStep", readonlyInputs: "readonlyInputs", size: "size" }, exportAs: ["ngbTimepicker"], features: [e.\u0275\u0275ProvidersFeature([{ provide: f, useExisting: b(() => i), multi: !0 }]), e.\u0275\u0275NgOnChangesFeature], decls: 14, vars: 23, consts: () => { let t; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? t = goog.getMsg("HH") : t = $localize `:@@ngb.timepicker.HH:HH`; let _; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? _ = goog.getMsg("Hours") : _ = $localize `:@@ngb.timepicker.hours:Hours`; let n; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? n = goog.getMsg("MM") : n = $localize `:@@ngb.timepicker.MM:MM`; let r; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? r = goog.getMsg("Minutes") : r = $localize `:@@ngb.timepicker.minutes:Minutes`; let s; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? s = goog.getMsg("Increment hours") : s = $localize `:@@ngb.timepicker.increment-hours:Increment hours`; let m; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? m = goog.getMsg("Decrement hours") : m = $localize `:@@ngb.timepicker.decrement-hours:Decrement hours`; let p; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? p = goog.getMsg("Increment minutes") : p = $localize `:@@ngb.timepicker.increment-minutes:Increment minutes`; let E; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? E = goog.getMsg("Decrement minutes") : E = $localize `:@@ngb.timepicker.decrement-minutes:Decrement minutes`; let M; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? M = goog.getMsg("SS") : M = $localize `:@@ngb.timepicker.SS:SS`; let S; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? S = goog.getMsg("Seconds") : S = $localize `:@@ngb.timepicker.seconds:Seconds`; let T; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? T = goog.getMsg("Increment seconds") : T = $localize `:@@ngb.timepicker.increment-seconds:Increment seconds`; let g; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? g = goog.getMsg("Decrement seconds") : g = $localize `:@@ngb.timepicker.decrement-seconds:Decrement seconds`; let A; return typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? A = goog.getMsg("{$interpolation}", { interpolation: "\uFFFD0\uFFFD" }, { original_code: { interpolation: "{{ i18n.getAfternoonPeriod() }}" } }) : A = $localize `:@@ngb.timepicker.PM:${"\uFFFD0\uFFFD"}:INTERPOLATION:`, [s, m, p, E, T, g, A, [3, "disabled"], [1, "ngb-tp"], [1, "ngb-tp-input-container", "ngb-tp-hour"], ["tabindex", "-1", "type", "button", 1, "btn", "btn-link", 3, "btn-sm", "btn-lg", "disabled"], ["type", "text", "maxlength", "2", "inputmode", "numeric", "placeholder", t, "aria-label", _, 1, "ngb-tp-input", "form-control", 3, "change", "blur", "input", "keydown.ArrowUp", "keydown.ArrowDown", "value", "readOnly", "disabled"], [1, "ngb-tp-spacer"], [1, "ngb-tp-input-container", "ngb-tp-minute"], ["type", "text", "maxlength", "2", "inputmode", "numeric", "placeholder", n, "aria-label", r, 1, "ngb-tp-input", "form-control", 3, "change", "blur", "input", "keydown.ArrowUp", "keydown.ArrowDown", "value", "readOnly", "disabled"], ["tabindex", "-1", "type", "button", 1, "btn", "btn-link", 3, "click", "disabled"], [1, "chevron", "ngb-tp-chevron"], [1, "visually-hidden"], [1, "chevron", "ngb-tp-chevron", "bottom"], [1, "ngb-tp-input-container", "ngb-tp-second"], ["type", "text", "maxlength", "2", "inputmode", "numeric", "placeholder", M, "aria-label", S, 1, "ngb-tp-input", "form-control", 3, "change", "blur", "input", "keydown.ArrowUp", "keydown.ArrowDown", "value", "readOnly", "disabled"], [1, "ngb-tp-meridian"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click", "disabled"]]; }, template: function (_, n) { _ & 1 && (e.\u0275\u0275domElementStart(0, "fieldset", 7)(1, "div", 8)(2, "div", 9), e.\u0275\u0275conditionalCreate(3, B, 4, 7, "button", 10), e.\u0275\u0275domElementStart(4, "input", 11), e.\u0275\u0275domListener("change", function (s) { return n.updateHour(s.target.value); })("blur", function () { return n.handleBlur(); })("input", function (s) { return n.formatInput(s.target); })("keydown.ArrowUp", function (s) { return n.changeHour(n.hourStep), s.preventDefault(); })("keydown.ArrowDown", function (s) { return n.changeHour(-n.hourStep), s.preventDefault(); }), e.\u0275\u0275domElementEnd(), e.\u0275\u0275conditionalCreate(5, D, 4, 7, "button", 10), e.\u0275\u0275domElementEnd(), e.\u0275\u0275domElementStart(6, "div", 12), e.\u0275\u0275text(7, ":"), e.\u0275\u0275domElementEnd(), e.\u0275\u0275domElementStart(8, "div", 13), e.\u0275\u0275conditionalCreate(9, G, 4, 7, "button", 10), e.\u0275\u0275domElementStart(10, "input", 14), e.\u0275\u0275domListener("change", function (s) { return n.updateMinute(s.target.value); })("blur", function () { return n.handleBlur(); })("input", function (s) { return n.formatInput(s.target); })("keydown.ArrowUp", function (s) { return n.changeMinute(n.minuteStep), s.preventDefault(); })("keydown.ArrowDown", function (s) { return n.changeMinute(-n.minuteStep), s.preventDefault(); }), e.\u0275\u0275domElementEnd(), e.\u0275\u0275conditionalCreate(11, I, 4, 7, "button", 10), e.\u0275\u0275domElementEnd(), e.\u0275\u0275conditionalCreate(12, y, 6, 9), e.\u0275\u0275conditionalCreate(13, x, 5, 8), e.\u0275\u0275domElementEnd()()), _ & 2 && (e.\u0275\u0275classProp("disabled", n.disabled), e.\u0275\u0275domProperty("disabled", n.disabled), e.\u0275\u0275advance(3), e.\u0275\u0275conditional(n.spinners ? 3 : -1), e.\u0275\u0275advance(), e.\u0275\u0275classProp("form-control-sm", n.isSmallSize)("form-control-lg", n.isLargeSize), e.\u0275\u0275domProperty("value", n.formatHour(n.model == null ? null : n.model.hour))("readOnly", n.readonlyInputs)("disabled", n.disabled), e.\u0275\u0275advance(), e.\u0275\u0275conditional(n.spinners ? 5 : -1), e.\u0275\u0275advance(4), e.\u0275\u0275conditional(n.spinners ? 9 : -1), e.\u0275\u0275advance(), e.\u0275\u0275classProp("form-control-sm", n.isSmallSize)("form-control-lg", n.isLargeSize), e.\u0275\u0275domProperty("value", n.formatMinSec(n.model == null ? null : n.model.minute))("readOnly", n.readonlyInputs)("disabled", n.disabled), e.\u0275\u0275advance(), e.\u0275\u0275conditional(n.spinners ? 11 : -1), e.\u0275\u0275advance(), e.\u0275\u0275conditional(n.seconds ? 12 : -1), e.\u0275\u0275advance(), e.\u0275\u0275conditional(n.meridian ? 13 : -1)); }, styles: [`ngb-timepicker{font-size:1rem}.ngb-tp{display:flex;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron:before{border-style:solid;border-width:.29em .29em 0 0;content:"";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-minute,.ngb-tp-second,.ngb-tp-meridian{display:flex;flex-direction:column;align-items:center;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}
`], encapsulation: 2, changeDetection: 1 });
        }
    }
    return i;
})(), te = (() => { class i {
    static { this.\u0275fac = function (_) { return new (_ || i); }; }
    static { this.\u0275mod = e.\u0275\u0275defineNgModule({ type: i }); }
    static { this.\u0275inj = e.\u0275\u0275defineInjector({}); }
} return i; })();
export { P as NgbTimeAdapter, ee as NgbTimepicker, U as NgbTimepickerConfig, R as NgbTimepickerI18n, te as NgbTimepickerModule };
