import { A as b, a as _, c as l, h as f, k as m, m as c, r as g, v as w, x as v } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as t from "@angular/core";
import { EventEmitter as u, inject as h, ElementRef as x, DOCUMENT as I, NgZone as T, ChangeDetectorRef as E, Injector as F, afterEveryRender as R, forwardRef as O } from "@angular/core";
import { NG_VALUE_ACCESSOR as D } from "@angular/forms";
import { Subject as P, fromEvent as S, BehaviorSubject as V, of as k } from "rxjs";
import { map as H, tap as N, switchMap as $ } from "rxjs/operators";
import { NgTemplateOutlet as B } from "@angular/common";
function A(n, o) { if (n & 1 && (t.\u0275\u0275domElementStart(0, "span"), t.\u0275\u0275text(1), t.\u0275\u0275domElementEnd()), n & 2) {
    let e = t.\u0275\u0275nextContext().$implicit, i = t.\u0275\u0275nextContext();
    t.\u0275\u0275classMap(i.highlightClass), t.\u0275\u0275advance(), t.\u0275\u0275textInterpolate(e);
} }
function M(n, o) { if (n & 1 && (t.\u0275\u0275domElementContainerStart(0), t.\u0275\u0275text(1), t.\u0275\u0275domElementContainerEnd()), n & 2) {
    let e = t.\u0275\u0275nextContext().$implicit;
    t.\u0275\u0275advance(), t.\u0275\u0275textInterpolate(e);
} }
function W(n, o) { if (n & 1 && t.\u0275\u0275conditionalCreate(0, A, 2, 3, "span", 0)(1, M, 2, 1, "ng-container"), n & 2) {
    let e = o.$index;
    t.\u0275\u0275conditional(e % 2 !== 0 ? 0 : 1);
} }
var j = (n, o, e) => ({ result: n, term: o, formatter: e });
function U(n, o) { if (n & 1 && t.\u0275\u0275element(0, "ngb-highlight", 2), n & 2) {
    let e = o.result, i = o.term, s = o.formatter;
    t.\u0275\u0275property("result", s(e))("term", i);
} }
function L(n, o) { }
function z(n, o) { if (n & 1) {
    let e = t.\u0275\u0275getCurrentView();
    t.\u0275\u0275elementStart(0, "button", 3), t.\u0275\u0275listener("mouseenter", function () { let s = t.\u0275\u0275restoreView(e).$index, a = t.\u0275\u0275nextContext(); return t.\u0275\u0275resetView(a.markActive(s)); })("click", function () { let s = t.\u0275\u0275restoreView(e).$implicit, a = t.\u0275\u0275nextContext(); return t.\u0275\u0275resetView(a.select(s)); }), t.\u0275\u0275template(1, L, 0, 0, "ng-template", 4), t.\u0275\u0275elementEnd();
} if (n & 2) {
    let e = o.$implicit, i = o.$index, s = t.\u0275\u0275nextContext(), a = t.\u0275\u0275reference(1);
    t.\u0275\u0275classProp("active", i === s.activeIdx), t.\u0275\u0275property("id", s.id + "-" + i), t.\u0275\u0275advance(), t.\u0275\u0275property("ngTemplateOutlet", s.resultTemplate || a)("ngTemplateOutletContext", t.\u0275\u0275pureFunction3(5, j, e, s.term, s.formatter));
} }
var Z = (() => {
    class n {
        constructor() { this.highlightClass = "ngb-highlight", this.accentSensitive = !0; }
        ngOnChanges(e) { !this.accentSensitive && !String.prototype.normalize && (console.warn("The `accentSensitive` input in `ngb-highlight` cannot be set to `false` in a browser that does not implement the `String.normalize` function. You will have to include a polyfill in your application to use this feature in the current browser."), this.accentSensitive = !0); let i = l(this.result), s = Array.isArray(this.term) ? this.term : [this.term], a = r => this.accentSensitive ? r : c(r), p = s.map(r => m(a(l(r)))).filter(r => r), y = this.accentSensitive ? i : c(i), d = p.length ? y.split(new RegExp(`(${p.join("|")})`, "gmi")) : [i]; if (this.accentSensitive)
            this.parts = d;
        else {
            let r = 0;
            this.parts = d.map(C => i.substring(r, r += C.length));
        } }
        static { this.\u0275fac = function (i) { return new (i || n); }; }
        static {
            this.\u0275cmp = t.\u0275\u0275defineComponent({ type: n, selectors: [["ngb-highlight"]], inputs: { highlightClass: "highlightClass", result: "result", term: "term", accentSensitive: "accentSensitive" }, features: [t.\u0275\u0275NgOnChangesFeature], decls: 2, vars: 0, consts: [[3, "class"]], template: function (i, s) { i & 1 && t.\u0275\u0275repeaterCreate(0, W, 2, 1, null, null, t.\u0275\u0275repeaterTrackByIndex), i & 2 && t.\u0275\u0275repeater(s.parts); }, styles: [`.ngb-highlight{font-weight:700}
`], encapsulation: 2 });
        }
    }
    return n;
})(), K = (() => { class n {
    constructor() { this.editable = !0, this.focusFirst = !0, this.selectOnExact = !1, this.showHint = !1, this.placement = ["bottom-start", "bottom-end", "top-start", "top-end"], this.popperOptions = e => e; }
    static { this.\u0275fac = function (i) { return new (i || n); }; }
    static { this.\u0275prov = t.\u0275\u0275defineService({ token: n, factory: n.\u0275fac }); }
} return n; })(), G = (() => { class n {
    constructor() { this.activeIdx = 0, this.focusFirst = !0, this.formatter = l, this.selectEvent = new u, this.activeChangeEvent = new u; }
    hasActive() { return this.activeIdx > -1 && this.activeIdx < this.results.length; }
    getActive() { return this.results[this.activeIdx]; }
    markActive(e) { this.activeIdx = e, this._activeChanged(); }
    next() { this.activeIdx === this.results.length - 1 ? this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1 : this.activeIdx++, this._activeChanged(); }
    prev() { this.activeIdx < 0 ? this.activeIdx = this.results.length - 1 : this.activeIdx === 0 ? this.activeIdx = this.focusFirst ? this.results.length - 1 : -1 : this.activeIdx--, this._activeChanged(); }
    resetActive() { this.activeIdx = this.focusFirst ? 0 : -1, this._activeChanged(); }
    select(e) { this.selectEvent.emit(e); }
    ngOnInit() { this.resetActive(); }
    _activeChanged() { this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + "-" + this.activeIdx : void 0); }
    static { this.\u0275fac = function (i) { return new (i || n); }; }
    static { this.\u0275cmp = t.\u0275\u0275defineComponent({ type: n, selectors: [["ngb-typeahead-window"]], hostAttrs: ["role", "listbox"], hostVars: 3, hostBindings: function (i, s) { i & 1 && t.\u0275\u0275listener("mousedown", function (p) { return p.preventDefault(); }), i & 2 && (t.\u0275\u0275domProperty("id", s.id), t.\u0275\u0275classMap("dropdown-menu show" + (s.popupClass ? " " + s.popupClass : ""))); }, inputs: { id: "id", focusFirst: "focusFirst", results: "results", term: "term", formatter: "formatter", resultTemplate: "resultTemplate", popupClass: "popupClass" }, outputs: { selectEvent: "select", activeChangeEvent: "activeChange" }, exportAs: ["ngbTypeaheadWindow"], decls: 4, vars: 0, consts: [["rt", ""], ["type", "button", "role", "option", 1, "dropdown-item", 3, "id", "active"], [3, "result", "term"], ["type", "button", "role", "option", 1, "dropdown-item", 3, "mouseenter", "click", "id"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function (i, s) { i & 1 && (t.\u0275\u0275template(0, U, 1, 2, "ng-template", null, 0, t.\u0275\u0275templateRefExtractor), t.\u0275\u0275repeaterCreate(2, z, 2, 9, "button", 1, t.\u0275\u0275repeaterTrackByIndex)), i & 2 && (t.\u0275\u0275advance(2), t.\u0275\u0275repeater(s.results)); }, dependencies: [Z, B], encapsulation: 2, changeDetection: 1 }); }
} return n; })(), Y = 0, lt = (() => { class n {
    constructor() { this._nativeElement = h(x).nativeElement, this._config = h(K), this._live = h(b), this._document = h(I), this._ngZone = h(T), this._changeDetector = h(E), this._injector = h(F), this._popupService = new v(G), this._positioning = _(), this._subscription = null, this._closed$ = new P, this._inputValueBackup = null, this._inputValueForSelectOnExact = null, this._valueChanges$ = S(this._nativeElement, "input").pipe(H(e => e.target.value)), this._resubscribeTypeahead$ = new V(null), this._windowRef = null, this.autocomplete = "off", this.container = this._config.container, this.editable = this._config.editable, this.focusFirst = this._config.focusFirst, this.selectOnExact = this._config.selectOnExact, this.showHint = this._config.showHint, this.placement = this._config.placement, this.popperOptions = this._config.popperOptions, this.selectItem = new u, this.activeDescendant = null, this.popupId = `ngb-typeahead-${Y++}`, this._onTouched = () => { }, this._onChange = e => { }; }
    ngOnInit() { this._subscribeToUserInput(); }
    ngOnChanges({ ngbTypeahead: e }) { e && !e.firstChange && (this._unsubscribeFromUserInput(), this._subscribeToUserInput()); }
    ngOnDestroy() { this._closePopup(), this._unsubscribeFromUserInput(); }
    registerOnChange(e) { this._onChange = e; }
    registerOnTouched(e) { this._onTouched = e; }
    writeValue(e) { this._writeInputValue(this._formatItemForInput(e)), this.showHint && (this._inputValueBackup = e); }
    setDisabledState(e) { this._nativeElement.disabled = e; }
    dismissPopup() { this.isPopupOpen() && (this._resubscribeTypeahead$.next(null), this._closePopup(), this.showHint && this._inputValueBackup !== null && this._writeInputValue(this._inputValueBackup), this._changeDetector.markForCheck()); }
    isPopupOpen() { return this._windowRef != null; }
    handleBlur() { this._resubscribeTypeahead$.next(null), this._onTouched(); }
    handleKeyDown(e) { if (this.isPopupOpen())
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault(), this._windowRef.instance.next(), this._showHint();
                break;
            case "ArrowUp":
                e.preventDefault(), this._windowRef.instance.prev(), this._showHint();
                break;
            case "Enter":
            case "Tab": {
                let i = this._windowRef.instance.getActive();
                f(i) && (e.preventDefault(), e.stopPropagation(), this._selectResult(i)), this._closePopup();
                break;
            }
        } }
    _openPopup() { if (!this.isPopupOpen()) {
        this._inputValueBackup = this._nativeElement.value;
        let { windowRef: e } = this._popupService.open();
        this._windowRef = e, this._windowRef.setInput("id", this.popupId), this._windowRef.setInput("popupClass", this.popupClass), this._windowRef.instance.selectEvent.subscribe(i => this._selectResultClosePopup(i)), this._windowRef.instance.activeChangeEvent.subscribe(i => this.activeDescendant = i), this.container === "body" && (this._windowRef.location.nativeElement.style.zIndex = "1055", this._document.body.appendChild(this._windowRef.location.nativeElement)), this._changeDetector.markForCheck(), this._ngZone.runOutsideAngular(() => { this._windowRef && (this._positioning.createPopper({ hostElement: this._nativeElement, targetElement: this._windowRef.location.nativeElement, placement: this.placement, updatePopperOptions: i => this.popperOptions(w([0, 2])(i)) }), this._afterRenderRef = R({ mixedReadWrite: () => { this._positioning.update(); } }, { injector: this._injector })); }), g(this._ngZone, this._document, "outside", () => this.dismissPopup(), this._closed$, [this._nativeElement, this._windowRef.location.nativeElement]);
    } }
    _closePopup() { this._popupService.close().subscribe(() => { this._positioning.destroy(), this._afterRenderRef?.destroy(), this._closed$.next(), this._windowRef = null, this.activeDescendant = null; }); }
    _selectResult(e) { let i = !1; this.selectItem.emit({ item: e, preventDefault: () => { i = !0; } }), this._resubscribeTypeahead$.next(null), i || (this.writeValue(e), this._onChange(e)); }
    _selectResultClosePopup(e) { this._selectResult(e), this._closePopup(); }
    _showHint() { if (this.showHint && this._windowRef?.instance.hasActive() && this._inputValueBackup != null) {
        let e = this._inputValueBackup.toLowerCase(), i = this._formatItemForInput(this._windowRef.instance.getActive());
        e === i.substring(0, this._inputValueBackup.length).toLowerCase() ? (this._writeInputValue(this._inputValueBackup + i.substring(this._inputValueBackup.length)), this._nativeElement.setSelectionRange.apply(this._nativeElement, [this._inputValueBackup.length, i.length])) : this._writeInputValue(i);
    } }
    _formatItemForInput(e) { return e != null && this.inputFormatter ? this.inputFormatter(e) : l(e); }
    _writeInputValue(e) { this._nativeElement.value = l(e); }
    _subscribeToUserInput() { let e = this._valueChanges$.pipe(N(i => { this._inputValueBackup = this.showHint ? i : null, this._inputValueForSelectOnExact = this.selectOnExact ? i : null, this._onChange(this.editable ? i : null); }), this.ngbTypeahead ? this.ngbTypeahead : () => k([])); this._subscription = this._resubscribeTypeahead$.pipe($(() => e)).subscribe(i => { !i || i.length === 0 ? this._closePopup() : this.selectOnExact && i.length === 1 && this._formatItemForInput(i[0]) === this._inputValueForSelectOnExact ? (this._selectResult(i[0]), this._closePopup()) : (this._openPopup(), this._windowRef.setInput("focusFirst", this.focusFirst), this._windowRef.setInput("results", i), this._windowRef.setInput("term", this._nativeElement.value), this.resultFormatter && this._windowRef.setInput("formatter", this.resultFormatter), this.resultTemplate && this._windowRef.setInput("resultTemplate", this.resultTemplate), this._windowRef.instance.resetActive(), this._windowRef.changeDetectorRef.detectChanges(), this._showHint()); let s = i ? i.length : 0; this._live.say(s === 0 ? "No results available" : `${s} result${s === 1 ? "" : "s"} available`); }); }
    _unsubscribeFromUserInput() { this._subscription && this._subscription.unsubscribe(), this._subscription = null; }
    static { this.\u0275fac = function (i) { return new (i || n); }; }
    static { this.\u0275dir = t.\u0275\u0275defineDirective({ type: n, selectors: [["input", "ngbTypeahead", ""]], hostAttrs: ["autocapitalize", "off", "autocorrect", "off", "role", "combobox"], hostVars: 7, hostBindings: function (i, s) { i & 1 && t.\u0275\u0275listener("blur", function () { return s.handleBlur(); })("keydown", function (p) { return s.handleKeyDown(p); }), i & 2 && (t.\u0275\u0275domProperty("autocomplete", s.autocomplete), t.\u0275\u0275attribute("aria-autocomplete", s.showHint ? "both" : "list")("aria-activedescendant", s.activeDescendant)("aria-controls", s.isPopupOpen() ? s.popupId : null)("aria-expanded", s.isPopupOpen()), t.\u0275\u0275classProp("open", s.isPopupOpen())); }, inputs: { autocomplete: "autocomplete", container: "container", editable: "editable", focusFirst: "focusFirst", inputFormatter: "inputFormatter", ngbTypeahead: "ngbTypeahead", resultFormatter: "resultFormatter", resultTemplate: "resultTemplate", selectOnExact: "selectOnExact", showHint: "showHint", placement: "placement", popperOptions: "popperOptions", popupClass: "popupClass" }, outputs: { selectItem: "selectItem" }, exportAs: ["ngbTypeahead"], features: [t.\u0275\u0275ProvidersFeature([{ provide: D, useExisting: O(() => n), multi: !0 }]), t.\u0275\u0275NgOnChangesFeature] }); }
} return n; })(), ct = (() => { class n {
    static { this.\u0275fac = function (i) { return new (i || n); }; }
    static { this.\u0275mod = t.\u0275\u0275defineNgModule({ type: n }); }
    static { this.\u0275inj = t.\u0275\u0275defineInjector({}); }
} return n; })();
export { Z as NgbHighlight, lt as NgbTypeahead, K as NgbTypeaheadConfig, ct as NgbTypeaheadModule };
