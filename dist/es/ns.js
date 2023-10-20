var m = Object.defineProperty;
var v = (s, e, t) => e in s ? m(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var r = (s, e, t) => (v(s, typeof e != "symbol" ? e + "" : e, t), t);
const y = "3.0.4", a = class a {
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
    this.element = w(), this.element.id = this.id = a.generateGUID();
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
  getTextElement() {
    var e, t;
    return ((t = (e = this.getElement()) == null ? void 0 : e.firstElementChild) == null ? void 0 : t.firstElementChild) ?? null;
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
    return I(this.getTextElement()), this;
  }
  /**
   * @inheritdoc
   */
  hideText() {
    return S(this.getTextElement()), this;
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
r(a, "NSClass", "ns"), /**
 * # Host CSS Class Name
 * The CSS class name of the host element of a Nanosplash component.
 * The host element is the element that the Nanosplash is attached to.
 */
r(a, "NSHostClass", "nsh");
let o = a;
function x(s) {
  return ((e) => (
    // @ts-ignore
    (() => e.firstChild)(e.innerHTML = s)
  ))(
    document.createElement("div")
  );
}
function w() {
  return x(
    '<div class=ns><div class=nsc><div class=nst></div><div class=nss><svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none></circle></svg></div></div></div>'
  );
}
function b(s, e) {
  e.children.length > 0 ? e.insertBefore(s, e.children.item(0)) : e.append(s);
}
function p(s) {
  s == null || s.classList.add(o.NSHostClass);
}
function g(s) {
  s == null || s.classList.remove(o.NSHostClass);
}
function I(s) {
  s.style.display = "flex";
}
function S(s) {
  s.style.display = "none";
}
function h(s) {
  switch (typeof s) {
    case "object":
      const e = s === document.body, t = s instanceof Element;
      if (e || t)
        return s;
      throw new Error(
        "Reference is an object but not an Element instance."
      );
    case "string":
      return document.querySelector(s);
    default:
      throw new Error("Reference is not an object or a string.");
  }
}
function k(s, e) {
  g(s.parentElement), p(e), b(s, e);
}
function f(s) {
  const e = Array.from(s.children || []), t = d.getInstance();
  let n = null;
  const c = e.length;
  for (let l = 0; l < c; l++) {
    const u = e[l];
    if (u.classList.contains(o.NSClass)) {
      n = t.nsQueue.get(u.id) ?? null;
      break;
    }
  }
  return n;
}
const E = `.ns,.nsh:before{width:100%;height:100%}.ns,.nsh:before{top:0;left:0}.nsc,.ns{display:flex;justify-content:center;align-items:center}.nsh{--color: DarkSlateGray;--size: 20px;--relSize: calc(var(--size) * .9);--font: "Helvetica", "Arial", sans-serif;--weight: 400;--bg: rgba(255, 255, 255, .8);--zIdx: 999999999;--blur: blur(10px)}.nsh{position:relative;z-index:var(--zIdx)}.nsh:before{position:absolute;background-color:var(--bg);content:"";backdrop-filter:var(--blur);-webkit-backdrop-filter:var(--blur);z-index:calc(var(--zIdx) + 1);border-radius:inherit}body.nsh{height:100vh}.ns{position:absolute;z-index:calc(var(--zIdx) + 2)}.nsc{filter:drop-shadow(0 0 .1rem rgba(211,211,211,.5))}.nst{color:var(--color);font-size:var(--size);font-family:var(--font);font-weight:var(--weight);margin-right:var(--relSize);text-shadow:0 0 .06rem rgba(47,79,79,.25)}.nss{display:block;width:var(--relSize);height:var(--relSize)}.nss>svg{animation:Rotate 2s linear infinite;position:relative;width:inherit;height:inherit;stroke-width:8}.nss .path{stroke:var(--color);stroke-linecap:round;animation:Dash 1.5s ease-in-out infinite}@keyframes Rotate{to{transform:rotate(360deg)}}@keyframes Dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}
`;
class T {
  constructor() {
    r(this, "queue");
    this.queue = [];
  }
  /**
   * # Enqueue
   * Add a new item to the queue.
   * @param item The item to add to the queue.
   */
  enqueue(e) {
    return this.queue.push(e), this;
  }
  /**
   * # Dequeue
   * Remove the first item from the queue.
   * @returns The first item from the queue.
   */
  dequeue() {
    return this.queue.shift();
  }
  /**
   * # Get
   * @param id The GUID of the Nanosplash to get.
   * @returns The Nanosplash with the given GUID.
   */
  get(e) {
    return this.queue.find((t) => t.getId() === e);
  }
  /**
   * # Delete
   * @param id The GUID of the Nanosplash to delete.
   * @returns The deleted Nanosplash.
   */
  delete(e) {
    const t = this.queue.findIndex((n) => n.getId() === e);
    if (t !== -1)
      return this.queue.splice(t, 1)[0];
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
    r(this, "version");
    /**
     * @inheritdoc
     */
    r(this, "nsQueue");
    this.version = y, this.nsQueue = new T(), i.addStyle();
  }
  /**e
   * # Add Style
   * Add Nanosplash CSS to the DOM.
   */
  static addStyle() {
    const e = x(`<style>${E}</style>`);
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
    window[i.WindowAccessorKey] || i.assignToWindow();
  }
  /**
   * # Create Nanosplash
   * Return new Nanosplash instance and push it to the stack.
   * @param text Text to display.
   * @returns {Splash} Nanosplash instance.
   * @private
   */
  createNS(e) {
    const t = new o().setText(e || "");
    return this.nsQueue.enqueue(t), t;
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
    return e ? (g(((t = e.getElement()) == null ? void 0 : t.parentElement) ?? null), e.delete()) : !1;
  }
  /**
   * # Delete NS
   * Remove Nanosplash instance from both the stack and the
   * @param guid Nanosplash ID.
   * @returns True if Nanosplash was removed from DOM.
   * @private
   */
  deleteNS(e) {
    return this.cleanAndRemoveFromDOM(this.nsQueue.delete(e) ?? null);
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
    try {
      const n = h(e), c = f(n) ?? this.createNS();
      k(c.getElement(), n);
      const l = t ? String(t) : "";
      return c.setText(l).getId();
    } catch (n) {
      return console.error(n), null;
    }
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
    return this.deleteNS(e) ? e : null;
  }
  /**
   * @inheritdoc
   */
  hideInside(e) {
    try {
      const t = f(h(e)), n = (t == null ? void 0 : t.getId()) ?? "";
      return this.deleteNS(n ?? "") ? n : null;
    } catch (t) {
      return console.error(t), null;
    }
  }
};
/**
 * # Window Accessor Key
 * Key to access NanosplashService instance in the Window object.
 */
r(i, "WindowAccessorKey", "ns"), /**
 * # Instance
 * Singleton instance of NanosplashService.
 * @private
 */
r(i, "instance");
let d = i;
const q = { Service: d };
export {
  d as Service,
  q as default
};
