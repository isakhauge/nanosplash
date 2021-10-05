class Exception extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
  getName() {
    return this.constructor.name;
  }
}
class IllegalArgumentException extends Exception {
  constructor(message) {
    super(message);
  }
}
class InvalidDestinationException extends Exception {
  constructor(message) {
    super(message);
  }
}
class MissingResourceException extends Exception {
  constructor(message) {
    super(message);
  }
}
const ref = (cssSelector) => document.querySelector(cssSelector);
const refAll = (cssSelector) => Array.from(document.querySelectorAll(cssSelector));
const create = (tag, options) => {
  var _a;
  const element = document.createElement(tag);
  if (options) {
    element.id || (element.id = options.id + "");
    element.className || (element.className = options.className + "");
    (_a = options.attributes) == null ? void 0 : _a.filter((v) => v.value).forEach(({ key, value }) => setAttribute(element, key, value));
    if (options.content) {
      if (typeof options.content === "string") {
        element.innerText = options.content;
      } else {
        element.append(options.content);
      }
    }
  }
  return element;
};
const display = (node, show) => {
  node.hidden = !show;
  if (show) {
    removeAttribute(node, "hidden");
  } else {
    setAttribute(node, "hidden", "true");
  }
};
const move = (node) => ({
  to: (targetNode, asFirstChild) => {
    const children = Array.from(targetNode.childNodes);
    const noChildren = children.length < 1;
    if (noChildren || !asFirstChild) {
      targetNode.appendChild(node);
      return;
    }
    const firstChild = children[0];
    targetNode.insertBefore(node, firstChild);
  }
});
const fitToParent = (node) => {
  const parent = node.parentNode;
  if (parent) {
    ((domRect) => {
      const unit = "px";
      const parentIsBody = parent === document.body;
      let left, top, width, height;
      if (parentIsBody) {
        left = scrollX + unit;
      } else {
        left = 0 + unit;
      }
      if (parentIsBody) {
        top = scrollY + unit;
      } else {
        top = 0 + unit;
      }
      if (parentIsBody) {
        width = "100%";
      } else {
        width = domRect.width + unit;
      }
      if (parentIsBody) {
        height = "100vh";
      } else {
        height = domRect.height + unit;
      }
      setStyle(node, "left", left);
      setStyle(node, "top", top);
      setStyle(node, "width", width);
      setStyle(node, "height", height);
    })(parent.getBoundingClientRect());
  }
};
const invokeOn = (dispatcher, handler, events) => (([addEventListenerLegacy, addEventListener]) => {
  events.forEach((event) => {
    if (addEventListenerLegacy) {
      addEventListenerLegacy(`on${event}`, handler);
    } else {
      addEventListener(event, handler, true);
    }
  });
})([dispatcher.attachEvent, dispatcher.addEventListener]);
const isElementOrNode = (value) => {
  return value instanceof Element || value instanceof Node;
};
const isFunction = (value) => {
  return value && {}.toString.call(value) === "[object Function]";
};
const setStyle = (node, prop, value) => {
  node.style[prop] = value;
};
const setAttribute = (node, key, value) => {
  node.setAttribute(key, value);
};
const removeAttribute = (node, key) => {
  node.removeAttribute(key);
};
class NanosplashRepository {
  static makeMainElement() {
    const mainElement = create("div", {
      className: "nanosplash-container",
      attributes: [
        {
          key: "data-splash-animation",
          value: this.DEFAULT.SPLASH_ANIMATION
        }
      ]
    });
    mainElement.style.backgroundColor = this.DEFAULT.BACKGROUND_COLOR;
    return mainElement;
  }
  static makeSplashElement() {
    const splashElement = create("img", {
      className: "nanosplash-img",
      attributes: [
        { key: "src", value: null },
        { key: "alt", value: "Nanosplash indicator" }
      ]
    });
    return splashElement;
  }
  static makeTextElement() {
    return create("div", {
      className: "nanosplash-text",
      content: this.DEFAULT.TEXT
    });
  }
}
NanosplashRepository.DEFAULT = {
  DESTINATION_NODE: document.body,
  TEXT: "Loading ...",
  TEXT_FONT: '"Arial", sans-serif',
  TEXT_WEIGHT: "medium",
  TEXT_COLOR: "#555",
  TEXT_SIZE: "26px",
  SPLASH_WIDTH: "100px",
  SPLASH_HEIGHT: "auto",
  SPLASH_ANIMATION: "pulse",
  BACKGROUND_COLOR: "rgba(255, 255, 255, 0.90)",
  BACKGROUND_BLUR: "light"
};
var style = "";
class Nanosplash {
  constructor(config) {
    var _a, _b, _c, _d, _e;
    this.cache = {
      parentPosition: ""
    };
    this.defaultText = (_b = (_a = config == null ? void 0 : config.default) == null ? void 0 : _a.text) != null ? _b : NanosplashRepository.DEFAULT.TEXT;
    this.defaultDestination = Nanosplash.getDestinationElement((_d = (_c = config == null ? void 0 : config.default) == null ? void 0 : _c.destination) != null ? _d : NanosplashRepository.DEFAULT.DESTINATION_NODE);
    this.mainElement = NanosplashRepository.makeMainElement();
    this.splashElement = NanosplashRepository.makeSplashElement();
    this.textElement = NanosplashRepository.makeTextElement();
    this.setDefaultStyles();
    const splashSrc = (_e = config == null ? void 0 : config.splash) == null ? void 0 : _e.src;
    if (splashSrc) {
      this.setSplashSource(splashSrc);
      move(this.splashElement).to(this.mainElement);
    }
    move(this.textElement).to(this.mainElement);
    move(this.mainElement).to(this.defaultDestination, true);
    display(this.mainElement, false);
    fitToParent(this.mainElement);
    if (config) {
      this.configure(config);
    }
  }
  install() {
    Object.defineProperty(window, "loading", {
      value: this,
      writable: false
    });
    invokeOn(window, () => fitToParent(this.mainElement), ["resize", "scroll"]);
    Nanosplash.checkStyleResources();
  }
  configure(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    if ((_a = config == null ? void 0 : config.default) == null ? void 0 : _a.destination) {
      this.defaultDestination = Nanosplash.getDestinationElement(config.default.destination);
    }
    this.defaultText || (this.defaultText = (_b = config.default) == null ? void 0 : _b.text);
    if ((_c = config.text) == null ? void 0 : _c.family) {
      this.setTextFontFamily(config.text.family);
    }
    if ((_d = config.text) == null ? void 0 : _d.weight) {
      this.setTextWeight(config.text.weight);
    }
    if ((_e = config.text) == null ? void 0 : _e.color) {
      this.setTextColor(config.text.color);
    }
    if ((_f = config.text) == null ? void 0 : _f.size) {
      this.setTextSize(config.text.size);
    }
    if ((_g = config.background) == null ? void 0 : _g.color) {
      this.setBackgroundColor(config.background.color);
    }
    if ((_h = config.background) == null ? void 0 : _h.blur) {
      this.setBackgroundBlur(config.background.blur);
    }
    if (config.splash) {
      if ((_i = config.splash) == null ? void 0 : _i.src) {
        const hasSplashElement = this.mainElement.contains(this.splashElement);
        if (!hasSplashElement) {
          move(this.splashElement).to(this.mainElement, true);
        }
        this.setSplashSource(config.splash.src);
      }
      if ((_j = config.splash) == null ? void 0 : _j.width) {
        this.setSplashWidth(config.splash.width);
      }
      if ((_k = config.splash) == null ? void 0 : _k.height) {
        this.setSplashHeight(config.splash.height);
      }
      if ((_l = config.splash) == null ? void 0 : _l.animation) {
        this.setSplashAnimation(config.splash.animation);
      }
    } else {
      display(this.splashElement, false);
    }
    return this;
  }
  show(text) {
    this.setText(text != null ? text : NanosplashRepository.DEFAULT.TEXT);
    display(this.mainElement, true);
    const during = (task) => {
      return task.finally(() => this.hide());
    };
    return {
      inside: (destination) => {
        this.restoreParentPosition();
        const element = Nanosplash.getDestinationElement(destination);
        move(this.mainElement).to(element, true);
        fitToParent(this.mainElement);
        this.setParentPositionToRelative();
        return { during };
      },
      during
    };
  }
  hide() {
    this.restoreParentPosition();
    display(this.mainElement, false);
    this.setText(this.defaultText);
    move(this.mainElement).to(this.defaultDestination, true);
    fitToParent(this.mainElement);
  }
  setDefaultStyles() {
    this.setTextFontFamily(NanosplashRepository.DEFAULT.TEXT_FONT);
    this.setTextWeight(NanosplashRepository.DEFAULT.TEXT_WEIGHT);
    this.setTextColor(NanosplashRepository.DEFAULT.TEXT_COLOR);
    this.setTextSize(NanosplashRepository.DEFAULT.TEXT_SIZE);
    this.setSplashWidth(NanosplashRepository.DEFAULT.SPLASH_WIDTH);
    this.setSplashHeight(NanosplashRepository.DEFAULT.SPLASH_HEIGHT);
    this.setSplashAnimation(NanosplashRepository.DEFAULT.SPLASH_ANIMATION);
    this.setBackgroundColor(NanosplashRepository.DEFAULT.BACKGROUND_COLOR);
    this.setBackgroundBlur(NanosplashRepository.DEFAULT.BACKGROUND_BLUR);
  }
  doIfParentExist(callback) {
    ((parent) => {
      if (parent) {
        callback(parent);
      }
    })(this.mainElement.parentElement);
  }
  setParentPosition(position) {
    this.doIfParentExist((parent) => {
      setStyle(parent, "position", position);
    });
  }
  cacheParentPosition() {
    this.doIfParentExist((parent) => {
      this.cache.parentPosition = parent.style.position;
    });
  }
  restoreParentPosition() {
    this.setParentPosition(this.cache.parentPosition);
  }
  setParentPositionToRelative() {
    this.cacheParentPosition();
    this.setParentPosition("relative");
  }
  setText(text) {
    this.textElement.innerText = text;
  }
  setTextFontFamily(fontFamily) {
    setStyle(this.textElement, "fontFamily", fontFamily);
  }
  setTextWeight(fontWeight) {
    setStyle(this.textElement, "fontWeight", fontWeight);
  }
  setTextColor(color) {
    setStyle(this.textElement, "color", color);
  }
  setTextSize(fontSize) {
    setStyle(this.textElement, "fontSize", fontSize);
  }
  setSplashSource(src) {
    this.splashElement.src = src;
    display(this.splashElement, true);
  }
  setSplashWidth(width) {
    setStyle(this.splashElement, "width", width);
  }
  setSplashHeight(height) {
    setStyle(this.splashElement, "height", height);
  }
  setSplashAnimation(animation) {
    setAttribute(this.mainElement, "data-splash-animation", animation);
  }
  setBackgroundColor(color) {
    setStyle(this.mainElement, "backgroundColor", color);
  }
  setBackgroundBlur(blurMode) {
    setAttribute(this.mainElement, "data-blur", blurMode);
  }
  static checkStyleResources() {
    const hrefElements = refAll('link[href*="nanosplash"]');
    const nanosplashFilter = (v) => /\.nanosplash/.test(v.innerText);
    const styleElements = refAll("style").filter(nanosplashFilter);
    const hasRequiredCss = hrefElements.length > 0 || styleElements.length > 0;
    if (!hasRequiredCss) {
      throw new MissingResourceException("Missing the Nanosplash CSS");
    }
  }
  static getDestinationElement(destination) {
    const isString = typeof destination === "string";
    const isCallback = isFunction(destination);
    const isElement = isElementOrNode(destination);
    let destinationNode;
    if (isString) {
      destinationNode = ref(destination);
    } else if (isCallback) {
      destinationNode = destination();
    } else if (isElement) {
      destinationNode = destination;
    } else {
      throw new IllegalArgumentException();
    }
    if (!destinationNode) {
      throw new InvalidDestinationException();
    }
    return destinationNode;
  }
}
export { Nanosplash };
