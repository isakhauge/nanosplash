var I=Object.defineProperty;var E=(o,i,d)=>i in o?I(o,i,{enumerable:!0,configurable:!0,writable:!0,value:d}):o[i]=d;var a=(o,i,d)=>(E(o,typeof i!="symbol"?i+"":i,d),d);(function(){"use strict";var o=document.createElement("style");o.textContent=`.ns,.nsh:before{width:100%;height:100%}.ns,.nsh:before{top:0;left:0}.nsc,.ns{display:flex;justify-content:center;align-items:center}.nsh{--color: DarkSlateGray;--size: 20px;--relSize: calc(var(--size) * .9);--font: "Helvetica", "Arial", sans-serif;--weight: 400;--bg: rgba(255, 255, 255, .8);--zIdx: 999999999;--blur: blur(10px)}.nsh{position:relative;z-index:var(--zIdx)}.nsh:before{position:absolute;background-color:var(--bg);content:"";backdrop-filter:var(--blur);-webkit-backdrop-filter:var(--blur);z-index:calc(var(--zIdx) + 1);border-radius:inherit}body.nsh{height:100vh}.ns{position:absolute;z-index:calc(var(--zIdx) + 2)}.nsc{filter:drop-shadow(0 0 .1rem rgba(211,211,211,.5))}.nst{color:var(--color);font-size:var(--size);font-family:var(--font);font-weight:var(--weight);margin-right:var(--relSize);text-shadow:0 0 .06rem rgba(47,79,79,.25)}.nss{display:block;width:var(--relSize);height:var(--relSize)}.nss>svg{animation:Rotate 2s linear infinite;position:relative;width:inherit;height:inherit;stroke-width:8}.nss .path{stroke:var(--color);stroke-linecap:round;animation:Dash 1.5s ease-in-out infinite}@keyframes Rotate{to{transform:rotate(360deg)}}@keyframes Dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}
`,document.head.appendChild(o);const i="4.0.0",d="";var u=(t=>(t.Add="add",t.Remove="remove",t))(u||{});const h=class h{constructor(){a(this,"id");a(this,"element");this.element=S(),this.element.id=this.id=h.generateGUID()}static generateGUID(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const n=Math.random()*16|0;return(e==="x"?n:n&3|8).toString(16)})}getNSContentElement(){return this.getNSElement().firstElementChild}getNSTextElement(){return this.getNSContentElement().firstElementChild}getId(){return this.id}getNSElement(){return this.element}setText(e){return this.getNSTextElement().innerText=e,e.length>0?this.showText():this.hideText(),this}showText(){return k(this.getNSTextElement()),this}hideText(){return p(this.getNSTextElement()),this}remove(){var e;return this.element&&((e=this.element.parentElement)==null||e.removeChild(this.element),delete this.element),this}};a(h,"NSClass","ns"),a(h,"NSHostClass","nsh");let c=h;function S(){return new DOMParser().parseFromString('<div class=ns><div class=nsc><div class=nst></div><div class=nss><svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none></circle></svg></div></div></div>',"text/html").body.firstChild}function w(t,e){e.children.length>0?e.insertBefore(t,e.children.item(0)):e.append(t)}function x(t,e){t==null||t.classList[e](c.NSHostClass)}function y(t){x(t.getNSElement().parentElement,u.Remove)}function k(t){t.style.display="flex"}function p(t){t.style.display="none"}function g(t){return t instanceof Element?t:document.querySelector(t||"")}function N(t){var e;return((e=t==null?void 0:t.classList)==null?void 0:e.contains(c.NSClass))??!1}function m(t,e){x(t.parentElement,u.Remove),x(e,u.Add),w(t,e)}function v(t){const e=t.firstElementChild;if(e!==null&&N(e)){const l=e.id;return f.getInstance().nsStack.find(b=>b.getId()===l)??null}return null}const s=class s{constructor(){a(this,"version");a(this,"nsStack");this.version=i,this.nsStack=[]}_findIndex(e){return this.nsStack.findIndex(e)}_find(e){return this.nsStack.find(e)}static getInstance(){return s._instance||(s._instance=new s),s._instance}static _assignToWindow(){Object.defineProperty(window,s.WindowAccessorKey,{value:s.getInstance(),writable:!1})}static start(){s._assignToWindow(),window.addEventListener("load",()=>{window[s.WindowAccessorKey]instanceof s||s._assignToWindow()})}_createNS(e){const n=new c;return n.setText(e||""),this.nsStack.push(n),n}_cleanAndRemove(e){return y(e),e.remove().getId()}_stackDelete(e){let n=this._findIndex(r=>r.getId()===e.getId());return n<0?null:(this.nsStack.splice(n,1),e.getId())}_deleteNS(e){const n=this._find(e);return n?(this._cleanAndRemove(n),this._stackDelete(n)):null}show(e){let n=v(document.body);return n||(n=this._createNS(),m(n.getNSElement(),document.body)),n.setText(e||"").getId()}showInside(e,n){const r=g(e);if(r){let l=v(r);return l||(l=this._createNS()),m(l.getNSElement(),r),l.setText(n||"").getId()}return null}hide(){const e=this.nsStack.pop();return e?this._cleanAndRemove(e):null}hideAll(){this.nsStack.forEach(this._cleanAndRemove),this.nsStack.splice(0,this.nsStack.length)}hideId(e){return this._deleteNS(n=>n.getId()===e)}hideInside(e){const n=g(e),r=l=>l.getNSElement().parentElement===n;return n?this._deleteNS(r):null}};a(s,"WindowAccessorKey","ns"),a(s,"_instance");let f=s;try{f.start()}catch(t){console.warn(t)}})();
