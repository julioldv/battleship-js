import "modern-normalize";
import "./styles.css";

import { createGame } from "./modules/game.js";
import { renderBoard, bindBoardAttack } from "./modules/dom.js";

const game = createGame();
game.humanAttack([5, 5]); // Hits the computer ship
game.humanAttack([0, 0]); // Misses

const humanBoardElement = document.querySelector("#human-board");
const computerBoardElement = document.querySelector("#computer-board");

const renderGame = function () {
  renderBoard(game.humanPlayer.gameboard, humanBoardElement, true);

  renderBoard(game.computerPlayer.gameboard, computerBoardElement, false);
};

bindBoardAttack(computerBoardElement, (coordinates) => {
  const wasAccepted = game.humanAttack(coordinates);

  if (!wasAccepted) return;

  renderGame();
});

renderGame();
