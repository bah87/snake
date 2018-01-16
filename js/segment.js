const Coord = require('./coord.js');

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
