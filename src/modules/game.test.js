import { jest } from "@jest/globals";
import { createGame } from "./game.js";

test("a new game sets up both players with ships", () => {
  const game = createGame();

  const humanShip = game.humanPlayer.gameboard.getCell([0, 0]);
  const computerShip = game.computerPlayer.gameboard.getCell([5, 5]);

  expect(humanShip).not.toBe(null);
  expect(computerShip).not.toBe(null);
});

test("processes a human attack against the computer gameboard", () => {
  const game = createGame();

  const wasAccepted = game.humanAttack([0, 0]);

  expect(wasAccepted).toBe(true);
  expect(game.computerPlayer.gameboard.getMissedAttacks()).toContainEqual([
    0, 0,
  ]);

  expect(game.humanPlayer.gameboard.getMissedAttacks()).toHaveLength(0);
});

test("processes a computer attack against the human gameboard", () => {
  const game = createGame();

  const randomSpy = jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0.4)
    .mockReturnValueOnce(0.7);

  game.computerAttack();

  expect(game.humanPlayer.gameboard.getMissedAttacks()).toContainEqual([4, 7]);

  randomSpy.mockRestore();
});

test("reports no winner when both fleets are still afloat", () => {
  const game = createGame();

  expect(game.getWinner()).toBe(null);
});

test("reports the human as the winner when the computer fleet sinks", () => {
  const game = createGame();

  game.humanAttack([5, 5]);
  game.humanAttack([5, 6]);

  expect(game.getWinner()).toBe("human");
});

test("reports the computer as the winner when the human fleet sinks", () => {
  const game = createGame();

  const randomSpy = jest
    .spyOn(Math, "random")
    // First attack: [0, 0]
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0)
    // Second attack: [0, 1]
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0.1);

  game.computerAttack();
  game.computerAttack();

  expect(game.getWinner()).toBe("computer");

  randomSpy.mockRestore();
});
