import "modern-normalize";
import "./styles.css";

import { createGame } from "./modules/game.js";
import { renderBoard, bindBoardClick } from "./modules/dom.js";
const statusElement = document.querySelector("#game-status");
const humanBoardElement = document.querySelector("#human-board");
const computerBoardElement = document.querySelector("#computer-board");

const placementControls = document.querySelector("#placement-controls");

const orientationSelect = document.querySelector("#orientation-select");

const renderStatus = function () {
  if (!game.isPlacementComplete()) {
    const nextShipLength = game.getNextShipLength();

    statusElement.textContent = `Place your length-${nextShipLength} ship.`;

    return;
  }

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

const renderGame = function () {
  renderBoard(game.humanPlayer.gameboard, humanBoardElement, true);

  renderBoard(game.computerPlayer.gameboard, computerBoardElement, false);

  placementControls.hidden = game.isPlacementComplete();

  renderStatus();
};

bindBoardClick(humanBoardElement, (coordinates) => {
  if (game.isPlacementComplete()) return;

  const orientation = orientationSelect.value;

  const wasPlaced = game.placeHumanShip(coordinates, orientation);

  if (!wasPlaced) {
    const shipLength = game.getNextShipLength();

    statusElement.textContent = `The length-${shipLength} ship cannot be placed there.`;

    return;
  }

  renderGame();
});

bindBoardClick(computerBoardElement, (coordinates) => {
  const wasPlayed = game.playRound(coordinates);

  if (!wasPlayed) return;

  renderGame();
});

renderGame();
