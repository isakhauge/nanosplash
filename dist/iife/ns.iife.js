(function(){"use strict";const y=`@keyframes nsRotate {
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
`,c=()=>globalThis.document,d=()=>globalThis.document.body,w=t=>Array.from(t),p=(t,o)=>w(t.querySelectorAll(o)),h=(t,o)=>p(t,o)[0]??null,b=t=>t instanceof Element?t:h(c(),t),a=(t,...o)=>{const l=c().createElement("div");return t&&l.classList.add(t),l.append(...o),l},m=t=>{const o=a();return o.innerHTML=t,o.firstChild},r={ns:"ns",nsHost:"nsh",nsText:"nst",nsSpinner:"nss"},f={ns:"."+r.ns,nsText:"."+r.nsText},g="4.0.3",x=()=>{const t=()=>p(c(),f.ns),o=()=>{const e=m('<svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none /></svg>'),s=a(r.ns,a(r.nsText),a(r.nsSpinner,e));return s.nsId=Date.now(),s},l=()=>t().sort((n,e)=>n.nsId-e.nsId),k=()=>l()[0]??null,N=(n,e)=>{const s=h(n,f.nsText);if(!e)return s==null?void 0:s.remove();const i=a(r.nsText,e);s?s.replaceWith(i):n.insertBefore(i,n.firstChild)},z=(n,e)=>{const s=e.firstElementChild;s&&e.insertBefore(n,s),e.append(n),e.classList.add(r.nsHost)},S=(n,e)=>{const s=e?b(e)??d():d();let i;const v=h(s,"& > "+f.ns);v?i=v:(i=o(),z(i,s)),N(i,n??"");const T=scrollY+"px";return d().style.setProperty("--ns-top",T),i.nsId},u=n=>{var e;(e=n==null?void 0:n.parentElement)==null||e.classList.remove(r.nsHost),n==null||n.remove()},A=n=>t().find(e=>e.nsId===n)??null,I=n=>{n==="*"?t().forEach(u):u(typeof n=="number"?A(n):k())};return(()=>{var e;(e=h(c(),"#ns"))==null||e.remove();const n=m(`<style id="ns">${y}</style>`);d().append(n)})(),{show:S,hide:I,version:g}};window.addEventListener("load",function(){this.ns=x()})})();
