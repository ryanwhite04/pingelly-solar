// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

System.register("https://ethereal-incredible-freedom.glitch.me/roughjs@4.3.1/bundled/rough.esm", [], function (exports_1, context_1) {
    "use strict";
    var i, c, l, u, f, p, d, g, M, x, K, U, Y, tt, et, st;
    var __moduleName = context_1 && context_1.id;
    function t(t, e, s) { if (t && t.length) {
        const [n, o] = e, a = Math.PI / 180 * s, r = Math.cos(a), h = Math.sin(a);
        t.forEach(t => { const [e, s] = t; t[0] = (e - n) * r - (s - o) * h + n, t[1] = (e - n) * h + (s - o) * r + o; });
    } }
    function e(t) { const e = t[0], s = t[1]; return Math.sqrt(Math.pow(e[0] - s[0], 2) + Math.pow(e[1] - s[1], 2)); }
    function s(t, e, s, n) { const o = e[1] - t[1], a = t[0] - e[0], r = o * t[0] + a * t[1], h = n[1] - s[1], i = s[0] - n[0], c = h * s[0] + i * s[1], l = o * i - h * a; return l ? [(i * r - a * c) / l, (o * c - h * r) / l] : null; }
    function n(t, e, s) { const n = t.length; if (n < 3)
        return !1; const h = [Number.MAX_SAFE_INTEGER, s], i = [e, s]; let c = 0; for (let e = 0; e < n; e++) {
        const s = t[e], l = t[(e + 1) % n];
        if (r(s, l, i, h)) {
            if (0 === a(s, i, l))
                return o(s, i, l);
            c++;
        }
    } return c % 2 == 1; }
    function o(t, e, s) { return e[0] <= Math.max(t[0], s[0]) && e[0] >= Math.min(t[0], s[0]) && e[1] <= Math.max(t[1], s[1]) && e[1] >= Math.min(t[1], s[1]); }
    function a(t, e, s) { const n = (e[1] - t[1]) * (s[0] - e[0]) - (e[0] - t[0]) * (s[1] - e[1]); return 0 === n ? 0 : n > 0 ? 1 : 2; }
    function r(t, e, s, n) { const r = a(t, e, s), h = a(t, e, n), i = a(s, n, t), c = a(s, n, e); return r !== h && i !== c || !(0 !== r || !o(t, s, e)) || !(0 !== h || !o(t, n, e)) || !(0 !== i || !o(s, t, n)) || !(0 !== c || !o(s, e, n)); }
    function h(e, s) { const n = [0, 0], o = Math.round(s.hachureAngle + 90); o && t(e, n, o); const a = function (t, e) { const s = [...t]; s[0].join(",") !== s[s.length - 1].join(",") && s.push([s[0][0], s[0][1]]); const n = []; if (s && s.length > 2) {
        let t = e.hachureGap;
        t < 0 && (t = 4 * e.strokeWidth), t = Math.max(t, .1);
        const o = [];
        for (let t = 0; t < s.length - 1; t++) {
            const e = s[t], n = s[t + 1];
            if (e[1] !== n[1]) {
                const t = Math.min(e[1], n[1]);
                o.push({ ymin: t, ymax: Math.max(e[1], n[1]), x: t === e[1] ? e[0] : n[0], islope: (n[0] - e[0]) / (n[1] - e[1]) });
            }
        }
        if (o.sort((t, e) => t.ymin < e.ymin ? -1 : t.ymin > e.ymin ? 1 : t.x < e.x ? -1 : t.x > e.x ? 1 : t.ymax === e.ymax ? 0 : (t.ymax - e.ymax) / Math.abs(t.ymax - e.ymax)), !o.length)
            return n;
        let a = [], r = o[0].ymin;
        for (; a.length || o.length;) {
            if (o.length) {
                let t = -1;
                for (let e = 0; e < o.length && !(o[e].ymin > r); e++)
                    t = e;
                o.splice(0, t + 1).forEach(t => { a.push({ s: r, edge: t }); });
            }
            if (a = a.filter(t => !(t.edge.ymax <= r)), a.sort((t, e) => t.edge.x === e.edge.x ? 0 : (t.edge.x - e.edge.x) / Math.abs(t.edge.x - e.edge.x)), a.length > 1)
                for (let t = 0; t < a.length; t += 2) {
                    const e = t + 1;
                    if (e >= a.length)
                        break;
                    const s = a[t].edge, o = a[e].edge;
                    n.push([[Math.round(s.x), r], [Math.round(o.x), r]]);
                }
            r += t, a.forEach(e => { e.edge.x = e.edge.x + t * e.edge.islope; });
        }
    } return n; }(e, s); return o && (t(e, n, -o), function (e, s, n) { const o = []; e.forEach(t => o.push(...t)), t(o, s, n); }(a, n, -o)), a; }
    function k(t, e) { return t.type === e; }
    function b(t) { const e = [], s = function (t) { const e = new Array(); for (; "" !== t;)
        if (t.match(/^([ \t\r\n,]+)/))
            t = t.substr(RegExp.$1.length);
        else if (t.match(/^([aAcChHlLmMqQsStTvVzZ])/))
            e[e.length] = { type: 0, text: RegExp.$1 }, t = t.substr(RegExp.$1.length);
        else {
            if (!t.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/))
                return [];
            e[e.length] = { type: 1, text: "" + parseFloat(RegExp.$1) }, t = t.substr(RegExp.$1.length);
        } return e[e.length] = { type: 2, text: "" }, e; }(t); let n = "BOD", o = 0, a = s[o]; for (; !k(a, 2);) {
        let r = 0;
        const h = [];
        if ("BOD" === n) {
            if ("M" !== a.text && "m" !== a.text)
                return b("M0,0" + t);
            o++, r = M[a.text], n = a.text;
        }
        else
            k(a, 1) ? r = M[n] : (o++, r = M[a.text], n = a.text);
        if (!(o + r < s.length))
            throw new Error("Path data ended short");
        for (let t = o; t < o + r; t++) {
            const e = s[t];
            if (!k(e, 1))
                throw new Error("Param not a number: " + n + "," + e.text);
            h[h.length] = +e.text;
        }
        if ("number" != typeof M[n])
            throw new Error("Bad segment: " + n);
        {
            const t = { key: n, data: h };
            e.push(t), o += r, a = s[o], "M" === n && (n = "L"), "m" === n && (n = "l");
        }
    } return e; }
    function y(t) { let e = 0, s = 0, n = 0, o = 0; const a = []; for (const { key: r, data: h } of t)
        switch (r) {
            case "M":
                a.push({ key: "M", data: [...h] }), [e, s] = h, [n, o] = h;
                break;
            case "m":
                e += h[0], s += h[1], a.push({ key: "M", data: [e, s] }), n = e, o = s;
                break;
            case "L":
                a.push({ key: "L", data: [...h] }), [e, s] = h;
                break;
            case "l":
                e += h[0], s += h[1], a.push({ key: "L", data: [e, s] });
                break;
            case "C":
                a.push({ key: "C", data: [...h] }), e = h[4], s = h[5];
                break;
            case "c": {
                const t = h.map((t, n) => n % 2 ? t + s : t + e);
                a.push({ key: "C", data: t }), e = t[4], s = t[5];
                break;
            }
            case "Q":
                a.push({ key: "Q", data: [...h] }), e = h[2], s = h[3];
                break;
            case "q": {
                const t = h.map((t, n) => n % 2 ? t + s : t + e);
                a.push({ key: "Q", data: t }), e = t[2], s = t[3];
                break;
            }
            case "A":
                a.push({ key: "A", data: [...h] }), e = h[5], s = h[6];
                break;
            case "a":
                e += h[5], s += h[6], a.push({ key: "A", data: [h[0], h[1], h[2], h[3], h[4], e, s] });
                break;
            case "H":
                a.push({ key: "H", data: [...h] }), e = h[0];
                break;
            case "h":
                e += h[0], a.push({ key: "H", data: [e] });
                break;
            case "V":
                a.push({ key: "V", data: [...h] }), s = h[0];
                break;
            case "v":
                s += h[0], a.push({ key: "V", data: [s] });
                break;
            case "S":
                a.push({ key: "S", data: [...h] }), e = h[2], s = h[3];
                break;
            case "s": {
                const t = h.map((t, n) => n % 2 ? t + s : t + e);
                a.push({ key: "S", data: t }), e = t[2], s = t[3];
                break;
            }
            case "T":
                a.push({ key: "T", data: [...h] }), e = h[0], s = h[1];
                break;
            case "t":
                e += h[0], s += h[1], a.push({ key: "T", data: [e, s] });
                break;
            case "Z":
            case "z": a.push({ key: "Z", data: [] }), e = n, s = o;
        } return a; }
    function m(t) { const e = []; let s = "", n = 0, o = 0, a = 0, r = 0, h = 0, i = 0; for (const { key: c, data: l } of t) {
        switch (c) {
            case "M":
                e.push({ key: "M", data: [...l] }), [n, o] = l, [a, r] = l;
                break;
            case "C":
                e.push({ key: "C", data: [...l] }), n = l[4], o = l[5], h = l[2], i = l[3];
                break;
            case "L":
                e.push({ key: "L", data: [...l] }), [n, o] = l;
                break;
            case "H":
                n = l[0], e.push({ key: "L", data: [n, o] });
                break;
            case "V":
                o = l[0], e.push({ key: "L", data: [n, o] });
                break;
            case "S": {
                let t = 0, a = 0;
                "C" === s || "S" === s ? (t = n + (n - h), a = o + (o - i)) : (t = n, a = o), e.push({ key: "C", data: [t, a, ...l] }), h = l[0], i = l[1], n = l[2], o = l[3];
                break;
            }
            case "T": {
                const [t, a] = l;
                let r = 0, c = 0;
                "Q" === s || "T" === s ? (r = n + (n - h), c = o + (o - i)) : (r = n, c = o);
                const u = n + 2 * (r - n) / 3, f = o + 2 * (c - o) / 3, p = t + 2 * (r - t) / 3, d = a + 2 * (c - a) / 3;
                e.push({ key: "C", data: [u, f, p, d, t, a] }), h = r, i = c, n = t, o = a;
                break;
            }
            case "Q": {
                const [t, s, a, r] = l, c = n + 2 * (t - n) / 3, u = o + 2 * (s - o) / 3, f = a + 2 * (t - a) / 3, p = r + 2 * (s - r) / 3;
                e.push({ key: "C", data: [c, u, f, p, a, r] }), h = t, i = s, n = a, o = r;
                break;
            }
            case "A": {
                const t = Math.abs(l[0]), s = Math.abs(l[1]), a = l[2], r = l[3], h = l[4], i = l[5], c = l[6];
                if (0 === t || 0 === s)
                    e.push({ key: "C", data: [n, o, i, c, i, c] }), n = i, o = c;
                else if (n !== i || o !== c) {
                    P(n, o, i, c, t, s, a, r, h).forEach(function (t) { e.push({ key: "C", data: t }); }), n = i, o = c;
                }
                break;
            }
            case "Z": e.push({ key: "Z", data: [] }), n = a, o = r;
        }
        s = c;
    } return e; }
    function w(t, e, s) { return [t * Math.cos(s) - e * Math.sin(s), t * Math.sin(s) + e * Math.cos(s)]; }
    function P(t, e, s, n, o, a, r, h, i, c) { const l = (u = r, Math.PI * u / 180); var u; let f = [], p = 0, d = 0, g = 0, M = 0; if (c)
        [p, d, g, M] = c;
    else {
        [t, e] = w(t, e, -l), [s, n] = w(s, n, -l);
        const r = (t - s) / 2, c = (e - n) / 2;
        let u = r * r / (o * o) + c * c / (a * a);
        u > 1 && (u = Math.sqrt(u), o *= u, a *= u);
        const f = o * o, k = a * a, b = f * k - f * c * c - k * r * r, y = f * c * c + k * r * r, m = (h === i ? -1 : 1) * Math.sqrt(Math.abs(b / y));
        g = m * o * c / a + (t + s) / 2, M = m * -a * r / o + (e + n) / 2, p = Math.asin(parseFloat(((e - M) / a).toFixed(9))), d = Math.asin(parseFloat(((n - M) / a).toFixed(9))), t < g && (p = Math.PI - p), s < g && (d = Math.PI - d), p < 0 && (p = 2 * Math.PI + p), d < 0 && (d = 2 * Math.PI + d), i && p > d && (p -= 2 * Math.PI), !i && d > p && (d -= 2 * Math.PI);
    } let k = d - p; if (Math.abs(k) > 120 * Math.PI / 180) {
        const t = d, e = s, h = n;
        d = i && d > p ? p + 120 * Math.PI / 180 * 1 : p + 120 * Math.PI / 180 * -1, f = P(s = g + o * Math.cos(d), n = M + a * Math.sin(d), e, h, o, a, r, 0, i, [d, t, g, M]);
    } k = d - p; const b = Math.cos(p), y = Math.sin(p), m = Math.cos(d), x = Math.sin(d), v = Math.tan(k / 4), O = 4 / 3 * o * v, S = 4 / 3 * a * v, L = [t, e], T = [t + O * y, e - S * b], I = [s + O * x, n - S * m], A = [s, n]; if (T[0] = 2 * L[0] - T[0], T[1] = 2 * L[1] - T[1], c)
        return [T, I, A].concat(f); {
        f = [T, I, A].concat(f);
        const t = [];
        for (let e = 0; e < f.length; e += 3) {
            const s = w(f[e][0], f[e][1], l), n = w(f[e + 1][0], f[e + 1][1], l), o = w(f[e + 2][0], f[e + 2][1], l);
            t.push([s[0], s[1], n[0], n[1], o[0], o[1]]);
        }
        return t;
    } }
    function v(t, e, s, n, o) { return { type: "path", ops: z(t, e, s, n, o) }; }
    function O(t, e, s) { const n = (t || []).length; if (n > 2) {
        const o = [];
        for (let e = 0; e < n - 1; e++)
            o.push(...z(t[e][0], t[e][1], t[e + 1][0], t[e + 1][1], s));
        return e && o.push(...z(t[n - 1][0], t[n - 1][1], t[0][0], t[0][1], s)), { type: "path", ops: o };
    } return 2 === n ? v(t[0][0], t[0][1], t[1][0], t[1][1], s) : { type: "path", ops: [] }; }
    function S(t, e, s, n, o) { return function (t, e) { return O(t, !0, e); }([[t, e], [t + s, e], [t + s, e + n], [t, e + n]], o); }
    function L(t, e) { let s = $(t, 1 * (1 + .2 * e.roughness), e); if (!e.disableMultiStroke) {
        const n = $(t, 1.5 * (1 + .22 * e.roughness), function (t) { const e = Object.assign({}, t); e.randomizer = void 0, t.seed && (e.seed = t.seed + 1); return e; }(e));
        s = s.concat(n);
    } return { type: "path", ops: s }; }
    function T(t, e, s) { const n = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)), o = Math.max(s.curveStepCount, s.curveStepCount / Math.sqrt(200) * n), a = 2 * Math.PI / o; let r = Math.abs(t / 2), h = Math.abs(e / 2); const i = 1 - s.curveFitting; return r += W(r * i, s), h += W(h * i, s), { increment: a, rx: r, ry: h }; }
    function I(t, e, s, n) { const [o, a] = q(n.increment, t, e, n.rx, n.ry, 1, n.increment * E(.1, E(.4, 1, s), s), s); let r = G(o, null, s); if (!s.disableMultiStroke) {
        const [o] = q(n.increment, t, e, n.rx, n.ry, 1.5, 0, s), a = G(o, null, s);
        r = r.concat(a);
    } return { estimatedPoints: a, opset: { type: "path", ops: r } }; }
    function A(t, e, s, n, o, a, r, h, i) { const c = t, l = e; let u = Math.abs(s / 2), f = Math.abs(n / 2); u += W(.01 * u, i), f += W(.01 * f, i); let p = o, d = a; for (; p < 0;)
        p += 2 * Math.PI, d += 2 * Math.PI; d - p > 2 * Math.PI && (p = 0, d = 2 * Math.PI); const g = 2 * Math.PI / i.curveStepCount, M = Math.min(g / 2, (d - p) / 2), k = F(M, c, l, u, f, p, d, 1, i); if (!i.disableMultiStroke) {
        const t = F(M, c, l, u, f, p, d, 1.5, i);
        k.push(...t);
    } return r && (h ? k.push(...z(c, l, c + u * Math.cos(p), l + f * Math.sin(p), i), ...z(c, l, c + u * Math.cos(d), l + f * Math.sin(d), i)) : k.push({ op: "lineTo", data: [c, l] }, { op: "lineTo", data: [c + u * Math.cos(p), l + f * Math.sin(p)] })), { type: "path", ops: k }; }
    function _(t, e) { const s = []; if (t.length) {
        const n = e.maxRandomnessOffset || 0, o = t.length;
        if (o > 2) {
            s.push({ op: "move", data: [t[0][0] + W(n, e), t[0][1] + W(n, e)] });
            for (let a = 1; a < o; a++)
                s.push({ op: "lineTo", data: [t[a][0] + W(n, e), t[a][1] + W(n, e)] });
        }
    } return { type: "fillPath", ops: s }; }
    function C(t, e) { return function (t, e) { let s = t.fillStyle || "hachure"; if (!d[s])
        switch (s) {
            case "zigzag":
                d[s] || (d[s] = new c(e));
                break;
            case "cross-hatch":
                d[s] || (d[s] = new l(e));
                break;
            case "dots":
                d[s] || (d[s] = new u(e));
                break;
            case "dashed":
                d[s] || (d[s] = new f(e));
                break;
            case "zigzag-line":
                d[s] || (d[s] = new p(e));
                break;
            case "hachure":
            default: s = "hachure", d[s] || (d[s] = new i(e));
        } return d[s]; }(e, x).fillPolygon(t, e); }
    function D(t) { return t.randomizer || (t.randomizer = new g(t.seed || 0)), t.randomizer.next(); }
    function E(t, e, s, n = 1) { return s.roughness * n * (D(s) * (e - t) + t); }
    function W(t, e, s = 1) { return E(-t, t, e, s); }
    function z(t, e, s, n, o, a = !1) { const r = a ? o.disableMultiStrokeFill : o.disableMultiStroke, h = R(t, e, s, n, o, !0, !1); if (r)
        return h; const i = R(t, e, s, n, o, !0, !0); return h.concat(i); }
    function R(t, e, s, n, o, a, r) { const h = Math.pow(t - s, 2) + Math.pow(e - n, 2), i = Math.sqrt(h); let c = 1; c = i < 200 ? 1 : i > 500 ? .4 : -.0016668 * i + 1.233334; let l = o.maxRandomnessOffset || 0; l * l * 100 > h && (l = i / 10); const u = l / 2, f = .2 + .2 * D(o); let p = o.bowing * o.maxRandomnessOffset * (n - e) / 200, d = o.bowing * o.maxRandomnessOffset * (t - s) / 200; p = W(p, o, c), d = W(d, o, c); const g = [], M = () => W(u, o, c), k = () => W(l, o, c); return a && (r ? g.push({ op: "move", data: [t + M(), e + M()] }) : g.push({ op: "move", data: [t + W(l, o, c), e + W(l, o, c)] })), r ? g.push({ op: "bcurveTo", data: [p + t + (s - t) * f + M(), d + e + (n - e) * f + M(), p + t + 2 * (s - t) * f + M(), d + e + 2 * (n - e) * f + M(), s + M(), n + M()] }) : g.push({ op: "bcurveTo", data: [p + t + (s - t) * f + k(), d + e + (n - e) * f + k(), p + t + 2 * (s - t) * f + k(), d + e + 2 * (n - e) * f + k(), s + k(), n + k()] }), g; }
    function $(t, e, s) { const n = []; n.push([t[0][0] + W(e, s), t[0][1] + W(e, s)]), n.push([t[0][0] + W(e, s), t[0][1] + W(e, s)]); for (let o = 1; o < t.length; o++)
        n.push([t[o][0] + W(e, s), t[o][1] + W(e, s)]), o === t.length - 1 && n.push([t[o][0] + W(e, s), t[o][1] + W(e, s)]); return G(n, null, s); }
    function G(t, e, s) { const n = t.length, o = []; if (n > 3) {
        const a = [], r = 1 - s.curveTightness;
        o.push({ op: "move", data: [t[1][0], t[1][1]] });
        for (let e = 1; e + 2 < n; e++) {
            const s = t[e];
            a[0] = [s[0], s[1]], a[1] = [s[0] + (r * t[e + 1][0] - r * t[e - 1][0]) / 6, s[1] + (r * t[e + 1][1] - r * t[e - 1][1]) / 6], a[2] = [t[e + 1][0] + (r * t[e][0] - r * t[e + 2][0]) / 6, t[e + 1][1] + (r * t[e][1] - r * t[e + 2][1]) / 6], a[3] = [t[e + 1][0], t[e + 1][1]], o.push({ op: "bcurveTo", data: [a[1][0], a[1][1], a[2][0], a[2][1], a[3][0], a[3][1]] });
        }
        if (e && 2 === e.length) {
            const t = s.maxRandomnessOffset;
            o.push({ op: "lineTo", data: [e[0] + W(t, s), e[1] + W(t, s)] });
        }
    }
    else
        3 === n ? (o.push({ op: "move", data: [t[1][0], t[1][1]] }), o.push({ op: "bcurveTo", data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]] })) : 2 === n && o.push(...z(t[0][0], t[0][1], t[1][0], t[1][1], s)); return o; }
    function q(t, e, s, n, o, a, r, h) { const i = [], c = [], l = W(.5, h) - Math.PI / 2; c.push([W(a, h) + e + .9 * n * Math.cos(l - t), W(a, h) + s + .9 * o * Math.sin(l - t)]); for (let r = l; r < 2 * Math.PI + l - .01; r += t) {
        const t = [W(a, h) + e + n * Math.cos(r), W(a, h) + s + o * Math.sin(r)];
        i.push(t), c.push(t);
    } return c.push([W(a, h) + e + n * Math.cos(l + 2 * Math.PI + .5 * r), W(a, h) + s + o * Math.sin(l + 2 * Math.PI + .5 * r)]), c.push([W(a, h) + e + .98 * n * Math.cos(l + r), W(a, h) + s + .98 * o * Math.sin(l + r)]), c.push([W(a, h) + e + .9 * n * Math.cos(l + .5 * r), W(a, h) + s + .9 * o * Math.sin(l + .5 * r)]), [c, i]; }
    function F(t, e, s, n, o, a, r, h, i) { const c = a + W(.1, i), l = []; l.push([W(h, i) + e + .9 * n * Math.cos(c - t), W(h, i) + s + .9 * o * Math.sin(c - t)]); for (let a = c; a <= r; a += t)
        l.push([W(h, i) + e + n * Math.cos(a), W(h, i) + s + o * Math.sin(a)]); return l.push([e + n * Math.cos(r), s + o * Math.sin(r)]), l.push([e + n * Math.cos(r), s + o * Math.sin(r)]), G(l, null, i); }
    function j(t, e, s, n, o, a, r, h) { const i = [], c = [h.maxRandomnessOffset || 1, (h.maxRandomnessOffset || 1) + .3]; let l = [0, 0]; const u = h.disableMultiStroke ? 1 : 2; for (let f = 0; f < u; f++)
        0 === f ? i.push({ op: "move", data: [r[0], r[1]] }) : i.push({ op: "move", data: [r[0] + W(c[0], h), r[1] + W(c[0], h)] }), l = [o + W(c[f], h), a + W(c[f], h)], i.push({ op: "bcurveTo", data: [t + W(c[f], h), e + W(c[f], h), s + W(c[f], h), n + W(c[f], h), l[0], l[1]] }); return i; }
    function N(t) { return [...t]; }
    function Z(t, e) { return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2); }
    function Q(t, e, s) { const n = Z(e, s); if (0 === n)
        return Z(t, e); let o = ((t[0] - e[0]) * (s[0] - e[0]) + (t[1] - e[1]) * (s[1] - e[1])) / n; return o = Math.max(0, Math.min(1, o)), Z(t, H(e, s, o)); }
    function H(t, e, s) { return [t[0] + (e[0] - t[0]) * s, t[1] + (e[1] - t[1]) * s]; }
    function V(t, e, s, n) { const o = n || []; if (function (t, e) { const s = t[e + 0], n = t[e + 1], o = t[e + 2], a = t[e + 3]; let r = 3 * n[0] - 2 * s[0] - a[0]; r *= r; let h = 3 * n[1] - 2 * s[1] - a[1]; h *= h; let i = 3 * o[0] - 2 * a[0] - s[0]; i *= i; let c = 3 * o[1] - 2 * a[1] - s[1]; return c *= c, r < i && (r = i), h < c && (h = c), r + h; }(t, e) < s) {
        const s = t[e + 0];
        if (o.length) {
            (a = o[o.length - 1], r = s, Math.sqrt(Z(a, r))) > 1 && o.push(s);
        }
        else
            o.push(s);
        o.push(t[e + 3]);
    }
    else {
        const n = .5, a = t[e + 0], r = t[e + 1], h = t[e + 2], i = t[e + 3], c = H(a, r, n), l = H(r, h, n), u = H(h, i, n), f = H(c, l, n), p = H(l, u, n), d = H(f, p, n);
        V([a, c, f, d], 0, s, o), V([d, p, u, i], 0, s, o);
    } var a, r; return o; }
    function B(t, e) { return X(t, 0, t.length, e); }
    function X(t, e, s, n, o) { const a = o || [], r = t[e], h = t[s - 1]; let i = 0, c = 1; for (let n = e + 1; n < s - 1; ++n) {
        const e = Q(t[n], r, h);
        e > i && (i = e, c = n);
    } return Math.sqrt(i) > n ? (X(t, e, c + 1, n, a), X(t, c, s, n, a)) : (a.length || a.push(r), a.push(h)), a; }
    function J(t, e = .15, s) { const n = [], o = (t.length - 1) / 3; for (let s = 0; s < o; s++) {
        V(t, 3 * s, e, n);
    } return s && s > 0 ? X(n, 0, n.length, s) : n; }
    return {
        setters: [],
        execute: function () {
            i = class i {
                constructor(t) { this.helper = t; }
                fillPolygon(t, e) { return this._fillPolygon(t, e); }
                _fillPolygon(t, e, s = !1) { let n = h(t, e); if (s) {
                    const e = this.connectingLines(t, n);
                    n = n.concat(e);
                } return { type: "fillSketch", ops: this.renderLines(n, e) }; }
                renderLines(t, e) { const s = []; for (const n of t)
                    s.push(...this.helper.doubleLineOps(n[0][0], n[0][1], n[1][0], n[1][1], e)); return s; }
                connectingLines(t, s) { const n = []; if (s.length > 1)
                    for (let o = 1; o < s.length; o++) {
                        const a = s[o - 1];
                        if (e(a) < 3)
                            continue;
                        const r = [s[o][0], a[1]];
                        if (e(r) > 3) {
                            const e = this.splitOnIntersections(t, r);
                            n.push(...e);
                        }
                    } return n; }
                midPointInPolygon(t, e) { return n(t, (e[0][0] + e[1][0]) / 2, (e[0][1] + e[1][1]) / 2); }
                splitOnIntersections(t, o) { const a = Math.max(5, .1 * e(o)), h = []; for (let n = 0; n < t.length; n++) {
                    const i = t[n], c = t[(n + 1) % t.length];
                    if (r(i, c, ...o)) {
                        const t = s(i, c, o[0], o[1]);
                        if (t) {
                            const s = e([t, o[0]]), n = e([t, o[1]]);
                            s > a && n > a && h.push({ point: t, distance: s });
                        }
                    }
                } if (h.length > 1) {
                    const e = h.sort((t, e) => t.distance - e.distance).map(t => t.point);
                    if (n(t, ...o[0]) || e.shift(), n(t, ...o[1]) || e.pop(), e.length <= 1)
                        return this.midPointInPolygon(t, o) ? [o] : [];
                    const s = [o[0], ...e, o[1]], a = [];
                    for (let e = 0; e < s.length - 1; e += 2) {
                        const n = [s[e], s[e + 1]];
                        this.midPointInPolygon(t, n) && a.push(n);
                    }
                    return a;
                } return this.midPointInPolygon(t, o) ? [o] : []; }
            };
            c = class c extends i {
                fillPolygon(t, e) { return this._fillPolygon(t, e, !0); }
            };
            l = class l extends i {
                fillPolygon(t, e) { const s = this._fillPolygon(t, e), n = Object.assign({}, e, { hachureAngle: e.hachureAngle + 90 }), o = this._fillPolygon(t, n); return s.ops = s.ops.concat(o.ops), s; }
            };
            u = class u {
                constructor(t) { this.helper = t; }
                fillPolygon(t, e) { const s = h(t, e = Object.assign({}, e, { curveStepCount: 4, hachureAngle: 0, roughness: 1 })); return this.dotsOnLines(s, e); }
                dotsOnLines(t, s) { const n = []; let o = s.hachureGap; o < 0 && (o = 4 * s.strokeWidth), o = Math.max(o, .1); let a = s.fillWeight; a < 0 && (a = s.strokeWidth / 2); const r = o / 4; for (const h of t) {
                    const t = e(h), i = t / o, c = Math.ceil(i) - 1, l = t - c * o, u = (h[0][0] + h[1][0]) / 2 - o / 4, f = Math.min(h[0][1], h[1][1]);
                    for (let t = 0; t < c; t++) {
                        const e = f + l + t * o, h = this.helper.randOffsetWithRange(u - r, u + r, s), i = this.helper.randOffsetWithRange(e - r, e + r, s), c = this.helper.ellipse(h, i, a, a, s);
                        n.push(...c.ops);
                    }
                } return { type: "fillSketch", ops: n }; }
            };
            f = class f {
                constructor(t) { this.helper = t; }
                fillPolygon(t, e) { const s = h(t, e); return { type: "fillSketch", ops: this.dashedLine(s, e) }; }
                dashedLine(t, s) { const n = s.dashOffset < 0 ? s.hachureGap < 0 ? 4 * s.strokeWidth : s.hachureGap : s.dashOffset, o = s.dashGap < 0 ? s.hachureGap < 0 ? 4 * s.strokeWidth : s.hachureGap : s.dashGap, a = []; return t.forEach(t => { const r = e(t), h = Math.floor(r / (n + o)), i = (r + o - h * (n + o)) / 2; let c = t[0], l = t[1]; c[0] > l[0] && (c = t[1], l = t[0]); const u = Math.atan((l[1] - c[1]) / (l[0] - c[0])); for (let t = 0; t < h; t++) {
                    const e = t * (n + o), r = e + n, h = [c[0] + e * Math.cos(u) + i * Math.cos(u), c[1] + e * Math.sin(u) + i * Math.sin(u)], l = [c[0] + r * Math.cos(u) + i * Math.cos(u), c[1] + r * Math.sin(u) + i * Math.sin(u)];
                    a.push(...this.helper.doubleLineOps(h[0], h[1], l[0], l[1], s));
                } }), a; }
            };
            p = class p {
                constructor(t) { this.helper = t; }
                fillPolygon(t, e) { const s = e.hachureGap < 0 ? 4 * e.strokeWidth : e.hachureGap, n = e.zigzagOffset < 0 ? s : e.zigzagOffset, o = h(t, e = Object.assign({}, e, { hachureGap: s + n })); return { type: "fillSketch", ops: this.zigzagLines(o, n, e) }; }
                zigzagLines(t, s, n) { const o = []; return t.forEach(t => { const a = e(t), r = Math.round(a / (2 * s)); let h = t[0], i = t[1]; h[0] > i[0] && (h = t[1], i = t[0]); const c = Math.atan((i[1] - h[1]) / (i[0] - h[0])); for (let t = 0; t < r; t++) {
                    const e = 2 * t * s, a = 2 * (t + 1) * s, r = Math.sqrt(2 * Math.pow(s, 2)), i = [h[0] + e * Math.cos(c), h[1] + e * Math.sin(c)], l = [h[0] + a * Math.cos(c), h[1] + a * Math.sin(c)], u = [i[0] + r * Math.cos(c + Math.PI / 4), i[1] + r * Math.sin(c + Math.PI / 4)];
                    o.push(...this.helper.doubleLineOps(i[0], i[1], u[0], u[1], n), ...this.helper.doubleLineOps(u[0], u[1], l[0], l[1], n));
                } }), o; }
            };
            d = {};
            g = class g {
                constructor(t) { this.seed = t; }
                next() { return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random(); }
            };
            M = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
            x = { randOffset: function (t, e) { return W(t, e); }, randOffsetWithRange: function (t, e, s) { return E(t, e, s); }, ellipse: function (t, e, s, n, o) { const a = T(s, n, o); return I(t, e, o, a).opset; }, doubleLineOps: function (t, e, s, n, o) { return z(t, e, s, n, o, !0); } };
            K = "none";
            U = class U {
                constructor(t) { this.defaultOptions = { maxRandomnessOffset: 2, roughness: 1, bowing: 1, stroke: "#000", strokeWidth: 1, curveTightness: 0, curveFitting: .95, curveStepCount: 9, fillStyle: "hachure", fillWeight: -1, hachureAngle: -41, hachureGap: -1, dashOffset: -1, dashGap: -1, zigzagOffset: -1, seed: 0, combineNestedSvgPaths: !1, disableMultiStroke: !1, disableMultiStrokeFill: !1 }, this.config = t || {}, this.config.options && (this.defaultOptions = this._o(this.config.options)); }
                static newSeed() { return Math.floor(Math.random() * 2 ** 31); }
                _o(t) { return t ? Object.assign({}, this.defaultOptions, t) : this.defaultOptions; }
                _d(t, e, s) { return { shape: t, sets: e || [], options: s || this.defaultOptions }; }
                line(t, e, s, n, o) { const a = this._o(o); return this._d("line", [v(t, e, s, n, a)], a); }
                rectangle(t, e, s, n, o) { const a = this._o(o), r = [], h = S(t, e, s, n, a); if (a.fill) {
                    const o = [[t, e], [t + s, e], [t + s, e + n], [t, e + n]];
                    "solid" === a.fillStyle ? r.push(_(o, a)) : r.push(C(o, a));
                } return a.stroke !== K && r.push(h), this._d("rectangle", r, a); }
                ellipse(t, e, s, n, o) { const a = this._o(o), r = [], h = T(s, n, a), i = I(t, e, a, h); if (a.fill)
                    if ("solid" === a.fillStyle) {
                        const s = I(t, e, a, h).opset;
                        s.type = "fillPath", r.push(s);
                    }
                    else
                        r.push(C(i.estimatedPoints, a)); return a.stroke !== K && r.push(i.opset), this._d("ellipse", r, a); }
                circle(t, e, s, n) { const o = this.ellipse(t, e, s, s, n); return o.shape = "circle", o; }
                linearPath(t, e) { const s = this._o(e); return this._d("linearPath", [O(t, !1, s)], s); }
                arc(t, e, s, n, o, a, r = !1, h) { const i = this._o(h), c = [], l = A(t, e, s, n, o, a, r, !0, i); if (r && i.fill)
                    if ("solid" === i.fillStyle) {
                        const r = A(t, e, s, n, o, a, !0, !1, i);
                        r.type = "fillPath", c.push(r);
                    }
                    else
                        c.push(function (t, e, s, n, o, a, r) { const h = t, i = e; let c = Math.abs(s / 2), l = Math.abs(n / 2); c += W(.01 * c, r), l += W(.01 * l, r); let u = o, f = a; for (; u < 0;)
                            u += 2 * Math.PI, f += 2 * Math.PI; f - u > 2 * Math.PI && (u = 0, f = 2 * Math.PI); const p = (f - u) / r.curveStepCount, d = []; for (let t = u; t <= f; t += p)
                            d.push([h + c * Math.cos(t), i + l * Math.sin(t)]); return d.push([h + c * Math.cos(f), i + l * Math.sin(f)]), d.push([h, i]), C(d, r); }(t, e, s, n, o, a, i)); return i.stroke !== K && c.push(l), this._d("arc", c, i); }
                curve(t, e) { const s = this._o(e), n = [], o = L(t, s); if (s.fill && s.fill !== K && t.length >= 3) {
                    const e = J(function (t, e = 0) { const s = t.length; if (s < 3)
                        throw new Error("A curve must have at least three points."); const n = []; if (3 === s)
                        n.push(N(t[0]), N(t[1]), N(t[2]), N(t[2]));
                    else {
                        const s = [];
                        s.push(t[0], t[0]);
                        for (let e = 1; e < t.length; e++)
                            s.push(t[e]), e === t.length - 1 && s.push(t[e]);
                        const o = [], a = 1 - e;
                        n.push(N(s[0]));
                        for (let t = 1; t + 2 < s.length; t++) {
                            const e = s[t];
                            o[0] = [e[0], e[1]], o[1] = [e[0] + (a * s[t + 1][0] - a * s[t - 1][0]) / 6, e[1] + (a * s[t + 1][1] - a * s[t - 1][1]) / 6], o[2] = [s[t + 1][0] + (a * s[t][0] - a * s[t + 2][0]) / 6, s[t + 1][1] + (a * s[t][1] - a * s[t + 2][1]) / 6], o[3] = [s[t + 1][0], s[t + 1][1]], n.push(o[1], o[2], o[3]);
                        }
                    } return n; }(t), 10, (1 + s.roughness) / 2);
                    "solid" === s.fillStyle ? n.push(_(e, s)) : n.push(C(e, s));
                } return s.stroke !== K && n.push(o), this._d("curve", n, s); }
                polygon(t, e) { const s = this._o(e), n = [], o = O(t, !0, s); return s.fill && ("solid" === s.fillStyle ? n.push(_(t, s)) : n.push(C(t, s))), s.stroke !== K && n.push(o), this._d("polygon", n, s); }
                path(t, e) { const s = this._o(e), n = []; if (!t)
                    return this._d("path", n, s); t = (t || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " "); const o = s.fill && "transparent" !== s.fill && s.fill !== K, a = s.stroke !== K, r = !!(s.simplification && s.simplification < 1), h = function (t, e, s) { const n = m(y(b(t))), o = []; let a = [], r = [0, 0], h = []; const i = () => { h.length >= 4 && a.push(...J(h, e)), h = []; }, c = () => { i(), a.length && (o.push(a), a = []); }; for (const { key: t, data: e } of n)
                    switch (t) {
                        case "M":
                            c(), r = [e[0], e[1]], a.push(r);
                            break;
                        case "L":
                            i(), a.push([e[0], e[1]]);
                            break;
                        case "C":
                            if (!h.length) {
                                const t = a.length ? a[a.length - 1] : r;
                                h.push([t[0], t[1]]);
                            }
                            h.push([e[0], e[1]]), h.push([e[2], e[3]]), h.push([e[4], e[5]]);
                            break;
                        case "Z": i(), a.push([r[0], r[1]]);
                    } if (c(), !s)
                    return o; const l = []; for (const t of o) {
                    const e = B(t, s);
                    e.length && l.push(e);
                } return l; }(t, 1, r ? 4 - 4 * s.simplification : (1 + s.roughness) / 2); if (o)
                    if (s.combineNestedSvgPaths) {
                        const t = [];
                        h.forEach(e => t.push(...e)), "solid" === s.fillStyle ? n.push(_(t, s)) : n.push(C(t, s));
                    }
                    else
                        h.forEach(t => { "solid" === s.fillStyle ? n.push(_(t, s)) : n.push(C(t, s)); }); return a && (r ? h.forEach(t => { n.push(O(t, !1, s)); }) : n.push(function (t, e) { const s = m(y(b(t))), n = []; let o = [0, 0], a = [0, 0]; for (const { key: t, data: r } of s)
                    switch (t) {
                        case "M": {
                            const t = 1 * (e.maxRandomnessOffset || 0);
                            n.push({ op: "move", data: r.map(s => s + W(t, e)) }), a = [r[0], r[1]], o = [r[0], r[1]];
                            break;
                        }
                        case "L":
                            n.push(...z(a[0], a[1], r[0], r[1], e)), a = [r[0], r[1]];
                            break;
                        case "C": {
                            const [t, s, o, h, i, c] = r;
                            n.push(...j(t, s, o, h, i, c, a, e)), a = [i, c];
                            break;
                        }
                        case "Z": n.push(...z(a[0], a[1], o[0], o[1], e)), a = [o[0], o[1]];
                    } return { type: "path", ops: n }; }(t, s))), this._d("path", n, s); }
                opsToPath(t) { let e = ""; for (const s of t.ops) {
                    const t = s.data;
                    switch (s.op) {
                        case "move":
                            e += `M${t[0]} ${t[1]} `;
                            break;
                        case "bcurveTo":
                            e += `C${t[0]} ${t[1]}, ${t[2]} ${t[3]}, ${t[4]} ${t[5]} `;
                            break;
                        case "lineTo": e += `L${t[0]} ${t[1]} `;
                    }
                } return e.trim(); }
                toPaths(t) { const e = t.sets || [], s = t.options || this.defaultOptions, n = []; for (const t of e) {
                    let e = null;
                    switch (t.type) {
                        case "path":
                            e = { d: this.opsToPath(t), stroke: s.stroke, strokeWidth: s.strokeWidth, fill: K };
                            break;
                        case "fillPath":
                            e = { d: this.opsToPath(t), stroke: K, strokeWidth: 0, fill: s.fill || K };
                            break;
                        case "fillSketch": e = this.fillSketch(t, s);
                    }
                    e && n.push(e);
                } return n; }
                fillSketch(t, e) { let s = e.fillWeight; return s < 0 && (s = e.strokeWidth / 2), { d: this.opsToPath(t), stroke: e.fill || K, strokeWidth: s, fill: K }; }
            };
            Y = class Y {
                constructor(t, e) { this.canvas = t, this.ctx = this.canvas.getContext("2d"), this.gen = new U(e); }
                draw(t) { const e = t.sets || [], s = t.options || this.getDefaultOptions(), n = this.ctx; for (const o of e)
                    switch (o.type) {
                        case "path":
                            n.save(), n.strokeStyle = "none" === s.stroke ? "transparent" : s.stroke, n.lineWidth = s.strokeWidth, s.strokeLineDash && n.setLineDash(s.strokeLineDash), s.strokeLineDashOffset && (n.lineDashOffset = s.strokeLineDashOffset), this._drawToContext(n, o), n.restore();
                            break;
                        case "fillPath":
                            n.save(), n.fillStyle = s.fill || "";
                            const e = "curve" === t.shape || "polygon" === t.shape ? "evenodd" : "nonzero";
                            this._drawToContext(n, o, e), n.restore();
                            break;
                        case "fillSketch": this.fillSketch(n, o, s);
                    } }
                fillSketch(t, e, s) { let n = s.fillWeight; n < 0 && (n = s.strokeWidth / 2), t.save(), s.fillLineDash && t.setLineDash(s.fillLineDash), s.fillLineDashOffset && (t.lineDashOffset = s.fillLineDashOffset), t.strokeStyle = s.fill || "", t.lineWidth = n, this._drawToContext(t, e), t.restore(); }
                _drawToContext(t, e, s = "nonzero") { t.beginPath(); for (const s of e.ops) {
                    const e = s.data;
                    switch (s.op) {
                        case "move":
                            t.moveTo(e[0], e[1]);
                            break;
                        case "bcurveTo":
                            t.bezierCurveTo(e[0], e[1], e[2], e[3], e[4], e[5]);
                            break;
                        case "lineTo": t.lineTo(e[0], e[1]);
                    }
                } "fillPath" === e.type ? t.fill(s) : t.stroke(); }
                get generator() { return this.gen; }
                getDefaultOptions() { return this.gen.defaultOptions; }
                line(t, e, s, n, o) { const a = this.gen.line(t, e, s, n, o); return this.draw(a), a; }
                rectangle(t, e, s, n, o) { const a = this.gen.rectangle(t, e, s, n, o); return this.draw(a), a; }
                ellipse(t, e, s, n, o) { const a = this.gen.ellipse(t, e, s, n, o); return this.draw(a), a; }
                circle(t, e, s, n) { const o = this.gen.circle(t, e, s, n); return this.draw(o), o; }
                linearPath(t, e) { const s = this.gen.linearPath(t, e); return this.draw(s), s; }
                polygon(t, e) { const s = this.gen.polygon(t, e); return this.draw(s), s; }
                arc(t, e, s, n, o, a, r = !1, h) { const i = this.gen.arc(t, e, s, n, o, a, r, h); return this.draw(i), i; }
                curve(t, e) { const s = this.gen.curve(t, e); return this.draw(s), s; }
                path(t, e) { const s = this.gen.path(t, e); return this.draw(s), s; }
            };
            tt = "http://www.w3.org/2000/svg";
            et = class et {
                constructor(t, e) { this.svg = t, this.gen = new U(e); }
                draw(t) { const e = t.sets || [], s = t.options || this.getDefaultOptions(), n = this.svg.ownerDocument || window.document, o = n.createElementNS(tt, "g"); for (const a of e) {
                    let e = null;
                    switch (a.type) {
                        case "path":
                            e = n.createElementNS(tt, "path"), e.setAttribute("d", this.opsToPath(a)), e.setAttribute("stroke", s.stroke), e.setAttribute("stroke-width", s.strokeWidth + ""), e.setAttribute("fill", "none"), s.strokeLineDash && e.setAttribute("stroke-dasharray", s.strokeLineDash.join(" ").trim()), s.strokeLineDashOffset && e.setAttribute("stroke-dashoffset", "" + s.strokeLineDashOffset);
                            break;
                        case "fillPath":
                            e = n.createElementNS(tt, "path"), e.setAttribute("d", this.opsToPath(a)), e.setAttribute("stroke", "none"), e.setAttribute("stroke-width", "0"), e.setAttribute("fill", s.fill || ""), "curve" !== t.shape && "polygon" !== t.shape || e.setAttribute("fill-rule", "evenodd");
                            break;
                        case "fillSketch": e = this.fillSketch(n, a, s);
                    }
                    e && o.appendChild(e);
                } return o; }
                fillSketch(t, e, s) { let n = s.fillWeight; n < 0 && (n = s.strokeWidth / 2); const o = t.createElementNS(tt, "path"); return o.setAttribute("d", this.opsToPath(e)), o.setAttribute("stroke", s.fill || ""), o.setAttribute("stroke-width", n + ""), o.setAttribute("fill", "none"), s.fillLineDash && o.setAttribute("stroke-dasharray", s.fillLineDash.join(" ").trim()), s.fillLineDashOffset && o.setAttribute("stroke-dashoffset", "" + s.fillLineDashOffset), o; }
                get generator() { return this.gen; }
                getDefaultOptions() { return this.gen.defaultOptions; }
                opsToPath(t) { return this.gen.opsToPath(t); }
                line(t, e, s, n, o) { const a = this.gen.line(t, e, s, n, o); return this.draw(a); }
                rectangle(t, e, s, n, o) { const a = this.gen.rectangle(t, e, s, n, o); return this.draw(a); }
                ellipse(t, e, s, n, o) { const a = this.gen.ellipse(t, e, s, n, o); return this.draw(a); }
                circle(t, e, s, n) { const o = this.gen.circle(t, e, s, n); return this.draw(o); }
                linearPath(t, e) { const s = this.gen.linearPath(t, e); return this.draw(s); }
                polygon(t, e) { const s = this.gen.polygon(t, e); return this.draw(s); }
                arc(t, e, s, n, o, a, r = !1, h) { const i = this.gen.arc(t, e, s, n, o, a, r, h); return this.draw(i); }
                curve(t, e) { const s = this.gen.curve(t, e); return this.draw(s); }
                path(t, e) { const s = this.gen.path(t, e); return this.draw(s); }
            };
            st = { canvas: (t, e) => new Y(t, e), svg: (t, e) => new et(t, e), generator: t => new U(t), newSeed: () => U.newSeed() };
            exports_1("default", st);
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/directive", [], function (exports_2, context_2) {
    "use strict";
    var directives, directive, isDirective;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            directives = new WeakMap();
            exports_2("directive", directive = f => (...args) => {
                const d = f(...args);
                directives.set(d, true);
                return d;
            });
            exports_2("isDirective", isDirective = o => {
                return typeof o === 'function' && directives.has(o);
            });
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/dom", [], function (exports_3, context_3) {
    "use strict";
    var isCEPolyfill, reparentNodes, removeNodes;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            exports_3("isCEPolyfill", isCEPolyfill = typeof window !== 'undefined' &&
                window.customElements != null &&
                window.customElements.polyfillWrapFlushCallback !==
                    undefined);
            exports_3("reparentNodes", reparentNodes = (container, start, end = null, before = null) => {
                while (start !== end) {
                    const n = start.nextSibling;
                    container.insertBefore(start, before);
                    start = n;
                }
            });
            exports_3("removeNodes", removeNodes = (container, start, end = null) => {
                while (start !== end) {
                    const n = start.nextSibling;
                    container.removeChild(start);
                    start = n;
                }
            });
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/part", [], function (exports_4, context_4) {
    "use strict";
    var noChange, nothing;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            exports_4("noChange", noChange = {});
            exports_4("nothing", nothing = {});
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template", [], function (exports_5, context_5) {
    "use strict";
    var marker, nodeMarker, markerRegex, boundAttributeSuffix, Template, endsWith, isTemplatePartActive, createMarker, lastAttributeNameRegex;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            exports_5("marker", marker = `{{lit-${String(Math.random()).slice(2)}}}`);
            exports_5("nodeMarker", nodeMarker = `<!--${marker}-->`);
            exports_5("markerRegex", markerRegex = new RegExp(`${marker}|${nodeMarker}`));
            exports_5("boundAttributeSuffix", boundAttributeSuffix = '$lit$');
            Template = class Template {
                constructor(result, element) {
                    this.parts = [];
                    this.element = element;
                    const nodesToRemove = [];
                    const stack = [];
                    const walker = document.createTreeWalker(element.content, 133, null, false);
                    let lastPartIndex = 0;
                    let index = -1;
                    let partIndex = 0;
                    const { strings, values: { length } } = result;
                    while (partIndex < length) {
                        const node = walker.nextNode();
                        if (node === null) {
                            walker.currentNode = stack.pop();
                            continue;
                        }
                        index++;
                        if (node.nodeType === 1) {
                            if (node.hasAttributes()) {
                                const attributes = node.attributes;
                                const { length } = attributes;
                                let count = 0;
                                for (let i = 0; i < length; i++) {
                                    if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                                        count++;
                                    }
                                }
                                while (count-- > 0) {
                                    const stringForPart = strings[partIndex];
                                    const name = lastAttributeNameRegex.exec(stringForPart)[2];
                                    const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                                    const attributeValue = node.getAttribute(attributeLookupName);
                                    node.removeAttribute(attributeLookupName);
                                    const statics = attributeValue.split(markerRegex);
                                    this.parts.push({ type: 'attribute', index, name, strings: statics });
                                    partIndex += statics.length - 1;
                                }
                            }
                            if (node.tagName === 'TEMPLATE') {
                                stack.push(node);
                                walker.currentNode = node.content;
                            }
                        }
                        else if (node.nodeType === 3) {
                            const data = node.data;
                            if (data.indexOf(marker) >= 0) {
                                const parent = node.parentNode;
                                const strings = data.split(markerRegex);
                                const lastIndex = strings.length - 1;
                                for (let i = 0; i < lastIndex; i++) {
                                    let insert;
                                    let s = strings[i];
                                    if (s === '') {
                                        insert = createMarker();
                                    }
                                    else {
                                        const match = lastAttributeNameRegex.exec(s);
                                        if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                            s = s.slice(0, match.index) + match[1] +
                                                match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                                        }
                                        insert = document.createTextNode(s);
                                    }
                                    parent.insertBefore(insert, node);
                                    this.parts.push({ type: 'node', index: ++index });
                                }
                                if (strings[lastIndex] === '') {
                                    parent.insertBefore(createMarker(), node);
                                    nodesToRemove.push(node);
                                }
                                else {
                                    node.data = strings[lastIndex];
                                }
                                partIndex += lastIndex;
                            }
                        }
                        else if (node.nodeType === 8) {
                            if (node.data === marker) {
                                const parent = node.parentNode;
                                if (node.previousSibling === null || index === lastPartIndex) {
                                    index++;
                                    parent.insertBefore(createMarker(), node);
                                }
                                lastPartIndex = index;
                                this.parts.push({ type: 'node', index });
                                if (node.nextSibling === null) {
                                    node.data = '';
                                }
                                else {
                                    nodesToRemove.push(node);
                                    index--;
                                }
                                partIndex++;
                            }
                            else {
                                let i = -1;
                                while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                                    this.parts.push({ type: 'node', index: -1 });
                                    partIndex++;
                                }
                            }
                        }
                    }
                    for (const n of nodesToRemove) {
                        n.parentNode.removeChild(n);
                    }
                }
            };
            exports_5("Template", Template);
            endsWith = (str, suffix) => {
                const index = str.length - suffix.length;
                return index >= 0 && str.slice(index) === suffix;
            };
            exports_5("isTemplatePartActive", isTemplatePartActive = part => part.index !== -1);
            exports_5("createMarker", createMarker = () => document.createComment(''));
            exports_5("lastAttributeNameRegex", lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/);
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template-instance", ["https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/dom", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template"], function (exports_6, context_6) {
    "use strict";
    var dom_js_1, template_js_1, TemplateInstance;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (dom_js_1_1) {
                dom_js_1 = dom_js_1_1;
            },
            function (template_js_1_1) {
                template_js_1 = template_js_1_1;
            }
        ],
        execute: function () {
            TemplateInstance = class TemplateInstance {
                constructor(template, processor, options) {
                    this.__parts = [];
                    this.template = template;
                    this.processor = processor;
                    this.options = options;
                }
                update(values) {
                    let i = 0;
                    for (const part of this.__parts) {
                        if (part !== undefined) {
                            part.setValue(values[i]);
                        }
                        i++;
                    }
                    for (const part of this.__parts) {
                        if (part !== undefined) {
                            part.commit();
                        }
                    }
                }
                _clone() {
                    const fragment = dom_js_1.isCEPolyfill ?
                        this.template.element.content.cloneNode(true) :
                        document.importNode(this.template.element.content, true);
                    const stack = [];
                    const parts = this.template.parts;
                    const walker = document.createTreeWalker(fragment, 133, null, false);
                    let partIndex = 0;
                    let nodeIndex = 0;
                    let part;
                    let node = walker.nextNode();
                    while (partIndex < parts.length) {
                        part = parts[partIndex];
                        if (!template_js_1.isTemplatePartActive(part)) {
                            this.__parts.push(undefined);
                            partIndex++;
                            continue;
                        }
                        while (nodeIndex < part.index) {
                            nodeIndex++;
                            if (node.nodeName === 'TEMPLATE') {
                                stack.push(node);
                                walker.currentNode = node.content;
                            }
                            if ((node = walker.nextNode()) === null) {
                                walker.currentNode = stack.pop();
                                node = walker.nextNode();
                            }
                        }
                        if (part.type === 'node') {
                            const part = this.processor.handleTextExpression(this.options);
                            part.insertAfterNode(node.previousSibling);
                            this.__parts.push(part);
                        }
                        else {
                            this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
                        }
                        partIndex++;
                    }
                    if (dom_js_1.isCEPolyfill) {
                        document.adoptNode(fragment);
                        customElements.upgrade(fragment);
                    }
                    return fragment;
                }
            };
            exports_6("TemplateInstance", TemplateInstance);
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template-result", ["https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/dom", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template"], function (exports_7, context_7) {
    "use strict";
    var dom_js_2, template_js_2, policy, commentMarker, TemplateResult, SVGTemplateResult;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (dom_js_2_1) {
                dom_js_2 = dom_js_2_1;
            },
            function (template_js_2_1) {
                template_js_2 = template_js_2_1;
            }
        ],
        execute: function () {
            policy = window.trustedTypes &&
                trustedTypes.createPolicy('lit-html', { createHTML: s => s });
            commentMarker = ` ${template_js_2.marker} `;
            TemplateResult = class TemplateResult {
                constructor(strings, values, type, processor) {
                    this.strings = strings;
                    this.values = values;
                    this.type = type;
                    this.processor = processor;
                }
                getHTML() {
                    const l = this.strings.length - 1;
                    let html = '';
                    let isCommentBinding = false;
                    for (let i = 0; i < l; i++) {
                        const s = this.strings[i];
                        const commentOpen = s.lastIndexOf('<!--');
                        isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                            s.indexOf('-->', commentOpen + 1) === -1;
                        const attributeMatch = template_js_2.lastAttributeNameRegex.exec(s);
                        if (attributeMatch === null) {
                            html += s + (isCommentBinding ? commentMarker : template_js_2.nodeMarker);
                        }
                        else {
                            html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                                attributeMatch[2] + template_js_2.boundAttributeSuffix + attributeMatch[3] +
                                template_js_2.marker;
                        }
                    }
                    html += this.strings[l];
                    return html;
                }
                getTemplateElement() {
                    const template = document.createElement('template');
                    let value = this.getHTML();
                    if (policy !== undefined) {
                        value = policy.createHTML(value);
                    }
                    template.innerHTML = value;
                    return template;
                }
            };
            exports_7("TemplateResult", TemplateResult);
            SVGTemplateResult = class SVGTemplateResult extends TemplateResult {
                getHTML() {
                    return `<svg>${super.getHTML()}</svg>`;
                }
                getTemplateElement() {
                    const template = super.getTemplateElement();
                    const content = template.content;
                    const svgElement = content.firstChild;
                    content.removeChild(svgElement);
                    dom_js_2.reparentNodes(content, svgElement.firstChild);
                    return template;
                }
            };
            exports_7("SVGTemplateResult", SVGTemplateResult);
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/parts", ["https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/directive", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/dom", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/part", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template-instance", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template-result", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template"], function (exports_8, context_8) {
    "use strict";
    var directive_js_1, dom_js_3, part_js_1, template_instance_js_1, template_result_js_1, template_js_3, isPrimitive, isIterable, AttributeCommitter, AttributePart, NodePart, BooleanAttributePart, PropertyCommitter, PropertyPart, eventOptionsSupported, EventPart, getOptions;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (directive_js_1_1) {
                directive_js_1 = directive_js_1_1;
            },
            function (dom_js_3_1) {
                dom_js_3 = dom_js_3_1;
            },
            function (part_js_1_1) {
                part_js_1 = part_js_1_1;
            },
            function (template_instance_js_1_1) {
                template_instance_js_1 = template_instance_js_1_1;
            },
            function (template_result_js_1_1) {
                template_result_js_1 = template_result_js_1_1;
            },
            function (template_js_3_1) {
                template_js_3 = template_js_3_1;
            }
        ],
        execute: function () {
            exports_8("isPrimitive", isPrimitive = value => {
                return value === null ||
                    !(typeof value === 'object' || typeof value === 'function');
            });
            exports_8("isIterable", isIterable = value => {
                return Array.isArray(value) ||
                    !!(value && value[Symbol.iterator]);
            });
            AttributeCommitter = class AttributeCommitter {
                constructor(element, name, strings) {
                    this.dirty = true;
                    this.element = element;
                    this.name = name;
                    this.strings = strings;
                    this.parts = [];
                    for (let i = 0; i < strings.length - 1; i++) {
                        this.parts[i] = this._createPart();
                    }
                }
                _createPart() {
                    return new AttributePart(this);
                }
                _getValue() {
                    const strings = this.strings;
                    const l = strings.length - 1;
                    const parts = this.parts;
                    if (l === 1 && strings[0] === '' && strings[1] === '') {
                        const v = parts[0].value;
                        if (typeof v === 'symbol') {
                            return String(v);
                        }
                        if (typeof v === 'string' || !isIterable(v)) {
                            return v;
                        }
                    }
                    let text = '';
                    for (let i = 0; i < l; i++) {
                        text += strings[i];
                        const part = parts[i];
                        if (part !== undefined) {
                            const v = part.value;
                            if (isPrimitive(v) || !isIterable(v)) {
                                text += typeof v === 'string' ? v : String(v);
                            }
                            else {
                                for (const t of v) {
                                    text += typeof t === 'string' ? t : String(t);
                                }
                            }
                        }
                    }
                    text += strings[l];
                    return text;
                }
                commit() {
                    if (this.dirty) {
                        this.dirty = false;
                        this.element.setAttribute(this.name, this._getValue());
                    }
                }
            };
            exports_8("AttributeCommitter", AttributeCommitter);
            AttributePart = class AttributePart {
                constructor(committer) {
                    this.value = undefined;
                    this.committer = committer;
                }
                setValue(value) {
                    if (value !== part_js_1.noChange && (!isPrimitive(value) || value !== this.value)) {
                        this.value = value;
                        if (!directive_js_1.isDirective(value)) {
                            this.committer.dirty = true;
                        }
                    }
                }
                commit() {
                    while (directive_js_1.isDirective(this.value)) {
                        const directive = this.value;
                        this.value = part_js_1.noChange;
                        directive(this);
                    }
                    if (this.value === part_js_1.noChange) {
                        return;
                    }
                    this.committer.commit();
                }
            };
            exports_8("AttributePart", AttributePart);
            NodePart = class NodePart {
                constructor(options) {
                    this.value = undefined;
                    this.__pendingValue = undefined;
                    this.options = options;
                }
                appendInto(container) {
                    this.startNode = container.appendChild(template_js_3.createMarker());
                    this.endNode = container.appendChild(template_js_3.createMarker());
                }
                insertAfterNode(ref) {
                    this.startNode = ref;
                    this.endNode = ref.nextSibling;
                }
                appendIntoPart(part) {
                    part.__insert(this.startNode = template_js_3.createMarker());
                    part.__insert(this.endNode = template_js_3.createMarker());
                }
                insertAfterPart(ref) {
                    ref.__insert(this.startNode = template_js_3.createMarker());
                    this.endNode = ref.endNode;
                    ref.endNode = this.startNode;
                }
                setValue(value) {
                    this.__pendingValue = value;
                }
                commit() {
                    if (this.startNode.parentNode === null) {
                        return;
                    }
                    while (directive_js_1.isDirective(this.__pendingValue)) {
                        const directive = this.__pendingValue;
                        this.__pendingValue = part_js_1.noChange;
                        directive(this);
                    }
                    const value = this.__pendingValue;
                    if (value === part_js_1.noChange) {
                        return;
                    }
                    if (isPrimitive(value)) {
                        if (value !== this.value) {
                            this.__commitText(value);
                        }
                    }
                    else if (value instanceof template_result_js_1.TemplateResult) {
                        this.__commitTemplateResult(value);
                    }
                    else if (value instanceof Node) {
                        this.__commitNode(value);
                    }
                    else if (isIterable(value)) {
                        this.__commitIterable(value);
                    }
                    else if (value === part_js_1.nothing) {
                        this.value = part_js_1.nothing;
                        this.clear();
                    }
                    else {
                        this.__commitText(value);
                    }
                }
                __insert(node) {
                    this.endNode.parentNode.insertBefore(node, this.endNode);
                }
                __commitNode(value) {
                    if (this.value === value) {
                        return;
                    }
                    this.clear();
                    this.__insert(value);
                    this.value = value;
                }
                __commitText(value) {
                    const node = this.startNode.nextSibling;
                    value = value == null ? '' : value;
                    const valueAsString = typeof value === 'string' ? value : String(value);
                    if (node === this.endNode.previousSibling &&
                        node.nodeType === 3) {
                        node.data = valueAsString;
                    }
                    else {
                        this.__commitNode(document.createTextNode(valueAsString));
                    }
                    this.value = value;
                }
                __commitTemplateResult(value) {
                    const template = this.options.templateFactory(value);
                    if (this.value instanceof template_instance_js_1.TemplateInstance &&
                        this.value.template === template) {
                        this.value.update(value.values);
                    }
                    else {
                        const instance = new template_instance_js_1.TemplateInstance(template, value.processor, this.options);
                        const fragment = instance._clone();
                        instance.update(value.values);
                        this.__commitNode(fragment);
                        this.value = instance;
                    }
                }
                __commitIterable(value) {
                    if (!Array.isArray(this.value)) {
                        this.value = [];
                        this.clear();
                    }
                    const itemParts = this.value;
                    let partIndex = 0;
                    let itemPart;
                    for (const item of value) {
                        itemPart = itemParts[partIndex];
                        if (itemPart === undefined) {
                            itemPart = new NodePart(this.options);
                            itemParts.push(itemPart);
                            if (partIndex === 0) {
                                itemPart.appendIntoPart(this);
                            }
                            else {
                                itemPart.insertAfterPart(itemParts[partIndex - 1]);
                            }
                        }
                        itemPart.setValue(item);
                        itemPart.commit();
                        partIndex++;
                    }
                    if (partIndex < itemParts.length) {
                        itemParts.length = partIndex;
                        this.clear(itemPart && itemPart.endNode);
                    }
                }
                clear(startNode = this.startNode) {
                    dom_js_3.removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
                }
            };
            exports_8("NodePart", NodePart);
            BooleanAttributePart = class BooleanAttributePart {
                constructor(element, name, strings) {
                    this.value = undefined;
                    this.__pendingValue = undefined;
                    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
                        throw new Error('Boolean attributes can only contain a single expression');
                    }
                    this.element = element;
                    this.name = name;
                    this.strings = strings;
                }
                setValue(value) {
                    this.__pendingValue = value;
                }
                commit() {
                    while (directive_js_1.isDirective(this.__pendingValue)) {
                        const directive = this.__pendingValue;
                        this.__pendingValue = part_js_1.noChange;
                        directive(this);
                    }
                    if (this.__pendingValue === part_js_1.noChange) {
                        return;
                    }
                    const value = !!this.__pendingValue;
                    if (this.value !== value) {
                        if (value) {
                            this.element.setAttribute(this.name, '');
                        }
                        else {
                            this.element.removeAttribute(this.name);
                        }
                        this.value = value;
                    }
                    this.__pendingValue = part_js_1.noChange;
                }
            };
            exports_8("BooleanAttributePart", BooleanAttributePart);
            PropertyCommitter = class PropertyCommitter extends AttributeCommitter {
                constructor(element, name, strings) {
                    super(element, name, strings);
                    this.single =
                        strings.length === 2 && strings[0] === '' && strings[1] === '';
                }
                _createPart() {
                    return new PropertyPart(this);
                }
                _getValue() {
                    if (this.single) {
                        return this.parts[0].value;
                    }
                    return super._getValue();
                }
                commit() {
                    if (this.dirty) {
                        this.dirty = false;
                        this.element[this.name] = this._getValue();
                    }
                }
            };
            exports_8("PropertyCommitter", PropertyCommitter);
            PropertyPart = class PropertyPart extends AttributePart {
            };
            exports_8("PropertyPart", PropertyPart);
            eventOptionsSupported = false;
            (() => {
                try {
                    const options = {
                        get capture() {
                            eventOptionsSupported = true;
                            return false;
                        }
                    };
                    window.addEventListener('test', options, options);
                    window.removeEventListener('test', options, options);
                }
                catch (_e) {
                }
            })();
            EventPart = class EventPart {
                constructor(element, eventName, eventContext) {
                    this.value = undefined;
                    this.__pendingValue = undefined;
                    this.element = element;
                    this.eventName = eventName;
                    this.eventContext = eventContext;
                    this.__boundHandleEvent = e => this.handleEvent(e);
                }
                setValue(value) {
                    this.__pendingValue = value;
                }
                commit() {
                    while (directive_js_1.isDirective(this.__pendingValue)) {
                        const directive = this.__pendingValue;
                        this.__pendingValue = part_js_1.noChange;
                        directive(this);
                    }
                    if (this.__pendingValue === part_js_1.noChange) {
                        return;
                    }
                    const newListener = this.__pendingValue;
                    const oldListener = this.value;
                    const shouldRemoveListener = newListener == null ||
                        oldListener != null && (newListener.capture !== oldListener.capture ||
                            newListener.once !== oldListener.once ||
                            newListener.passive !== oldListener.passive);
                    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
                    if (shouldRemoveListener) {
                        this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
                    }
                    if (shouldAddListener) {
                        this.__options = getOptions(newListener);
                        this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
                    }
                    this.value = newListener;
                    this.__pendingValue = part_js_1.noChange;
                }
                handleEvent(event) {
                    if (typeof this.value === 'function') {
                        this.value.call(this.eventContext || this.element, event);
                    }
                    else {
                        this.value.handleEvent(event);
                    }
                }
            };
            exports_8("EventPart", EventPart);
            getOptions = o => o && (eventOptionsSupported ?
                { capture: o.capture, passive: o.passive, once: o.once } :
                o.capture);
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/default-template-processor", ["https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/parts"], function (exports_9, context_9) {
    "use strict";
    var parts_js_1, DefaultTemplateProcessor, defaultTemplateProcessor;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (parts_js_1_1) {
                parts_js_1 = parts_js_1_1;
            }
        ],
        execute: function () {
            DefaultTemplateProcessor = class DefaultTemplateProcessor {
                handleAttributeExpressions(element, name, strings, options) {
                    const prefix = name[0];
                    if (prefix === '.') {
                        const committer = new parts_js_1.PropertyCommitter(element, name.slice(1), strings);
                        return committer.parts;
                    }
                    if (prefix === '@') {
                        return [new parts_js_1.EventPart(element, name.slice(1), options.eventContext)];
                    }
                    if (prefix === '?') {
                        return [new parts_js_1.BooleanAttributePart(element, name.slice(1), strings)];
                    }
                    const committer = new parts_js_1.AttributeCommitter(element, name, strings);
                    return committer.parts;
                }
                handleTextExpression(options) {
                    return new parts_js_1.NodePart(options);
                }
            };
            exports_9("DefaultTemplateProcessor", DefaultTemplateProcessor);
            exports_9("defaultTemplateProcessor", defaultTemplateProcessor = new DefaultTemplateProcessor());
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template-factory", ["https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template"], function (exports_10, context_10) {
    "use strict";
    var template_js_4, templateCaches;
    var __moduleName = context_10 && context_10.id;
    function templateFactory(result) {
        let templateCache = templateCaches.get(result.type);
        if (templateCache === undefined) {
            templateCache = {
                stringsArray: new WeakMap(),
                keyString: new Map()
            };
            templateCaches.set(result.type, templateCache);
        }
        let template = templateCache.stringsArray.get(result.strings);
        if (template !== undefined) {
            return template;
        }
        const key = result.strings.join(template_js_4.marker);
        template = templateCache.keyString.get(key);
        if (template === undefined) {
            template = new template_js_4.Template(result, result.getTemplateElement());
            templateCache.keyString.set(key, template);
        }
        templateCache.stringsArray.set(result.strings, template);
        return template;
    }
    exports_10("templateFactory", templateFactory);
    return {
        setters: [
            function (template_js_4_1) {
                template_js_4 = template_js_4_1;
            }
        ],
        execute: function () {
            exports_10("templateCaches", templateCaches = new Map());
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/render", ["https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/dom", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/parts", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template-factory"], function (exports_11, context_11) {
    "use strict";
    var dom_js_4, parts_js_2, template_factory_js_1, parts, render;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (dom_js_4_1) {
                dom_js_4 = dom_js_4_1;
            },
            function (parts_js_2_1) {
                parts_js_2 = parts_js_2_1;
            },
            function (template_factory_js_1_1) {
                template_factory_js_1 = template_factory_js_1_1;
            }
        ],
        execute: function () {
            exports_11("parts", parts = new WeakMap());
            exports_11("render", render = (result, container, options) => {
                let part = parts.get(container);
                if (part === undefined) {
                    dom_js_4.removeNodes(container, container.firstChild);
                    parts.set(container, part = new parts_js_2.NodePart(Object.assign({ templateFactory: template_factory_js_1.templateFactory }, options)));
                    part.appendInto(container);
                }
                part.setValue(result);
                part.commit();
            });
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lit-html", ["https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/default-template-processor", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template-result", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/directive", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/dom", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/part", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/parts", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/render", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template-factory", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template-instance", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template"], function (exports_12, context_12) {
    "use strict";
    var default_template_processor_js_1, template_result_js_2, html, svg;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (default_template_processor_js_1_1) {
                default_template_processor_js_1 = default_template_processor_js_1_1;
                exports_12({
                    "DefaultTemplateProcessor": default_template_processor_js_1_1["DefaultTemplateProcessor"],
                    "defaultTemplateProcessor": default_template_processor_js_1_1["defaultTemplateProcessor"]
                });
            },
            function (template_result_js_2_1) {
                template_result_js_2 = template_result_js_2_1;
                exports_12({
                    "SVGTemplateResult": template_result_js_2_1["SVGTemplateResult"],
                    "TemplateResult": template_result_js_2_1["TemplateResult"]
                });
            },
            function (directive_js_2_1) {
                exports_12({
                    "directive": directive_js_2_1["directive"],
                    "isDirective": directive_js_2_1["isDirective"]
                });
            },
            function (dom_js_5_1) {
                exports_12({
                    "removeNodes": dom_js_5_1["removeNodes"],
                    "reparentNodes": dom_js_5_1["reparentNodes"]
                });
            },
            function (part_js_2_1) {
                exports_12({
                    "noChange": part_js_2_1["noChange"],
                    "nothing": part_js_2_1["nothing"]
                });
            },
            function (parts_js_3_1) {
                exports_12({
                    "AttributeCommitter": parts_js_3_1["AttributeCommitter"],
                    "AttributePart": parts_js_3_1["AttributePart"],
                    "BooleanAttributePart": parts_js_3_1["BooleanAttributePart"],
                    "EventPart": parts_js_3_1["EventPart"],
                    "isIterable": parts_js_3_1["isIterable"],
                    "isPrimitive": parts_js_3_1["isPrimitive"],
                    "NodePart": parts_js_3_1["NodePart"],
                    "PropertyCommitter": parts_js_3_1["PropertyCommitter"],
                    "PropertyPart": parts_js_3_1["PropertyPart"]
                });
            },
            function (render_js_1_1) {
                exports_12({
                    "parts": render_js_1_1["parts"],
                    "render": render_js_1_1["render"]
                });
            },
            function (template_factory_js_2_1) {
                exports_12({
                    "templateCaches": template_factory_js_2_1["templateCaches"],
                    "templateFactory": template_factory_js_2_1["templateFactory"]
                });
            },
            function (template_instance_js_2_1) {
                exports_12({
                    "TemplateInstance": template_instance_js_2_1["TemplateInstance"]
                });
            },
            function (template_js_5_1) {
                exports_12({
                    "createMarker": template_js_5_1["createMarker"],
                    "isTemplatePartActive": template_js_5_1["isTemplatePartActive"],
                    "Template": template_js_5_1["Template"]
                });
            }
        ],
        execute: function () {
            if (typeof window !== 'undefined') {
                (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
            }
            exports_12("html", html = (strings, ...values) => new template_result_js_2.TemplateResult(strings, values, 'html', default_template_processor_js_1.defaultTemplateProcessor));
            exports_12("svg", svg = (strings, ...values) => new template_result_js_2.SVGTemplateResult(strings, values, 'svg', default_template_processor_js_1.defaultTemplateProcessor));
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/directives/until", ["https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/parts", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lit-html"], function (exports_13, context_13) {
    "use strict";
    var parts_js_4, lit_html_js_1, _state, _infinity, until;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (parts_js_4_1) {
                parts_js_4 = parts_js_4_1;
            },
            function (lit_html_js_1_1) {
                lit_html_js_1 = lit_html_js_1_1;
            }
        ],
        execute: function () {
            _state = new WeakMap();
            _infinity = 0x7fffffff;
            exports_13("until", until = lit_html_js_1.directive((...args) => part => {
                let state = _state.get(part);
                if (state === undefined) {
                    state = {
                        lastRenderedIndex: _infinity,
                        values: []
                    };
                    _state.set(part, state);
                }
                const previousValues = state.values;
                let previousLength = previousValues.length;
                state.values = args;
                for (let i = 0; i < args.length; i++) {
                    if (i > state.lastRenderedIndex) {
                        break;
                    }
                    const value = args[i];
                    if (parts_js_4.isPrimitive(value) ||
                        typeof value.then !== 'function') {
                        part.setValue(value);
                        state.lastRenderedIndex = i;
                        break;
                    }
                    if (i < previousLength && value === previousValues[i]) {
                        continue;
                    }
                    state.lastRenderedIndex = _infinity;
                    previousLength = 0;
                    Promise.resolve(value).then(resolvedValue => {
                        const index = state.values.indexOf(value);
                        if (index > -1 && index < state.lastRenderedIndex) {
                            state.lastRenderedIndex = index;
                            part.setValue(resolvedValue);
                            part.commit();
                        }
                    });
                }
            }));
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/modify-template", ["https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template"], function (exports_14, context_14) {
    "use strict";
    var template_js_6, walkerNodeFilter, countNodes, nextActiveIndexInTemplateParts;
    var __moduleName = context_14 && context_14.id;
    function removeNodesFromTemplate(template, nodesToRemove) {
        const { element: { content }, parts } = template;
        const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
        let partIndex = nextActiveIndexInTemplateParts(parts);
        let part = parts[partIndex];
        let nodeIndex = -1;
        let removeCount = 0;
        const nodesToRemoveInTemplate = [];
        let currentRemovingNode = null;
        while (walker.nextNode()) {
            nodeIndex++;
            const node = walker.currentNode;
            if (node.previousSibling === currentRemovingNode) {
                currentRemovingNode = null;
            }
            if (nodesToRemove.has(node)) {
                nodesToRemoveInTemplate.push(node);
                if (currentRemovingNode === null) {
                    currentRemovingNode = node;
                }
            }
            if (currentRemovingNode !== null) {
                removeCount++;
            }
            while (part !== undefined && part.index === nodeIndex) {
                part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
                partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                part = parts[partIndex];
            }
        }
        nodesToRemoveInTemplate.forEach(n => n.parentNode.removeChild(n));
    }
    exports_14("removeNodesFromTemplate", removeNodesFromTemplate);
    function insertNodeIntoTemplate(template, node, refNode = null) {
        const { element: { content }, parts } = template;
        if (refNode === null || refNode === undefined) {
            content.appendChild(node);
            return;
        }
        const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
        let partIndex = nextActiveIndexInTemplateParts(parts);
        let insertCount = 0;
        let walkerIndex = -1;
        while (walker.nextNode()) {
            walkerIndex++;
            const walkerNode = walker.currentNode;
            if (walkerNode === refNode) {
                insertCount = countNodes(node);
                refNode.parentNode.insertBefore(node, refNode);
            }
            while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
                if (insertCount > 0) {
                    while (partIndex !== -1) {
                        parts[partIndex].index += insertCount;
                        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                    }
                    return;
                }
                partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            }
        }
    }
    exports_14("insertNodeIntoTemplate", insertNodeIntoTemplate);
    return {
        setters: [
            function (template_js_6_1) {
                template_js_6 = template_js_6_1;
            }
        ],
        execute: function () {
            walkerNodeFilter = 133;
            countNodes = node => {
                let count = node.nodeType === 11 ? 0 : 1;
                const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
                while (walker.nextNode()) {
                    count++;
                }
                return count;
            };
            nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
                for (let i = startIndex + 1; i < parts.length; i++) {
                    const part = parts[i];
                    if (template_js_6.isTemplatePartActive(part)) {
                        return i;
                    }
                }
                return -1;
            };
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/shady-render", ["https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/dom", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/modify-template", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/render", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template-factory", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template-instance", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/template", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lit-html"], function (exports_15, context_15) {
    "use strict";
    var dom_js_6, modify_template_js_1, render_js_2, template_factory_js_3, template_instance_js_3, template_js_7, getTemplateCacheKey, compatibleShadyCSSVersion, shadyTemplateFactory, TEMPLATE_TYPES, removeStylesFromLitTemplates, shadyRenderSet, prepareTemplateStyles, render;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (dom_js_6_1) {
                dom_js_6 = dom_js_6_1;
            },
            function (modify_template_js_1_1) {
                modify_template_js_1 = modify_template_js_1_1;
            },
            function (render_js_2_1) {
                render_js_2 = render_js_2_1;
            },
            function (template_factory_js_3_1) {
                template_factory_js_3 = template_factory_js_3_1;
            },
            function (template_instance_js_3_1) {
                template_instance_js_3 = template_instance_js_3_1;
            },
            function (template_js_7_1) {
                template_js_7 = template_js_7_1;
            },
            function (lit_html_js_2_1) {
                exports_15({
                    "html": lit_html_js_2_1["html"],
                    "svg": lit_html_js_2_1["svg"],
                    "TemplateResult": lit_html_js_2_1["TemplateResult"]
                });
            }
        ],
        execute: function () {
            getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
            compatibleShadyCSSVersion = true;
            if (typeof window.ShadyCSS === 'undefined') {
                compatibleShadyCSSVersion = false;
            }
            else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
                console.warn(`Incompatible ShadyCSS version detected. ` +
                    `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +
                    `@webcomponents/shadycss@1.3.1.`);
                compatibleShadyCSSVersion = false;
            }
            exports_15("shadyTemplateFactory", shadyTemplateFactory = scopeName => result => {
                const cacheKey = getTemplateCacheKey(result.type, scopeName);
                let templateCache = template_factory_js_3.templateCaches.get(cacheKey);
                if (templateCache === undefined) {
                    templateCache = {
                        stringsArray: new WeakMap(),
                        keyString: new Map()
                    };
                    template_factory_js_3.templateCaches.set(cacheKey, templateCache);
                }
                let template = templateCache.stringsArray.get(result.strings);
                if (template !== undefined) {
                    return template;
                }
                const key = result.strings.join(template_js_7.marker);
                template = templateCache.keyString.get(key);
                if (template === undefined) {
                    const element = result.getTemplateElement();
                    if (compatibleShadyCSSVersion) {
                        window.ShadyCSS.prepareTemplateDom(element, scopeName);
                    }
                    template = new template_js_7.Template(result, element);
                    templateCache.keyString.set(key, template);
                }
                templateCache.stringsArray.set(result.strings, template);
                return template;
            });
            TEMPLATE_TYPES = ['html', 'svg'];
            removeStylesFromLitTemplates = scopeName => {
                TEMPLATE_TYPES.forEach(type => {
                    const templates = template_factory_js_3.templateCaches.get(getTemplateCacheKey(type, scopeName));
                    if (templates !== undefined) {
                        templates.keyString.forEach(template => {
                            const { element: { content } } = template;
                            const styles = new Set();
                            Array.from(content.querySelectorAll('style')).forEach(s => {
                                styles.add(s);
                            });
                            modify_template_js_1.removeNodesFromTemplate(template, styles);
                        });
                    }
                });
            };
            shadyRenderSet = new Set();
            prepareTemplateStyles = (scopeName, renderedDOM, template) => {
                shadyRenderSet.add(scopeName);
                const templateElement = !!template ? template.element : document.createElement('template');
                const styles = renderedDOM.querySelectorAll('style');
                const { length } = styles;
                if (length === 0) {
                    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
                    return;
                }
                const condensedStyle = document.createElement('style');
                for (let i = 0; i < length; i++) {
                    const style = styles[i];
                    style.parentNode.removeChild(style);
                    condensedStyle.textContent += style.textContent;
                }
                removeStylesFromLitTemplates(scopeName);
                const content = templateElement.content;
                if (!!template) {
                    modify_template_js_1.insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
                }
                else {
                    content.insertBefore(condensedStyle, content.firstChild);
                }
                window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
                const style = content.querySelector('style');
                if (window.ShadyCSS.nativeShadow && style !== null) {
                    renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
                }
                else if (!!template) {
                    content.insertBefore(condensedStyle, content.firstChild);
                    const removes = new Set();
                    removes.add(condensedStyle);
                    modify_template_js_1.removeNodesFromTemplate(template, removes);
                }
            };
            exports_15("render", render = (result, container, options) => {
                if (!options || typeof options !== 'object' || !options.scopeName) {
                    throw new Error('The `scopeName` option is required.');
                }
                const scopeName = options.scopeName;
                const hasRendered = render_js_2.parts.has(container);
                const needsScoping = compatibleShadyCSSVersion &&
                    container.nodeType === 11 &&
                    !!container.host;
                const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
                const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
                render_js_2.render(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
                if (firstScopeRender) {
                    const part = render_js_2.parts.get(renderContainer);
                    render_js_2.parts.delete(renderContainer);
                    const template = part.value instanceof template_instance_js_3.TemplateInstance ?
                        part.value.template :
                        undefined;
                    prepareTemplateStyles(scopeName, renderContainer, template);
                    dom_js_6.removeNodes(container, container.firstChild);
                    container.appendChild(renderContainer);
                    render_js_2.parts.set(container, part);
                }
                if (!hasRendered && needsScoping) {
                    window.ShadyCSS.styleElement(container.host);
                }
            });
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-element@2.4.0/lib/updating-element", [], function (exports_16, context_16) {
    "use strict";
    var _a, defaultConverter, notEqual, defaultPropertyDeclaration, STATE_HAS_UPDATED, STATE_UPDATE_REQUESTED, STATE_IS_REFLECTING_TO_ATTRIBUTE, STATE_IS_REFLECTING_TO_PROPERTY, finalized, UpdatingElement;
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [],
        execute: function () {
            window.JSCompiler_renameProperty =
                (prop, _obj) => prop;
            exports_16("defaultConverter", defaultConverter = {
                toAttribute(value, type) {
                    switch (type) {
                        case Boolean:
                            return value ? '' : null;
                        case Object:
                        case Array:
                            return value == null ? value : JSON.stringify(value);
                    }
                    return value;
                },
                fromAttribute(value, type) {
                    switch (type) {
                        case Boolean:
                            return value !== null;
                        case Number:
                            return value === null ? null : Number(value);
                        case Object:
                        case Array:
                            return JSON.parse(value);
                    }
                    return value;
                }
            });
            exports_16("notEqual", notEqual = (value, old) => {
                return old !== value && (old === old || value === value);
            });
            defaultPropertyDeclaration = {
                attribute: true,
                type: String,
                converter: defaultConverter,
                reflect: false,
                hasChanged: notEqual
            };
            STATE_HAS_UPDATED = 1;
            STATE_UPDATE_REQUESTED = 1 << 2;
            STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
            STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
            finalized = 'finalized';
            UpdatingElement = class UpdatingElement extends HTMLElement {
                constructor() {
                    super();
                    this.initialize();
                }
                static get observedAttributes() {
                    this.finalize();
                    const attributes = [];
                    this._classProperties.forEach((v, p) => {
                        const attr = this._attributeNameForProperty(p, v);
                        if (attr !== undefined) {
                            this._attributeToPropertyMap.set(attr, p);
                            attributes.push(attr);
                        }
                    });
                    return attributes;
                }
                static _ensureClassProperties() {
                    if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
                        this._classProperties = new Map();
                        const superProperties = Object.getPrototypeOf(this)._classProperties;
                        if (superProperties !== undefined) {
                            superProperties.forEach((v, k) => this._classProperties.set(k, v));
                        }
                    }
                }
                static createProperty(name, options = defaultPropertyDeclaration) {
                    this._ensureClassProperties();
                    this._classProperties.set(name, options);
                    if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
                        return;
                    }
                    const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
                    const descriptor = this.getPropertyDescriptor(name, key, options);
                    if (descriptor !== undefined) {
                        Object.defineProperty(this.prototype, name, descriptor);
                    }
                }
                static getPropertyDescriptor(name, key, options) {
                    return {
                        get() {
                            return this[key];
                        },
                        set(value) {
                            const oldValue = this[name];
                            this[key] = value;
                            this.
                                requestUpdateInternal(name, oldValue, options);
                        },
                        configurable: true,
                        enumerable: true
                    };
                }
                static getPropertyOptions(name) {
                    return this._classProperties && this._classProperties.get(name) ||
                        defaultPropertyDeclaration;
                }
                static finalize() {
                    const superCtor = Object.getPrototypeOf(this);
                    if (!superCtor.hasOwnProperty(finalized)) {
                        superCtor.finalize();
                    }
                    this[finalized] = true;
                    this._ensureClassProperties();
                    this._attributeToPropertyMap = new Map();
                    if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
                        const props = this.properties;
                        const propKeys = [
                            ...Object.getOwnPropertyNames(props),
                            ...(typeof Object.getOwnPropertySymbols === 'function' ?
                                Object.getOwnPropertySymbols(props) :
                                [])
                        ];
                        for (const p of propKeys) {
                            this.createProperty(p, props[p]);
                        }
                    }
                }
                static _attributeNameForProperty(name, options) {
                    const attribute = options.attribute;
                    return attribute === false ?
                        undefined :
                        typeof attribute === 'string' ?
                            attribute :
                            typeof name === 'string' ? name.toLowerCase() : undefined;
                }
                static _valueHasChanged(value, old, hasChanged = notEqual) {
                    return hasChanged(value, old);
                }
                static _propertyValueFromAttribute(value, options) {
                    const type = options.type;
                    const converter = options.converter || defaultConverter;
                    const fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
                    return fromAttribute ? fromAttribute(value, type) : value;
                }
                static _propertyValueToAttribute(value, options) {
                    if (options.reflect === undefined) {
                        return;
                    }
                    const type = options.type;
                    const converter = options.converter;
                    const toAttribute = converter && converter.toAttribute ||
                        defaultConverter.toAttribute;
                    return toAttribute(value, type);
                }
                initialize() {
                    this._updateState = 0;
                    this._updatePromise =
                        new Promise(res => this._enableUpdatingResolver = res);
                    this._changedProperties = new Map();
                    this._saveInstanceProperties();
                    this.requestUpdateInternal();
                }
                _saveInstanceProperties() {
                    this.constructor.
                        _classProperties.forEach((_v, p) => {
                        if (this.hasOwnProperty(p)) {
                            const value = this[p];
                            delete this[p];
                            if (!this._instanceProperties) {
                                this._instanceProperties = new Map();
                            }
                            this._instanceProperties.set(p, value);
                        }
                    });
                }
                _applyInstanceProperties() {
                    this._instanceProperties.forEach((v, p) => this[p] = v);
                    this._instanceProperties = undefined;
                }
                connectedCallback() {
                    this.enableUpdating();
                }
                enableUpdating() {
                    if (this._enableUpdatingResolver !== undefined) {
                        this._enableUpdatingResolver();
                        this._enableUpdatingResolver = undefined;
                    }
                }
                disconnectedCallback() {
                }
                attributeChangedCallback(name, old, value) {
                    if (old !== value) {
                        this._attributeToProperty(name, value);
                    }
                }
                _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
                    const ctor = this.constructor;
                    const attr = ctor._attributeNameForProperty(name, options);
                    if (attr !== undefined) {
                        const attrValue = ctor._propertyValueToAttribute(value, options);
                        if (attrValue === undefined) {
                            return;
                        }
                        this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
                        if (attrValue == null) {
                            this.removeAttribute(attr);
                        }
                        else {
                            this.setAttribute(attr, attrValue);
                        }
                        this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
                    }
                }
                _attributeToProperty(name, value) {
                    if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
                        return;
                    }
                    const ctor = this.constructor;
                    const propName = ctor._attributeToPropertyMap.get(name);
                    if (propName !== undefined) {
                        const options = ctor.getPropertyOptions(propName);
                        this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
                        this[propName] =
                            ctor._propertyValueFromAttribute(value, options);
                        this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
                    }
                }
                requestUpdateInternal(name, oldValue, options) {
                    let shouldRequestUpdate = true;
                    if (name !== undefined) {
                        const ctor = this.constructor;
                        options = options || ctor.getPropertyOptions(name);
                        if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                            if (!this._changedProperties.has(name)) {
                                this._changedProperties.set(name, oldValue);
                            }
                            if (options.reflect === true &&
                                !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                                if (this._reflectingProperties === undefined) {
                                    this._reflectingProperties = new Map();
                                }
                                this._reflectingProperties.set(name, options);
                            }
                        }
                        else {
                            shouldRequestUpdate = false;
                        }
                    }
                    if (!this._hasRequestedUpdate && shouldRequestUpdate) {
                        this._updatePromise = this._enqueueUpdate();
                    }
                }
                requestUpdate(name, oldValue) {
                    this.requestUpdateInternal(name, oldValue);
                    return this.updateComplete;
                }
                async _enqueueUpdate() {
                    this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
                    try {
                        await this._updatePromise;
                    }
                    catch (e) {
                    }
                    const result = this.performUpdate();
                    if (result != null) {
                        await result;
                    }
                    return !this._hasRequestedUpdate;
                }
                get _hasRequestedUpdate() {
                    return this._updateState & STATE_UPDATE_REQUESTED;
                }
                get hasUpdated() {
                    return this._updateState & STATE_HAS_UPDATED;
                }
                performUpdate() {
                    if (!this._hasRequestedUpdate) {
                        return;
                    }
                    if (this._instanceProperties) {
                        this._applyInstanceProperties();
                    }
                    let shouldUpdate = false;
                    const changedProperties = this._changedProperties;
                    try {
                        shouldUpdate = this.shouldUpdate(changedProperties);
                        if (shouldUpdate) {
                            this.update(changedProperties);
                        }
                        else {
                            this._markUpdated();
                        }
                    }
                    catch (e) {
                        shouldUpdate = false;
                        this._markUpdated();
                        throw e;
                    }
                    if (shouldUpdate) {
                        if (!(this._updateState & STATE_HAS_UPDATED)) {
                            this._updateState = this._updateState | STATE_HAS_UPDATED;
                            this.firstUpdated(changedProperties);
                        }
                        this.updated(changedProperties);
                    }
                }
                _markUpdated() {
                    this._changedProperties = new Map();
                    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
                }
                get updateComplete() {
                    return this._getUpdateComplete();
                }
                _getUpdateComplete() {
                    return this._updatePromise;
                }
                shouldUpdate(_changedProperties) {
                    return true;
                }
                update(_changedProperties) {
                    if (this._reflectingProperties !== undefined &&
                        this._reflectingProperties.size > 0) {
                        this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
                        this._reflectingProperties = undefined;
                    }
                    this._markUpdated();
                }
                updated(_changedProperties) {
                }
                firstUpdated(_changedProperties) {
                }
            };
            exports_16("UpdatingElement", UpdatingElement);
            _a = finalized;
            UpdatingElement[_a] = true;
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-element@2.4.0/lib/decorators", [], function (exports_17, context_17) {
    "use strict";
    var legacyCustomElement, standardCustomElement, customElement, standardProperty, legacyProperty, legacyQuery, standardQuery, standardEventOptions, legacyEventOptions, ElementProto, legacyMatches;
    var __moduleName = context_17 && context_17.id;
    function property(options) {
        return (protoOrDescriptor, name) => name !== undefined ?
            legacyProperty(options, protoOrDescriptor, name) :
            standardProperty(options, protoOrDescriptor);
    }
    exports_17("property", property);
    function internalProperty(options) {
        return property({ attribute: false, hasChanged: options === null || options === void 0 ? void 0 : options.hasChanged });
    }
    exports_17("internalProperty", internalProperty);
    function query(selector, cache) {
        return (protoOrDescriptor, name) => {
            const descriptor = {
                get() {
                    return this.renderRoot.querySelector(selector);
                },
                enumerable: true,
                configurable: true
            };
            if (cache) {
                const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
                descriptor.get = function () {
                    if (this[key] === undefined) {
                        this[key] =
                            this.renderRoot.querySelector(selector);
                    }
                    return this[key];
                };
            }
            return name !== undefined ?
                legacyQuery(descriptor, protoOrDescriptor, name) :
                standardQuery(descriptor, protoOrDescriptor);
        };
    }
    exports_17("query", query);
    function queryAsync(selector) {
        return (protoOrDescriptor, name) => {
            const descriptor = {
                async get() {
                    await this.updateComplete;
                    return this.renderRoot.querySelector(selector);
                },
                enumerable: true,
                configurable: true
            };
            return name !== undefined ?
                legacyQuery(descriptor, protoOrDescriptor, name) :
                standardQuery(descriptor, protoOrDescriptor);
        };
    }
    exports_17("queryAsync", queryAsync);
    function queryAll(selector) {
        return (protoOrDescriptor, name) => {
            const descriptor = {
                get() {
                    return this.renderRoot.querySelectorAll(selector);
                },
                enumerable: true,
                configurable: true
            };
            return name !== undefined ?
                legacyQuery(descriptor, protoOrDescriptor, name) :
                standardQuery(descriptor, protoOrDescriptor);
        };
    }
    exports_17("queryAll", queryAll);
    function eventOptions(options) {
        return (protoOrDescriptor, name) => name !== undefined ?
            legacyEventOptions(options, protoOrDescriptor, name) :
            standardEventOptions(options, protoOrDescriptor);
    }
    exports_17("eventOptions", eventOptions);
    function queryAssignedNodes(slotName = '', flatten = false, selector = '') {
        return (protoOrDescriptor, name) => {
            const descriptor = {
                get() {
                    const slotSelector = `slot${slotName ? `[name=${slotName}]` : ':not([name])'}`;
                    const slot = this.renderRoot.querySelector(slotSelector);
                    let nodes = slot && slot.assignedNodes({ flatten });
                    if (nodes && selector) {
                        nodes = nodes.filter(node => node.nodeType === Node.ELEMENT_NODE &&
                            node.matches ?
                            node.matches(selector) :
                            legacyMatches.call(node, selector));
                    }
                    return nodes;
                },
                enumerable: true,
                configurable: true
            };
            return name !== undefined ?
                legacyQuery(descriptor, protoOrDescriptor, name) :
                standardQuery(descriptor, protoOrDescriptor);
        };
    }
    exports_17("queryAssignedNodes", queryAssignedNodes);
    return {
        setters: [],
        execute: function () {
            legacyCustomElement = (tagName, clazz) => {
                window.customElements.define(tagName, clazz);
                return clazz;
            };
            standardCustomElement = (tagName, descriptor) => {
                const { kind, elements } = descriptor;
                return {
                    kind,
                    elements,
                    finisher(clazz) {
                        window.customElements.define(tagName, clazz);
                    }
                };
            };
            exports_17("customElement", customElement = tagName => classOrDescriptor => typeof classOrDescriptor === 'function' ?
                legacyCustomElement(tagName, classOrDescriptor) :
                standardCustomElement(tagName, classOrDescriptor));
            standardProperty = (options, element) => {
                if (element.kind === 'method' && element.descriptor &&
                    !('value' in element.descriptor)) {
                    return Object.assign(Object.assign({}, element), { finisher(clazz) {
                            clazz.createProperty(element.key, options);
                        } });
                }
                else {
                    return {
                        kind: 'field',
                        key: Symbol(),
                        placement: 'own',
                        descriptor: {},
                        initializer() {
                            if (typeof element.initializer === 'function') {
                                this[element.key] = element.initializer.call(this);
                            }
                        },
                        finisher(clazz) {
                            clazz.createProperty(element.key, options);
                        }
                    };
                }
            };
            legacyProperty = (options, proto, name) => {
                proto.constructor.
                    createProperty(name, options);
            };
            legacyQuery = (descriptor, proto, name) => {
                Object.defineProperty(proto, name, descriptor);
            };
            standardQuery = (descriptor, element) => ({
                kind: 'method',
                placement: 'prototype',
                key: element.key,
                descriptor
            });
            standardEventOptions = (options, element) => {
                return Object.assign(Object.assign({}, element), { finisher(clazz) {
                        Object.assign(clazz.prototype[element.key], options);
                    } });
            };
            legacyEventOptions = (options, proto, name) => {
                Object.assign(proto[name], options);
            };
            ElementProto = Element.prototype;
            legacyMatches = ElementProto.msMatchesSelector || ElementProto.webkitMatchesSelector;
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-element@2.4.0/lib/css-tag", [], function (exports_18, context_18) {
    "use strict";
    var supportsAdoptingStyleSheets, constructionToken, CSSResult, unsafeCSS, textFromCSSResult, css;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
            exports_18("supportsAdoptingStyleSheets", supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) &&
                'adoptedStyleSheets' in Document.prototype &&
                'replace' in CSSStyleSheet.prototype);
            constructionToken = Symbol();
            CSSResult = class CSSResult {
                constructor(cssText, safeToken) {
                    if (safeToken !== constructionToken) {
                        throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
                    }
                    this.cssText = cssText;
                }
                get styleSheet() {
                    if (this._styleSheet === undefined) {
                        if (supportsAdoptingStyleSheets) {
                            this._styleSheet = new CSSStyleSheet();
                            this._styleSheet.replaceSync(this.cssText);
                        }
                        else {
                            this._styleSheet = null;
                        }
                    }
                    return this._styleSheet;
                }
                toString() {
                    return this.cssText;
                }
            };
            exports_18("CSSResult", CSSResult);
            exports_18("unsafeCSS", unsafeCSS = value => {
                return new CSSResult(String(value), constructionToken);
            });
            textFromCSSResult = value => {
                if (value instanceof CSSResult) {
                    return value.cssText;
                }
                else if (typeof value === 'number') {
                    return value;
                }
                else {
                    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
                }
            };
            exports_18("css", css = (strings, ...values) => {
                const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
                return new CSSResult(cssText, constructionToken);
            });
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/lit-element@2.4.0/lit-element", ["https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lib/shady-render", "https://ethereal-incredible-freedom.glitch.me/lit-element@2.4.0/lib/updating-element", "https://ethereal-incredible-freedom.glitch.me/lit-element@2.4.0/lib/decorators", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/lit-html", "https://ethereal-incredible-freedom.glitch.me/lit-element@2.4.0/lib/css-tag"], function (exports_19, context_19) {
    "use strict";
    var shady_render_js_1, updating_element_js_1, css_tag_js_1, renderNotImplemented, LitElement;
    var __moduleName = context_19 && context_19.id;
    var exportedNames_1 = {
        "html": true,
        "svg": true,
        "TemplateResult": true,
        "SVGTemplateResult": true,
        "LitElement": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_19(exports);
    }
    return {
        setters: [
            function (shady_render_js_1_1) {
                shady_render_js_1 = shady_render_js_1_1;
            },
            function (updating_element_js_1_1) {
                updating_element_js_1 = updating_element_js_1_1;
                exportStar_1(updating_element_js_1_1);
            },
            function (decorators_js_1_1) {
                exportStar_1(decorators_js_1_1);
            },
            function (lit_html_js_3_1) {
                exports_19({
                    "html": lit_html_js_3_1["html"],
                    "svg": lit_html_js_3_1["svg"],
                    "TemplateResult": lit_html_js_3_1["TemplateResult"],
                    "SVGTemplateResult": lit_html_js_3_1["SVGTemplateResult"]
                });
            },
            function (css_tag_js_1_1) {
                css_tag_js_1 = css_tag_js_1_1;
                exportStar_1(css_tag_js_1_1);
            }
        ],
        execute: function () {
            (window['litElementVersions'] || (window['litElementVersions'] = [])).
                push('2.4.0');
            renderNotImplemented = {};
            LitElement = class LitElement extends updating_element_js_1.UpdatingElement {
                static getStyles() {
                    return this.styles;
                }
                static _getUniqueStyles() {
                    if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
                        return;
                    }
                    const userStyles = this.getStyles();
                    if (Array.isArray(userStyles)) {
                        const addStyles = (styles, set) => styles.reduceRight((set, s) => Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set);
                        const set = addStyles(userStyles, new Set());
                        const styles = [];
                        set.forEach(v => styles.unshift(v));
                        this._styles = styles;
                    }
                    else {
                        this._styles = userStyles === undefined ? [] : [userStyles];
                    }
                    this._styles = this._styles.map(s => {
                        if (s instanceof CSSStyleSheet && !css_tag_js_1.supportsAdoptingStyleSheets) {
                            const cssText = Array.prototype.slice.call(s.cssRules).
                                reduce((css, rule) => css + rule.cssText, '');
                            return css_tag_js_1.unsafeCSS(cssText);
                        }
                        return s;
                    });
                }
                initialize() {
                    super.initialize();
                    this.constructor._getUniqueStyles();
                    this.renderRoot = this.createRenderRoot();
                    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
                        this.adoptStyles();
                    }
                }
                createRenderRoot() {
                    return this.attachShadow({ mode: 'open' });
                }
                adoptStyles() {
                    const styles = this.constructor._styles;
                    if (styles.length === 0) {
                        return;
                    }
                    if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
                        window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(s => s.cssText), this.localName);
                    }
                    else if (css_tag_js_1.supportsAdoptingStyleSheets) {
                        this.renderRoot.adoptedStyleSheets =
                            styles.map(s => s instanceof CSSStyleSheet ? s : s.styleSheet);
                    }
                    else {
                        this._needsShimAdoptedStyleSheets = true;
                    }
                }
                connectedCallback() {
                    super.connectedCallback();
                    if (this.hasUpdated && window.ShadyCSS !== undefined) {
                        window.ShadyCSS.styleElement(this);
                    }
                }
                update(changedProperties) {
                    const templateResult = this.render();
                    super.update(changedProperties);
                    if (templateResult !== renderNotImplemented) {
                        this.constructor.
                            render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
                    }
                    if (this._needsShimAdoptedStyleSheets) {
                        this._needsShimAdoptedStyleSheets = false;
                        this.constructor._styles.forEach(s => {
                            const style = document.createElement('style');
                            style.textContent = s.cssText;
                            this.renderRoot.appendChild(style);
                        });
                    }
                }
                render() {
                    return renderNotImplemented;
                }
            };
            exports_19("LitElement", LitElement);
            LitElement['finalized'] = true;
            LitElement.render = shady_render_js_1.render;
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/wired-lib@2.1.0/lib/wired-base", ["https://ethereal-incredible-freedom.glitch.me/lit-element@2.4.0/lit-element"], function (exports_20, context_20) {
    "use strict";
    var __decorate, __metadata, lit_element_js_1, BaseCSS, WiredBase;
    var __moduleName = context_20 && context_20.id;
    function fire(element, name, detail, bubbles = true, composed = true) {
        if (name) {
            const init = {
                bubbles: typeof bubbles === 'boolean' ? bubbles : true,
                composed: typeof composed === 'boolean' ? composed : true
            };
            if (detail) {
                init.detail = detail;
            }
            element.dispatchEvent(new CustomEvent(name, init));
        }
    }
    exports_20("fire", fire);
    function randomSeed() {
        return Math.floor(Math.random() * 2 ** 31);
    }
    exports_20("randomSeed", randomSeed);
    return {
        setters: [
            function (lit_element_js_1_1) {
                lit_element_js_1 = lit_element_js_1_1;
            }
        ],
        execute: function () {
            __decorate = this && this.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                    r = Reflect.decorate(decorators, target, key, desc);
                else
                    for (var i = decorators.length - 1; i >= 0; i--)
                        if (d = decorators[i])
                            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            __metadata = this && this.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
                    return Reflect.metadata(k, v);
            };
            exports_20("BaseCSS", BaseCSS = lit_element_js_1.css `
:host {
  opacity: 0;
}
:host(.wired-rendered) {
  opacity: 1;
}
#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
svg {
  display: block;
}
path {
  stroke: currentColor;
  stroke-width: 0.7;
  fill: transparent;
}
.hidden {
  display: none !important;
}
`);
            WiredBase = class WiredBase extends lit_element_js_1.LitElement {
                constructor() {
                    super(...arguments);
                    this.lastSize = [0, 0];
                    this.seed = Math.floor(Math.random() * 2 ** 31);
                }
                updated(_changed) {
                    this.wiredRender();
                }
                wiredRender(force = false) {
                    if (this.svg) {
                        const size = this.canvasSize();
                        if (!force && size[0] === this.lastSize[0] && size[1] === this.lastSize[1]) {
                            return;
                        }
                        while (this.svg.hasChildNodes()) {
                            this.svg.removeChild(this.svg.lastChild);
                        }
                        this.svg.setAttribute('width', `${size[0]}`);
                        this.svg.setAttribute('height', `${size[1]}`);
                        this.draw(this.svg, size);
                        this.lastSize = size;
                        this.classList.add('wired-rendered');
                    }
                }
            };
            exports_20("WiredBase", WiredBase);
            __decorate([
                lit_element_js_1.query('svg'),
                __metadata("design:type", SVGSVGElement)
            ], WiredBase.prototype, "svg", void 0);
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/wired-lib@2.1.0/lib/wired-lib.esm", [], function (exports_21, context_21) {
    "use strict";
    var c, h, P;
    var __moduleName = context_21 && context_21.id;
    function t(t, n, e) { if (t && t.length) {
        const [o, s] = n, r = Math.PI / 180 * e, i = Math.cos(r), a = Math.sin(r);
        t.forEach(t => { const [n, e] = t; t[0] = (n - o) * i - (e - s) * a + o, t[1] = (n - o) * a + (e - s) * i + s; });
    } }
    function n(t) { const n = t[0], e = t[1]; return Math.sqrt(Math.pow(n[0] - e[0], 2) + Math.pow(n[1] - e[1], 2)); }
    function e(t, n, e, o) { const s = n[1] - t[1], r = t[0] - n[0], i = s * t[0] + r * t[1], a = o[1] - e[1], c = e[0] - o[0], h = a * e[0] + c * e[1], u = s * c - a * r; return u ? [(c * i - r * h) / u, (s * h - a * i) / u] : null; }
    function o(t, n, e) { const o = t.length; if (o < 3)
        return !1; const a = [Number.MAX_SAFE_INTEGER, e], c = [n, e]; let h = 0; for (let n = 0; n < o; n++) {
        const e = t[n], u = t[(n + 1) % o];
        if (i(e, u, c, a)) {
            if (0 === r(e, c, u))
                return s(e, c, u);
            h++;
        }
    } return h % 2 == 1; }
    function s(t, n, e) { return n[0] <= Math.max(t[0], e[0]) && n[0] >= Math.min(t[0], e[0]) && n[1] <= Math.max(t[1], e[1]) && n[1] >= Math.min(t[1], e[1]); }
    function r(t, n, e) { const o = (n[1] - t[1]) * (e[0] - n[0]) - (n[0] - t[0]) * (e[1] - n[1]); return 0 === o ? 0 : o > 0 ? 1 : 2; }
    function i(t, n, e, o) { const i = r(t, n, e), a = r(t, n, o), c = r(e, o, t), h = r(e, o, n); return i !== a && c !== h || !(0 !== i || !s(t, e, n)) || !(0 !== a || !s(t, o, n)) || !(0 !== c || !s(e, t, o)) || !(0 !== h || !s(e, n, o)); }
    function a(n, e) { const o = [0, 0], s = Math.round(e.hachureAngle + 90); s && t(n, o, s); const r = function (t, n) { const e = [...t]; e[0].join(",") !== e[e.length - 1].join(",") && e.push([e[0][0], e[0][1]]); const o = []; if (e && e.length > 2) {
        let t = n.hachureGap;
        t < 0 && (t = 4 * n.strokeWidth), t = Math.max(t, .1);
        const s = [];
        for (let t = 0; t < e.length - 1; t++) {
            const n = e[t], o = e[t + 1];
            if (n[1] !== o[1]) {
                const t = Math.min(n[1], o[1]);
                s.push({ ymin: t, ymax: Math.max(n[1], o[1]), x: t === n[1] ? n[0] : o[0], islope: (o[0] - n[0]) / (o[1] - n[1]) });
            }
        }
        if (s.sort((t, n) => t.ymin < n.ymin ? -1 : t.ymin > n.ymin ? 1 : t.x < n.x ? -1 : t.x > n.x ? 1 : t.ymax === n.ymax ? 0 : (t.ymax - n.ymax) / Math.abs(t.ymax - n.ymax)), !s.length)
            return o;
        let r = [], i = s[0].ymin;
        for (; r.length || s.length;) {
            if (s.length) {
                let t = -1;
                for (let n = 0; n < s.length && !(s[n].ymin > i); n++)
                    t = n;
                s.splice(0, t + 1).forEach(t => { r.push({ s: i, edge: t }); });
            }
            if (r = r.filter(t => !(t.edge.ymax <= i)), r.sort((t, n) => t.edge.x === n.edge.x ? 0 : (t.edge.x - n.edge.x) / Math.abs(t.edge.x - n.edge.x)), r.length > 1)
                for (let t = 0; t < r.length; t += 2) {
                    const n = t + 1;
                    if (n >= r.length)
                        break;
                    const e = r[t].edge, s = r[n].edge;
                    o.push([[Math.round(e.x), i], [Math.round(s.x), i]]);
                }
            i += t, r.forEach(n => { n.edge.x = n.edge.x + t * n.edge.islope; });
        }
    } return o; }(n, e); return s && (t(n, o, -s), function (n, e, o) { const s = []; n.forEach(t => s.push(...t)), t(s, e, o); }(r, o, -s)), r; }
    function u(t, n, e, o, s) { return { type: "path", ops: M(t, n, e, o, s) }; }
    function l(t, n) { return function (t, n, e) { const o = (t || []).length; if (o > 2) {
        const s = [];
        for (let n = 0; n < o - 1; n++)
            s.push(...M(t[n][0], t[n][1], t[n + 1][0], t[n + 1][1], e));
        return n && s.push(...M(t[o - 1][0], t[o - 1][1], t[0][0], t[0][1], e)), { type: "path", ops: s };
    } return 2 === o ? u(t[0][0], t[0][1], t[1][0], t[1][1], e) : { type: "path", ops: [] }; }(t, !0, n); }
    function f(t, n, e, o, s) { return function (t, n, e, o) { const [s, r] = b(o.increment, t, n, o.rx, o.ry, 1, o.increment * g(.1, g(.4, 1, e), e), e); let i = y(s, null, e); if (!e.disableMultiStroke) {
        const [s] = b(o.increment, t, n, o.rx, o.ry, 1.5, 0, e), r = y(s, null, e);
        i = i.concat(r);
    } return { estimatedPoints: r, opset: { type: "path", ops: i } }; }(t, n, s, p(e, o, s)).opset; }
    function p(t, n, e) { const o = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(n / 2, 2)) / 2)), s = Math.max(e.curveStepCount, e.curveStepCount / Math.sqrt(200) * o), r = 2 * Math.PI / s; let i = Math.abs(t / 2), a = Math.abs(n / 2); const c = 1 - e.curveFitting; return i += m(i * c, e), a += m(a * c, e), { increment: r, rx: i, ry: a }; }
    function d(t) { return t.randomizer || (t.randomizer = new h(t.seed || 0)), t.randomizer.next(); }
    function g(t, n, e, o = 1) { return e.roughness * o * (d(e) * (n - t) + t); }
    function m(t, n, e = 1) { return g(-t, t, n, e); }
    function M(t, n, e, o, s, r = !1) { const i = r ? s.disableMultiStrokeFill : s.disableMultiStroke, a = x(t, n, e, o, s, !0, !1); if (i)
        return a; const c = x(t, n, e, o, s, !0, !0); return a.concat(c); }
    function x(t, n, e, o, s, r, i) { const a = Math.pow(t - e, 2) + Math.pow(n - o, 2), c = Math.sqrt(a); let h = 1; h = c < 200 ? 1 : c > 500 ? .4 : -.0016668 * c + 1.233334; let u = s.maxRandomnessOffset || 0; u * u * 100 > a && (u = c / 10); const l = u / 2, f = .2 + .2 * d(s); let p = s.bowing * s.maxRandomnessOffset * (o - n) / 200, g = s.bowing * s.maxRandomnessOffset * (t - e) / 200; p = m(p, s, h), g = m(g, s, h); const M = [], x = () => m(l, s, h), y = () => m(u, s, h); return r && (i ? M.push({ op: "move", data: [t + x(), n + x()] }) : M.push({ op: "move", data: [t + m(u, s, h), n + m(u, s, h)] })), i ? M.push({ op: "bcurveTo", data: [p + t + (e - t) * f + x(), g + n + (o - n) * f + x(), p + t + 2 * (e - t) * f + x(), g + n + 2 * (o - n) * f + x(), e + x(), o + x()] }) : M.push({ op: "bcurveTo", data: [p + t + (e - t) * f + y(), g + n + (o - n) * f + y(), p + t + 2 * (e - t) * f + y(), g + n + 2 * (o - n) * f + y(), e + y(), o + y()] }), M; }
    function y(t, n, e) { const o = t.length, s = []; if (o > 3) {
        const r = [], i = 1 - e.curveTightness;
        s.push({ op: "move", data: [t[1][0], t[1][1]] });
        for (let n = 1; n + 2 < o; n++) {
            const e = t[n];
            r[0] = [e[0], e[1]], r[1] = [e[0] + (i * t[n + 1][0] - i * t[n - 1][0]) / 6, e[1] + (i * t[n + 1][1] - i * t[n - 1][1]) / 6], r[2] = [t[n + 1][0] + (i * t[n][0] - i * t[n + 2][0]) / 6, t[n + 1][1] + (i * t[n][1] - i * t[n + 2][1]) / 6], r[3] = [t[n + 1][0], t[n + 1][1]], s.push({ op: "bcurveTo", data: [r[1][0], r[1][1], r[2][0], r[2][1], r[3][0], r[3][1]] });
        }
        if (n && 2 === n.length) {
            const t = e.maxRandomnessOffset;
            s.push({ op: "lineTo", data: [n[0] + m(t, e), n[1] + m(t, e)] });
        }
    }
    else
        3 === o ? (s.push({ op: "move", data: [t[1][0], t[1][1]] }), s.push({ op: "bcurveTo", data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]] })) : 2 === o && s.push(...M(t[0][0], t[0][1], t[1][0], t[1][1], e)); return s; }
    function b(t, n, e, o, s, r, i, a) { const c = [], h = [], u = m(.5, a) - Math.PI / 2; h.push([m(r, a) + n + .9 * o * Math.cos(u - t), m(r, a) + e + .9 * s * Math.sin(u - t)]); for (let i = u; i < 2 * Math.PI + u - .01; i += t) {
        const t = [m(r, a) + n + o * Math.cos(i), m(r, a) + e + s * Math.sin(i)];
        c.push(t), h.push(t);
    } return h.push([m(r, a) + n + o * Math.cos(u + 2 * Math.PI + .5 * i), m(r, a) + e + s * Math.sin(u + 2 * Math.PI + .5 * i)]), h.push([m(r, a) + n + .98 * o * Math.cos(u + i), m(r, a) + e + .98 * s * Math.sin(u + i)]), h.push([m(r, a) + n + .9 * o * Math.cos(u + .5 * i), m(r, a) + e + .9 * s * Math.sin(u + .5 * i)]), [h, c]; }
    function v(t) { return { maxRandomnessOffset: 2, roughness: 1, bowing: .85, stroke: "#000", strokeWidth: 1.5, curveTightness: 0, curveFitting: .95, curveStepCount: 9, fillStyle: "hachure", fillWeight: 3.5, hachureAngle: -41, hachureGap: 5, dashOffset: -1, dashGap: -1, zigzagOffset: 0, combineNestedSvgPaths: !1, disableMultiStroke: !1, disableMultiStrokeFill: !1, seed: t }; }
    function w(t, n) { let e = ""; for (const o of t.ops) {
        const t = o.data;
        switch (o.op) {
            case "move":
                if (n && e)
                    break;
                e += `M${t[0]} ${t[1]} `;
                break;
            case "bcurveTo":
                e += `C${t[0]} ${t[1]}, ${t[2]} ${t[3]}, ${t[4]} ${t[5]} `;
                break;
            case "lineTo": e += `L${t[0]} ${t[1]} `;
        }
    } return e.trim(); }
    function I(t, n) { const e = document.createElementNS("http://www.w3.org/2000/svg", t); if (n)
        for (const t in n)
            e.setAttributeNS(null, t, n[t]); return e; }
    exports_21("svgNode", I);
    function S(t, n, e = !1) { const o = I("path", { d: w(t, e) }); return n && n.appendChild(o), o; }
    function k(t, n, e, o, s, r) { return S(function (t, n, e, o, s) { return l([[t, n], [t + e, n], [t + e, n + o], [t, n + o]], s); }(n + 2, e + 2, o - 4, s - 4, v(r)), t); }
    exports_21("rectangle", k);
    function O(t, n, e, o, s, r) { return S(u(n, e, o, s, v(r)), t); }
    exports_21("line", O);
    function T(t, n, e) { return S(l(n, v(e)), t, !0); }
    exports_21("polygon", T);
    function $(t, n, e, o, s, r) { return S(f(n, e, o = Math.max(o > 10 ? o - 4 : o - 1, 1), s = Math.max(s > 10 ? s - 4 : s - 1, 1), v(r)), t); }
    exports_21("ellipse", $);
    function E(t, n) { return S(new c(P).fillPolygon(t, v(n)), null); }
    exports_21("hachureFill", E);
    function L(t, n, e, o, s) { const r = p(e, o, v(s)), i = []; let a = 0; for (; a <= 2 * Math.PI;)
        i.push([t + r.rx * Math.cos(a), n + r.ry * Math.sin(a)]), a += r.increment; return E(i, s); }
    exports_21("hachureEllipseFill", L);
    return {
        setters: [],
        execute: function () {
            c = class c extends class {
                constructor(t) { this.helper = t; }
                fillPolygon(t, n) { return this._fillPolygon(t, n); }
                _fillPolygon(t, n, e = !1) { let o = a(t, n); if (e) {
                    const n = this.connectingLines(t, o);
                    o = o.concat(n);
                } return { type: "fillSketch", ops: this.renderLines(o, n) }; }
                renderLines(t, n) { const e = []; for (const o of t)
                    e.push(...this.helper.doubleLineOps(o[0][0], o[0][1], o[1][0], o[1][1], n)); return e; }
                connectingLines(t, e) { const o = []; if (e.length > 1)
                    for (let s = 1; s < e.length; s++) {
                        const r = e[s - 1];
                        if (n(r) < 3)
                            continue;
                        const i = [e[s][0], r[1]];
                        if (n(i) > 3) {
                            const n = this.splitOnIntersections(t, i);
                            o.push(...n);
                        }
                    } return o; }
                midPointInPolygon(t, n) { return o(t, (n[0][0] + n[1][0]) / 2, (n[0][1] + n[1][1]) / 2); }
                splitOnIntersections(t, s) { const r = Math.max(5, .1 * n(s)), a = []; for (let o = 0; o < t.length; o++) {
                    const c = t[o], h = t[(o + 1) % t.length];
                    if (i(c, h, ...s)) {
                        const t = e(c, h, s[0], s[1]);
                        if (t) {
                            const e = n([t, s[0]]), o = n([t, s[1]]);
                            e > r && o > r && a.push({ point: t, distance: e });
                        }
                    }
                } if (a.length > 1) {
                    const n = a.sort((t, n) => t.distance - n.distance).map(t => t.point);
                    if (o(t, ...s[0]) || n.shift(), o(t, ...s[1]) || n.pop(), n.length <= 1)
                        return this.midPointInPolygon(t, s) ? [s] : [];
                    const e = [s[0], ...n, s[1]], r = [];
                    for (let n = 0; n < e.length - 1; n += 2) {
                        const o = [e[n], e[n + 1]];
                        this.midPointInPolygon(t, o) && r.push(o);
                    }
                    return r;
                } return this.midPointInPolygon(t, s) ? [s] : []; }
            } {
                fillPolygon(t, n) { return this._fillPolygon(t, n, !0); }
            };
            h = class h {
                constructor(t) { this.seed = t; }
                next() { return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random(); }
            };
            P = { randOffset: (t, n) => t, randOffsetWithRange: (t, n, e) => (t + n) / 2, ellipse: (t, n, e, o, s) => f(t, n, e, o, s), doubleLineOps: (t, n, e, o, s) => function (t, n, e, o, s) { return M(t, n, e, o, s, !0); }(t, n, e, o, s) };
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/wired-button@2.1.0/lib/wired-button", ["https://ethereal-incredible-freedom.glitch.me/wired-lib@2.1.0/lib/wired-base", "https://ethereal-incredible-freedom.glitch.me/wired-lib@2.1.0/lib/wired-lib.esm", "https://ethereal-incredible-freedom.glitch.me/lit-element@2.4.0/lit-element"], function (exports_22, context_22) {
    "use strict";
    var __decorate, __metadata, wired_base_js_1, wired_lib_esm_js_1, lit_element_js_2, WiredButton;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [
            function (wired_base_js_1_1) {
                wired_base_js_1 = wired_base_js_1_1;
            },
            function (wired_lib_esm_js_1_1) {
                wired_lib_esm_js_1 = wired_lib_esm_js_1_1;
            },
            function (lit_element_js_2_1) {
                lit_element_js_2 = lit_element_js_2_1;
            }
        ],
        execute: function () {
            __decorate = this && this.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                    r = Reflect.decorate(decorators, target, key, desc);
                else
                    for (var i = decorators.length - 1; i >= 0; i--)
                        if (d = decorators[i])
                            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            __metadata = this && this.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
                    return Reflect.metadata(k, v);
            };
            WiredButton = class WiredButton extends wired_base_js_1.WiredBase {
                constructor() {
                    super();
                    this.elevation = 1;
                    this.disabled = false;
                    if (window.ResizeObserver) {
                        this.resizeObserver = new window.ResizeObserver(() => {
                            if (this.svg) {
                                this.wiredRender(true);
                            }
                        });
                    }
                }
                static get styles() {
                    return [
                        wired_base_js_1.BaseCSS,
                        lit_element_js_2.css `
        :host {
          display: inline-block;
          font-size: 14px;
        }
        path {
          transition: transform 0.05s ease;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 10px;
          color: inherit;
          outline: none;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button:active path {
          transform: scale(0.97) translate(1.5%, 1.5%);
        }
        button:focus path {
          stroke-width: 1.5;
        }
        button::-moz-focus-inner {
          border: 0;
        }
      `
                    ];
                }
                render() {
                    return lit_element_js_2.html `
    <button ?disabled="${this.disabled}">
      <slot @slotchange="${this.wiredRender}"></slot>
      <div id="overlay">
        <svg></svg>
      </div>
    </button>
    `;
                }
                focus() {
                    if (this.button) {
                        this.button.focus();
                    }
                    else {
                        super.focus();
                    }
                }
                canvasSize() {
                    if (this.button) {
                        const size = this.button.getBoundingClientRect();
                        const elev = Math.min(Math.max(1, this.elevation), 5);
                        const w = size.width + (elev - 1) * 2;
                        const h = size.height + (elev - 1) * 2;
                        return [w, h];
                    }
                    return this.lastSize;
                }
                draw(svg, size) {
                    const elev = Math.min(Math.max(1, this.elevation), 5);
                    const s = {
                        width: size[0] - (elev - 1) * 2,
                        height: size[1] - (elev - 1) * 2
                    };
                    wired_lib_esm_js_1.rectangle(svg, 0, 0, s.width, s.height, this.seed);
                    for (let i = 1; i < elev; i++) {
                        wired_lib_esm_js_1.line(svg, i * 2, s.height + i * 2, s.width + i * 2, s.height + i * 2, this.seed).style.opacity = `${(75 - i * 10) / 100}`;
                        wired_lib_esm_js_1.line(svg, s.width + i * 2, s.height + i * 2, s.width + i * 2, i * 2, this.seed).style.opacity = `${(75 - i * 10) / 100}`;
                        wired_lib_esm_js_1.line(svg, i * 2, s.height + i * 2, s.width + i * 2, s.height + i * 2, this.seed).style.opacity = `${(75 - i * 10) / 100}`;
                        wired_lib_esm_js_1.line(svg, s.width + i * 2, s.height + i * 2, s.width + i * 2, i * 2, this.seed).style.opacity = `${(75 - i * 10) / 100}`;
                    }
                }
                updated() {
                    super.updated();
                    this.attachResizeListener();
                }
                disconnectedCallback() {
                    this.detachResizeListener();
                }
                attachResizeListener() {
                    if (this.button && this.resizeObserver && this.resizeObserver.observe) {
                        this.resizeObserver.observe(this.button);
                    }
                }
                detachResizeListener() {
                    if (this.button && this.resizeObserver && this.resizeObserver.unobserve) {
                        this.resizeObserver.unobserve(this.button);
                    }
                }
            };
            exports_22("WiredButton", WiredButton);
            __decorate([
                lit_element_js_2.property({ type: Number }),
                __metadata("design:type", Object)
            ], WiredButton.prototype, "elevation", void 0);
            __decorate([
                lit_element_js_2.property({ type: Boolean, reflect: true }),
                __metadata("design:type", Object)
            ], WiredButton.prototype, "disabled", void 0);
            __decorate([
                lit_element_js_2.query('button'),
                __metadata("design:type", HTMLButtonElement)
            ], WiredButton.prototype, "button", void 0);
            exports_22("WiredButton", WiredButton = __decorate([
                lit_element_js_2.customElement('wired-button'),
                __metadata("design:paramtypes", [])
            ], WiredButton));
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/wired-slider@2.1.2/lib/wired-slider", ["https://ethereal-incredible-freedom.glitch.me/wired-lib@2.1.0/lib/wired-base", "https://ethereal-incredible-freedom.glitch.me/lit-element@2.4.0/lit-element", "https://ethereal-incredible-freedom.glitch.me/wired-lib@2.1.0/lib/wired-lib.esm"], function (exports_23, context_23) {
    "use strict";
    var __decorate, __metadata, wired_base_js_2, lit_element_js_3, wired_lib_esm_js_2, WiredSlider;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [
            function (wired_base_js_2_1) {
                wired_base_js_2 = wired_base_js_2_1;
            },
            function (lit_element_js_3_1) {
                lit_element_js_3 = lit_element_js_3_1;
            },
            function (wired_lib_esm_js_2_1) {
                wired_lib_esm_js_2 = wired_lib_esm_js_2_1;
            }
        ],
        execute: function () {
            __decorate = this && this.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                    r = Reflect.decorate(decorators, target, key, desc);
                else
                    for (var i = decorators.length - 1; i >= 0; i--)
                        if (d = decorators[i])
                            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            __metadata = this && this.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
                    return Reflect.metadata(k, v);
            };
            WiredSlider = class WiredSlider extends wired_base_js_2.WiredBase {
                constructor() {
                    super(...arguments);
                    this.min = 0;
                    this.max = 100;
                    this.step = 1;
                    this.disabled = false;
                    this.canvasWidth = 300;
                }
                static get styles() {
                    return [
                        wired_base_js_2.BaseCSS,
                        lit_element_js_3.css `
      :host {
        display: inline-block;
        position: relative;
        width: 300px;
        box-sizing: border-box;
      }
      :host([disabled]) {
        opacity: 0.45 !important;
        cursor: default;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.07);
        border-radius: 5px;
      }
      input[type=range] {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        margin: 0;
        -webkit-appearance: none;
        background: transparent;
        outline: none;
        position: relative;
      }
      input[type=range]:focus {
        outline: none;
      }
      input[type=range]::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
      }
      input[type=range]::-moz-focus-outer {
        outline: none;
        border: 0;
      }
      input[type=range]::-moz-range-thumb {
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        margin: 0;
        height: 20px;
        width: 20px;
        line-height: 1;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        height: 20px;
        width: 20px;
        margin: 0;
        line-height: 1;
      }
      .knob{
        fill: var(--wired-slider-knob-color, rgb(51, 103, 214));
        stroke: var(--wired-slider-knob-color, rgb(51, 103, 214));
      }
      .bar {
        stroke: var(--wired-slider-bar-color, rgb(0, 0, 0));
      }
      input:focus + div svg .knob {
        stroke: var(--wired-slider-knob-outline-color, #000);
        fill-opacity: 0.8;
      }
      `
                    ];
                }
                get value() {
                    if (this.input) {
                        return +this.input.value;
                    }
                    return this.min;
                }
                set value(v) {
                    if (this.input) {
                        this.input.value = `${v}`;
                    }
                    else {
                        this.pendingValue = v;
                    }
                    this.updateThumbPosition();
                }
                firstUpdated() {
                    this.value = this.pendingValue || +(this.getAttribute('value') || this.value || this.min);
                    delete this.pendingValue;
                }
                render() {
                    return lit_element_js_3.html `
    <div id="container">
      <input type="range" 
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        ?disabled="${this.disabled}"
        @input="${this.onInput}">
      <div id="overlay">
        <svg></svg>
      </div>
    </div>
    `;
                }
                focus() {
                    if (this.input) {
                        this.input.focus();
                    }
                    else {
                        super.focus();
                    }
                }
                onInput(e) {
                    e.stopPropagation();
                    this.updateThumbPosition();
                    if (this.input) {
                        wired_base_js_2.fire(this, 'change', { value: +this.input.value });
                    }
                }
                wiredRender(force = false) {
                    super.wiredRender(force);
                    this.updateThumbPosition();
                }
                canvasSize() {
                    const s = this.getBoundingClientRect();
                    return [s.width, s.height];
                }
                draw(svg, size) {
                    this.canvasWidth = size[0];
                    const midY = Math.round(size[1] / 2);
                    wired_lib_esm_js_2.line(svg, 0, midY, size[0], midY, this.seed).classList.add('bar');
                    this.knob = wired_lib_esm_js_2.ellipse(svg, 10, midY, 20, 20, this.seed);
                    this.knob.classList.add('knob');
                }
                updateThumbPosition() {
                    if (this.input) {
                        const value = +this.input.value;
                        const delta = Math.max(this.step, this.max - this.min);
                        const pct = (value - this.min) / delta;
                        if (this.knob) {
                            this.knob.style.transform = `translateX(${pct * (this.canvasWidth - 20)}px)`;
                        }
                    }
                }
            };
            exports_23("WiredSlider", WiredSlider);
            __decorate([
                lit_element_js_3.property({ type: Number }),
                __metadata("design:type", Object)
            ], WiredSlider.prototype, "min", void 0);
            __decorate([
                lit_element_js_3.property({ type: Number }),
                __metadata("design:type", Object)
            ], WiredSlider.prototype, "max", void 0);
            __decorate([
                lit_element_js_3.property({ type: Number }),
                __metadata("design:type", Object)
            ], WiredSlider.prototype, "step", void 0);
            __decorate([
                lit_element_js_3.property({ type: Boolean, reflect: true }),
                __metadata("design:type", Object)
            ], WiredSlider.prototype, "disabled", void 0);
            __decorate([
                lit_element_js_3.query('input'),
                __metadata("design:type", HTMLInputElement)
            ], WiredSlider.prototype, "input", void 0);
            exports_23("WiredSlider", WiredSlider = __decorate([
                lit_element_js_3.customElement('wired-slider')
            ], WiredSlider));
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/wired-input@2.1.1/lib/wired-input", ["https://ethereal-incredible-freedom.glitch.me/wired-lib@2.1.0/lib/wired-lib.esm", "https://ethereal-incredible-freedom.glitch.me/wired-lib@2.1.0/lib/wired-base", "https://ethereal-incredible-freedom.glitch.me/lit-element@2.4.0/lit-element"], function (exports_24, context_24) {
    "use strict";
    var __decorate, __metadata, wired_lib_esm_js_3, wired_base_js_3, lit_element_js_4, WiredInput;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (wired_lib_esm_js_3_1) {
                wired_lib_esm_js_3 = wired_lib_esm_js_3_1;
            },
            function (wired_base_js_3_1) {
                wired_base_js_3 = wired_base_js_3_1;
            },
            function (lit_element_js_4_1) {
                lit_element_js_4 = lit_element_js_4_1;
            }
        ],
        execute: function () {
            __decorate = this && this.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                    r = Reflect.decorate(decorators, target, key, desc);
                else
                    for (var i = decorators.length - 1; i >= 0; i--)
                        if (d = decorators[i])
                            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            __metadata = this && this.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
                    return Reflect.metadata(k, v);
            };
            WiredInput = class WiredInput extends wired_base_js_3.WiredBase {
                constructor() {
                    super();
                    this.disabled = false;
                    this.placeholder = '';
                    this.type = 'text';
                    this.autocomplete = '';
                    this.autocapitalize = '';
                    this.autocorrect = '';
                    this.required = false;
                    this.autofocus = false;
                    this.readonly = false;
                    if (window.ResizeObserver) {
                        this.resizeObserver = new window.ResizeObserver(() => {
                            if (this.svg) {
                                this.wiredRender(true);
                            }
                        });
                    }
                }
                static get styles() {
                    return [
                        wired_base_js_3.BaseCSS,
                        lit_element_js_4.css `
        :host {
          display: inline-block;
          position: relative;
          padding: 5px;
          font-family: sans-serif;
          width: 150px;
          outline: none;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          border: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          padding: 6px;
        }
        input:focus + div path {
          stroke-width: 1.5;
        }
      `
                    ];
                }
                render() {
                    return lit_element_js_4.html `
    <input name="${this.name}" type="${this.type}" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      ?required="${this.required}" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" minlength="${this.minlength}"
      maxlength="${this.maxlength}" min="${this.min}" max="${this.max}" step="${this.step}" ?readonly="${this.readonly}"
      size="${this.size}" autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" 
      @change="${this.refire}" @input="${this.refire}">
    <div id="overlay">
      <svg></svg>
    </div>
    `;
                }
                get input() {
                    return this.textInput;
                }
                get value() {
                    const input = this.input;
                    return input && input.value || '';
                }
                set value(v) {
                    if (this.shadowRoot) {
                        const input = this.input;
                        if (input) {
                            input.value = v;
                            return;
                        }
                    }
                    this.pendingValue = v;
                }
                firstUpdated() {
                    this.value = this.pendingValue || this.value || this.getAttribute('value') || '';
                    delete this.pendingValue;
                }
                canvasSize() {
                    const s = this.getBoundingClientRect();
                    return [s.width, s.height];
                }
                draw(svg, size) {
                    wired_lib_esm_js_3.rectangle(svg, 2, 2, size[0] - 2, size[1] - 2, this.seed);
                }
                refire(event) {
                    event.stopPropagation();
                    wired_base_js_3.fire(this, event.type, { sourceEvent: event });
                }
                focus() {
                    if (this.textInput) {
                        this.textInput.focus();
                    }
                    else {
                        super.focus();
                    }
                }
                updated() {
                    super.updated();
                    this.attachResizeListener();
                }
                disconnectedCallback() {
                    this.detachResizeListener();
                }
                attachResizeListener() {
                    if (this.textInput && this.resizeObserver && this.resizeObserver.observe) {
                        this.resizeObserver.observe(this.textInput);
                    }
                }
                detachResizeListener() {
                    if (this.textInput && this.resizeObserver && this.resizeObserver.unobserve) {
                        this.resizeObserver.unobserve(this.textInput);
                    }
                }
            };
            exports_24("WiredInput", WiredInput);
            __decorate([
                lit_element_js_4.property({ type: Boolean, reflect: true }),
                __metadata("design:type", Object)
            ], WiredInput.prototype, "disabled", void 0);
            __decorate([
                lit_element_js_4.property({ type: String }),
                __metadata("design:type", Object)
            ], WiredInput.prototype, "placeholder", void 0);
            __decorate([
                lit_element_js_4.property({ type: String }),
                __metadata("design:type", String)
            ], WiredInput.prototype, "name", void 0);
            __decorate([
                lit_element_js_4.property({ type: String }),
                __metadata("design:type", String)
            ], WiredInput.prototype, "min", void 0);
            __decorate([
                lit_element_js_4.property({ type: String }),
                __metadata("design:type", String)
            ], WiredInput.prototype, "max", void 0);
            __decorate([
                lit_element_js_4.property({ type: String }),
                __metadata("design:type", String)
            ], WiredInput.prototype, "step", void 0);
            __decorate([
                lit_element_js_4.property({ type: String }),
                __metadata("design:type", Object)
            ], WiredInput.prototype, "type", void 0);
            __decorate([
                lit_element_js_4.property({ type: String }),
                __metadata("design:type", Object)
            ], WiredInput.prototype, "autocomplete", void 0);
            __decorate([
                lit_element_js_4.property({ type: String }),
                __metadata("design:type", Object)
            ], WiredInput.prototype, "autocapitalize", void 0);
            __decorate([
                lit_element_js_4.property({ type: String }),
                __metadata("design:type", Object)
            ], WiredInput.prototype, "autocorrect", void 0);
            __decorate([
                lit_element_js_4.property({ type: Boolean }),
                __metadata("design:type", Object)
            ], WiredInput.prototype, "required", void 0);
            __decorate([
                lit_element_js_4.property({ type: Boolean }),
                __metadata("design:type", Object)
            ], WiredInput.prototype, "autofocus", void 0);
            __decorate([
                lit_element_js_4.property({ type: Boolean }),
                __metadata("design:type", Object)
            ], WiredInput.prototype, "readonly", void 0);
            __decorate([
                lit_element_js_4.property({ type: Number }),
                __metadata("design:type", Number)
            ], WiredInput.prototype, "minlength", void 0);
            __decorate([
                lit_element_js_4.property({ type: Number }),
                __metadata("design:type", Number)
            ], WiredInput.prototype, "maxlength", void 0);
            __decorate([
                lit_element_js_4.property({ type: Number }),
                __metadata("design:type", Number)
            ], WiredInput.prototype, "size", void 0);
            __decorate([
                lit_element_js_4.query('input'),
                __metadata("design:type", HTMLInputElement)
            ], WiredInput.prototype, "textInput", void 0);
            exports_24("WiredInput", WiredInput = __decorate([
                lit_element_js_4.customElement('wired-input'),
                __metadata("design:paramtypes", [])
            ], WiredInput));
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/@google-web-components/google-chart@4.0.0/loader", [], function (exports_25, context_25) {
    "use strict";
    var loaderPromise;
    var __moduleName = context_25 && context_25.id;
    async function load(settings = {}) {
        await loaderPromise;
        const { version = 'current', packages = ['corechart'], language = document.documentElement.lang || 'en', mapsApiKey } = settings;
        return google.charts.load(version, {
            'packages': packages,
            'language': language,
            'mapsApiKey': mapsApiKey
        });
    }
    exports_25("load", load);
    async function dataTable(data) {
        await load();
        if (data == null) {
            return new google.visualization.DataTable();
        }
        else if (data.getNumberOfRows) {
            return data;
        }
        else if (data.cols) {
            return new google.visualization.DataTable(data);
        }
        else if (data.length > 0) {
            return google.visualization.arrayToDataTable(data);
        }
        else if (data.length === 0) {
            throw new Error('Data was empty.');
        }
        throw new Error('Data format was not recognized.');
    }
    exports_25("dataTable", dataTable);
    async function createChartWrapper(container) {
        await load();
        return new google.visualization.ChartWrapper({ 'container': container });
    }
    exports_25("createChartWrapper", createChartWrapper);
    return {
        setters: [],
        execute: function () {
            loaderPromise = new Promise((resolve, reject) => {
                if (typeof google !== 'undefined' && google.charts &&
                    typeof google.charts.load === 'function') {
                    resolve();
                }
                else {
                    let loaderScript = document.querySelector('script[src="https://www.gstatic.com/charts/loader.js"]');
                    if (!loaderScript) {
                        loaderScript = document.createElement('script');
                        loaderScript.src = 'https://www.gstatic.com/charts/loader.js';
                        document.head.appendChild(loaderScript);
                    }
                    loaderScript.addEventListener('load', resolve);
                    loaderScript.addEventListener('error', reject);
                }
            });
        }
    };
});
System.register("https://ethereal-incredible-freedom.glitch.me/@google-web-components/google-chart@4.0.0/google-chart", ["https://ethereal-incredible-freedom.glitch.me/lit-element@2.4.0/lit-element", "https://ethereal-incredible-freedom.glitch.me/@google-web-components/google-chart@4.0.0/loader"], function (exports_26, context_26) {
    "use strict";
    var __decorate, lit_element_js_5, loader_js_1, DEFAULT_EVENTS, CHART_TYPES, GoogleChart;
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [
            function (lit_element_js_5_1) {
                lit_element_js_5 = lit_element_js_5_1;
            },
            function (loader_js_1_1) {
                loader_js_1 = loader_js_1_1;
            }
        ],
        execute: function () {
            __decorate = this && this.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                    r = Reflect.decorate(decorators, target, key, desc);
                else
                    for (var i = decorators.length - 1; i >= 0; i--)
                        if (d = decorators[i])
                            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            DEFAULT_EVENTS = ['ready', 'select'];
            CHART_TYPES = {
                'area': 'AreaChart',
                'bar': 'BarChart',
                'md-bar': 'google.charts.Bar',
                'bubble': 'BubbleChart',
                'calendar': 'Calendar',
                'candlestick': 'CandlestickChart',
                'column': 'ColumnChart',
                'combo': 'ComboChart',
                'gauge': 'Gauge',
                'geo': 'GeoChart',
                'histogram': 'Histogram',
                'line': 'LineChart',
                'md-line': 'google.charts.Line',
                'org': 'OrgChart',
                'pie': 'PieChart',
                'sankey': 'Sankey',
                'scatter': 'ScatterChart',
                'md-scatter': 'google.charts.Scatter',
                'stepped-area': 'SteppedAreaChart',
                'table': 'Table',
                'timeline': 'Timeline',
                'treemap': 'TreeMap',
                'wordtree': 'WordTree'
            };
            GoogleChart = class GoogleChart extends lit_element_js_5.LitElement {
                constructor() {
                    super(...arguments);
                    this.type = 'column';
                    this.events = [];
                    this.options = undefined;
                    this.cols = undefined;
                    this.rows = undefined;
                    this.data = undefined;
                    this.view = undefined;
                    this.selection = undefined;
                    this.drawn = false;
                    this._data = undefined;
                    this.chartWrapper = null;
                    this.redrawTimeoutId = undefined;
                }
                render() {
                    return lit_element_js_5.html `
      <div id="styles"></div>
      <div id="chartdiv"></div>
    `;
                }
                firstUpdated() {
                    loader_js_1.createChartWrapper(this.shadowRoot.getElementById('chartdiv')).
                        then(chartWrapper => {
                        this.chartWrapper = chartWrapper;
                        this.typeChanged();
                        google.visualization.events.addListener(chartWrapper, 'ready', () => {
                            this.drawn = true;
                        });
                        google.visualization.events.addListener(chartWrapper, 'select', () => {
                            this.selection = chartWrapper.getChart().getSelection();
                        });
                        this.propagateEvents(DEFAULT_EVENTS, chartWrapper);
                    });
                }
                updated(changedProperties) {
                    if (changedProperties.has('type'))
                        this.typeChanged();
                    if (changedProperties.has('rows') || changedProperties.has('cols')) {
                        this.rowsOrColumnsChanged();
                    }
                    if (changedProperties.has('data'))
                        this.dataChanged();
                    if (changedProperties.has('view'))
                        this.viewChanged();
                    if (changedProperties.has('_data') ||
                        changedProperties.has('options'))
                        this.redraw();
                    if (changedProperties.has('selection'))
                        this.selectionChanged();
                }
                typeChanged() {
                    if (this.chartWrapper == null)
                        return;
                    this.chartWrapper.setChartType(CHART_TYPES[this.type] || this.type);
                    const lastChart = this.chartWrapper.getChart();
                    google.visualization.events.addOneTimeListener(this.chartWrapper, 'ready', () => {
                        const chart = this.chartWrapper.getChart();
                        if (chart !== lastChart) {
                            this.propagateEvents(this.events.filter(eventName => !DEFAULT_EVENTS.includes(eventName)), chart);
                        }
                        const stylesDiv = this.shadowRoot.getElementById('styles');
                        if (!stylesDiv.children.length) {
                            this.localizeGlobalStylesheets(stylesDiv);
                        }
                        if (this.selection) {
                            this.selectionChanged();
                        }
                    });
                    this.redraw();
                }
                propagateEvents(events, eventTarget) {
                    for (const eventName of events) {
                        google.visualization.events.addListener(eventTarget, eventName, event => {
                            this.dispatchEvent(new CustomEvent(`google-chart-${eventName}`, {
                                bubbles: true,
                                composed: true,
                                detail: {
                                    chart: this.chartWrapper.getChart(),
                                    data: event
                                }
                            }));
                        });
                    }
                }
                selectionChanged() {
                    if (this.chartWrapper == null)
                        return;
                    const chart = this.chartWrapper.getChart();
                    if (chart == null)
                        return;
                    if (chart.setSelection) {
                        if (this.type === 'timeline') {
                            const oldSelection = JSON.stringify(chart.getSelection());
                            const newSelection = JSON.stringify(this.selection);
                            if (newSelection === oldSelection)
                                return;
                        }
                        chart.setSelection(this.selection);
                    }
                }
                redraw() {
                    if (this.chartWrapper == null || this._data == null)
                        return;
                    this.chartWrapper.setDataTable(this._data);
                    this.chartWrapper.setOptions(this.options || {});
                    this.drawn = false;
                    if (this.redrawTimeoutId !== undefined)
                        clearTimeout(this.redrawTimeoutId);
                    this.redrawTimeoutId = window.setTimeout(() => {
                        this.chartWrapper.draw();
                    }, 5);
                }
                get imageURI() {
                    if (this.chartWrapper == null)
                        return null;
                    const chart = this.chartWrapper.getChart();
                    return chart && chart.getImageURI();
                }
                viewChanged() {
                    if (!this.view)
                        return;
                    this._data = this.view;
                }
                async rowsOrColumnsChanged() {
                    const { rows, cols } = this;
                    if (!rows || !cols)
                        return;
                    try {
                        const dt = await loader_js_1.dataTable({ cols });
                        dt.addRows(rows);
                        this._data = dt;
                    }
                    catch (reason) {
                        this.shadowRoot.getElementById('chartdiv').textContent = reason;
                    }
                }
                dataChanged() {
                    let data = this.data;
                    let dataPromise;
                    if (!data) {
                        return;
                    }
                    let isString = false;
                    try {
                        data = JSON.parse(data);
                    }
                    catch (e) {
                        isString = typeof data === 'string' || data instanceof String;
                    }
                    if (isString) {
                        dataPromise = fetch(data).then(response => response.json());
                    }
                    else {
                        dataPromise = Promise.resolve(data);
                    }
                    dataPromise.then(loader_js_1.dataTable).then(data => {
                        this._data = data;
                    });
                }
                localizeGlobalStylesheets(stylesDiv) {
                    const stylesheets = Array.from(document.head.querySelectorAll('link[rel="stylesheet"][type="text/css"][id^="load-css-"]'));
                    for (const stylesheet of stylesheets) {
                        const clonedStylesheet = document.createElement('link');
                        clonedStylesheet.setAttribute('rel', 'stylesheet');
                        clonedStylesheet.setAttribute('type', 'text/css');
                        clonedStylesheet.setAttribute('href', stylesheet.getAttribute('href'));
                        stylesDiv.appendChild(clonedStylesheet);
                    }
                }
            };
            exports_26("GoogleChart", GoogleChart);
            GoogleChart.styles = lit_element_js_5.css `
    :host {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      margin: 0;
      padding: 0;
      width: 400px;
      height: 300px;
    }

    :host([hidden]) {
      display: none;
    }

    :host([type="gauge"]) {
      width: 300px;
      height: 300px;
    }

    #chartdiv {
      width: 100%;
    }

    /* Workaround for slow initial ready event for tables. */
    .google-visualization-table-loadtest {
      padding-left: 6px;
    }
  `;
            __decorate([
                lit_element_js_5.property({ type: String, reflect: true })
            ], GoogleChart.prototype, "type", void 0);
            __decorate([
                lit_element_js_5.property({ type: Array })
            ], GoogleChart.prototype, "events", void 0);
            __decorate([
                lit_element_js_5.property({ type: Object, hasChanged: () => true })
            ], GoogleChart.prototype, "options", void 0);
            __decorate([
                lit_element_js_5.property({ type: Array })
            ], GoogleChart.prototype, "cols", void 0);
            __decorate([
                lit_element_js_5.property({ type: Array })
            ], GoogleChart.prototype, "rows", void 0);
            __decorate([
                lit_element_js_5.property({ type: String })
            ], GoogleChart.prototype, "data", void 0);
            __decorate([
                lit_element_js_5.property({ type: Object })
            ], GoogleChart.prototype, "view", void 0);
            __decorate([
                lit_element_js_5.property({ type: Array })
            ], GoogleChart.prototype, "selection", void 0);
            __decorate([
                lit_element_js_5.property({ type: Object })
            ], GoogleChart.prototype, "_data", void 0);
            customElements.define('google-chart', GoogleChart);
        }
    };
});
System.register("file:///home/ryanwhite04/pingelly-solar/modules", ["https://ethereal-incredible-freedom.glitch.me/roughjs@4.3.1/bundled/rough.esm", "https://ethereal-incredible-freedom.glitch.me/lit-html@1.3.0/directives/until", "https://ethereal-incredible-freedom.glitch.me/lit-element@2.4.0/lit-element", "https://ethereal-incredible-freedom.glitch.me/wired-button@2.1.0/lib/wired-button", "https://ethereal-incredible-freedom.glitch.me/wired-slider@2.1.2/lib/wired-slider", "https://ethereal-incredible-freedom.glitch.me/wired-input@2.1.1/lib/wired-input", "https://ethereal-incredible-freedom.glitch.me/@google-web-components/google-chart@4.0.0/google-chart"], function (exports_27, context_27) {
    "use strict";
    var rough_esm_js_1, until_js_1, lit_element_js_6;
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [
            function (rough_esm_js_1_1) {
                rough_esm_js_1 = rough_esm_js_1_1;
            },
            function (until_js_1_1) {
                until_js_1 = until_js_1_1;
            },
            function (lit_element_js_6_1) {
                lit_element_js_6 = lit_element_js_6_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            }
        ],
        execute: function () {
            exports_27("rough", rough_esm_js_1.default);
            exports_27("until", until_js_1.until);
            exports_27("LitElement", lit_element_js_6.LitElement);
            exports_27("html", lit_element_js_6.html);
            exports_27("css", lit_element_js_6.css);
            exports_27("svg", lit_element_js_6.svg);
        }
    };
});

const __exp = __instantiate("file:///home/ryanwhite04/pingelly-solar/modules", false);
export const rough = __exp["rough"];
export const LitElement = __exp["LitElement"];
export const html = __exp["html"];
export const css = __exp["css"];
export const svg = __exp["svg"];
export const until = __exp["until"];
