import { createPlayer } from "./player.js";

test("each player owns a separate gameboard", () => {
  const playerOne = createPlayer();
  const playerTwo = createPlayer();

  playerOne.gameboard.placeShip(1, [0, 0], "horizontal");

  expect(playerOne.gameboard.getCell([0, 0])).not.toBe(null);
  expect(playerTwo.gameboard.getCell([0, 0])).toBe(null);
});

test("a player can attack an opponent's gameboard", () => {
  const attacker = createPlayer();
  const opponent = createPlayer();

  opponent.gameboard.placeShip(1, [4, 4], "horizontal");

  const ship = opponent.gameboard.getCell([4, 4]);

  attacker.attack(opponent.gameboard, [4, 4]);

  expect(ship.isSunk()).toBe(true);
});
