import { d as N, f as u } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as e from "@angular/core";
import { inject as o, TemplateRef as g, EventEmitter as f } from "@angular/core";
import { NgTemplateOutlet as P } from "@angular/common";
var A = (t, s, i) => ({ $implicit: t, pages: s, disabled: i }), M = t => ({ disabled: !0, currentPage: t }), T = (t, s, i) => ({ disabled: t, $implicit: s, currentPage: i }), d = (t, s) => ({ disabled: t, currentPage: s }), m = t => ({ disabled: t });
function R(t, s) { t & 1 && (e.\u0275\u0275elementStart(0, "span", 13), e.\u0275\u0275i18n(1, 7), e.\u0275\u0275elementEnd()); }
function E(t, s) { t & 1 && (e.\u0275\u0275elementStart(0, "span", 13), e.\u0275\u0275i18n(1, 8), e.\u0275\u0275elementEnd()); }
function S(t, s) { t & 1 && (e.\u0275\u0275elementStart(0, "span", 13), e.\u0275\u0275i18n(1, 9), e.\u0275\u0275elementEnd()); }
function h(t, s) { t & 1 && (e.\u0275\u0275elementStart(0, "span", 13), e.\u0275\u0275i18n(1, 10), e.\u0275\u0275elementEnd()); }
function b(t, s) { t & 1 && e.\u0275\u0275text(0, "..."); }
function C(t, s) { if (t & 1 && e.\u0275\u0275text(0), t & 2) {
    let i = s.$implicit;
    e.\u0275\u0275textInterpolate(i);
} }
function D(t, s) { }
function x(t, s) { if (t & 1 && (e.\u0275\u0275elementStart(0, "a", 16), e.\u0275\u0275template(1, D, 0, 0, "ng-template", 12), e.\u0275\u0275elementEnd()), t & 2) {
    let i = e.\u0275\u0275nextContext(2).$implicit, n = e.\u0275\u0275nextContext(), a = e.\u0275\u0275reference(9);
    e.\u0275\u0275advance(), e.\u0275\u0275property("ngTemplateOutlet", n.tplEllipsis?.templateRef || a)("ngTemplateOutletContext", e.\u0275\u0275pureFunction1(2, M, i));
} }
function B(t, s) { }
function G(t, s) { if (t & 1) {
    let i = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275elementStart(0, "a", 18), e.\u0275\u0275listener("click", function (a) { e.\u0275\u0275restoreView(i); let _ = e.\u0275\u0275nextContext().$implicit; return e.\u0275\u0275nextContext(2).selectPage(_), e.\u0275\u0275resetView(a.preventDefault()); }), e.\u0275\u0275template(1, B, 0, 0, "ng-template", 12), e.\u0275\u0275elementEnd();
} if (t & 2) {
    let i = e.\u0275\u0275nextContext().$implicit, n = e.\u0275\u0275nextContext(), a = n.$implicit, _ = n.disabled, l = e.\u0275\u0275nextContext(), p = e.\u0275\u0275reference(11);
    e.\u0275\u0275attribute("tabindex", _ ? "-1" : null)("aria-disabled", _ ? "true" : null)("aria-current", i === a ? "page" : null), e.\u0275\u0275advance(), e.\u0275\u0275property("ngTemplateOutlet", l.tplNumber?.templateRef || p)("ngTemplateOutletContext", e.\u0275\u0275pureFunction3(5, T, _, i, a));
} }
function v(t, s) { if (t & 1 && (e.\u0275\u0275elementStart(0, "li", 15), e.\u0275\u0275conditionalCreate(1, x, 2, 4, "a", 16)(2, G, 2, 9, "a", 17), e.\u0275\u0275elementEnd()), t & 2) {
    let i = s.$implicit, n = e.\u0275\u0275nextContext(), a = n.$implicit, _ = n.disabled, l = e.\u0275\u0275nextContext();
    e.\u0275\u0275classProp("active", i === a)("disabled", l.isEllipsis(i) || _), e.\u0275\u0275advance(), e.\u0275\u0275conditional(l.isEllipsis(i) ? 1 : 2);
} }
function F(t, s) { if (t & 1 && e.\u0275\u0275repeaterCreate(0, v, 3, 5, "li", 14, e.\u0275\u0275repeaterTrackByIndex), t & 2) {
    let i = s.pages;
    e.\u0275\u0275repeater(i);
} }
function y(t, s) { }
function I(t, s) { if (t & 1) {
    let i = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275elementStart(0, "li", 15)(1, "a", 19), e.\u0275\u0275listener("click", function (a) { return e.\u0275\u0275restoreView(i), e.\u0275\u0275nextContext().selectPage(1), e.\u0275\u0275resetView(a.preventDefault()); }), e.\u0275\u0275template(2, y, 0, 0, "ng-template", 12), e.\u0275\u0275elementEnd()();
} if (t & 2) {
    let i = e.\u0275\u0275nextContext(), n = e.\u0275\u0275reference(1);
    e.\u0275\u0275classProp("disabled", i.previousDisabled()), e.\u0275\u0275advance(), e.\u0275\u0275attribute("tabindex", i.previousDisabled() ? "-1" : null)("aria-disabled", i.previousDisabled() ? "true" : null), e.\u0275\u0275advance(), e.\u0275\u0275property("ngTemplateOutlet", i.tplFirst?.templateRef || n)("ngTemplateOutletContext", e.\u0275\u0275pureFunction2(6, d, i.previousDisabled(), i.page));
} }
function k(t, s) { }
function z(t, s) { if (t & 1) {
    let i = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275elementStart(0, "li", 15)(1, "a", 20), e.\u0275\u0275listener("click", function (a) { e.\u0275\u0275restoreView(i); let _ = e.\u0275\u0275nextContext(); return _.selectPage(_.page - 1), e.\u0275\u0275resetView(a.preventDefault()); }), e.\u0275\u0275template(2, k, 0, 0, "ng-template", 12), e.\u0275\u0275elementEnd()();
} if (t & 2) {
    let i = e.\u0275\u0275nextContext(), n = e.\u0275\u0275reference(3);
    e.\u0275\u0275classProp("disabled", i.previousDisabled()), e.\u0275\u0275advance(), e.\u0275\u0275attribute("tabindex", i.previousDisabled() ? "-1" : null)("aria-disabled", i.previousDisabled() ? "true" : null), e.\u0275\u0275advance(), e.\u0275\u0275property("ngTemplateOutlet", i.tplPrevious?.templateRef || n)("ngTemplateOutletContext", e.\u0275\u0275pureFunction1(6, m, i.previousDisabled()));
} }
function L(t, s) { }
function U(t, s) { }
function Z(t, s) { if (t & 1) {
    let i = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275elementStart(0, "li", 15)(1, "a", 21), e.\u0275\u0275listener("click", function (a) { e.\u0275\u0275restoreView(i); let _ = e.\u0275\u0275nextContext(); return _.selectPage(_.page + 1), e.\u0275\u0275resetView(a.preventDefault()); }), e.\u0275\u0275template(2, U, 0, 0, "ng-template", 12), e.\u0275\u0275elementEnd()();
} if (t & 2) {
    let i = e.\u0275\u0275nextContext(), n = e.\u0275\u0275reference(5);
    e.\u0275\u0275classProp("disabled", i.nextDisabled()), e.\u0275\u0275advance(), e.\u0275\u0275attribute("tabindex", i.nextDisabled() ? "-1" : null)("aria-disabled", i.nextDisabled() ? "true" : null), e.\u0275\u0275advance(), e.\u0275\u0275property("ngTemplateOutlet", i.tplNext?.templateRef || n)("ngTemplateOutletContext", e.\u0275\u0275pureFunction2(6, d, i.nextDisabled(), i.page));
} }
function w(t, s) { }
function V(t, s) { if (t & 1) {
    let i = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275elementStart(0, "li", 15)(1, "a", 22), e.\u0275\u0275listener("click", function (a) { e.\u0275\u0275restoreView(i); let _ = e.\u0275\u0275nextContext(); return _.selectPage(_.pageCount), e.\u0275\u0275resetView(a.preventDefault()); }), e.\u0275\u0275template(2, w, 0, 0, "ng-template", 12), e.\u0275\u0275elementEnd()();
} if (t & 2) {
    let i = e.\u0275\u0275nextContext(), n = e.\u0275\u0275reference(7);
    e.\u0275\u0275classProp("disabled", i.nextDisabled()), e.\u0275\u0275advance(), e.\u0275\u0275attribute("tabindex", i.nextDisabled() ? "-1" : null)("aria-disabled", i.nextDisabled() ? "true" : null), e.\u0275\u0275advance(), e.\u0275\u0275property("ngTemplateOutlet", i.tplLast?.templateRef || n)("ngTemplateOutletContext", e.\u0275\u0275pureFunction2(6, d, i.nextDisabled(), i.page));
} }
var $ = (() => { class t {
    constructor() { this.disabled = !1, this.boundaryLinks = !1, this.directionLinks = !0, this.ellipses = !0, this.maxSize = 0, this.pageSize = 10, this.rotate = !1; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = e.\u0275\u0275defineService({ token: t, factory: t.\u0275fac }); }
} return t; })(), H = (() => { class t {
    constructor() { this.templateRef = o(g); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: t, selectors: [["ng-template", "ngbPaginationEllipsis", ""]] }); }
} return t; })(), J = (() => { class t {
    constructor() { this.templateRef = o(g); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: t, selectors: [["ng-template", "ngbPaginationFirst", ""]] }); }
} return t; })(), K = (() => { class t {
    constructor() { this.templateRef = o(g); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: t, selectors: [["ng-template", "ngbPaginationLast", ""]] }); }
} return t; })(), W = (() => { class t {
    constructor() { this.templateRef = o(g); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: t, selectors: [["ng-template", "ngbPaginationNext", ""]] }); }
} return t; })(), Q = (() => { class t {
    constructor() { this.templateRef = o(g); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: t, selectors: [["ng-template", "ngbPaginationNumber", ""]] }); }
} return t; })(), q = (() => { class t {
    constructor() { this.templateRef = o(g); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: t, selectors: [["ng-template", "ngbPaginationPrevious", ""]] }); }
} return t; })(), j = (() => { class t {
    constructor() { this.templateRef = o(g); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: t, selectors: [["ng-template", "ngbPaginationPages", ""]] }); }
} return t; })(), oe = (() => { class t {
    constructor() { this._config = o($), this.pageCount = 0, this.pages = [], this.disabled = this._config.disabled, this.boundaryLinks = this._config.boundaryLinks, this.directionLinks = this._config.directionLinks, this.ellipses = this._config.ellipses, this.rotate = this._config.rotate, this.maxSize = this._config.maxSize, this.page = 1, this.pageSize = this._config.pageSize, this.pageChange = new f(!0), this.size = this._config.size; }
    hasPrevious() { return this.page > 1; }
    hasNext() { return this.page < this.pageCount; }
    nextDisabled() { return !this.hasNext() || this.disabled; }
    previousDisabled() { return !this.hasPrevious() || this.disabled; }
    selectPage(i) { this._updatePages(i); }
    ngOnChanges(i) { this._updatePages(this.page); }
    isEllipsis(i) { return i === -1; }
    _applyEllipses(i, n) { this.ellipses && (i > 0 && (i > 2 ? this.pages.unshift(-1) : i === 2 && this.pages.unshift(2), this.pages.unshift(1)), n < this.pageCount && (n < this.pageCount - 2 ? this.pages.push(-1) : n === this.pageCount - 2 && this.pages.push(this.pageCount - 1), this.pages.push(this.pageCount))); }
    _applyRotation() { let i = 0, n = this.pageCount, a = Math.floor(this.maxSize / 2), _ = this.maxSize % 2 === 0 ? a - 1 : a; return this.page <= a ? n = this.maxSize : this.pageCount - this.page < a ? i = this.pageCount - this.maxSize : (i = this.page - a - 1, n = this.page + _), [i, n]; }
    _applyPagination() { let n = (Math.ceil(this.page / this.maxSize) - 1) * this.maxSize, a = n + this.maxSize; return [n, a]; }
    _setPageInRange(i) { let n = this.page; this.page = N(i, this.pageCount, 1), this.page !== n && u(this.collectionSize) && this.pageChange.emit(this.page); }
    _updatePages(i) { this.pageCount = Math.ceil(this.collectionSize / this.pageSize), u(this.pageCount) || (this.pageCount = 0), this.pages.length = 0; for (let n = 1; n <= this.pageCount; n++)
        this.pages.push(n); if (this._setPageInRange(i), this.maxSize > 0 && this.pageCount > this.maxSize) {
        let n = 0, a = this.pageCount;
        this.rotate ? [n, a] = this._applyRotation() : [n, a] = this._applyPagination(), this.pages = this.pages.slice(n, a), this._applyEllipses(n, a);
    } }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275cmp = e.\u0275\u0275defineComponent({ type: t, selectors: [["ngb-pagination"]], contentQueries: function (n, a, _) { if (n & 1 && e.\u0275\u0275contentQuery(_, H, 5)(_, J, 5)(_, K, 5)(_, W, 5)(_, Q, 5)(_, q, 5)(_, j, 5), n & 2) {
            let l;
            e.\u0275\u0275queryRefresh(l = e.\u0275\u0275loadQuery()) && (a.tplEllipsis = l.first), e.\u0275\u0275queryRefresh(l = e.\u0275\u0275loadQuery()) && (a.tplFirst = l.first), e.\u0275\u0275queryRefresh(l = e.\u0275\u0275loadQuery()) && (a.tplLast = l.first), e.\u0275\u0275queryRefresh(l = e.\u0275\u0275loadQuery()) && (a.tplNext = l.first), e.\u0275\u0275queryRefresh(l = e.\u0275\u0275loadQuery()) && (a.tplNumber = l.first), e.\u0275\u0275queryRefresh(l = e.\u0275\u0275loadQuery()) && (a.tplPrevious = l.first), e.\u0275\u0275queryRefresh(l = e.\u0275\u0275loadQuery()) && (a.tplPages = l.first);
        } }, hostAttrs: ["role", "navigation"], inputs: { disabled: "disabled", boundaryLinks: "boundaryLinks", directionLinks: "directionLinks", ellipses: "ellipses", rotate: "rotate", collectionSize: "collectionSize", maxSize: "maxSize", page: "page", pageSize: "pageSize", size: "size" }, outputs: { pageChange: "pageChange" }, features: [e.\u0275\u0275NgOnChangesFeature], decls: 20, vars: 12, consts: () => { let i; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? i = goog.getMsg("\xAB\xAB") : i = $localize `:@@ngb.pagination.first:««`; let n; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? n = goog.getMsg("\xAB") : n = $localize `:@@ngb.pagination.previous:«`; let a; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? a = goog.getMsg("\xBB") : a = $localize `:@@ngb.pagination.next:»`; let _; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? _ = goog.getMsg("\xBB\xBB") : _ = $localize `:@@ngb.pagination.last:»»`; let l; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? l = goog.getMsg("First") : l = $localize `:@@ngb.pagination.first-aria:First`; let p; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? p = goog.getMsg("Previous") : p = $localize `:@@ngb.pagination.previous-aria:Previous`; let c; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? c = goog.getMsg("Next") : c = $localize `:@@ngb.pagination.next-aria:Next`; let O; return typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? O = goog.getMsg("Last") : O = $localize `:@@ngb.pagination.last-aria:Last`, [["first", ""], ["previous", ""], ["next", ""], ["last", ""], ["ellipsis", ""], ["defaultNumber", ""], ["defaultPages", ""], i, n, a, _, [1, "page-item", 3, "disabled"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["aria-hidden", "true"], [1, "page-item", 3, "active", "disabled"], [1, "page-item"], ["tabindex", "-1", "aria-disabled", "true", 1, "page-link"], ["href", "", 1, "page-link"], ["href", "", 1, "page-link", 3, "click"], ["aria-label", l, "href", "", 1, "page-link", 3, "click"], ["aria-label", p, "href", "", 1, "page-link", 3, "click"], ["aria-label", c, "href", "", 1, "page-link", 3, "click"], ["aria-label", O, "href", "", 1, "page-link", 3, "click"]]; }, template: function (n, a) { if (n & 1 && (e.\u0275\u0275template(0, R, 2, 0, "ng-template", null, 0, e.\u0275\u0275templateRefExtractor)(2, E, 2, 0, "ng-template", null, 1, e.\u0275\u0275templateRefExtractor)(4, S, 2, 0, "ng-template", null, 2, e.\u0275\u0275templateRefExtractor)(6, h, 2, 0, "ng-template", null, 3, e.\u0275\u0275templateRefExtractor)(8, b, 1, 0, "ng-template", null, 4, e.\u0275\u0275templateRefExtractor)(10, C, 1, 1, "ng-template", null, 5, e.\u0275\u0275templateRefExtractor)(12, F, 2, 0, "ng-template", null, 6, e.\u0275\u0275templateRefExtractor), e.\u0275\u0275elementStart(14, "ul"), e.\u0275\u0275conditionalCreate(15, I, 3, 9, "li", 11), e.\u0275\u0275conditionalCreate(16, z, 3, 8, "li", 11), e.\u0275\u0275template(17, L, 0, 0, "ng-template", 12), e.\u0275\u0275conditionalCreate(18, Z, 3, 9, "li", 11), e.\u0275\u0275conditionalCreate(19, V, 3, 9, "li", 11), e.\u0275\u0275elementEnd()), n & 2) {
            let _ = e.\u0275\u0275reference(13);
            e.\u0275\u0275advance(14), e.\u0275\u0275classMap("pagination" + (a.size ? " pagination-" + a.size : "")), e.\u0275\u0275advance(), e.\u0275\u0275conditional(a.boundaryLinks ? 15 : -1), e.\u0275\u0275advance(), e.\u0275\u0275conditional(a.directionLinks ? 16 : -1), e.\u0275\u0275advance(), e.\u0275\u0275property("ngTemplateOutlet", a.tplPages?.templateRef || _)("ngTemplateOutletContext", e.\u0275\u0275pureFunction3(8, A, a.page, a.pages, a.disabled)), e.\u0275\u0275advance(), e.\u0275\u0275conditional(a.directionLinks ? 18 : -1), e.\u0275\u0275advance(), e.\u0275\u0275conditional(a.boundaryLinks ? 19 : -1);
        } }, dependencies: [P], encapsulation: 2 }); }
} return t; })();
var re = (() => { class t {
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275mod = e.\u0275\u0275defineNgModule({ type: t }); }
    static { this.\u0275inj = e.\u0275\u0275defineInjector({}); }
} return t; })();
export { oe as NgbPagination, $ as NgbPaginationConfig, H as NgbPaginationEllipsis, J as NgbPaginationFirst, K as NgbPaginationLast, re as NgbPaginationModule, W as NgbPaginationNext, Q as NgbPaginationNumber, j as NgbPaginationPages, q as NgbPaginationPrevious };
