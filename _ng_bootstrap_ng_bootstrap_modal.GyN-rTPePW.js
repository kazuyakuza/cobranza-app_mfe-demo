import { e as k, h as w, i as S, l as y, o as d, t as O, u as I, w as p, y as A } from "@nf-internal/chunk-RJD7D2ZM";
import { a as E, b as j } from "@nf-internal/chunk-PZNONLPT";
import * as n from "@angular/core";
import { inject as c, ElementRef as z, NgZone as M, Injector as b, ChangeDetectorRef as V, afterNextRender as $, DOCUMENT as N, EventEmitter as L, ApplicationRef as x, EnvironmentInjector as H, createComponent as B, TemplateRef as K } from "@angular/core";
import { NgbConfig as q } from "@ng-bootstrap/ng-bootstrap/config";
import { Subject as f, of as Q, zip as D, fromEvent as g } from "rxjs";
import { takeUntil as u, filter as W, tap as U, switchMap as Z, take as P } from "rxjs/operators";
var G = ["dialog"], J = ["*"], X = (() => { class s {
    constructor() { this._ngbConfig = c(q), this.backdrop = !0, this.fullscreen = !1, this.keyboard = !0, this.role = "dialog"; }
    get animation() { return this._animation ?? this._ngbConfig.animation; }
    set animation(e) { this._animation = e; }
    static { this.\u0275fac = function (t) { return new (t || s); }; }
    static { this.\u0275prov = n.\u0275\u0275defineService({ token: s, factory: s.\u0275fac }); }
} return s; })(), Y = ["animation", "backdropClass"], ee = (() => { class s {
    constructor() { this._nativeElement = c(z).nativeElement, this._zone = c(M), this._injector = c(b), this._cdRef = c(V); }
    ngOnInit() { $({ mixedReadWrite: () => d(this._zone, this._nativeElement, (e, t) => { t && y(e), e.classList.add("show"); }, { animation: this.animation, runningTransition: "continue" }) }, { injector: this._injector }); }
    hide() { return d(this._zone, this._nativeElement, ({ classList: e }) => e.remove("show"), { animation: this.animation, runningTransition: "stop" }); }
    updateOptions(e) { Y.forEach(t => { w(e[t]) && (this[t] = e[t]); }), this._cdRef.markForCheck(); }
    static { this.\u0275fac = function (t) { return new (t || s); }; }
    static { this.\u0275cmp = n.\u0275\u0275defineComponent({ type: s, selectors: [["ngb-modal-backdrop"]], hostVars: 8, hostBindings: function (t, i) { t & 2 && (n.\u0275\u0275classMap("modal-backdrop" + (i.backdropClass ? " " + i.backdropClass : "")), n.\u0275\u0275styleProp("z-index", 1055), n.\u0275\u0275classProp("show", !i.animation)("fade", i.animation)); }, inputs: { animation: "animation", backdropClass: "backdropClass" }, decls: 0, vars: 0, template: function (t, i) { }, encapsulation: 2, changeDetection: 1 }); }
} return s; })(), v = class {
    update(a) { }
    close(a) { }
    dismiss(a) { }
}, F = class {
    update(a) { this._windowCmptRef.instance.updateOptions(a), this._backdropCmptRef && this._backdropCmptRef.instance && this._backdropCmptRef.instance.updateOptions(a); }
    get componentInstance() { if (this._contentRef && this._contentRef.componentRef)
        return this._contentRef.componentRef.instance; }
    get closed() { return this._closed.asObservable().pipe(u(this._hidden)); }
    get dismissed() { return this._dismissed.asObservable().pipe(u(this._hidden)); }
    get hidden() { return this._hidden.asObservable(); }
    get shown() { return this._windowCmptRef.instance.shown.asObservable(); }
    constructor(a, e, t, i) { this._windowCmptRef = a, this._contentRef = e, this._backdropCmptRef = t, this._beforeDismiss = i, this._closed = new f, this._dismissed = new f, this._hidden = new f, a.instance.dismissEvent.subscribe(o => { this.dismiss(o); }), this.result = new Promise((o, r) => { this._resolve = o, this._reject = r; }), this.result.then(null, () => { }); }
    close(a) { this._windowCmptRef && (this._closed.next(a), this._resolve(a), this._removeModalElements()); }
    _dismiss(a) { this._dismissed.next(a), this._reject(a), this._removeModalElements(); }
    dismiss(a) { if (this._windowCmptRef)
        if (!this._beforeDismiss)
            this._dismiss(a);
        else {
            let e = this._beforeDismiss();
            S(e) ? e.then(t => { t !== !1 && this._dismiss(a); }, () => { }) : e !== !1 && this._dismiss(a);
        } }
    _removeModalElements() { let a = this._windowCmptRef.instance.hide(), e = this._backdropCmptRef ? this._backdropCmptRef.instance.hide() : Q(void 0); a.subscribe(() => { let { nativeElement: t } = this._windowCmptRef.location; t.parentNode.removeChild(t), this._windowCmptRef.destroy(), this._contentRef?.viewRef?.destroy(), this._windowCmptRef = null, this._contentRef = null; }), e.subscribe(() => { if (this._backdropCmptRef) {
        let { nativeElement: t } = this._backdropCmptRef.location;
        t.parentNode.removeChild(t), this._backdropCmptRef.destroy(), this._backdropCmptRef = null;
    } }), D(a, e).subscribe(() => { this._hidden.next(), this._hidden.complete(); }); }
}, T = (function (s) { return s[s.BACKDROP_CLICK = 0] = "BACKDROP_CLICK", s[s.ESC = 1] = "ESC", s; })(T || {}), te = ["animation", "ariaLabelledBy", "ariaDescribedBy", "backdrop", "centered", "fullscreen", "keyboard", "role", "scrollable", "size", "windowClass", "modalDialogClass"], ie = (() => {
    class s {
        constructor() { this._document = c(N), this._elRef = c(z), this._zone = c(M), this._injector = c(b), this._cdRef = c(V), this._closed$ = new f, this._elWithFocus = null, this.backdrop = !0, this.keyboard = !0, this.role = "dialog", this.dismissEvent = new L, this.shown = new f, this.hidden = new f; }
        get fullscreenClass() { return this.fullscreen === !0 ? " modal-fullscreen" : k(this.fullscreen) ? ` modal-fullscreen-${this.fullscreen}-down` : ""; }
        dismiss(e) { this.dismissEvent.emit(e); }
        ngOnInit() { this._elWithFocus = this._document.activeElement, $({ mixedReadWrite: () => this._show() }, { injector: this._injector }); }
        ngOnDestroy() { this._disableEventHandling(); }
        hide() { let { nativeElement: e } = this._elRef, t = { animation: this.animation, runningTransition: "stop" }, i = d(this._zone, e, () => e.classList.remove("show"), t), o = d(this._zone, this._dialogEl.nativeElement, () => { }, t), r = D(i, o); return r.subscribe(() => { this.hidden.next(), this.hidden.complete(); }), this._disableEventHandling(), this._restoreFocus(), r; }
        updateOptions(e) { te.forEach(t => { w(e[t]) && (this[t] = e[t]); }), this._cdRef.markForCheck(); }
        _show() { let e = { animation: this.animation, runningTransition: "continue" }, t = d(this._zone, this._elRef.nativeElement, (o, r) => { r && y(o), o.classList.add("show"); }, e), i = d(this._zone, this._dialogEl.nativeElement, () => { }, e); D(t, i).subscribe(() => { this.shown.next(), this.shown.complete(); }), this._enableEventHandling(), this._setFocus(); }
        _enableEventHandling() { let { nativeElement: e } = this._elRef; this._zone.runOutsideAngular(() => { g(e, "keydown").pipe(u(this._closed$), W(i => i.key === "Escape")).subscribe(i => { this.keyboard ? requestAnimationFrame(() => { i.defaultPrevented || this._zone.run(() => this.dismiss(T.ESC)); }) : this.backdrop === "static" && this._bumpBackdrop(); }); let t = !1; g(this._dialogEl.nativeElement, "mousedown").pipe(u(this._closed$), U(() => t = !1), Z(() => g(e, "mouseup").pipe(u(this._closed$), P(1))), W(({ target: i }) => e === i)).subscribe(() => { t = !0; }), g(e, "click").pipe(u(this._closed$)).subscribe(({ target: i }) => { e === i && (this.backdrop === "static" ? this._bumpBackdrop() : this.backdrop === !0 && !t && this._zone.run(() => this.dismiss(T.BACKDROP_CLICK))), t = !1; }); }); }
        _disableEventHandling() { this._closed$.next(); }
        _setFocus() { let { nativeElement: e } = this._elRef; if (!e.contains(document.activeElement)) {
            let t = e.querySelector("[ngbAutofocus]"), i = O(e)[0];
            (t || i || e).focus();
        } }
        _restoreFocus() { let e = this._document.body, t = this._elWithFocus, i; t && t.focus && e.contains(t) ? i = t : i = e, this._zone.runOutsideAngular(() => { setTimeout(() => i.focus()), this._elWithFocus = null; }); }
        _bumpBackdrop() { this.backdrop === "static" && d(this._zone, this._elRef.nativeElement, ({ classList: e }) => (e.add("modal-static"), () => e.remove("modal-static")), { animation: this.animation, runningTransition: "continue" }); }
        static { this.\u0275fac = function (t) { return new (t || s); }; }
        static {
            this.\u0275cmp = n.\u0275\u0275defineComponent({ type: s, selectors: [["ngb-modal-window"]], viewQuery: function (t, i) { if (t & 1 && n.\u0275\u0275viewQuery(G, 7), t & 2) {
                    let o;
                    n.\u0275\u0275queryRefresh(o = n.\u0275\u0275loadQuery()) && (i._dialogEl = o.first);
                } }, hostAttrs: ["tabindex", "-1"], hostVars: 8, hostBindings: function (t, i) { t & 2 && (n.\u0275\u0275attribute("aria-modal", !0)("aria-labelledby", i.ariaLabelledBy)("aria-describedby", i.ariaDescribedBy)("role", i.role), n.\u0275\u0275classMap("modal d-block" + (i.windowClass ? " " + i.windowClass : "")), n.\u0275\u0275classProp("fade", i.animation)); }, inputs: { animation: "animation", ariaLabelledBy: "ariaLabelledBy", ariaDescribedBy: "ariaDescribedBy", backdrop: "backdrop", centered: "centered", fullscreen: "fullscreen", keyboard: "keyboard", role: "role", scrollable: "scrollable", size: "size", windowClass: "windowClass", modalDialogClass: "modalDialogClass" }, outputs: { dismissEvent: "dismiss" }, ngContentSelectors: J, decls: 4, vars: 2, consts: [["dialog", ""], ["role", "document"], [1, "modal-content"]], template: function (t, i) { t & 1 && (n.\u0275\u0275projectionDef(), n.\u0275\u0275domElementStart(0, "div", 1, 0)(2, "div", 2), n.\u0275\u0275projection(3), n.\u0275\u0275domElementEnd()()), t & 2 && n.\u0275\u0275classMap("modal-dialog" + (i.size ? " modal-" + i.size : "") + (i.centered ? " modal-dialog-centered" : "") + i.fullscreenClass + (i.scrollable ? " modal-dialog-scrollable" : "") + (i.modalDialogClass ? " " + i.modalDialogClass : "")); }, styles: [`ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}
`], encapsulation: 2, changeDetection: 1 });
        }
    }
    return s;
})(), se = (() => { class s {
    constructor() { this._applicationRef = c(x), this._injector = c(b), this._environmentInjector = c(H), this._document = c(N), this._scrollBar = c(A), this._activeWindowCmptHasChanged = new f, this._ariaHiddenValues = new Map, this._scrollBarRestoreFn = null, this._modalRefs = [], this._windowCmpts = [], this._activeInstances = new L; let e = c(M); this._activeWindowCmptHasChanged.subscribe(() => { if (this._windowCmpts.length) {
        let t = this._windowCmpts[this._windowCmpts.length - 1];
        I(e, t.location.nativeElement, this._activeWindowCmptHasChanged), this._revertAriaHidden(), this._setAriaHidden(t.location.nativeElement);
    } }); }
    _restoreScrollBar() { let e = this._scrollBarRestoreFn; e && (this._scrollBarRestoreFn = null, e()); }
    _hideScrollBar() { this._scrollBarRestoreFn || (this._scrollBarRestoreFn = this._scrollBar.hide()); }
    open(e, t, i) { let o = i.container instanceof HTMLElement ? i.container : w(i.container) ? this._document.querySelector(i.container) : this._document.body; if (!o)
        throw new Error(`The specified modal container "${i.container || "body"}" was not found in the DOM.`); this._hideScrollBar(); let r = new v; e = i.injector || e; let C = e.get(H, null) || this._environmentInjector, l = this._getContentRef(e, C, t, r, i), h = i.backdrop !== !1 ? this._attachBackdrop(o) : void 0, R = this._attachWindowComponent(o, l.nodes), m = new F(R, l, h, i.beforeDismiss); return this._registerModalRef(m), this._registerWindowCmpt(R), m.hidden.pipe(P(1)).subscribe(() => Promise.resolve(!0).then(() => { this._modalRefs.length || (this._document.body.classList.remove("modal-open"), this._restoreScrollBar(), this._revertAriaHidden()); })), r.close = _ => { m.close(_); }, r.dismiss = _ => { m.dismiss(_); }, r.update = _ => { m.update(_); }, m.update(i), this._modalRefs.length === 1 && this._document.body.classList.add("modal-open"), h && h.instance && h.changeDetectorRef.detectChanges(), R.changeDetectorRef.detectChanges(), m; }
    get activeInstances() { return this._activeInstances; }
    dismissAll(e) { this._modalRefs.forEach(t => t.dismiss(e)); }
    hasOpenModals() { return this._modalRefs.length > 0; }
    _attachBackdrop(e) { let t = B(ee, { environmentInjector: this._applicationRef.injector, elementInjector: this._injector }); return this._applicationRef.attachView(t.hostView), e.appendChild(t.location.nativeElement), t; }
    _attachWindowComponent(e, t) { let i = B(ie, { environmentInjector: this._applicationRef.injector, elementInjector: this._injector, projectableNodes: t }); return this._applicationRef.attachView(i.hostView), e.appendChild(i.location.nativeElement), i; }
    _getContentRef(e, t, i, o, r) { return i ? i instanceof K ? this._createFromTemplateRef(i, o) : k(i) ? this._createFromString(i) : this._createFromComponent(e, t, i, o, r) : new p([]); }
    _createFromTemplateRef(e, t) { let i = { $implicit: t, close(r) { t.close(r); }, dismiss(r) { t.dismiss(r); } }, o = e.createEmbeddedView(i); return this._applicationRef.attachView(o), new p([o.rootNodes], o); }
    _createFromString(e) { let t = this._document.createTextNode(`${e}`); return new p([[t]]); }
    _createFromComponent(e, t, i, o, r) { let C = b.create({ providers: [{ provide: v, useValue: o }], parent: e }), l = B(i, { environmentInjector: t, elementInjector: C }), h = l.location.nativeElement; return r.scrollable && h.classList.add("component-host-scrollable"), this._applicationRef.attachView(l.hostView), new p([[h]], l.hostView, l); }
    _setAriaHidden(e) { let t = e.parentElement; t && e !== this._document.body && (Array.from(t.children).forEach(i => { i !== e && i.nodeName !== "SCRIPT" && (this._ariaHiddenValues.set(i, i.getAttribute("aria-hidden")), i.setAttribute("aria-hidden", "true")); }), this._setAriaHidden(t)); }
    _revertAriaHidden() { this._ariaHiddenValues.forEach((e, t) => { e ? t.setAttribute("aria-hidden", e) : t.removeAttribute("aria-hidden"); }), this._ariaHiddenValues.clear(); }
    _registerModalRef(e) { let t = () => { let i = this._modalRefs.indexOf(e); i > -1 && (this._modalRefs.splice(i, 1), this._activeInstances.emit(this._modalRefs)); }; this._modalRefs.push(e), this._activeInstances.emit(this._modalRefs), e.result.then(t, t); }
    _registerWindowCmpt(e) { this._windowCmpts.push(e), this._activeWindowCmptHasChanged.next(), e.onDestroy(() => { let t = this._windowCmpts.indexOf(e); t > -1 && (this._windowCmpts.splice(t, 1), this._activeWindowCmptHasChanged.next()); }); }
    static { this.\u0275fac = function (t) { return new (t || s); }; }
    static { this.\u0275prov = n.\u0275\u0275defineService({ token: s, factory: s.\u0275fac }); }
} return s; })(), ne = (() => { class s {
    constructor() { this._injector = c(b), this._modalStack = c(se), this._config = c(X); }
    open(e, t = {}) { let i = E(j(E({}, this._config), { animation: this._config.animation }), t); return this._modalStack.open(this._injector, e, i); }
    get activeInstances() { return this._modalStack.activeInstances; }
    dismissAll(e) { this._modalStack.dismissAll(e); }
    hasOpenModals() { return this._modalStack.hasOpenModals(); }
    static { this.\u0275fac = function (t) { return new (t || s); }; }
    static { this.\u0275prov = n.\u0275\u0275defineService({ token: s, factory: s.\u0275fac }); }
} return s; })(), we = (() => { class s {
    static { this.\u0275fac = function (t) { return new (t || s); }; }
    static { this.\u0275mod = n.\u0275\u0275defineNgModule({ type: s }); }
    static { this.\u0275inj = n.\u0275\u0275defineInjector({ providers: [ne] }); }
} return s; })();
export { T as ModalDismissReasons, v as NgbActiveModal, ne as NgbModal, X as NgbModalConfig, we as NgbModalModule, F as NgbModalRef };
