var m = Object.defineProperty;
var v = (n, e, t) => e in n ? m(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var o = (n, e, t) => (v(n, typeof e != "symbol" ? e + "" : e, t), t);
const w = "3.0.1", c = class c {
  /**
   * # Constructor
   * Creates a new Nanosplash instance.
   */
  constructor() {
    /**
     * # ID
     * Each Nanosplash instance is given a unique GUID.
     */
    o(this, "id");
    /**
     * # Element
     * The root element of the Nanosplash component.
     */
    o(this, "element");
    this.element = y(), this.element.id = this.id = c.generateGUID();
  }
  /**
   * # Generate GUID
   * @returns {GUIDString} A GUID string.
   * @private
   */
  static generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
      const t = Math.random() * 16 | 0;
      return (e === "x" ? t : t & 3 | 8).toString(16);
    });
  }
  /**
   * @inheritdoc
   */
  getTextElement() {
    var e, t;
    return ((t = (e = this.getElement()) == null ? void 0 : e.firstElementChild) == null ? void 0 : t.firstElementChild) ?? null;
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
  getElement() {
    return this.element;
  }
  /**
   * @inheritdoc
   */
  setText(e) {
    return this.getTextElement().innerText = e, e.length > 0 ? this.showText() : this.hideText(), this;
  }
  /**
   * @inheritdoc
   */
  showText() {
    return E(this.getTextElement()), this;
  }
  /**
   * @inheritdoc
   */
  hideText() {
    return I(this.getTextElement()), this;
  }
  /**
   * @inheritdoc
   */
  delete() {
    return this.id = null, this.element !== null && (this.element.innerHTML = "", this.element.remove(), this.element = null), this.element === null;
  }
};
/**
 * # CSS Class Name
 * The main CSS class name of the root element of a Nanosplash component.
 */
o(c, "NSClass", "ns"), /**
 * # Host CSS Class Name
 * The CSS class name of the host element of a Nanosplash component.
 * The host element is the element that the Nanosplash is attached to.
 */
