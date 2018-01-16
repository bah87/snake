const Coord = require('./coord.js');

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
