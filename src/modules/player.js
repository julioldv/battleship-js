import { createGameboard } from "./gameboard.js";

function createPlayer() {
  const gameboard = createGameboard();

  const attack = function (opponentGameboard, coordinates) {
    opponentGameboard.receiveAttack(coordinates);
  };

  return {
    gameboard,
    attack,
  };
}

export { createPlayer };
