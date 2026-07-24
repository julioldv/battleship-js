import { createGame } from "./game.js";

test("a new game sets up both players with ships", () => {
  const game = createGame();

  const humanShip = game.humanPlayer.gameboard.getCell([0, 0]);
  const computerShip = game.computerPlayer.gameboard.getCell([5, 5]);

  expect(humanShip).not.toBe(null);
  expect(computerShip).not.toBe(null);
});
