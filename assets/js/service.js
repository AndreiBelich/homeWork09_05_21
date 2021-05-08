"use strict";

function createElement(tagName, {
  classNames = [],
  handlers = {},
  attributes = {}
}, ...children){
  const element = document.createElement(tagName);
  element.classList.add(...classNames);

  for(const [attributeName, attributeValue] of Object.entries(attributes)){
    element.setAttribute(attributeName, attributeValue);
  }

  for(const [eventType, eventHandler] of Object.entries(handlers)){
    element.addEventListener(eventType, eventHandler);
  }
  element.append(...children);
  return element;
}