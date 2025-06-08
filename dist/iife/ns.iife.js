(function(){"use strict";const w=`@keyframes nsRotate {
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
`,d=()=>globalThis.document,a=()=>globalThis.document.body,f=t=>Array.from(t),p=(t,o)=>f(t.querySelectorAll(o)),h=(t,o)=>p(t,o)[0]??null,b=t=>t instanceof Element?t:h(d(),t),l=(t,...o)=>{const c=d().createElement("div");return t&&c.classList.add(t),c.append(...o),c},m=t=>{const o=l();return o.innerHTML=t,o.firstChild},r={ns:"ns",nsHost:"nsh",nsText:"nst",nsSpinner:"nss"},u={ns:"."+r.ns,nsText:"."+r.nsText},g="4.0.5",x=()=>{const t=()=>p(d(),u.ns),o=()=>{const e=m('<svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none /></svg>'),s=l(r.ns,l(r.nsText),l(r.nsSpinner,e));return s.nsId=Date.now(),s},c=()=>t().sort((n,e)=>n.nsId-e.nsId),k=()=>c()[0]??null,N=(n,e)=>{var i;if((i=h(n,u.nsText))==null||i.remove(),!e)return;const s=l(r.nsText,e);n.insertBefore(s,n.firstChild)},z=(n,e)=>{const s=e.firstElementChild;s&&e.insertBefore(n,s),e.append(n),e.classList.add(r.nsHost)},I=n=>f(n.children).find(s=>s.classList.contains(r.ns)),S=(n,e)=>{const s=e?b(e)??a():a();let i;const y=I(s);if(y?i=y:(i=o(),z(i,s)),N(i,n??""),s===a()){const E=scrollY+"px";a().style.setProperty("--ns-top",E)}return i.nsId},v=n=>{var e;(e=n==null?void 0:n.parentElement)==null||e.classList.remove(r.nsHost),n==null||n.remove()},T=n=>t().find(e=>e.nsId===n)??null,A=n=>{n==="*"?t().forEach(v):v(typeof n=="number"?T(n):k())};return(()=>{var e;(e=h(d(),"#ns"))==null||e.remove();const n=m(`<style id="ns">${w}</style>`);a().append(n)})(),{show:S,hide:A,version:g}};window.addEventListener("load",function(){this.ns=x()})})();
