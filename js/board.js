const Snake = require('./snake.js');
const Apple = require('./apple.js');

class Board {
  constructor(size) {
    this.size = size;
    this.snake = new Snake(this);
    this.apple = new Apple(this);
  }
}
module.exports = Board;
