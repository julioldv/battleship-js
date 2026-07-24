import { createGameboard } from "./gameboard.js";

function createPlayer() {
  const gameboard = createGameboard();

  return {
    gameboard,
  };
}

export { createPlayer };
