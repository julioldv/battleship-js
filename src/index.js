import "modern-normalize";
import "./styles.css";

import { createGame } from "./modules/game.js";
import { renderBoard, bindBoardAttack } from "./modules/dom.js";
const statusElement = document.querySelector("#game-status");

const renderStatus = function () {
  const winner = game.getWinner();

  if (winner === "human") {
    statusElement.textContent = "You win!";
    return;
  }

  if (winner === "computer") {
    statusElement.textContent = "The computer wins!";
    return;
  }

  statusElement.textContent = "Your turn";
};

const game = createGame();

const humanBoardElement = document.querySelector("#human-board");
const computerBoardElement = document.querySelector("#computer-board");

const renderGame = function () {
  renderBoard(game.humanPlayer.gameboard, humanBoardElement, true);

  renderBoard(game.computerPlayer.gameboard, computerBoardElement, false);
  renderStatus();
};

bindBoardAttack(computerBoardElement, (coordinates) => {
  if (game.getWinner() !== null) return;

  const wasAccepted = game.humanAttack(coordinates);

  if (!wasAccepted) return;

  if (game.getWinner() === null) {
    game.computerAttack();
  }

  renderGame();
});

renderGame();
