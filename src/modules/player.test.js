import { jest } from "@jest/globals";
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

test("reports whether an attack was accepted", () => {
  const attacker = createPlayer();
  const opponent = createPlayer();

  const firstAttack = attacker.attack(opponent.gameboard, [4, 4]);
  const repeatedAttack = attacker.attack(opponent.gameboard, [4, 4]);

  expect(firstAttack).toBe(true);
  expect(repeatedAttack).toBe(false);
});

test("a computer player makes a random attack", () => {
  const computer = createPlayer();
  const opponent = createPlayer();

  const randomSpy = jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0.4)
    .mockReturnValueOnce(0.7);

  computer.randomAttack(opponent.gameboard);

  expect(opponent.gameboard.getMissedAttacks()).toContainEqual([4, 7]);

  randomSpy.mockRestore();
});

test("a computer player retries when it generates an attacked coordinate", () => {
  const computer = createPlayer();
  const opponent = createPlayer();

  opponent.gameboard.receiveAttack([4, 4]);

  const randomSpy = jest
    .spyOn(Math, "random")
    // First attempt: [4, 4], which was already attacked
    .mockReturnValueOnce(0.4)
    .mockReturnValueOnce(0.4)
    // Second attempt: [2, 3], which is available
    .mockReturnValueOnce(0.2)
    .mockReturnValueOnce(0.3);

  computer.randomAttack(opponent.gameboard);

  expect(opponent.gameboard.getMissedAttacks()).toContainEqual([2, 3]);
  expect(opponent.gameboard.getMissedAttacks()).toHaveLength(2);

  randomSpy.mockRestore();
});
