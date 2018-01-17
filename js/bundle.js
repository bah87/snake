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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coord = function () {
  function Coord(x, y) {
    _classCallCheck(this, Coord);

    this.x = x;
    this.y = y;
  }

  _createClass(Coord, [{
    key: "addToEnd",
    value: function addToEnd(coord, dir) {
      var newX = coord.x - Coord.directions[dir].x;
      var newY = coord.y - Coord.directions[dir].y;

      return new Coord(newX, newY);
    }
  }, {
    key: "move",
    value: function move(dir) {
      var newX = this.x + Coord.directions[dir].x;
      var newY = this.y + Coord.directions[dir].y;
      return new Coord(newX, newY);
    }
  }, {
    key: "equals",
    value: function equals(coord) {
      return this.x === coord.x && this.y === coord.y;
    }
  }]);

  return Coord;
}();

Coord.oppositeDir = function (dir) {
  switch (dir) {
    case "N":
      return "S";
    case "S":
      return "N";
    case "E":
      return "W";
    case "W":
      return "E";
  }
};

Coord.directions = {
  "E": { x: 0, y: 1 },
  "W": { x: 0, y: -1 },
  "S": { x: 1, y: 0 },
  "N": { x: -1, y: 0 }
};

module.exports = Coord;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _dom_node_collection = __webpack_require__(8);

var _dom_node_collection2 = _interopRequireDefault(_dom_node_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var docReadyCallbacks = [];
var docReady = false;

var $dq = function $dq(arg) {
  switch (typeof arg === "undefined" ? "undefined" : _typeof(arg)) {
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
      if (arg instanceof HTMLElement) {
        return new _dom_node_collection2.default([arg]);
      }
  }
};

$dq.extend = function () {
  return Object.assign.apply(Object, arguments);
};

$dq.ajax = function (options) {
  var request = new XMLHttpRequest();
  var defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: function success() {},
    error: function error() {},
    data: {}
  };
  options = $dq.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET") {
    // data is query string for GET request
    options.url += "?" + toQueryString(options.data);
  }

  request.open(options.method, options.url, true);
  request.onload = function (e) {
    // Triggered when request.readyState === XMLHttpRequest.DONE ===  4
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

var toQueryString = function toQueryString(obj) {
  var result = "";
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
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
var nodesFromDOM = function nodesFromDOM(selector) {
  var nodes = document.querySelectorAll(selector);
  var nodesArr = Array.from(nodes);
  return new _dom_node_collection2.default(nodesArr);
};

// If the core function receives a function as its argument, it will
// add that function to a queue of functions to be executed when the
// document is ready
var registerDocReadyCallback = function registerDocReadyCallback(func) {
  if (!docReady) {
    docReadyCallbacks.push(func);
  } else {
    // Trigger the function if the document is ready
    func();
  }
};

document.addEventListener('DOMContentLoaded', function () {
  docReady = true;
  // Trigger all functions in the queue since document is ready
  docReadyCallbacks.forEach(function (func) {
    return func();
  });
});

module.exports = $dq;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var View = __webpack_require__(3);
var $dq = __webpack_require__(1);

$dq(function () {
  var rootEl = $dq('.snake-game');
  var view = new View(rootEl);
  view.makeGrid();
});

window.$dq = $dq;
window.$ = $;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = __webpack_require__(4);
var $dq = __webpack_require__(1);

var View = function () {
  function View($el) {
    _classCallCheck(this, View);

    this.$el = $el;

    this.board = new Board(20);

    $dq("body").on("keydown", this.handleStartPause.bind(this));
    $dq("body").on("keydown", this.handleKeyEvent.bind(this));
    // $(window).on("keydown", this.handleStartPause.bind(this));
    // $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  _createClass(View, [{
    key: 'render',
    value: function render() {
      this.labelCells(this.board.snake.segments, "snake");
      this.labelCells([this.board.apple], "apple");
    }
  }, {
    key: 'makeGrid',
    value: function makeGrid() {
      var html = "";

      for (var i = 0; i < this.board.size; i++) {
        html += "<ul>";
        for (var j = 0; j < this.board.size; j++) {
          html += '<li></li>';
        }
        html += "</ul>";
      }

      this.$el.html(html);
      // $dq(document.getElementsByClassName("snake-game"))
      $dq(".snake-game").append('<p></p>');
      this.$li = this.$el.find("li");
    }
  }, {
    key: 'labelCells',
    value: function labelCells(coords, className) {
      var _this = this;

      this.$li.filter('' + className).removeClass('' + className);

      coords.forEach(function (coord) {
        var idx = coord.pos.x * _this.board.size + coord.pos.y;
        _this.$li.eq(idx).addClass(className);
      });
    }
  }, {
    key: 'handleKeyEvent',
    value: function handleKeyEvent(event) {
      if (View.directions[event.key]) {
        this.board.snake.turn(View.directions[event.key]);
      }
    }
  }, {
    key: 'handleStartPause',
    value: function handleStartPause(event) {
      if (event.key === "Enter") {
        if (!this.board.snake.inPlay) {
          this.board.snake.restart();
          this.board.snake.inPlay = true;
          this.board.snake.paused = false;
          this.intervalId = window.setInterval(this.play.bind(this), 100);
          $dq(".game-over").removeClass("game-over").addClass("game-over-hidden");
        }
        if (this.board.snake.paused) {
          this.board.snake.paused = false;
          this.intervalId = window.setInterval(this.play.bind(this), 100);
          $dq(".paused").removeClass("paused").addClass("paused-hidden");
        }
      } else if (event.key === "Escape") {
        window.clearInterval(this.intervalId);
        this.board.snake.paused = true;
        $dq(".paused-hidden").removeClass("paused-hidden").addClass("paused");
      }
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.board.snake.gameOver) {
        this.board.snake.move();
        this.$el.find("p").html('Score: ' + this.board.snake.score);
        this.render();
      } else {
        window.clearInterval(this.intervalId);
        this.board.snake.inPlay = false;
        $dq(".game-over-hidden").removeClass("game-over-hidden").addClass("game-over");
      }
    }
  }]);

  return View;
}();

