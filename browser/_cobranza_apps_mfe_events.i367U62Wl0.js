import { a as vt } from "@nf-internal/chunk-PZNONLPT";
var U = { REQUEST_ADD_MODULE: "mfe:request-add-module", REQUEST_FULLSCREEN: "mfe:request-fullscreen", REQUEST_REMOVE: "mfe:request-remove", UPDATE_HEADER: "mfe:update-header", SHOW_NOTIFICATION: "mfe:show-notification", MODULE_READY: "mfe:module-ready", MODULE_ERROR: "mfe:module-error", UPDATE_MIN_HEIGHT: "mfe:update-min-height" }, ft = { MODULE_STATE: "shell:module-state", THEME_CHANGED: "shell:theme-changed", VISIBILITY_CHANGED: "shell:visibility-changed" };
var mt = 1;
var $ = class e extends Error {
    errors;
    eventType;
    constructor(t, n = {}) { super(t), this.name = "MfeEventValidationError", this.errors = n.errors ?? [], this.eventType = n.eventType, Object.setPrototypeOf(this, e.prototype); }
};
var h = (function (e) { return e[e.PLAIN_TO_CLASS = 0] = "PLAIN_TO_CLASS", e[e.CLASS_TO_PLAIN = 1] = "CLASS_TO_PLAIN", e[e.CLASS_TO_CLASS = 2] = "CLASS_TO_CLASS", e; })(h || {});
var Tt = (function () { function e() { this._typeMetadatas = new Map, this._transformMetadatas = new Map, this._exposeMetadatas = new Map, this._excludeMetadatas = new Map, this._ancestorsMap = new Map; } return e.prototype.addTypeMetadata = function (t) { this._typeMetadatas.has(t.target) || this._typeMetadatas.set(t.target, new Map), this._typeMetadatas.get(t.target).set(t.propertyName, t); }, e.prototype.addTransformMetadata = function (t) { this._transformMetadatas.has(t.target) || this._transformMetadatas.set(t.target, new Map), this._transformMetadatas.get(t.target).has(t.propertyName) || this._transformMetadatas.get(t.target).set(t.propertyName, []), this._transformMetadatas.get(t.target).get(t.propertyName).push(t); }, e.prototype.addExposeMetadata = function (t) { this._exposeMetadatas.has(t.target) || this._exposeMetadatas.set(t.target, new Map), this._exposeMetadatas.get(t.target).set(t.propertyName, t); }, e.prototype.addExcludeMetadata = function (t) { this._excludeMetadatas.has(t.target) || this._excludeMetadatas.set(t.target, new Map), this._excludeMetadatas.get(t.target).set(t.propertyName, t); }, e.prototype.findTransformMetadatas = function (t, n, r) { return this.findMetadatas(this._transformMetadatas, t, n).filter(function (o) { return !o.options || o.options.toClassOnly === !0 && o.options.toPlainOnly === !0 ? !0 : o.options.toClassOnly === !0 ? r === h.CLASS_TO_CLASS || r === h.PLAIN_TO_CLASS : o.options.toPlainOnly === !0 ? r === h.CLASS_TO_PLAIN : !0; }); }, e.prototype.findExcludeMetadata = function (t, n) { return this.findMetadata(this._excludeMetadatas, t, n); }, e.prototype.findExposeMetadata = function (t, n) { return this.findMetadata(this._exposeMetadatas, t, n); }, e.prototype.findExposeMetadataByCustomName = function (t, n) { return this.getExposedMetadatas(t).find(function (r) { return r.options && r.options.name === n; }); }, e.prototype.findTypeMetadata = function (t, n) { return this.findMetadata(this._typeMetadatas, t, n); }, e.prototype.getStrategy = function (t) { var n = this._excludeMetadatas.get(t), r = n && n.get(void 0), o = this._exposeMetadatas.get(t), i = o && o.get(void 0); return r && i || !r && !i ? "none" : r ? "excludeAll" : "exposeAll"; }, e.prototype.getExposedMetadatas = function (t) { return this.getMetadata(this._exposeMetadatas, t); }, e.prototype.getExcludedMetadatas = function (t) { return this.getMetadata(this._excludeMetadatas, t); }, e.prototype.getExposedProperties = function (t, n) { return this.getExposedMetadatas(t).filter(function (r) { return !r.options || r.options.toClassOnly === !0 && r.options.toPlainOnly === !0 ? !0 : r.options.toClassOnly === !0 ? n === h.CLASS_TO_CLASS || n === h.PLAIN_TO_CLASS : r.options.toPlainOnly === !0 ? n === h.CLASS_TO_PLAIN : !0; }).map(function (r) { return r.propertyName; }); }, e.prototype.getExcludedProperties = function (t, n) { return this.getExcludedMetadatas(t).filter(function (r) { return !r.options || r.options.toClassOnly === !0 && r.options.toPlainOnly === !0 ? !0 : r.options.toClassOnly === !0 ? n === h.CLASS_TO_CLASS || n === h.PLAIN_TO_CLASS : r.options.toPlainOnly === !0 ? n === h.CLASS_TO_PLAIN : !0; }).map(function (r) { return r.propertyName; }); }, e.prototype.clear = function () { this._typeMetadatas.clear(), this._exposeMetadatas.clear(), this._excludeMetadatas.clear(), this._ancestorsMap.clear(); }, e.prototype.getMetadata = function (t, n) { var r = t.get(n), o; r && (o = Array.from(r.values()).filter(function (d) { return d.propertyName !== void 0; })); for (var i = [], s = 0, a = this.getAncestors(n); s < a.length; s++) {
    var p = a[s], f = t.get(p);
    if (f) {
        var c = Array.from(f.values()).filter(function (d) { return d.propertyName !== void 0; });
        i.push.apply(i, c);
    }
} return i.concat(o || []); }, e.prototype.findMetadata = function (t, n, r) { var o = t.get(n); if (o) {
    var i = o.get(r);
    if (i)
        return i;
} for (var s = 0, a = this.getAncestors(n); s < a.length; s++) {
    var p = a[s], f = t.get(p);
    if (f) {
        var c = f.get(r);
        if (c)
            return c;
    }
} }, e.prototype.findMetadatas = function (t, n, r) { var o = t.get(n), i; o && (i = o.get(r)); for (var s = [], a = 0, p = this.getAncestors(n); a < p.length; a++) {
    var f = p[a], c = t.get(f);
    c && c.has(r) && s.push.apply(s, c.get(r));
} return s.slice().reverse().concat((i || []).slice().reverse()); }, e.prototype.getAncestors = function (t) { if (!t)
    return []; if (!this._ancestorsMap.has(t)) {
    for (var n = [], r = Object.getPrototypeOf(t.prototype.constructor); typeof r.prototype < "u"; r = Object.getPrototypeOf(r.prototype.constructor))
        n.push(r);
    this._ancestorsMap.set(t, n);
} return this._ancestorsMap.get(t); }, e; })();
var I = new Tt;
function _t() { if (typeof globalThis < "u")
    return globalThis; if (typeof global < "u")
    return global; if (typeof window < "u")
    return window; if (typeof self < "u")
    return self; }
