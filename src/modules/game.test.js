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

const placeCompleteHumanFleet = function (game) {
  const placements = [
    {
      coordinates: [0, 0],
      orientation: "horizontal",
    },
    {
      coordinates: [2, 0],
      orientation: "vertical",
    },
    {
      coordinates: [3, 3],
      orientation: "horizontal",
    },
    {
      coordinates: [5, 7],
      orientation: "vertical",
    },
    {
      coordinates: [9, 8],
      orientation: "horizontal",
    },
  ];

  placements.forEach(({ coordinates, orientation }) => {
    game.placeHumanShip(coordinates, orientation);
  });
};

test("a new game starts with an empty human board and a complete computer fleet", () => {
  const game = createGame();

  expect(countOccupiedCells(game.humanPlayer.gameboard)).toBe(0);
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

  placeCompleteHumanFleet(game);

  sinkFleet(game.humanPlayer.gameboard, (coordinates) =>
    game.computerPlayer.attack(game.humanPlayer.gameboard, coordinates),
  );

  expect(game.getWinner()).toBe("computer");
});

test("does not play a round before human fleet placement is complete", () => {
  const game = createGame();

  const coordinates = findEmptyCell(game.computerPlayer.gameboard);

  const wasPlayed = game.playRound(coordinates);

  expect(wasPlayed).toBe(false);
  expect(game.computerPlayer.gameboard.wasAttacked(coordinates)).toBe(false);
  expect(game.humanPlayer.gameboard.getMissedAttacks()).toHaveLength(0);
});

test("plays a complete round after a valid human attack", () => {
  const game = createGame();

  placeCompleteHumanFleet(game);

  const coordinates = findEmptyCell(game.computerPlayer.gameboard);

  const randomSpy = jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0.4)
    .mockReturnValueOnce(0.7);

  const wasPlayed = game.playRound(coordinates);

  expect(wasPlayed).toBe(true);

  expect(game.computerPlayer.gameboard.getMissedAttacks()).toContainEqual(
    coordinates,
  );

  expect(game.humanPlayer.gameboard.getMissedAttacks()).toContainEqual([4, 7]);

  randomSpy.mockRestore();
});

test("reports the first human ship that needs to be placed", () => {
  const game = createGame();

  expect(game.getNextShipLength()).toBe(5);
});

test("places the next human ship and advances the fleet sequence", () => {
  const game = createGame();

  const wasPlaced = game.placeHumanShip([0, 0], "horizontal");

  expect(wasPlaced).toBe(true);
  expect(countOccupiedCells(game.humanPlayer.gameboard)).toBe(5);
  expect(game.getNextShipLength()).toBe(4);
});

test("does not advance the fleet sequence after an invalid placement", () => {
  const game = createGame();

  const wasPlaced = game.placeHumanShip([0, 8], "horizontal");

  expect(wasPlaced).toBe(false);
  expect(countOccupiedCells(game.humanPlayer.gameboard)).toBe(0);
  expect(game.getNextShipLength()).toBe(5);
});

test("reports when the human fleet placement is complete", () => {
  const game = createGame();

  expect(game.isPlacementComplete()).toBe(false);

  placeCompleteHumanFleet(game);

  expect(game.isPlacementComplete()).toBe(true);
  expect(game.getNextShipLength()).toBe(null);
  expect(countOccupiedCells(game.humanPlayer.gameboard)).toBe(17);
});
