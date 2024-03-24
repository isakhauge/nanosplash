const I = '@keyframes nsRotate{to{transform:rotate(360deg)}}@keyframes nsDash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}@keyframes nsFade{0%{opacity:0}to{opacity:1}}@keyframes nsAscend{0%{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}:root{--ns-top: 0px}.ns,body.nsh,body.nsh:before,.nsh:before{width:100%;height:100%}.ns,.nsh:before{bottom:0;right:0}.ns{display:flex;justify-content:center;align-items:center}.nsh{--color: DarkSlateGray;--size: 20px;--relSize: calc(var(--size) * .9);--font: "Helvetica", "Arial", sans-serif;--weight: 400;--bg: rgba(255, 255, 255, .9);--zIdx: 999999999;--blur: blur(5px)}.nsh{position:relative;z-index:var(--zIdx)}.nsh:before{position:absolute;background-color:var(--bg);content:"";backdrop-filter:var(--blur);-webkit-backdrop-filter:var(--blur);z-index:calc(var(--zIdx) + 1);border-radius:inherit}body.nsh,body.nsh:before{position:fixed;top:var(--ns-top);left:0}.ns{position:absolute;z-index:calc(var(--zIdx) + 2);animation:nsFade 2s;gap:var(--relSize)}.nst{color:var(--color);font-size:var(--size);font-family:var(--font);font-weight:var(--weight);max-width:80dvw;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;text-shadow:0 0 .06rem rgba(47,79,79,.25);filter:drop-shadow(0 0 .07rem rgba(0,0,0,.25));animation:nsAscend .5s}.nss{display:block;width:var(--relSize);height:var(--relSize);animation:nsAscend .5s}.nss>svg{animation:nsRotate 2s linear infinite;position:relative;width:inherit;height:inherit;stroke-width:8}.nss .path{stroke:var(--color);stroke-linecap:round;animation:nsDash 1.5s ease-in-out infinite}', N = "4.0.2", A = (v) => {
  var h;
  const o = (v ?? window).document, i = o.body, c = (e, s) => Array.from(e.querySelectorAll(s)), a = (e, s) => c(e, s)[0] ?? null, l = () => c(o, ".ns"), y = (e) => e instanceof Element ? e : a(o, e), r = (e, ...s) => {
    const t = o.createElement("div");
    return e && t.classList.add(e), t.append(...s), t;
  }, d = (e) => {
    const s = r();
    return s.innerHTML = e, s.firstChild;
  }, b = () => {
    const s = d('<svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none /></svg>'), t = r("ns", r("nst"), r("nss", s));
    return t.nsId = Date.now(), t;
  }, m = () => l().sort((e, s) => e.nsId - s.nsId)[0] ?? null, u = (e, s) => {
    const t = a(e, ".nst");
    if (!s)
      return t == null ? void 0 : t.remove();
    const n = r("nst", s);
    t ? t.replaceWith(n) : e.insertBefore(n, e.firstChild);
  }, w = (e, s) => {
    const t = s.firstElementChild;
    t && s.insertBefore(e, t), s.append(e), s.classList.add("nsh");
  }, g = (e, s) => {
    const t = s ? y(s) : i;
    let n;
    const p = a(t ?? i, "& > .ns");
    p ? n = p : (n = b(), w(n, t)), u(n, e ?? "");
    const z = scrollY + "px";
    return i.style.setProperty("--ns-top", z), n.nsId;
  }, f = (e) => {
    var s;
    (s = e == null ? void 0 : e.parentElement) == null || s.classList.remove("nsh"), e == null || e.remove();
  }, k = (e) => l().find((s) => s.nsId === e) ?? null, x = (e) => {
    e === "*" ? c(o, ".ns").forEach(f) : f(typeof e == "number" ? k(e) : m());
  };
  return (h = a(o, "#ns")) == null || h.remove(), i.append(d(`<style id="ns">${I}</style>`)), {
    show: g,
    hide: x,
    version: N
  };
};
export {
  A as useNs
};