o(c, "NSHostClass", "nsh");
let a = c;
function x(n) {
  return ((e) => (
    // @ts-ignore
    (() => e.firstChild)(e.innerHTML = n)
  ))(
    document.createElement("div")
  );
}
function y() {
  return x(
    '<div class=ns><div class=nsc><div class=nst></div><div class=nss><svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none></circle></svg></div></div></div>'
  );
}
function p(n, e) {
  e.children.length > 0 ? e.insertBefore(n, e.children.item(0)) : e.append(n);
}
function b(n) {
  n == null || n.classList.add(a.NSHostClass);
}
function g(n) {
  n == null || n.classList.remove(a.NSHostClass);
}
function E(n) {
  n.style.display = "flex";
}
function I(n) {
  n.style.display = "none";
}
function h(n) {
  switch (typeof n) {
    case "object":
      const e = n === document.body, t = n instanceof Element;
      if (e || t)
        return n;
      throw new Error(
        "Reference is an object but not an Element instance."
      );
    case "string":
      return document.querySelector(n);
    default:
      throw new Error("Reference is not an object or a string.");
  }
}
function k(n, e) {
  g(n.parentElement), b(e), p(n, e);
}
function f(n) {
  const e = Array.from(n.children || []), t = u.getInstance();
  let s = null;
  const r = e.length;
  for (let l = 0; l < r; l++) {
    const d = e[l];
    if (d.classList.contains(a.NSClass)) {
      s = t.nsQueue.get(d.id) ?? null;
      break;
    }
  }
  return s;
}
const S = `.ns,.nsh:before{width:100%;height:100%}.ns,.nsh:before{top:0;left:0}.nsc,.ns{display:flex;justify-content:center;align-items:center}.nsh{--color: DarkSlateGray;--size: 20px;--relSize: calc(var(--size) * .9);--font: "Helvetica", "Arial", sans-serif;--weight: 400;--bg: rgba(255, 255, 255, .8);--zIdx: 999999999;--blur: blur(10px)}.nsh{position:relative;z-index:var(--zIdx)}.nsh:before{position:absolute;background-color:var(--bg);content:"";backdrop-filter:var(--blur);-webkit-backdrop-filter:var(--blur);z-index:calc(var(--zIdx) + 1);border-radius:inherit}body.nsh{height:100vh}.ns{position:absolute;z-index:calc(var(--zIdx) + 2)}.nsc{filter:drop-shadow(0 0 .1rem rgba(211,211,211,.5))}.nst{color:var(--color);font-size:var(--size);font-family:var(--font);font-weight:var(--weight);margin-right:var(--relSize);text-shadow:0 0 .06rem rgba(47,79,79,.25)}.nss{display:block;width:var(--relSize);height:var(--relSize)}.nss>svg{animation:Rotate 2s linear infinite;position:relative;width:inherit;height:inherit;stroke-width:8}.nss .path{stroke:var(--color);stroke-linecap:round;animation:Dash 1.5s ease-in-out infinite}@keyframes Rotate{to{transform:rotate(360deg)}}@keyframes Dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}
`;
class z {
  constructor() {
    o(this, "_queue");
    this._queue = [];
  }
  /**
   * # Enqueue
   * Add a new item to the queue.
   * @param item The item to add to the queue.
   */
  enqueue(e) {
    this._queue.push(e);
  }
  /**
   * # Dequeue
   * Remove the first item from the queue.
   * @returns The first item from the queue.
   */
  dequeue() {
    return this._queue.shift();
  }
  /**
   * # Peek
   * Return the first item from the queue without removing it.
   * @returns The first item from the queue.
   */
  peek() {
    return this._queue[0];
  }
  /**
   * # Size
   * Return the size of the queue.
   * @returns The size of the queue.
   */
  get size() {
    return this._queue.length;
  }
  /**
   * # Is Empty
   * Return true if the queue is empty.
   * @returns True if the queue is empty.
   */
  isEmpty() {
    return this.size === 0;
  }
  /**
   * # Get
   * @param id The GUID of the Nanosplash to get.
   * @returns The Nanosplash with the given GUID.
   */
  get(e) {
    return this._queue.find((t) => t.getId() === e);
  }
  /**
   * # Has
   * @param id The GUID of the Nanosplash to check for.
   * @returns True if the Nanosplash exists.
   */
  has(e) {
    return this.get(e) !== void 0;
  }
  /**
   * # Delete
   * @param id The GUID of the Nanosplash to delete.
   * @returns The deleted Nanosplash.
   */
  delete(e) {
    const t = this._queue.findIndex((s) => s.getId() === e);
    if (t !== -1)
      return this._queue.splice(t, 1)[0];
  }
}
const i = class i {
  /**
   * # Constructor
   * Private constructor to prevent multiple instances.
   * @private
   */
  constructor() {
    /**
     * # Version
     */
    o(this, "version");
    /**
     * @inheritdoc
     */
    o(this, "nsQueue");
    this.version = w, this.nsQueue = new z(), i.addStyle();
  }
  /**e
   * # Add Style
   * Add Nanosplash CSS to the DOM.
   */
  static addStyle() {
    const e = x(`<style>${S}</style>`);
    document.body.append(e);
  }
  /**
   * # Get Instance
   * Singleton instance accessor
   * @returns {Service} NanosplashService instance
   */
  static getInstance() {
    return i.instance || (i.instance = new i()), i.instance;
  }
  /**
   * # Assign To Window
   * Assign a NanosplashService instance to the Window object.
   * The NanosplashService instance can be accessed in the window object
   * using the key window accessor key.
   * @see WindowAccessorKey
   * @private
   */
  static assignToWindow() {
    Object.defineProperty(window, i.WindowAccessorKey, {
      value: i.getInstance(),
      writable: !1
    });
  }
  /**
   * # Start
   * Initialize and attach a Nanosplash Service instance to the Window object.
   */
  static start() {
    i.assignToWindow(), window.addEventListener("load", () => {
      window[i.WindowAccessorKey] instanceof i || i.assignToWindow();
    });
  }
  /**
   * # Create Nanosplash
   * Return new Nanosplash instance and push it to the stack.
   * @param text Text to display.
   * @returns {Splash} Nanosplash instance.
   * @private
   */
  createNS(e) {
    const t = new a();
    return t.setText(e || ""), this.nsQueue.enqueue(t), t;
  }
  /**
   * # Clean And Remove From DOM
   * Remove Nanosplash from DOM and clean its parent.
   * @param ns Nanosplash instance.
   * @returns True if Nanosplash was removed from DOM.
   * @private
   */
  cleanAndRemoveFromDOM(e) {
    var t;
    if (e) {
      const s = ((t = e.getElement()) == null ? void 0 : t.parentElement) ?? null;
      return s && g(s), e.delete();
    }
    return !1;
  }
  /**
   * # Delete NS
   * Remove Nanosplash instance from both the stack and the
   * @param guid Nanosplash ID.
   * @returns True if Nanosplash was removed from DOM.
   * @private
   */
  deleteNS(e) {
    const t = this.nsQueue.delete(e);
    return t ? this.cleanAndRemoveFromDOM(t) : !1;
  }
  /**
   * @inheritdoc
   */
  show(e) {
    return this.showInside(document.body, e);
  }
  /**
   * @inheritdoc
   */
  showInside(e, t) {
    const s = h(e);
    if (s) {
      let r = f(s);
      r || (r = this.createNS());
      const l = r.getElement();
      return l && k(l, s), r.setText(String(t)).getId();
    }
    return null;
  }
  /**
   * @inheritdoc
   */
  hide() {
    const e = this.nsQueue.dequeue();
    return e ? (this.cleanAndRemoveFromDOM(e), e.getId()) : null;
  }
  /**
   * @inheritdoc
   */
  hideAll() {
    let e = this.nsQueue.dequeue();
    for (; e; )
      this.cleanAndRemoveFromDOM(e), e = this.nsQueue.dequeue();
  }
  /**
   * @inheritdoc
   */
  hideId(e) {
    return this.nsQueue.has(e) && this.deleteNS(e) ? e : null;
  }
  /**
   * @inheritdoc
   */
  hideInside(e) {
    const t = h(e);
    if (!t)
      return null;
    const s = f(t);
    if (!s)
      return null;
    const r = s.getId();
    return r && this.deleteNS(r) ? r : null;
  }
};
/**
 * # Window Accessor Key
 * Key to access NanosplashService instance in the Window object.
 */
o(i, "WindowAccessorKey", "ns"), /**
 * # Instance
 * Singleton instance of NanosplashService.
 * @private
 */
o(i, "instance");
let u = i;
const q = { Service: u };
export {
  u as Service,
  q as default
};
