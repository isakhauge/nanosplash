var g = Object.defineProperty;
var m = (n, t, e) => t in n ? g(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var c = (n, t, e) => (m(n, typeof t != "symbol" ? t + "" : t, e), e);
const l = class l {
  /**
   * # Constructor
   * Creates a new Nanosplash instance.
   */
  constructor() {
    /**
     * # ID
     * Each Nanosplash instance is given a unique GUID.
     */
    c(this, "id");
    /**
     * # Element
     * The root element of the Nanosplash component.
     */
    c(this, "element");
    this.element = S(), this.element.id = this.id = l.generateGUID();
  }
  /**
   * # Generate GUID
   * @returns {GUIDString} A GUID string.
   */
  static generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t) => {
      const e = Math.random() * 16 | 0;
      return (t === "x" ? e : e & 3 | 8).toString(16);
    });
  }
  /**
   * @inheritdoc
   */
  getNSContentElement() {
    return this.getNSElement().firstElementChild;
  }
  /**
   * @inheritdoc
   */
  getNSTextElement() {
    return this.getNSContentElement().firstElementChild;
  }
  /**
   * @inheritdoc
   */
  getId() {
    return this.id;
  }
  /**
   * @inheritdoc
   */
  getNSElement() {
    return this.element;
  }
  /**
   * @inheritdoc
   */
  setText(t) {
    return this.getNSTextElement().innerText = t, t.length > 0 ? this.showText() : this.hideText(), this;
  }
  /**
   * @inheritdoc
   */
  showText() {
    return w(this.getNSTextElement()), this;
  }
  /**
   * @inheritdoc
   */
  hideText() {
    return E(this.getNSTextElement()), this;
  }
  /**
   * @inheritdoc
   */
  remove() {
    var t;
    return this.element && ((t = this.element.parentElement) == null || t.removeChild(this.element), delete this.element), this;
  }
};
/**
 * # CSS Class Name
 * The main CSS class name of the root element of a Nanosplash component.
 */
c(l, "NSClass", "ns"), /**
 * # Host CSS Class Name
 * The CSS class name of the host element of a Nanosplash component.
 * The host element is the element that the Nanosplash is attached to.
 */
c(l, "NSHostClass", "nsh");
let d = l;
function S() {
  return new DOMParser().parseFromString(
    '<div class=ns><div class=nsc><div class=nst></div><div class=nss><svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none></circle></svg></div></div></div>',
    "text/html"
  ).body.firstChild;
}
function N(n, t) {
  t.children.length > 0 ? t.insertBefore(n, t.children.item(0)) : t.append(n);
}
function o(n, t) {
  n == null || n.classList[t](d.NSHostClass);
}
function v(n) {
  o(n.getNSElement().parentElement, "remove");
}
function w(n) {
  n.style.display = "flex";
}
function E(n) {
  n.style.display = "none";
}
function h(n) {
  return n instanceof Element ? n : document.querySelector(n || "");
}
function I(n) {
  var t;
  return ((t = n == null ? void 0 : n.classList) == null ? void 0 : t.contains(d.NSClass)) ?? !1;
}
function u(n, t) {
  o(n.parentElement, "remove"), o(t, "add"), N(n, t);
}
function x(n) {
  const t = n.firstElementChild;
  if (t !== null && I(t)) {
    const r = t.id;
    return a.getInstance().nsStack.find((f) => f.getId() === r) ?? null;
  }
  return null;
}
const s = class s {
  /**
   * # Constructor
   * Private constructor to prevent multiple instances.
   * @private
   */
  constructor() {
    /**
     * @inheritdoc
     */
    c(this, "nsStack");
    this.nsStack = [];
  }
  /**
   * # Find Index
   * Find Nanosplash stack index by callback.
   * @param callback Callback function that returns a boolean.
   * @returns {number} Index of Nanosplash instance in the stack or -1.
   */
  findIndex(t) {
    return this.nsStack.findIndex(t);
  }
  /**
   * # Find
   * Find Nanosplash in the stack by callback.
   * @param callback Callback function that returns a boolean.
   * @returns {Splash | undefined} Nanosplash instance or undefined
   */
  find(t) {
    return this.nsStack.find(t);
  }
  /**
   * # Get Instance
   * Singleton instance accessor
   * @returns {Service} NanosplashService instance
   */
  static getInstance() {
    return s.instance || (s.instance = new s()), s.instance;
  }
  /**
   * # Assign To Window
   * Assign a NanosplashService instance to the Window object.
   * The NanosplashService instance can be accessed in the window object
   * using the key window accessor key.
   * @see WindowAccessorKey
   */
  static assignToWindow() {
    Object.defineProperty(window, s.WindowAccessorKey, {
      value: s.getInstance(),
      writable: !1
    });
  }
  /**
   * # Start
   * Initialize and attach a Nanosplash Service instance to the Window object.
   */
  static start() {
    s.assignToWindow(), window.addEventListener("load", () => {
      window[s.WindowAccessorKey] instanceof s || s.assignToWindow();
    });
  }
  /**
   * # Create Nanosplash
   * Return new Nanosplash instance and push it to the stack.
   * @param text Text to display.
   * @returns {Splash} Nanosplash instance.
   */
  createNS(t) {
    const e = new d();
    return e.setText(t || ""), this.nsStack.push(e), e;
  }
  /**
   * # Clean And Remove
   * Remove Nanosplash from DOM and clean its parent.
   * @param ns Nanosplash instance.
   * @returns {GUIDString} Nanosplash ID.
   */
  cleanAndRemove(t) {
    return v(t), t.remove().getId();
  }
  /**
   * # Stack Delete
   * Remove Nanosplash instance from the stack.
   * @param ns Nanosplash instance.
   * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
   */
  stackDelete(t) {
    let e = this.findIndex((i) => i.getId() === t.getId());
    return e < 0 ? null : (this.nsStack.splice(e, 1), t.getId());
  }
  /**
   * # Delete NS
   * Remove Nanosplash instance from both the stack and the
   * @param callback Callback function.
   * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
   */
  deleteNS(t) {
    const e = this.find(t);
    return e ? (this.cleanAndRemove(e), this.stackDelete(e)) : null;
  }
  /**
   * @inheritdoc
   */
  show(t) {
    let e = x(document.body);
    return e || (e = this.createNS(), u(e.getNSElement(), document.body)), e.setText(t || "").getId();
  }
  /**
   * @inheritdoc
   */
  showInside(t, e) {
    const i = h(t);
    if (i) {
      let r = x(i);
      return r || (r = this.createNS()), u(r.getNSElement(), i), r.setText(e || "").getId();
    }
    return null;
  }
  /**
   * @inheritdoc
   */
  hide() {
    const t = this.nsStack.pop();
    return t ? this.cleanAndRemove(t) : null;
  }
  /**
   * @inheritdoc
   */
  hideAll() {
    this.nsStack.forEach((t) => {
      this.cleanAndRemove(t);
    }), this.nsStack = [];
  }
  /**
   * @inheritdoc
   */
  hideId(t) {
    return this.deleteNS((e) => e.getId() === t);
  }
  /**
   * @inheritdoc
   */
  hideInside(t) {
    const e = h(t), i = (r) => r.getNSElement().parentElement === e;
    return e ? this.deleteNS(i) : null;
  }
};
/**
 * # Window Accessor Key
 * Key to access NanosplashService instance in the Window object.
 */
c(s, "WindowAccessorKey", "ns"), /**
 * # Instance
 * Singleton instance of NanosplashService.
 */
c(s, "instance");
let a = s;
export {
  a as Service
};
