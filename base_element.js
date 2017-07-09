class BaseElement extends HTMLElement {
  constructor () {
    super();
    this._shadow = this.attachShadow({mode: 'closed'});
    this._doc = document.currentScript && document.currentScript.ownerDocument || document;

    //repaint children
    this.appendChildren();
  }

  appendChildren () {
    var i = 0,
        children = Array.prototype.slice.call(this.children),
        len = children.length;

    for (i; i < len; i++) {
      this.append(children[i]);
    }
  }

  createEl (tagName, options, styles) {
    var el = document.createElement(tagName);
    var k;

    options = options || {};
    styles = styles || {};

    for (k in options) {
      if (options.hasOwnProperty(k)) {
        el[k] = options[k];
      }
    }

    for (k in styles) {
      if (styles.hasOwnProperty(k)) {
        el.style[k] = styles[k];
      }
    }

    return el;
  }

  append (element) {
    this._shadow.appendChild(element);
  }

  getTemplate(id) {
    var el;
    if (id[0] !== '#') {
      id = '#' + id;
    }
    el = this._doc.querySelector(id);

    if (el) {
      return document.importNode(el.content, true);
    } else {
      return null;
    }
  }
}