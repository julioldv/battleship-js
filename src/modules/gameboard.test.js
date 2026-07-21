import { createGameboard } from "./gameboard.js";

test("a new gameboard contains empty cells", () => {
  const gameboard = createGameboard();

  expect(gameboard.getCell([0, 0])).toBe(null);
  expect(gameboard.getCell([9, 9])).toBe(null);
});

test("places a ship horizontally", () => {
  const gameboard = createGameboard();

  gameboard.placeShip(3, [0, 0], "horizontal");

  const placedShip = gameboard.getCell([0, 0]);

  expect(placedShip).not.toBe(null);
  expect(gameboard.getCell([0, 1])).toBe(placedShip);
  expect(gameboard.getCell([0, 2])).toBe(placedShip);
  expect(gameboard.getCell([0, 3])).toBe(null);
});

test("places a horizontal ship starting from a non-zero column", () => {
  const gameboard = createGameboard();

  gameboard.placeShip(3, [2, 4]);

  const placedShip = gameboard.getCell([2, 4]);

  expect(placedShip).not.toBe(null);
  expect(gameboard.getCell([2, 5])).toBe(placedShip);
  expect(gameboard.getCell([2, 6])).toBe(placedShip);
  expect(gameboard.getCell([2, 3])).toBe(null);
  expect(gameboard.getCell([2, 7])).toBe(null);
});