function It(e) { return e !== null && typeof e == "object" && typeof e.then == "function"; }
var Lt = function (e, t, n) { if (n || arguments.length === 2)
    for (var r = 0, o = t.length, i; r < o; r++)
        (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), i[r] = t[r]); return e.concat(i || Array.prototype.slice.call(t)); };
function Jt(e) { var t = new e; return !(t instanceof Set) && !("push" in t) ? [] : t; }
var z = (function () { function e(t, n) { this.transformationType = t, this.options = n, this.recursionStack = new Set; } return e.prototype.transform = function (t, n, r, o, i, s) { var a = this; if (s === void 0 && (s = 0), Array.isArray(n) || n instanceof Set) {
    var p = o && this.transformationType === h.PLAIN_TO_CLASS ? Jt(o) : [];
    return n.forEach(function (v, x) { var m = t ? t[x] : void 0; if (!a.options.enableCircularCheck || !a.isCircular(v)) {
        var O = void 0;
        if (typeof r != "function" && r && r.options && r.options.discriminator && r.options.discriminator.property && r.options.discriminator.subTypes) {
            if (a.transformationType === h.PLAIN_TO_CLASS) {
                O = r.options.discriminator.subTypes.find(function (S) { return S.name === v[r.options.discriminator.property]; });
                var l = { newObject: p, object: v, property: void 0 }, y = r.typeFunction(l);
                O === void 0 ? O = y : O = O.value, r.options.keepDiscriminatorProperty || delete v[r.options.discriminator.property];
            }
            a.transformationType === h.CLASS_TO_CLASS && (O = v.constructor), a.transformationType === h.CLASS_TO_PLAIN && (v[r.options.discriminator.property] = r.options.discriminator.subTypes.find(function (S) { return S.value === v.constructor; }).name);
        }
        else
            O = r;
        var A = a.transform(m, v, O, void 0, v instanceof Map, s + 1);
        p instanceof Set ? p.add(A) : p.push(A);
    }
    else
        a.transformationType === h.CLASS_TO_CLASS && (p instanceof Set ? p.add(v) : p.push(v)); }), p;
}
else {
    if (r === String && !i)
        return n == null ? n : String(n);
    if (r === Number && !i)
        return n == null ? n : Number(n);
    if (r === Boolean && !i)
        return n == null ? n : !!n;
    if ((r === Date || n instanceof Date) && !i)
        return n instanceof Date ? new Date(n.valueOf()) : n == null ? n : new Date(n);
    if (_t().Buffer && (r === Buffer || n instanceof Buffer) && !i)
        return n == null ? n : Buffer.from(n);
    if (It(n) && !i)
        return new Promise(function (v, x) { n.then(function (m) { return v(a.transform(void 0, m, r, void 0, void 0, s + 1)); }, x); });
    if (!i && n !== null && typeof n == "object" && typeof n.then == "function")
        return n;
    if (typeof n == "object" && n !== null) {
        !r && n.constructor !== Object && (!Array.isArray(n) && n.constructor === Array || (r = n.constructor)), !r && t && (r = t.constructor), this.options.enableCircularCheck && this.recursionStack.add(n);
        var f = this.getKeys(r, n, i), c = t || {};
        !t && (this.transformationType === h.PLAIN_TO_CLASS || this.transformationType === h.CLASS_TO_CLASS) && (i ? c = new Map : r ? c = new r : c = {});
        for (var d = function (v) { if (v === "__proto__" || v === "constructor")
            return "continue"; var x = v, m = v, O = v; if (!u.options.ignoreDecorators && r) {
            if (u.transformationType === h.PLAIN_TO_CLASS) {
                var l = I.findExposeMetadataByCustomName(r, v);
                l && (O = l.propertyName, m = l.propertyName);
            }
            else if (u.transformationType === h.CLASS_TO_PLAIN || u.transformationType === h.CLASS_TO_CLASS) {
                var l = I.findExposeMetadata(r, v);
                l && l.options && l.options.name && (m = l.options.name);
            }
        } var y = void 0; u.transformationType === h.PLAIN_TO_CLASS ? y = n[x] : n instanceof Map ? y = n.get(x) : n[x] instanceof Function ? y = n[x]() : y = n[x]; var A = void 0, S = y instanceof Map; if (r && i)
            A = r;
        else if (r) {
            var g = I.findTypeMetadata(r, O);
            if (g) {
                var j = { newObject: c, object: n, property: O }, H = g.typeFunction ? g.typeFunction(j) : g.reflectedType;
                g.options && g.options.discriminator && g.options.discriminator.property && g.options.discriminator.subTypes ? n[x] instanceof Array ? A = g : (u.transformationType === h.PLAIN_TO_CLASS && (A = g.options.discriminator.subTypes.find(function (k) { if (y && y instanceof Object && g.options.discriminator.property in y)
                    return k.name === y[g.options.discriminator.property]; }), A === void 0 ? A = H : A = A.value, g.options.keepDiscriminatorProperty || y && y instanceof Object && g.options.discriminator.property in y && delete y[g.options.discriminator.property]), u.transformationType === h.CLASS_TO_CLASS && (A = y.constructor), u.transformationType === h.CLASS_TO_PLAIN && y && (y[g.options.discriminator.property] = g.options.discriminator.subTypes.find(function (k) { return k.value === y.constructor; }).name)) : A = H, S = S || g.reflectedType === Map;
            }
            else if (u.options.targetMaps)
                u.options.targetMaps.filter(function (k) { return k.target === r && !!k.properties[O]; }).forEach(function (k) { return A = k.properties[O]; });
            else if (u.options.enableImplicitConversion && u.transformationType === h.PLAIN_TO_CLASS) {
                var ot = Reflect.getMetadata("design:type", r.prototype, O);
                ot && (A = ot);
            }
        } var st = Array.isArray(n[x]) ? u.getReflectedType(r, O) : void 0, At = t ? t[x] : void 0; if (c.constructor.prototype) {
            var Mt = Object.getOwnPropertyDescriptor(c.constructor.prototype, m);
            if ((u.transformationType === h.PLAIN_TO_CLASS || u.transformationType === h.CLASS_TO_CLASS) && (Mt && !Mt.set || c[m] instanceof Function))
                return "continue";
        } if (!u.options.enableCircularCheck || !u.isCircular(y)) {
            var at = u.transformationType === h.PLAIN_TO_CLASS ? m : v, E = void 0;
            u.transformationType === h.CLASS_TO_PLAIN ? (E = n[at], E = u.applyCustomTransformations(E, r, at, n, u.transformationType), E = n[at] === E ? y : E, E = u.transform(At, E, A, st, S, s + 1)) : y === void 0 && u.options.exposeDefaultValues ? E = c[m] : (E = u.transform(At, y, A, st, S, s + 1), E = u.applyCustomTransformations(E, r, at, n, u.transformationType)), (E !== void 0 || u.options.exposeUnsetFields) && (c instanceof Map ? c.set(m, E) : c[m] = E);
        }
        else if (u.transformationType === h.CLASS_TO_CLASS) {
            var E = y;
            E = u.applyCustomTransformations(E, r, v, n, u.transformationType), (E !== void 0 || u.options.exposeUnsetFields) && (c instanceof Map ? c.set(m, E) : c[m] = E);
        } }, u = this, M = 0, T = f; M < T.length; M++) {
            var V = T[M];
            d(V);
        }
        return this.options.enableCircularCheck && this.recursionStack.delete(n), c;
    }
    else
        return n;
} }, e.prototype.applyCustomTransformations = function (t, n, r, o, i) { var s = this, a = I.findTransformMetadatas(n, r, this.transformationType); return this.options.version !== void 0 && (a = a.filter(function (p) { return p.options ? s.checkVersion(p.options.since, p.options.until) : !0; })), this.options.groups && this.options.groups.length ? a = a.filter(function (p) { return p.options ? s.checkGroups(p.options.groups) : !0; }) : a = a.filter(function (p) { return !p.options || !p.options.groups || !p.options.groups.length; }), a.forEach(function (p) { t = p.transformFn({ value: t, key: r, obj: o, type: i, options: s.options }); }), t; }, e.prototype.isCircular = function (t) { return this.recursionStack.has(t); }, e.prototype.getReflectedType = function (t, n) { if (t) {
    var r = I.findTypeMetadata(t, n);
    return r ? r.reflectedType : void 0;
} }, e.prototype.getKeys = function (t, n, r) { var o = this, i = I.getStrategy(t); i === "none" && (i = this.options.strategy || "exposeAll"); var s = []; if ((i === "exposeAll" || r) && (n instanceof Map ? s = Array.from(n.keys()) : s = Object.keys(n)), r)
    return s; if (this.options.ignoreDecorators && this.options.excludeExtraneousValues && t) {
    var a = I.getExposedProperties(t, this.transformationType), p = I.getExcludedProperties(t, this.transformationType);
    s = Lt(Lt([], a, !0), p, !0);
} if (!this.options.ignoreDecorators && t) {
    var a = I.getExposedProperties(t, this.transformationType);
    this.transformationType === h.PLAIN_TO_CLASS && (a = a.map(function (d) { var u = I.findExposeMetadata(t, d); return u && u.options && u.options.name ? u.options.name : d; })), this.options.excludeExtraneousValues ? s = a : s = s.concat(a);
    var f = I.getExcludedProperties(t, this.transformationType);
    f.length > 0 && (s = s.filter(function (d) { return !f.includes(d); })), this.options.version !== void 0 && (s = s.filter(function (d) { var u = I.findExposeMetadata(t, d); return !u || !u.options ? !0 : o.checkVersion(u.options.since, u.options.until); })), this.options.groups && this.options.groups.length ? s = s.filter(function (d) { var u = I.findExposeMetadata(t, d); return !u || !u.options ? !0 : o.checkGroups(u.options.groups); }) : s = s.filter(function (d) { var u = I.findExposeMetadata(t, d); return !u || !u.options || !u.options.groups || !u.options.groups.length; });
} return this.options.excludePrefixes && this.options.excludePrefixes.length && (s = s.filter(function (c) { return o.options.excludePrefixes.every(function (d) { return c.substr(0, d.length) !== d; }); })), s = s.filter(function (c, d, u) { return u.indexOf(c) === d; }), s; }, e.prototype.checkVersion = function (t, n) { var r = !0; return r && t && (r = this.options.version >= t), r && n && (r = this.options.version < n), r; }, e.prototype.checkGroups = function (t) { return t ? this.options.groups.some(function (n) { return t.includes(n); }) : !0; }, e; })();
var Y = { enableCircularCheck: !1, enableImplicitConversion: !1, excludeExtraneousValues: !1, excludePrefixes: void 0, exposeDefaultValues: !1, exposeUnsetFields: !0, groups: void 0, ignoreDecorators: !1, strategy: void 0, targetMaps: void 0, version: void 0 };
var C = function () { return C = Object.assign || function (e) { for (var t, n = 1, r = arguments.length; n < r; n++) {
    t = arguments[n];
    for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
} return e; }, C.apply(this, arguments); }, Ct = (function () { function e() { } return e.prototype.instanceToPlain = function (t, n) { var r = new z(h.CLASS_TO_PLAIN, C(C({}, Y), n)); return r.transform(void 0, t, void 0, void 0, void 0, void 0); }, e.prototype.classToPlainFromExist = function (t, n, r) { var o = new z(h.CLASS_TO_PLAIN, C(C({}, Y), r)); return o.transform(n, t, void 0, void 0, void 0, void 0); }, e.prototype.plainToInstance = function (t, n, r) { var o = new z(h.PLAIN_TO_CLASS, C(C({}, Y), r)); return o.transform(void 0, n, t, void 0, void 0, void 0); }, e.prototype.plainToClassFromExist = function (t, n, r) { var o = new z(h.PLAIN_TO_CLASS, C(C({}, Y), r)); return o.transform(t, n, void 0, void 0, void 0, void 0); }, e.prototype.instanceToInstance = function (t, n) { var r = new z(h.CLASS_TO_CLASS, C(C({}, Y), n)); return r.transform(void 0, t, void 0, void 0, void 0, void 0); }, e.prototype.classToClassFromExist = function (t, n, r) { var o = new z(h.CLASS_TO_CLASS, C(C({}, Y), r)); return o.transform(n, t, void 0, void 0, void 0, void 0); }, e.prototype.serialize = function (t, n) { return JSON.stringify(this.instanceToPlain(t, n)); }, e.prototype.deserialize = function (t, n, r) { var o = JSON.parse(n); return this.plainToInstance(t, o, r); }, e.prototype.deserializeArray = function (t, n, r) { var o = JSON.parse(n); return this.plainToInstance(t, o, r); }, e; })();
var Kt = new Ct;
function bt(e, t, n) { return Kt.plainToInstance(e, t, n); }
var Z = (function () { function e(t) { this.groups = [], this.each = !1, this.context = void 0, this.type = t.type, this.name = t.name, this.target = t.target, this.propertyName = t.propertyName, this.constraints = t?.constraints, this.constraintCls = t.constraintCls, this.validationTypeOptions = t.validationTypeOptions, t.validationOptions && (this.message = t.validationOptions.message, this.groups = t.validationOptions.groups, this.always = t.validationOptions.always, this.each = t.validationOptions.each, this.context = t.validationOptions.context, this.validateIf = t.validationOptions.validateIf); } return e; })();
var Nt = (function () { function e() { } return e.prototype.transform = function (t) { var n = []; return Object.keys(t.properties).forEach(function (r) { t.properties[r].forEach(function (o) { var i = { message: o.message, groups: o.groups, always: o.always, each: o.each }, s = { type: o.type, name: o.name, target: t.name, propertyName: r, constraints: o.constraints, validationTypeOptions: o.options, validationOptions: i }; n.push(new Z(s)); }); }), n; }, e; })();
function wt(e) { return e instanceof Map ? Array.from(e.values()) : Array.isArray(e) ? e : Array.from(e); }
function Pt() { if (typeof globalThis < "u")
    return globalThis; if (typeof global < "u")
    return global; if (typeof window < "u")
    return window; if (typeof self < "u")
    return self; }
