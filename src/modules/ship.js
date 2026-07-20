function createShip(length) {
  let hits = 0;

  return {
    hit() {
      hits++;
    },

    isSunk() {
      return hits >= length;
    },
  };
}

export { createShip };
