var t=Object.defineProperty,s=Object.defineProperties,e=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,h=(s,e,i)=>e in s?t(s,e,{t:!0,i:!0,writable:!0,value:i}):s[e]=i;Object.defineProperties(exports,{h:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const o=t=>document.createElement(t);function c(t,...s){t.classList.add(...s)}function a(t,s,e){t.setAttribute(s,e)}class u{static o(t){if("string"==typeof t){const e=(s=t,document.querySelector(s));if(!e)throw new Error(`No match with ${t}`);return e}if(t instanceof Node)return t;var s;throw new Error("Destination argument must string or Node")}static u(t){const o={getId:()=>t.getId(),remove:()=>t.delete(),moveTo:s=>t.moveTo(s),getText:()=>t.getText(),setText:s=>t.setText(s),getImgSrc:()=>t.getImgSrc(),setImgSrc:s=>t.setImgSrc(s)};return c=((t,s)=>{for(var e in s||(s={}))r.call(s,e)&&h(t,e,s[e]);if(i)for(var e of i(s))n.call(s,e)&&h(t,e,s[e]);return t})({},o),s(c,e({inside:s=>(t.moveTo(s),o)}));var c}}class l{constructor(t,s,e){var i;this.l=o("div"),this.m=o("div"),this.g=o("div"),this.v=o("div"),this.p=o("img"),this.S=o("div"),this.id=Math.random().toString(36).substring(2),this.O=t,this.S.innerText=s,this.I=e,this.p.src=null!=(i=this.I)?i:"",this.p.alt=d.j,this.F(),this.setImgSrc(e)}N(){c(this.v,"ns-container"),c(this.m,"ns-blur"),c(this.p,"ns-img"),c(this.S,"ns-text"),c(this.g,"ns","ns-window"),c(this.l,"ns-wrapper")}T(){this.v.append(this.p,this.S),this.g.append(this.v),this.l.append(this.m,this.g)}F(){this.l.id=this.getId(),a(this.l,"data-ctx","nanosplash"),this.T(),this.N()}getId(){return this.id}getText(){return this.S.innerText}setText(t){return this.S.innerText=t,this}getImgSrc(){return this.I}setImgSrc(t){return this.p.src=null!=t?t:"",this.p.style.display=t?"block":"none",this.T(),this}M(){const t=this.l.parentElement;t&&this.C(t)}A(){a(this.l,"style",""),this.l.classList.remove("ns-fs")}W(t){const s=t.parentNode;s&&(this.C(s),s.replaceChild(this.l,t),this.m.appendChild(t))}D(){this.l.classList.add("ns-fs"),((t,s,e=!1)=>{t&&s&&(s.hasChildNodes()&&e?s.insertBefore(t,s.firstChild):s.appendChild(t))})(this.l,document.body,!0)}moveTo(t){this.M();const s=u.o(t);s===document.body?this.D():(this.A(),this.W(s)),this.F()}k(t){Array.from(this.m.childNodes).forEach(t)}C(t){this.k((s=>t.insertBefore(s,this.l)))}$(){[this.S,this.p,this.v,this.m,this.g,this.l].forEach((t=>t.remove()))}delete(){this.M(),this.$(),this.O.delete(this)}}class m{static _(t,s,e,i){var r;return t||(t=new l(s,e,i)),t.setText(e).setImgSrc(null!=(r=t.getImgSrc())?r:i)}static P(t,s){return e=>(s=m._(s,t,"",e),{show:m.R(t,s),progress:m.q(t,s),while:m.B(t,s)})}static R(t,s){return e=>(s=m._(s,t,e),t.G.set(s.getId(),s),s.moveTo(document.body),u.u(s))}static q(t,s){return(...e)=>((s=m._(s,t,"")).moveTo(document.body),(async()=>{for(const[t,[i,r]]of e.entries())s.setText(r),await i;s.delete()})(),u.u(s))}static B(t,s){return e=>(s=m._(s,t,""),{show:i=>(t.G.set(s.getId(),s),s.moveTo(document.body),s.setText(i),e.finally((()=>s.delete())),u.u(s))})}}class d{constructor(){this.G=new Map}img(t){return m.P(this,new l(this,"",t))(t)}show(t){return m.R(this,new l(this,t))(t)}progress(...t){return m.q(this,new l(this,""))(...t)}while(t){return m.B(this,new l(this,""))(t)}H(t){let s=0;const e=this.G.entries();for(const[i,r]of e)if(!t(i,r,s++))break}delete(t){this.G.delete(t.getId())}hideAll(){this.G.forEach((t=>t.delete()))}hide(t){if(t){const s=this.G.get(t);if(!s)throw new Error(`Could not find element with id: ${t}`);s.delete()}else this.H(((t,s,e)=>{const i=0===e;return i&&s.delete(),i}))}}d.j="Nanosplash",exports.Nanosplash=d;
