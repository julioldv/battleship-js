import "modern-normalize";
import "./styles.css";

import { renderBoard } from "./modules/dom.js";

const humanBoardElement = document.querySelector("#human-board");
const computerBoardElement = document.querySelector("#computer-board");

renderBoard(humanBoardElement);
renderBoard(computerBoardElement);
