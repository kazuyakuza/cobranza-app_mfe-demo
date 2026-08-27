import { o as a, q as r } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as e from "@angular/core";
import { inject as s, ElementRef as l, NgZone as d, EventEmitter as o } from "@angular/core";
import { NgbConfig as c } from "@ng-bootstrap/ng-bootstrap/config";
var g = (() => { class t {
    constructor() { this._ngbConfig = s(c), this.horizontal = !1; }
    get animation() { return this._animation ?? this._ngbConfig.animation; }
    set animation(i) { this._animation = i; }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275prov = e.\u0275\u0275defineService({ token: t, factory: t.\u0275fac }); }
} return t; })(), w = (() => { class t {
    constructor() { this._config = s(g), this._element = s(l), this._zone = s(d), this.animation = this._config.animation, this._afterInit = !1, this._isCollapsed = !1, this.ngbCollapseChange = new o, this.horizontal = this._config.horizontal, this.shown = new o, this.hidden = new o; }
    set collapsed(i) { this._isCollapsed !== i && (this._isCollapsed = i, this._afterInit && this._runTransitionWithEvents(i, this.animation)); }
    ngOnInit() { this._runTransition(this._isCollapsed, !1), this._afterInit = !0; }
    toggle(i = this._isCollapsed) { this.collapsed = !i, this.ngbCollapseChange.next(this._isCollapsed); }
    _runTransition(i, n) { return a(this._zone, this._element.nativeElement, r, { animation: n, runningTransition: "stop", context: { direction: i ? "hide" : "show", dimension: this.horizontal ? "width" : "height" } }); }
    _runTransitionWithEvents(i, n) { this._runTransition(i, n).subscribe(() => { i ? this.hidden.emit() : this.shown.emit(); }); }
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: t, selectors: [["", "ngbCollapse", ""]], hostVars: 2, hostBindings: function (n, h) { n & 2 && e.\u0275\u0275classProp("collapse-horizontal", h.horizontal); }, inputs: { animation: "animation", collapsed: [0, "ngbCollapse", "collapsed"], horizontal: "horizontal" }, outputs: { ngbCollapseChange: "ngbCollapseChange", shown: "shown", hidden: "hidden" }, exportAs: ["ngbCollapse"] }); }
} return t; })(), z = (() => { class t {
    static { this.\u0275fac = function (n) { return new (n || t); }; }
    static { this.\u0275mod = e.\u0275\u0275defineNgModule({ type: t }); }
    static { this.\u0275inj = e.\u0275\u0275defineInjector({}); }
} return t; })();
export { w as NgbCollapse, g as NgbCollapseConfig, z as NgbCollapseModule };
