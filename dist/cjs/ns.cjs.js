"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const T=`@keyframes nsRotate {
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
`,d=()=>globalThis.document,l=()=>globalThis.document.body,y=t=>Array.from(t),v=(t,o)=>y(t.querySelectorAll(o)),h=(t,o)=>v(t,o)[0]??null,I=t=>t instanceof Element?t:h(d(),t),c=(t,...o)=>{const a=d().createElement("div");return t&&a.classList.add(t),a.append(...o),a},m=t=>{const o=c();return o.innerHTML=t,o.firstChild},r={ns:"ns",nsHost:"nsh",nsText:"nst",nsSpinner:"nss"},u={ns:"."+r.ns,nsText:"."+r.nsText},A="4.0.5",E=()=>{const t=()=>v(d(),u.ns),o=()=>{const e=m('<svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none /></svg>'),s=c(r.ns,c(r.nsText),c(r.nsSpinner,e));return s.nsId=Date.now(),s},a=()=>t().sort((n,e)=>n.nsId-e.nsId),b=()=>a()[0]??null,g=(n,e)=>{var i;if((i=h(n,u.nsText))==null||i.remove(),!e)return;const s=c(r.nsText,e);n.insertBefore(s,n.firstChild)},w=(n,e)=>{const s=e.firstElementChild;s&&e.insertBefore(n,s),e.append(n),e.classList.add(r.nsHost)},x=n=>y(n.children).find(s=>s.classList.contains(r.ns)),k=(n,e)=>{const s=e?I(e)??l():l();let i;const p=x(s);if(p?i=p:(i=o(),w(i,s)),g(i,n??""),s===l()){const S=scrollY+"px";l().style.setProperty("--ns-top",S)}return i.nsId},f=n=>{var e;(e=n==null?void 0:n.parentElement)==null||e.classList.remove(r.nsHost),n==null||n.remove()},N=n=>t().find(e=>e.nsId===n)??null,z=n=>{n==="*"?t().forEach(f):f(typeof n=="number"?N(n):b())};return(()=>{var e;(e=h(d(),"#ns"))==null||e.remove();const n=m(`<style id="ns">${T}</style>`);l().append(n)})(),{show:k,hide:z,version:A}};exports.useNs=E;
