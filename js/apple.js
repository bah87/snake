import Coord from './coord';

class Apple {
  constructor(board) {
    this.board = board;
    this.pos = null;
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

export default Apple;
