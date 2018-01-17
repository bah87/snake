const Board = require('./board.js');
const $dq = require('../DOMquerylone/main.js');

class View {
  constructor($el) {
    this.$el = $el;

    this.board = new Board(20);

    $dq("body").on("keydown", this.handleStartPause.bind(this));
    $dq("body").on("keydown", this.handleKeyEvent.bind(this));
    // $(window).on("keydown", this.handleStartPause.bind(this));
    // $(window).on("keydown", this.handleKeyEvent.bind(this));
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
    // $dq(document.getElementsByClassName("snake-game"))
    $dq(".snake-game").append(`<p></p>`);
    this.$li = this.$el.find("li");
  }

  labelCells(coords, className) {
    this.$li.filter(`${className}`).removeClass(`${className}`);

    coords.forEach( coord => {
      const idx = coord.pos.x * this.board.size + coord.pos.y;
      this.$li.eq(idx).addClass(className);
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
        $dq(".game-over").removeClass("game-over").addClass("game-over-hidden");
      }
      if (this.board.snake.paused){
        this.board.snake.paused = false;
        this.intervalId = window.setInterval(this.play.bind(this), 100);
        $dq(".paused").removeClass("paused").addClass("paused-hidden");
      }
    } else if (event.key === "Escape") {
      window.clearInterval(this.intervalId);
      this.board.snake.paused = true;
      $dq(".paused-hidden").removeClass("paused-hidden").addClass("paused");
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
      $dq(".game-over-hidden").removeClass("game-over-hidden").addClass("game-over");
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
