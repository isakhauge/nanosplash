var t=Object.defineProperty,s=Object.defineProperties,e=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,h=(s,e,i)=>e in s?t(s,e,{t:!0,i:!0,writable:!0,value:i}):s[e]=i,o=document.createElement("style");o.innerHTML=".ns-blur,body .ns-fs~*{filter:blur(5px);overflow:hidden}.ns-wrapper{position:relative}.ns-fs{left:0;min-height:100vh;min-width:100%;position:fixed;top:0;z-index:2}.ns-window{align-items:center;background-color:#fffc;display:flex;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%;z-index:1}.ns-img{margin-bottom:2em;max-height:9rem;width:9rem}.ns-text-container{align-items:center}.ns-text,.ns-text-container{display:flex;justify-content:center}.ns-text{color:#5a6685}.ns-spinner{display:flex;height:1em;margin-left:1em;width:1em}.ns-spinner>svg{stroke-width:8;-webkit-animation:Rotate 2s linear infinite;animation:Rotate 2s linear infinite;height:inherit;position:relative;width:inherit}.ns-spinner .path{stroke:#5a6685;stroke-linecap:round;-webkit-animation:Dash 1.5s ease-in-out infinite;animation:Dash 1.5s ease-in-out infinite}@-webkit-keyframes Rotate{to{transform:rotate(1turn)}}@keyframes Rotate{to{transform:rotate(1turn)}}@-webkit-keyframes Dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}@keyframes Dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}\n",document.head.appendChild(o),function(){function t(t){return document.querySelector(t)}const o=t=>document.createElement(t);function a(t,...s){t.classList.add(...s)}function c(t,s,e){t.setAttribute(s,e)}class l extends Error{constructor(t,s){super(t),this.name=this.constructor.name,this.h=s}}class u extends l{constructor(t,s,e){super(t),this.destination=s,this.h=e}}class d extends l{constructor(t,s){super(t),this.o=s}}class f{static l(s){if("string"==typeof s)try{const e=t(s);if(!e)throw new l(`No DOM match with ${s}`);return e}catch(t){throw new u(`Destination (${s}) is either invalid or non-existing in DOM`,s,t)}else if(s instanceof Node)return s;throw new d(`Destination (${s}) must be either a Node or a CSS selector`,s)}static u(t){const o={getId:()=>t.getId(),remove:()=>t.delete(),moveTo:s=>t.moveTo(s),getText:()=>t.getText(),setText:s=>t.setText(s),getImgSrc:()=>t.getImgSrc(),setImgSrc:s=>t.setImgSrc(s)};return a=((t,s)=>{for(var e in s||(s={}))n.call(s,e)&&h(t,e,s[e]);if(i)for(var e of i(s))r.call(s,e)&&h(t,e,s[e]);return t})({},o),s(a,e({inside:s=>(t.moveTo(s),o)}));var a}static m(){const t=o("div");return a(t,"ns-spinner"),t.innerHTML='\n            <svg viewBox="0 0 50 50">\n                <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>\n            </svg>\n        ',t}}class m{constructor(t,s,e){var i;this.g=o("div"),this.p=o("div"),this.v=o("div"),this.k=f.m(),this.S=o("div"),this.D=o("div"),this.I=o("div"),this.O=o("img"),this.id=Math.random().toString(36).substring(2),this.N=t,this.p.innerText=s,this.j=e,this.O.src=null!=(i=this.j)?i:"",this.O.alt=p.F,this.g.style.fontSize=t.T(),this.k.style.display=t.A()?"flex":"none",this.M(),this.setImgSrc(e)}C(){a(this.I,"ns-container"),a(this.D,"ns-blur"),a(this.O,"ns-img"),a(this.p,"ns-text"),a(this.v,"ns-text-container"),a(this.k,"ns-spinner"),a(this.S,"ns","ns-window"),a(this.g,"ns-wrapper")}R(){this.v.append(this.p,this.k),this.I.append(this.O,this.v),this.S.append(this.I),this.g.append(this.D,this.S)}M(){this.g.id=this.getId(),c(this.g,"data-ctx","nanosplash"),this.R(),this.C()}getId(){return this.id}getText(){return this.p.innerText}setText(t){return this.p.innerText=t,this}getImgSrc(){return this.j}setImgSrc(t){return this.O.src=null!=t?t:"",this.O.style.display=t?"block":"none",this.R(),this}W(){return this.$}B(){const t=this.g.parentElement;t&&this.H(t)}P(){c(this.g,"style",""),this.g.classList.remove("ns-fs")}V(t){const s=t.parentNode;s&&(this.H(s),s.replaceChild(this.g,t),this.D.appendChild(t))}q(){this.g.classList.add("ns-fs"),((t,s,e=!1)=>{t&&s&&(s.hasChildNodes()&&e?s.insertBefore(t,s.firstChild):s.appendChild(t))})(this.g,document.body,!0)}G(t){this.N.J(t).filter((t=>t.getId()!==this.getId())).forEach((t=>t.delete()))}moveTo(t){try{this.B(),this.$=f.l(t),this.G(this.$),this.$===document.body?this.q():(this.P(),this.V(this.$)),this.M()}catch(t){this.delete(),this.N.debug&&console.warn(t)}}K(t){Array.from(this.D.childNodes).forEach(t)}H(t){this.K((s=>t.insertBefore(s,this.g)))}L(){[this.p,this.k,this.v,this.O,this.I,this.D,this.S,this.g].forEach((t=>t.remove()))}delete(){this.B(),this.L(),this.N.delete(this)}}class w{static U(t,s,e,i){var n;return t||(t=new m(s,e,i)),t.setText(e).setImgSrc(null!=(n=t.getImgSrc())?n:i)}static X(t,s){return e=>(s=w.U(s,t,e),t.Y.set(s.getId(),s),s.moveTo(document.body),f.u(s))}static Z(t,s){return(...e)=>((s=w.U(s,t,"")).moveTo(document.body),(async()=>{for(const[t,[i,n]]of e.entries())s.setText(n),await i;s.delete()})(),f.u(s))}static _(t,s){return e=>(s=w.U(s,t,""),{show:i=>(t.Y.set(s.getId(),s),s.moveTo(document.body),s.setText(i),e.finally((()=>s.delete())),f.u(s))})}}const g=class{constructor(t){var s;this.debug=void 0===(null==t?void 0:t.debug)?g.tt:t.debug,this.j=null==t?void 0:t.j,this.st=void 0===(null==t?void 0:t.st)?g.et:t.st,this.fontSize=null!=(s=null==t?void 0:t.fontSize)?s:"18px",this.Y=new Map}setImgSrc(t){return this.j=t,this}it(t){return this.st=t,this}nt(t){return this.fontSize=t,this}getImgSrc(){return this.j}A(){return this.st}T(){return this.fontSize}show(t){return w.X(this,new m(this,t,this.j))(t)}progress(...t){return w.Z(this,new m(this,"",this.j))(...t)}while(t){return w._(this,new m(this,"",this.j))(t)}rt(t){const s=this.Y.size,e=Array.from(this.Y.values());for(let i=s-1;i>=0;i--){const s=e[i];if(!t(s.getId(),s,i))break}}delete(t){this.Y.delete(t.getId())}hideAll(){this.Y.forEach((t=>t.delete()))}hide(s){try{if(s){const e=s instanceof Node,i=t=>{Array.from(this.Y.values()).filter((s=>s.W()===t)).forEach((t=>t.delete()))};if("string"==typeof s){const e=this.Y.get(s);if(e)return void e.delete();{const e=t(s);throw e&&i(e),new l(`The CSS selector (${s}) points to a non-existing DOM element.`)}}if(!e)throw new d("The ref argument must be either a string or Node",s);i(s)}else{const t=this.Y.size;this.rt(((s,e,i)=>{const n=i===t-1;return n&&e.delete(),n}))}}catch(t){this.debug&&console.warn(t)}}J(t){return Array.from(this.Y.values()).filter((s=>s.W()===t))}};let p=g;p.F="Nanosplash",p.et=!0,p.tt=!0,window.addEventListener("load",(()=>{window.Nanosplash=p,window.ns=new p}))}();
