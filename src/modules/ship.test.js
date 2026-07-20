import { createShip } from "./ship.js";

test("a new ship is not sunk", () => {
  const ship = createShip(3);

  expect(ship.isSunk()).toBe(false);
});

test("a ship sinks after receiving enough hits", () => {
  const ship = createShip(1);

  ship.hit();

  expect(ship.isSunk()).toBe(true);
});

test("a ship does not sink before receiving enough hits", () => {
  const ship = createShip(3);

  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(false);
});

test("a ship sinks when its number of hits reaches its length", () => {
  const ship = createShip(3);

  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});
