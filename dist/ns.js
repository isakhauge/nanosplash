var x = Object.defineProperty;
var f = (e, t, n) => t in e ? x(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var r = (e, t, n) => (f(e, typeof t != "symbol" ? t + "" : t, n), n);
function g() {
  return new DOMParser().parseFromString(
    '<div class=ns><div class=ns-content><div class=ns-text></div><div class=ns-spinner><svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none></circle></svg></div></div></div>',
    "text/html"
  ).body.firstChild;
}
function S(e, t) {
  t.children.length > 0 ? t.insertBefore(e, t.children.item(0)) : t.append(e);
}
function d(e, t) {
  e == null || e.classList[t](o.HostCSSClassName);
}
function N(e) {
  d(e.getNSElement().parentElement, "remove");
}
function w(e) {
  e.style.display = "flex";
}
function p(e) {
  e.style.display = "none";
}
function a(e) {
  let t;
  if (typeof e == "string")
    t = document.querySelector(e);
  else {
    if (e instanceof Element)
      return e;
    if (typeof e == "function") {
      if (t = e(), !(t instanceof Node))
        return null;
    } else
      t = null;
  }
  return t;
}
function v(e) {
  var t;
  return (t = e == null ? void 0 : e.classList) == null ? void 0 : t.contains("ns");
}
function h(e, t) {
  d(e.parentElement, "remove"), d(t, "add"), S(e, t);
}
function u(e) {
  const t = e.firstElementChild;
  if (t !== null && v(t)) {
    const i = t.id;
    return l.getInstance().nsStack.items.find((m) => m.getId() === i) ?? null;
  }
  return null;
}
function y() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
    const t = Math.random() * 16 | 0;
    return (e === "x" ? t : t & 3 | 8).toString(16);
  });
}
class o {
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
    this.element = g(), this.element.id = this.id = y();
  }
  /**
   * # Get NS Content Element
   * Returns the content element of the Nanosplash.
   */
  getNSContentElement() {
    return this.getNSElement().firstElementChild;
  }
  /**
   * # Get NS Text Element
   * Returns the text element of the Nanosplash.
   */
  getNSTextElement() {
    return this.getNSContentElement().firstElementChild;
  }
  /**
   * @inheritDoc
   */
  getId() {
    return this.id;
  }
  /**
   * @inheritDoc
   */
  getNSElement() {
    return this.element;
  }
  /**
   * @inheritDoc
   */
  hideText() {
    return p(this.getNSTextElement()), this;
  }
  /**
   * @inheritDoc
   */
  setText(t) {
    return this.getNSTextElement().innerText = t, t.length > 0 ? this.showText() : this.hideText(), this;
  }
  /**
   * @inheritDoc
   */
  showText() {
    return w(this.getNSTextElement()), this;
  }
  /**
   * @inheritDoc
   */
  remove() {
    var t;
    this.element && ((t = this.element.parentElement) == null || t.removeChild(this.element), delete this.element);
  }
}
/**
 * # CSS Class Name
 * The main CSS class name of the root element of a Nanosplash component.
 */
r(o, "CSSClassName", "ns"), /**
 * # Host CSS Class Name
 * The CSS class name of the host element of a Nanosplash component.
 * The host element is the element that the Nanosplash is attached to.
 */
