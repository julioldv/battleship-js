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

  gameboard.placeShip(3, [2, 4], "horizontal");

  const placedShip = gameboard.getCell([2, 4]);

  expect(placedShip).not.toBe(null);
  expect(gameboard.getCell([2, 5])).toBe(placedShip);
  expect(gameboard.getCell([2, 6])).toBe(placedShip);
  expect(gameboard.getCell([2, 3])).toBe(null);
  expect(gameboard.getCell([2, 7])).toBe(null);
});

test("places a ship vertically", () => {
  const gameboard = createGameboard();

  gameboard.placeShip(3, [2, 4], "vertical");

  const placedShip = gameboard.getCell([2, 4]);

  expect(placedShip).not.toBe(null);
  expect(gameboard.getCell([3, 4])).toBe(placedShip);
  expect(gameboard.getCell([4, 4])).toBe(placedShip);

  expect(gameboard.getCell([1, 4])).toBe(null);
  expect(gameboard.getCell([5, 4])).toBe(null);
});
