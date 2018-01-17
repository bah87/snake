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
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(2);

$(() => {
  const rootEl = $('.snake-game');
  const view = new View(rootEl);
  view.makeGrid();
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  addToEnd(coord, dir) {
    let newX = coord.x - Coord.directions[dir].x;
    let newY = coord.y - Coord.directions[dir].y;

    return new Coord(newX, newY);
  }

  move(dir) {
    let newX = this.x + Coord.directions[dir].x;
    let newY = this.y + Coord.directions[dir].y;
    return new Coord(newX, newY);
  }

  equals(coord) {
    return (this.x === coord.x) && (this.y === coord.y);
  }
}

Coord.oppositeDir = dir => {
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
  "E": { x: 0, y: 1},
  "W": { x: 0, y: -1},
  "S": { x: 1, y: 0},
  "N": { x: -1, y: 0},
};

module.exports = Coord;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(3);

class View {
  constructor($el) {
    this.$el = $el;

    this.board = new Board(20);

    $(window).on("keydown", this.handleStartPause.bind(this));
    $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  render() {
    this.labelCells(this.board.snake.segments, "snake");
    this.labelCells([this.board.apple], "apple");
  }

  makeGrid() {
    let html = "";

    for (let i = 0; i < this.board.size; i++) {
      html += "<ul>";
      for (let j = 0; j < this.board.size; j++) {
        html += `<li></li>`;
      }
      html += "</ul>";
    }

    this.$el.html(html);
    $(document.getElementsByClassName("snake-game"))
    .append(`<p></p>`);
    this.$li = this.$el.find("li");
  }

  labelCells(coords, className) {
    this.$li.filter(`.${className}`).removeClass();

    coords.forEach( coord => {
      const flatCoord = (coord.pos.x * this.board.size) + coord.pos.y;
      this.$li.eq(flatCoord).addClass(className);
    });
  }

  handleKeyEvent(event) {
    if (View.directions[event.key]) {
      this.board.snake.turn(View.directions[event.key]);
    }
  }

  handleStartPause(event) {
    if (event.key === "Enter") {
      if (!this.board.snake.inPlay) {
        this.board.snake.restart();
        this.board.snake.inPlay = true;
        this.board.snake.paused = false;
        this.intervalId = window.setInterval(this.play.bind(this), 100);
        $(document.getElementsByClassName("game-over"))
        .removeClass().addClass("game-over-hidden");
      }
      if (this.board.snake.paused){
        this.board.snake.paused = false;
        this.intervalId = window.setInterval(this.play.bind(this), 100);
        $(document.getElementsByClassName("paused"))
        .removeClass().addClass("paused-hidden");
      }
    } else if (event.key === "Escape") {
      window.clearInterval(this.intervalId);
      this.board.snake.paused = true;
      $(document.getElementsByClassName("paused-hidden"))
      .removeClass().addClass("paused");

    }
  }

  play() {
    if (!this.board.snake.gameOver) {
      this.board.snake.move();
      this.$el.find("p").html(`Score: ${this.board.snake.score}`);
      this.render();
    } else {
      window.clearInterval(this.intervalId);
      this.board.snake.inPlay = false;
      $(document.getElementsByClassName("game-over-hidden"))
      .removeClass().addClass("game-over");
    }
  }
}

View.directions = {
  "ArrowDown": "S",
  "ArrowUp": "N",
  "ArrowRight": "E",
  "ArrowLeft": "W",
};

module.exports = View;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(4);
const Apple = __webpack_require__(6);

class Board {
  constructor(size) {
    this.size = size;
    this.snake = new Snake(this);
    this.apple = new Apple(this);
  }
}
module.exports = Board;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(1);
const Segment = __webpack_require__(5);

class Snake {
  constructor(board) {
    this.dir = "E";
    this.board = board;
    this.segments = [new Segment(new Coord(10,10))];
    this.gameOver = false;
    this.score = 0;
  }

  restart() {
    this.dir = "E";
    this.segments = [new Segment(new Coord(10,10))];
    this.gameOver = false;
  }

  eat() {
    this.score += 1;
    const newTail = new Coord().addToEnd(this.tail(), this.dir);
    this.segments.push(new Segment(newTail));
  }

  collision(pos, apple) {
    const slicePoint = apple ? 0 : 1;
    this.segments.slice(slicePoint).forEach(segment => {
      if (segment.pos.equals(pos)) {
        return true;
      }
    });
  }

  invalidMove(pos) {
    if (this.collision(pos, false)
      || pos.x < 0 || pos.x > (this.board.size - 1)
      || pos.y < 0 || pos.y > (this.board.size - 1)) {
      return true;
    }
  }

  checkMove() {
    if (this.invalidMove(this.head().pos)) {
      this.gameOver = true;
    } else if (this.board.apple.pos.equals(this.head().pos)) {
      this.eat();
      this.board.apple.move();
    }
  }

  move() {
    this.head().update(this.head().pos.move(this.dir));

    for (let i = 1; i < this.segments.length; i++) {
      this.segments[i].update(this.segments[i-1].prevPos);
    }

    this.checkMove();
  }

  turn(dir) {
    this.dir = Coord.oppositeDir(this.dir) === dir ? this.dir : dir;
  }

  isFreeSpace(pos) {
    this.segments.forEach(segment => {
      if (pos.equals(segment.pos)) {
        return false;
      }
    });

    return true;
  }

  tail() {
    return this.segments.slice(-1);
  }

  head() {
    return this.segments[0];
  }
}

module.exports = Snake;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(1);

class Segment {
  constructor(pos) {
    this.pos = new Coord(pos.x, pos.y);
    this.prevPos = null;
  }

  update(coord) {
    this.prevPos = this.pos;
    this.pos = coord;
  }
}

module.exports = Segment;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(1);

class Apple {
  constructor(board) {
    this.board = board;
    this.pos = new Coord(this.rand(), this.rand());
    this.move();
  }

  move() {
    this.pos = new Coord(this.rand(), this.rand());
    while (this.board.snake.collision(this.pos, true)) {
      this.pos = new Coord(this.rand(), this.rand());
    }
  }

  rand() {
    return Math.floor(Math.random() * this.board.size);
  }
}

module.exports = Apple;


/***/ })
/******/ ]);