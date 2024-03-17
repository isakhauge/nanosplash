const v = '@keyframes nsRotate{to{transform:rotate(360deg)}}@keyframes nsDash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}@keyframes nsFade{0%{opacity:0}to{opacity:1}}@keyframes nsAscend{0%{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}:root{--ns-top: 0px}.ns,body.nsh,body.nsh:before,.nsh:before{width:100%;height:100%}.ns,.nsh:before{bottom:0;right:0}.ns{display:flex;justify-content:center;align-items:center}.nsh{--color: DarkSlateGray;--size: 20px;--relSize: calc(var(--size) * .9);--font: "Helvetica", "Arial", sans-serif;--weight: 400;--bg: rgba(255, 255, 255, .9);--zIdx: 999999999;--blur: blur(5px)}.nsh{position:relative;z-index:var(--zIdx)}.nsh:before{position:absolute;background-color:var(--bg);content:"";backdrop-filter:var(--blur);-webkit-backdrop-filter:var(--blur);z-index:calc(var(--zIdx) + 1);border-radius:inherit}body.nsh,body.nsh:before{position:fixed;top:var(--ns-top);left:0}.ns{position:absolute;z-index:calc(var(--zIdx) + 2);animation:nsFade 2s;gap:var(--relSize)}.nst{color:var(--color);font-size:var(--size);font-family:var(--font);font-weight:var(--weight);max-width:80dvw;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;text-shadow:0 0 .06rem rgba(47,79,79,.25);filter:drop-shadow(0 0 .07rem rgba(0,0,0,.25));animation:nsAscend .5s}.nss{display:block;width:var(--relSize);height:var(--relSize);animation:nsAscend .5s}.nss>svg{animation:nsRotate 2s linear infinite;position:relative;width:inherit;height:inherit;stroke-width:8}.nss .path{stroke:var(--color);stroke-linecap:round;animation:nsDash 1.5s ease-in-out infinite}', y = "3.1.0", m = "nscss", i = () => document.body, a = (e) => /* @__PURE__ */ ((t) => ({
  all: t,
  first: (s) => t(s)[0] ?? null
}))((t) => Array.from(e.querySelectorAll(t))), l = (e) => a(document).all(e), d = (e) => a(document).first(e), f = () => l(".ns"), b = (e) => e instanceof Element ? e : d(e), r = (e, ...t) => {
  const s = document.createElement("div");
  return e && s.classList.add(e), s.append(...t), s;
}, h = (e) => {
  const t = r();
  return t.innerHTML = e, t.firstChild;
}, u = () => {
  const t = h('<svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none /></svg>'), s = r("ns", r("nst"), r("nss", t));
  return s.nsId = Date.now(), s;
}, w = () => f().sort((e, t) => e.nsId - t.nsId)[0] ?? null, g = (e, t) => {
  const n = a(e).first(".nst");
  if (!t)
    return n == null ? void 0 : n.remove();
  const o = r("nst", t);
  n ? n.replaceWith(o) : e.insertBefore(o, e.firstChild);
}, k = (e, t) => {
  const s = t.firstElementChild;
  s && t.insertBefore(e, s), t.append(e), t.classList.add("nsh");
}, x = (e, t) => {
  const s = t ? b(t) : i;
  let n;
  const o = a(s ?? i()).first("& > .ns");
  o ? n = o : (n = u(), k(n, s)), g(n, e ?? "");
  const p = window.scrollY + "px";
  return i().style.setProperty("--ns-top", p), n.nsId;
}, c = (e) => {
  var t;
  (t = e == null ? void 0 : e.parentElement) == null || t.classList.remove("nsh"), e == null || e.remove();
}, S = (e) => f().find((t) => t.nsId === e) ?? null, z = (e) => {
  e === "*" ? l(".ns").forEach(c) : c(typeof e == "number" ? S(e) : w());
}, I = () => {
  var e;
  (e = d("#nscss")) == null || e.remove(), i().append(h(`<style id=${m}>${v}</style>`));
}, A = () => !!new Promise(I) && (window.ns = {
  show: x,
  hide: z,
  version: y
});
export {
  A as useNs
};
