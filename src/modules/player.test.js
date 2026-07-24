import { createPlayer } from "./player.js";

test("each player owns a separate gameboard", () => {
  const playerOne = createPlayer();
  const playerTwo = createPlayer();

  playerOne.gameboard.placeShip(1, [0, 0], "horizontal");

  expect(playerOne.gameboard.getCell([0, 0])).not.toBe(null);
  expect(playerTwo.gameboard.getCell([0, 0])).toBe(null);
});