function ut(e) { return e !== null && typeof e == "object" && typeof e.then == "function"; }
var Zt = function (e) { var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0; if (n)
    return n.call(e); if (e && typeof e.length == "number")
    return { next: function () { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined."); }, Dt = function (e, t) { var n = typeof Symbol == "function" && e[Symbol.iterator]; if (!n)
    return e; var r = n.call(e), o, i = [], s; try {
    for (; (t === void 0 || t-- > 0) && !(o = r.next()).done;)
        i.push(o.value);
}
catch (a) {
    s = { error: a };
}
finally {
    try {
        o && !o.done && (n = r.return) && n.call(r);
    }
    finally {
        if (s)
            throw s.error;
    }
} return i; }, Xt = function (e, t, n) { if (n || arguments.length === 2)
    for (var r = 0, o = t.length, i; r < o; r++)
        (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), i[r] = t[r]); return e.concat(i || Array.prototype.slice.call(t)); }, gt = (function () { function e() { this.validationMetadatas = new Map, this.constraintMetadatas = new Map; } return Object.defineProperty(e.prototype, "hasValidationMetaData", { get: function () { return !!this.validationMetadatas.size; }, enumerable: !1, configurable: !0 }), e.prototype.addValidationSchema = function (t) { var n = this, r = new Nt().transform(t); r.forEach(function (o) { return n.addValidationMetadata(o); }); }, e.prototype.addValidationMetadata = function (t) { var n = this.validationMetadatas.get(t.target); n ? n.push(t) : this.validationMetadatas.set(t.target, [t]); }, e.prototype.addConstraintMetadata = function (t) { var n = this.constraintMetadatas.get(t.target); n ? n.push(t) : this.constraintMetadatas.set(t.target, [t]); }, e.prototype.groupByPropertyName = function (t) { var n = {}; return t.forEach(function (r) { n[r.propertyName] || (n[r.propertyName] = []), n[r.propertyName].push(r); }), n; }, e.prototype.getTargetValidationMetadatas = function (t, n, r, o, i) { var s, a, p = function (l) { return typeof l.always < "u" ? l.always : l.groups && l.groups.length ? !1 : r; }, f = function (l) { return !!(o && (!i || !i.length) && l.groups && l.groups.length); }, c = this.validationMetadatas.get(t) || [], d = c.filter(function (l) { return l.target !== t && l.target !== n ? !1 : p(l) ? !0 : f(l) ? !1 : i && i.length > 0 ? l.groups && !!l.groups.find(function (y) { return i.indexOf(y) !== -1; }) : !0; }), u = []; try {
    for (var M = Zt(this.validationMetadatas.entries()), T = M.next(); !T.done; T = M.next()) {
        var V = Dt(T.value, 2), v = V[0], x = V[1];
        t.prototype instanceof v && u.push.apply(u, Xt([], Dt(x), !1));
    }
}
catch (l) {
    s = { error: l };
}
finally {
    try {
        T && !T.done && (a = M.return) && a.call(M);
    }
    finally {
        if (s)
            throw s.error;
    }
} var m = u.filter(function (l) { return typeof l.target == "string" || l.target === t || l.target instanceof Function && !(t.prototype instanceof l.target) ? !1 : p(l) ? !0 : f(l) ? !1 : i && i.length > 0 ? l.groups && !!l.groups.find(function (y) { return i.indexOf(y) !== -1; }) : !0; }), O = m.filter(function (l) { return !d.find(function (y) { return y.propertyName === l.propertyName && y.type === l.type; }); }); return d.concat(O); }, e.prototype.getTargetValidatorConstraints = function (t) { return this.constraintMetadatas.get(t) || []; }, e; })();
function W() { var e = Pt(); return e.classValidatorMetadataStorage || (e.classValidatorMetadataStorage = new gt), e.classValidatorMetadataStorage; }
var xt = (function () {
    function e() { }
    return e.prototype.toString = function (t, n, r, o) {
        var i = this;
        t === void 0 && (t = !1), n === void 0 && (n = !1), r === void 0 && (r = ""), o === void 0 && (o = !1);
        var s = t ? "\x1B[1m" : "", a = t ? "\x1B[22m" : "", p = function () { var d; return (o ? Object.values : Object.keys)((d = i.constraints) !== null && d !== void 0 ? d : {}).join(", "); }, f = function (d) {
            return " - property ".concat(s).concat(r).concat(d).concat(a, " has failed the following constraints: ").concat(s).concat(p()).concat(a, ` 
`);
        };
        if (n) {
            var c = Number.isInteger(+this.property) ? "[".concat(this.property, "]") : "".concat(r ? "." : "").concat(this.property);
            return this.constraints ? f(c) : this.children ? this.children.map(function (d) { return d.toString(t, !0, "".concat(r).concat(c), o); }).join("") : "";
        }
        else
            return "An instance of ".concat(s).concat(this.target ? this.target.constructor.name : "an object").concat(a, ` has failed the validation:
`) + (this.constraints ? f(this.property) : "") + (this.children ? this.children.map(function (d) { return d.toString(t, !0, i.property, o); }).join("") : "");
    }, e;
})();
var _ = (function () { function e() { } return e.isValid = function (t) { var n = this; return t !== "isValid" && t !== "getMessage" && Object.keys(this).map(function (r) { return n[r]; }).indexOf(t) !== -1; }, e.CUSTOM_VALIDATION = "customValidation", e.NESTED_VALIDATION = "nestedValidation", e.PROMISE_VALIDATION = "promiseValidation", e.CONDITIONAL_VALIDATION = "conditionalValidation", e.WHITELIST = "whitelistValidation", e.IS_DEFINED = "isDefined", e; })();
function tn(e) { return Array.isArray(e) ? e.join(", ") : (typeof e == "symbol" && (e = e.description), "".concat(e)); }
var Vt = (function () { function e() { } return e.replaceMessageSpecialTokens = function (t, n) { var r; return t instanceof Function ? r = t(n) : typeof t == "string" && (r = t), r && Array.isArray(n.constraints) && n.constraints.forEach(function (o, i) { r = r.replace(new RegExp("\\$constraint".concat(i + 1), "g"), tn(o)); }), r && n.value !== void 0 && n.value !== null && ["string", "boolean", "number"].includes(typeof n.value) && (r = r.replace(/\$value/g, n.value)), r && (r = r.replace(/\$property/g, n.property)), r && (r = r.replace(/\$target/g, n.targetName)), r; }, e; })();
var rt = function (e, t) { var n = typeof Symbol == "function" && e[Symbol.iterator]; if (!n)
    return e; var r = n.call(e), o, i = [], s; try {
    for (; (t === void 0 || t-- > 0) && !(o = r.next()).done;)
        i.push(o.value);
}
catch (a) {
    s = { error: a };
}
finally {
    try {
        o && !o.done && (n = r.return) && n.call(r);
    }
    finally {
        if (s)
            throw s.error;
    }
} return i; }, St = (function () {
    function e(t, n) { this.validator = t, this.validatorOptions = n, this.awaitingPromises = [], this.ignoreAsyncValidations = !1, this.metadataStorage = W(); }
    return e.prototype.execute = function (t, n, r) {
        var o = this, i, s;
        !this.metadataStorage.hasValidationMetaData && ((i = this.validatorOptions) === null || i === void 0 ? void 0 : i.enableDebugMessages) === !0 && console.warn(`No validation metadata found. No validation will be  performed. There are multiple possible reasons:
  - There may be multiple class-validator versions installed. You will need to flatten your dependencies to fix the issue.
  - This validation runs before any file with validation decorator was parsed by NodeJS.`);
        var a = this.validatorOptions ? this.validatorOptions.groups : void 0, p = this.validatorOptions && this.validatorOptions.strictGroups || !1, f = this.validatorOptions && this.validatorOptions.always || !1, c = ((s = this.validatorOptions) === null || s === void 0 ? void 0 : s.forbidUnknownValues) === void 0 || this.validatorOptions.forbidUnknownValues !== !1, d = this.metadataStorage.getTargetValidationMetadatas(t.constructor, n, f, p, a), u = this.metadataStorage.groupByPropertyName(d);
        if (c && !d.length) {
            var M = new xt;
            (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.target === void 0 || this.validatorOptions.validationError.target === !0) && (M.target = t), M.value = void 0, M.property = void 0, M.children = [], M.constraints = { unknownValue: "an unknown value was passed to the validate function" }, r.push(M);
            return;
        }
        this.validatorOptions && this.validatorOptions.whitelist && this.whitelist(t, u, r), Object.keys(u).forEach(function (T) { var V = t[T], v = u[T].filter(function (m) { return m.type === _.IS_DEFINED; }), x = u[T].filter(function (m) { return m.type !== _.IS_DEFINED && m.type !== _.WHITELIST; }); V instanceof Promise && x.find(function (m) { return m.type === _.PROMISE_VALIDATION; }) ? o.awaitingPromises.push(V.then(function (m) { o.performValidations(t, m, T, v, x, r); })) : o.performValidations(t, V, T, v, x, r); });
    }, e.prototype.whitelist = function (t, n, r) { var o = this, i = []; Object.keys(t).forEach(function (s) { (!n[s] || n[s].length === 0) && i.push(s); }), i.length > 0 && (this.validatorOptions && this.validatorOptions.forbidNonWhitelisted ? i.forEach(function (s) { var a, p = o.generateValidationError(t, t[s], s); p.constraints = (a = {}, a[_.WHITELIST] = "property ".concat(s, " should not exist"), a), p.children = void 0, r.push(p); }) : i.forEach(function (s) { return delete t[s]; })); }, e.prototype.stripEmptyErrors = function (t) { var n = this; return t.filter(function (r) { if (r.children && (r.children = n.stripEmptyErrors(r.children)), Object.keys(r.constraints).length === 0) {
        if (r.children.length === 0)
            return !1;
        delete r.constraints;
    } return !0; }); }, e.prototype.performValidations = function (t, n, r, o, i, s) { var a = i.filter(function (u) { return u.type === _.CUSTOM_VALIDATION; }), p = i.filter(function (u) { return u.type === _.NESTED_VALIDATION; }), f = i.filter(function (u) { return u.type === _.CONDITIONAL_VALIDATION; }), c = this.generateValidationError(t, n, r); s.push(c); var d = this.conditionalValidations(t, n, f); d && (this.customValidations(t, n, o, c), this.mapContexts(t, n, o, c), !(n === void 0 && this.validatorOptions && this.validatorOptions.skipUndefinedProperties === !0) && (n === null && this.validatorOptions && this.validatorOptions.skipNullProperties === !0 || n == null && this.validatorOptions && this.validatorOptions.skipMissingProperties === !0 || (this.customValidations(t, n, a, c), this.nestedValidations(n, p, c), this.mapContexts(t, n, i, c), this.mapContexts(t, n, a, c)))); }, e.prototype.generateValidationError = function (t, n, r) { var o = new xt; return (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.target === void 0 || this.validatorOptions.validationError.target === !0) && (o.target = t), (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.value === void 0 || this.validatorOptions.validationError.value === !0) && (o.value = n), o.property = r, o.children = [], o.constraints = {}, o; }, e.prototype.conditionalValidations = function (t, n, r) { return r.map(function (o) { return o.constraints[0](t, n); }).reduce(function (o, i) { return o && i; }, !0); }, e.prototype.customValidations = function (t, n, r, o) { var i = this; r.forEach(function (s) { var a = function () { var f = { targetName: t.constructor ? t.constructor.name : void 0, property: s.propertyName, object: t, value: n, constraints: s.constraints }; return f; }; if (s.validateIf) {
        var p = s.validateIf(t, n);
        if (!p)
            return;
    } i.metadataStorage.getTargetValidatorConstraints(s.constraintCls).forEach(function (f) { if (!(f.async && i.ignoreAsyncValidations) && !(i.validatorOptions && i.validatorOptions.stopAtFirstError && Object.keys(o.constraints || {}).length > 0)) {
        var c = a();
        if (!s.each || !(Array.isArray(n) || n instanceof Set || n instanceof Map)) {
            var d = f.instance.validate(n, c);
            if (ut(d)) {
                var u = d.then(function (S) { if (!S) {
                    var g = rt(i.createValidationError(t, n, s, f), 2), j = g[0], H = g[1];
                    o.constraints[j] = H, s.context && (o.contexts || (o.contexts = {}), o.contexts[j] = Object.assign(o.contexts[j] || {}, s.context));
                } });
                i.awaitingPromises.push(u);
            }
            else if (!d) {
                var M = rt(i.createValidationError(t, n, s, f), 2), T = M[0], V = M[1];
                o.constraints[T] = V;
            }
            return;
        }
        var v = wt(n), x = v.map(function (S) { return f.instance.validate(S, c); }), m = x.some(function (S) { return ut(S); });
        if (m) {
            var O = x.map(function (S) { return ut(S) ? S : Promise.resolve(S); }), l = Promise.all(O).then(function (S) { var g = S.every(function (st) { return st; }); if (!g) {
                var j = rt(i.createValidationError(t, n, s, f), 2), H = j[0], ot = j[1];
                o.constraints[H] = ot, s.context && (o.contexts || (o.contexts = {}), o.contexts[H] = Object.assign(o.contexts[H] || {}, s.context));
            } });
            i.awaitingPromises.push(l);
            return;
        }
        var y = x.every(function (S) { return S; });
        if (!y) {
            var A = rt(i.createValidationError(t, n, s, f), 2), T = A[0], V = A[1];
            o.constraints[T] = V;
        }
    } }); }); }, e.prototype.nestedValidations = function (t, n, r) { var o = this; t !== void 0 && n.forEach(function (i) { if (!(i.type !== _.NESTED_VALIDATION && i.type !== _.PROMISE_VALIDATION) && !(o.validatorOptions && o.validatorOptions.stopAtFirstError && Object.keys(r.constraints || {}).length > 0))
        if (Array.isArray(t) || t instanceof Set || t instanceof Map) {
            var s = t instanceof Set ? Array.from(t) : t;
            s.forEach(function (d, u) { o.performValidations(t, d, u.toString(), [], n, r.children); });
        }
        else if (t instanceof Object) {
            var a = typeof i.target == "string" ? i.target : i.target.name;
            o.execute(t, a, r.children);
        }
        else {
            var p = rt(o.createValidationError(i.target, t, i), 2), f = p[0], c = p[1];
            r.constraints[f] = c;
        } }); }, e.prototype.mapContexts = function (t, n, r, o) { var i = this; return r.forEach(function (s) { if (s.context) {
        var a = void 0;
        if (s.type === _.CUSTOM_VALIDATION) {
            var p = i.metadataStorage.getTargetValidatorConstraints(s.constraintCls);
            a = p[0];
        }
        var f = i.getConstraintType(s, a);
        o.constraints[f] && (o.contexts || (o.contexts = {}), o.contexts[f] = Object.assign(o.contexts[f] || {}, s.context));
    } }); }, e.prototype.createValidationError = function (t, n, r, o) { var i = t.constructor ? t.constructor.name : void 0, s = this.getConstraintType(r, o), a = { targetName: i, property: r.propertyName, object: t, value: n, constraints: r.constraints }, p = r.message || ""; !r.message && (!this.validatorOptions || this.validatorOptions && !this.validatorOptions.dismissDefaultMessages) && o && o.instance.defaultMessage instanceof Function && (p = o.instance.defaultMessage(a)); var f = Vt.replaceMessageSpecialTokens(p, a); return [s, f]; }, e.prototype.getConstraintType = function (t, n) { var r = n && n.name ? n.name : t.type; return r; }, e;
})();
var nn = function (e, t, n, r) { function o(i) { return i instanceof n ? i : new n(function (s) { s(i); }); } return new (n || (n = Promise))(function (i, s) { function a(c) { try {
    f(r.next(c));
}
catch (d) {
    s(d);
} } function p(c) { try {
    f(r.throw(c));
}
catch (d) {
    s(d);
} } function f(c) { c.done ? i(c.value) : o(c.value).then(a, p); } f((r = r.apply(e, t || [])).next()); }); }, en = function (e, t) { var n = { label: 0, sent: function () { if (i[0] & 1)
        throw i[1]; return i[1]; }, trys: [], ops: [] }, r, o, i, s; return s = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function () { return this; }), s; function a(f) { return function (c) { return p([f, c]); }; } function p(f) { if (r)
    throw new TypeError("Generator is already executing."); for (; s && (s = 0, f[0] && (n = 0)), n;)
    try {
        if (r = 1, o && (i = f[0] & 2 ? o.return : f[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, f[1])).done)
            return i;
        switch (o = 0, i && (f = [f[0] & 2, i.value]), f[0]) {
            case 0:
            case 1:
                i = f;
                break;
            case 4: return n.label++, { value: f[1], done: !1 };
            case 5:
                n.label++, o = f[1], f = [0];
                continue;
            case 7:
                f = n.ops.pop(), n.trys.pop();
                continue;
            default:
                if (i = n.trys, !(i = i.length > 0 && i[i.length - 1]) && (f[0] === 6 || f[0] === 2)) {
                    n = 0;
                    continue;
                }
                if (f[0] === 3 && (!i || f[1] > i[0] && f[1] < i[3])) {
                    n.label = f[1];
                    break;
                }
                if (f[0] === 6 && n.label < i[1]) {
                    n.label = i[1], i = f;
                    break;
                }
                if (i && n.label < i[2]) {
                    n.label = i[2], n.ops.push(f);
                    break;
                }
                i[2] && n.ops.pop(), n.trys.pop();
                continue;
        }
        f = t.call(e, n);
    }
    catch (c) {
        f = [6, c], o = 0;
    }
    finally {
        r = i = 0;
    } if (f[0] & 5)
    throw f[1]; return { value: f[0] ? f[1] : void 0, done: !0 }; } }, Et = (function () { function e() { } return e.prototype.validate = function (t, n, r) { return this.coreValidate(t, n, r); }, e.prototype.validateOrReject = function (t, n, r) { return nn(this, void 0, void 0, function () { var o; return en(this, function (i) { switch (i.label) {
    case 0: return [4, this.coreValidate(t, n, r)];
    case 1: return o = i.sent(), o.length ? [2, Promise.reject(o)] : [2];
} }); }); }, e.prototype.validateSync = function (t, n, r) { var o = typeof t == "string" ? n : t, i = typeof t == "string" ? r : n, s = typeof t == "string" ? t : void 0, a = new St(this, i); a.ignoreAsyncValidations = !0; var p = []; return a.execute(o, s, p), a.stripEmptyErrors(p); }, e.prototype.coreValidate = function (t, n, r) { var o = typeof t == "string" ? n : t, i = typeof t == "string" ? r : n, s = typeof t == "string" ? t : void 0, a = new St(this, i), p = []; return a.execute(o, s, p), Promise.all(a.awaitingPromises).then(function () { return a.stripEmptyErrors(p); }); }, e; })();
var rn = new ((function () { function e() { this.instances = []; } return e.prototype.get = function (t) { var n = this.instances.find(function (r) { return r.type === t; }); return n || (n = { type: t, object: new t }, this.instances.push(n)), n.object; }, e; })()), Ft, pt;
function q(e) { if (Ft)
    try {
        var t = Ft.get(e);
        if (t || !pt || !pt.fallback)
            return t;
    }
    catch (n) {
        if (!pt || !pt.fallbackOnErrors)
            throw n;
    } return rn.get(e); }
