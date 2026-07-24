import { createShip } from "./ship.js";

function createGameboard() {
  const board = Array.from({ length: 10 }, () => Array(10).fill(null));
  const missedAttacks = [];
  const ships = [];

  const getCell = function ([row, column]) {
    return board[row][column];
  };

  const getMissedAttacks = function () {
    return [...missedAttacks];
  };

  const placeShip = function (length, [row, column], orientation) {
    // Prevents placing a ship outside the board
    if (orientation === "horizontal") {
      if (column + length - 1 > 9) return false;
    } else if (orientation === "vertical") {
      if (row + length - 1 > 9) return false;
    } else {
      return false;
    }

    //Prevents ships from overlapping
    for (let offset = 0; offset < length; offset++) {
      if (orientation === "horizontal") {
        if (board[row][column + offset] !== null) return false;
      } else if (orientation === "vertical") {
        if (board[row + offset][column] !== null) return false;
      }
    }

    const ship = createShip(length);
    ships.push(ship);

    for (let offset = 0; offset < length; offset++) {
      if (orientation === "horizontal") {
        board[row][column + offset] = ship;
      } else if (orientation === "vertical") {
        board[row + offset][column] = ship;
      }
    }
    return true;
  };

  const receiveAttack = function ([row, column]) {
    const ship = getCell([row, column]);

    if (ship !== null) {
      ship.hit();
    } else {
      missedAttacks.push([row, column]);
    }
  };

  const areAllShipsSunk = function () {
    return ships.every((ship) => ship.isSunk());
  };

  return {
    getCell,
    getMissedAttacks,
    placeShip,
    receiveAttack,
    areAllShipsSunk,
  };
}

export { createGameboard };
