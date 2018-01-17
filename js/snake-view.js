const Board = require('./board.js');

class View {
  constructor($el) {
    this.$el = $el;

    this.board = new Board(20);

    $(window).on("keydown", this.handleStartPause.bind(this));
    $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  render() {
    this.labelCells(this.board.snake.segments, "snake");
    this.labelCells([this.board.apple], "apple");
  }

  makeGrid() {
    let html = "";

    for (let i = 0; i < this.board.size; i++) {
      html += "<ul>";
      for (let j = 0; j < this.board.size; j++) {
        html += `<li></li>`;
      }
      html += "</ul>";
    }

    this.$el.html(html);
    $(document.getElementsByClassName("snake-game"))
    .append(`<p></p>`);
    this.$li = this.$el.find("li");
  }

  labelCells(coords, className) {
    this.$li.filter(`.${className}`).removeClass();

    coords.forEach( coord => {
      const flatCoord = (coord.pos.x * this.board.size) + coord.pos.y;
      this.$li.eq(flatCoord).addClass(className);
    });
  }

  handleKeyEvent(event) {
    if (View.directions[event.key]) {
      this.board.snake.turn(View.directions[event.key]);
    }
  }

  handleStartPause(event) {
    if (event.key === "Enter") {
      if (!this.board.snake.inPlay) {
        this.board.snake.restart();
        this.board.snake.inPlay = true;
        this.board.snake.paused = false;
        this.intervalId = window.setInterval(this.play.bind(this), 100);
        $(document.getElementsByClassName("game-over"))
        .removeClass().addClass("game-over-hidden");
      }
      if (this.board.snake.paused){
        this.board.snake.paused = false;
        this.intervalId = window.setInterval(this.play.bind(this), 100);
        $(document.getElementsByClassName("paused"))
        .removeClass().addClass("paused-hidden");
      }
    } else if (event.key === "Escape") {
      window.clearInterval(this.intervalId);
      this.board.snake.paused = true;
      $(document.getElementsByClassName("paused-hidden"))
      .removeClass().addClass("paused");

    }
  }

  play() {
    if (!this.board.snake.gameOver) {
      this.board.snake.move();
      this.$el.find("p").html(`Score: ${this.board.snake.score}`);
      this.render();
    } else {
      window.clearInterval(this.intervalId);
      this.board.snake.inPlay = false;
      $(document.getElementsByClassName("game-over-hidden"))
      .removeClass().addClass("game-over");
    }
  }
}

View.directions = {
  "ArrowDown": "S",
  "ArrowUp": "N",
  "ArrowRight": "E",
  "ArrowLeft": "W",
};

module.exports = View;
