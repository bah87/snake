/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__ = __webpack_require__(1);


const docReadyCallbacks = [];
let docReady = false;

const $l = arg => {
  switch(typeof(arg)){
    // The core function only accepts one argument, but that argument
    // can be a function, string or object. Regardless of whether it is
    // a string or object (HTMLElement), a DOMNodeCollection object is
    // returned, which gives the desired document elements the
    // convenient and familiar jQuery methods we all know and love.
    case "function":
      return registerDocReadyCallback(arg);
    case "string":
      return nodesFromDOM(arg);
    case "object":
      if(arg instanceof HTMLElement){
        return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */]([arg]);
      }
  }
};

window.$l = $l;

$l.extend = (...objects) => {
  return Object.assign(...objects);
};

$l.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET"){
    // data is query string for GET request
    options.url += "?" + toQueryString(options.data);
  }

  request.open(options.method, options.url, true);
  request.onload = e => {
    // Triggered when request.readyState === XMLHttpRequest.DONE ===  4
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

const toQueryString = obj => {
  let result = "";
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)){
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};

// When the core function receives a string as an argument it is
// expected to be a CSS selector that can be used to grab nodes from the
// DOM. The vanilla JavaScript querySelectorAll method uses a
// depth-first pre-order traversal of the document's nodes to return a
// list of elements within the document that match the specified group
// of selectors
const nodesFromDOM = selector => {
  const nodes = document.querySelectorAll(selector);
  const nodesArr = Array.from(nodes);
  return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */](nodesArr);
};

// If the core function receives a function as its argument, it will
// add that function to a queue of functions to be executed when the
// document is ready
const registerDocReadyCallback = func => {
  if(!docReady){
    docReadyCallbacks.push(func);
  } else {
    // Trigger the function if the document is ready
    func();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  // Trigger all functions in the queue since document is ready
  docReadyCallbacks.forEach(func => func() );
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DOMNodeCollection {
  // The DOMNodeCollection class receives an array of HTMLElements as
  // its only argument and stores the array as an instance variable.
  // The DOMNodeCollection class allows HTMLElements that are wrapped
  // in it access to convenient jQuery-like methods.
  constructor(nodes) {
    this.nodes = nodes;
  }

  each(callback) {
    // JavaScript's forEach method will be needed often to replicate
    // jQuery's methods, so it makes sense to extract it into a method.
    this.nodes.forEach(callback);
  }

  html(string) {
    // This method optionally receives a string as a parameter. If it
    // does, it becomes the innerHTML of each of the nodes. If there is
    // no argument, it should return the innerHTML of the first node in
    // the array.
    if (string === undefined && this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    } else {
      this.each(node => { node.innerHTML = string; });
    }
  }

  empty () {
    // This method uses the html(string) method to replace any content
    // in the nodes with an empty string.
    this.html("");
  }

  append(children) {
    // This method accepts either a DOMNodeCollection, an HTML element
    // or a string. The goal of this method is to add content to the end
    // of each of the matched elements.

    if (this.nodes.length === 0) return;

    // This method cannot handle objects unless they are an instance
    // of the DOMNodeCollection constructor.
    if (typeof children === 'object' &&
        !(children instanceof DOMNodeCollection)) {
      // $l is defined on the window
      children = $l(children);
    }

    if (typeof children === "string") {
      // Append the content to each node in the matching set of elements
      this.each(node => { node.innerHTML += children; });
    } else if (children instanceof DOMNodeCollection) {
      // If there is more than one target element, clone copies of the
      // inserted element will be created for each target.
      this.each(node => {
        children.each(childNode => {
          node.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  attr (name, value) {
    // Get the value of an attribute for the first element of the
    // matched elements, or if a value is provided, set one or more
    // attributes for every matched element
    if (value === undefined) {
      return this.nodes[0].getAttribute(name);
    } else {
      this.each(node => { node.setAttribute(name, value); });
    }
  }

  addClass (classesStr) {
    // Adds the class(es) to each element in the set of matched elements
    // Does not replace existing classes
    classesStr.split(" ").forEach(className => {
      this.each(node => { node.classList.add(className); });
    });
  }

  removeClass (classesStr) {
    // Removes the class(es) from each element in the set of matched
    // elements
    classesStr.split(" ").forEach(className => {
      this.each(node => { node.classList.remove(className); });
    });
  }

  children () {
    // Get the chilren of each of the matched elements
    let children = [];
    let nodeList;
    this.each(node => {
      nodeList = node.children;
      children = children.concat(Array.from(nodeList));
    });

    return new DOMNodeCollection(children);
  }

  parent () {
    // Get the parents of each of the matched elements
    let parents = [];
    this.each(node => {
      if (!node.closed) {
        parents.push(node.parentNode);
        node.parentNode.closed = true;
      }
    });

    parents.forEach(node => { node.closed = false; });

    return new DOMNodeCollection(parents);
  }

  find (selector) {
    // Similar to children, but travels multiple levels of the DOM tree
    // to find all nodes that are descendants of the nodes matching the
    // selector passed in as an argument
    let found = [];
    let nodeList;

    this.each(node => {
      nodeList = node.querySelectorAll(selector);
      found = found.concat(Array.from(nodeList));
    });

    return new DOMNodeCollection(found);
  }

  remove () {
    // Removes html from all elements in the DOM and removes all nodes
    // from the DOMNodeCollection array
    this.each(node => node.parentNode.removeChild(node));
  }

  on (type, callback) {
    // Register event handler for every element in the node array
    this.each(node => {
      node.addEventListener(type, callback);

      // Store the callback as an attribute on the node so that the off
      // method can later retrieve it and remove it
      node.callbackFn = callback;
    });
  }

  off (type) {
    // Remove event handler for every element in the node array
    this.each(node => {
      node.removeEventListener(type, node.callbackFn);
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DOMNodeCollection);


/***/ })
/******/ ]);