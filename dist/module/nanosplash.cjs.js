"use strict";Object.defineProperty(exports,"t",{value:!0}),exports[Symbol.toStringTag]="Module";class t extends Error{constructor(t){super(t),this.name=this.constructor.name}i(){return this.constructor.name}}class s extends t{constructor(t){super(t)}}class i extends t{constructor(t){super(t)}}class e extends t{constructor(t){super(t)}}const n=t=>Array.from(document.querySelectorAll(t)),h=(t,s)=>{var i;const e=document.createElement(t);return s&&(e.id||(e.id=s.id+""),e.className||(e.className=s.className+""),null==(i=s.attributes)||i.filter((t=>t.value)).forEach((({key:t,value:s})=>u(e,t,s))),s.content&&("string"==typeof s.content?e.innerText=s.content:e.append(s.content))),e},o=(t,s)=>{t.hidden=!s,s?c(t,"hidden"):u(t,"hidden","true")},l=t=>({to:(s,i)=>{const e=Array.from(s.childNodes);if(e.length<1||!i)return void s.appendChild(t);const n=e[0];s.insertBefore(t,n)}}),a=t=>{const s=t.parentNode;s&&(i=>{const e="px",n=s===document.body;let h,o,l,a;h=n?scrollX+e:"0px",o=n?scrollY+e:"0px",l=n?"100%":i.width+e,a=n?"100vh":i.height+e,r(t,"left",h),r(t,"top",o),r(t,"width",l),r(t,"height",a)})(s.getBoundingClientRect())},r=(t,s,i)=>{t.style[s]=i},u=(t,s,i)=>{t.setAttribute(s,i)},c=(t,s)=>{t.removeAttribute(s)};class d{static h(){const t=h("div",{className:"nanosplash-container",attributes:[{key:"data-splash-animation",value:this.l.o}]});return t.style.backgroundColor=this.l.u,t}static v(){return h("img",{className:"nanosplash-img",attributes:[{key:"src",value:null},{key:"alt",value:"Nanosplash indicator"}]})}static p(){return h("div",{className:"nanosplash-text",content:this.l.m})}}d.l={T:document.body,m:"Loading ...",g:'"Arial", sans-serif',S:"medium",N:"#555",P:"26px",k:"100px",A:"auto",o:"pulse",u:"rgba(255, 255, 255, 0.90)",O:"light"};class v{constructor(t){var s,i,e,n,h;this.cache={_:""},this.I=null!=(i=null==(s=null==t?void 0:t.default)?void 0:s.text)?i:d.l.m,this.C=v.H(null!=(n=null==(e=null==t?void 0:t.default)?void 0:e.destination)?n:d.l.T),this.D=d.h(),this.L=d.v(),this.R=d.p(),this.B();const r=null==(h=null==t?void 0:t.X)?void 0:h.src;r&&(this.F(r),l(this.L).to(this.D)),l(this.R).to(this.D),l(this.D).to(this.C,!0),o(this.D,!1),a(this.D),t&&this.configure(t)}install(){var t,s,i;Object.defineProperty(window,"loading",{value:this,writable:!1}),t=window,s=()=>a(this.D),i=["resize","scroll"],(([t,e])=>{i.forEach((i=>{t?t(`on${i}`,s):e(i,s,!0)}))})([t.attachEvent,t.addEventListener]),v.M()}configure(t){var s,i,e,n,h,a,r,u,c,d,p,m;if((null==(s=null==t?void 0:t.default)?void 0:s.destination)&&(this.C=v.H(t.default.destination)),this.I||(this.I=null==(i=t.default)?void 0:i.text),(null==(e=t.text)?void 0:e.family)&&this.W(t.text.family),(null==(n=t.text)?void 0:n.weight)&&this.G(t.text.weight),(null==(h=t.text)?void 0:h.color)&&this.j(t.text.color),(null==(a=t.text)?void 0:a.size)&&this.U(t.text.size),(null==(r=t.background)?void 0:r.color)&&this.K(t.background.color),(null==(u=t.background)?void 0:u.blur)&&this.Y(t.background.blur),t.X){if(null==(c=t.X)?void 0:c.src){this.D.contains(this.L)||l(this.L).to(this.D,!0),this.F(t.X.src)}(null==(d=t.X)?void 0:d.width)&&this.Z(t.X.width),(null==(p=t.X)?void 0:p.height)&&this.$(t.X.height),(null==(m=t.X)?void 0:m.animation)&&this.q(t.X.animation)}else o(this.L,!1);return this}show(t){this.J(null!=t?t:d.l.m),o(this.D,!0);const s=t=>t.finally((()=>this.hide()));return{inside:t=>{this.V();const i=v.H(t);return l(this.D).to(i,!0),a(this.D),this.tt(),{during:s}},during:s}}hide(){this.V(),o(this.D,!1),this.J(this.I),l(this.D).to(this.C,!0),a(this.D)}B(){this.W(d.l.g),this.G(d.l.S),this.j(d.l.N),this.U(d.l.P),this.Z(d.l.k),this.$(d.l.A),this.q(d.l.o),this.K(d.l.u),this.Y(d.l.O)}st(t){var s;(s=this.D.parentElement)&&t(s)}it(t){this.st((s=>{r(s,"position",t)}))}et(){this.st((t=>{this.cache._=t.style.position}))}V(){this.it(this.cache._)}tt(){this.et(),this.it("relative")}J(t){this.R.innerText=t}W(t){r(this.R,"fontFamily",t)}G(t){r(this.R,"fontWeight",t)}j(t){r(this.R,"color",t)}U(t){r(this.R,"fontSize",t)}F(t){this.L.src=t,o(this.L,!0)}Z(t){r(this.L,"width",t)}$(t){r(this.L,"height",t)}q(t){u(this.D,"data-splash-animation",t)}K(t){r(this.D,"backgroundColor",t)}Y(t){u(this.D,"data-blur",t)}static M(){const t=n('link[href*="nanosplash"]'),s=n("style").filter((t=>/\.nanosplash/.test(t.innerText)));if(!(t.length>0||s.length>0))throw new e("Missing the Nanosplash CSS")}static H(t){const e="string"==typeof t,n=(h=t)&&"[object Function]"==={}.toString.call(h);var h;const o=(t=>t instanceof Element||t instanceof Node)(t);let l;if(e)a=t,l=document.querySelector(a);else if(n)l=t();else{if(!o)throw new s;l=t}var a;if(!l)throw new i;return l}}exports.Nanosplash=v;
