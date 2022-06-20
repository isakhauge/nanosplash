(function(){"use strict";const w=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}};var y=(()=>`.ns-blur,body .ns-fs~*{filter:blur(5px);overflow:hidden}.ns-wrapper{position:relative}.ns-fs{left:0;min-height:100vh;min-width:100%;position:fixed;top:0;z-index:2}.ns-window{align-items:center;background-color:#fffc;display:flex;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%;z-index:1}.ns-img{margin-bottom:2em;max-height:9rem;width:9rem}.ns-text-container{align-items:center}.ns-text,.ns-text-container{display:flex;justify-content:center}.ns-text{color:#5a6685}.ns-spinner{display:flex;height:1em;margin-left:1em;width:1em}.ns-spinner>svg{stroke-width:8;-webkit-animation:Rotate 2s linear infinite;animation:Rotate 2s linear infinite;height:inherit;position:relative;width:inherit}.ns-spinner .path{stroke:#5a6685;stroke-linecap:round;-webkit-animation:Dash 1.5s ease-in-out infinite;animation:Dash 1.5s ease-in-out infinite}@-webkit-keyframes Rotate{to{transform:rotate(1turn)}}@keyframes Rotate{to{transform:rotate(1turn)}}@-webkit-keyframes Dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}@keyframes Dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}
`)();function g(n){return document.querySelector(n)}function p(n,e,t=!1){n&&e&&(e.hasChildNodes()&&t?e.insertBefore(n,e.firstChild):e.appendChild(n))}const a=n=>document.createElement(n);function o(n,...e){n.classList.add(...e)}function E(n,e,t){n.setAttribute(e,t)}class d extends Error{constructor(e,t){super(e),this.name=this.constructor.name,this.cause=t}}class I extends d{constructor(e,t,i){super(e),this.destination=t,this.cause=i}}class S extends d{constructor(e,t){super(e),this.argument=t}}class h{static destinationToNode(e){if(typeof e=="string")try{const t=g(e);if(!t)throw new d(`No DOM match with ${e}`);return t}catch(t){throw new I(`Destination (${e}) is either invalid or non-existing in DOM`,e,t)}else if(e instanceof Node)return e;throw new S(`Destination (${e}) must be either a Node or a CSS selector`,e)}static createContextualApiObject(e){const t={getId:()=>e.getId(),remove:()=>e.delete(),moveTo:i=>e.moveTo(i),getText:()=>e.getText(),setText:i=>e.setText(i),getImgSrc:()=>e.getImgSrc(),setImgSrc:i=>e.setImgSrc(i)};return{...t,inside:i=>(e.moveTo(i),t)}}static createNanosplashSpinnerElement(){const e=a("div");return o(e,"ns-spinner"),e.innerHTML=`
            <svg viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
            </svg>
        `,e}}class u{constructor(e,t,i){var s;this.nsRootElement=a("div"),this.nsTextElement=a("div"),this.nsTextContainerElement=a("div"),this.nsSpinnerElement=h.createNanosplashSpinnerElement(),this.nsWindowElement=a("div"),this.nsWrapperElement=a("div"),this.nsContentElement=a("div"),this.nsImageElement=a("img"),this.id=Math.random().toString(36).substring(2),this.nsInstance=e,this.nsTextElement.innerText=t,this.imgSrc=i,this.nsImageElement.src=(s=this.imgSrc)!=null?s:"",this.nsImageElement.alt=l.APP_NAME,this.nsRootElement.style.fontSize=e.getFontSize(),this.nsSpinnerElement.style.display=e.spinnerIsVisible()?"flex":"none",this.assembleNSComponent(),this.setImgSrc(i)}assignCSSClasses(){o(this.nsContentElement,"ns-container"),o(this.nsWrapperElement,"ns-blur"),o(this.nsImageElement,"ns-img"),o(this.nsTextElement,"ns-text"),o(this.nsTextContainerElement,"ns-text-container"),o(this.nsSpinnerElement,"ns-spinner"),o(this.nsWindowElement,"ns","ns-window"),o(this.nsRootElement,"ns-wrapper")}assembleElementStructure(){this.nsTextContainerElement.append(this.nsTextElement,this.nsSpinnerElement),this.nsContentElement.append(this.nsImageElement,this.nsTextContainerElement),this.nsWindowElement.append(this.nsContentElement),this.nsRootElement.append(this.nsWrapperElement,this.nsWindowElement)}assembleNSComponent(){this.nsRootElement.id=this.getId(),E(this.nsRootElement,"data-ctx","nanosplash"),this.assembleElementStructure(),this.assignCSSClasses()}getId(){return this.id}getText(){return this.nsTextElement.innerText}setText(e){return this.nsTextElement.innerText=e,this}getImgSrc(){return this.imgSrc}setImgSrc(e){return this.nsImageElement.src=e!=null?e:"",this.nsImageElement.style.display=e?"block":"none",this.assembleElementStructure(),this}getDestination(){return this.destinationNode}cleanAndRestore(){const e=this.nsRootElement.parentElement;e&&this.restoreDOMStructure(e)}resetFullscreenAttributes(){E(this.nsRootElement,"style",""),this.nsRootElement.classList.remove("ns-fs")}moveWithRegularStrategy(e){const t=e.parentNode;t&&(this.restoreDOMStructure(t),t.replaceChild(this.nsRootElement,e),this.nsWrapperElement.appendChild(e))}moveWithFullscreenStrategy(){this.nsRootElement.classList.add("ns-fs"),p(this.nsRootElement,document.body,!0)}replaceSplashInstancesHavingSameDestination(e){const t=s=>s.getId()!==this.getId(),i=s=>s.delete();this.nsInstance.getFromDestinationNode(e).filter(t).forEach(i)}moveTo(e){try{this.cleanAndRestore(),this.destinationNode=h.destinationToNode(e),this.replaceSplashInstancesHavingSameDestination(this.destinationNode),this.destinationNode===document.body?this.moveWithFullscreenStrategy():(this.resetFullscreenAttributes(),this.moveWithRegularStrategy(this.destinationNode)),this.assembleNSComponent()}catch(t){this.delete(),this.nsInstance.debug&&console.warn(t)}}forEachWrappedNode(e){Array.from(this.nsWrapperElement.childNodes).forEach(e)}restoreDOMStructure(e){this.forEachWrappedNode(t=>e.insertBefore(t,this.nsRootElement))}removeElementsFromDOM(){[this.nsTextElement,this.nsSpinnerElement,this.nsTextContainerElement,this.nsImageElement,this.nsContentElement,this.nsWrapperElement,this.nsWindowElement,this.nsRootElement].forEach(e=>e.remove())}delete(){this.cleanAndRestore(),this.removeElementsFromDOM(),this.nsInstance.delete(this)}}class c{static ensureInstance(e,t,i,s){var r;return e||(e=new u(t,i,s)),e.setText(i).setImgSrc((r=e.getImgSrc())!=null?r:s)}static createShowFunction(e,t){return i=>(t=c.ensureInstance(t,e,i),e.instances.set(t.getId(),t),t.moveTo(document.body),h.createContextualApiObject(t))}static createProgressFunction(e,t){return(...i)=>(t=c.ensureInstance(t,e,""),t.moveTo(document.body),(async()=>{for(const[s,[r,m]]of i.entries())t.setText(m),await r;t.delete()})(),h.createContextualApiObject(t))}static createWhileFunction(e,t){return i=>(t=c.ensureInstance(t,e,""),{show(s){return e.instances.set(t.getId(),t),t.moveTo(document.body),t.setText(s),i.finally(()=>t.delete()),h.createContextualApiObject(t)}})}}const f=class{constructor(n){var e;this.debug=(n==null?void 0:n.debug)===void 0?f.DEBUG:n.spinner,this.imgSrc=n==null?void 0:n.imgSrc,this.spinner=(n==null?void 0:n.spinner)===void 0?f.SPINNER_DEFAULT_VISIBILITY:n.spinner,this.fontSize=(e=n==null?void 0:n.fontSize)!=null?e:"18px",this.instances=new Map}setImgSrc(n){return this.imgSrc=n,this}showSpinner(n){return this.spinner=n,this}setFontSize(n){return this.fontSize=n,this}getImgSrc(){return this.imgSrc}spinnerIsVisible(){return this.spinner}getFontSize(){return this.fontSize}show(n){return c.createShowFunction(this,new u(this,n,this.imgSrc))(n)}progress(...n){return c.createProgressFunction(this,new u(this,"",this.imgSrc))(...n)}while(n){return c.createWhileFunction(this,new u(this,"",this.imgSrc))(n)}lifoIterate(n){const e=this.instances.size,t=Array.from(this.instances.values());for(let i=e-1;i>=0;i--){const s=t[i],r=s.getId();if(!n(r,s,i))break}}delete(n){this.instances.delete(n.getId())}hideAll(){this.instances.forEach(n=>n.delete())}hide(n){try{if(n){const e=typeof n=="string",t=n instanceof Node,i=s=>{Array.from(this.instances.values()).filter(r=>r.getDestination()===s).forEach(r=>r.delete())};if(e){const s=this.instances.get(n);if(s){s.delete();return}else{const r=g(n);throw r&&i(r),new d(`The CSS selector (${n}) points to a non-existing DOM element.`)}}else if(t)i(n);else throw new S("The ref argument must be either a string or Node",n)}else{const e=this.instances.size;this.lifoIterate((t,i,s)=>{const r=s===e-1;return r&&i.delete(),r})}}catch(e){this.debug&&console.warn(e)}}getFromDestinationNode(n){const e=t=>t.getDestination()===n;return Array.from(this.instances.values()).filter(e)}};let l=f;l.APP_NAME="Nanosplash",l.SPINNER_DEFAULT_VISIBILITY=!0,l.DEBUG=!0,window.addEventListener("load",()=>{window.Nanosplash=l,window.ns=new l})})();