var Rt = (function () { function e(t, n, r) { r === void 0 && (r = !1), this.target = t, this.name = n, this.async = r; } return Object.defineProperty(e.prototype, "instance", { get: function () { return q(this.target); }, enumerable: !1, configurable: !0 }), e; })();
function Ut(e) { var t; if (e.validator instanceof Function) {
    t = e.validator;
    var n = q(gt).getTargetValidatorConstraints(e.validator);
    if (n.length > 1)
        throw "More than one implementation of ValidatorConstraintInterface found for validator on: ".concat(e.target.name, ":").concat(e.propertyName);
}
else {
    var r = e.validator;
    t = (function () { function i() { } return i.prototype.validate = function (s, a) { return r.validate(s, a); }, i.prototype.defaultMessage = function (s) { return r.defaultMessage ? r.defaultMessage(s) : ""; }, i; })(), W().addConstraintMetadata(new Rt(t, e.name, e.async));
} var o = { type: e.name && _.isValid(e.name) ? e.name : _.CUSTOM_VALIDATION, name: e.name, target: e.target, propertyName: e.propertyName, validationOptions: e.options, constraintCls: t, constraints: e.constraints }; W().addValidationMetadata(new Z(o)); }
function b(e, t) { return function (n) { var r = t && t.each ? "each value in " : ""; return e(r, n); }; }
function N(e, t) { return function (n, r) { Ut({ name: e.name, target: n.constructor, propertyName: r, options: t, constraints: e.constraints, validator: e.validator }); }; }
var on = "isOptional";
function P(e) { return function (t, n) { var r = { type: _.CONDITIONAL_VALIDATION, name: on, target: t.constructor, propertyName: n, constraints: [function (o, i) { return o[n] !== null && o[n] !== void 0; }], validationOptions: e }; W().addValidationMetadata(new Z(r)); }; }
var sn = "isIn";
function an(e, t) { return Array.isArray(t) && t.some(function (n) { return n === e; }); }
function Q(e, t) { return N({ name: sn, constraints: [e], validator: { validate: function (n, r) { return an(n, r?.constraints[0]); }, defaultMessage: b(function (n) { return n + "$property must be one of the following values: $constraint1"; }, t) } }, t); }
var fn = "min";
function un(e, t) { return typeof e == "number" && typeof t == "number" && e >= t; }
function Bt(e, t) { return N({ name: fn, constraints: [e], validator: { validate: function (n, r) { return un(n, r?.constraints[0]); }, defaultMessage: b(function (n) { return n + "$property must not be less than $constraint1"; }, t) } }, t); }
var pn = "isBoolean";
function cn(e) { return e instanceof Boolean || typeof e == "boolean"; }
function ct(e) { return N({ name: pn, validator: { validate: function (t, n) { return cn(t); }, defaultMessage: b(function (t) { return t + "$property must be a boolean value"; }, e) } }, e); }
var dn = "isNumber";
function ln(e, t) { if (t === void 0 && (t = {}), typeof e != "number")
    return !1; if (e === 1 / 0 || e === -1 / 0)
    return !!t.allowInfinity; if (Number.isNaN(e))
    return !!t.allowNaN; if (t.maxDecimalPlaces !== void 0) {
    var n = 0;
    if (e % 1 !== 0 && (n = e.toString().split(".")[1].length), n > t.maxDecimalPlaces)
        return !1;
} return Number.isFinite(e); }
function J(e, t) { return e === void 0 && (e = {}), N({ name: dn, constraints: [e], validator: { validate: function (n, r) { return ln(n, r?.constraints[0]); }, defaultMessage: b(function (n) { return n + "$property must be a number conforming to the specified constraints"; }, t) } }, t); }
var hn = "isInt";
function yn(e) { return typeof e == "number" && Number.isInteger(e); }
function jt(e) { return N({ name: hn, validator: { validate: function (t, n) { return yn(t); }, defaultMessage: b(function (t) { return t + "$property must be an integer number"; }, e) } }, e); }
var vn = "isString";
function mn(e) { return e instanceof String || typeof e == "string"; }
function L(e) { return N({ name: vn, validator: { validate: function (t, n) { return mn(t); }, defaultMessage: b(function (t) { return t + "$property must be a string"; }, e) } }, e); }
var gn = "isObject";
function xn(e) { return e != null && (typeof e == "object" || typeof e == "function") && !Array.isArray(e); }
function Ht(e) { return N({ name: gn, validator: { validate: function (t, n) { return xn(t); }, defaultMessage: b(function (t) { return t + "$property must be an object"; }, e) } }, e); }
function kt(e, t, n) { return typeof e == "string" ? q(Et).validateSync(e, t, n) : q(Et).validateSync(e, t); }
var Ot = function (e, t, n, r) { var o = arguments.length, i = o < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, s; if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(e, t, n, r);
else
    for (var a = e.length - 1; a >= 0; a--)
        (s = e[a]) && (i = (o < 3 ? s(i) : o > 3 ? s(t, n, i) : s(t, n)) || i); return o > 3 && i && Object.defineProperty(t, n, i), i; }, B = class {
    schemaVersion;
};
Ot([J()], B.prototype, "schemaVersion", void 0);
var w = class extends B {
    moduleType;
    instanceId;
};
Ot([L()], w.prototype, "moduleType", void 0);
Ot([L()], w.prototype, "instanceId", void 0);
var D = function (e, t, n, r) { var o = arguments.length, i = o < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, s; if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(e, t, n, r);
else
    for (var a = e.length - 1; a >= 0; a--)
        (s = e[a]) && (i = (o < 3 ? s(i) : o > 3 ? s(t, n, i) : s(t, n)) || i); return o > 3 && i && Object.defineProperty(t, n, i), i; }, Sn = ["success", "warning", "error", "info"], En = ["loading", "loaded", "success", "warning", "error", "dirty"], K = class extends B {
    moduleType;
    title;
    initialData;
};
D([L()], K.prototype, "moduleType", void 0);
D([P(), L()], K.prototype, "title", void 0);
D([P(), Ht()], K.prototype, "initialData", void 0);
var dt = class extends w {
}, lt = class extends w {
}, X = class extends w {
    title;
    status;
};
D([P(), L()], X.prototype, "title", void 0);
D([P(), Q(En)], X.prototype, "status", void 0);
var G = class extends B {
    type;
    message;
    title;
    duration;
};
D([Q(Sn)], G.prototype, "type", void 0);
D([L()], G.prototype, "message", void 0);
D([P(), L()], G.prototype, "title", void 0);
D([P(), J()], G.prototype, "duration", void 0);
var ht = class extends w {
}, tt = class extends w {
    message;
    code;
};
D([L()], tt.prototype, "message", void 0);
D([P(), L()], tt.prototype, "code", void 0);
var nt = class extends w {
    minHeightPx;
    reason;
};
D([jt(), Bt(0)], nt.prototype, "minHeightPx", void 0);
D([P(), L()], nt.prototype, "reason", void 0);
var R = function (e, t, n, r) { var o = arguments.length, i = o < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, s; if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(e, t, n, r);
else
    for (var a = e.length - 1; a >= 0; a--)
        (s = e[a]) && (i = (o < 3 ? s(i) : o > 3 ? s(t, n, i) : s(t, n)) || i); return o > 3 && i && Object.defineProperty(t, n, i), i; }, On = ["50%", "100%"], An = ["drag-start", "drag-end", "dropped"], Mn = ["collapsed"], F = class extends w {
    size;
    width;
    height;
    isCollapsed;
    isFullscreen;
    dragState;
    previewMode;
};
R([Q(On)], F.prototype, "size", void 0);
R([J()], F.prototype, "width", void 0);
R([J()], F.prototype, "height", void 0);
R([ct()], F.prototype, "isCollapsed", void 0);
R([ct()], F.prototype, "isFullscreen", void 0);
R([P(), Q(An)], F.prototype, "dragState", void 0);
R([P(), Q(Mn)], F.prototype, "previewMode", void 0);
var it = class extends B {
    theme;
};
R([L()], it.prototype, "theme", void 0);
var et = class extends w {
    visible;
    reason;
};
R([ct()], et.prototype, "visible", void 0);
R([P(), L()], et.prototype, "reason", void 0);
var Tn = { [U.REQUEST_ADD_MODULE]: K, [U.REQUEST_FULLSCREEN]: dt, [U.REQUEST_REMOVE]: lt, [U.UPDATE_HEADER]: X, [U.SHOW_NOTIFICATION]: G, [U.MODULE_READY]: ht, [U.MODULE_ERROR]: tt, [U.UPDATE_MIN_HEIGHT]: nt }, _n = { [ft.MODULE_STATE]: F, [ft.THEME_CHANGED]: it, [ft.VISIBILITY_CHANGED]: et }, $t = vt(vt({}, Tn), _n);
function yt(e, t) { Ln(e, t); let n = $t[e]; Cn(e, n), bn(e, t); let r = bt(n, t), o = kt(r); Nn(e, o); }
function In(e) { return e !== null && typeof e == "object"; }
function Ln(e, t) { if (!In(t))
    throw new $(`Event "${e}" detail must be a non-null object.`, { eventType: e }); }
