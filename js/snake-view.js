import Board from './board';

class View {
  constructor($el) {
    this.$el = $el;

    this.board = new Board(25);
    this.makeGrid();

    this.intervalId = window.setInterval(this.step.bind(this), 100);
    $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  render() {
    this.labelCells(this.board.snake.segments, "snake");
    this.labelCells([this.board.apple.position], "apple");
  }

  makeGrid() {
    let html = "";

    for (let i = 0; i < this.grid.size; i++) {
      html += "<ul>";
      for (let j = 0; j < this.grid.size; j++) {
        html += `<li className=${i}${j}></li>`;
      }
      html += "</ul>";
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

  labelCells(coords, className) {
    this.$li.filter(`.${className}`).map(el => {
      el.removeClass(className);
    });

    coords.forEach(pos => {
      this.$li.filter(`.${pos[0]}${pos[1]}`).addClass(className);
    });
  }

  handleKeyEvent(event) {
    if (View.directions[event.key]) {
      this.board.snake.turn(View.directions[event.key]);
    }
  }

  play() {
    if (!this.board.snake.gameOver) {
      this.board.snake.move();
      this.render();
    } else {
      alert("You lose!");
      window.clearInterval(this.intervalId);
    }
  }
}

View.directions = {
  "ArrowDown": "S",
  "ArrowUp": "N",
  "ArrowRight": "E",
  "ArrowLeft": "W",
};

export default View;
