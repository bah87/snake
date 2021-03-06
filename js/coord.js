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
