import { createShip } from "./ship.js";

function createGameboard() {
  const board = Array.from({ length: 10 }, () => Array(10).fill(null));

  const getCell = function ([row, column]) {
    return board[row][column];
  };

  const placeShip = function (length, [row, column], orientation) {
    if (column + length - 1 > 9) return false;
    if (row + length - 1 > 9) return false;

    const ship = createShip(length);

    for (let offset = 0; offset < length; offset++) {
      if (orientation === "horizontal") {
        board[row][column + offset] = ship;
      } else if (orientation === "vertical") {
        board[row + offset][column] = ship;
      }
    }
    return true;
  };

  return { getCell, placeShip };
}

export { createGameboard };
