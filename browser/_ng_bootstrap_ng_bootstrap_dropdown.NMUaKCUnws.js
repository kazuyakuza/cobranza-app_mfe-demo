import { a as c, n as u, r as _, s as f, v as g } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as o from "@angular/core";
import { inject as d, ElementRef as l, forwardRef as C, ChangeDetectorRef as v, DOCUMENT as E, Injector as H, NgZone as k, EventEmitter as M, afterNextRender as N, afterEveryRender as B } from "@angular/core";
import { Subject as A, fromEvent as m } from "rxjs";
import { take as w } from "rxjs/operators";
var O = (() => { class i {
    constructor() { this.autoClose = !0, this.placement = ["bottom-start", "bottom-end", "top-start", "top-end"], this.popperOptions = e => e, this.container = null; }
    static { this.\u0275fac = function (n) { return new (n || i); }; }
    static { this.\u0275prov = o.\u0275\u0275defineService({ token: i, factory: i.\u0275fac }); }
} return i; })(), y = (() => { class i {
    constructor() { this._disabled = !1, this.nativeElement = d(l).nativeElement, this.tabindex = 0; }
    set disabled(e) { this._disabled = e === "" || e === !0; }
    get disabled() { return this._disabled; }
    static { this.\u0275fac = function (n) { return new (n || i); }; }
    static { this.\u0275dir = o.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbDropdownItem", ""]], hostAttrs: [1, "dropdown-item"], hostVars: 3, hostBindings: function (n, t) { n & 2 && (o.\u0275\u0275domProperty("tabIndex", t.disabled ? -1 : t.tabindex), o.\u0275\u0275classProp("disabled", t.disabled)); }, inputs: { tabindex: "tabindex", disabled: "disabled" } }); }
} return i; })(), q = (() => { class i {
    constructor() { this.item = d(y); }
    static { this.\u0275fac = function (n) { return new (n || i); }; }
    static { this.\u0275dir = o.\u0275\u0275defineDirective({ type: i, selectors: [["button", "ngbDropdownItem", ""]], hostVars: 1, hostBindings: function (n, t) { n & 2 && o.\u0275\u0275domProperty("disabled", t.item.disabled); } }); }
} return i; })(), T = (() => { class i {
    constructor() { this.dropdown = d(b), this.nativeElement = d(l).nativeElement; }
    static { this.\u0275fac = function (n) { return new (n || i); }; }
    static { this.\u0275dir = o.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbDropdownMenu", ""]], contentQueries: function (n, t, r) { if (n & 1 && o.\u0275\u0275contentQuery(r, y, 4), n & 2) {
            let s;
            o.\u0275\u0275queryRefresh(s = o.\u0275\u0275loadQuery()) && (t.menuItems = s);
        } }, hostAttrs: [1, "dropdown-menu"], hostVars: 2, hostBindings: function (n, t) { n & 1 && o.\u0275\u0275listener("keydown.ArrowUp", function (s) { return t.dropdown.onKeyDown(s); })("keydown.ArrowDown", function (s) { return t.dropdown.onKeyDown(s); })("keydown.Home", function (s) { return t.dropdown.onKeyDown(s); })("keydown.End", function (s) { return t.dropdown.onKeyDown(s); })("keydown.Enter", function (s) { return t.dropdown.onKeyDown(s); })("keydown.Space", function (s) { return t.dropdown.onKeyDown(s); })("keydown.Tab", function (s) { return t.dropdown.onKeyDown(s); })("keydown.Shift.Tab", function (s) { return t.dropdown.onKeyDown(s); }), n & 2 && o.\u0275\u0275classProp("show", t.dropdown.isOpen()); } }); }
} return i; })(), p = (() => { class i {
    constructor() { this.dropdown = d(b), this.nativeElement = d(l).nativeElement; }
    static { this.\u0275fac = function (n) { return new (n || i); }; }
    static { this.\u0275dir = o.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbDropdownAnchor", ""]], hostAttrs: [1, "dropdown-toggle"], hostVars: 3, hostBindings: function (n, t) { n & 2 && (o.\u0275\u0275attribute("aria-expanded", t.dropdown.isOpen()), o.\u0275\u0275classProp("show", t.dropdown.isOpen())); } }); }
} return i; })(), Z = (() => { class i extends p {
    static { this.\u0275fac = (() => { let e; return function (t) { return (e || (e = o.\u0275\u0275getInheritedFactory(i)))(t || i); }; })(); }
    static { this.\u0275dir = o.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbDropdownToggle", ""]], hostAttrs: [1, "dropdown-toggle"], hostVars: 3, hostBindings: function (n, t) { n & 1 && o.\u0275\u0275listener("click", function () { return t.dropdown.toggle(); })("keydown.ArrowUp", function (s) { return t.dropdown.onKeyDown(s); })("keydown.ArrowDown", function (s) { return t.dropdown.onKeyDown(s); })("keydown.Home", function (s) { return t.dropdown.onKeyDown(s); })("keydown.End", function (s) { return t.dropdown.onKeyDown(s); })("keydown.Tab", function (s) { return t.dropdown.onKeyDown(s); })("keydown.Shift.Tab", function (s) { return t.dropdown.onKeyDown(s); }), n & 2 && (o.\u0275\u0275attribute("aria-expanded", t.dropdown.isOpen()), o.\u0275\u0275classProp("show", t.dropdown.isOpen())); }, features: [o.\u0275\u0275ProvidersFeature([{ provide: p, useExisting: C(() => i) }]), o.\u0275\u0275InheritDefinitionFeature] }); }
} return i; })(), b = (() => { class i {
    constructor() { this._changeDetector = d(v), this._config = d(O), this._document = d(E), this._injector = d(H), this._ngZone = d(k), this._nativeElement = d(l).nativeElement, this._destroyCloseHandlers$ = new A, this._bodyContainer = null, this._positioning = c(), this.autoClose = this._config.autoClose, this._open = !1, this.placement = this._config.placement, this.popperOptions = this._config.popperOptions, this.container = this._config.container, this.openChange = new M; }
    ngOnInit() { this.display || (this.display = this._nativeElement.closest(".navbar") ? "static" : "dynamic"); }
    ngAfterContentInit() { N({ write: () => { this._applyPlacementClasses(), this._open && this._setCloseHandlers(); } }, { injector: this._injector }); }
    ngOnChanges(e) { if (e.container && this._open && this._applyContainer(this.container), e.placement && !e.placement.firstChange && (this._positioning.setOptions({ hostElement: this._anchor.nativeElement, targetElement: this._bodyContainer || this._menu.nativeElement, placement: this.placement }), this._applyPlacementClasses()), e.dropdownClass) {
        let { currentValue: n, previousValue: t } = e.dropdownClass;
        this._applyCustomDropdownClass(n, t);
    } e.autoClose && this._open && (this.autoClose = e.autoClose.currentValue, this._setCloseHandlers()); }
    isOpen() { return this._open; }
    open() { this._open || (this._open = !0, this._applyContainer(this.container), this.openChange.emit(!0), this._setCloseHandlers(), this._anchor && (this._anchor.nativeElement.focus(), this.display === "dynamic" && this._ngZone.runOutsideAngular(() => { this._positioning.createPopper({ hostElement: this._anchor.nativeElement, targetElement: this._bodyContainer || this._menu.nativeElement, placement: this.placement, updatePopperOptions: e => this.popperOptions(g([0, 2])(e)) }), this._applyPlacementClasses(), this._afterRenderRef = B({ write: () => { this._positionMenu(); } }, { injector: this._injector }); })), this._changeDetector.markForCheck()); }
    _setCloseHandlers() { this._destroyCloseHandlers$.next(), _(this._ngZone, this._document, this.autoClose, e => { this.close(), e === 0 && this._anchor.nativeElement.focus(); }, this._destroyCloseHandlers$, this._menu ? [this._menu.nativeElement] : [], this._anchor ? [this._anchor.nativeElement] : [], ".dropdown-item,.dropdown-divider"); }
    close() { this._open && (this._open = !1, this._resetContainer(), this._positioning.destroy(), this._afterRenderRef?.destroy(), this._destroyCloseHandlers$.next(), this.openChange.emit(!1), this._changeDetector.markForCheck()); }
    toggle() { this.isOpen() ? this.close() : this.open(); }
    ngOnDestroy() { this.close(); }
    onKeyDown(e) { let { key: n } = e, t = this._getMenuElements(), r = -1, s = null, h = this._isEventFromToggle(e); if (!h && t.length && t.forEach((a, D) => { a.contains(e.target) && (s = a), a === u(this._document) && (r = D); }), n === " " || n === "Enter") {
        s && (this.autoClose === !0 || this.autoClose === "inside") && m(s, "click").pipe(w(1)).subscribe(() => this.close());
        return;
    } if (n === "Tab") {
        if (e.target && this.isOpen() && this.autoClose)
            if (this._anchor.nativeElement === e.target) {
                this.container === "body" && !e.shiftKey ? (this._menu.nativeElement.setAttribute("tabindex", "0"), this._menu.nativeElement.focus(), this._menu.nativeElement.removeAttribute("tabindex")) : e.shiftKey && this.close();
                return;
            }
            else if (this.container === "body") {
                let a = this._menu.nativeElement.querySelectorAll(f);
                e.shiftKey && e.target === a[0] ? (this._anchor.nativeElement.focus(), e.preventDefault()) : !e.shiftKey && e.target === a[a.length - 1] && (this._anchor.nativeElement.focus(), this.close());
            }
            else
                m(e.target, "focusout").pipe(w(1)).subscribe(({ relatedTarget: a }) => { this._nativeElement.contains(a) || this.close(); });
        return;
    } if (h || s) {
        if (this.open(), t.length) {
            switch (n) {
                case "ArrowDown":
                    r = Math.min(r + 1, t.length - 1);
                    break;
                case "ArrowUp":
                    if (this._isDropup() && r === -1) {
                        r = t.length - 1;
                        break;
                    }
                    r = Math.max(r - 1, 0);
                    break;
                case "Home":
                    r = 0;
                    break;
                case "End":
                    r = t.length - 1;
                    break;
            }
            t[r].focus();
        }
        e.preventDefault();
    } }
    _isDropup() { return this._nativeElement.classList.contains("dropup"); }
    _isEventFromToggle(e) { return this._anchor.nativeElement.contains(e.target); }
    _getMenuElements() { return this._menu ? this._menu.menuItems.filter(({ disabled: e }) => !e).map(({ nativeElement: e }) => e) : []; }
    _positionMenu() { let e = this._menu; this.isOpen() && e && (this.display === "dynamic" ? (this._positioning.update(), this._applyPlacementClasses()) : this._applyPlacementClasses(this._getFirstPlacement(this.placement))); }
    _getFirstPlacement(e) { return Array.isArray(e) ? e[0] : e.split(" ")[0]; }
    _resetContainer() { this._menu && this._nativeElement.appendChild(this._menu.nativeElement), this._bodyContainer && (this._document.body.removeChild(this._bodyContainer), this._bodyContainer = null); }
    _applyContainer(e = null) { if (this._resetContainer(), e === "body") {
        let n = this._menu.nativeElement, t = this._bodyContainer = this._bodyContainer || this._document.createElement("div");
        t.style.position = "absolute", n.style.position = "static", t.style.zIndex = "1055", t.appendChild(n), this._document.body.appendChild(t);
    } this._applyCustomDropdownClass(this.dropdownClass); }
    _applyCustomDropdownClass(e, n) { let t = this.container === "body" ? this._bodyContainer : this._nativeElement; t && (n && t.classList.remove(n), e && t.classList.add(e)); }
    _applyPlacementClasses(e) { if (this._menu) {
        e || (e = this._getFirstPlacement(this.placement)), this._nativeElement.classList.remove("dropup", "dropdown"), this.display === "static" ? this._menu.nativeElement.setAttribute("data-bs-popper", "static") : this._menu.nativeElement.removeAttribute("data-bs-popper");
        let n = e.search("^top") !== -1 ? "dropup" : "dropdown";
        this._nativeElement.classList.add(n), this._bodyContainer && (this._bodyContainer.classList.remove("dropup", "dropdown"), this._bodyContainer.classList.add(n));
    } }
    static { this.\u0275fac = function (n) { return new (n || i); }; }
    static { this.\u0275dir = o.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbDropdown", ""]], contentQueries: function (n, t, r) { if (n & 1 && o.\u0275\u0275contentQuery(r, T, 5)(r, p, 5), n & 2) {
            let s;
            o.\u0275\u0275queryRefresh(s = o.\u0275\u0275loadQuery()) && (t._menu = s.first), o.\u0275\u0275queryRefresh(s = o.\u0275\u0275loadQuery()) && (t._anchor = s.first);
        } }, hostVars: 2, hostBindings: function (n, t) { n & 2 && o.\u0275\u0275classProp("show", t.isOpen()); }, inputs: { autoClose: "autoClose", dropdownClass: "dropdownClass", _open: [0, "open", "_open"], placement: "placement", popperOptions: "popperOptions", container: "container", display: "display" }, outputs: { openChange: "openChange" }, exportAs: ["ngbDropdown"], features: [o.\u0275\u0275NgOnChangesFeature] }); }
} return i; })();
var $ = (() => { class i {
    static { this.\u0275fac = function (n) { return new (n || i); }; }
    static { this.\u0275mod = o.\u0275\u0275defineNgModule({ type: i }); }
    static { this.\u0275inj = o.\u0275\u0275defineInjector({}); }
} return i; })();
export { b as NgbDropdown, p as NgbDropdownAnchor, q as NgbDropdownButtonItem, O as NgbDropdownConfig, y as NgbDropdownItem, T as NgbDropdownMenu, $ as NgbDropdownModule, Z as NgbDropdownToggle };
