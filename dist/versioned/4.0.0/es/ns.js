var m = Object.defineProperty;
var S = (e, t, n) => t in e ? m(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var r = (e, t, n) => (S(e, typeof t != "symbol" ? t + "" : t, n), n);
const N = "4.0.0";
var o = /* @__PURE__ */ ((e) => (e.Add = "add", e.Remove = "remove", e))(o || {});
const d = class d {
  /**
   * # Constructor
   * Creates a new Nanosplash instance.
   */
  constructor() {
    /**
     * # ID
     * Each Nanosplash instance is given a unique GUID.
     */
    r(this, "id");
    /**
     * # Element
     * The root element of the Nanosplash component.
     */
    r(this, "element");
    this.element = v(), this.element.id = this.id = d.generateGUID();
  }
  /**
   * # Generate GUID
   * @returns {GUIDString} A GUID string.
   */
  static generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t) => {
      const n = Math.random() * 16 | 0;
      return (t === "x" ? n : n & 3 | 8).toString(16);
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
    return I(this.getNSTextElement()), this;
  }
  /**
   * @inheritdoc
   */
  hideText() {
    return y(this.getNSTextElement()), this;
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
r(d, "NSClass", "ns"), /**
 * # Host CSS Class Name
 * The CSS class name of the host element of a Nanosplash component.
 * The host element is the element that the Nanosplash is attached to.
 */
r(d, "NSHostClass", "nsh");
let l = d;
function v() {
  return new DOMParser().parseFromString(
    '<div class=ns><div class=nsc><div class=nst></div><div class=nss><svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none></circle></svg></div></div></div>',
    "text/html"
  ).body.firstChild;
}
function w(e, t) {
  t.children.length > 0 ? t.insertBefore(e, t.children.item(0)) : t.append(e);
}
function a(e, t) {
  e == null || e.classList[t](l.NSHostClass);
}
function E(e) {
  a(e.getNSElement().parentElement, o.Remove);
}
function I(e) {
  e.style.display = "flex";
}
function y(e) {
  e.style.display = "none";
}
function u(e) {
  return e instanceof Element ? e : document.querySelector(e || "");
}
function C(e) {
  var t;
  return ((t = e == null ? void 0 : e.classList) == null ? void 0 : t.contains(l.NSClass)) ?? !1;
}
function x(e, t) {
  a(e.parentElement, o.Remove), a(t, o.Add), w(e, t);
}
function f(e) {
  const t = e.firstElementChild;
  if (t !== null && C(t)) {
    const c = t.id;
    return h.getInstance().nsStack.find((g) => g.getId() === c) ?? null;
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
     * # Version
     */
    r(this, "version");
    /**
     * @inheritdoc
     */
    r(this, "nsStack");
    this.version = N, this.nsStack = [];
  }
  /**
   * # Find Index
   * Find Nanosplash stack index by callback.
   * @param callback Callback function that returns a boolean.
   * @returns {number} Index of Nanosplash instance in the stack or -1.
   * @private
   */
  _findIndex(t) {
    return this.nsStack.findIndex(t);
  }
  /**
   * # Find
   * Find Nanosplash in the stack by callback.
   * @param callback Callback function that returns a boolean.
   * @returns {Splash | undefined} Nanosplash instance or undefined
   * @private
   */
  _find(t) {
    return this.nsStack.find(t);
  }
  /**
   * # Get Instance
   * Singleton instance accessor
   * @returns {Service} NanosplashService instance
   */
  static getInstance() {
    return s._instance || (s._instance = new s()), s._instance;
  }
  /**
   * # Assign To Window
   * Assign a NanosplashService instance to the Window object.
   * The NanosplashService instance can be accessed in the window object
   * using the key window accessor key.
   * @see WindowAccessorKey
   * @private
   */
  static _assignToWindow() {
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
    s._assignToWindow(), window.addEventListener("load", () => {
      window[s.WindowAccessorKey] instanceof s || s._assignToWindow();
    });
  }
  /**
   * # Create Nanosplash
   * Return new Nanosplash instance and push it to the stack.
   * @param text Text to display.
   * @returns {Splash} Nanosplash instance.
   * @private
   */
  _createNS(t) {
    const n = new l();
    return n.setText(t || ""), this.nsStack.push(n), n;
  }
  /**
   * # Clean And Remove
   * Remove Nanosplash from DOM and clean its parent.
   * @param ns Nanosplash instance.
   * @returns {GUIDString} Nanosplash ID.
   * @private
   */
  _cleanAndRemove(t) {
    return E(t), t.remove().getId();
  }
  /**
   * # Stack Delete
   * Remove Nanosplash instance from the stack.
   * @param ns Nanosplash instance.
   * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
   * @private
   */
  _stackDelete(t) {
    let n = this._findIndex((i) => i.getId() === t.getId());
    return n < 0 ? null : (this.nsStack.splice(n, 1), t.getId());
  }
  /**
   * # Delete NS
   * Remove Nanosplash instance from both the stack and the
   * @param callback Callback function.
   * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
   * @private
   */
  _deleteNS(t) {
    const n = this._find(t);
    return n ? (this._cleanAndRemove(n), this._stackDelete(n)) : null;
  }
  /**
   * @inheritdoc
   */
  show(t) {
    let n = f(document.body);
    return n || (n = this._createNS(), x(n.getNSElement(), document.body)), n.setText(t || "").getId();
  }
  /**
   * @inheritdoc
   */
  showInside(t, n) {
    const i = u(t);
    if (i) {
      let c = f(i);
      return c || (c = this._createNS()), x(c.getNSElement(), i), c.setText(n || "").getId();
    }
    return null;
  }
  /**
   * @inheritdoc
   */
  hide() {
    const t = this.nsStack.pop();
    return t ? this._cleanAndRemove(t) : null;
  }
  /**
   * @inheritdoc
   */
  hideAll() {
    this.nsStack.forEach(this._cleanAndRemove), this.nsStack.splice(0, this.nsStack.length);
  }
  /**
   * @inheritdoc
   */
  hideId(t) {
    return this._deleteNS((n) => n.getId() === t);
  }
  /**
   * @inheritdoc
   */
  hideInside(t) {
    const n = u(t), i = (c) => c.getNSElement().parentElement === n;
    return n ? this._deleteNS(i) : null;
  }
};
/**
 * # Window Accessor Key
 * Key to access NanosplashService instance in the Window object.
 */
r(s, "WindowAccessorKey", "ns"), /**
 * # Instance
 * Singleton instance of NanosplashService.
 * @private
 */
r(s, "_instance");
let h = s;
export {
  h as Service
};
