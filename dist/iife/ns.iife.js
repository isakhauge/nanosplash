(function(){"use strict";const p='@keyframes nsRotate{to{transform:rotate(360deg)}}@keyframes nsDash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}@keyframes nsFade{0%{opacity:0}to{opacity:1}}@keyframes nsAscend{0%{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}:root{--ns-top: 0px}.ns,body.nsh,body.nsh:before,.nsh:before{width:100%;height:100%}.ns,.nsh:before{bottom:0;right:0}.ns{display:flex;justify-content:center;align-items:center}.nsh{--color: DarkSlateGray;--size: 20px;--relSize: calc(var(--size) * .9);--font: "Helvetica", "Arial", sans-serif;--weight: 400;--bg: rgba(255, 255, 255, .9);--zIdx: 999999999;--blur: blur(5px)}.nsh{position:relative;z-index:var(--zIdx)}.nsh:before{position:absolute;background-color:var(--bg);content:"";backdrop-filter:var(--blur);-webkit-backdrop-filter:var(--blur);z-index:calc(var(--zIdx) + 1);border-radius:inherit}body.nsh,body.nsh:before{position:fixed;top:var(--ns-top);left:0}.ns{position:absolute;z-index:calc(var(--zIdx) + 2);animation:nsFade 2s;gap:var(--relSize)}.nst{color:var(--color);font-size:var(--size);font-family:var(--font);font-weight:var(--weight);max-width:80dvw;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;text-shadow:0 0 .06rem rgba(47,79,79,.25);filter:drop-shadow(0 0 .07rem rgba(0,0,0,.25));animation:nsAscend .5s}.nss{display:block;width:var(--relSize);height:var(--relSize);animation:nsAscend .5s}.nss>svg{animation:nsRotate 2s linear infinite;position:relative;width:inherit;height:inherit;stroke-width:8}.nss .path{stroke:var(--color);stroke-linecap:round;animation:nsDash 1.5s ease-in-out infinite}',v="3.1.0",y="nscss",i=()=>document.body,a=e=>(s=>({all:s,first:t=>s(t)[0]??null}))(s=>Array.from(e.querySelectorAll(s))),c=e=>a(document).all(e),l=e=>a(document).first(e),d=()=>c(".ns"),m=e=>e instanceof Element?e:l(e),o=(e,...s)=>{const t=document.createElement("div");return e&&t.classList.add(e),t.append(...s),t},f=e=>{const s=o();return s.innerHTML=e,s.firstChild},b=()=>{const s=f('<svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none /></svg>'),t=o("ns",o("nst"),o("nss",s));return t.nsId=Date.now(),t},u=()=>d().sort((e,s)=>e.nsId-s.nsId)[0]??null,w=(e,s)=>{const n=a(e).first(".nst");if(!s)return n==null?void 0:n.remove();const r=o("nst",s);n?n.replaceWith(r):e.insertBefore(r,e.firstChild)},g=(e,s)=>{const t=s.firstElementChild;t&&s.insertBefore(e,t),s.append(e),s.classList.add("nsh")},k=(e,s)=>{const t=s?m(s):i;let n;const r=a(t??i()).first("& > .ns");r?n=r:(n=b(),g(n,t)),w(n,e??"");const I=window.scrollY+"px";return i().style.setProperty("--ns-top",I),n.nsId},h=e=>{var s;(s=e==null?void 0:e.parentElement)==null||s.classList.remove("nsh"),e==null||e.remove()},x=e=>d().find(s=>s.nsId===e)??null,S=e=>{e==="*"?c(".ns").forEach(h):h(typeof e=="number"?x(e):u())},z=()=>{var e;(e=l("#nscss"))==null||e.remove(),i().append(f(`<style id=${y}>${p}</style>`))};!!new Promise(z)&&(window.ns={show:k,hide:S,version:v})})();
