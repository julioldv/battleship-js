const renderBoard = function (gameboard, container, showShips) {
  container.replaceChildren();

  for (let row = 0; row < 10; row++) {
    for (let column = 0; column < 10; column++) {
      const button = document.createElement("button");

      button.type = "button";
      button.classList.add("cell");
      button.dataset.row = row;
      button.dataset.column = column;

      const ship = gameboard.getCell([row, column]);
      const attacked = gameboard.wasAttacked([row, column]);

      if (attacked && ship !== null) {
        button.classList.add("hit");
      } else if (attacked) {
        button.classList.add("miss");
      } else if (ship !== null && showShips) {
        button.classList.add("ship");
      }

      container.append(button);
    }
  }
};

export { renderBoard };
