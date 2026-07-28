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

const bindBoardClick = function (container, handler) {
  container.addEventListener("click", (event) => {
    const cell = event.target.closest(".cell");

    if (!cell || !container.contains(cell)) return;

    const row = Number(cell.dataset.row);
    const column = Number(cell.dataset.column);

    handler([row, column]);
  });
};

export { renderBoard, bindBoardClick };
