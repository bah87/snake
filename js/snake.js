import Coord from './coord';
import Segment from './segment';

class Snake {
  constructor(board) {
    this.dir = "E";
    this.board = board;
    this.segments = [new Segment(board.center)];
  }

  eat() {
    const newTail = new Coord().addToEnd(this.tail(), this.dir);
    this.segments.push(new Segment(newTail));
  }

  move() {
    this.head().update(this.head.coord().move(this.dir));
    for (let i = 1; i < this.segments.length; i++) {
      this.segments[i].update(this.segments[i-1].last());
    }
  }

  turn(dir) {
    this.dir = dir;
  }

  isFreeSpace(pos) {
    this.segments.forEach(segment => {
      if (pos.equals(segment.coord())) {
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

export default Snake;
