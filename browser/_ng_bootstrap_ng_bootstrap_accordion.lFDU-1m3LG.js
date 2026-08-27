import { e as l } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as e from "@angular/core";
import { inject as n, ElementRef as g, ViewContainerRef as p, TemplateRef as m, ChangeDetectorRef as _, DestroyRef as y, EventEmitter as c } from "@angular/core";
import { takeUntilDestroyed as h } from "@angular/core/rxjs-interop";
import { NgbConfig as b } from "@ng-bootstrap/ng-bootstrap/config";
import * as f from "@ng-bootstrap/ng-bootstrap/collapse";
import { NgbCollapse as v } from "@ng-bootstrap/ng-bootstrap/collapse";
var A = ["container"], w = ["*"], C = (() => { class o {
    constructor() { this._ngbConfig = n(b), this.closeOthers = !1, this.destroyOnHide = !0; }
    get animation() { return this._animation ?? this._ngbConfig.animation; }
    set animation(t) { this._animation = t; }
    static { this.\u0275fac = function (i) { return new (i || o); }; }
    static { this.\u0275prov = e.\u0275\u0275defineService({ token: o, factory: o.\u0275fac }); }
} return o; })(), D = 0, S = (() => { class o {
    constructor() { this._item = n(a), this._viewRef = null, this.elementRef = n(g); }
    ngAfterContentChecked() { this._bodyTpl && (this._item._shouldBeInDOM ? this._createViewIfNotExists() : this._destroyViewIfExists()); }
    ngOnDestroy() { this._destroyViewIfExists(); }
    _destroyViewIfExists() { this._viewRef?.destroy(), this._viewRef = null; }
    _createViewIfNotExists() { this._viewRef || (this._viewRef = this._vcr.createEmbeddedView(this._bodyTpl), this._viewRef.detectChanges()); }
    static { this.\u0275fac = function (i) { return new (i || o); }; }
    static { this.\u0275cmp = e.\u0275\u0275defineComponent({ type: o, selectors: [["", "ngbAccordionBody", ""]], contentQueries: function (i, s, r) { if (i & 1 && e.\u0275\u0275contentQuery(r, m, 7), i & 2) {
            let d;
            e.\u0275\u0275queryRefresh(d = e.\u0275\u0275loadQuery()) && (s._bodyTpl = d.first);
        } }, viewQuery: function (i, s) { if (i & 1 && e.\u0275\u0275viewQuery(A, 7, p), i & 2) {
            let r;
            e.\u0275\u0275queryRefresh(r = e.\u0275\u0275loadQuery()) && (s._vcr = r.first);
        } }, hostAttrs: [1, "accordion-body"], ngContentSelectors: w, decls: 3, vars: 0, consts: [["container", ""]], template: function (i, s) { i & 1 && (e.\u0275\u0275projectionDef(), e.\u0275\u0275domElementContainer(0, null, 0), e.\u0275\u0275projection(2)); }, encapsulation: 2 }); }
} return o; })(), I = (() => { class o {
    constructor() { this.item = n(a), this.ngbCollapse = n(v); }
    static { this.\u0275fac = function (i) { return new (i || o); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: o, selectors: [["", "ngbAccordionCollapse", ""]], hostAttrs: ["role", "region", 1, "accordion-collapse"], hostVars: 2, hostBindings: function (i, s) { i & 2 && (e.\u0275\u0275domProperty("id", s.item.collapseId), e.\u0275\u0275attribute("aria-labelledby", s.item.toggleId)); }, exportAs: ["ngbAccordionCollapse"], features: [e.\u0275\u0275HostDirectivesFeature([f.NgbCollapse])] }); }
} return o; })(), N = (() => { class o {
    constructor() { this.item = n(a), this.accordion = n(u); }
    static { this.\u0275fac = function (i) { return new (i || o); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: o, selectors: [["", "ngbAccordionToggle", ""]], hostVars: 5, hostBindings: function (i, s) { i & 1 && e.\u0275\u0275listener("click", function () { return !s.item.disabled && s.accordion.toggle(s.item.id); }), i & 2 && (e.\u0275\u0275domProperty("id", s.item.toggleId), e.\u0275\u0275attribute("aria-controls", s.item.collapseId)("aria-expanded", !s.item.collapsed), e.\u0275\u0275classProp("collapsed", s.item.collapsed)); } }); }
} return o; })(), q = (() => { class o {
    constructor() { this.item = n(a); }
    static { this.\u0275fac = function (i) { return new (i || o); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: o, selectors: [["button", "ngbAccordionButton", ""]], hostAttrs: ["type", "button", 1, "accordion-button"], hostVars: 1, hostBindings: function (i, s) { i & 2 && e.\u0275\u0275domProperty("disabled", s.item.disabled); }, features: [e.\u0275\u0275HostDirectivesFeature([N])] }); }
} return o; })(), $ = (() => { class o {
    constructor() { this.item = n(a); }
    static { this.\u0275fac = function (i) { return new (i || o); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: o, selectors: [["", "ngbAccordionHeader", ""]], hostAttrs: ["role", "heading", 1, "accordion-header"], hostVars: 2, hostBindings: function (i, s) { i & 2 && e.\u0275\u0275classProp("collapsed", s.item.collapsed); } }); }
} return o; })(), a = (() => { class o {
    constructor() { this._accordion = n(u), this._cd = n(_), this._destroyRef = n(y), this._collapsed = !0, this._id = `ngb-accordion-item-${D++}`, this._collapseAnimationRunning = !1, this.disabled = !1, this.show = new c, this.shown = new c, this.hide = new c, this.hidden = new c; }
    set id(t) { l(t) && t !== "" && (this._id = t); }
    set destroyOnHide(t) { this._destroyOnHide = t; }
    get destroyOnHide() { return this._destroyOnHide === void 0 ? this._accordion.destroyOnHide : this._destroyOnHide; }
    set collapsed(t) { t ? this.collapse() : this.expand(); }
    get collapsed() { return this._collapsed; }
    get id() { return `${this._id}`; }
    get toggleId() { return `${this.id}-toggle`; }
    get collapseId() { return `${this.id}-collapse`; }
    get _shouldBeInDOM() { return !this.collapsed || this._collapseAnimationRunning || !this.destroyOnHide; }
    ngAfterContentInit() { let { ngbCollapse: t } = this._collapse; t.animation = !1, t.collapsed = this.collapsed, t.animation = this._accordion.animation, t.hidden.pipe(h(this._destroyRef)).subscribe(() => { this._collapseAnimationRunning = !1, this.hidden.emit(), this._accordion.hidden.emit(this.id), this._cd.markForCheck(); }), t.shown.pipe(h(this._destroyRef)).subscribe(() => { this.shown.emit(), this._accordion.shown.emit(this.id), this._cd.markForCheck(); }); }
    toggle() { this.collapsed = !this.collapsed; }
    expand() { if (this.collapsed) {
        if (!this._accordion._ensureCanExpand(this))
            return;
        this._collapsed = !1, this._cd.markForCheck(), this._cd.detectChanges(), this.show.emit(), this._accordion.show.emit(this.id), this._collapse.ngbCollapse.animation = this._accordion.animation, this._collapse.ngbCollapse.collapsed = !1;
    } }
    collapse() { this.collapsed || (this._collapsed = !0, this._collapseAnimationRunning = !0, this._cd.markForCheck(), this.hide.emit(), this._accordion.hide.emit(this.id), this._collapse.ngbCollapse.animation = this._accordion.animation, this._collapse.ngbCollapse.collapsed = !0); }
    static { this.\u0275fac = function (i) { return new (i || o); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: o, selectors: [["", "ngbAccordionItem", ""]], contentQueries: function (i, s, r) { if (i & 1 && e.\u0275\u0275contentQuery(r, I, 7), i & 2) {
            let d;
            e.\u0275\u0275queryRefresh(d = e.\u0275\u0275loadQuery()) && (s._collapse = d.first);
        } }, hostAttrs: [1, "accordion-item"], hostVars: 1, hostBindings: function (i, s) { i & 2 && e.\u0275\u0275domProperty("id", s.id); }, inputs: { id: [0, "ngbAccordionItem", "id"], destroyOnHide: "destroyOnHide", disabled: "disabled", collapsed: "collapsed" }, outputs: { show: "show", shown: "shown", hide: "hide", hidden: "hidden" }, exportAs: ["ngbAccordionItem"] }); }
} return o; })(), u = (() => { class o {
    constructor() { this._config = n(C), this._anItemWasAlreadyExpandedDuringInitialisation = !1, this.animation = this._config.animation, this.closeOthers = this._config.closeOthers, this.destroyOnHide = this._config.destroyOnHide, this.show = new c, this.shown = new c, this.hide = new c, this.hidden = new c; }
    toggle(t) { this._getItem(t)?.toggle(); }
    expand(t) { this._getItem(t)?.expand(); }
    expandAll() { this._items && (this.closeOthers ? this._items.find(t => !t.collapsed) || this._items.first.expand() : this._items.forEach(t => t.expand())); }
    collapse(t) { this._getItem(t)?.collapse(); }
    collapseAll() { this._items?.forEach(t => t.collapse()); }
    isExpanded(t) { let i = this._getItem(t); return i ? !i.collapsed : !1; }
    _ensureCanExpand(t) { return this.closeOthers ? this._items ? (this._items.find(i => !i.collapsed && t !== i)?.collapse(), !0) : this._anItemWasAlreadyExpandedDuringInitialisation ? !1 : (this._anItemWasAlreadyExpandedDuringInitialisation = !0, !0) : !0; }
    _getItem(t) { return this._items?.find(i => i.id === t); }
    static { this.\u0275fac = function (i) { return new (i || o); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: o, selectors: [["", "ngbAccordion", ""]], contentQueries: function (i, s, r) { if (i & 1 && e.\u0275\u0275contentQuery(r, a, 4), i & 2) {
            let d;
            e.\u0275\u0275queryRefresh(d = e.\u0275\u0275loadQuery()) && (s._items = d);
        } }, hostAttrs: [1, "accordion"], inputs: { animation: "animation", closeOthers: "closeOthers", destroyOnHide: "destroyOnHide" }, outputs: { show: "show", shown: "shown", hide: "hide", hidden: "hidden" }, exportAs: ["ngbAccordion"] }); }
} return o; })();
var W = (() => { class o {
    static { this.\u0275fac = function (i) { return new (i || o); }; }
    static { this.\u0275mod = e.\u0275\u0275defineNgModule({ type: o }); }
    static { this.\u0275inj = e.\u0275\u0275defineInjector({}); }
} return o; })();
export { S as NgbAccordionBody, q as NgbAccordionButton, I as NgbAccordionCollapse, C as NgbAccordionConfig, u as NgbAccordionDirective, $ as NgbAccordionHeader, a as NgbAccordionItem, W as NgbAccordionModule, N as NgbAccordionToggle };
