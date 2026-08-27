import { e as D, h as v, i as j, l as R, o as f, t as S, u as T, w as m, y as I } from "@nf-internal/chunk-RJD7D2ZM";
import { a as C, b as O } from "@nf-internal/chunk-PZNONLPT";
import * as s from "@angular/core";
import { inject as r, ElementRef as M, NgZone as k, Injector as p, EventEmitter as B, afterNextRender as P, DOCUMENT as H, ApplicationRef as L, createComponent as w, TemplateRef as N } from "@angular/core";
import { NgbConfig as V } from "@ng-bootstrap/ng-bootstrap/config";
import { takeUntil as y, filter as A, finalize as x } from "rxjs/operators";
import { Subject as h, of as z, zip as $, fromEvent as W } from "rxjs";
var K = ["*"], q = (() => { class n {
    constructor() { this._ngbConfig = r(V), this.backdrop = !0, this.keyboard = !0, this.position = "start", this.scroll = !1; }
    get animation() { return this._animation ?? this._ngbConfig.animation; }
    set animation(t) { this._animation = t; }
    static { this.\u0275fac = function (e) { return new (e || n); }; }
    static { this.\u0275prov = s.\u0275\u0275defineService({ token: n, factory: n.\u0275fac }); }
} return n; })(), b = class {
    close(o) { }
    dismiss(o) { }
}, E = class {
    get componentInstance() { if (this._contentRef && this._contentRef.componentRef)
        return this._contentRef.componentRef.instance; }
    get closed() { return this._closed.asObservable().pipe(y(this._hidden)); }
    get dismissed() { return this._dismissed.asObservable().pipe(y(this._hidden)); }
    get hidden() { return this._hidden.asObservable(); }
    get shown() { return this._panelCmptRef.instance.shown.asObservable(); }
    constructor(o, t, e, i) { this._panelCmptRef = o, this._contentRef = t, this._backdropCmptRef = e, this._beforeDismiss = i, this._closed = new h, this._dismissed = new h, this._hidden = new h, o.instance.dismissEvent.subscribe(a => { this.dismiss(a); }), e && e.instance.dismissEvent.subscribe(a => { this.dismiss(a); }), this.result = new Promise((a, c) => { this._resolve = a, this._reject = c; }), this.result.then(null, () => { }); }
    close(o) { this._panelCmptRef && (this._closed.next(o), this._resolve(o), this._removeOffcanvasElements()); }
    _dismiss(o) { this._dismissed.next(o), this._reject(o), this._removeOffcanvasElements(); }
    dismiss(o) { if (this._panelCmptRef)
        if (!this._beforeDismiss)
            this._dismiss(o);
        else {
            let t = this._beforeDismiss();
            j(t) ? t.then(e => { e !== !1 && this._dismiss(o); }, () => { }) : t !== !1 && this._dismiss(o);
        } }
    _removeOffcanvasElements() { let o = this._panelCmptRef.instance.hide(), t = this._backdropCmptRef ? this._backdropCmptRef.instance.hide() : z(void 0); o.subscribe(() => { let { nativeElement: e } = this._panelCmptRef.location; e.parentNode.removeChild(e), this._panelCmptRef.destroy(), this._contentRef?.viewRef?.destroy(), this._panelCmptRef = null, this._contentRef = null; }), t.subscribe(() => { if (this._backdropCmptRef) {
        let { nativeElement: e } = this._backdropCmptRef.location;
        e.parentNode.removeChild(e), this._backdropCmptRef.destroy(), this._backdropCmptRef = null;
    } }), $(o, t).subscribe(() => { this._hidden.next(), this._hidden.complete(); }); }
}, F = (function (n) { return n[n.BACKDROP_CLICK = 0] = "BACKDROP_CLICK", n[n.ESC = 1] = "ESC", n; })(F || {}), U = (() => { class n {
    constructor() { this._nativeElement = r(M).nativeElement, this._zone = r(k), this._injector = r(p), this.dismissEvent = new B; }
    ngOnInit() { P({ mixedReadWrite: () => f(this._zone, this._nativeElement, (t, e) => { e && R(t), t.classList.add("show"); }, { animation: this.animation, runningTransition: "continue" }) }, { injector: this._injector }); }
    hide() { return f(this._zone, this._nativeElement, ({ classList: t }) => t.remove("show"), { animation: this.animation, runningTransition: "stop" }); }
    dismiss() { this.static || this.dismissEvent.emit(F.BACKDROP_CLICK); }
    static { this.\u0275fac = function (e) { return new (e || n); }; }
    static { this.\u0275cmp = s.\u0275\u0275defineComponent({ type: n, selectors: [["ngb-offcanvas-backdrop"]], hostVars: 6, hostBindings: function (e, i) { e & 1 && s.\u0275\u0275listener("mousedown", function () { return i.dismiss(); }), e & 2 && (s.\u0275\u0275classMap("offcanvas-backdrop" + (i.backdropClass ? " " + i.backdropClass : "")), s.\u0275\u0275classProp("show", !i.animation)("fade", i.animation)); }, inputs: { animation: "animation", backdropClass: "backdropClass", static: "static" }, outputs: { dismissEvent: "dismiss" }, decls: 0, vars: 0, template: function (e, i) { }, encapsulation: 2, changeDetection: 1 }); }
} return n; })(), Z = (() => { class n {
    constructor() { this._document = r(H), this._elRef = r(M), this._zone = r(k), this._injector = r(p), this._closed$ = new h, this._elWithFocus = null, this.keyboard = !0, this.position = "start", this.dismissEvent = new B, this.shown = new h, this.hidden = new h; }
    dismiss(t) { this.dismissEvent.emit(t); }
    ngOnInit() { this._elWithFocus = this._document.activeElement, P({ mixedReadWrite: () => this._show() }, { injector: this._injector }); }
    ngOnDestroy() { this._disableEventHandling(); }
    hide() { let t = { animation: this.animation, runningTransition: "stop" }, e = f(this._zone, this._elRef.nativeElement, i => (i.classList.remove("showing"), i.classList.add("hiding"), () => i.classList.remove("show", "hiding")), t); return e.subscribe(() => { this.hidden.next(), this.hidden.complete(); }), this._disableEventHandling(), this._restoreFocus(), e; }
    _show() { let t = { animation: this.animation, runningTransition: "continue" }; f(this._zone, this._elRef.nativeElement, (i, a) => (a && R(i), i.classList.add("show", "showing"), () => i.classList.remove("showing")), t).subscribe(() => { this.shown.next(), this.shown.complete(); }), this._enableEventHandling(), this._setFocus(); }
    _enableEventHandling() { let { nativeElement: t } = this._elRef; this._zone.runOutsideAngular(() => { W(t, "keydown").pipe(y(this._closed$), A(e => e.key === "Escape")).subscribe(e => { this.keyboard && requestAnimationFrame(() => { e.defaultPrevented || this._zone.run(() => this.dismiss(F.ESC)); }); }); }); }
    _disableEventHandling() { this._closed$.next(); }
    _setFocus() { let { nativeElement: t } = this._elRef; if (!t.contains(document.activeElement)) {
        let e = t.querySelector("[ngbAutofocus]"), i = S(t)[0];
        (e || i || t).focus();
    } }
    _restoreFocus() { let t = this._document.body, e = this._elWithFocus, i; e && e.focus && t.contains(e) ? i = e : i = t, this._zone.runOutsideAngular(() => { setTimeout(() => i.focus()), this._elWithFocus = null; }); }
    static { this.\u0275fac = function (e) { return new (e || n); }; }
    static { this.\u0275cmp = s.\u0275\u0275defineComponent({ type: n, selectors: [["ngb-offcanvas-panel"]], hostAttrs: ["role", "dialog", "tabindex", "-1"], hostVars: 5, hostBindings: function (e, i) { e & 2 && (s.\u0275\u0275attribute("aria-modal", !0)("aria-labelledby", i.ariaLabelledBy)("aria-describedby", i.ariaDescribedBy), s.\u0275\u0275classMap("offcanvas offcanvas-" + i.position + (i.panelClass ? " " + i.panelClass : ""))); }, inputs: { animation: "animation", ariaLabelledBy: "ariaLabelledBy", ariaDescribedBy: "ariaDescribedBy", keyboard: "keyboard", panelClass: "panelClass", position: "position" }, outputs: { dismissEvent: "dismiss" }, ngContentSelectors: K, decls: 1, vars: 0, template: function (e, i) { e & 1 && (s.\u0275\u0275projectionDef(), s.\u0275\u0275projection(0)); }, encapsulation: 2, changeDetection: 1 }); }
} return n; })(), G = (() => { class n {
    constructor() { this._applicationRef = r(L), this._injector = r(p), this._document = r(H), this._scrollBar = r(I), this._activePanelCmptHasChanged = new h, this._scrollBarRestoreFn = null, this._backdropAttributes = ["animation", "backdropClass"], this._panelAttributes = ["animation", "ariaDescribedBy", "ariaLabelledBy", "keyboard", "panelClass", "position"], this._activeInstance = new B; let t = r(k); this._activePanelCmptHasChanged.subscribe(() => { this._panelCmpt && T(t, this._panelCmpt.location.nativeElement, this._activePanelCmptHasChanged); }); }
    _restoreScrollBar() { let t = this._scrollBarRestoreFn; t && (this._scrollBarRestoreFn = null, t()); }
    _hideScrollBar() { this._scrollBarRestoreFn || (this._scrollBarRestoreFn = this._scrollBar.hide()); }
    open(t, e, i) { let a = i.container instanceof HTMLElement ? i.container : v(i.container) ? this._document.querySelector(i.container) : this._document.body; if (!a)
        throw new Error(`The specified offcanvas container "${i.container || "body"}" was not found in the DOM.`); i.scroll || this._hideScrollBar(); let c = new b, _ = this._getContentRef(i.injector || t, e, c), l = i.backdrop !== !1 ? this._attachBackdrop(a) : void 0, u = this._attachWindowComponent(a, _.nodes), d = new E(u, _, l, i.beforeDismiss); return this._registerOffcanvasRef(d), this._registerPanelCmpt(u), d.hidden.pipe(x(() => this._restoreScrollBar())).subscribe(), c.close = g => { d.close(g); }, c.dismiss = g => { d.dismiss(g); }, this._applyPanelOptions(u.instance, i), l && l.instance && (this._applyBackdropOptions(l.instance, i), l.changeDetectorRef.detectChanges()), u.changeDetectorRef.detectChanges(), d; }
    get activeInstance() { return this._activeInstance; }
    dismiss(t) { this._offcanvasRef?.dismiss(t); }
    hasOpenOffcanvas() { return !!this._offcanvasRef; }
    _attachBackdrop(t) { let e = w(U, { environmentInjector: this._applicationRef.injector, elementInjector: this._injector }); return this._applicationRef.attachView(e.hostView), t.appendChild(e.location.nativeElement), e; }
    _attachWindowComponent(t, e) { let i = w(Z, { environmentInjector: this._applicationRef.injector, elementInjector: this._injector, projectableNodes: e }); return this._applicationRef.attachView(i.hostView), t.appendChild(i.location.nativeElement), i; }
    _applyPanelOptions(t, e) { this._panelAttributes.forEach(i => { v(e[i]) && (t[i] = e[i]); }); }
    _applyBackdropOptions(t, e) { this._backdropAttributes.forEach(i => { v(e[i]) && (t[i] = e[i]); }), t.static = e.backdrop === "static"; }
    _getContentRef(t, e, i) { return e ? e instanceof N ? this._createFromTemplateRef(e, i) : D(e) ? this._createFromString(e) : this._createFromComponent(t, e, i) : new m([]); }
    _createFromTemplateRef(t, e) { let i = { $implicit: e, close(c) { e.close(c); }, dismiss(c) { e.dismiss(c); } }, a = t.createEmbeddedView(i); return this._applicationRef.attachView(a), new m([a.rootNodes], a); }
    _createFromString(t) { let e = this._document.createTextNode(`${t}`); return new m([[e]]); }
    _createFromComponent(t, e, i) { let a = p.create({ providers: [{ provide: b, useValue: i }], parent: t }), c = w(e, { environmentInjector: this._applicationRef.injector, elementInjector: a }), _ = c.location.nativeElement; return this._applicationRef.attachView(c.hostView), new m([[_]], c.hostView, c); }
    _registerOffcanvasRef(t) { let e = () => { this._offcanvasRef = void 0, this._activeInstance.emit(this._offcanvasRef); }; this._offcanvasRef = t, this._activeInstance.emit(this._offcanvasRef), t.result.then(e, e); }
    _registerPanelCmpt(t) { this._panelCmpt = t, this._activePanelCmptHasChanged.next(), t.onDestroy(() => { this._panelCmpt = void 0, this._activePanelCmptHasChanged.next(); }); }
    static { this.\u0275fac = function (e) { return new (e || n); }; }
    static { this.\u0275prov = s.\u0275\u0275defineService({ token: n, factory: n.\u0275fac }); }
} return n; })(), ce = (() => { class n {
    constructor() { this._injector = r(p), this._offcanvasStack = r(G), this._config = r(q); }
    open(t, e = {}) { let i = C(O(C({}, this._config), { animation: this._config.animation }), e); return this._offcanvasStack.open(this._injector, t, i); }
    get activeInstance() { return this._offcanvasStack.activeInstance; }
    dismiss(t) { this._offcanvasStack.dismiss(t); }
    hasOpenOffcanvas() { return this._offcanvasStack.hasOpenOffcanvas(); }
    static { this.\u0275fac = function (e) { return new (e || n); }; }
    static { this.\u0275prov = s.\u0275\u0275defineService({ token: n, factory: n.\u0275fac }); }
} return n; })(), he = (() => { class n {
    static { this.\u0275fac = function (e) { return new (e || n); }; }
    static { this.\u0275mod = s.\u0275\u0275defineNgModule({ type: n }); }
    static { this.\u0275inj = s.\u0275\u0275defineInjector({}); }
} return n; })();
export { b as NgbActiveOffcanvas, ce as NgbOffcanvas, q as NgbOffcanvasConfig, he as NgbOffcanvasModule, E as NgbOffcanvasRef, F as OffcanvasDismissReasons };
