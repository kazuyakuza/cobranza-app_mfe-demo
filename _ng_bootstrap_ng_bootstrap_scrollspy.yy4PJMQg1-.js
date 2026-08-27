import { e as y } from "@nf-internal/chunk-RJD7D2ZM";
import { a as f } from "@nf-internal/chunk-PZNONLPT";
import * as s from "@angular/core";
import { inject as n, DOCUMENT as D, PLATFORM_ID as R, ChangeDetectorRef as b, NgZone as A, DestroyRef as S, ElementRef as I } from "@angular/core";
import { Subject as C } from "rxjs";
import { distinctUntilChanged as E } from "rxjs/operators";
import { isPlatformBrowser as B } from "@angular/common";
import { takeUntilDestroyed as d } from "@angular/core/rxjs-interop";
function u(i, h) { return !i || h == null ? null : y(h) ? i.querySelector(`#${CSS.escape(h)}`) : h; }
function T(i, h) { let e = [...h].map(({ id: t }) => `#${CSS.escape(t)}`).join(","); return Array.from(i.querySelectorAll(e)); }
var w = (i, h, e) => { let { rootElement: t, fragments: r, scrollSpy: c, options: g, entries: p } = i, a = T(t, r); if (!e.initialized) {
    e.initialized = !0, e.gapFragment = null, e.visibleFragments = new Set;
    let o = u(t, g?.initialFragment);
    if (o) {
        c.scrollTo(o);
        return;
    }
} for (let o of p) {
    let { isIntersecting: _, target: l } = o;
    if (_)
        e.gapFragment && (e.visibleFragments.delete(e.gapFragment), e.gapFragment = null), e.visibleFragments.add(l);
    else if (e.visibleFragments.delete(l), e.visibleFragments.size === 0 && c.active !== "")
        if (o.boundingClientRect.top < o.rootBounds.top)
            e.gapFragment = l, e.visibleFragments.add(e.gapFragment);
        else if (l === a[0]) {
            e.gapFragment = null, e.visibleFragments.clear(), h("");
            return;
        }
        else {
            let m = a.indexOf(l);
            e.gapFragment = a[m - 1] || null, e.gapFragment && e.visibleFragments.add(e.gapFragment);
        }
} for (let o of a)
    if (e.visibleFragments.has(o)) {
        h(o.id);
        break;
    } }, $ = (() => { class i {
    constructor() { this.scrollBehavior = "smooth", this.processChanges = w; }
    static { this.\u0275fac = function (t) { return new (t || i); }; }
    static { this.\u0275prov = s.\u0275\u0275defineService({ token: i, factory: i.\u0275fac }); }
} return i; })(), N = 3, v = (() => { class i {
    constructor() { this._observer = null, this._containerElement = null, this._fragments = new Set, this._preRegisteredFragments = new Set, this._active$ = new C, this._distinctActive$ = this._active$.pipe(E()), this._active = "", this._config = n($), this._document = n(D), this._platformId = n(R), this._scrollBehavior = this._config.scrollBehavior, this._diChangeDetectorRef = n(b, { optional: !0 }), this._changeDetectorRef = this._diChangeDetectorRef, this._zone = n(A), this._distinctActive$.pipe(d()).subscribe(e => { this._active = e, this._changeDetectorRef?.markForCheck(); }); }
    get active() { return this._active; }
    get active$() { return this._distinctActive$; }
    start(e) { if (B(this._platformId)) {
        this._cleanup();
        let { root: t, rootMargin: r, scrollBehavior: c, threshold: g, fragments: p, changeDetectorRef: a, processChanges: o } = f({}, e);
        this._containerElement = t ?? this._document.documentElement, this._changeDetectorRef = a ?? this._diChangeDetectorRef, this._scrollBehavior = c ?? this._config.scrollBehavior;
        let _ = o ?? this._config.processChanges, l = {};
        this._observer = new IntersectionObserver(m => _({ entries: m, rootElement: this._containerElement, fragments: this._fragments, scrollSpy: this, options: f({}, e) }, M => this._active$.next(M), l), f(f({ root: t ?? this._document }, r && { rootMargin: r }), g && { threshold: g }));
        for (let m of [...this._preRegisteredFragments, ...p ?? []])
            this.observe(m);
        this._preRegisteredFragments.clear();
    } }
    stop() { this._cleanup(), this._active$.next(""); }
    scrollTo(e, t) { let { behavior: r } = f({ behavior: this._scrollBehavior }, t); if (this._containerElement) {
        let c = u(this._containerElement, e);
        if (c) {
            let g = c.offsetTop - this._containerElement.offsetTop;
            this._containerElement.scrollTo({ top: g, behavior: r });
            let p = this._containerElement.scrollTop, a = 0, o = this._containerElement;
            this._zone.runOutsideAngular(() => { let _ = () => { let l = p === o.scrollTop; l ? a++ : a = 0, !l || l && a < N ? (p = o.scrollTop, requestAnimationFrame(_)) : this._zone.run(() => this._active$.next(c.id)); }; requestAnimationFrame(_); });
        }
    } }
    observe(e) { if (!this._observer) {
        this._preRegisteredFragments.add(e);
        return;
    } let t = u(this._containerElement, e); t && !this._fragments.has(t) && (this._fragments.add(t), this._observer.observe(t)); }
    unobserve(e) { if (!this._observer) {
        this._preRegisteredFragments.delete(e);
        return;
    } let t = u(this._containerElement, e); if (t) {
        this._fragments.delete(t), this._observer.disconnect();
        for (let r of this._fragments)
            this._observer.observe(r);
    } }
    ngOnDestroy() { this._cleanup(); }
    _cleanup() { this._fragments.clear(), this._observer?.disconnect(), this._changeDetectorRef = this._diChangeDetectorRef, this._scrollBehavior = this._config.scrollBehavior, this._observer = null, this._containerElement = null; }
    static { this.\u0275fac = function (t) { return new (t || i); }; }
    static { this.\u0275prov = s.\u0275\u0275defineService({ token: i, factory: i.\u0275fac }); }
} return i; })(), P = (() => { class i {
    constructor() { this._changeDetector = n(b), this._scrollSpyMenu = n(O, { optional: !0 }), this._scrollSpyAPI = this._scrollSpyMenu ?? n(v), this._destroyRef = n(S), this._isActive = !1; }
    set data(e) { Array.isArray(e) ? (this._scrollSpyAPI = e[0], this.fragment = e[1], this.parent ??= e[2]) : e instanceof F ? this._scrollSpyAPI = e : y(e) && (this.fragment = e); }
    ngOnInit() { this._scrollSpyMenu || this._scrollSpyAPI.active$.pipe(d(this._destroyRef)).subscribe(e => { e === this.fragment ? this._activate() : this._deactivate(), this._changeDetector.markForCheck(); }); }
    _activate() { this._isActive = !0, this._scrollSpyMenu && this._scrollSpyMenu.getItem(this.parent ?? "")?._activate(); }
    _deactivate() { this._isActive = !1, this._scrollSpyMenu && this._scrollSpyMenu.getItem(this.parent ?? "")?._deactivate(); }
    isActive() { return this._isActive; }
    scrollTo(e) { this._scrollSpyAPI.scrollTo(this.fragment, e); }
    static { this.\u0275fac = function (t) { return new (t || i); }; }
    static { this.\u0275dir = s.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbScrollSpyItem", ""]], hostVars: 2, hostBindings: function (t, r) { t & 1 && s.\u0275\u0275listener("click", function () { return r.scrollTo(); }), t & 2 && s.\u0275\u0275classProp("active", r.isActive()); }, inputs: { data: [0, "ngbScrollSpyItem", "data"], fragment: "fragment", parent: "parent" }, exportAs: ["ngbScrollSpyItem"] }); }
} return i; })(), O = (() => { class i {
    constructor() { this._scrollSpyRef = n(v), this._destroyRef = n(S), this._map = new Map, this._lastActiveItem = null; }
    set scrollSpy(e) { this._scrollSpyRef = e; }
    get active() { return this._scrollSpyRef.active; }
    get active$() { return this._scrollSpyRef.active$; }
    scrollTo(e, t) { this._scrollSpyRef.scrollTo(e, t); }
    getItem(e) { return this._map.get(e); }
    ngAfterViewInit() { this._items.changes.pipe(d(this._destroyRef)).subscribe(() => this._rebuildMap()), this._rebuildMap(), this._scrollSpyRef.active$.pipe(d(this._destroyRef)).subscribe(e => { this._lastActiveItem?._deactivate(); let t = this._map.get(e); t && (t._activate(), this._lastActiveItem = t); }); }
    _rebuildMap() { this._map.clear(); for (let e of this._items)
        this._map.set(e.fragment, e); }
    static { this.\u0275fac = function (t) { return new (t || i); }; }
    static { this.\u0275dir = s.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbScrollSpyMenu", ""]], contentQueries: function (t, r, c) { if (t & 1 && s.\u0275\u0275contentQuery(c, P, 5), t & 2) {
            let g;
            s.\u0275\u0275queryRefresh(g = s.\u0275\u0275loadQuery()) && (r._items = g);
        } }, inputs: { scrollSpy: [0, "ngbScrollSpyMenu", "scrollSpy"] } }); }
} return i; })(), F = (() => { class i {
    constructor() { this._initialFragment = null, this._service = n(v), this._nativeElement = n(I).nativeElement, this.activeChange = this._service.active$; }
    set active(e) { this._initialFragment = e, this.scrollTo(e); }
    get active() { return this._service.active; }
    get active$() { return this._service.active$; }
    ngAfterViewInit() { this._service.start(f({ processChanges: this.processChanges, root: this._nativeElement, rootMargin: this.rootMargin, threshold: this.threshold }, this._initialFragment && { initialFragment: this._initialFragment })); }
    _registerFragment(e) { this._service.observe(e.id); }
    _unregisterFragment(e) { this._service.unobserve(e.id); }
    scrollTo(e, t) { this._service.scrollTo(e, f(f({}, this.scrollBehavior && { behavior: this.scrollBehavior }), t)); }
    static { this.\u0275fac = function (t) { return new (t || i); }; }
    static { this.\u0275dir = s.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbScrollSpy", ""]], hostAttrs: ["tabindex", "0"], hostVars: 2, hostBindings: function (t, r) { t & 2 && s.\u0275\u0275styleProp("overflow-y", "auto"); }, inputs: { processChanges: "processChanges", rootMargin: "rootMargin", scrollBehavior: "scrollBehavior", threshold: "threshold", active: "active" }, outputs: { activeChange: "activeChange" }, exportAs: ["ngbScrollSpy"], features: [s.\u0275\u0275ProvidersFeature([v])] }); }
} return i; })(), J = (() => { class i {
    constructor() { this._destroyRef = n(S), this._scrollSpy = n(F); }
    ngAfterViewInit() { this._scrollSpy._registerFragment(this), this._destroyRef.onDestroy(() => this._scrollSpy._unregisterFragment(this)); }
    static { this.\u0275fac = function (t) { return new (t || i); }; }
    static { this.\u0275dir = s.\u0275\u0275defineDirective({ type: i, selectors: [["", "ngbScrollSpyFragment", ""]], hostVars: 1, hostBindings: function (t, r) { t & 2 && s.\u0275\u0275domProperty("id", r.id); }, inputs: { id: [0, "ngbScrollSpyFragment", "id"] } }); }
} return i; })(), K = (() => { class i {
    static { this.\u0275fac = function (t) { return new (t || i); }; }
    static { this.\u0275mod = s.\u0275\u0275defineNgModule({ type: i }); }
    static { this.\u0275inj = s.\u0275\u0275defineInjector({}); }
} return i; })();
export { F as NgbScrollSpy, $ as NgbScrollSpyConfig, J as NgbScrollSpyFragment, P as NgbScrollSpyItem, O as NgbScrollSpyMenu, K as NgbScrollSpyModule, v as NgbScrollSpyService };