r(o, "HostCSSClassName", "ns-host");
class E {
  /**
   * Constructs a new stack.
   */
  constructor() {
    r(this, "_items");
    this._items = [];
  }
  /**
   * Returns the items in the stack.
   */
  get items() {
    return this._items;
  }
  /**
   * Adds an item to the top of the stack.
   * @param item The item to add to the stack.
   */
  push(t) {
    this.items.push(t);
  }
  /**
   * Removes and returns the item at the top of the stack.
   * @returns The item at the top of the stack, or undefined if the stack is empty.
   */
  pop() {
    return this.items.pop();
  }
  /**
   * Returns the item at the top of the stack without removing it.
   * @returns The item at the top of the stack, or undefined if the stack is empty.
   */
  peek() {
    return this.items[this.size() - 1];
  }
  /**
   * Returns true if the stack is empty, false otherwise.
   * @returns True if the stack is empty, false otherwise.
   */
  isEmpty() {
    return this.size() === 0;
  }
  /**
   * Returns the number of items in the stack.
   * @returns The number of items in the stack.
   */
  size() {
    return this.items.length;
  }
  /**
   * Removes all items from the stack.
   */
  clear() {
    this._items = [];
  }
}
const s = class {
  /**
   * # Constructor
   * Private constructor to prevent multiple instances.
   * @private
   */
  constructor() {
    /**
     * # Nanosplash Stack
     * For each Nanosplash instance created, it's pushed to the stack.
     * When a Nanosplash instance is removed, it's removed from the stack.
     * @see Stack
     * @see Nanosplash
     */
    r(this, "nsStack");
    this.nsStack = new E();
  }
  /**
   * # Find Index
   * Find Nanosplash stack index by callback.
   * @param callback Callback function that returns a boolean.
   * @returns {number} Index of Nanosplash instance in the stack or -1.
   */
  findIndex(t) {
    return this.nsStack.items.findIndex(t);
  }
  /**
   * # Find
   * Find Nanosplash in the stack by callback.
   * @param callback Callback function that returns a boolean.
   * @returns {Nanosplash | undefined} Nanosplash instance or undefined
   */
  find(t) {
    return this.nsStack.items.find(t);
  }
  /**
   * # Get Instance
   * Singleton instance accessor
   * @returns {NanosplashService} NanosplashService instance
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
   * Initialize and attach a NanosplashService instance in the Window object.
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
   * @returns {Nanosplash} Nanosplash instance.
   */
  createNS(t) {
    const n = new o();
    return n.setText(t || ""), this.nsStack.push(n), n;
  }
  /**
   * # Clean And Remove
   * Remove Nanosplash from DOM and clean its parent.
   * @param ns Nanosplash instance.
   * @returns {GUIDString} Nanosplash ID.
   */
  cleanAndRemove(t) {
    return N(t), t.remove(), t.getId();
  }
  /**
   * # Stack Delete
   * Remove Nanosplash instance from the stack.
   * @param ns Nanosplash instance.
   * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
   */
  stackDelete(t) {
    let n = this.findIndex((c) => c.getId() === t.getId());
    return n < 0 ? null : (this.nsStack.items.splice(n, 1), t.getId());
  }
  /**
   * # Delete NS
   * Remove Nanosplash instance from both the stack and the DOM.
   * @param callback Callback function.
   * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
   */
  deleteNS(t) {
    const n = this.find(t);
    return n ? (this.cleanAndRemove(n), this.stackDelete(n)) : null;
  }
  /**
   * @inheritDoc
   */
  show(t) {
    let n = u(document.body);
    return n || (n = this.createNS(), h(n.getNSElement(), document.body)), n.setText(t || ""), n.getId();
  }
  /**
   * @inheritDoc
   */
  showInside(t, n) {
    const c = a(t);
    if (c) {
      let i = u(c);
      return i || (i = this.createNS()), i.setText(n || ""), h(i.getNSElement(), c), i.getId();
    }
    return null;
  }
  /**
   * @inheritDoc
   */
  hideAll() {
    this.nsStack.items.forEach((t) => {
      this.cleanAndRemove(t);
    }), this.nsStack.clear();
  }
  /**
   * @inheritDoc
   */
  hide() {
    const t = this.nsStack.pop();
    return t ? this.cleanAndRemove(t) : null;
  }
  /**
   * @inheritDoc
   */
  hideId(t) {
    return this.deleteNS((n) => n.getId() === t);
  }
  /**
   * @inheritDoc
   */
  hideInside(t) {
    const n = a(t), c = (i) => i.getNSElement().parentElement === n;
    return n ? this.deleteNS(c) : null;
  }
};
let l = s;
/**
 * # Window Accessor Key
 * Key to access NanosplashService instance in the Window object.
 */
r(l, "WindowAccessorKey", "ns"), /**
 * # Instance
 * Singleton instance of NanosplashService.
 */
r(l, "instance");
try {
  l.start();
} catch (e) {
  console.warn(e);
}