View.directions = {
  "ArrowDown": "S",
  "ArrowUp": "N",
  "ArrowRight": "E",
  "ArrowLeft": "W"
};

module.exports = View;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Snake = __webpack_require__(5);
var Apple = __webpack_require__(7);

var Board = function Board(size) {
  _classCallCheck(this, Board);

  this.size = size;
  this.snake = new Snake(this);
  this.apple = new Apple(this);
};

module.exports = Board;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coord = __webpack_require__(0);
var Segment = __webpack_require__(6);

var Snake = function () {
  function Snake(board) {
    _classCallCheck(this, Snake);

    this.dir = "E";
    this.board = board;
    this.segments = [new Segment(new Coord(10, 10))];
    this.gameOver = false;
    this.score = 0;
  }

  _createClass(Snake, [{
    key: 'restart',
    value: function restart() {
      this.dir = "E";
      this.segments = [new Segment(new Coord(10, 10))];
      this.gameOver = false;
    }
  }, {
    key: 'eat',
    value: function eat() {
      this.score += 1;
      var newTail = new Coord().addToEnd(this.tail(), this.dir);
      this.segments.push(new Segment(newTail));
    }
  }, {
    key: 'collision',
    value: function collision(pos, apple) {
      var slicePoint = apple ? 0 : 1;
      this.segments.slice(slicePoint).forEach(function (segment) {
        if (segment.pos.equals(pos)) {
          return true;
        }
      });
    }
  }, {
    key: 'invalidMove',
    value: function invalidMove(pos) {
      if (this.collision(pos, false) || pos.x < 0 || pos.x > this.board.size - 1 || pos.y < 0 || pos.y > this.board.size - 1) {
        return true;
      }
    }
  }, {
    key: 'checkMove',
    value: function checkMove() {
      if (this.invalidMove(this.head().pos)) {
        this.gameOver = true;
      } else if (this.board.apple.pos.equals(this.head().pos)) {
        this.eat();
        this.board.apple.move();
      }
    }
  }, {
    key: 'move',
    value: function move() {
      this.head().update(this.head().pos.move(this.dir));

      for (var i = 1; i < this.segments.length; i++) {
        this.segments[i].update(this.segments[i - 1].prevPos);
      }

      this.checkMove();
    }
  }, {
    key: 'turn',
    value: function turn(dir) {
      this.dir = Coord.oppositeDir(this.dir) === dir ? this.dir : dir;
    }
  }, {
    key: 'isFreeSpace',
    value: function isFreeSpace(pos) {
      this.segments.forEach(function (segment) {
        if (pos.equals(segment.pos)) {
          return false;
        }
      });

      return true;
    }
  }, {
    key: 'tail',
    value: function tail() {
      return this.segments.slice(-1);
    }
  }, {
    key: 'head',
    value: function head() {
      return this.segments[0];
    }
  }]);

  return Snake;
}();

