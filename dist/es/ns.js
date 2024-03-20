const b = '@keyframes nsRotate{to{transform:rotate(360deg)}}@keyframes nsDash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}@keyframes nsFade{0%{opacity:0}to{opacity:1}}@keyframes nsAscend{0%{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}:root{--ns-top: 0px}.ns,body.nsh,body.nsh:before,.nsh:before{width:100%;height:100%}.ns,.nsh:before{bottom:0;right:0}.ns{display:flex;justify-content:center;align-items:center}.nsh{--color: DarkSlateGray;--size: 20px;--relSize: calc(var(--size) * .9);--font: "Helvetica", "Arial", sans-serif;--weight: 400;--bg: rgba(255, 255, 255, .9);--zIdx: 999999999;--blur: blur(5px)}.nsh{position:relative;z-index:var(--zIdx)}.nsh:before{position:absolute;background-color:var(--bg);content:"";backdrop-filter:var(--blur);-webkit-backdrop-filter:var(--blur);z-index:calc(var(--zIdx) + 1);border-radius:inherit}body.nsh,body.nsh:before{position:fixed;top:var(--ns-top);left:0}.ns{position:absolute;z-index:calc(var(--zIdx) + 2);animation:nsFade 2s;gap:var(--relSize)}.nst{color:var(--color);font-size:var(--size);font-family:var(--font);font-weight:var(--weight);max-width:80dvw;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;text-shadow:0 0 .06rem rgba(47,79,79,.25);filter:drop-shadow(0 0 .07rem rgba(0,0,0,.25));animation:nsAscend .5s}.nss{display:block;width:var(--relSize);height:var(--relSize);animation:nsAscend .5s}.nss>svg{animation:nsRotate 2s linear infinite;position:relative;width:inherit;height:inherit;stroke-width:8}.nss .path{stroke:var(--color);stroke-linecap:round;animation:nsDash 1.5s ease-in-out infinite}', m = "4.0.0", l = "ns", i = document, r = i.body, a = (e) => /* @__PURE__ */ ((s) => ({
  all: s,
  first: (t) => s(t)[0] ?? null
}))((s) => Array.from(e.querySelectorAll(s))), f = (e) => a(i).all(e), h = (e) => a(i).first(e), p = () => f(".ns"), u = (e) => e instanceof Element ? e : h(e), n = (e, ...s) => {
  const t = i.createElement("div");
  return e && t.classList.add(e), t.append(...s), t;
}, v = (e) => {
  const s = n();
  return s.innerHTML = e, s.firstChild;
}, g = () => {
  const s = v('<svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none /></svg>'), t = n("ns", n("nst"), n("nss", s));
  return t.nsId = Date.now(), t;
}, k = () => p().sort((e, s) => e.nsId - s.nsId)[0] ?? null, w = (e, s) => {
  const t = a(e).first(".nst");
  if (!s)
    return t == null ? void 0 : t.remove();
  const o = n("nst", s);
  t ? t.replaceWith(o) : e.insertBefore(o, e.firstChild);
}, x = (e, s) => {
  const t = s.firstElementChild;
  t && s.insertBefore(e, t), s.append(e), s.classList.add("nsh");
}, z = (e, s) => {
  const t = s ? u(s) : r;
  let o;
  const c = a(t ?? r).first("& > .ns");
  c ? o = c : (o = g(), x(o, t)), w(o, e ?? "");
  const y = scrollY + "px";
  return r.style.setProperty("--ns-top", y), o.nsId;
}, d = (e) => {
  var s;
  (s = e == null ? void 0 : e.parentElement) == null || s.classList.remove("nsh"), e == null || e.remove();
}, I = (e) => p().find((s) => s.nsId === e) ?? null, A = (e) => {
  e === "*" ? f(".ns").forEach(d) : d(typeof e == "number" ? I(e) : k());
}, N = () => {
  var e;
  (e = h("#" + l)) == null || e.remove(), r.append(v(`<style id=${l}>${b}</style>`));
}, S = () => (N(), {
  show: z,
  hide: A,
  version: m
});
export {
  S as useNs
};
