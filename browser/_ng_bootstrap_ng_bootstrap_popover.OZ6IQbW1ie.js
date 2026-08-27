import { a as l, e as h, p as a, r as c, v as d, x as g, z as u } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as e from "@angular/core";
import { inject as s, TemplateRef as m, EventEmitter as _, ElementRef as v, NgZone as w, DOCUMENT as b, ChangeDetectorRef as C, Injector as P, afterEveryRender as y } from "@angular/core";
import { NgTemplateOutlet as R } from "@angular/common";
import { NgbConfig as D } from "@ng-bootstrap/ng-bootstrap/config";
import { Subject as f } from "rxjs";
var T = ["*"];
function E(t, p) { if (t & 1 && e.\u0275\u0275text(0), t & 2) {
    let o = e.\u0275\u0275nextContext(2);
    e.\u0275\u0275textInterpolate(o.title);
} }
function O(t, p) { }
function x(t, p) { if (t & 1 && (e.\u0275\u0275elementStart(0, "h3", 2), e.\u0275\u0275template(1, E, 1, 1, "ng-template", null, 0, e.\u0275\u0275templateRefExtractor)(3, O, 0, 0, "ng-template", 4), e.\u0275\u0275elementEnd()), t & 2) {
    let o = e.\u0275\u0275reference(2), i = e.\u0275\u0275nextContext();
    e.\u0275\u0275advance(3), e.\u0275\u0275property("ngTemplateOutlet", i.isTitleTemplate() ? i.title : o)("ngTemplateOutletContext", i.context);
} }
var M = (() => { class t {
    constructor() { this._ngbConfig = s(D), this.autoClose = !0, this.placement = "auto", this.popperOptions = o => o, this.triggers = "click", this.disablePopover = !1, this.openDelay = 0, this.closeDelay = 0; }
    get animation() { return this._animation ?? this._ngbConfig.animation; }
    set animation(o) { this._animation = o; }
    static { this.\u0275fac = function (i) { return new (i || t); }; }
    static { this.\u0275prov = e.\u0275\u0275defineService({ token: t, factory: t.\u0275fac }); }
} return t; })(), I = 0, N = (() => { class t {
    isTitleTemplate() { return this.title instanceof m; }
    static { this.\u0275fac = function (i) { return new (i || t); }; }
    static { this.\u0275cmp = e.\u0275\u0275defineComponent({ type: t, selectors: [["ngb-popover-window"]], hostAttrs: ["role", "tooltip"], hostVars: 7, hostBindings: function (i, n) { i & 1 && e.\u0275\u0275listener("mouseenter", function () { return n.onMouseEnter(); })("mouseleave", function () { return n.onMouseLeave(); }), i & 2 && (e.\u0275\u0275domProperty("id", n.id), e.\u0275\u0275classMap("popover" + (n.popoverClass ? " " + n.popoverClass : "")), e.\u0275\u0275styleProp("position", "absolute"), e.\u0275\u0275classProp("fade", n.animation)); }, inputs: { animation: "animation", title: "title", id: "id", popoverClass: "popoverClass", context: "context", onMouseEnter: "onMouseEnter", onMouseLeave: "onMouseLeave" }, ngContentSelectors: T, decls: 4, vars: 1, consts: [["simpleTitle", ""], ["data-popper-arrow", "", 1, "popover-arrow"], [1, "popover-header"], [1, "popover-body"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function (i, n) { i & 1 && (e.\u0275\u0275projectionDef(), e.\u0275\u0275element(0, "div", 1), e.\u0275\u0275conditionalCreate(1, x, 4, 2, "h3", 2), e.\u0275\u0275elementStart(2, "div", 3), e.\u0275\u0275projection(3), e.\u0275\u0275elementEnd()), i & 2 && (e.\u0275\u0275advance(), e.\u0275\u0275conditional(n.title ? 1 : -1)); }, dependencies: [R], encapsulation: 2 }); }
} return t; })(), q = (() => { class t {
    constructor() { this._config = s(M), this.animation = this._config.animation, this.autoClose = this._config.autoClose, this.placement = this._config.placement, this.popperOptions = this._config.popperOptions, this.triggers = this._config.triggers, this.container = this._config.container, this.disablePopover = this._config.disablePopover, this.popoverClass = this._config.popoverClass, this.openDelay = this._config.openDelay, this.closeDelay = this._config.closeDelay, this.shown = new _, this.hidden = new _, this._nativeElement = s(v).nativeElement, this._ngZone = s(w), this._document = s(b), this._changeDetector = s(C), this._injector = s(P), this._ngbPopoverWindowId = `ngb-popover-${I++}`, this._popupService = new g(N), this._windowRef = null, this._positioning = l(), this._mouseEnterPopover = new f, this._mouseLeavePopover = new f, this._opening = !0, this._transitioning = !1; }
    open(o) { if (!this._opening && this._transitioning && (this._transitioning = !1, a(this._windowRef.location.nativeElement)), !this._windowRef && !this._isDisabled()) {
        let { windowRef: i, transition$: n } = this._popupService.open(this.ngbPopover, o ?? this.popoverContext, this.animation);
        this._opening = !0, this._transitioning = !0, this._windowRef = i, this._windowRef.setInput("animation", this.animation), this._windowRef.setInput("title", this.popoverTitle), this._windowRef.setInput("context", o ?? this.popoverContext), this._windowRef.setInput("popoverClass", this.popoverClass), this._windowRef.setInput("id", this._ngbPopoverWindowId), this._windowRef.setInput("onMouseEnter", () => this._mouseEnterPopover.next()), this._windowRef.setInput("onMouseLeave", () => this._mouseLeavePopover.next()), this._getPositionTargetElement().setAttribute("aria-describedby", this._ngbPopoverWindowId), this.container === "body" && this._document.body.appendChild(this._windowRef.location.nativeElement), this._windowRef.changeDetectorRef.detectChanges(), this._windowRef.changeDetectorRef.markForCheck(), this._ngZone.runOutsideAngular(() => { this._positioning.createPopper({ hostElement: this._getPositionTargetElement(), targetElement: this._windowRef.location.nativeElement, placement: this.placement, baseClass: "bs-popover", updatePopperOptions: r => this.popperOptions(d([0, 8])(r)) }), Promise.resolve().then(() => { this._positioning.update(); }), this._afterRenderRef = y({ mixedReadWrite: () => { this._positioning.update(); } }, { injector: this._injector }); }), c(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [this._windowRef.location.nativeElement]), n.subscribe(() => { this._transitioning && (this._transitioning = !1, this.shown.emit()); });
    } }
    close(o = this.animation) { this._opening && this._transitioning && (this._transitioning = !1, a(this._windowRef.location.nativeElement)), this._windowRef && (this._getPositionTargetElement().removeAttribute("aria-describedby"), this._opening = !1, this._transitioning = !0, this._popupService.close(o).subscribe(() => { this._windowRef = null, this._positioning.destroy(), this._afterRenderRef?.destroy(), this._transitioning && (this._transitioning = !1, this.hidden.emit()), this._changeDetector.markForCheck(); })); }
    toggle() { this._windowRef ? this.close() : this.open(); }
    isOpen() { return this._windowRef != null; }
    ngOnInit() { this._unregisterListenersFn = u(this._nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay, this._mouseEnterPopover, this._mouseLeavePopover); }
    ngOnChanges({ ngbPopover: o, popoverTitle: i, disablePopover: n, popoverClass: r }) { r && this.isOpen() && this._windowRef.setInput("popoverClass", r.currentValue), (o || i || n) && this._isDisabled() && this.close(); }
    ngOnDestroy() { this.close(!1), this._unregisterListenersFn?.(); }
    _isDisabled() { return this.disablePopover ? !0 : !this.ngbPopover && !this.popoverTitle; }
    _getPositionTargetElement() { return (h(this.positionTarget) ? this._document.querySelector(this.positionTarget) : this.positionTarget) || this._nativeElement; }
    static { this.\u0275fac = function (i) { return new (i || t); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: t, selectors: [["", "ngbPopover", ""]], inputs: { animation: "animation", autoClose: "autoClose", ngbPopover: "ngbPopover", popoverTitle: "popoverTitle", placement: "placement", popperOptions: "popperOptions", triggers: "triggers", positionTarget: "positionTarget", container: "container", disablePopover: "disablePopover", popoverClass: "popoverClass", popoverContext: "popoverContext", openDelay: "openDelay", closeDelay: "closeDelay" }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbPopover"], features: [e.\u0275\u0275NgOnChangesFeature] }); }
} return t; })(), U = (() => { class t {
    static { this.\u0275fac = function (i) { return new (i || t); }; }
    static { this.\u0275mod = e.\u0275\u0275defineNgModule({ type: t }); }
    static { this.\u0275inj = e.\u0275\u0275defineInjector({}); }
} return t; })();
export { q as NgbPopover, M as NgbPopoverConfig, U as NgbPopoverModule };
