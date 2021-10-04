class Exception extends Error {
  constructor(message) {
    super(message);
  }
  getName() {
    return this.constructor.name;
  }
}
class InvalidDestinationException extends Exception {
  constructor(message) {
    super(message);
  }
}
const ref = (cssSelector) => document.querySelector(cssSelector);
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
      parent.style.position = "relative";
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
      setStyle(parent, "position", "relative");
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
        { key: "src", value: this.DEFAULT.SPLASH_SOURCE },
        { key: "alt", value: "Nanosplash indicator" }
      ]
    });
    display(splashElement, false);
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
  SPLASH_SOURCE: "favicon.svg",
  SPLASH_WIDTH: "100px",
  SPLASH_HEIGHT: "auto",
  SPLASH_ANIMATION: "pulse",
  BACKGROUND_COLOR: "rgba(255, 255, 255, 0.90)",
  BACKGROUND_BLUR: "light"
};
var style = "";
class Nanosplash {
  constructor(config) {
    this.cache = {
      parentPosition: ""
    };
    this.defaultText = NanosplashRepository.DEFAULT.TEXT;
    this.defaultDestination = NanosplashRepository.DEFAULT.DESTINATION_NODE;
    this.mainElement = NanosplashRepository.makeMainElement();
    this.splashElement = NanosplashRepository.makeSplashElement();
    this.textElement = NanosplashRepository.makeTextElement();
    move(this.splashElement).to(this.mainElement);
    move(this.textElement).to(this.mainElement);
    move(this.mainElement).to(this.defaultDestination, true);
    display(this.mainElement, false);
    fitToParent(this.mainElement);
    this.setDefaultStyles();
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
    const parent = this.mainElement.parentNode;
    if (parent && parent !== document.body) {
      fitToParent(this.mainElement);
    }
    const during = async (task) => {
      await task;
      this.hide();
    };
    return {
      inside: (destination) => {
        const element = Nanosplash.getDestinationElement(destination);
        move(this.mainElement).to(element, true);
        this.cache.parentPosition = element.style.position;
        fitToParent(this.mainElement);
        return { during };
      },
      during
    };
  }
  hide() {
    const parent = this.mainElement.parentElement;
    setStyle(parent, "position", this.cache.parentPosition);
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
    this.setSplashSource(NanosplashRepository.DEFAULT.SPLASH_SOURCE);
    this.setSplashWidth(NanosplashRepository.DEFAULT.SPLASH_WIDTH);
    this.setSplashHeight(NanosplashRepository.DEFAULT.SPLASH_HEIGHT);
    this.setSplashAnimation(NanosplashRepository.DEFAULT.SPLASH_ANIMATION);
    this.setBackgroundColor(NanosplashRepository.DEFAULT.BACKGROUND_COLOR);
    this.setBackgroundBlur(NanosplashRepository.DEFAULT.BACKGROUND_BLUR);
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
      throw new InvalidDestinationException();
    }
    return destinationNode;
  }
}
export { Nanosplash };
