const View = require('./snake-view.js');
const $dq = require('../DOMquerylone/main.js');

$dq(() => {
  const rootEl = $dq('.snake-game');
  const view = new View(rootEl);
  view.makeGrid();
});

window.$dq = $dq;
window.$ = $;
