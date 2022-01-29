(function(){"use strict";const I=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerpolicy&&(n.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?n.credentials="include":i.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}};class T extends Error{constructor(t){super(t);this.name=this.constructor.name}getName(){return this.constructor.name}}class L extends T{constructor(t){super(t)}}class w extends T{constructor(t){super(t)}}class N extends T{constructor(t){super(t)}}const O=s=>document.querySelector(s),x=s=>Array.from(document.querySelectorAll(s)),f=(s,t)=>{var l;const e=document.createElement(s);return t&&(e.id||(e.id=t.id+""),e.className||(e.className=t.className+""),(l=t.attributes)==null||l.filter(i=>i.value).forEach(({key:i,value:n})=>p(e,i,n)),t.content&&(typeof t.content=="string"?e.innerText=t.content:e.append(t.content))),e},E=(s,t)=>{s.hidden=!t,t?k(s,"hidden"):p(s,"hidden","true")},c=s=>({to:(t,e)=>{const l=Array.from(t.childNodes);if(l.length<1||!e){t.appendChild(s);return}const n=l[0];t.insertBefore(s,n)}}),d=s=>{const t=s.parentNode;t&&(e=>{const l="px",i=t===document.body;let n,r,h,u;i?n=scrollX+l:n=0+l,i?r=scrollY+l:r=0+l,i?h="100%":h=e.width+l,i?u="100vh":u=e.height+l,o(s,"left",n),o(s,"top",r),o(s,"width",h),o(s,"height",u)})(t.getBoundingClientRect())},F=(s,t,e)=>(([l,i])=>{e.forEach(n=>{l?l(`on${n}`,t):i(n,t,!0)})})([s.attachEvent,s.addEventListener]),C=s=>s instanceof Element||s instanceof Node,b=s=>s&&{}.toString.call(s)==="[object Function]",o=(s,t,e)=>{s.style[t]=e},p=(s,t,e)=>{s.setAttribute(t,e)},k=(s,t)=>{s.removeAttribute(t)};class a{static makeMainElement(){const t=f("div",{className:"nanosplash-container",attributes:[{key:"data-splash-animation",value:this.DEFAULT.SPLASH_ANIMATION}]});return t.style.backgroundColor=this.DEFAULT.BACKGROUND_COLOR,t}static makeSplashElement(){return f("img",{className:"nanosplash-img",attributes:[{key:"src",value:null},{key:"alt",value:"Nanosplash indicator"}]})}static makeTextElement(){return f("div",{className:"nanosplash-text",content:this.DEFAULT.TEXT})}}a.DEFAULT={DESTINATION_NODE:document.body,TEXT:"Loading ...",TEXT_FONT:'"Arial", sans-serif',TEXT_WEIGHT:"medium",TEXT_COLOR:"#555",TEXT_SIZE:"26px",SPLASH_WIDTH:"100px",SPLASH_HEIGHT:"auto",SPLASH_ANIMATION:"pulse",BACKGROUND_COLOR:"rgba(255, 255, 255, 0.90)",BACKGROUND_BLUR:"light"};var U="";class m{constructor(t){var l,i,n,r,h;this.cache={parentPosition:""},this.defaultText=(i=(l=t==null?void 0:t.default)==null?void 0:l.text)!=null?i:a.DEFAULT.TEXT,this.defaultDestination=m.getDestinationElement((r=(n=t==null?void 0:t.default)==null?void 0:n.destination)!=null?r:a.DEFAULT.DESTINATION_NODE),this.mainElement=a.makeMainElement(),this.splashElement=a.makeSplashElement(),this.textElement=a.makeTextElement(),this.setDefaultStyles();const e=(h=t==null?void 0:t.splash)==null?void 0:h.src;e&&(this.setSplashSource(e),c(this.splashElement).to(this.mainElement)),c(this.textElement).to(this.mainElement),c(this.mainElement).to(this.defaultDestination,!0),E(this.mainElement,!1),d(this.mainElement),t&&this.configure(t)}install(){Object.defineProperty(window,"loading",{value:this,writable:!1}),F(window,()=>d(this.mainElement),["resize","scroll"]);try{m.checkStyleResources()}catch(t){console.error(t)}}configure(t){var e,l,i,n,r,h,u,S,A,y,D,P;return((e=t==null?void 0:t.default)==null?void 0:e.destination)&&(this.defaultDestination=m.getDestinationElement(t.default.destination)),this.defaultText||(this.defaultText=(l=t.default)==null?void 0:l.text),((i=t.text)==null?void 0:i.family)&&this.setTextFontFamily(t.text.family),((n=t.text)==null?void 0:n.weight)&&this.setTextWeight(t.text.weight),((r=t.text)==null?void 0:r.color)&&this.setTextColor(t.text.color),((h=t.text)==null?void 0:h.size)&&this.setTextSize(t.text.size),((u=t.background)==null?void 0:u.color)&&this.setBackgroundColor(t.background.color),((S=t.background)==null?void 0:S.blur)&&this.setBackgroundBlur(t.background.blur),t.splash?(((A=t.splash)==null?void 0:A.src)&&(this.mainElement.contains(this.splashElement)||c(this.splashElement).to(this.mainElement,!0),this.setSplashSource(t.splash.src)),((y=t.splash)==null?void 0:y.width)&&this.setSplashWidth(t.splash.width),((D=t.splash)==null?void 0:D.height)&&this.setSplashHeight(t.splash.height),((P=t.splash)==null?void 0:P.animation)&&this.setSplashAnimation(t.splash.animation)):E(this.splashElement,!1),this}show(t){this.setText(t!=null?t:a.DEFAULT.TEXT),E(this.mainElement,!0);const e=l=>l.finally(()=>this.hide());return{inside:l=>{this.restoreParentPosition();const i=m.getDestinationElement(l);return c(this.mainElement).to(i,!0),d(this.mainElement),this.setParentPositionToRelative(),{during:e}},during:e}}hide(){this.restoreParentPosition(),E(this.mainElement,!1),this.setText(this.defaultText),c(this.mainElement).to(this.defaultDestination,!0),d(this.mainElement)}setDefaultStyles(){this.setTextFontFamily(a.DEFAULT.TEXT_FONT),this.setTextWeight(a.DEFAULT.TEXT_WEIGHT),this.setTextColor(a.DEFAULT.TEXT_COLOR),this.setTextSize(a.DEFAULT.TEXT_SIZE),this.setSplashWidth(a.DEFAULT.SPLASH_WIDTH),this.setSplashHeight(a.DEFAULT.SPLASH_HEIGHT),this.setSplashAnimation(a.DEFAULT.SPLASH_ANIMATION),this.setBackgroundColor(a.DEFAULT.BACKGROUND_COLOR),this.setBackgroundBlur(a.DEFAULT.BACKGROUND_BLUR)}doIfParentExist(t){(e=>{e&&t(e)})(this.mainElement.parentElement)}setParentPosition(t){this.doIfParentExist(e=>{o(e,"position",t)})}cacheParentPosition(){this.doIfParentExist(t=>{this.cache.parentPosition=t.style.position})}restoreParentPosition(){this.setParentPosition(this.cache.parentPosition)}setParentPositionToRelative(){this.cacheParentPosition(),this.setParentPosition("relative")}setText(t){this.textElement.innerText=t}setTextFontFamily(t){o(this.textElement,"fontFamily",t)}setTextWeight(t){o(this.textElement,"fontWeight",t)}setTextColor(t){o(this.textElement,"color",t)}setTextSize(t){o(this.textElement,"fontSize",t)}setSplashSource(t){this.splashElement.src=t,E(this.splashElement,!0)}setSplashWidth(t){o(this.splashElement,"width",t)}setSplashHeight(t){o(this.splashElement,"height",t)}setSplashAnimation(t){p(this.mainElement,"data-splash-animation",t)}setBackgroundColor(t){o(this.mainElement,"backgroundColor",t)}setBackgroundBlur(t){p(this.mainElement,"data-blur",t)}static checkStyleResources(){window.addEventListener("load",async function(){const t=x('link[href*="nanosplash"]'),e=n=>/\.nanosplash/.test(n.innerText),l=x("style").filter(e);if(!(t.length>0||l.length>0))throw new N("Missing the Nanosplash CSS")})}static getDestinationElement(t){const e=typeof t=="string",l=b(t),i=C(t);let n;if(e)n=O(t);else if(l)n=t();else if(i)n=t;else throw new L;if(!n)throw new w("Destination element is falsy");return n}}window&&window instanceof Window&&new m().install()})();
