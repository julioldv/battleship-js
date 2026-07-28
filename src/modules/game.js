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

  const getWinner = function () {
    if (computerPlayer.gameboard.areAllShipsSunk()) {
      return "human";
    }
    if (humanPlayer.gameboard.areAllShipsSunk()) {
      return "computer";
    }
    return null;
  };

  const playRound = function (coordinates) {
    if (getWinner() !== null) return;

    const wasAccepted = humanAttack(coordinates);

    if (!wasAccepted) return;

    if (getWinner() === null) {
      computerAttack();
    }

    return true;
  };

  return {
    humanPlayer,
    computerPlayer,
    humanAttack,
    computerAttack,
    getWinner,
    playRound,
  };
}

export { createGame };
