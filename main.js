const statusEl = document.getElementById("status");
const restartEl = document.getElementById("restart");
const cellEls = document.querySelectorAll(".cell");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winning = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
];

const currentPlayerTurn = () => `Player: ${currentPlayer}`;
statusEl.innerHTML = currentPlayerTurn();

const Play = (e) => {
  const cell = e.target;
  const index = parseInt(cell.dataset.cell);

  if (gameState[index] !== "" || !gameActive) return;
  gameState[index] = currentPlayer;
  cell.innerHTML = currentPlayer;
  Validate();
};

const Validate = () => {
  let roundWon = false;

  for (let i = 0; i <= 7; i++) {
    const winner = winning[i];
    const a = gameState[winner[0]],
      b = gameState[winner[1]],
      c = gameState[winner[2]];

    if (a === "" || b === "" || c === "") continue;
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusEl.innerHTML = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusEl.innerHTML = "Draw!";
    gameActive = false;
    return;
  }

  currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
  statusEl.innerHTML = currentPlayerTurn();
};

const Restart = () => {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusEl.innerHTML = currentPlayerTurn();
  cellEls.forEach((cell) => (cell.innerHTML = ""));
};

cellEls.forEach((cellEl) => (cellEl.onclick = Play));
restartEl.onclick = Restart;
