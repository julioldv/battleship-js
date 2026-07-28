import { createPlayer } from "./player.js";

const humanFleet = [
  {
    length: 5,
    coordinates: [0, 0],
    orientation: "horizontal",
  },
  {
    length: 4,
    coordinates: [2, 0],
    orientation: "vertical",
  },
  {
    length: 3,
    coordinates: [3, 3],
    orientation: "horizontal",
  },
  {
    length: 3,
    coordinates: [5, 7],
    orientation: "vertical",
  },
  {
    length: 2,
    coordinates: [9, 8],
    orientation: "horizontal",
  },
];

const fleetLengths = [5, 4, 3, 3, 2];

const placeFleet = function (gameboard, fleet) {
  fleet.forEach(({ length, coordinates, orientation }) => {
    gameboard.placeShip(length, coordinates, orientation);
  });
};

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

  placeFleet(humanPlayer.gameboard, humanFleet);
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
