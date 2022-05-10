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
var style = "";
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
class NanosplashRepository {
  static destinationToNode(destination) {
    if (typeof destination === "string") {
      const element = get(destination);
      if (!element) {
        throw new Error(`No match with ${destination}`);
      }
      return element;
    } else if (destination instanceof Node) {
      return destination;
    }
    throw new Error("Destination argument must string or Node");
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
}
class SplashInstance {
  constructor(ns, text, imgSrc) {
    var _a;
    this.nsRootElement = mk("div");
    this.nsTextElement = mk("div");
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
    this.assembleNSComponent();
    this.setImgSrc(imgSrc);
  }
  assignCSSClasses() {
    addClass(this.nsContentElement, "ns-container");
    addClass(this.nsWrapperElement, "ns-blur");
    addClass(this.nsImageElement, "ns-img");
    addClass(this.nsTextElement, "ns-text");
    addClass(this.nsWindowElement, "ns", "ns-window");
    addClass(this.nsRootElement, "ns-wrapper");
  }
  assembleElementStructure() {
    this.nsContentElement.append(this.nsImageElement, this.nsTextElement);
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
    this.nsInstance.getSplashesWithDestinationNode(destinationNode).filter(fnNotSameInstance).forEach(fnDelete);
  }
  moveTo(destination) {
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
  static createImgFunction(ns, splash) {
    return (src) => {
      splash = NanosplashFactory.ensureInstance(splash, ns, "", src);
      return {
        show: NanosplashFactory.createShowFunction(ns, splash),
        progress: NanosplashFactory.createProgressFunction(ns, splash),
        while: NanosplashFactory.createWhileFunction(ns, splash)
      };
    };
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
class Nanosplash {
  constructor() {
    this.instances = /* @__PURE__ */ new Map();
  }
  img(src) {
    return NanosplashFactory.createImgFunction(this, new SplashInstance(this, "", src))(src);
  }
  show(text) {
    return NanosplashFactory.createShowFunction(this, new SplashInstance(this, text))(text);
  }
  progress(...jobs) {
    return NanosplashFactory.createProgressFunction(this, new SplashInstance(this, ""))(...jobs);
  }
  while(asyncTask) {
    return NanosplashFactory.createWhileFunction(this, new SplashInstance(this, ""))(asyncTask);
  }
  fifoIterate(callback) {
    let i = 0;
    const instanceEntries = this.instances.entries();
    for (const [id, splashInstance] of instanceEntries) {
      if (!callback(id, splashInstance, i++)) {
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
  hide(id) {
    if (id) {
      const splashInstance = this.instances.get(id);
      if (splashInstance) {
        splashInstance.delete();
      } else {
        throw new Error(`Could not find element with id: ${id}`);
      }
    } else {
      this.fifoIterate((_, splashInstance, i) => {
        const remove = i === 0;
        if (remove) {
          splashInstance.delete();
        }
        return remove;
      });
    }
  }
  getSplashesWithDestinationNode(node) {
    const fnSameDestinationNode = (v) => v.getDestination() === node;
    return Array.from(this.instances.values()).filter(fnSameDestinationNode);
  }
}
Nanosplash.APP_NAME = "Nanosplash";
export { Nanosplash };
