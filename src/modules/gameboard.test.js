import { createGameboard } from "./gameboard.js";

test("a new gameboard contains empty cells", () => {
  const gameboard = createGameboard();

  expect(gameboard.getCell([0, 0])).toBe(null);
  expect(gameboard.getCell([9, 9])).toBe(null);
});

test("places a ship horizontally", () => {
  const gameboard = createGameboard();

  const wasPlaced = gameboard.placeShip(3, [0, 0], "horizontal");

  expect(wasPlaced).toBe(true);

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

test("does not place a horizontal ship outside the board", () => {
  const gameboard = createGameboard();

  const wasPlaced = gameboard.placeShip(3, [0, 8], "horizontal");

  expect(wasPlaced).toBe(false);
  expect(gameboard.getCell([0, 8])).toBe(null);
  expect(gameboard.getCell([0, 9])).toBe(null);
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

test("does not place a vertical ship outside the board", () => {
  const gameboard = createGameboard();

  const wasPlaced = gameboard.placeShip(3, [8, 0], "vertical");

  expect(wasPlaced).toBe(false);
  expect(gameboard.getCell([8, 0])).toBe(null);
  expect(gameboard.getCell([9, 0])).toBe(null);
});

test("does not place a ship over another ship", () => {
  const gameboard = createGameboard();

  gameboard.placeShip(3, [2, 2], "horizontal");

  const originalShip = gameboard.getCell([2, 3]);

  const wasPlaced = gameboard.placeShip(3, [1, 3], "vertical");

  expect(wasPlaced).toBe(false);

  expect(gameboard.getCell([2, 3])).toBe(originalShip);
  expect(gameboard.getCell([1, 3])).toBe(null);
  expect(gameboard.getCell([3, 3])).toBe(null);
});

test("places a horizontal ship on the last row", () => {
  const gameboard = createGameboard();

  const wasPlaced = gameboard.placeShip(3, [9, 0], "horizontal");

  expect(wasPlaced).toBe(true);
  expect(gameboard.getCell([9, 0])).not.toBe(null);
  expect(gameboard.getCell([9, 2])).toBe(gameboard.getCell([9, 0]));
});

test("places a vertical ship on the last column", () => {
  const gameboard = createGameboard();

  const wasPlaced = gameboard.placeShip(3, [0, 9], "vertical");

  expect(wasPlaced).toBe(true);
  expect(gameboard.getCell([0, 9])).not.toBe(null);
  expect(gameboard.getCell([2, 9])).toBe(gameboard.getCell([0, 9]));
});

test("an attack hits the ship at the given coordinates", () => {
  const gameboard = createGameboard();

  gameboard.placeShip(1, [4, 4], "horizontal");

  const ship = gameboard.getCell([4, 4]);

  gameboard.receiveAttack([4, 4]);

  expect(ship.isSunk()).toBe(true);
});

test("records an attack that misses every ship", () => {
  const gameboard = createGameboard();

  gameboard.receiveAttack([4, 4]);

  expect(gameboard.getMissedAttacks()).toContainEqual([4, 4]);
});

test("reports false while at least one ship is still afloat", () => {
  const gameboard = createGameboard();

  gameboard.placeShip(1, [0, 0], "horizontal");
  gameboard.placeShip(1, [1, 0], "horizontal");

  gameboard.receiveAttack([0, 0]);

  expect(gameboard.areAllShipsSunk()).toBe(false);
});

test("an empty gameboard does not report all ships as sunk", () => {
  const gameboard = createGameboard();

  expect(gameboard.areAllShipsSunk()).toBe(false);
});

test("reports true when all ships have sunk", () => {
  const gameboard = createGameboard();

  gameboard.placeShip(1, [0, 0], "horizontal");
  gameboard.placeShip(1, [1, 0], "horizontal");

  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([1, 0]);

  expect(gameboard.areAllShipsSunk()).toBe(true);
});

test("does not attack the same coordinate more than once", () => {
  const gameboard = createGameboard();

  gameboard.placeShip(2, [4, 4], "horizontal");

  const firstAttack = gameboard.receiveAttack([4, 4]);
  const repeatedAttack = gameboard.receiveAttack([4, 4]);

  const ship = gameboard.getCell([4, 4]);

  expect(firstAttack).toBe(true);
  expect(repeatedAttack).toBe(false);
  expect(ship.isSunk()).toBe(false);
});

test("reports whether a coordinate has been attacked", () => {
  const gameboard = createGameboard();

  gameboard.receiveAttack([4, 4]);

  expect(gameboard.wasAttacked([4, 4])).toBe(true);
  expect(gameboard.wasAttacked([4, 5])).toBe(false);
});
