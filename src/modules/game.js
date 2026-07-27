import { createPlayer } from "./player.js";

function createGame() {
  const humanPlayer = createPlayer();
  const computerPlayer = createPlayer();

  humanPlayer.gameboard.placeShip(2, [0, 0], "horizontal");
  computerPlayer.gameboard.placeShip(2, [5, 5], "horizontal");

  const humanAttack = function (coordinates) {
    return humanPlayer.attack(computerPlayer.gameboard, coordinates);
  };

  const computerAttack = function () {
    computerPlayer.randomAttack(humanPlayer.gameboard);
  };

  return {
    humanPlayer,
    computerPlayer,
    humanAttack,
    computerAttack,
  };
}

export { createGame };
