import { h as c, l as g, o as v } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as e from "@angular/core";
import { inject as r, TemplateRef as I, ElementRef as h, EventEmitter as d, ChangeDetectorRef as p, DOCUMENT as w, DestroyRef as D, NgZone as k } from "@angular/core";
import { Subject as C } from "rxjs";
import { takeUntilDestroyed as _ } from "@angular/core/rxjs-interop";
import { NgbConfig as H } from "@ng-bootstrap/ng-bootstrap/config";
import { startWith as P, distinctUntilChanged as B, skip as E } from "rxjs/operators";
import { NgTemplateOutlet as O } from "@angular/common";
var A = i => ({ $implicit: i });
function F(i, l) { }
function M(i, l) { if (i & 1 && (e.\u0275\u0275elementStart(0, "div", 0), e.\u0275\u0275template(1, F, 0, 0, "ng-template", 1), e.\u0275\u0275elementEnd()), i & 2) {
    let t = e.\u0275\u0275nextContext().$implicit, a = e.\u0275\u0275nextContext();
    e.\u0275\u0275property("item", t)("nav", a.nav)("role", a.paneRole), e.\u0275\u0275advance(), e.\u0275\u0275property("ngTemplateOutlet", t.contentTpl?.templateRef || null)("ngTemplateOutletContext", e.\u0275\u0275pureFunction1(5, A, t.active || a.isPanelTransitioning(t)));
} }
function R(i, l) { if (i & 1 && e.\u0275\u0275conditionalCreate(0, M, 2, 7, "div", 0), i & 2) {
    let t = l.$implicit, a = e.\u0275\u0275nextContext();
    e.\u0275\u0275conditional(t.isPanelInDom() || a.isPanelTransitioning(t) ? 0 : -1);
} }
var T = (() => { class i {
    constructor() { this._ngbConfig = r(H), this.destroyOnHide = !0, this.orientation = "horizontal", this.roles = "tablist", this.keyboard = !0; }
    get animation() { return this._animation ?? this._ngbConfig.animation; }
    set animation(t) { this._animation = t; }
    static { this.\u0275fac = function (a) { return new (a || i); }; }
    static { this.\u0275prov = e.\u0275\u0275defineService({ token: i, factory: i.\u0275fac }); }
} return i; })(), b = i => c(i) && i !== "", L = 0, Q = (() => { class i {
    constructor() { this.templateRef = r(I); }
    static { this.\u0275fac = function (a) { return new (a || i); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: i, selectors: [["ng-template", "ngbNavContent", ""]] }); }
} return i; })(), se = (() => { class i {
    constructor(t) { this.role = t, this.nav = r(u); }
    static { this.\u0275fac = function (a) { return new (a || i)(e.\u0275\u0275injectAttribute("role")); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbNavItem", "", 5, "ng-container"]], hostVars: 1, hostBindings: function (a, n) { a & 2 && e.\u0275\u0275attribute("role", n.role ? n.role : n.nav.roles ? "presentation" : void 0); } }); }
} return i; })(), y = (() => { class i {
    constructor() { this._nav = r(u), this._nativeElement = r(h).nativeElement, this.disabled = !1, this.shown = new d, this.hidden = new d; }
    ngOnInit() { c(this.domId) || (this.domId = `ngb-nav-${L++}`); }
    get active() { return this._nav.activeId === this.id; }
    get id() { return b(this._id) ? this._id : this.domId; }
    get panelDomId() { return `${this.domId}-panel`; }
    isPanelInDom() { return (c(this.destroyOnHide) ? !this.destroyOnHide : !this._nav.destroyOnHide) || this.active; }
    isNgContainer() { return this._nativeElement.nodeType === Node.COMMENT_NODE; }
    static { this.\u0275fac = function (a) { return new (a || i); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbNavItem", ""]], contentQueries: function (a, n, s) { if (a & 1 && e.\u0275\u0275contentQuery(s, Q, 4), a & 2) {
            let o;
            e.\u0275\u0275queryRefresh(o = e.\u0275\u0275loadQuery()) && (n.contentTpl = o.first);
        } }, hostAttrs: [1, "nav-item"], inputs: { destroyOnHide: "destroyOnHide", disabled: "disabled", domId: "domId", _id: [0, "ngbNavItem", "_id"] }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbNavItem"] }); }
} return i; })(), u = (() => { class i {
    constructor(t) { this.role = t, this._config = r(T), this._cd = r(p), this._document = r(w), this._nativeElement = r(h).nativeElement, this.destroyRef = r(D), this._navigatingWithKeyboard = !1, this.activeIdChange = new d, this.animation = this._config.animation, this.destroyOnHide = this._config.destroyOnHide, this.orientation = this._config.orientation, this.roles = this._config.roles, this.keyboard = this._config.keyboard, this.shown = new d, this.hidden = new d, this.navItemChange$ = new C, this.navChange = new d; }
    click(t) { t.disabled || this._updateActiveId(t.id); }
    onFocusout({ relatedTarget: t }) { this._nativeElement.contains(t) || (this._navigatingWithKeyboard = !1); }
    onKeyDown(t) { if (this.roles !== "tablist" || !this.keyboard)
        return; let a = this.links.filter(o => !o.navItem.disabled), { length: n } = a, s = -1; if (a.forEach((o, N) => { o.nativeElement === this._document.activeElement && (s = N); }), n) {
        switch (t.key) {
            case "ArrowUp":
            case "ArrowLeft":
                s = (s - 1 + n) % n;
                break;
            case "ArrowRight":
            case "ArrowDown":
                s = (s + 1) % n;
                break;
            case "Home":
                s = 0;
                break;
            case "End":
                s = n - 1;
                break;
        }
        this.keyboard === "changeWithArrows" && this.select(a[s].navItem.id), a[s].nativeElement.focus(), this._navigatingWithKeyboard = !0, t.preventDefault();
    } }
    select(t) { this._updateActiveId(t, !1); }
    ngAfterContentInit() { if (!c(this.activeId)) {
        let t = this.items.first ? this.items.first.id : null;
        b(t) && (this._updateActiveId(t, !1), this._cd.detectChanges());
    } this.items.changes.pipe(_(this.destroyRef)).subscribe(() => this._notifyItemChanged(this.activeId)); }
    ngOnChanges({ activeId: t }) { t && !t.firstChange && this._notifyItemChanged(t.currentValue); }
    _updateActiveId(t, a = !0) { if (this.activeId !== t) {
        let n = !1;
        a && this.navChange.emit({ activeId: this.activeId, nextId: t, preventDefault: () => { n = !0; } }), n || (this.activeId = t, this.activeIdChange.emit(t), this._notifyItemChanged(t));
    } }
    _notifyItemChanged(t) { this.navItemChange$.next(this._getItemById(t)); }
    _getItemById(t) { return this.items && this.items.find(a => a.id === t) || null; }
    static { this.\u0275fac = function (a) { return new (a || i)(e.\u0275\u0275injectAttribute("role")); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbNav", ""]], contentQueries: function (a, n, s) { if (a & 1 && e.\u0275\u0275contentQuery(s, y, 4)(s, f, 5), a & 2) {
            let o;
            e.\u0275\u0275queryRefresh(o = e.\u0275\u0275loadQuery()) && (n.items = o), e.\u0275\u0275queryRefresh(o = e.\u0275\u0275loadQuery()) && (n.links = o);
        } }, hostAttrs: [1, "nav"], hostVars: 4, hostBindings: function (a, n) { a & 1 && e.\u0275\u0275listener("keydown.arrowLeft", function (o) { return n.onKeyDown(o); })("keydown.arrowRight", function (o) { return n.onKeyDown(o); })("keydown.arrowDown", function (o) { return n.onKeyDown(o); })("keydown.arrowUp", function (o) { return n.onKeyDown(o); })("keydown.Home", function (o) { return n.onKeyDown(o); })("keydown.End", function (o) { return n.onKeyDown(o); })("focusout", function (o) { return n.onFocusout(o); }), a & 2 && (e.\u0275\u0275attribute("aria-orientation", n.orientation === "vertical" && n.roles === "tablist" ? "vertical" : void 0)("role", n.role ? n.role : n.roles ? "tablist" : void 0), e.\u0275\u0275classProp("flex-column", n.orientation === "vertical")); }, inputs: { activeId: "activeId", animation: "animation", destroyOnHide: "destroyOnHide", orientation: "orientation", roles: "roles", keyboard: "keyboard" }, outputs: { activeIdChange: "activeIdChange", shown: "shown", hidden: "hidden", navChange: "navChange" }, exportAs: ["ngbNav"], features: [e.\u0275\u0275NgOnChangesFeature] }); }
} return i; })(), f = (() => { class i {
    constructor(t) { this.role = t, this.navItem = r(y), this.nav = r(u), this.nativeElement = r(h).nativeElement; }
    get tabindex() { return this.nav.keyboard === !1 ? this.navItem.disabled ? -1 : void 0 : this.nav._navigatingWithKeyboard || this.navItem.disabled || !this.navItem.active ? -1 : void 0; }
    static { this.\u0275fac = function (a) { return new (a || i)(e.\u0275\u0275injectAttribute("role")); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbNavLink", ""]], hostAttrs: [1, "nav-link"], hostVars: 12, hostBindings: function (a, n) { a & 2 && (e.\u0275\u0275domProperty("id", n.navItem.domId), e.\u0275\u0275attribute("role", n.role ? n.role : n.nav.roles ? "tab" : void 0)("tabindex", n.tabindex)("aria-controls", n.navItem.isPanelInDom() ? n.navItem.panelDomId : null)("aria-selected", n.navItem.active)("aria-disabled", n.navItem.disabled), e.\u0275\u0275classProp("nav-item", n.navItem.isNgContainer())("active", n.navItem.active)("disabled", n.navItem.disabled)); } }); }
} return i; })(), re = (() => { class i extends f {
    static { this.\u0275fac = (() => { let t; return function (n) { return (t || (t = e.\u0275\u0275getInheritedFactory(i)))(n || i); }; })(); }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: i, selectors: [["button", "ngbNavLink", ""]], hostAttrs: ["type", "button"], hostVars: 1, hostBindings: function (a, n) { a & 1 && e.\u0275\u0275listener("click", function () { return n.nav.click(n.navItem); }), a & 2 && e.\u0275\u0275domProperty("disabled", n.navItem.disabled); }, features: [e.\u0275\u0275InheritDefinitionFeature] }); }
} return i; })(), de = (() => { class i extends f {
    static { this.\u0275fac = (() => { let t; return function (n) { return (t || (t = e.\u0275\u0275getInheritedFactory(i)))(n || i); }; })(); }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: i, selectors: [["a", "ngbNavLink", ""]], hostAttrs: ["href", ""], hostBindings: function (a, n) { a & 1 && e.\u0275\u0275listener("click", function (o) { return n.nav.click(n.navItem), o.preventDefault(); }); }, features: [e.\u0275\u0275InheritDefinitionFeature] }); }
} return i; })(), V = ({ classList: i }) => (i.remove("show"), () => i.remove("active")), K = (i, l) => { l && g(i), i.classList.add("show"); }, m = (() => { class i {
    constructor() { this.nativeElement = r(h).nativeElement; }
    static { this.\u0275fac = function (a) { return new (a || i); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbNavPane", ""]], hostAttrs: [1, "tab-pane"], hostVars: 5, hostBindings: function (a, n) { a & 2 && (e.\u0275\u0275domProperty("id", n.item.panelDomId), e.\u0275\u0275attribute("role", n.role ? n.role : n.nav.roles ? "tabpanel" : void 0)("aria-labelledby", n.item.domId), e.\u0275\u0275classProp("fade", n.nav.animation)); }, inputs: { item: "item", nav: "nav", role: "role" } }); }
} return i; })(), le = (() => { class i {
    constructor() { this._cd = r(p), this._ngZone = r(k), this._activePane = null; }
    isPanelTransitioning(t) { return this._activePane?.item === t; }
    ngAfterViewInit() { this._updateActivePane(), this.nav.navItemChange$.pipe(_(this.nav.destroyRef), P(this._activePane?.item || null), B(), E(1)).subscribe(t => { let a = { animation: this.nav.animation, runningTransition: "stop" }; this._cd.detectChanges(), this._activePane ? v(this._ngZone, this._activePane.nativeElement, V, a).subscribe(() => { let n = this._activePane?.item; this._activePane = this._getPaneForItem(t), this._cd.markForCheck(), this._activePane && (this._activePane.nativeElement.classList.add("active"), v(this._ngZone, this._activePane.nativeElement, K, a).subscribe(() => { t && (t.shown.emit(), this.nav.shown.emit(t.id)); })), n && (n.hidden.emit(), this.nav.hidden.emit(n.id)); }) : this._updateActivePane(); }); }
    _updateActivePane() { this._activePane = this._getActivePane(), this._activePane?.nativeElement.classList.add("show", "active"); }
    _getPaneForItem(t) { return this._panes && this._panes.find(a => a.item === t) || null; }
    _getActivePane() { return this._panes && this._panes.find(t => t.item.active) || null; }
    static { this.\u0275fac = function (a) { return new (a || i); }; }
    static { this.\u0275cmp = e.\u0275\u0275defineComponent({ type: i, selectors: [["", "ngbNavOutlet", ""]], viewQuery: function (a, n) { if (a & 1 && e.\u0275\u0275viewQuery(m, 5), a & 2) {
            let s;
            e.\u0275\u0275queryRefresh(s = e.\u0275\u0275loadQuery()) && (n._panes = s);
        } }, hostAttrs: [1, "tab-content"], inputs: { paneRole: "paneRole", nav: [0, "ngbNavOutlet", "nav"] }, decls: 2, vars: 0, consts: [["ngbNavPane", "", 3, "item", "nav", "role"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function (a, n) { a & 1 && e.\u0275\u0275repeaterCreate(0, R, 1, 1, null, null, e.\u0275\u0275repeaterTrackByIdentity), a & 2 && e.\u0275\u0275repeater(n.nav.items); }, dependencies: [m, O], encapsulation: 2 }); }
} return i; })();
var ce = (() => { class i {
    static { this.\u0275fac = function (a) { return new (a || i); }; }
    static { this.\u0275mod = e.\u0275\u0275defineNgModule({ type: i }); }
    static { this.\u0275inj = e.\u0275\u0275defineInjector({}); }
} return i; })();
export { u as NgbNav, T as NgbNavConfig, Q as NgbNavContent, y as NgbNavItem, se as NgbNavItemRole, de as NgbNavLink, f as NgbNavLinkBase, re as NgbNavLinkButton, ce as NgbNavModule, le as NgbNavOutlet, m as NgbNavPane };
