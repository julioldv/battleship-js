import { createPlayer } from "./player.js";

function createGame() {
  const humanPlayer = createPlayer();
  const computerPlayer = createPlayer();

  humanPlayer.gameboard.placeShip(2, [0, 0], "horizontal");
  computerPlayer.gameboard.placeShip(2, [5, 5], "horizontal");

  return {
    humanPlayer,
    computerPlayer,
  };
}

export { createGame };
