import { jest } from "@jest/globals";
import { createGame } from "./game.js";

const countOccupiedCells = function (gameboard) {
  let occupiedCells = 0;

  for (let row = 0; row < 10; row++) {
    for (let column = 0; column < 10; column++) {
      if (gameboard.getCell([row, column]) !== null) {
        occupiedCells++;
      }
    }
  }

  return occupiedCells;
};

const sinkFleet = function (targetGameboard, attack) {
  for (let row = 0; row < 10; row++) {
    for (let column = 0; column < 10; column++) {
      const coordinates = [row, column];

      if (targetGameboard.getCell(coordinates) !== null) {
        attack(coordinates);
      }
    }
  }
};

const findEmptyCell = function (gameboard) {
  for (let row = 0; row < 10; row++) {
    for (let column = 0; column < 10; column++) {
      const coordinates = [row, column];

      if (gameboard.getCell(coordinates) === null) {
        return coordinates;
      }
    }
  }

  throw new Error("The gameboard has no empty cells.");
};

test("a new game sets up complete fleets for both players", () => {
  const game = createGame();

  expect(countOccupiedCells(game.humanPlayer.gameboard)).toBe(17);
  expect(countOccupiedCells(game.computerPlayer.gameboard)).toBe(17);
});

test("processes a human attack against the computer gameboard", () => {
  const game = createGame();

  const coordinates = findEmptyCell(game.computerPlayer.gameboard);

  const wasAccepted = game.humanAttack(coordinates);

  expect(wasAccepted).toBe(true);
  expect(game.computerPlayer.gameboard.getMissedAttacks()).toContainEqual(
    coordinates,
  );

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

  sinkFleet(game.computerPlayer.gameboard, game.humanAttack);

  expect(game.getWinner()).toBe("human");
});

test("reports the computer as the winner when the human fleet sinks", () => {
  const game = createGame();

  sinkFleet(game.humanPlayer.gameboard, (coordinates) =>
    game.computerPlayer.attack(game.humanPlayer.gameboard, coordinates),
  );

  expect(game.getWinner()).toBe("computer");
});

test("plays a complete round after a valid human attack", () => {
  const game = createGame();

  const randomSpy = jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0.4)
    .mockReturnValueOnce(0.7);

  const coordinates = findEmptyCell(game.computerPlayer.gameboard);

  const wasPlayed = game.playRound(coordinates);

  expect(wasPlayed).toBe(true);

  expect(game.computerPlayer.gameboard.getMissedAttacks()).toContainEqual(
    coordinates,
  );

  expect(game.humanPlayer.gameboard.getMissedAttacks()).toContainEqual([4, 7]);

  randomSpy.mockRestore();
});
