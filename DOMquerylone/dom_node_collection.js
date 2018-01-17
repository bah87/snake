import $dq from './main.js';

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
      children = $dq(children);
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

export default DOMNodeCollection;
