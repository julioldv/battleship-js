import { createPlayer } from "./player.js";

const fleetLengths = [5, 4, 3, 3, 2];

const placeRandomFleet = function (gameboard) {
  fleetLengths.forEach((length) => {
    let wasPlaced = false;

    while (!wasPlaced) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";

      wasPlaced = gameboard.placeShip(length, [row, column], orientation);
    }
  });
};

function createGame() {
  const humanPlayer = createPlayer();
  const computerPlayer = createPlayer();
  let nextHumanShipIndex = 0;

  placeRandomFleet(computerPlayer.gameboard);

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
    if (!isPlacementComplete()) return false;
    if (getWinner() !== null) return false;

    const wasAccepted = humanAttack(coordinates);

    if (!wasAccepted) return false;

    if (getWinner() === null) {
      computerAttack();
    }

    return true;
  };

  const getNextShipLength = function () {
    return fleetLengths[nextHumanShipIndex] ?? null;
  };

  const placeHumanShip = function (coordinates, orientation) {
    const length = getNextShipLength();

    if (length === null) return false;

    const wasPlaced = humanPlayer.gameboard.placeShip(
      length,
      coordinates,
      orientation,
    );

    if (!wasPlaced) return false;

    nextHumanShipIndex++;
    return true;
  };

  const isPlacementComplete = function () {
    return nextHumanShipIndex === fleetLengths.length;
  };

  return {
    humanPlayer,
    computerPlayer,
    humanAttack,
    computerAttack,
    getWinner,
    playRound,
    getNextShipLength,
    placeHumanShip,
    isPlacementComplete,
  };
}

export { createGame };
