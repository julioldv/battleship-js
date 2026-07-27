const renderBoard = function (container) {
  container.replaceChildren();
  for (let row = 0; row < 10; row++) {
    for (let column = 0; column < 10; column++) {
      const button = document.createElement("button");
      button.type = "button";
      button.classList.add("cell");
      button.dataset.row = row;
      button.dataset.column = column;

      container.append(button);
    }
  }
};

export { renderBoard };
