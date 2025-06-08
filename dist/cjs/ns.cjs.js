"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const z=`@keyframes nsRotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes nsDash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

@keyframes nsFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes nsAscend {
  from {
    opacity: 0;
    transform: translateY(13px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:root {
  --ns-top: 0;
}

/* Nanosplash host */
.nsh {
  --color: DarkSlateGray;
  --size: 20px;
  --relSize: calc(var(--size) * 0.9);
  --font: 'Inter', 'Helvetica', 'Arial';
  --weight: 400;
  --bg: rgba(255, 255, 255, 0.9);
  --zIdx: 9999999999;
  --blur: blur(5px);

  position: relative;
  z-index: var(--zIdx);
  &::before {
    width: 100%;
    height: 100%;
    bottom: 0; /* Not sure why */
    right: 0; /* Not sure why */
    position: absolute;
    content: '';
    background-color: var(--bg);
    backdrop-filter: var(--blur);
    -webkit-backdrop-filter: var(--blur);
    z-index: calc(var(--zIdx) + 1);
    border-radius: var(--size);
  }
}

/* For when the Nanosplash host is the document body */
body.nsh {
  &,
  &::before {
    width: 100%;
    height: 100%;
    position: fixed;
    top: var(--ns-top);
    left: 0;
  }
}

/* Nanosplash main element */
.ns {
  width: 100%;
  height: 100%;
  bottom: 0; /* Not sure why */
  right: 0; /* Not sure why */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: calc(var(--zIdx) + 2);
  animation: nsFade 2s;
  gap: var(--relSize);
}

/* Nanosplash text */
.nst {
  color: var(--color);
  font-size: var(--size);
  font-family: var(--font), sans-serif;
  font-weight: var(--weight);
  max-width: 80dvw;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-shadow: 0 0 0.06rem rgba(0, 0, 0, 0.25);
  filter: drop-shadow(0 0 0.07rem rgba(0, 0, 0, 0.25));
  animation: nsAscend 0.5s;
}

/* Nanosplash spinner */
.nss {
  display: block;
  width: var(--relSize);
  height: var(--relSize);
  animation: nsAscend 0.5s;
  & > svg {
    animation: nsRotate 2s linear infinite;
    position: relative;
    width: inherit;
    height: inherit;
    stroke-width: 8;
  }
  & .path {
    stroke: var(--color);
    stroke-linecap: round;
    animation: nsDash 1.5s ease-in-out infinite;
  }
}
`,h=()=>globalThis.document,c=()=>globalThis.document.body,S=t=>Array.from(t),u=(t,o)=>S(t.querySelectorAll(o)),d=(t,o)=>u(t,o)[0]??null,T=t=>t instanceof Element?t:d(h(),t),l=(t,...o)=>{const i=h().createElement("div");return t&&i.classList.add(t),i.append(...o),i},y=t=>{const o=l();return o.innerHTML=t,o.firstChild},a={ns:"ns",nsHost:"nsh",nsText:"nst",nsSpinner:"nss"},f={ns:"."+a.ns,nsText:"."+a.nsText},A="4.0.3",I=()=>{const t=()=>u(h(),f.ns),o=()=>{const e=y('<svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none /></svg>'),s=l(a.ns,l(a.nsText),l(a.nsSpinner,e));return s.nsId=Date.now(),s},i=()=>t().sort((n,e)=>n.nsId-e.nsId),v=()=>i()[0]??null,b=(n,e)=>{const s=d(n,f.nsText);if(!e)return s==null?void 0:s.remove();const r=l(a.nsText,e);s?s.replaceWith(r):n.insertBefore(r,n.firstChild)},g=(n,e)=>{const s=e.firstElementChild;s&&e.insertBefore(n,s),e.append(n),e.classList.add(a.nsHost)},w=(n,e)=>{const s=e?T(e)??c():c();let r;const m=d(s,"& > "+f.ns);m?r=m:(r=o(),g(r,s)),b(r,n??"");const N=scrollY+"px";return c().style.setProperty("--ns-top",N),r.nsId},p=n=>{var e;(e=n==null?void 0:n.parentElement)==null||e.classList.remove(a.nsHost),n==null||n.remove()},x=n=>t().find(e=>e.nsId===n)??null,k=n=>{n==="*"?t().forEach(p):p(typeof n=="number"?x(n):v())};return(()=>{var e;(e=d(h(),"#ns"))==null||e.remove();const n=y(`<style id="ns">${z}</style>`);c().append(n)})(),{show:w,hide:k,version:A}};exports.useNs=I;
