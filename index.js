const cells = document.querySelectorAll(".cases");
const statut = document.querySelector("#statut");
const restartBtn = document.querySelector("#restartButton");
const winConditions = [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cases => cases.addEventListener("click", casesClick));
    restartBtn.addEventListener("click", restartGame);
    statut.textContent = `Au tour de ${currentPlayer}`;
    running = true;
}

function casesClick() {
    const casesIndex = this.getAttribute("tabindex");

    if (options[casesIndex] != "" || !running) {
        return;
    }

    updateCell(this, casesIndex);
    checkWinner();
}

function updateCell(cases, index) {
    options[index] = currentPlayer;
    cases.textContent = currentPlayer;

    if(currentPlayer == "X"){
        cases.classList.add("playerX");
    } else {
        cases.classList.add("playerO");
    }
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? "O" : "X";
    statut.textContent = `Au tour de ${currentPlayer}`;
}

function checkWinner() {
    let won = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            won = true
            break;
        }
    }
    if (won == true) {
        statut.textContent = `${currentPlayer} a gagné`
        running = false;
    } else if (!options.includes("")) {
        statut.textContent = 'Égalité'
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statut.textContent = `Au tour de ${currentPlayer}`
    cells.forEach(cases => {
        cases.textContent = "";
        cases.classList.remove("playerX", "playerO");
    });
    running = true;
}