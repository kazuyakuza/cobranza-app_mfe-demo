import { a as Se, b as M, e as re, f as b, g, j as oe, r as we, u as Re, v as Ae } from "@nf-internal/chunk-RJD7D2ZM";
import { a as j, b as Ee } from "@nf-internal/chunk-PZNONLPT";
import * as i from "@angular/core";
import { inject as h, LOCALE_ID as ze, EventEmitter as S, ElementRef as Q, TemplateRef as Qe, Injector as _e, NgZone as Ve, DestroyRef as Xe, ChangeDetectorRef as We, afterNextRender as et, forwardRef as ge, ViewContainerRef as tt, DOCUMENT as nt, afterEveryRender as it } from "@angular/core";
import { Subject as me, fromEvent as xe, merge as at } from "rxjs";
import { filter as pe } from "rxjs/operators";
import { NG_VALUE_ACCESSOR as $e, NG_VALIDATORS as rt } from "@angular/forms";
import { formatDate as ot, NgTemplateOutlet as He } from "@angular/common";
import { takeUntilDestroyed as se } from "@angular/core/rxjs-interop";
var st = ["month"], lt = ["year"];
function ct(t, r) { if (t & 1 && (i.\u0275\u0275domElementStart(0, "option", 3), i.\u0275\u0275text(1), i.\u0275\u0275domElementEnd()), t & 2) {
    let e = r.$implicit, n = i.\u0275\u0275nextContext();
    i.\u0275\u0275domProperty("value", e), i.\u0275\u0275attribute("aria-label", n.i18n.getMonthFullName(e, n.date.year)), i.\u0275\u0275advance(), i.\u0275\u0275textInterpolate(n.i18n.getMonthShortName(e, n.date.year));
} }
function dt(t, r) { if (t & 1 && (i.\u0275\u0275domElementStart(0, "option", 3), i.\u0275\u0275text(1), i.\u0275\u0275domElementEnd()), t & 2) {
    let e = r.$implicit, n = i.\u0275\u0275nextContext();
    i.\u0275\u0275domProperty("value", e), i.\u0275\u0275advance(), i.\u0275\u0275textInterpolate(n.i18n.getYearNumerals(e));
} }
function Le(t, r) { return this.idMonth(r); }
function ut(t, r) { if (t & 1) {
    let e = i.\u0275\u0275getCurrentView();
    i.\u0275\u0275elementStart(0, "ngb-datepicker-navigation-select", 7), i.\u0275\u0275listener("select", function (a) { i.\u0275\u0275restoreView(e); let o = i.\u0275\u0275nextContext(); return i.\u0275\u0275resetView(o.select.emit(a)); }), i.\u0275\u0275elementEnd();
} if (t & 2) {
    let e = i.\u0275\u0275nextContext();
    i.\u0275\u0275property("date", e.date)("disabled", e.disabled)("months", e.selectBoxes.months)("years", e.selectBoxes.years);
} }
function ht(t, r) { t & 1 && i.\u0275\u0275element(0, "div", 8); }
function ft(t, r) { t & 1 && i.\u0275\u0275element(0, "div", 8); }
function _t(t, r) { if (t & 1 && (i.\u0275\u0275conditionalCreate(0, ht, 1, 0, "div", 8), i.\u0275\u0275elementStart(1, "div", 9), i.\u0275\u0275text(2), i.\u0275\u0275elementEnd(), i.\u0275\u0275conditionalCreate(3, ft, 1, 0, "div", 8)), t & 2) {
    let e = r.$implicit, n = r.$index, a = i.\u0275\u0275nextContext(2);
    i.\u0275\u0275conditional(n > 0 ? 0 : -1), i.\u0275\u0275advance(2), i.\u0275\u0275textInterpolate1(" ", a.i18n.getMonthLabel(e.firstDate), " "), i.\u0275\u0275advance(), i.\u0275\u0275conditional(n !== a.months.length - 1 ? 3 : -1);
} }
function gt(t, r) { if (t & 1 && i.\u0275\u0275repeaterCreate(0, _t, 4, 3, null, null, Le, !0), t & 2) {
    let e = i.\u0275\u0275nextContext();
    i.\u0275\u0275repeater(e.months);
} }
function mt(t, r) { if (t & 1 && (i.\u0275\u0275elementStart(0, "span"), i.\u0275\u0275text(1), i.\u0275\u0275elementEnd()), t & 2) {
    let e = r.$implicit, n = i.\u0275\u0275nextContext();
    i.\u0275\u0275advance(), i.\u0275\u0275textInterpolate(n.i18n.getMonthLabel(e.firstDate));
} }
function pt(t, r) { if (t & 1 && (i.\u0275\u0275elementStart(0, "div", 1), i.\u0275\u0275text(1), i.\u0275\u0275elementEnd()), t & 2) {
    let e = i.\u0275\u0275nextContext(2);
    i.\u0275\u0275advance(), i.\u0275\u0275textInterpolate(e.i18n.getWeekLabel());
} }
function Dt(t, r) { if (t & 1 && (i.\u0275\u0275elementStart(0, "div", 2), i.\u0275\u0275text(1), i.\u0275\u0275elementEnd()), t & 2) {
    let e = r.$implicit;
    i.\u0275\u0275advance(), i.\u0275\u0275textInterpolate(e);
} }
function yt(t, r) { if (t & 1 && (i.\u0275\u0275elementStart(0, "div", 0), i.\u0275\u0275conditionalCreate(1, pt, 2, 1, "div", 1), i.\u0275\u0275repeaterCreate(2, Dt, 2, 1, "div", 2, i.\u0275\u0275repeaterTrackByIndex), i.\u0275\u0275elementEnd()), t & 2) {
    let e = i.\u0275\u0275nextContext();
    i.\u0275\u0275advance(), i.\u0275\u0275conditional(e.datepicker.showWeekNumbers ? 1 : -1), i.\u0275\u0275advance(), i.\u0275\u0275repeater(e.viewModel.weekdays);
} }
function bt(t, r) { if (t & 1 && (i.\u0275\u0275elementStart(0, "div", 4), i.\u0275\u0275text(1), i.\u0275\u0275elementEnd()), t & 2) {
    let e = i.\u0275\u0275nextContext(2).$implicit, n = i.\u0275\u0275nextContext();
    i.\u0275\u0275advance(), i.\u0275\u0275textInterpolate(n.i18n.getWeekNumerals(e.number));
} }
function Mt(t, r) { }
function vt(t, r) { if (t & 1 && i.\u0275\u0275template(0, Mt, 0, 0, "ng-template", 7), t & 2) {
    let e = i.\u0275\u0275nextContext().$implicit, n = i.\u0275\u0275nextContext(3);
    i.\u0275\u0275property("ngTemplateOutlet", n.datepicker.dayTemplate)("ngTemplateOutletContext", e.context);
} }
function Tt(t, r) { if (t & 1) {
    let e = i.\u0275\u0275getCurrentView();
    i.\u0275\u0275elementStart(0, "div", 6), i.\u0275\u0275listener("click", function (a) { let o = i.\u0275\u0275restoreView(e).$implicit; return i.\u0275\u0275nextContext(3).doSelect(o), i.\u0275\u0275resetView(a.preventDefault()); }), i.\u0275\u0275conditionalCreate(1, vt, 1, 2, null, 7), i.\u0275\u0275elementEnd();
} if (t & 2) {
    let e = r.$implicit;
    i.\u0275\u0275classProp("disabled", e.context.disabled)("hidden", e.hidden)("ngb-dp-today", e.context.today), i.\u0275\u0275property("tabindex", e.tabindex), i.\u0275\u0275attribute("aria-label", e.ariaLabel)("aria-disabled", e.context.disabled)("aria-selected", e.context.selected), i.\u0275\u0275advance(), i.\u0275\u0275conditional(e.hidden ? -1 : 1);
} }
function Nt(t, r) { if (t & 1 && (i.\u0275\u0275elementStart(0, "div", 3), i.\u0275\u0275conditionalCreate(1, bt, 2, 1, "div", 4), i.\u0275\u0275repeaterCreate(2, Tt, 2, 11, "div", 5, i.\u0275\u0275repeaterTrackByIdentity), i.\u0275\u0275elementEnd()), t & 2) {
    let e = i.\u0275\u0275nextContext().$implicit, n = i.\u0275\u0275nextContext();
    i.\u0275\u0275advance(), i.\u0275\u0275conditional(n.datepicker.showWeekNumbers ? 1 : -1), i.\u0275\u0275advance(), i.\u0275\u0275repeater(e.days);
} }
function Ot(t, r) { if (t & 1 && i.\u0275\u0275conditionalCreate(0, Nt, 4, 1, "div", 3), t & 2) {
    let e = r.$implicit;
    i.\u0275\u0275conditional(e.collapsed ? -1 : 0);
} }
var kt = ["defaultDayTemplate"], Et = ["content"], St = t => ({ $implicit: t });
function wt(t, r) { if (t & 1 && i.\u0275\u0275element(0, "div", 8), t & 2) {
    let e = r.date, n = r.currentMonth, a = r.selected, o = r.disabled, s = r.focused;
    i.\u0275\u0275property("date", e)("currentMonth", n)("selected", a)("disabled", o)("focused", s);
} }
function Rt(t, r) { if (t & 1 && (i.\u0275\u0275elementStart(0, "div", 10), i.\u0275\u0275text(1), i.\u0275\u0275elementEnd()), t & 2) {
    let e = i.\u0275\u0275nextContext().$implicit, n = i.\u0275\u0275nextContext(2);
    i.\u0275\u0275advance(), i.\u0275\u0275textInterpolate1(" ", n.i18n.getMonthLabel(e.firstDate), " ");
} }
function At(t, r) { if (t & 1 && (i.\u0275\u0275elementStart(0, "div", 9), i.\u0275\u0275conditionalCreate(1, Rt, 2, 1, "div", 10), i.\u0275\u0275element(2, "ngb-datepicker-month", 11), i.\u0275\u0275elementEnd()), t & 2) {
    let e = r.$implicit, n = i.\u0275\u0275nextContext(2);
    i.\u0275\u0275advance(), i.\u0275\u0275conditional(n.navigation === "none" || n.displayMonths > 1 && n.navigation === "select" ? 1 : -1), i.\u0275\u0275advance(), i.\u0275\u0275property("month", e.firstDate);
} }
function xt(t, r) { if (t & 1 && i.\u0275\u0275repeaterCreate(0, At, 3, 2, "div", 9, i.\u0275\u0275repeaterTrackByIdentity), t & 2) {
    let e = i.\u0275\u0275nextContext();
    i.\u0275\u0275repeater(e.model.months);
} }
function Ct(t, r) { if (t & 1) {
    let e = i.\u0275\u0275getCurrentView();
    i.\u0275\u0275elementStart(0, "ngb-datepicker-navigation", 12), i.\u0275\u0275listener("navigate", function (a) { i.\u0275\u0275restoreView(e); let o = i.\u0275\u0275nextContext(); return i.\u0275\u0275resetView(o.onNavigateEvent(a)); })("select", function (a) { i.\u0275\u0275restoreView(e); let o = i.\u0275\u0275nextContext(); return i.\u0275\u0275resetView(o.onNavigateDateSelect(a)); }), i.\u0275\u0275elementEnd();
} if (t & 2) {
    let e = i.\u0275\u0275nextContext();
    i.\u0275\u0275property("date", e.model.firstDate)("months", e.model.months)("disabled", e.model.disabled)("showSelect", e.model.navigation === "select")("prevDisabled", e.model.prevDisabled)("nextDisabled", e.model.nextDisabled)("selectBoxes", e.model.selectBoxes);
} }
function Pt(t, r) { }
function Ft(t, r) { }
var _ = class t {
    static from(r) { return r instanceof t ? r : r ? new t(r.year, r.month, r.day) : null; }
    constructor(r, e, n) { this.year = g(r) ? r : null, this.month = g(e) ? e : null, this.day = g(n) ? n : null; }
    equals(r) { return r != null && this.year === r.year && this.month === r.month && this.day === r.day; }
    before(r) { return r ? this.year === r.year ? this.month === r.month ? this.day === r.day ? !1 : this.day < r.day : this.month < r.month : this.year < r.year : !1; }
    after(r) { return r ? this.year === r.year ? this.month === r.month ? this.day === r.day ? !1 : this.day > r.day : this.month > r.month : this.year > r.year : !1; }
};
function De(t) { return new _(t.getFullYear(), t.getMonth() + 1, t.getDate()); }
function H(t) { let r = new Date(t.year, t.month - 1, t.day, 12); return isNaN(r.getTime()) || r.setFullYear(t.year), r; }
function Bt() { return new Ye; }
var R = (() => { class t {
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: () => Bt() }); }
} return t; })(), Ye = (() => { class t extends R {
    getDaysPerWeek() { return 7; }
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    getWeeksPerMonth() { return 6; }
    getNext(e, n = "d", a = 1) { let o = H(e), s = !0, l = o.getMonth(); switch (n) {
        case "y":
            o.setFullYear(o.getFullYear() + a);
            break;
        case "m":
            l += a, o.setMonth(l), l = l % 12, l < 0 && (l = l + 12);
            break;
        case "d":
            o.setDate(o.getDate() + a), s = !1;
            break;
        default: return e;
    } return s && o.getMonth() !== l && o.setDate(0), De(o); }
    getPrev(e, n = "d", a = 1) { return this.getNext(e, n, -a); }
    getWeekday(e) { let a = H(e).getDay(); return a === 0 ? 7 : a; }
    getWeekNumber(e, n) { n === 7 && (n = 0); let a = (11 - n) % 7, o = e[a], s = H(o); s.setDate(s.getDate() + 4 - (s.getDay() || 7)); let l = s.getTime(); return s.setMonth(0), s.setDate(1), Math.floor(Math.round((l - s.getTime()) / 864e5) / 7) + 1; }
    getToday() { return De(new Date); }
    isValid(e) { if (!e || !g(e.year) || !g(e.month) || !g(e.day) || e.year === 0)
        return !1; let n = H(e); return !isNaN(n.getTime()) && n.getFullYear() === e.year && n.getMonth() + 1 === e.month && n.getDate() === e.day; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })();
function P(t, r) { return !Gt(t, r); }
function je(t, r) { return !t && !r ? !1 : !t || !r ? !0 : t.year !== r.year || t.month !== r.month; }
function Gt(t, r) { return !t && !r || !!t && !!r && t.equals(r); }
function It(t, r) { if (r && t && r.before(t))
    throw new Error(`'maxDate' ${r} should be greater than 'minDate' ${t}`); }
function U(t, r, e) { return t && r && t.before(r) ? r : t && e && t.after(e) ? e : t || null; }
function le(t, r) { let { minDate: e, maxDate: n, disabled: a, markDisabled: o } = r; return !(t == null || a || o && o(t, { year: t.year, month: t.month }) || e && t.before(e) || n && t.after(n)); }
function Vt(t, r, e, n) { if (!r)
    return []; let a = t.getMonths(r.year); if (e && r.year === e.year) {
    let o = a.findIndex(s => s === e.month);
    a = a.slice(o);
} if (n && r.year === n.year) {
    let o = a.findIndex(s => s === n.month);
    a = a.slice(0, o + 1);
} return a; }
function Wt(t, r, e) { if (!t)
    return []; let n = r ? Math.max(r.year, t.year - 500) : t.year - 10, o = (e ? Math.min(e.year, t.year + 500) : t.year + 10) - n + 1, s = Array(o); for (let l = 0; l < o; l++)
    s[l] = n + l; return s; }
function $t(t, r, e) { let n = Object.assign(t.getNext(r, "m"), { day: 1 }); return e != null && n.after(e); }
function Ht(t, r, e) { let n = Object.assign(t.getPrev(r, "m"), { day: 1 }); return e != null && (n.year === e.year && n.month < e.month || n.year < e.year && e.month === 1); }
function Lt(t, r, e, n, a) { let { displayMonths: o, months: s } = e, l = s.splice(0, s.length); return Array.from({ length: o }, (d, u) => { let m = Object.assign(t.getNext(r, "m", u), { day: 1 }); if (s[u] = null, !a) {
    let f = l.findIndex(B => B.firstDate.equals(m));
    f !== -1 && (s[u] = l.splice(f, 1)[0]);
} return m; }).forEach((d, u) => { s[u] === null && (s[u] = Yt(t, d, e, n, l.shift() || {})); }), s; }
function Yt(t, r, e, n, a = {}) { let { dayTemplateData: o, minDate: s, maxDate: l, firstDayOfWeek: c, markDisabled: d, outsideDays: u, weekdayWidth: m, weekdaysVisible: f } = e, B = t.getToday(); a.firstDate = null, a.lastDate = null, a.number = r.month, a.year = r.year, a.weeks = a.weeks || [], a.weekdays = a.weekdays || [], r = jt(t, r, c), f || (a.weekdays.length = 0); for (let A = 0; A < t.getWeeksPerMonth(); A++) {
    let O = a.weeks[A];
    O || (O = a.weeks[A] = { number: 0, days: [], collapsed: !0 });
    let p = O.days;
    for (let T = 0; T < t.getDaysPerWeek(); T++) {
        A === 0 && f && (a.weekdays[T] = n.getWeekdayLabel(t.getWeekday(r), m));
        let y = new _(r.year, r.month, r.day), Y = t.getNext(y), ne = n.getDayAriaLabel(y), k = !!(s && y.before(s) || l && y.after(l));
        !k && d && (k = d(y, { month: a.number, year: a.year }));
        let ie = y.equals(B), ae = o ? o(y, { month: a.number, year: a.year }) : void 0;
        a.firstDate === null && y.month === a.number && (a.firstDate = y), y.month === a.number && Y.month !== a.number && (a.lastDate = y);
        let E = p[T];
        E || (E = p[T] = {}), E.date = y, E.context = Object.assign(E.context || {}, { $implicit: y, date: y, data: ae, currentMonth: a.number, currentYear: a.year, disabled: k, focused: !1, selected: !1, today: ie }), E.tabindex = -1, E.ariaLabel = ne, E.hidden = !1, r = Y;
    }
    O.number = t.getWeekNumber(p.map(T => T.date), c), O.collapsed = u === "collapsed" && p[0].date.month !== a.number && p[p.length - 1].date.month !== a.number;
} return a; }
function jt(t, r, e) { let n = t.getDaysPerWeek(), a = new _(r.year, r.month, 1), o = t.getWeekday(a) % n; return t.getPrev(a, "d", (n + o - e) % n); }
var N = (() => { class t {
    getMonthLabel(e) { return `${this.getMonthFullName(e.month, e.year)} ${this.getYearNumerals(e.year)}`; }
    getDayNumerals(e) { return `${e.day}`; }
    getWeekNumerals(e) { return `${e}`; }
    getYearNumerals(e) { return `${e}`; }
    getWeekLabel() { return ""; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: () => new Ut }); }
} return t; })(), Ut = (() => { class t extends N {
    constructor() { super(...arguments), this._locale = h(ze), this._monthsShort = [...Array(12).keys()].map(e => Intl.DateTimeFormat(this._locale, { month: "short", timeZone: "UTC" }).format(Date.UTC(2e3, e))), this._monthsFull = [...Array(12).keys()].map(e => Intl.DateTimeFormat(this._locale, { month: "long", timeZone: "UTC" }).format(Date.UTC(2e3, e))); }
    getWeekdayLabel(e, n = "narrow") { return [1, 2, 3, 4, 5, 6, 7].map(o => Intl.DateTimeFormat(this._locale, { weekday: n, timeZone: "UTC" }).format(Date.UTC(2e3, 4, o)))[e - 1] || ""; }
    getMonthShortName(e) { return this._monthsShort[e - 1] || ""; }
    getMonthFullName(e) { return this._monthsFull[e - 1] || ""; }
    getDayAriaLabel(e) { let n = new Date(e.year, e.month - 1, e.day); return ot(n, "fullDate", this._locale); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })(), ye = (() => { class t {
    constructor() { this._VALIDATORS = { dayTemplateData: e => { if (this._state.dayTemplateData !== e)
            return { dayTemplateData: e }; }, displayMonths: e => { if (e = M(e), g(e) && e > 0 && this._state.displayMonths !== e)
            return { displayMonths: e }; }, disabled: e => { if (this._state.disabled !== e)
            return { disabled: e }; }, firstDayOfWeek: e => { if (e = M(e), g(e) && e >= 0 && this._state.firstDayOfWeek !== e)
            return { firstDayOfWeek: e }; }, focusVisible: e => { if (this._state.focusVisible !== e && !this._state.disabled)
            return { focusVisible: e }; }, markDisabled: e => { if (this._state.markDisabled !== e)
            return { markDisabled: e }; }, maxDate: e => { let n = this.toValidDate(e, null); if (P(this._state.maxDate, n))
            return { maxDate: n }; }, minDate: e => { let n = this.toValidDate(e, null); if (P(this._state.minDate, n))
            return { minDate: n }; }, navigation: e => { if (this._state.navigation !== e)
            return { navigation: e }; }, outsideDays: e => { if (this._state.outsideDays !== e)
            return { outsideDays: e }; }, weekdays: e => { let n = e === !0 || e === !1 ? "narrow" : e, a = e === !0 || e === !1 ? e : !0; if (this._state.weekdayWidth !== n || this._state.weekdaysVisible !== a)
            return { weekdayWidth: n, weekdaysVisible: a }; } }, this._calendar = h(R), this._i18n = h(N), this._model$ = new me, this._dateSelect$ = new me, this._state = { dayTemplateData: null, markDisabled: null, maxDate: null, minDate: null, disabled: !1, displayMonths: 1, firstDate: null, firstDayOfWeek: 1, lastDate: null, focusDate: null, focusVisible: !1, months: [], navigation: "select", outsideDays: "visible", prevDisabled: !1, nextDisabled: !1, selectedDate: null, selectBoxes: { years: [], months: [] }, weekdayWidth: "narrow", weekdaysVisible: !0 }; }
    get model$() { return this._model$.pipe(pe(e => e.months.length > 0)); }
    get dateSelect$() { return this._dateSelect$.pipe(pe(e => e !== null)); }
    set(e) { let n = Object.keys(e).map(a => this._VALIDATORS[a](e[a])).reduce((a, o) => j(j({}, a), o), {}); Object.keys(n).length > 0 && this._nextState(n); }
    focus(e) { let n = this.toValidDate(e, null); n != null && !this._state.disabled && P(this._state.focusDate, n) && this._nextState({ focusDate: e }); }
    focusSelect() { le(this._state.focusDate, this._state) && this.select(this._state.focusDate, { emitEvent: !0 }); }
    open(e) { let n = this.toValidDate(e, this._calendar.getToday()); n != null && !this._state.disabled && (!this._state.firstDate || je(this._state.firstDate, n)) && this._nextState({ firstDate: n }); }
    select(e, n = {}) { let a = this.toValidDate(e, null); a != null && !this._state.disabled && (P(this._state.selectedDate, a) && this._nextState({ selectedDate: a }), n.emitEvent && le(a, this._state) && this._dateSelect$.next(a)); }
    toValidDate(e, n) { let a = _.from(e); return n === void 0 && (n = this._calendar.getToday()), this._calendar.isValid(a) ? a : n; }
    getMonth(e) { for (let n of this._state.months)
        if (e.month === n.number && e.year === n.year)
            return n; throw new Error(`month ${e.month} of year ${e.year} not found`); }
    _nextState(e) { let n = this._updateState(e); this._patchContexts(n), this._state = n, this._model$.next(this._state); }
    _patchContexts(e) { let { months: n, displayMonths: a, selectedDate: o, focusDate: s, focusVisible: l, disabled: c, outsideDays: d } = e; e.months.forEach(u => { u.weeks.forEach(m => { m.days.forEach(f => { s && (f.context.focused = s.equals(f.date) && l), f.tabindex = !c && s && f.date.equals(s) && s.month === u.number ? 0 : -1, c === !0 && (f.context.disabled = !0), o !== void 0 && (f.context.selected = o !== null && o.equals(f.date)), u.number !== f.date.month && (f.hidden = d === "hidden" || d === "collapsed" || a > 1 && f.date.after(n[0].firstDate) && f.date.before(n[a - 1].lastDate)); }); }); }); }
    _updateState(e) { let n = Object.assign({}, this._state, e), a = n.firstDate; if (("minDate" in e || "maxDate" in e) && (It(n.minDate, n.maxDate), n.focusDate = U(n.focusDate, n.minDate, n.maxDate), n.firstDate = U(n.firstDate, n.minDate, n.maxDate), a = n.focusDate), "disabled" in e && (n.focusVisible = !1), "selectedDate" in e && this._state.months.length === 0 && (a = n.selectedDate), "focusVisible" in e || "focusDate" in e && (n.focusDate = U(n.focusDate, n.minDate, n.maxDate), a = n.focusDate, n.months.length !== 0 && n.focusDate && !n.focusDate.before(n.firstDate) && !n.focusDate.after(n.lastDate)))
        return n; if ("firstDate" in e && (n.firstDate = U(n.firstDate, n.minDate, n.maxDate), a = n.firstDate), a) {
        let o = "dayTemplateData" in e || "firstDayOfWeek" in e || "markDisabled" in e || "minDate" in e || "maxDate" in e || "disabled" in e || "outsideDays" in e || "weekdaysVisible" in e, s = Lt(this._calendar, a, n, this._i18n, o);
        n.months = s, n.firstDate = s[0].firstDate, n.lastDate = s[s.length - 1].lastDate, "selectedDate" in e && !le(n.selectedDate, n) && (n.selectedDate = null), "firstDate" in e && (!n.focusDate || n.focusDate.before(n.firstDate) || n.focusDate.after(n.lastDate)) && (n.focusDate = a);
        let l = !this._state.firstDate || this._state.firstDate.year !== n.firstDate.year, c = !this._state.firstDate || this._state.firstDate.month !== n.firstDate.month;
        n.navigation === "select" ? (("minDate" in e || "maxDate" in e || n.selectBoxes.years.length === 0 || l) && (n.selectBoxes.years = Wt(n.firstDate, n.minDate, n.maxDate)), ("minDate" in e || "maxDate" in e || n.selectBoxes.months.length === 0 || l) && (n.selectBoxes.months = Vt(this._calendar, n.firstDate, n.minDate, n.maxDate))) : n.selectBoxes = { years: [], months: [] }, (n.navigation === "arrows" || n.navigation === "select") && (c || l || "minDate" in e || "maxDate" in e || "disabled" in e) && (n.prevDisabled = n.disabled || Ht(this._calendar, n.firstDate, n.minDate), n.nextDisabled = n.disabled || $t(this._calendar, n.lastDate, n.maxDate));
    } return n; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })(), X = (function (t) { return t[t.PREV = 0] = "PREV", t[t.NEXT = 1] = "NEXT", t; })(X || {}), Te = (() => { class t {
    constructor() { this.displayMonths = 1, this.firstDayOfWeek = 1, this.navigation = "select", this.outsideDays = "visible", this.showWeekNumbers = !1, this.weekdays = "narrow"; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac }); }
} return t; })();
function Kt() { return new Zt; }
var te = (() => { class t {
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: () => Kt() }); }
} return t; })(), Zt = (() => { class t extends te {
    fromModel(e) { return e && g(e.year) && g(e.month) && g(e.day) ? { year: e.year, month: e.month, day: e.day } : null; }
    toModel(e) { return e && g(e.year) && g(e.month) && g(e.day) ? { year: e.year, month: e.month, day: e.day } : null; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })(), Jt = (() => { class t {
    processKey(e, n) { let { state: a, calendar: o } = n; switch (e.key) {
        case "PageUp":
            n.focusDate(o.getPrev(a.focusedDate, e.shiftKey ? "y" : "m", 1));
            break;
        case "PageDown":
            n.focusDate(o.getNext(a.focusedDate, e.shiftKey ? "y" : "m", 1));
            break;
        case "End":
            n.focusDate(e.shiftKey ? a.maxDate : a.lastDate);
            break;
        case "Home":
            n.focusDate(e.shiftKey ? a.minDate : a.firstDate);
            break;
        case "ArrowLeft":
            n.focusDate(o.getPrev(a.focusedDate, "d", 1));
            break;
        case "ArrowUp":
            n.focusDate(o.getPrev(a.focusedDate, "d", o.getDaysPerWeek()));
            break;
        case "ArrowRight":
            n.focusDate(o.getNext(a.focusedDate, "d", 1));
            break;
        case "ArrowDown":
            n.focusDate(o.getNext(a.focusedDate, "d", o.getDaysPerWeek()));
            break;
        case "Enter":
        case " ":
            n.focusSelect();
            break;
        default: return;
    } e.preventDefault(), e.stopPropagation(); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac }); }
} return t; })(), qt = (() => {
    class t {
        constructor() { this.i18n = h(N); }
        isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
        static { this.\u0275fac = function (n) { return new (n || t); }; }
        static {
            this.\u0275cmp = i.\u0275\u0275defineComponent({ type: t, selectors: [["", "ngbDatepickerDayView", ""]], hostAttrs: [1, "btn-light"], hostVars: 10, hostBindings: function (n, a) { n & 2 && i.\u0275\u0275classProp("bg-primary", a.selected)("text-white", a.selected)("text-muted", a.isMuted())("outside", a.isMuted())("active", a.focused); }, inputs: { currentMonth: "currentMonth", date: "date", disabled: "disabled", focused: "focused", selected: "selected" }, decls: 1, vars: 1, template: function (n, a) { n & 1 && i.\u0275\u0275text(0), n & 2 && i.\u0275\u0275textInterpolate(a.i18n.getDayNumerals(a.date)); }, styles: [`[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView]:hover:not(.bg-primary),[ngbDatepickerDayView].active:not(.bg-primary){background-color:var(--%NS%bs-tertiary-bg);outline:1px solid var(--%NS%bs-border-color)}[ngbDatepickerDayView].outside{opacity:.5}
`], encapsulation: 2 });
        }
    }
    return t;
})(), zt = (() => {
    class t {
        constructor() { this._month = -1, this._year = -1, this.i18n = h(N), this.select = new S; }
        changeMonth(e) { this.select.emit(new _(this.date.year, M(e), 1)); }
        changeYear(e) { this.select.emit(new _(M(e), this.date.month, 1)); }
        ngAfterViewChecked() { this.date && (this.date.month !== this._month && (this._month = this.date.month, this.monthSelect.nativeElement.value = `${this._month}`), this.date.year !== this._year && (this._year = this.date.year, this.yearSelect.nativeElement.value = `${this._year}`)); }
        static { this.\u0275fac = function (n) { return new (n || t); }; }
        static {
            this.\u0275cmp = i.\u0275\u0275defineComponent({ type: t, selectors: [["ngb-datepicker-navigation-select"]], viewQuery: function (n, a) { if (n & 1 && i.\u0275\u0275viewQuery(st, 7, Q)(lt, 7, Q), n & 2) {
                    let o;
                    i.\u0275\u0275queryRefresh(o = i.\u0275\u0275loadQuery()) && (a.monthSelect = o.first), i.\u0275\u0275queryRefresh(o = i.\u0275\u0275loadQuery()) && (a.yearSelect = o.first);
                } }, inputs: { date: "date", disabled: "disabled", months: "months", years: "years" }, outputs: { select: "select" }, decls: 8, vars: 2, consts: () => { let e; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? e = goog.getMsg("Select month") : e = $localize `:@@ngb.datepicker.select-month:Select month`; let n; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? n = goog.getMsg("Select month") : n = $localize `:@@ngb.datepicker.select-month:Select month`; let a; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? a = goog.getMsg("Select year") : a = $localize `:@@ngb.datepicker.select-year:Select year`; let o; return typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? o = goog.getMsg("Select year") : o = $localize `:@@ngb.datepicker.select-year:Select year`, [["month", ""], ["year", ""], ["aria-label", e, "title", n, 1, "form-select", 3, "change", "disabled"], [3, "value"], ["aria-label", a, "title", o, 1, "form-select", 3, "change", "disabled"]]; }, template: function (n, a) { n & 1 && (i.\u0275\u0275domElementStart(0, "select", 2, 0), i.\u0275\u0275domListener("change", function (s) { return a.changeMonth(s.target.value); }), i.\u0275\u0275repeaterCreate(2, ct, 2, 3, "option", 3, i.\u0275\u0275repeaterTrackByIdentity), i.\u0275\u0275domElementEnd(), i.\u0275\u0275domElementStart(4, "select", 4, 1), i.\u0275\u0275domListener("change", function (s) { return a.changeYear(s.target.value); }), i.\u0275\u0275repeaterCreate(6, dt, 2, 2, "option", 3, i.\u0275\u0275repeaterTrackByIdentity), i.\u0275\u0275domElementEnd()), n & 2 && (i.\u0275\u0275domProperty("disabled", a.disabled), i.\u0275\u0275advance(2), i.\u0275\u0275repeater(a.months), i.\u0275\u0275advance(2), i.\u0275\u0275domProperty("disabled", a.disabled), i.\u0275\u0275advance(2), i.\u0275\u0275repeater(a.years)); }, styles: [`ngb-datepicker-navigation-select>.form-select{flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.form-select:focus{z-index:1}ngb-datepicker-navigation-select>.form-select::-ms-value{background-color:transparent!important}
`], encapsulation: 2 });
        }
    }
    return t;
})(), Qt = (() => {
    class t {
        constructor() { this.navigation = X, this.i18n = h(N), this.months = [], this.navigate = new S, this.select = new S; }
        onClickPrev(e) { e.currentTarget.focus(), this.navigate.emit(this.navigation.PREV); }
        onClickNext(e) { e.currentTarget.focus(), this.navigate.emit(this.navigation.NEXT); }
        idMonth(e) { return e; }
        static { this.\u0275fac = function (n) { return new (n || t); }; }
        static {
            this.\u0275cmp = i.\u0275\u0275defineComponent({ type: t, selectors: [["ngb-datepicker-navigation"]], inputs: { date: "date", disabled: "disabled", months: "months", showSelect: "showSelect", prevDisabled: "prevDisabled", nextDisabled: "nextDisabled", selectBoxes: "selectBoxes" }, outputs: { navigate: "navigate", select: "select" }, decls: 11, vars: 4, consts: () => { let e; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? e = goog.getMsg("Previous month") : e = $localize `:@@ngb.datepicker.previous-month:Previous month`; let n; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? n = goog.getMsg("Previous month") : n = $localize `:@@ngb.datepicker.previous-month:Previous month`; let a; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? a = goog.getMsg("Next month") : a = $localize `:@@ngb.datepicker.next-month:Next month`; let o; return typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? o = goog.getMsg("Next month") : o = $localize `:@@ngb.datepicker.next-month:Next month`, [[1, "ngb-dp-arrow", "ngb-dp-arrow-prev"], ["type", "button", "aria-label", e, "title", n, 1, "btn", "btn-link", "ngb-dp-arrow-btn", 3, "click", "disabled"], [1, "ngb-dp-navigation-chevron"], [1, "ngb-dp-navigation-select", 3, "date", "disabled", "months", "years"], ["aria-live", "polite", 1, "visually-hidden"], [1, "ngb-dp-arrow", "ngb-dp-arrow-next"], ["type", "button", "aria-label", a, "title", o, 1, "btn", "btn-link", "ngb-dp-arrow-btn", 3, "click", "disabled"], [1, "ngb-dp-navigation-select", 3, "select", "date", "disabled", "months", "years"], [1, "ngb-dp-arrow"], [1, "ngb-dp-month-name"]]; }, template: function (n, a) { n & 1 && (i.\u0275\u0275elementStart(0, "div", 0)(1, "button", 1), i.\u0275\u0275listener("click", function (s) { return a.onClickPrev(s); }), i.\u0275\u0275element(2, "span", 2), i.\u0275\u0275elementEnd()(), i.\u0275\u0275conditionalCreate(3, ut, 1, 4, "ngb-datepicker-navigation-select", 3), i.\u0275\u0275conditionalCreate(4, gt, 2, 0), i.\u0275\u0275elementStart(5, "div", 4), i.\u0275\u0275repeaterCreate(6, mt, 2, 1, "span", null, Le, !0), i.\u0275\u0275elementEnd(), i.\u0275\u0275elementStart(8, "div", 5)(9, "button", 6), i.\u0275\u0275listener("click", function (s) { return a.onClickNext(s); }), i.\u0275\u0275element(10, "span", 2), i.\u0275\u0275elementEnd()()), n & 2 && (i.\u0275\u0275advance(), i.\u0275\u0275property("disabled", a.prevDisabled), i.\u0275\u0275advance(2), i.\u0275\u0275conditional(a.showSelect ? 3 : -1), i.\u0275\u0275advance(), i.\u0275\u0275conditional(a.showSelect ? -1 : 4), i.\u0275\u0275advance(2), i.\u0275\u0275repeater(a.months), i.\u0275\u0275advance(3), i.\u0275\u0275property("disabled", a.nextDisabled)); }, dependencies: [zt], styles: [`ngb-datepicker-navigation{display:flex;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;transform:rotate(-135deg)}.ngb-dp-arrow{display:flex;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow-next{justify-content:flex-end}.ngb-dp-arrow-next .ngb-dp-navigation-chevron{transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:flex;flex:1 1 9rem}
`], encapsulation: 2 });
        }
    }
    return t;
})(), Xt = (() => { class t {
    constructor() { this.templateRef = h(Qe); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275dir = i.\u0275\u0275defineDirective({ type: t, selectors: [["ng-template", "ngbDatepickerContent", ""]] }); }
} return t; })(), en = (() => {
    class t {
        constructor() { this._keyboardService = h(Jt), this._service = h(ye), this.i18n = h(N), this.datepicker = h(Ue); }
        set month(e) { this.viewModel = this._service.getMonth(e); }
        onKeyDown(e) { this._keyboardService.processKey(e, this.datepicker); }
        doSelect(e) { !e.context.disabled && !e.hidden && this.datepicker.onDateSelect(e.date); }
        static { this.\u0275fac = function (n) { return new (n || t); }; }
        static {
            this.\u0275cmp = i.\u0275\u0275defineComponent({ type: t, selectors: [["ngb-datepicker-month"]], hostAttrs: ["role", "grid"], hostBindings: function (n, a) { n & 1 && i.\u0275\u0275listener("keydown", function (s) { return a.onKeyDown(s); }); }, inputs: { month: "month" }, decls: 3, vars: 1, consts: [["role", "row", 1, "ngb-dp-week", "ngb-dp-weekdays"], [1, "ngb-dp-weekday", "ngb-dp-showweek", "small"], ["role", "columnheader", 1, "ngb-dp-weekday", "small"], ["role", "row", 1, "ngb-dp-week"], [1, "ngb-dp-week-number", "small", "text-muted"], ["role", "gridcell", 1, "ngb-dp-day", 3, "disabled", "tabindex", "hidden", "ngb-dp-today"], ["role", "gridcell", 1, "ngb-dp-day", 3, "click", "tabindex"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function (n, a) { n & 1 && (i.\u0275\u0275conditionalCreate(0, yt, 4, 1, "div", 0), i.\u0275\u0275repeaterCreate(1, Ot, 1, 1, null, null, i.\u0275\u0275repeaterTrackByIdentity)), n & 2 && (i.\u0275\u0275conditional(a.viewModel.weekdays.length > 0 ? 0 : -1), i.\u0275\u0275advance(), i.\u0275\u0275repeater(a.viewModel.weeks)); }, dependencies: [He], styles: [`ngb-datepicker-month{display:block}.ngb-dp-weekday,.ngb-dp-week-number{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:var(--%NS%bs-info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{border-bottom:1px solid var(--%NS%bs-border-color);border-radius:0;background-color:var(--%NS%bs-tertiary-bg)}.ngb-dp-day,.ngb-dp-weekday,.ngb-dp-week-number{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex="0"]{z-index:1}
`], encapsulation: 2, changeDetection: 1 });
        }
    }
    return t;
})(), Ue = (() => {
    class t {
        constructor() { this.injector = h(_e), this._service = h(ye), this._calendar = h(R), this._i18n = h(N), this._config = h(Te), this._nativeElement = h(Q).nativeElement, this._ngbDateAdapter = h(te), this._ngZone = h(Ve), this._destroyRef = h(Xe), this._injector = h(_e), this._controlValue = null, this._publicState = {}, this._initialized = !1, this.dayTemplate = this._config.dayTemplate, this.dayTemplateData = this._config.dayTemplateData, this.displayMonths = this._config.displayMonths, this.firstDayOfWeek = this._config.firstDayOfWeek, this.footerTemplate = this._config.footerTemplate, this.markDisabled = this._config.markDisabled, this.maxDate = this._config.maxDate, this.minDate = this._config.minDate, this.navigation = this._config.navigation, this.outsideDays = this._config.outsideDays, this.showWeekNumbers = this._config.showWeekNumbers, this.startDate = this._config.startDate, this.weekdays = this._config.weekdays, this.navigate = new S, this.dateSelect = new S, this.onChange = n => { }, this.onTouched = () => { }; let e = h(We); this._service.dateSelect$.pipe(se()).subscribe(n => { this.dateSelect.emit(n); }), this._service.model$.pipe(se()).subscribe(n => { let a = n.firstDate, o = this.model ? this.model.firstDate : null; this._publicState = { maxDate: n.maxDate, minDate: n.minDate, firstDate: n.firstDate, lastDate: n.lastDate, focusedDate: n.focusDate, months: n.months.map(u => u.firstDate) }; let s = !1; if (!a.equals(o) && (this.navigate.emit({ current: o ? { year: o.year, month: o.month } : null, next: { year: a.year, month: a.month }, preventDefault: () => s = !0 }), s && o !== null)) {
            this._service.open(o);
            return;
        } let l = n.selectedDate, c = n.focusDate, d = this.model ? this.model.focusDate : null; this.model = n, P(l, this._controlValue) && (this._controlValue = l, this.onTouched(), this.onChange(this._ngbDateAdapter.toModel(l))), P(c, d) && d && n.focusVisible && this.focus(), e.markForCheck(); }); }
        get state() { return this._publicState; }
        get calendar() { return this._calendar; }
        get i18n() { return this._i18n; }
        focusDate(e) { this._service.focus(_.from(e)); }
        focusSelect() { this._service.focusSelect(); }
        focus() { et({ read: () => { this._nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]')?.focus(); } }, { injector: this._injector }); }
        navigateTo(e) { this._service.open(_.from(e ? e.day ? e : Ee(j({}, e), { day: 1 }) : null)); }
        ngAfterViewInit() { this._ngZone.runOutsideAngular(() => { let e = xe(this._contentEl.nativeElement, "focusin"), n = xe(this._contentEl.nativeElement, "focusout"); at(e, n).pipe(pe(a => { let o = a.target, s = a.relatedTarget; return !(o?.classList.contains("ngb-dp-day") && s?.classList.contains("ngb-dp-day") && this._nativeElement.contains(o) && this._nativeElement.contains(s)); }), se(this._destroyRef)).subscribe(({ type: a }) => this._ngZone.run(() => this._service.set({ focusVisible: a === "focusin" }))); }); }
        ngOnInit() { if (this.model === void 0) {
            let e = {};
            ["dayTemplateData", "displayMonths", "markDisabled", "firstDayOfWeek", "navigation", "minDate", "maxDate", "outsideDays", "weekdays"].forEach(n => e[n] = this[n]), this._service.set(e), this.navigateTo(this.startDate);
        } this.dayTemplate || (this.dayTemplate = this._defaultDayTemplate), this._initialized = !0; }
        ngOnChanges(e) { let n = {}; if (["dayTemplateData", "displayMonths", "markDisabled", "firstDayOfWeek", "navigation", "minDate", "maxDate", "outsideDays", "weekdays"].filter(a => a in e).forEach(a => n[a] = this[a]), this._service.set(n), "startDate" in e && this._initialized) {
            let { currentValue: a, previousValue: o } = e.startDate;
            je(o, a) && this.navigateTo(this.startDate);
        } }
        onDateSelect(e) { this._service.focus(e), this._service.select(e, { emitEvent: !0 }); }
        onNavigateDateSelect(e) { this._service.open(e); }
        onNavigateEvent(e) { switch (e) {
            case X.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, "m", 1));
                break;
            case X.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, "m", 1));
                break;
        } }
        registerOnChange(e) { this.onChange = e; }
        registerOnTouched(e) { this.onTouched = e; }
        setDisabledState(e) { this._service.set({ disabled: e }); }
        writeValue(e) { this._controlValue = _.from(this._ngbDateAdapter.fromModel(e)), this._service.select(this._controlValue); }
        static { this.\u0275fac = function (n) { return new (n || t); }; }
        static {
            this.\u0275cmp = i.\u0275\u0275defineComponent({ type: t, selectors: [["ngb-datepicker"]], contentQueries: function (n, a, o) { if (n & 1 && i.\u0275\u0275contentQuery(o, Xt, 7), n & 2) {
                    let s;
                    i.\u0275\u0275queryRefresh(s = i.\u0275\u0275loadQuery()) && (a.contentTemplateFromContent = s.first);
                } }, viewQuery: function (n, a) { if (n & 1 && i.\u0275\u0275viewQuery(kt, 7)(Et, 7), n & 2) {
                    let o;
                    i.\u0275\u0275queryRefresh(o = i.\u0275\u0275loadQuery()) && (a._defaultDayTemplate = o.first), i.\u0275\u0275queryRefresh(o = i.\u0275\u0275loadQuery()) && (a._contentEl = o.first);
                } }, hostVars: 2, hostBindings: function (n, a) { n & 2 && i.\u0275\u0275classProp("disabled", a.model.disabled); }, inputs: { contentTemplate: "contentTemplate", dayTemplate: "dayTemplate", dayTemplateData: "dayTemplateData", displayMonths: "displayMonths", firstDayOfWeek: "firstDayOfWeek", footerTemplate: "footerTemplate", markDisabled: "markDisabled", maxDate: "maxDate", minDate: "minDate", navigation: "navigation", outsideDays: "outsideDays", showWeekNumbers: "showWeekNumbers", startDate: "startDate", weekdays: "weekdays" }, outputs: { navigate: "navigate", dateSelect: "dateSelect" }, exportAs: ["ngbDatepicker"], features: [i.\u0275\u0275ProvidersFeature([{ provide: $e, useExisting: ge(() => t), multi: !0 }, ye]), i.\u0275\u0275NgOnChangesFeature], decls: 10, vars: 9, consts: [["defaultDayTemplate", ""], ["defaultContentTemplate", ""], ["content", ""], [1, "ngb-dp-header"], [3, "date", "months", "disabled", "showSelect", "prevDisabled", "nextDisabled", "selectBoxes"], [1, "ngb-dp-content"], [3, "ngTemplateOutlet", "ngTemplateOutletContext", "ngTemplateOutletInjector"], [3, "ngTemplateOutlet"], ["ngbDatepickerDayView", "", 3, "date", "currentMonth", "selected", "disabled", "focused"], [1, "ngb-dp-month"], [1, "ngb-dp-month-name"], [3, "month"], [3, "navigate", "select", "date", "months", "disabled", "showSelect", "prevDisabled", "nextDisabled", "selectBoxes"]], template: function (n, a) { if (n & 1 && (i.\u0275\u0275template(0, wt, 1, 5, "ng-template", null, 0, i.\u0275\u0275templateRefExtractor)(2, xt, 2, 0, "ng-template", null, 1, i.\u0275\u0275templateRefExtractor), i.\u0275\u0275elementStart(4, "div", 3), i.\u0275\u0275conditionalCreate(5, Ct, 1, 7, "ngb-datepicker-navigation", 4), i.\u0275\u0275elementEnd(), i.\u0275\u0275elementStart(6, "div", 5, 2), i.\u0275\u0275template(8, Pt, 0, 0, "ng-template", 6), i.\u0275\u0275elementEnd(), i.\u0275\u0275template(9, Ft, 0, 0, "ng-template", 7)), n & 2) {
                    let o = i.\u0275\u0275reference(3);
                    i.\u0275\u0275advance(5), i.\u0275\u0275conditional(a.navigation !== "none" ? 5 : -1), i.\u0275\u0275advance(), i.\u0275\u0275classProp("ngb-dp-months", !a.contentTemplate), i.\u0275\u0275advance(2), i.\u0275\u0275property("ngTemplateOutlet", a.contentTemplate || a.contentTemplateFromContent?.templateRef || o)("ngTemplateOutletContext", i.\u0275\u0275pureFunction1(7, St, a))("ngTemplateOutletInjector", a.injector), i.\u0275\u0275advance(), i.\u0275\u0275property("ngTemplateOutlet", a.footerTemplate);
                } }, dependencies: [He, qt, en, Qt], styles: [`ngb-datepicker{border:1px solid var(--%NS%bs-border-color);border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}ngb-datepicker.disabled .ngb-dp-weekday,ngb-datepicker.disabled .ngb-dp-week-number,ngb-datepicker.disabled .ngb-dp-month-name{color:var(--%NS%bs-text-muted)}.ngb-dp-body{z-index:1055}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:var(--%NS%bs-tertiary-bg)}.ngb-dp-months{display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:var(--%NS%bs-tertiary-bg)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}
`], encapsulation: 2 });
        }
    }
    return t;
})();
function tn() { return new nn; }
var Ke = (() => { class t {
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: () => tn() }); }
} return t; })(), nn = (() => { class t extends Ke {
    parse(e) { if (e != null) {
        let n = e.trim().split("-");
        if (n.length === 1 && b(n[0]))
            return { year: M(n[0]), month: null, day: null };
        if (n.length === 2 && b(n[0]) && b(n[1]))
            return { year: M(n[0]), month: M(n[1]), day: null };
        if (n.length === 3 && b(n[0]) && b(n[1]) && b(n[2]))
            return { year: M(n[0]), month: M(n[1]), day: M(n[2]) };
    } return null; }
    format(e) { return e ? `${e.year}-${b(e.month) ? oe(e.month) : ""}-${b(e.day) ? oe(e.day) : ""}` : ""; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })(), Ce = (() => { class t extends Te {
    constructor() { super(...arguments), this.autoClose = !0, this.placement = ["bottom-start", "bottom-end", "top-start", "top-end"], this.popperOptions = e => e, this.restoreFocus = !0; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac }); }
} return t; })(), ei = (() => { class t {
    constructor() { this._parserFormatter = h(Ke), this._elRef = h(Q), this._vcRef = h(tt), this._ngZone = h(Ve), this._calendar = h(R), this._dateAdapter = h(te), this._document = h(nt), this._changeDetector = h(We), this._injector = h(_e), this._config = h(Ce), this._cRef = null, this._disabled = !1, this._elWithFocus = null, this._model = null, this._positioning = Se(), this._destroyCloseHandlers$ = new me, this.autoClose = this._config.autoClose, this.placement = this._config.placement, this.popperOptions = this._config.popperOptions, this.container = this._config.container, this.positionTarget = this._config.positionTarget, this.dateSelect = new S, this.navigate = new S, this.closed = new S, this._onChange = e => { }, this._onTouched = () => { }, this._validatorChange = () => { }; }
    get disabled() { return this._disabled; }
    set disabled(e) { this._disabled = e === "" || e && e !== "false", this.isOpen() && this._cRef.instance.setDisabledState(this._disabled); }
    registerOnChange(e) { this._onChange = e; }
    registerOnTouched(e) { this._onTouched = e; }
    registerOnValidatorChange(e) { this._validatorChange = e; }
    setDisabledState(e) { this.disabled = e; }
    validate(e) { let { value: n } = e; if (n != null) {
        let a = this._fromDateStruct(this._dateAdapter.fromModel(n));
        if (!a)
            return { ngbDate: { invalid: n } };
        if (this.minDate && a.before(_.from(this.minDate)))
            return { ngbDate: { minDate: { minDate: this.minDate, actual: n } } };
        if (this.maxDate && a.after(_.from(this.maxDate)))
            return { ngbDate: { maxDate: { maxDate: this.maxDate, actual: n } } };
    } return null; }
    writeValue(e) { this._model = this._fromDateStruct(this._dateAdapter.fromModel(e)), this._writeModelValue(this._model); }
    manualDateChange(e, n = !1) { let a = e !== this._inputValue; a && (this._inputValue = e, this._model = this._fromDateStruct(this._parserFormatter.parse(e))), (a || !n) && this._onChange(this._model ? this._dateAdapter.toModel(this._model) : e === "" ? null : e), n && this._model && this._writeModelValue(this._model); }
    isOpen() { return !!this._cRef; }
    open() { if (!this.isOpen()) {
        this._cRef = this._vcRef.createComponent(Ue, { injector: this._injector }), this._applyPopupStyling(this._cRef.location.nativeElement), this._applyDatepickerInputs(this._cRef), this._subscribeForDatepickerOutputs(this._cRef.instance), this._cRef.instance.ngOnInit(), this._cRef.instance.writeValue(this._dateAdapter.toModel(this._model)), this._cRef.instance.registerOnChange(n => { this.writeValue(n), this._onChange(n), this._onTouched(); }), this._cRef.changeDetectorRef.detectChanges(), this._cRef.instance.setDisabledState(this.disabled), this.container === "body" && this._document.querySelector(this.container)?.appendChild(this._cRef.location.nativeElement), this._elWithFocus = this._document.activeElement, Re(this._ngZone, this._cRef.location.nativeElement, this.closed, !0), setTimeout(() => this._cRef?.instance.focus());
        let e;
        if (re(this.positionTarget) ? e = this._document.querySelector(this.positionTarget) : this.positionTarget instanceof HTMLElement ? e = this.positionTarget : e = this._elRef.nativeElement, this.positionTarget && !e)
            throw new Error("ngbDatepicker could not find element declared in [positionTarget] to position against.");
        this._ngZone.runOutsideAngular(() => { this._cRef && e && (this._positioning.createPopper({ hostElement: e, targetElement: this._cRef.location.nativeElement, placement: this.placement, updatePopperOptions: n => this.popperOptions(Ae([0, 2])(n)) }), this._afterRenderRef = it({ mixedReadWrite: () => { this._positioning.update(); } }, { injector: this._injector })); }), this._setCloseHandlers();
    } }
    close() { if (this.isOpen()) {
        this._cRef?.destroy(), this._cRef = null, this._positioning.destroy(), this._afterRenderRef?.destroy(), this._destroyCloseHandlers$.next(), this.closed.emit(), this._changeDetector.markForCheck();
        let e = this._elWithFocus;
        re(this.restoreFocus) ? e = this._document.querySelector(this.restoreFocus) : this.restoreFocus !== void 0 && (e = this.restoreFocus), e && e.focus ? e.focus() : this._document.body.focus();
    } }
    toggle() { this.isOpen() ? this.close() : this.open(); }
    navigateTo(e) { this.isOpen() && this._cRef.instance.navigateTo(e); }
    onBlur() { this._onTouched(); }
    onFocus() { this._elWithFocus = this._elRef.nativeElement; }
    ngOnChanges(e) { if ((e.minDate || e.maxDate) && (this._validatorChange(), this.isOpen() && (e.minDate && this._cRef.setInput("minDate", this.minDate), e.maxDate && this._cRef.setInput("maxDate", this.maxDate))), e.datepickerClass) {
        let { currentValue: n, previousValue: a } = e.datepickerClass;
        this._applyPopupClass(n, a);
    } e.autoClose && this.isOpen() && this._setCloseHandlers(); }
    ngOnDestroy() { this.close(); }
    _applyDatepickerInputs(e) { ["contentTemplate", "dayTemplate", "dayTemplateData", "displayMonths", "firstDayOfWeek", "footerTemplate", "markDisabled", "minDate", "maxDate", "navigation", "outsideDays", "showNavigation", "showWeekNumbers", "weekdays"].forEach(n => { this[n] !== void 0 && e.setInput(n, this[n]); }), e.setInput("startDate", this.startDate || this._model); }
    _applyPopupClass(e, n) { let a = this._cRef?.location.nativeElement; a && (e && a.classList.add(e), n && a.classList.remove(n)); }
    _applyPopupStyling(e) { e.classList.add("dropdown-menu", "show"), this.container === "body" && e.classList.add("ngb-dp-body"), this._applyPopupClass(this.datepickerClass); }
    _subscribeForDatepickerOutputs(e) { e.navigate.subscribe(n => this.navigate.emit(n)), e.dateSelect.subscribe(n => { this.dateSelect.emit(n), (this.autoClose === !0 || this.autoClose === "inside") && this.close(); }); }
    _writeModelValue(e) { let n = this._parserFormatter.format(e); this._inputValue = n, this._elRef.nativeElement.value = n, this.isOpen() && (this._cRef.instance.writeValue(this._dateAdapter.toModel(e)), this._onTouched()); }
    _fromDateStruct(e) { let n = e ? new _(e.year, e.month, e.day) : null; return this._calendar.isValid(n) ? n : null; }
    _setCloseHandlers() { this._destroyCloseHandlers$.next(), we(this._ngZone, this._document, this.autoClose, () => this.close(), this._destroyCloseHandlers$, [], [this._elRef.nativeElement, this._cRef.location.nativeElement]); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275dir = i.\u0275\u0275defineDirective({ type: t, selectors: [["input", "ngbDatepicker", ""]], hostVars: 1, hostBindings: function (n, a) { n & 1 && i.\u0275\u0275listener("input", function (s) { return a.manualDateChange(s.target.value); })("change", function (s) { return a.manualDateChange(s.target.value, !0); })("focus", function () { return a.onFocus(); })("blur", function () { return a.onBlur(); }), n & 2 && i.\u0275\u0275domProperty("disabled", a.disabled); }, inputs: { autoClose: "autoClose", contentTemplate: "contentTemplate", datepickerClass: "datepickerClass", dayTemplate: "dayTemplate", dayTemplateData: "dayTemplateData", displayMonths: "displayMonths", firstDayOfWeek: "firstDayOfWeek", footerTemplate: "footerTemplate", markDisabled: "markDisabled", minDate: "minDate", maxDate: "maxDate", navigation: "navigation", outsideDays: "outsideDays", placement: "placement", popperOptions: "popperOptions", restoreFocus: "restoreFocus", showWeekNumbers: "showWeekNumbers", startDate: "startDate", container: "container", positionTarget: "positionTarget", weekdays: "weekdays", disabled: "disabled" }, outputs: { dateSelect: "dateSelect", navigate: "navigate", closed: "closed" }, exportAs: ["ngbDatepicker"], features: [i.\u0275\u0275ProvidersFeature([{ provide: $e, useExisting: ge(() => t), multi: !0 }, { provide: rt, useExisting: ge(() => t), multi: !0 }, { provide: Te, useExisting: Ce }]), i.\u0275\u0275NgOnChangesFeature] }); }
} return t; })(), an = (() => { class t extends R {
    getDaysPerWeek() { return 7; }
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    getWeeksPerMonth() { return 6; }
    getNext(e, n = "d", a = 1) { switch (e = new _(e.year, e.month, e.day), n) {
        case "y": return e = this._setYear(e, e.year + a), e.month = 1, e.day = 1, e;
        case "m": return e = this._setMonth(e, e.month + a), e.day = 1, e;
        case "d": return this._setDay(e, e.day + a);
        default: return e;
    } }
    getPrev(e, n = "d", a = 1) { return this.getNext(e, n, -a); }
    getWeekday(e) { let n = this.toGregorian(e).getDay(); return n === 0 ? 7 : n; }
    getWeekNumber(e, n) { n === 7 && (n = 0); let a = (11 - n) % 7, o = e[a], s = this.toGregorian(o); s.setDate(s.getDate() + 4 - (s.getDay() || 7)); let l = s.getTime(), c = this.toGregorian(new _(o.year, 1, 1)); return Math.floor(Math.round((l - c.getTime()) / 864e5) / 7) + 1; }
    getToday() { return this.fromGregorian(new Date); }
    isValid(e) { return e != null && b(e.year) && b(e.month) && b(e.day) && !isNaN(this.toGregorian(e).getTime()); }
    _setDay(e, n) { n = +n; let a = this.getDaysPerMonth(e.month, e.year); if (n <= 0)
        for (; n <= 0;)
            e = this._setMonth(e, e.month - 1), a = this.getDaysPerMonth(e.month, e.year), n += a;
    else if (n > a)
        for (; n > a;)
            n -= a, e = this._setMonth(e, e.month + 1), a = this.getDaysPerMonth(e.month, e.year); return e.day = n, e; }
    _setMonth(e, n) { return n = +n, e.year = e.year + Math.floor((n - 1) / 12), e.month = Math.floor(((n - 1) % 12 + 12) % 12) + 1, e; }
    _setYear(e, n) { return e.year = +n, e; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })();
function rn(t) { return (14 + 11 * t) % 30 < 11; }
function K(t) { let r = t.getFullYear(); return r % 4 === 0 && r % 100 !== 0 || r % 400 === 0; }
function on(t, r) { return Math.ceil(29.5 * r) + (t - 1) * 354 + Math.floor((3 + 11 * t) / 30); }
function sn(t) { return (t - 1) * 354 + Math.floor((3 + 11 * t) / 30); }
function ce(t, r) { return t - r * Math.floor(t / r); }
var G = 17214255e-1, Pe = 19484395e-1, ln = (() => { class t extends an {
    fromGregorian(e) { let n = e.getFullYear(), a = e.getMonth(), o = e.getDate(), s = G - 1 + 365 * (n - 1) + Math.floor((n - 1) / 4) + -Math.floor((n - 1) / 100) + Math.floor((n - 1) / 400) + Math.floor((367 * (a + 1) - 362) / 12 + (a + 1 <= 2 ? 0 : K(e) ? -1 : -2) + o); s = Math.floor(s) + .5; let l = s - Pe, c = Math.floor((30 * l + 10646) / 10631), d = Math.ceil((l - 29 - sn(c)) / 29.5); d = Math.min(d, 11); let u = Math.ceil(l - on(c, d)) + 1; return new _(c, d + 1, u); }
    toGregorian(e) { let n = e.year, a = e.month - 1, s = e.day + Math.ceil(29.5 * a) + (n - 1) * 354 + Math.floor((3 + 11 * n) / 30) + Pe - 1, l = Math.floor(s - .5) + .5, c = l - G, d = Math.floor(c / 146097), u = ce(c, 146097), m = Math.floor(u / 36524), f = ce(u, 36524), B = Math.floor(f / 1461), A = ce(f, 1461), O = Math.floor(A / 365), p = d * 400 + m * 100 + B * 4 + O; m === 4 || O === 4 || p++; let T = G + 365 * (p - 1) + Math.floor((p - 1) / 4) - Math.floor((p - 1) / 100) + Math.floor((p - 1) / 400), y = l - T, Y = G - 1 + 365 * (p - 1) + Math.floor((p - 1) / 4) - Math.floor((p - 1) / 100) + Math.floor((p - 1) / 400) + Math.floor(739 / 12 + (K(new Date(p, 3, 1)) ? -1 : -2) + 1), ne = l < Y ? 0 : K(new Date(p, 3, 1)) ? 1 : 2, k = Math.floor(((y + ne) * 12 + 373) / 367), ie = G - 1 + 365 * (p - 1) + Math.floor((p - 1) / 4) - Math.floor((p - 1) / 100) + Math.floor((p - 1) / 400) + Math.floor((367 * k - 362) / 12 + (k <= 2 ? 0 : K(new Date(p, k - 1, 1)) ? -1 : -2) + 1), ae = l - ie + 1; return new Date(p, k - 1, ae); }
    getDaysPerMonth(e, n) { n = n + Math.floor(e / 13), e = (e - 1) % 12 + 1; let a = 29 + e % 2; return e === 12 && rn(n) && a++, a; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })(), Z = new Date(1882, 10, 12), cn = new Date(2174, 10, 25), I = 1300, Fe = 1600, dn = 1e3 * 60 * 60 * 24, V = ["101010101010", "110101010100", "111011001001", "011011010100", "011011101010", "001101101100", "101010101101", "010101010101", "011010101001", "011110010010", "101110101001", "010111010100", "101011011010", "010101011100", "110100101101", "011010010101", "011101001010", "101101010100", "101101101010", "010110101101", "010010101110", "101001001111", "010100010111", "011010001011", "011010100101", "101011010101", "001011010110", "100101011011", "010010011101", "101001001101", "110100100110", "110110010101", "010110101100", "100110110110", "001010111010", "101001011011", "010100101011", "101010010101", "011011001010", "101011101001", "001011110100", "100101110110", "001010110110", "100101010110", "101011001010", "101110100100", "101111010010", "010111011001", "001011011100", "100101101101", "010101001101", "101010100101", "101101010010", "101110100101", "010110110100", "100110110110", "010101010111", "001010010111", "010101001011", "011010100011", "011101010010", "101101100101", "010101101010", "101010101011", "010100101011", "110010010101", "110101001010", "110110100101", "010111001010", "101011010110", "100101010111", "010010101011", "100101001011", "101010100101", "101101010010", "101101101010", "010101110101", "001001110110", "100010110111", "010001011011", "010101010101", "010110101001", "010110110100", "100111011010", "010011011101", "001001101110", "100100110110", "101010101010", "110101010100", "110110110010", "010111010101", "001011011010", "100101011011", "010010101011", "101001010101", "101101001001", "101101100100", "101101110001", "010110110100", "101010110101", "101001010101", "110100100101", "111010010010", "111011001001", "011011010100", "101011101001", "100101101011", "010010101011", "101010010011", "110101001001", "110110100100", "110110110010", "101010111001", "010010111010", "101001011011", "010100101011", "101010010101", "101100101010", "101101010101", "010101011100", "010010111101", "001000111101", "100100011101", "101010010101", "101101001010", "101101011010", "010101101101", "001010110110", "100100111011", "010010011011", "011001010101", "011010101001", "011101010100", "101101101010", "010101101100", "101010101101", "010101010101", "101100101001", "101110010010", "101110101001", "010111010100", "101011011010", "010101011010", "101010101011", "010110010101", "011101001001", "011101100100", "101110101010", "010110110101", "001010110110", "101001010110", "111001001101", "101100100101", "101101010010", "101101101010", "010110101101", "001010101110", "100100101111", "010010010111", "011001001011", "011010100101", "011010101100", "101011010110", "010101011101", "010010011101", "101001001101", "110100010110", "110110010101", "010110101010", "010110110101", "001011011010", "100101011011", "010010101101", "010110010101", "011011001010", "011011100100", "101011101010", "010011110101", "001010110110", "100101010110", "101010101010", "101101010100", "101111010010", "010111011001", "001011101010", "100101101101", "010010101101", "101010010101", "101101001010", "101110100101", "010110110010", "100110110101", "010011010110", "101010010111", "010101000111", "011010010011", "011101001001", "101101010101", "010101101010", "101001101011", "010100101011", "101010001011", "110101000110", "110110100011", "010111001010", "101011010110", "010011011011", "001001101011", "100101001011", "101010100101", "101101010010", "101101101001", "010101110101", "000101110110", "100010110111", "001001011011", "010100101011", "010101100101", "010110110100", "100111011010", "010011101101", "000101101101", "100010110110", "101010100110", "110101010010", "110110101001", "010111010100", "101011011010", "100101011011", "010010101011", "011001010011", "011100101001", "011101100010", "101110101001", "010110110010", "101010110101", "010101010101", "101100100101", "110110010010", "111011001001", "011011010010", "101011101001", "010101101011", "010010101011", "101001010101", "110100101001", "110101010100", "110110101010", "100110110101", "010010111010", "101000111011", "010010011011", "101001001101", "101010101010", "101011010101", "001011011010", "100101011101", "010001011110", "101000101110", "110010011010", "110101010101", "011010110010", "011010111001", "010010111010", "101001011101", "010100101101", "101010010101", "101101010010", "101110101000", "101110110100", "010110111001", "001011011010", "100101011010", "101101001010", "110110100100", "111011010001", "011011101000", "101101101010", "010101101101", "010100110101", "011010010101", "110101001010", "110110101000", "110111010100", "011011011010", "010101011011", "001010011101", "011000101011", "101100010101", "101101001010", "101110010101", "010110101010", "101010101110", "100100101110", "110010001111", "010100100111", "011010010101", "011010101010", "101011010110", "010101011101", "001010011101"];
function un(t, r) { let e = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()), n = Date.UTC(r.getFullYear(), r.getMonth(), r.getDate()), a = Math.abs(e - n); return Math.round(a / dn); }
var ti = (() => { class t extends ln {
    fromGregorian(e) { let n = 1, a = 0, o = 1300, s = un(e, Z); if (e.getTime() - Z.getTime() >= 0 && e.getTime() - cn.getTime() <= 0) {
        let l = 1300;
        for (let c = 0; c < V.length; c++, l++)
            for (let d = 0; d < 12; d++) {
                let u = +V[c][d] + 29;
                if (s <= u)
                    return n = s + 1, n > u && (n = 1, d++), d > 11 && (d = 0, l++), a = d, o = l, new _(o, a + 1, n);
                s = s - u;
            }
        return null;
    }
    else
        return super.fromGregorian(e); }
    toGregorian(e) { let n = e.year, a = e.month - 1, o = e.day, s = new Date(Z), l = o - 1; if (n >= I && n <= Fe) {
        for (let c = 0; c < n - I; c++)
            for (let d = 0; d < 12; d++)
                l += +V[c][d] + 29;
        for (let c = 0; c < a; c++)
            l += +V[n - I][c] + 29;
        s.setDate(Z.getDate() + l);
    }
    else
        s = super.toGregorian(e); return s; }
    getDaysPerMonth(e, n) { if (n >= I && n <= Fe) {
        let a = n - I;
        return +V[a][e - 1] + 29;
    } return super.getDaysPerMonth(e, n); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })();
function J(t) { let r = mn(t.year, t.month, t.day), e = Ze(r); return e.setHours(6, 30, 3, 200), e; }
function hn(t) { let r = Oe(t.getFullYear(), t.getMonth() + 1, t.getDate()); return gn(r); }
function fn(t, r) { return t.year = +r, t; }
function be(t, r) { return r = +r, t.year = t.year + Math.floor((r - 1) / 12), t.month = Math.floor(((r - 1) % 12 + 12) % 12) + 1, t; }
function _n(t, r) { let e = de(t.month, t.year); if (r <= 0)
    for (; r <= 0;)
        t = be(t, t.month - 1), e = de(t.month, t.year), r += e;
else if (r > e)
    for (; r > e;)
        r -= e, t = be(t, t.month + 1), e = de(t.month, t.year); return t.day = r, t; }
function v(t, r) { return t - r * Math.floor(t / r); }
function D(t, r) { return Math.trunc(t / r); }
function Ne(t) { let r = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178], e = r.length, n = t + 621, a = -14, o = r[0]; if (t < o || t >= r[e - 1])
    throw new Error("Invalid Jalali year " + t); let s; for (let m = 1; m < e; m += 1) {
    let f = r[m];
    if (s = f - o, t < f)
        break;
    a = a + D(s, 33) * 8 + D(v(s, 33), 4), o = f;
} let l = t - o; a = a + D(l, 33) * 8 + D(v(l, 33) + 3, 4), v(s, 33) === 4 && s - l === 4 && (a += 1); let c = D(n, 4) - D((D(n, 100) + 1) * 3, 4) - 150, d = 20 + a - c; s - l < 6 && (l = l - s + D(s + 4, 33) * 33); let u = v(v(l + 1, 33) - 1, 4); return u === -1 && (u = 4), { leap: u, gy: n, march: d }; }
function Ze(t) { let r = 4 * t + 139361631; r = r + D(D(4 * t + 183187720, 146097) * 3, 4) * 4 - 3908; let e = D(v(r, 1461), 4) * 5 + 308, n = D(v(e, 153), 5) + 1, a = v(D(e, 153), 12) + 1, o = D(r, 1461) - 100100 + D(8 - a, 6); return new Date(o, a - 1, n); }
function Oe(t, r, e) { let n = D((t + D(r - 8, 6) + 100100) * 1461, 4) + D(153 * v(r + 9, 12) + 2, 5) + e - 34840408; return n = n - D(D(t + 100100 + D(r - 8, 6), 100) * 3, 4) + 752, n; }
function gn(t) { let r = Ze(t).getFullYear(), e = r - 621, n = Ne(e), a = Oe(r, 3, n.march), o, s, l; if (l = t - a, l >= 0) {
    if (l <= 185)
        return s = 1 + D(l, 31), o = v(l, 31) + 1, new _(e, s, o);
    l -= 186;
}
else
    e -= 1, l += 179, n.leap === 1 && (l += 1); return s = 7 + D(l, 30), o = v(l, 30) + 1, new _(e, s, o); }
function mn(t, r, e) { let n = Ne(t); return Oe(n.gy, 3, n.march) + (r - 1) * 31 - D(r, 7) * (r - 7) + e - 1; }
function de(t, r) { return t <= 6 ? 31 : t <= 11 || Ne(r).leap === 0 ? 30 : 29; }
var ni = (() => { class t extends R {
    getDaysPerWeek() { return 7; }
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    getWeeksPerMonth() { return 6; }
    getNext(e, n = "d", a = 1) { switch (e = new _(e.year, e.month, e.day), n) {
        case "y": return e = fn(e, e.year + a), e.month = 1, e.day = 1, e;
        case "m": return e = be(e, e.month + a), e.day = 1, e;
        case "d": return _n(e, e.day + a);
        default: return e;
    } }
    getPrev(e, n = "d", a = 1) { return this.getNext(e, n, -a); }
    getWeekday(e) { let n = J(e).getDay(); return n === 0 ? 7 : n; }
    getWeekNumber(e, n) { n === 7 && (n = 0); let a = (11 - n) % 7, o = e[a], s = J(o); s.setDate(s.getDate() + 4 - (s.getDay() || 7)); let l = s.getTime(), c = J(new _(o.year, 1, 1)); return Math.floor(Math.round((l - c.getTime()) / 864e5) / 7) + 1; }
    getToday() { return hn(new Date); }
    isValid(e) { return e != null && g(e.year) && g(e.month) && g(e.day) && !isNaN(J(e).getTime()); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })(), L = 1080, ee = 24 * L, Je = 12 * L + 793, pn = 29 * ee + Je, Dn = 11 * L + 204, yn = 2092591, bn = 17214255e-1;
function F(t) { return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0; }
function x(t) { let r = Math.floor((235 * t - 234) / 19), e = r * Je + Dn, n = r * 29 + Math.floor(e / ee), a = e % ee, o = n % 7; return (o === 2 || o === 4 || o === 6) && (n++, o = n % 7), o === 1 && a > 15 * L + 204 && !C(t) ? n += 2 : o === 0 && a > 21 * L + 589 && C(t - 1) && n++, n; }
function W(t, r) { let e = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; return F(r) && e[1]++, e[t - 1]; }
function z(t) { return C(t) ? 13 : 12; }
function Be(t) { return x(t + 1) - x(t); }
function C(t) { if (t != null) {
    let r = (t * 12 + 17) % 19;
    return r >= (r < 0 ? -7 : 12);
} return !1; }
function w(t, r) { let e = x(r + 1) - x(r), n = (e <= 380 ? e : e - 30) - 353, o = C(r) ? [30, 29, 29, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29] : [30, 29, 29, 29, 30, 29, 30, 29, 30, 29, 30, 29]; return n > 0 && o[2]++, n > 1 && o[1]++, o[t - 1]; }
function Me(t) { let r = 0; for (let e = 1; e < t.month; e++)
    r += w(e, t.year); return r + t.day; }
function Mn(t, r) { let e = r >= 0; for (e || (r = -r); r > 0;)
    e ? r > z(t.year) - t.month ? (r -= z(t.year) - t.month + 1, t.year++, t.month = 1) : (t.month += r, r = 0) : r >= t.month ? (t.year--, r -= t.month, t.month = z(t.year)) : (t.month -= r, r = 0); return t; }
function vn(t, r) { let e = r >= 0; for (e || (r = -r); r > 0;)
    e ? r > Be(t.year) - Me(t) ? (r -= Be(t.year) - Me(t) + 1, t.year++, t.month = 1, t.day = 1) : r > w(t.month, t.year) - t.day ? (r -= w(t.month, t.year) - t.day + 1, t.month++, t.day = 1) : (t.day += r, r = 0) : r >= t.day ? (r -= t.day, t.month--, t.month === 0 && (t.year--, t.month = z(t.year)), t.day = w(t.month, t.year)) : (t.day -= r, r = 0); return t; }
function Ge(t) { let r = new Date(t), e = r.getFullYear(), n = r.getMonth(), a = r.getDate(), o = bn - 1 + 365 * (e - 1) + Math.floor((e - 1) / 4) - Math.floor((e - 1) / 100) + Math.floor((e - 1) / 400) + Math.floor((367 * (n + 1) - 362) / 12 + (n + 1 <= 2 ? 0 : F(e) ? -1 : -2) + a); o = Math.floor(o + .5); let s = o - 347997, l = Math.floor(s * ee / pn), c = Math.floor((l * 19 + 234) / 235) + 1, d = x(c), u = s - d; for (; u < 1;)
    c--, d = x(c), u = s - d; let m = 1, f = u; for (; f > w(m, c);)
    f -= w(m, c), m++; return new _(c, m, f); }
function ue(t) { let r = t.year, e = t.month, n = t.day, a = x(r); for (let u = 1; u < e; u++)
    a += w(u, r); a += n; let o = a - yn, s = o >= 0; s || (o = -o); let l = 1970, c = 1, d = 1; for (; o > 0;)
    s ? o >= (F(l) ? 366 : 365) ? (o -= F(l) ? 366 : 365, l++) : o >= W(c, l) ? (o -= W(c, l), c++) : (d += o, o = 0) : o >= (F(l - 1) ? 366 : 365) ? (o -= F(l - 1) ? 366 : 365, l--) : (c > 1 ? c-- : (c = 12, l--), o >= W(c, l) ? o -= W(c, l) : (d = W(c, l) - o + 1, o = 0)); return new Date(l, c - 1, d); }
function $(t) { if (!t)
    return ""; let r = ["", "\u05D0", "\u05D1", "\u05D2", "\u05D3", "\u05D4", "\u05D5", "\u05D6", "\u05D7", "\u05D8"], e = ["\u05D9", "\u05D9\u05D0", "\u05D9\u05D1", "\u05D9\u05D2", "\u05D9\u05D3", "\u05D8\u05D5", "\u05D8\u05D6", "\u05D9\u05D6", "\u05D9\u05D7", "\u05D9\u05D8"], n = ["", "", "\u05DB", "\u05DC", "\u05DE", "\u05E0", "\u05E1", "\u05E2", "\u05E4", "\u05E6"], a = ["", "\u05E7", "\u05E8", "\u05E9", "\u05EA", "\u05EA\u05E7", "\u05EA\u05E8", "\u05EA\u05E9", "\u05EA\u05EA", "\u05EA\u05EA\u05E7"], o = ["", "\u05D0", "\u05D1", "\u05D1\u05D0", "\u05D1\u05D1", "\u05D4", "\u05D4\u05D0", "\u05D4\u05D1", "\u05D4\u05D1\u05D0", "\u05D4\u05D1\u05D1"], s = "\u05F3", l = "\u05F4", c = 0, d = [], u = 0; for (; t > 0;) {
    let m = t % 10;
    if (u === 0)
        c = m;
    else if (u === 1)
        m !== 1 ? d.unshift(n[m], r[c]) : d.unshift(e[c]);
    else if (u === 2)
        d.unshift(a[m]);
    else {
        m !== 5 && d.unshift(o[m], s, " ");
        break;
    }
    t = Math.floor(t / 10), u === 0 && t === 0 && d.unshift(r[m]), u++;
} return d = d.join("").split(""), d.length === 1 ? d.push(s) : d.length > 1 && d.splice(d.length - 1, 0, l), d.join(""); }
var ii = (() => { class t extends R {
    getDaysPerWeek() { return 7; }
    getMonths(e) { return e && C(e) ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    getWeeksPerMonth() { return 6; }
    isValid(e) { if (e != null) {
        let n = b(e.year) && b(e.month) && b(e.day);
        return n = n && e.month > 0 && e.month <= (C(e.year) ? 13 : 12), n = n && e.day > 0 && e.day <= w(e.month, e.year), n && !isNaN(ue(e).getTime());
    } return !1; }
    getNext(e, n = "d", a = 1) { switch (e = new _(e.year, e.month, e.day), n) {
        case "y": return e.year += a, e.month = 1, e.day = 1, e;
        case "m": return e = Mn(e, a), e.day = 1, e;
        case "d": return vn(e, a);
        default: return e;
    } }
    getPrev(e, n = "d", a = 1) { return this.getNext(e, n, -a); }
    getWeekday(e) { let n = ue(e).getDay(); return n === 0 ? 7 : n; }
    getWeekNumber(e, n) { let a = e[e.length - 1]; return Math.ceil(Me(a) / 7); }
    getToday() { return Ge(new Date); }
    toGregorian(e) { return De(ue(e)); }
    fromGregorian(e) { return Ge(H(e)); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })(), Tn = ["\u05E9\u05E0\u05D9", "\u05E9\u05DC\u05D9\u05E9\u05D9", "\u05E8\u05D1\u05D9\u05E2\u05D9", "\u05D7\u05DE\u05D9\u05E9\u05D9", "\u05E9\u05D9\u05E9\u05D9", "\u05E9\u05D1\u05EA", "\u05E8\u05D0\u05E9\u05D5\u05DF"], Nn = ["\u05EA\u05E9\u05E8\u05D9", "\u05D7\u05E9\u05D5\u05DF", "\u05DB\u05E1\u05DC\u05D5", "\u05D8\u05D1\u05EA", "\u05E9\u05D1\u05D8", "\u05D0\u05D3\u05E8", "\u05E0\u05D9\u05E1\u05DF", "\u05D0\u05D9\u05D9\u05E8", "\u05E1\u05D9\u05D5\u05DF", "\u05EA\u05DE\u05D5\u05D6", "\u05D0\u05D1", "\u05D0\u05DC\u05D5\u05DC"], On = ["\u05EA\u05E9\u05E8\u05D9", "\u05D7\u05E9\u05D5\u05DF", "\u05DB\u05E1\u05DC\u05D5", "\u05D8\u05D1\u05EA", "\u05E9\u05D1\u05D8", "\u05D0\u05D3\u05E8 \u05D0\u05F3", "\u05D0\u05D3\u05E8 \u05D1\u05F3", "\u05E0\u05D9\u05E1\u05DF", "\u05D0\u05D9\u05D9\u05E8", "\u05E1\u05D9\u05D5\u05DF", "\u05EA\u05DE\u05D5\u05D6", "\u05D0\u05D1", "\u05D0\u05DC\u05D5\u05DC"], ai = (() => { class t extends N {
    getMonthShortName(e, n) { return this.getMonthFullName(e, n); }
    getMonthFullName(e, n) { return C(n) ? On[e - 1] || "" : Nn[e - 1] || ""; }
    getWeekdayLabel(e, n) { return Tn[e - 1] || ""; }
    getDayAriaLabel(e) { return `${$(e.day)} ${this.getMonthFullName(e.month, e.year)} ${$(e.year)}`; }
    getDayNumerals(e) { return $(e.day); }
    getWeekNumerals(e) { return $(e); }
    getYearNumerals(e) { return $(e); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })();
function q(t) { return new Date(t.year - 543, t.month - 1, t.day); }
function Ie(t) { return new _(t.getFullYear() + 543, t.getMonth() + 1, t.getDate()); }
var ri = (() => { class t extends Ye {
    getToday() { return Ie(new Date); }
    getNext(e, n = "d", a = 1) { let o = q(e), s = !0, l = o.getMonth(); switch (n) {
        case "y":
            o.setFullYear(o.getFullYear() + a);
            break;
        case "m":
            l += a, o.setMonth(l), l = l % 12, l < 0 && (l = l + 12);
            break;
        case "d":
            o.setDate(o.getDate() + a), s = !1;
            break;
        default: return e;
    } return s && o.getMonth() !== l && o.setDate(0), Ie(o); }
    getPrev(e, n = "d", a = 1) { return this.getNext(e, n, -a); }
    getWeekday(e) { let a = q(e).getDay(); return a === 0 ? 7 : a; }
    getWeekNumber(e, n) { n === 7 && (n = 0); let a = (11 - n) % 7, o = e[a], s = q(o); s.setDate(s.getDate() + 4 - (s.getDay() || 7)); let l = s.getTime(); return s.setMonth(0), s.setDate(1), Math.floor(Math.round((l - s.getTime()) / 864e5) / 7) + 1; }
    isValid(e) { if (!e || !g(e.year) || !g(e.month) || !g(e.day) || e.year === 0)
        return !1; let n = q(e); return !isNaN(n.getTime()) && n.getFullYear() === e.year - 543 && n.getMonth() + 1 === e.month && n.getDate() === e.day; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })(), qe = 17242205e-1, kn = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5];
function En(t) { return t != null ? t % 4 == 3 || t % 4 == -1 : !1; }
function Sn(t, r) { return t.year = +r, t; }
function ve(t, r) { return r = +r, t.year = t.year + Math.floor((r - 1) / 13), t.month = Math.floor(((r - 1) % 13 + 13) % 13) + 1, t; }
function wn(t, r) { let e = he(t.month, t.year); if (r <= 0)
    for (; r <= 0;)
        t = ve(t, t.month - 1), e = he(t.month, t.year), r += e;
else if (r > e)
    for (; r > e;)
        r -= e, t = ve(t, t.month + 1), e = he(t.month, t.year); return t.day = r, t; }
function he(t, r) { let e = En(r); return kn[t - 1] + (t === 13 && e ? 1 : 0); }
function fe(t) { let r = ke(t.year, t.month, t.day), e = xn(r); return e.setHours(6, 30, 3, 200), e; }
function Rn(t) { let r = Cn(t.getFullYear(), t.getMonth() + 1, t.getDate()); return An(r); }
function ke(t, r, e) { return t < 0 && t++, e + (r - 1) * 30 + (t - 1) * 365 + Math.floor(t / 4) + qe - 1; }
function An(t) { let r = Math.floor(t) + .5 - qe, e = Math.floor((r - Math.floor((r + 366) / 1461)) / 365) + 1; e <= 0 && e--, r = Math.floor(t) + .5 - ke(e, 1, 1); let n = Math.floor(r / 30) + 1, a = r - (n - 1) * 30 + 1; return new _(e, n, a); }
function xn(t) { let r = Math.floor(t + .5), e = Math.floor((r - 186721625e-2) / 36524.25); e = r + 1 + e - Math.floor(e / 4); let n = e + 1524, a = Math.floor((n - 122.1) / 365.25), o = Math.floor(365.25 * a), s = Math.floor((n - o) / 30.6001), l = n - o - Math.floor(s * 30.6001), c = s - (s > 13.5 ? 13 : 1), d = a - (c > 2.5 ? 4716 : 4715); return d <= 0 && d--, new Date(d, c, l); }
function Cn(t, r, e) { t < 0 && t++, r < 3 && (r += 12, t--); let n = Math.floor(t / 100), a = 2 - n + Math.floor(n / 4); return Math.floor(365.25 * (t + 4716)) + Math.floor(30.6001 * (r + 1)) + e + a - 1524.5; }
var oi = (() => { class t extends R {
    getDaysPerWeek() { return 7; }
    getMonths(e) { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; }
    getNext(e, n = "d", a = 1) { switch (e = new _(e.year, e.month, e.day), n) {
        case "y": return e = Sn(e, e.year + a), e.month = 1, e.day = 1, e;
        case "m": return e = ve(e, e.month + a), e.day = 1, e;
        case "d": return wn(e, e.day + a);
        default: return e;
    } }
    getPrev(e, n = "d", a = 1) { return this.getNext(e, n, -a); }
    getWeekday(e) { let n = Math.floor(ke(e.year, e.month, e.day) + 3) % 7; return n === 0 ? 7 : n; }
    getWeekNumber(e, n) { n === 7 && (n = 0); let a = (11 - n) % 7, o = e[a], s = fe(o); s.setDate(s.getDate() + 4 - (s.getDay() || 7)); let l = s.getTime(), c = fe(new _(o.year, 1, 1)); return Math.floor(Math.round((l - c.getTime()) / 864e5) / 7) + 1; }
    getWeeksPerMonth() { return 6; }
    getToday() { return Rn(new Date); }
    isValid(e) { return e && g(e.year) && g(e.month) && g(e.day) && !isNaN(fe(e).getTime()); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })(), Pn = ["\u12A5\u1211\u12F5", "\u1230\u129E", "\u121B\u12AD\u1230\u129E", "\u1228\u1261\u12D5", "\u1213\u1219\u1235", "\u12D3\u122D\u1265", "\u1245\u12F3\u121C"], Fn = ["\u1218\u1235\u12A8\u1228\u121D", "\u1325\u1245\u121D\u1275", "\u1285\u12F3\u122D", "\u1273\u1205\u1223\u1225", "\u1325\u122D", "\u12E8\u12AB\u1272\u1275", "\u1218\u130B\u1262\u1275", "\u121A\u12EB\u12DD\u12EB", "\u130D\u1295\u1266\u1275", "\u1230\u1294", "\u1210\u121D\u120C", "\u1290\u1210\u1234", "\u1333\u1309\u121C"], si = (() => { class t extends N {
    getMonthShortName(e, n) { return this.getMonthFullName(e, n); }
    getMonthFullName(e, n) { return Fn[e - 1]; }
    getWeekdayLabel(e, n) { return Pn[e - 1]; }
    getDayAriaLabel(e) { return `${e.day} ${this.getMonthFullName(e.month, e.year)} ${e.year}`; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })(), Bn = (() => { class t extends te {
    fromModel(e) { return e instanceof Date && !isNaN(e.getTime()) ? this._fromNativeDate(e) : null; }
    toModel(e) { return e && g(e.year) && g(e.month) && g(e.day) ? this._toNativeDate(e) : null; }
    _fromNativeDate(e) { return { year: e.getFullYear(), month: e.getMonth() + 1, day: e.getDate() }; }
    _toNativeDate(e) { let n = new Date(e.year, e.month - 1, e.day, 12); return n.setFullYear(e.year), n; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })(), li = (() => { class t extends Bn {
    _fromNativeDate(e) { return { year: e.getUTCFullYear(), month: e.getUTCMonth() + 1, day: e.getUTCDate() }; }
    _toNativeDate(e) { let n = new Date(Date.UTC(e.year, e.month - 1, e.day)); return n.setUTCFullYear(e.year), n; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = i.\u0275\u0275defineService({ token: t, factory: t.\u0275fac, autoProvided: !1 }); }
} return t; })();
var ci = (() => { class t {
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275mod = i.\u0275\u0275defineNgModule({ type: t }); }
    static { this.\u0275inj = i.\u0275\u0275defineInjector({}); }
} return t; })();
export { R as NgbCalendar, ri as NgbCalendarBuddhist, oi as NgbCalendarEthiopian, Ye as NgbCalendarGregorian, ii as NgbCalendarHebrew, ln as NgbCalendarIslamicCivil, ti as NgbCalendarIslamicUmalqura, ni as NgbCalendarPersian, _ as NgbDate, te as NgbDateAdapter, Bn as NgbDateNativeAdapter, li as NgbDateNativeUTCAdapter, Ke as NgbDateParserFormatter, Zt as NgbDateStructAdapter, Ue as NgbDatepicker, Te as NgbDatepickerConfig, Xt as NgbDatepickerContent, N as NgbDatepickerI18n, si as NgbDatepickerI18nAmharic, Ut as NgbDatepickerI18nDefault, ai as NgbDatepickerI18nHebrew, Jt as NgbDatepickerKeyboardService, ci as NgbDatepickerModule, en as NgbDatepickerMonth, ei as NgbInputDatepicker, Ce as NgbInputDatepickerConfig };
