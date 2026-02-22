const T = '@keyframes nsRotate{to{transform:rotate(360deg)}}@keyframes nsDash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}@keyframes nsFade{0%{opacity:0}to{opacity:1}}@keyframes nsAscend{0%{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}:root{--ns-top: 0}.nsh{--color: DarkSlateGray;--size: 20px;--relSize: calc(var(--size) * .9);--font: "Inter", "Helvetica", "Arial";--weight: 400;--bg: rgba(255, 255, 255, .9);--zIdx: 9999999999;--blur: blur(5px);position:relative;z-index:var(--zIdx)}.nsh:before{width:100%;height:100%;bottom:0;right:0;position:absolute;content:"";background-color:var(--bg);backdrop-filter:var(--blur);-webkit-backdrop-filter:var(--blur);z-index:calc(var(--zIdx) + 1);border-radius:var(--size)}body.nsh,body.nsh:before{width:100%;height:100%;position:fixed;top:var(--ns-top);left:0}.ns{width:100%;height:100%;bottom:0;right:0;display:flex;justify-content:center;align-items:center;position:absolute;z-index:calc(var(--zIdx) + 2);animation:nsFade 2s;gap:var(--relSize)}.nst{color:var(--color);font-size:var(--size);font-family:var(--font),sans-serif;font-weight:var(--weight);max-width:80dvw;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;text-shadow:0 0 .06rem rgba(0,0,0,.25);filter:drop-shadow(0 0 .07rem rgba(0,0,0,.25));animation:nsAscend .5s}.nss{display:block;width:var(--relSize);height:var(--relSize);animation:nsAscend .5s}.nss>svg{animation:nsRotate 2s linear infinite;position:relative;width:inherit;height:inherit;stroke-width:8}.nss .path{stroke:var(--color);stroke-linecap:round;animation:nsDash 1.5s ease-in-out infinite}', d = () => globalThis.document, l = () => globalThis.document.body, y = (e) => Array.from(e), u = (e, o) => y(e.querySelectorAll(o)), h = (e, o) => u(e, o)[0] ?? null, A = (e) => e instanceof Element ? e : h(d(), e), c = (e, ...o) => {
  const i = d().createElement("div");
  return e && i.classList.add(e), i.append(...o), i;
}, v = (e) => {
  const o = c();
  return o.innerHTML = e, o.firstChild;
}, r = {
  ns: "ns",
  nsHost: "nsh",
  nsText: "nst",
  nsSpinner: "nss"
}, m = {
  ns: "." + r.ns,
  nsText: "." + r.nsText
}, N = "4.0.9", H = () => {
  const e = () => u(d(), m.ns), o = () => {
    const t = v('<svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none /></svg>'), n = c(
      r.ns,
      c(r.nsText),
      c(r.nsSpinner, t)
    );
    return n.nsId = Date.now(), n;
  }, i = () => e().sort((s, t) => s.nsId - t.nsId), b = () => i()[0] ?? null, g = (s, t) => {
    if (h(s, m.nsText)?.remove(), !t) return;
    const n = c(r.nsText, t);
    s.insertBefore(n, s.firstChild);
  }, x = (s, t) => {
    const n = t.firstElementChild;
    n && t.insertBefore(s, n), t.append(s), t.classList.add(r.nsHost);
  }, w = (s) => y(s.children).find(
    (n) => n.classList.contains(r.ns)
  ), k = (s, t) => {
    const n = t ? A(t) ?? l() : l();
    let a;
    const p = w(n);
    if (p ? a = p : (a = o(), x(a, n)), g(a, s ?? ""), n === l()) {
      const S = scrollY + "px";
      l().style.setProperty("--ns-top", S);
    }
    return a.nsId;
  }, f = (s) => {
    s?.parentElement?.classList.remove(r.nsHost), s?.remove();
  }, z = (s) => e().find((t) => t.nsId === s) ?? null, I = (s) => {
    s === "*" ? e().forEach(f) : f(typeof s == "number" ? z(s) : b());
  };
  return (() => {
    h(d(), "#ns")?.remove();
    const s = v(
      `<style id="ns">${T}</style>`
    );
    l().append(s);
  })(), {
    show: k,
    hide: I,
    version: N
  };
};
export {
  H as useNs
};
