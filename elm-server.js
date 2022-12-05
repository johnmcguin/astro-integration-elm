import { JSDOM } from "jsdom";
import { XMLHttpRequest } from "xmlhttprequest";

function check(Component) {
  return Component.$$elm;
}

async function renderToStaticMarkup(Component, props, slotted) {
  const dom = new JSDOM(`<html><head></head><body><div id="app"></div></body></html>`);
  const document = dom.window.document;

  global.document.createElementNS = (...x) => {
    return document.createElementNS(...x)
  };
  
  global.document.replaceChild = (...x) => {
    return document.replaceChild(...x);
  };

  global.document.createTextNode = (...x) =>{
    return document.createTextNode(...x);
  };

  global.document.createElement = (...x) => {
    return document.createElement(...x);
  };

  global.document.createDocumentFragment = (...x) => {
    return document.createDocumentFragment (...x);
  };

  global.document.body = document.body;

  global.document.title = document.title;

  global.XMLHttpRequest = XMLHttpRequest;
  
  Component.init({
    node: document.getElementById('app'),
    flags: props
  });

  return {
    html: dom.serialize()
  };
}

export default {
  check,
  renderToStaticMarkup,
};