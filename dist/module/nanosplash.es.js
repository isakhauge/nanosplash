var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var style = /* @__PURE__ */ (() => ".ns-blur,body .ns-fs~*{filter:blur(5px);overflow:hidden}.ns-wrapper{position:relative}.ns-fs{left:0;min-height:100vh;min-width:100%;position:fixed;top:0;z-index:2}.ns-window{align-items:center;background-color:#fffc;display:flex;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%;z-index:1}.ns-img{margin-bottom:2em;max-height:9rem;width:9rem}.ns-text-container{align-items:center}.ns-text,.ns-text-container{display:flex;justify-content:center}.ns-text{color:#5a6685}.ns-spinner{display:flex;height:1em;margin-left:1em;width:1em}.ns-spinner>svg{stroke-width:8;-webkit-animation:Rotate 2s linear infinite;animation:Rotate 2s linear infinite;height:inherit;position:relative;width:inherit}.ns-spinner .path{stroke:#5a6685;stroke-linecap:round;-webkit-animation:Dash 1.5s ease-in-out infinite;animation:Dash 1.5s ease-in-out infinite}@-webkit-keyframes Rotate{to{transform:rotate(1turn)}}@keyframes Rotate{to{transform:rotate(1turn)}}@-webkit-keyframes Dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}@keyframes Dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}\n")();
function get(selector) {
  return document.querySelector(selector);
}
function move(source, destination, asFirstChild = false) {
  if (source && destination) {
    destination.hasChildNodes() && asFirstChild ? destination.insertBefore(source, destination.firstChild) : destination.appendChild(source);
  }
}
const mk = (tag) => document.createElement(tag);
function addClass(node, ...classes) {
  node.classList.add(...classes);
}
function setAttr(node, attribute, value) {
  node.setAttribute(attribute, value);
}
class Exception extends Error {
  constructor(message, cause) {
    super(message);
    this.name = this.constructor.name;
    this.cause = cause;
  }
}
class DestinationException extends Exception {
  constructor(message, destination, cause) {
    super(message);
    this.destination = destination;
    this.cause = cause;
  }
}
class IllegalArgumentException extends Exception {
  constructor(message, argument) {
    super(message);
    this.argument = argument;
  }
}
class NanosplashRepository {
  static destinationToNode(destination) {
    if (typeof destination === "string") {
      try {
        const element = get(destination);
        if (!element) {
          throw new Exception(`No DOM match with ${destination}`);
        }
        return element;
      } catch (e) {
        throw new DestinationException(`Destination (${destination}) is either invalid or non-existing in DOM`, destination, e);
      }
    } else if (destination instanceof Node) {
      return destination;
    }
    throw new IllegalArgumentException(`Destination (${destination}) must be either a Node or a CSS selector`, destination);
  }
  static createContextualApiObject(splash) {
    const ctx = {
      getId: () => splash.getId(),
      remove: () => splash.delete(),
      moveTo: (selector) => splash.moveTo(selector),
      getText: () => splash.getText(),
      setText: (text) => splash.setText(text),
      getImgSrc: () => splash.getImgSrc(),
      setImgSrc: (src) => splash.setImgSrc(src)
    };
    return __spreadProps(__spreadValues({}, ctx), {
      inside: (selector) => {
        splash.moveTo(selector);
        return ctx;
      }
    });
  }
  static createNanosplashSpinnerElement() {
    const div = mk("div");
    addClass(div, "ns-spinner");
    div.innerHTML = `
            <svg viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
            </svg>
        `;
    return div;
  }
}
class SplashInstance {
  constructor(ns, text, imgSrc) {
    var _a;
    this.nsRootElement = mk("div");
    this.nsTextElement = mk("div");
    this.nsTextContainerElement = mk("div");
    this.nsSpinnerElement = NanosplashRepository.createNanosplashSpinnerElement();
    this.nsWindowElement = mk("div");
    this.nsWrapperElement = mk("div");
    this.nsContentElement = mk("div");
    this.nsImageElement = mk("img");
    this.id = Math.random().toString(36).substring(2);
    this.nsInstance = ns;
    this.nsTextElement.innerText = text;
    this.imgSrc = imgSrc;
    this.nsImageElement.src = (_a = this.imgSrc) != null ? _a : "";
    this.nsImageElement.alt = Nanosplash.APP_NAME;
    this.nsRootElement.style.fontSize = ns.getFontSize();
    this.nsSpinnerElement.style.display = ns.spinnerIsVisible() ? "flex" : "none";
    this.assembleNSComponent();
    this.setImgSrc(imgSrc);
  }
  assignCSSClasses() {
    addClass(this.nsContentElement, "ns-container");
    addClass(this.nsWrapperElement, "ns-blur");
    addClass(this.nsImageElement, "ns-img");
    addClass(this.nsTextElement, "ns-text");
    addClass(this.nsTextContainerElement, "ns-text-container");
    addClass(this.nsSpinnerElement, "ns-spinner");
    addClass(this.nsWindowElement, "ns", "ns-window");
    addClass(this.nsRootElement, "ns-wrapper");
  }
  assembleElementStructure() {
    this.nsTextContainerElement.append(this.nsTextElement, this.nsSpinnerElement);
    this.nsContentElement.append(this.nsImageElement, this.nsTextContainerElement);
    this.nsWindowElement.append(this.nsContentElement);
    this.nsRootElement.append(this.nsWrapperElement, this.nsWindowElement);
  }
  assembleNSComponent() {
    this.nsRootElement.id = this.getId();
    setAttr(this.nsRootElement, "data-ctx", "nanosplash");
    this.assembleElementStructure();
    this.assignCSSClasses();
  }
  getId() {
    return this.id;
  }
  getText() {
    return this.nsTextElement.innerText;
  }
  setText(text) {
    this.nsTextElement.innerText = text;
    return this;
  }
  getImgSrc() {
    return this.imgSrc;
  }
  setImgSrc(src) {
    this.nsImageElement.src = src != null ? src : "";
    this.nsImageElement.style.display = src ? "block" : "none";
    this.assembleElementStructure();
    return this;
  }
  getDestination() {
    return this.destinationNode;
  }
  cleanAndRestore() {
    const currentParent = this.nsRootElement.parentElement;
    if (currentParent) {
      this.restoreDOMStructure(currentParent);
    }
  }
  resetFullscreenAttributes() {
    setAttr(this.nsRootElement, "style", "");
    this.nsRootElement.classList.remove("ns-fs");
  }
  moveWithRegularStrategy(targetNode) {
    const targetParentNode = targetNode.parentNode;
    if (targetParentNode) {
      this.restoreDOMStructure(targetParentNode);
      targetParentNode.replaceChild(this.nsRootElement, targetNode);
      this.nsWrapperElement.appendChild(targetNode);
    }
  }
  moveWithFullscreenStrategy() {
    this.nsRootElement.classList.add("ns-fs");
    move(this.nsRootElement, document.body, true);
  }
  replaceSplashInstancesHavingSameDestination(destinationNode) {
    const fnNotSameInstance = (v) => v.getId() !== this.getId();
    const fnDelete = (v) => v.delete();
    this.nsInstance.getFromDestinationNode(destinationNode).filter(fnNotSameInstance).forEach(fnDelete);
  }
  moveTo(destination) {
    try {
      this.cleanAndRestore();
      this.destinationNode = NanosplashRepository.destinationToNode(destination);
      this.replaceSplashInstancesHavingSameDestination(this.destinationNode);
      const targetIsBody = this.destinationNode === document.body;
      if (targetIsBody) {
        this.moveWithFullscreenStrategy();
      } else {
        this.resetFullscreenAttributes();
        this.moveWithRegularStrategy(this.destinationNode);
      }
      this.assembleNSComponent();
    } catch (e) {
      this.delete();
      if (this.nsInstance.debug) {
        console.warn(e);
      }
    }
  }
  forEachWrappedNode(callback) {
    Array.from(this.nsWrapperElement.childNodes).forEach(callback);
  }
  restoreDOMStructure(parentNode) {
    this.forEachWrappedNode((child) => parentNode.insertBefore(child, this.nsRootElement));
  }
  removeElementsFromDOM() {
    [
      this.nsTextElement,
      this.nsSpinnerElement,
      this.nsTextContainerElement,
      this.nsImageElement,
      this.nsContentElement,
      this.nsWrapperElement,
      this.nsWindowElement,
      this.nsRootElement
    ].forEach((v) => v.remove());
  }
  delete() {
    this.cleanAndRestore();
    this.removeElementsFromDOM();
    this.nsInstance.delete(this);
  }
}
class NanosplashFactory {
  static ensureInstance(splash, ns, text, imgSrc) {
    var _a;
    if (!splash) {
      splash = new SplashInstance(ns, text, imgSrc);
    }
    return splash.setText(text).setImgSrc((_a = splash.getImgSrc()) != null ? _a : imgSrc);
  }
  static createShowFunction(ns, splash) {
    return (text) => {
      splash = NanosplashFactory.ensureInstance(splash, ns, text);
      ns.instances.set(splash.getId(), splash);
      splash.moveTo(document.body);
      return NanosplashRepository.createContextualApiObject(splash);
    };
  }
  static createProgressFunction(ns, splash) {
    return (...jobs) => {
      splash = NanosplashFactory.ensureInstance(splash, ns, "");
      splash.moveTo(document.body);
      (async () => {
        for (const [_, [job, text]] of jobs.entries()) {
          splash.setText(text);
          await job;
        }
        splash.delete();
      })();
      return NanosplashRepository.createContextualApiObject(splash);
    };
  }
  static createWhileFunction(ns, splash) {
    return (asyncTask) => {
      splash = NanosplashFactory.ensureInstance(splash, ns, "");
      return {
        show(text) {
          ns.instances.set(splash.getId(), splash);
          splash.moveTo(document.body);
          splash.setText(text);
          asyncTask.finally(() => splash.delete());
          return NanosplashRepository.createContextualApiObject(splash);
        }
      };
    };
  }
}
const _Nanosplash = class {
  constructor(options) {
    var _a;
    this.debug = (options == null ? void 0 : options.debug) === void 0 ? _Nanosplash.DEBUG : options.debug;
    this.imgSrc = options == null ? void 0 : options.imgSrc;
    this.spinner = (options == null ? void 0 : options.spinner) === void 0 ? _Nanosplash.SPINNER_DEFAULT_VISIBILITY : options.spinner;
    this.fontSize = (_a = options == null ? void 0 : options.fontSize) != null ? _a : "18px";
    this.instances = /* @__PURE__ */ new Map();
  }
  setImgSrc(value) {
    this.imgSrc = value;
    return this;
  }
  showSpinner(value) {
    this.spinner = value;
    return this;
  }
  setFontSize(value) {
    this.fontSize = value;
    return this;
  }
  getImgSrc() {
    return this.imgSrc;
  }
  spinnerIsVisible() {
    return this.spinner;
  }
  getFontSize() {
    return this.fontSize;
  }
  show(text) {
    return NanosplashFactory.createShowFunction(this, new SplashInstance(this, text, this.imgSrc))(text);
  }
  progress(...jobs) {
    return NanosplashFactory.createProgressFunction(this, new SplashInstance(this, "", this.imgSrc))(...jobs);
  }
  while(asyncTask) {
    return NanosplashFactory.createWhileFunction(this, new SplashInstance(this, "", this.imgSrc))(asyncTask);
  }
  lifoIterate(callback) {
    const n = this.instances.size;
    const instances = Array.from(this.instances.values());
    for (let i = n - 1; i >= 0; i--) {
      const instance = instances[i];
      const id = instance.getId();
      if (!callback(id, instance, i)) {
        break;
      }
    }
  }
  delete(splashInstance) {
    this.instances.delete(splashInstance.getId());
  }
  hideAll() {
    this.instances.forEach((instance) => instance.delete());
  }
  hide(ref) {
    try {
      if (ref) {
        const isString = typeof ref === "string";
        const isNode = ref instanceof Node;
        const deleteInstancesWhereDestination = (destination) => {
          Array.from(this.instances.values()).filter((v) => v.getDestination() === destination).forEach((v) => v.delete());
        };
        if (isString) {
          const splashInstance = this.instances.get(ref);
          if (splashInstance) {
            splashInstance.delete();
            return;
          } else {
            const element = get(ref);
            if (element) {
              deleteInstancesWhereDestination(element);
            }
            throw new Exception(`The CSS selector (${ref}) points to a non-existing DOM element.`);
          }
        } else if (isNode) {
          deleteInstancesWhereDestination(ref);
        } else {
          throw new IllegalArgumentException("The ref argument must be either a string or Node", ref);
        }
      } else {
        const n = this.instances.size;
        this.lifoIterate((_, splashInstance, i) => {
          const remove = i === n - 1;
          if (remove) {
            splashInstance.delete();
          }
          return remove;
        });
      }
    } catch (e) {
      if (this.debug) {
        console.warn(e);
      }
    }
  }
  getFromDestinationNode(node) {
    const fnSameDestinationNode = (v) => v.getDestination() === node;
    return Array.from(this.instances.values()).filter(fnSameDestinationNode);
  }
};
let Nanosplash = _Nanosplash;
Nanosplash.APP_NAME = "Nanosplash";
Nanosplash.SPINNER_DEFAULT_VISIBILITY = true;
Nanosplash.DEBUG = true;
export { Nanosplash as default };
