import DOMNodeCollection from './dom_node_collection.js';

const docReadyCallbacks = [];
let docReady = false;

const $dq = arg => {
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
        return new DOMNodeCollection([arg]);
      }
  }
};

$dq.extend = (...objects) => {
  return Object.assign(...objects);
};

$dq.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $dq.extend(defaults, options);
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
  return new DOMNodeCollection(nodesArr);
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

export default $dq;
