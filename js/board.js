import Snake from './snake';
import Apple from './apple';

class Board {
  constructor(size) {
    this.size = size;
    this.snake = new Snake(this);
    this.apple = new Apple(this);
  }
}

export default Board;
