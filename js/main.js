const View = require('./snake-view.js');

$(() => {
  const rootEl = $('.snake-game');
  const view = new View(rootEl);
  view.makeGrid();
  // view.play();
});
