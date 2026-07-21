import { createShip } from "./ship.js";

function createGameboard() {
  const board = Array.from({ length: 10 }, () => Array(10).fill(null));

  const getCell = function ([row, column]) {
    return board[row][column];
  };

  const placeShip = function (length, [row, column]) {
    const ship = createShip(length);

    for (let offset = 0; offset < length; offset++) {
      board[row][column + offset] = ship;
    }
  };

  return { getCell, placeShip };
}

export { createGameboard };
