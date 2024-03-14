const p = '@keyframes ns-rotate{to{transform:rotate(360deg)}}@keyframes ns-dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}@keyframes ns-fade{0%{opacity:0}to{opacity:1}}@keyframes ns-ascend{0%{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}:root{--ns-top: 0px}.ns,body.nsh,body.nsh:before,.nsh:before{width:100%;height:100%}.ns,.nsh:before{bottom:0;right:0}.nsc,.ns{display:flex;justify-content:center;align-items:center}.nsh{--color: DarkSlateGray;--size: 20px;--relSize: calc(var(--size) * .9);--font: "Helvetica", "Arial", sans-serif;--weight: 400;--bg: rgba(255, 255, 255, .9);--zIdx: 999999999;--blur: blur(5px)}.nsh{position:relative;z-index:var(--zIdx)}.nsh:before{position:absolute;background-color:var(--bg);content:"";backdrop-filter:var(--blur);-webkit-backdrop-filter:var(--blur);z-index:calc(var(--zIdx) + 1);border-radius:inherit}body.nsh,body.nsh:before{position:fixed;top:var(--ns-top);left:0}.ns{position:absolute;z-index:calc(var(--zIdx) + 2);animation:ns-fade 2s}.nsc{filter:drop-shadow(0 0 .07rem rgba(0,0,0,.25))}.nst{color:var(--color);font-size:var(--size);font-family:var(--font);font-weight:var(--weight);font-optical-sizing:auto;max-width:80dvw;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;margin-right:var(--relSize);text-shadow:0 0 .06rem rgba(47,79,79,.25);animation:ns-ascend .5s}.nss{display:block;width:var(--relSize);height:var(--relSize);animation:ns-ascend .5s}.nss>svg{animation:ns-rotate 2s linear infinite;position:relative;width:inherit;height:inherit;stroke-width:8}.nss .path{stroke:var(--color);stroke-linecap:round;animation:ns-dash 1.5s ease-in-out infinite}', m = "3.0.8", u = "nscss", a = (e) => {
  const t = (s) => Array.from(e.querySelectorAll(s));
  return {
    all: t,
    first: (s) => t(s)[0] ?? null
  };
}, c = (e) => a(document).all(e), l = (e) => a(document).first(e), d = () => c(".ns"), v = (e) => {
  if (e instanceof Element)
    return e;
  const t = l(e);
  if (!t)
    throw new Error(`Selector (${e}) returned null`);
  return t;
}, o = (e, ...t) => {
  const s = document.createElement("div");
  return e && s.classList.add(e), s.append(...t), s;
}, f = (e) => {
  const t = o();
  return t.innerHTML = e, t.firstChild;
}, y = () => {
  const t = f('<svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none /></svg>'), s = o("ns", o("nsc", o("nst"), o("nss", t)));
  return s.nsId = Date.now(), s;
}, b = () => d().sort((e, t) => e.nsId - t.nsId)[0] ?? null, w = (e, t) => {
  const s = a(e), n = s.first(".nst");
  if (!t)
    return n == null ? void 0 : n.remove();
  const r = o("nst", t);
  if (n)
    n.replaceWith(r);
  else {
    const i = s.first(".nsc");
    i.insertBefore(r, i.firstChild);
  }
}, g = (e, t) => {
  const s = t.firstElementChild;
  s && t.insertBefore(e, s), t.append(e), t.classList.add("nsh");
}, k = (e, t) => {
  const s = t ? v(t) : document.body;
  let n;
  const r = a(s).first("& > .ns");
  r ? n = r : (n = y(), g(n, s)), w(n, e ?? "");
  const i = window.scrollY + "px";
  return window.document.body.style.setProperty("--ns-top", i), n.nsId;
}, h = (e) => {
  var t;
  (t = e == null ? void 0 : e.parentElement) == null || t.classList.remove("nsh"), e == null || e.remove();
}, x = (e) => d().find((t) => t.nsId === e) ?? null, z = (e) => {
  const t = e ? x(e) : b();
  h(t);
}, S = () => c(".ns").forEach(h), I = () => {
  var t;
  (t = l("#nscss")) == null || t.remove();
  const e = `<style id=${u}>${p}</style>`;
  document.body.append(f(e));
}, N = () => (I(), window.ns = Object.freeze({
  show: k,
  hide: z,
  hideAll: S,
  version: m
}));
export {
  N as useNs
};