module.exports = Snake;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coord = __webpack_require__(0);

var Segment = function () {
  function Segment(pos) {
    _classCallCheck(this, Segment);

    this.pos = new Coord(pos.x, pos.y);
    this.prevPos = null;
  }

  _createClass(Segment, [{
    key: 'update',
    value: function update(coord) {
      this.prevPos = this.pos;
      this.pos = coord;
    }
  }]);

  return Segment;
}();

module.exports = Segment;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coord = __webpack_require__(0);

var Apple = function () {
  function Apple(board) {
    _classCallCheck(this, Apple);

    this.board = board;
    this.pos = new Coord(this.rand(), this.rand());
    this.move();
  }

  _createClass(Apple, [{
    key: 'move',
    value: function move() {
      this.pos = new Coord(this.rand(), this.rand());
      while (this.board.snake.collision(this.pos, true)) {
        this.pos = new Coord(this.rand(), this.rand());
      }
    }
  }, {
    key: 'rand',
    value: function rand() {
      return Math.floor(Math.random() * this.board.size);
    }
  }]);

  return Apple;
}();

module.exports = Apple;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _main = __webpack_require__(1);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMNodeCollection = function () {
  // The DOMNodeCollection class receives an array of HTMLElements as
  // its only argument and stores the array as an instance variable.
  // The DOMNodeCollection class allows HTMLElements that are wrapped
  // in it access to convenient jQuery-like methods.
  function DOMNodeCollection(nodes) {
    _classCallCheck(this, DOMNodeCollection);

    this.nodes = nodes;
  }

  _createClass(DOMNodeCollection, [{
    key: 'each',
    value: function each(callback) {
      // JavaScript's forEach method will be needed often to replicate
      // jQuery's methods, so it makes sense to extract it into a method.
      this.nodes.forEach(callback);
    }
  }, {
    key: 'html',
    value: function html(string) {
      // This method optionally receives a string as a parameter. If it
      // does, it becomes the innerHTML of each of the nodes. If there is
      // no argument, it should return the innerHTML of the first node in
      // the array.
      if (string === undefined && this.nodes.length > 0) {
        return this.nodes[0].innerHTML;
      } else {
        this.each(function (node) {
          node.innerHTML = string;
        });
      }
    }
  }, {
    key: 'eq',
    value: function eq(n) {
      for (var i = 0; i < this.nodes.length; i++) {
        if (i === n) {
          return new DOMNodeCollection([this.nodes[i]]);
        }
      }
    }
  }, {
    key: 'empty',
    value: function empty() {
      // This method uses the html(string) method to replace any content
      // in the nodes with an empty string.
      this.html("");
    }
  }, {
    key: 'filter',
    value: function filter(className) {
      var filteredNodes = [];
      this.each(function (node) {
        if (node.className === className) {
          filteredNodes.push(node);
        }
      });

      return new DOMNodeCollection(filteredNodes);
    }
  }, {
    key: 'append',
    value: function append(children) {
      // This method accepts either a DOMNodeCollection, an HTML element
      // or a string. The goal of this method is to add content to the end
      // of each of the matched elements.

      if (this.nodes.length === 0) return;

      // This method cannot handle objects unless they are an instance
      // of the DOMNodeCollection constructor.
      if ((typeof children === 'undefined' ? 'undefined' : _typeof(children)) === 'object' && !(children instanceof DOMNodeCollection)) {
        children = (0, _main2.default)(children);
      }

      if (typeof children === "string") {
        // Append the content to each node in the matching set of elements
        this.each(function (node) {
          node.innerHTML += children;
        });
      } else if (children instanceof DOMNodeCollection) {
        // If there is more than one target element, clone copies of the
        // inserted element will be created for each target.
        this.each(function (node) {
          children.each(function (childNode) {
            node.appendChild(childNode.cloneNode(true));
          });
        });
      }
    }
  }, {
    key: 'attr',
    value: function attr(name, value) {
      // Get the value of an attribute for the first element of the
      // matched elements, or if a value is provided, set one or more
      // attributes for every matched element
      if (value === undefined) {
        return this.nodes[0].getAttribute(name);
      } else {
        this.each(function (node) {
          node.setAttribute(name, value);
        });
      }
    }
  }, {
    key: 'addClass',
    value: function addClass(className) {
      // Adds the class to each element in the set of matched elements
      // Does not replace existing classes
      this.each(function (node) {
        node.classList.add(className);
      });
    }
  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      // Removes the class from each element in the set of matched
      // elements
      var nodes = [];
      this.each(function (node) {
        node.classList.remove(className);
        nodes.push(node);
      });

      return new DOMNodeCollection(nodes);
    }
  }, {
    key: 'children',
    value: function children() {
      // Get the chilren of each of the matched elements
      var children = [];
      var nodeList = void 0;
      this.each(function (node) {
        nodeList = node.children;
        children = children.concat(Array.from(nodeList));
      });

      return new DOMNodeCollection(children);
    }
  }, {
    key: 'parent',
    value: function parent() {
      // Get the parents of each of the matched elements
      var parents = [];
      this.each(function (node) {
        if (!node.closed) {
          parents.push(node.parentNode);
          node.parentNode.closed = true;
        }
      });

      parents.forEach(function (node) {
        node.closed = false;
      });

      return new DOMNodeCollection(parents);
    }
  }, {
    key: 'find',
    value: function find(selector) {
      // Similar to children, but travels multiple levels of the DOM tree
      // to find all nodes that are descendants of the nodes matching the
      // selector passed in as an argument
      var found = [];
      var nodeList = void 0;

      this.each(function (node) {
        nodeList = node.querySelectorAll(selector);
        found = found.concat(Array.from(nodeList));
      });

      return new DOMNodeCollection(found);
    }
  }, {
    key: 'remove',
    value: function remove() {
      // Removes html from all elements in the DOM and removes all nodes
      // from the DOMNodeCollection array
      this.each(function (node) {
        return node.parentNode.removeChild(node);
      });
    }
  }, {
    key: 'on',
    value: function on(type, callback) {
      // Register event handler for every element in the node array
      this.each(function (node) {
        node.addEventListener(type, callback);

        // Store the callback as an attribute on the node so that the off
        // method can later retrieve it and remove it
        node.callbackFn = callback;
      });
    }
  }, {
    key: 'off',
    value: function off(type) {
      // Remove event handler for every element in the node array
      this.each(function (node) {
        node.removeEventListener(type, node.callbackFn);
      });
    }
  }]);

  return DOMNodeCollection;
}();

exports.default = DOMNodeCollection;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map