import { l as A, o as v, p as R } from "@nf-internal/chunk-RJD7D2ZM";
import "@nf-internal/chunk-PZNONLPT";
import * as e from "@angular/core";
import { inject as l, TemplateRef as w, EventEmitter as O, PLATFORM_ID as B, NgZone as P, ChangeDetectorRef as x, ElementRef as $, DestroyRef as D, Injector as F, afterNextRender as H } from "@angular/core";
import { isPlatformBrowser as G, NgTemplateOutlet as k } from "@angular/common";
import { NgbConfig as L } from "@ng-bootstrap/ng-bootstrap/config";
import { BehaviorSubject as d, combineLatest as T, NEVER as U, timer as Z, zip as V } from "rxjs";
import { map as f, startWith as E, distinctUntilChanged as I, switchMap as W, take as j } from "rxjs/operators";
import { takeUntilDestroyed as b } from "@angular/core/rxjs-interop";
function J(n, a) { if (n & 1) {
    let t = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275elementStart(0, "button", 7), e.\u0275\u0275listener("click", function () { let s = e.\u0275\u0275restoreView(t).$implicit, r = e.\u0275\u0275nextContext(); return r.focus(), e.\u0275\u0275resetView(r.select(s.id, r.NgbSlideEventSource.INDICATOR)); }), e.\u0275\u0275elementEnd();
} if (n & 2) {
    let t = a.$implicit, i = e.\u0275\u0275nextContext();
    e.\u0275\u0275classProp("active", t.id === i.activeId), e.\u0275\u0275attribute("aria-labelledby", "slide-" + t.id)("aria-controls", "slide-" + t.id)("aria-selected", t.id === i.activeId);
} }
function K(n, a) { }
function z(n, a) { if (n & 1 && (e.\u0275\u0275elementStart(0, "div", 6)(1, "span", 8), e.\u0275\u0275i18n(2, 0), e.\u0275\u0275elementEnd(), e.\u0275\u0275template(3, K, 0, 0, "ng-template", 9), e.\u0275\u0275elementEnd()), n & 2) {
    let t = a.$implicit, i = a.$index, s = a.$count;
    e.\u0275\u0275property("id", "slide-" + t.id), e.\u0275\u0275advance(2), e.\u0275\u0275i18nExp(i + 1)(s), e.\u0275\u0275i18nApply(2), e.\u0275\u0275advance(), e.\u0275\u0275property("ngTemplateOutlet", t.templateRef);
} }
function Q(n, a) { if (n & 1) {
    let t = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275elementStart(0, "button", 10), e.\u0275\u0275listener("click", function () { e.\u0275\u0275restoreView(t); let s = e.\u0275\u0275nextContext(); return e.\u0275\u0275resetView(s.arrowLeft()); }), e.\u0275\u0275element(1, "span", 11), e.\u0275\u0275elementStart(2, "span", 12), e.\u0275\u0275i18n(3, 1), e.\u0275\u0275elementEnd()(), e.\u0275\u0275elementStart(4, "button", 13), e.\u0275\u0275listener("click", function () { e.\u0275\u0275restoreView(t); let s = e.\u0275\u0275nextContext(); return e.\u0275\u0275resetView(s.arrowRight()); }), e.\u0275\u0275element(5, "span", 14), e.\u0275\u0275elementStart(6, "span", 12), e.\u0275\u0275i18n(7, 2), e.\u0275\u0275elementEnd()();
} if (n & 2) {
    let t = e.\u0275\u0275nextContext();
    e.\u0275\u0275attribute("aria-labelledby", t.id + "-previous"), e.\u0275\u0275advance(2), e.\u0275\u0275property("id", t.id + "-previous"), e.\u0275\u0275advance(2), e.\u0275\u0275attribute("aria-labelledby", t.id + "-next"), e.\u0275\u0275advance(2), e.\u0275\u0275property("id", t.id + "-next");
} }
var q = (() => { class n {
    constructor() { this._ngbConfig = l(L), this.interval = 5e3, this.wrap = !0, this.keyboard = !0, this.pauseOnHover = !0, this.pauseOnFocus = !0, this.showNavigationArrows = !0, this.showNavigationIndicators = !0; }
    get animation() { return this._animation ?? this._ngbConfig.animation; }
    set animation(t) { this._animation = t; }
    static { this.\u0275fac = function (i) { return new (i || n); }; }
    static { this.\u0275prov = e.\u0275\u0275defineService({ token: n, factory: n.\u0275fac }); }
} return n; })(), _ = (function (n) { return n.START = "start", n.END = "end", n; })(_ || {}), y = ({ classList: n }) => n.contains("carousel-item-start") || n.contains("carousel-item-end"), m = n => { n.remove("carousel-item-start", "carousel-item-end"); }, g = n => { m(n), n.remove("carousel-item-prev", "carousel-item-next"); }, X = (n, a, { direction: t }) => { let { classList: i } = n; if (!a) {
    g(i), i.add("active");
    return;
} return y(n) ? m(i) : (i.add("carousel-item-" + (t === _.START ? "next" : "prev")), A(n), i.add("carousel-item-" + t)), () => { g(i), i.add("active"); }; }, Y = (n, a, { direction: t }) => { let { classList: i } = n; if (!a) {
    g(i), i.remove("active");
    return;
} return y(n) ? m(i) : i.add("carousel-item-" + t), () => { g(i), i.remove("active"); }; }, ee = 0, te = 0, ie = (() => { class n {
    constructor() { this.templateRef = l(w), this.id = `ngb-slide-${ee++}`, this.slid = new O; }
    static { this.\u0275fac = function (i) { return new (i || n); }; }
    static { this.\u0275dir = e.\u0275\u0275defineDirective({ type: n, selectors: [["ng-template", "ngbSlide", ""]], inputs: { id: "id" }, outputs: { slid: "slid" } }); }
} return n; })(), Oe = (() => { class n {
    constructor() { this.NgbSlideEventSource = h, this._config = l(q), this._platformId = l(B), this._ngZone = l(P), this._cd = l(x), this._container = l($), this._destroyRef = l(D), this._injector = l(F), this._interval$ = new d(this._config.interval), this._mouseHover$ = new d(!1), this._focused$ = new d(!1), this._pauseOnHover$ = new d(this._config.pauseOnHover), this._pauseOnFocus$ = new d(this._config.pauseOnFocus), this._pause$ = new d(!1), this._wrap$ = new d(this._config.wrap), this.id = `ngb-carousel-${te++}`, this.animation = this._config.animation, this.keyboard = this._config.keyboard, this.showNavigationArrows = this._config.showNavigationArrows, this.showNavigationIndicators = this._config.showNavigationIndicators, this.slide = new O, this.slid = new O, this._transitionIds = null; }
    set interval(t) { this._interval$.next(t); }
    get interval() { return this._interval$.value; }
    set wrap(t) { this._wrap$.next(t); }
    get wrap() { return this._wrap$.value; }
    set pauseOnHover(t) { this._pauseOnHover$.next(t); }
    get pauseOnHover() { return this._pauseOnHover$.value; }
    set pauseOnFocus(t) { this._pauseOnFocus$.next(t); }
    get pauseOnFocus() { return this._pauseOnFocus$.value; }
    set mouseHover(t) { this._mouseHover$.next(t); }
    get mouseHover() { return this._mouseHover$.value; }
    set focused(t) { this._focused$.next(t); }
    get focused() { return this._focused$.value; }
    arrowLeft() { this.focus(), this.prev(h.ARROW_LEFT); }
    arrowRight() { this.focus(), this.next(h.ARROW_RIGHT); }
    ngAfterContentInit() { G(this._platformId) && this._ngZone.runOutsideAngular(() => { let t = T([this.slide.pipe(f(i => i.current), E(this.activeId)), this._wrap$, this.slides.changes.pipe(E(null))]).pipe(f(([i, s]) => { let r = this.slides.toArray(), o = this._getSlideIdxById(i); return s ? r.length > 1 : o < r.length - 1; }), I()); T([this._pause$, this._pauseOnHover$, this._mouseHover$, this._pauseOnFocus$, this._focused$, this._interval$, t]).pipe(f(([i, s, r, o, p, c, u]) => i || s && r || o && p || !u ? 0 : c), I(), W(i => i > 0 ? Z(i, i) : U), b(this._destroyRef)).subscribe(() => this._ngZone.run(() => this.next(h.TIMER))); }), this.slides.changes.pipe(b(this._destroyRef)).subscribe(() => { this._transitionIds?.forEach(t => R(this._getSlideElement(t))), this._transitionIds = null, this._cd.markForCheck(), H({ mixedReadWrite: () => { for (let { id: t } of this.slides) {
            let i = this._getSlideElement(t);
            t === this.activeId ? i.classList.add("active") : i.classList.remove("active");
        } } }, { injector: this._injector }); }); }
    ngAfterContentChecked() { let t = this._getSlideById(this.activeId); this.activeId = t ? t.id : this.slides.length ? this.slides.first.id : ""; }
    ngAfterViewInit() { if (this.activeId) {
        let t = this._getSlideElement(this.activeId);
        t && t.classList.add("active");
    } }
    select(t, i) { this._cycleToSelected(t, this._getSlideEventDirection(this.activeId, t), i); }
    prev(t) { this._cycleToSelected(this._getPrevSlide(this.activeId), _.END, t); }
    next(t) { this._cycleToSelected(this._getNextSlide(this.activeId), _.START, t); }
    pause() { this._pause$.next(!0); }
    cycle() { this._pause$.next(!1); }
    focus() { this._container.nativeElement.focus(); }
    _cycleToSelected(t, i, s) { let r = this._transitionIds; if (r && (r[0] !== t || r[1] !== this.activeId))
        return; let o = this._getSlideById(t); if (o && o.id !== this.activeId) {
        this._transitionIds = [this.activeId, t], this.slide.emit({ prev: this.activeId, current: o.id, direction: i, paused: this._pause$.value, source: s });
        let p = { animation: this.animation, runningTransition: "stop", context: { direction: i } }, c = [], u = this._getSlideById(this.activeId);
        if (u) {
            let N = v(this._ngZone, this._getSlideElement(u.id), Y, p);
            N.subscribe(() => { u.slid.emit({ isShown: !1, direction: i, source: s }); }), c.push(N);
        }
        let C = this.activeId;
        this.activeId = o.id;
        let M = this._getSlideById(this.activeId), S = v(this._ngZone, this._getSlideElement(o.id), X, p);
        S.subscribe(() => { M?.slid.emit({ isShown: !0, direction: i, source: s }); }), c.push(S), V(...c).pipe(j(1)).subscribe(() => { this._transitionIds = null, this.slid.emit({ prev: C, current: o.id, direction: i, paused: this._pause$.value, source: s }); });
    } this._cd.markForCheck(); }
    _getSlideEventDirection(t, i) { let s = this._getSlideIdxById(t), r = this._getSlideIdxById(i); return s > r ? _.END : _.START; }
    _getSlideById(t) { return this.slides.find(i => i.id === t) || null; }
    _getSlideIdxById(t) { let i = this._getSlideById(t); return i != null ? this.slides.toArray().indexOf(i) : -1; }
    _getNextSlide(t) { let i = this.slides.toArray(), s = this._getSlideIdxById(t); return s === i.length - 1 ? this.wrap ? i[0].id : i[i.length - 1].id : i[s + 1].id; }
    _getPrevSlide(t) { let i = this.slides.toArray(), s = this._getSlideIdxById(t); return s === 0 ? this.wrap ? i[i.length - 1].id : i[0].id : i[s - 1].id; }
    _getSlideElement(t) { return this._container.nativeElement.querySelector(`#slide-${t}`); }
    static { this.\u0275fac = function (i) { return new (i || n); }; }
    static { this.\u0275cmp = e.\u0275\u0275defineComponent({ type: n, selectors: [["ngb-carousel"]], contentQueries: function (i, s, r) { if (i & 1 && e.\u0275\u0275contentQuery(r, ie, 4), i & 2) {
            let o;
            e.\u0275\u0275queryRefresh(o = e.\u0275\u0275loadQuery()) && (s.slides = o);
        } }, hostAttrs: ["tabIndex", "0", 1, "carousel", "slide"], hostVars: 2, hostBindings: function (i, s) { i & 1 && e.\u0275\u0275listener("keydown.arrowLeft", function () { return s.keyboard && s.arrowLeft(); })("keydown.arrowRight", function () { return s.keyboard && s.arrowRight(); })("mouseenter", function () { return s.mouseHover = !0; })("mouseleave", function () { return s.mouseHover = !1; })("focusin", function () { return s.focused = !0; })("focusout", function () { return s.focused = !1; }), i & 2 && e.\u0275\u0275styleProp("display", "block"); }, inputs: { animation: "animation", activeId: "activeId", interval: "interval", wrap: "wrap", keyboard: "keyboard", pauseOnHover: "pauseOnHover", pauseOnFocus: "pauseOnFocus", showNavigationArrows: "showNavigationArrows", showNavigationIndicators: "showNavigationIndicators" }, outputs: { slide: "slide", slid: "slid" }, exportAs: ["ngbCarousel"], decls: 7, vars: 3, consts: () => { let t; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? t = goog.getMsg(" Slide {$interpolation} of {$interpolation_1} ", { interpolation: "\uFFFD0\uFFFD", interpolation_1: "\uFFFD1\uFFFD" }, { original_code: { interpolation: "{{ i + 1 }}", interpolation_1: "{{ c }}" } }) : t = $localize `:Currently selected slide number read by screen reader@@ngb.carousel.slide-number: Slide ${"\uFFFD0\uFFFD"}:INTERPOLATION: of ${"\uFFFD1\uFFFD"}:INTERPOLATION_1: `; let i; typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? i = goog.getMsg("Previous") : i = $localize `:@@ngb.carousel.previous:Previous`; let s; return typeof ngI18nClosureMode < "u" && ngI18nClosureMode ? s = goog.getMsg("Next") : s = $localize `:@@ngb.carousel.next:Next`, [t, i, s, ["role", "tablist", 1, "carousel-indicators"], ["type", "button", "data-bs-target", "", "role", "tab", 3, "active"], [1, "carousel-inner"], ["role", "tabpanel", 1, "carousel-item", 3, "id"], ["type", "button", "data-bs-target", "", "role", "tab", 3, "click"], [1, "visually-hidden"], [3, "ngTemplateOutlet"], ["type", "button", 1, "carousel-control-prev", 3, "click"], ["aria-hidden", "true", 1, "carousel-control-prev-icon"], [1, "visually-hidden", 3, "id"], ["type", "button", 1, "carousel-control-next", 3, "click"], ["aria-hidden", "true", 1, "carousel-control-next-icon"]]; }, template: function (i, s) { i & 1 && (e.\u0275\u0275elementStart(0, "div", 3), e.\u0275\u0275repeaterCreate(1, J, 1, 5, "button", 4, e.\u0275\u0275repeaterTrackByIdentity), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(3, "div", 5), e.\u0275\u0275repeaterCreate(4, z, 4, 4, "div", 6, e.\u0275\u0275repeaterTrackByIdentity), e.\u0275\u0275elementEnd(), e.\u0275\u0275conditionalCreate(6, Q, 8, 4)), i & 2 && (e.\u0275\u0275classProp("visually-hidden", !s.showNavigationIndicators), e.\u0275\u0275advance(), e.\u0275\u0275repeater(s.slides), e.\u0275\u0275advance(3), e.\u0275\u0275repeater(s.slides), e.\u0275\u0275advance(2), e.\u0275\u0275conditional(s.showNavigationArrows ? 6 : -1)); }, dependencies: [k], encapsulation: 2 }); }
} return n; })(), h = (function (n) { return n.TIMER = "timer", n.ARROW_LEFT = "arrowLeft", n.ARROW_RIGHT = "arrowRight", n.INDICATOR = "indicator", n; })(h || {}), me = (() => { class n {
    static { this.\u0275fac = function (i) { return new (i || n); }; }
    static { this.\u0275mod = e.\u0275\u0275defineNgModule({ type: n }); }
    static { this.\u0275inj = e.\u0275\u0275defineInjector({}); }
} return n; })();
export { Oe as NgbCarousel, q as NgbCarouselConfig, me as NgbCarouselModule, ie as NgbSlide, _ as NgbSlideEventDirection, h as NgbSlideEventSource };
