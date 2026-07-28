import "modern-normalize";
import "./styles.css";

import { createGame } from "./modules/game.js";
import { renderBoard, bindBoardAttack } from "./modules/dom.js";

const game = createGame();

const humanBoardElement = document.querySelector("#human-board");
const computerBoardElement = document.querySelector("#computer-board");

const renderGame = function () {
  renderBoard(game.humanPlayer.gameboard, humanBoardElement, true);

  renderBoard(game.computerPlayer.gameboard, computerBoardElement, false);
};

bindBoardAttack(computerBoardElement, (coordinates) => {
  const wasAccepted = game.humanAttack(coordinates);

  if (!wasAccepted) return;

  if (game.getWinner() === null) {
    game.computerAttack();
  }

  renderGame();
});

renderGame();
