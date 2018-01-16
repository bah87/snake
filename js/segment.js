import Coord from './coord';

class Segment {
  constructor(pos) {
    this.pos = new Coord(pos.x, pos.y);
    this.prevPos = null;
  }

  update(coord) {
    this.prevPos = this.pos;
    this.pos = coord;
  }

  coord() {
    return this.pos;
  }

  last() {
    return this.prevPos;
  }
}

export default Segment;