function Cn(e, t) { if (!t)
    throw new $(`Unknown event type "${e}": no payload DTO registered.`, { eventType: e }); }
function bn(e, t) { let n = t.schemaVersion; if (n === void 0)
    throw new $(`Event "${e}" payload is missing the required "schemaVersion".`, { eventType: e }); if (n !== mt)
    throw new $(`Event "${e}" payload schemaVersion ${String(n)} does not match required version ${mt}.`, { eventType: e }); }
function Nn(e, t) { if (t.length !== 0)
    throw new $(`Validation failed for event "${e}".`, { eventType: e, errors: wn(t) }); }
function wn(e) { return e.map(t => ({ property: t.property, constraints: Object.values(t.constraints ?? {}) })); }
function Gt(e, t) { return yt(e, t), new CustomEvent(e, { detail: t, bubbles: !0 }); }
function zt(e, t) { return Gt(e, t); }
function Yt(e, t) { return Gt(e, t); }
function Dr(e, t) { return Wt(e, t); }
function Vr(e, t) { return Wt(e, t); }
function Wt(e, t) { return e instanceof CustomEvent && e.type === t; }
function Ur(e, t, n) { qt(n?.target).dispatchEvent(zt(e, t)); }
function Br(e, t, n) { qt(n?.target).dispatchEvent(Yt(e, t)); }
function qt(e) { if (e)
    return e; let t = globalThis.window; if (t)
    return t; throw new Error("mfe-events: dispatch target omitted and `window` is undefined in this environment; pass an explicit EventTarget."); }
function Qt(e, t) { yt(e, t); }
function kr(e, t) { Qt(e, t); }
function $r(e, t) { Qt(e, t); }
export { U as MFE_EVENTS, $ as MfeEventValidationError, mt as SCHEMA_VERSION, ft as SHELL_EVENTS, kr as assertMfePayload, $r as assertShellPayload, zt as createMfeEvent, Yt as createShellEvent, Ur as dispatchMfeEvent, Br as dispatchShellEvent, Dr as isMfeEvent, Vr as isShellEvent };
