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

const computerFleet = [
  {
    length: 5,
    coordinates: [0, 9],
    orientation: "vertical",
  },
  {
    length: 4,
    coordinates: [1, 1],
    orientation: "horizontal",
  },
  {
    length: 3,
    coordinates: [4, 3],
    orientation: "vertical",
  },
  {
    length: 3,
    coordinates: [7, 5],
    orientation: "horizontal",
  },
  {
    length: 2,
    coordinates: [5, 5],
    orientation: "horizontal",
  },
];

const placeFleet = function (gameboard, fleet) {
  fleet.forEach(({ length, coordinates, orientation }) => {
    gameboard.placeShip(length, coordinates, orientation);
  });
};

function createGame() {
  const humanPlayer = createPlayer();
  const computerPlayer = createPlayer();

  placeFleet(humanPlayer.gameboard, humanFleet);
  placeFleet(computerPlayer.gameboard, computerFleet);

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
