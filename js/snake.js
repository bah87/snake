const Coord = require('./coord.js');
const Segment = require('./segment.js');

class Snake {
  constructor(board) {
    this.dir = "E";
    this.board = board;
    this.segments = [new Segment(new Coord(10,10))];
    this.gameOver = false;
  }

  eat() {
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
    if (pos.x < 0 || pos.x > this.board.size ||
    pos.y < 0 || pos.y > this.board.size || this.collision(pos)) {
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
    console.log(this.head().pos);
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
