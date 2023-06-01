var g = Object.defineProperty;
var S = (e, t, n) => t in e ? g(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var i = (e, t, n) => (S(e, typeof t != "symbol" ? t + "" : t, n), n);
function N() {
  return new DOMParser().parseFromString(
    '<div class=ns><div class=ns-content><div class=ns-text></div><div class=ns-spinner><svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none></circle></svg></div></div></div>',
    "text/html"
  ).body.firstChild;
}
function w(e, t) {
  t.children.length > 0 ? t.insertBefore(e, t.children.item(0)) : t.append(e);
}
function o(e, t) {
  e == null || e.classList[t](l.nsHostClassName);
}
function E(e) {
  o(e.getNSElement().parentElement, "remove");
}
function v(e) {
  e.style.display = "flex";
}
function y(e) {
  e.style.display = "none";
}
function a(e) {
  let t;
  if (typeof e == "string")
    t = document.querySelector(e);
  else {
    if (e instanceof Node)
      return e;
    if (typeof e == "function") {
      if (t = e(), !(t instanceof Node))
        return null;
    } else
      t = null;
  }
  return t;
}
function p(e) {
  var t;
  return (t = e == null ? void 0 : e.classList) == null ? void 0 : t.contains("ns");
}
function u(e, t) {
  o(e.parentElement, "remove"), o(t, "add"), w(e, t);
}
function m(e) {
  const t = a(e);
  if (!t)
    return null;
  const n = t.firstChild;
  if (n !== null && p(n)) {
    const x = n.id;
    return d.getInstance().nsStack.items.find((f) => f.getId() === x) ?? null;
  }
  return null;
}
function I() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
    const t = Math.random() * 16 | 0;
    return (e === "x" ? t : t & 3 | 8).toString(16);
  });
}
const h = class {
  constructor() {
    i(this, "id");
    i(this, "element");
    this.element = N(), this.element.id = this.id = I();
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
  hideText() {
    return y(this.getNSTextElement()), this;
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
    return v(this.getNSTextElement()), this;
  }
  /**
   * @inheritDoc
   */
  remove() {
    var t;
    this.element && ((t = this.element.parentElement) == null || t.removeChild(this.element), delete this.element);
  }
};
let l = h;
i(l, "nsClassName", "ns"), i(l, "nsHostClassName", h.nsClassName + "-host");
class C {
  /**
   * Constructs a new stack.
   */
  constructor() {
    i(this, "_items");
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
    this._items.push(t);
  }
  /**
   * Removes and returns the item at the top of the stack.
   * @returns The item at the top of the stack, or undefined if the stack is empty.
   */
  pop() {
    return this._items.pop();
  }
  /**
   * Returns the item at the top of the stack without removing it.
   * @returns The item at the top of the stack, or undefined if the stack is empty.
   */
  peek() {
    return this._items[this._items.length - 1];
  }
  /**
   * Returns true if the stack is empty, false otherwise.
   * @returns True if the stack is empty, false otherwise.
   */
  isEmpty() {
    return this._items.length === 0;
  }
  /**
   * Returns the number of items in the stack.
   * @returns The number of items in the stack.
   */
  size() {
    return this._items.length;
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
    i(this, "nsStack");
    this.nsStack = new C();
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
   * Assign Nanosplash service instance to Window object.
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
   * Initialize Nanosplash Service instance in Window when it's loaded.
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
    const n = new l();
    return n.setText(t || ""), this.nsStack.push(n), n;
  }
  /**
   * # Clean And Remove
   * Remove Nanosplash from DOM and clean its parent.
   * @param ns Nanosplash instance.
   * @returns {GUIDString} Nanosplash ID.
   */
  cleanAndRemove(t) {
    return E(t), t.remove(), t.getId();
  }
  /**
   * # Stack Delete At
   * Remove Nanosplash instance from the stack.
   * @param ns Nanosplash instance.
   * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
   */
  stackDelete(t) {
    let n = this.findIndex((r) => r.getId() === t.getId());
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
    let n = m(document.body);
    return n || (n = this.createNS(), u(n.getNSElement(), document.body)), n.setText(t || ""), n.getId();
  }
  /**
   * @inheritDoc
   */
  showInside(t, n) {
    const r = a(t);
    if (r) {
      let c = m(r);
      return c || (c = this.createNS()), c.setText(n || ""), u(c.getNSElement(), r), c.getId();
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
    const n = a(t), r = (c) => c.getNSElement().parentElement === n;
    return n ? this.deleteNS(r) : null;
  }
};
let d = s;
i(d, "WindowAccessorKey", "ns"), i(d, "instance");
try {
  d.start();
} catch (e) {
  console.warn(e);
}
