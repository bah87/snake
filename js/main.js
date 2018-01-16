import SnakeView from './snake-view';

$(() => {
  const rootEl = $('.snake-game');
  const view = new SnakeView(rootEl);
  view.makeGrid();
  view.play();
});
