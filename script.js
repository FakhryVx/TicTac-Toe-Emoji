const board = document.getElementById('board');
const resetBtn = document.getElementById('reset');
const alertDiv = document.getElementById('alert');
const xScoreSpan = document.getElementById('x-score');
const oScoreSpan = document.getElementById('o-score');
let turn = 'X';
let cells = Array(9).fill(null);
let xScore = 0;
let oScore = 0;
const images = {
    X: 'x.png',
    O: 'o.png'
};

function renderBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        if (cells[i]) {
            const img = document.createElement('img');
            img.src = images[cells[i]];
            img.alt = cells[i];
            cell.appendChild(img);
        }
        cell.addEventListener('click', handleClick, { once: true });
        board.appendChild(cell);
    }
    showAlert('Giliran: ' + turn);
    updateScore();
}

function showAlert(msg) {
    alertDiv.textContent = msg;
}

function updateScore() {
    xScoreSpan.textContent = xScore;
    oScoreSpan.textContent = oScore;
}

function handleClick(e) {
    const idx = e.currentTarget.dataset.index;
    if (!cells[idx]) {
        cells[idx] = turn;
        renderBoard();
        if (checkWinner(turn)) {
            showAlert(turn + ' menang!');
            if (turn === 'X') xScore++;
            else oScore++;
            setTimeout(resetGame, 1200);
        } else if (cells.every(cell => cell)) {
            showAlert('Seri!');
            setTimeout(resetGame, 1200);
        } else {
            turn = turn === 'X' ? 'O' : 'X';
            showAlert('Giliran: ' + turn);
        }
    }
}

function checkWinner(player) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return winPatterns.some(pattern =>
        pattern.every(idx => cells[idx] === player)
    );
}

function resetGame() {
    cells = Array(9).fill(null);
    turn = 'X';
    renderBoard();
}

resetBtn.onclick = resetGame;
renderBoard();