import { createGameboard } from "./gameboard.js";

function createPlayer() {
  const gameboard = createGameboard();

  const attack = function (opponentGameboard, coordinates) {
    return opponentGameboard.receiveAttack(coordinates);
  };

  const randomAttack = function (opponentGameboard) {
    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);

    while (!attack(opponentGameboard, [row, column])) {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
    }
  };

  return {
    gameboard,
    attack,
    randomAttack,
  };
}

export { createPlayer };
