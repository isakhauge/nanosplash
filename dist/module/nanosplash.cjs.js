"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports[Symbol.toStringTag]="Module";class t extends Error{constructor(t){super(t)}getName(){return this.constructor.name}}class e extends t{constructor(t){super(t)}}function n(t,e){const n=document.createElement(t);return e&&(e.id&&(n.id=e.id),e.className&&(n.className=e.className),e.attributes&&e.attributes.filter((t=>t.value)).forEach((({key:t,value:e})=>n.setAttribute(t,e))),e.eventListeners&&e.eventListeners.forEach((({event:t,handler:e})=>n.addEventListener(t,e))),e.content&&("string"==typeof e.content?n.innerText=e.content:n.append(e.content))),n}function s(t,e,n){t.setAttribute(e,n)}function i(t,e){e?function(t){t.hidden=!1,function(t,e){t.removeAttribute(e)}(t,"hidden")}(t):function(t){t.hidden=!0,s(t,"hidden","true")}(t)}function l(t){return t.parentNode}function a(t,e){const n=Array.from(t.childNodes);if(n.length<1)return void t.appendChild(e);const s=n[0];t.insertBefore(e,s)}function o(t){const e=l(t),{top:n,left:s,width:i,height:a}=e.getBoundingClientRect();t.style.width=i+"px",t.style.height=a+"px",t.style.top=n+"px",t.style.left=s+"px"}const r=class{constructor(){this.defaultText=r.DEFAULT_TEXT,this.defaultDestination=r.DEFAULT_DESTINATION,this.mainElement=r.makeMainElement(),this.splashElement=r.makeSplashElement(),this.textElement=r.makeTextElement(),r.assembleElements(this.mainElement,this.splashElement,this.textElement),a(r.DEFAULT_DESTINATION,this.mainElement),i(this.mainElement,!1),o(this.mainElement),this.setDefaultStyles()}configure(t){var e,n,s,l,a,o,h,d,u,c;return(null==(e=null==t?void 0:t.default)?void 0:e.destination)&&(this.defaultDestination=r.getDestinationElement(t.default.destination)),this.defaultText||(this.defaultText=null==(n=t.default)?void 0:n.text),(null==(s=t.text)?void 0:s.family)&&this.setTextFontFamily(t.text.family),(null==(l=t.text)?void 0:l.color)&&this.setTextColor(t.text.color),(null==(a=t.text)?void 0:a.size)&&this.setTextSize(t.text.size),(null==(o=t.background)?void 0:o.color)&&this.setBackgroundColor(t.background.color),void 0!==(null==(h=t.background)?void 0:h.blur)&&this.setBackgroundBlur(t.background.blur),t.splash?((null==(d=t.splash)?void 0:d.src)&&this.setSplashSource(t.splash.src),(null==(u=t.splash)?void 0:u.width)&&this.setSplashWidth(t.splash.width),(null==(c=t.splash)?void 0:c.animation)&&this.setSplashAnimation(t.splash.animation)):i(this.splashElement,!1),this}setDefaultStyles(){this.setTextFontFamily(r.DEFAULT_TEXT_FONT),this.setTextColor(r.DEFAULT_TEXT_COLOR),this.setTextSize(r.DEFAULT_TEXT_SIZE),this.setSplashWidth(r.DEFAULT_SPLASH_WIDTH),this.setSplashAnimation(r.DEFAULT_SPLASH_ANIMATION),this.setBackgroundColor(r.DEFAULT_BACKGROUND_COLOR),this.setBackgroundBlur(r.DEFAULT_BACKGROUND_BLUR)}show(t){return this.setText(null!=t?t:r.DEFAULT_TEXT),i(this.mainElement,!0),{inside:t=>this.moveTo(t)}}hide(){i(this.mainElement,!1),this.setText(this.defaultText),this.moveTo(this.defaultDestination)}moveTo(t){const e=r.getDestinationElement(t);this.mainElement.parentNode?function(t,e){const n=l(t);null==n||n.removeChild(t),a(e,t)}(this.mainElement,e):a(e,this.mainElement),o(this.mainElement)}static makeMainElement(){const t=n("div",{id:"tiny-loader",attributes:[{key:"data-blur",value:String(r.DEFAULT_BACKGROUND_BLUR)},{key:"data-splash-animation",value:r.DEFAULT_SPLASH_ANIMATION}]});return t.style.backgroundColor=r.DEFAULT_BACKGROUND_COLOR,t}static makeSplashElement(){const t=n("img",{className:"tl-splash",attributes:[{key:"src",value:r.DEFAULT_SPLASH_SOURCE},{key:"alt",value:"NanoSplash indicator"}]});return i(t,!1),t}static makeTextElement(){return n("div",{className:"tl-text",content:r.DEFAULT_TEXT})}static assembleElements(t,e,n){e&&t.appendChild(e),t.appendChild(n)}setText(t){this.textElement.innerText=t}setTextFontFamily(t){this.textElement.style.fontFamily=t}setTextColor(t){this.textElement.style.color=t}setTextSize(t){this.textElement.style.fontSize=t}setSplashSource(t){this.splashElement.src=t,i(this.splashElement,!0)}setSplashWidth(t){this.splashElement.style.width=t}setSplashAnimation(t){s(this.mainElement,"data-splash-animation",t)}setBackgroundColor(t){this.mainElement.style.backgroundColor=t}setBackgroundBlur(t){s(this.mainElement,"data-blur",String(t))}static getDestinationElement(t){if("string"==typeof t){const s=(n=t,document.querySelector(n));if(r.isElementOrNode(s))return s;throw new e("The DOM selector does not point to an Element")}if(r.isFunction(t)){const n=t();if(r.isElementOrNode(n))return n;throw new e("The destination callback returned an invalid value")}if(r.isElementOrNode(t))return t;var n;throw new e}static isElementOrNode(t){return t instanceof Element||t instanceof Node}static isFunction(t){return t&&"[object Function]"==={}.toString.call(t)}static injectInstanceIntoGlobalScope(t){Object.defineProperty(window,"splash",{value:t,writable:!1}),r.adaptSizeOnResize(t.mainElement)}static adaptSizeOnResize(t){window.attachEvent?window.attachEvent("onresize",(function(){o(t)})):window.addEventListener&&window.addEventListener("resize",(function(){o(t)}),!0)}};let h=r;h.DEFAULT_TEXT="Loading ...",h.DEFAULT_TEXT_FONT='"Arial", sans-serif',h.DEFAULT_TEXT_COLOR="#555",h.DEFAULT_TEXT_SIZE="1.5rem",h.DEFAULT_SPLASH_SOURCE=null,h.DEFAULT_SPLASH_WIDTH="100px",h.DEFAULT_SPLASH_ANIMATION="pulse",h.DEFAULT_DESTINATION=document.body,h.DEFAULT_BACKGROUND_COLOR="rgba(255, 255, 255, 0.75)",h.DEFAULT_BACKGROUND_BLUR=!0,exports.NanoSplash=h;
