import { a as l, e as p, p as r, r as h, v as d, x as g, z as c } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as t from "@angular/core";
import { inject as s, EventEmitter as u, ElementRef as _, NgZone as m, DOCUMENT as w, ChangeDetectorRef as b, Injector as v, afterEveryRender as T } from "@angular/core";
import { NgbConfig as C } from "@ng-bootstrap/ng-bootstrap/config";
import { Subject as f } from "rxjs";
var y = ["*"], E = (() => { class i {
    constructor() { this._ngbConfig = s(C), this.autoClose = !0, this.placement = "auto", this.popperOptions = e => e, this.triggers = "hover focus", this.disableTooltip = !1, this.openDelay = 0, this.closeDelay = 0; }
    get animation() { return this._animation ?? this._ngbConfig.animation; }
    set animation(e) { this._animation = e; }
    static { this.\u0275fac = function (o) { return new (o || i); }; }
    static { this.\u0275prov = t.\u0275\u0275defineService({ token: i, factory: i.\u0275fac }); }
} return i; })(), R = 0, D = (() => {
    class i {
        static { this.\u0275fac = function (o) { return new (o || i); }; }
        static {
            this.\u0275cmp = t.\u0275\u0275defineComponent({ type: i, selectors: [["ngb-tooltip-window"]], hostAttrs: ["role", "tooltip"], hostVars: 5, hostBindings: function (o, n) { o & 1 && t.\u0275\u0275listener("mouseenter", function () { return n.onMouseEnter(); })("mouseleave", function () { return n.onMouseLeave(); }), o & 2 && (t.\u0275\u0275domProperty("id", n.id), t.\u0275\u0275classMap("tooltip" + (n.tooltipClass ? " " + n.tooltipClass : "")), t.\u0275\u0275classProp("fade", n.animation)); }, inputs: { animation: "animation", id: "id", tooltipClass: "tooltipClass", onMouseEnter: "onMouseEnter", onMouseLeave: "onMouseLeave" }, ngContentSelectors: y, decls: 3, vars: 0, consts: [["data-popper-arrow", "", 1, "tooltip-arrow"], [1, "tooltip-inner"]], template: function (o, n) { o & 1 && (t.\u0275\u0275projectionDef(), t.\u0275\u0275domElement(0, "div", 0), t.\u0275\u0275domElementStart(1, "div", 1), t.\u0275\u0275projection(2), t.\u0275\u0275domElementEnd()); }, styles: [`ngb-tooltip-window{pointer-events:none;position:absolute}ngb-tooltip-window .tooltip-inner{pointer-events:auto}ngb-tooltip-window.bs-tooltip-top,ngb-tooltip-window.bs-tooltip-bottom{padding-left:0;padding-right:0}ngb-tooltip-window.bs-tooltip-start,ngb-tooltip-window.bs-tooltip-end{padding-top:0;padding-bottom:0}
`], encapsulation: 2 });
        }
    }
    return i;
})(), k = (() => { class i {
    constructor() { this._config = s(E), this.animation = this._config.animation, this.autoClose = this._config.autoClose, this.placement = this._config.placement, this.popperOptions = this._config.popperOptions, this.triggers = this._config.triggers, this.container = this._config.container, this.disableTooltip = this._config.disableTooltip, this.tooltipClass = this._config.tooltipClass, this.openDelay = this._config.openDelay, this.closeDelay = this._config.closeDelay, this.shown = new u, this.hidden = new u, this._nativeElement = s(_).nativeElement, this._ngZone = s(m), this._document = s(w), this._changeDetector = s(b), this._injector = s(v), this._ngbTooltipWindowId = `ngb-tooltip-${R++}`, this._popupService = new g(D), this._windowRef = null, this._positioning = l(), this._mouseEnterTooltip = new f, this._mouseLeaveTooltip = new f, this._opening = !0, this._transitioning = !1; }
    set ngbTooltip(e) { this._ngbTooltip = e, !e && this._windowRef && this.close(); }
    get ngbTooltip() { return this._ngbTooltip; }
    open(e) { if (!this._opening && this._transitioning && (this._transitioning = !1, r(this._windowRef.location.nativeElement)), !this._windowRef && this._ngbTooltip && !this.disableTooltip) {
        let { windowRef: o, transition$: n } = this._popupService.open(this._ngbTooltip, e ?? this.tooltipContext, this.animation);
        this._opening = !0, this._transitioning = !0, this._windowRef = o, this._windowRef.setInput("animation", this.animation), this._windowRef.setInput("tooltipClass", this.tooltipClass), this._windowRef.setInput("id", this._ngbTooltipWindowId), this._windowRef.setInput("onMouseEnter", () => this._mouseEnterTooltip.next()), this._windowRef.setInput("onMouseLeave", () => this._mouseLeaveTooltip.next()), this._getPositionTargetElement().setAttribute("aria-describedby", this._ngbTooltipWindowId), this.container === "body" && this._document.body.appendChild(this._windowRef.location.nativeElement), this._windowRef.changeDetectorRef.detectChanges(), this._windowRef.changeDetectorRef.markForCheck(), this._ngZone.runOutsideAngular(() => { this._positioning.createPopper({ hostElement: this._getPositionTargetElement(), targetElement: this._windowRef.location.nativeElement, placement: this.placement, baseClass: "bs-tooltip", updatePopperOptions: a => this.popperOptions(d([0, 6])(a)) }), Promise.resolve().then(() => { this._positioning.update(); }), this._afterRenderRef = T({ mixedReadWrite: () => { this._positioning.update(); } }, { injector: this._injector }); }), h(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [this._windowRef.location.nativeElement], [this._nativeElement]), n.subscribe(() => { this._transitioning && (this._transitioning = !1, this.shown.emit()); });
    } }
    close(e = this.animation) { this._opening && this._transitioning && (this._transitioning = !1, r(this._windowRef.location.nativeElement)), this._windowRef != null && (this._getPositionTargetElement().removeAttribute("aria-describedby"), this._opening = !1, this._transitioning = !0, this._popupService.close(e).subscribe(() => { this._windowRef = null, this._positioning.destroy(), this._afterRenderRef?.destroy(), this._transitioning && (this._transitioning = !1, this.hidden.emit()), this._changeDetector.markForCheck(); })); }
    toggle() { this._windowRef ? this.close() : this.open(); }
    isOpen() { return this._windowRef != null; }
    ngOnInit() { this._unregisterListenersFn = c(this._nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay, this._mouseEnterTooltip, this._mouseLeaveTooltip); }
    ngOnChanges({ tooltipClass: e }) { e && this.isOpen() && this._windowRef.setInput("tooltipClass", e.currentValue); }
    ngOnDestroy() { this.close(!1), this._unregisterListenersFn?.(); }
    _getPositionTargetElement() { return (p(this.positionTarget) ? this._document.querySelector(this.positionTarget) : this.positionTarget) || this._nativeElement; }
    static { this.\u0275fac = function (o) { return new (o || i); }; }
    static { this.\u0275dir = t.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbTooltip", ""]], inputs: { animation: "animation", autoClose: "autoClose", placement: "placement", popperOptions: "popperOptions", triggers: "triggers", positionTarget: "positionTarget", container: "container", disableTooltip: "disableTooltip", tooltipClass: "tooltipClass", tooltipContext: "tooltipContext", openDelay: "openDelay", closeDelay: "closeDelay", ngbTooltip: "ngbTooltip" }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbTooltip"], features: [t.\u0275\u0275NgOnChangesFeature] }); }
} return i; })(), x = (() => { class i {
    static { this.\u0275fac = function (o) { return new (o || i); }; }
    static { this.\u0275mod = t.\u0275\u0275defineNgModule({ type: i }); }
    static { this.\u0275inj = t.\u0275\u0275defineInjector({}); }
} return i; })();
export { k as NgbTooltip, E as NgbTooltipConfig, x as NgbTooltipModule };
