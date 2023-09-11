// Set game board module, loop through array and display on DOM

const ticTacToe = (function () {
  const X_CLASS = 'x';
  const CIRCLE_CLASS = 'circle';
  let cellElements;
  const overlay = document.querySelector('.overlay');

  const WIN_CONDITIONS = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row

    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column

    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6], // Diagonal from top-right to bottom-left
  ];

  const gameBoard = Array(9).fill('');
  const boardEl = document.getElementById('board');
  const winningMessageTextElement = document.getElementById('winning-text');
  let passedCheck = null;
  let circleTurn;
  const playersEl = document.getElementById('playersEl');
  const playerTurnBox1 = playersEl.children[1];
  const playerTurnBox2 = playersEl.children[2];

  let setGameBoard = () => {
    const backBtnEl = document.getElementById('backBtn');

    boardEl.classList.add(X_CLASS);
    utils.addRemoveClass(playersEl, 'remove', 'd-none');
    // playersEl.classList.remove('d-none');
    utils.addRemoveClass(backBtnEl, 'remove', 'd-none');
    // backBtnEl.classList.remove('d-none');
    utils.addRemoveClass(backBtnEl, 'add', 'd-flex');
    // backBtnEl.classList.add('d-flex');
    hideUsers(true);
    displayGameBoard(true);

    boardEl.innerHTML = '';

    gameBoard.forEach((cell) => {
      let div = document.createElement('div');
      div.classList.add('cell');
      div.dataset.cell = '';
      boardEl.appendChild(div);
    });
    cellElements = document.querySelectorAll('[data-cell]');

    createPlayers();
  };

  function displayGameBoard(show) {
    if (show) {
      boardEl.classList.remove('d-none');
    } else {
      boardEl.classList.add('d-none');
      hideUsers(false);
    }
  }

  function hideUsers(hide) {
    const mainContainerEl = document.getElementById('mainContainerEl');
    if (hide) {
      mainContainerEl.classList.add('d-none');
      mainContainerEl.classList.remove('d-flex');
    } else {
      mainContainerEl.classList.add('d-flex');
      mainContainerEl.classList.remove('d-none');
    }
  }

  function createPlayers() {
    const playerInput = document.querySelectorAll('.playerInput');

    if (
      playerInput[0].value.trim() === '' ||
      playerInput[1].value.trim() === ''
    ) {
      passedCheck = false;
      alert('Please input a name.');
    } else {
      // Targets first
      playersEl.children[1].firstElementChild.textContent =
        utils.capitalizeFirstLetter(playerInput[0].value);
      playersEl.children[2].firstElementChild.textContent =
        utils.capitalizeFirstLetter(playerInput[1].value);
      passedCheck = true;
    }
  }

  function init() {
    setUpListeners();
  }

  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  function handleClick(cell) {
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    if (
      cell.classList.contains(X_CLASS) ||
      cell.classList.contains(CIRCLE_CLASS)
    ) {
      // Cell is already occupied; do nothing.
      return;
    }
    // else if (
    //   boardEl.classList.contains(X_CLASS) &&
    //   cell.dataset.cell !== true
    // ) {
    //   cell.dataset.cell = true;
    //   cell.classList.add(X_CLASS);
    // } else if (
    //   boardEl.classList.contains(CIRCLE_CLASS) &&
    //   cell.dataset.cell !== true
    // ) {
    //   cell.dataset.cell = true;
    //   cell.classList.add(CIRCLE_CLASS);
    // }
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else changeTurn();
  }

  function isDraw() {
    return [...cellElements].every((cell) => {
      return (
        cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
      );
    });
  }

  function checkWin(currentClass) {
    return WIN_CONDITIONS.some((combinations) => {
      return combinations.every((index) => {
        return cellElements[index].classList.contains(currentClass);
      });
    });
  }

  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Draw!';
    } else {
      winningMessageTextElement.innerText = `${
        circleTurn ? "O's" : "X's"
      } Win!`;
    }
    overlay.classList.remove('d-none');
    overlay.classList.add('d-flex');
  }

  function changeTurn() {
    // If board contains x, remove x and add circle, if circle, remove circle and add x. 2 toggles? Definitely more efficient ways of doing this but it works

    // if (boardEl.classList.contains(X_CLASS)) {
    //   boardEl.classList.remove(X_CLASS);
    //   boardEl.classList.add(CIRCLE_CLASS);
    // } else if (boardEl.classList.contains(CIRCLE_CLASS)) {
    //   boardEl.classList.remove(CIRCLE_CLASS);
    //   boardEl.classList.add(X_CLASS);
    // }

    circleTurn = !circleTurn;
    checkPlayerTurn();
  }

  function checkPlayerTurn() {
    if (circleTurn) {
      playerTurnBox1.classList.add('border-active');
      playerTurnBox2.classList.remove('border-active');
      // playerTurnBox1.style.border = '0.25rem solid black';
      // playerTurnBox1.style.borderRadius = '10px';
      // playerTurnBox2.style.border = '';
    } else {
      playerTurnBox2.classList.add('border-active');
      playerTurnBox1.classList.remove('border-active');
      // playerTurnBox2.style.border = '0.25rem solid black';
      // playerTurnBox2.style.borderRadius = '10px';
      // playerTurnBox1.style.border = '';
    }
  }

  function restartGame() {
    overlay.classList.toggle('d-none');
    overlay.classList.toggle('d-flex');

    cellElements.forEach((cell) => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(CIRCLE_CLASS);
    });

    playerTurnBox1.classList.remove('border-active');
    playerTurnBox2.classList.remove('border-active');
  }

  function setUpListeners() {
    const startBtn = document.getElementById('start');
    const restartBtn = document.getElementById('restart');
    const backBtn = document.getElementById('backBtn');

    backBtn.addEventListener('click', () => {
      displayGameBoard(false);
      utils.addRemoveClass(playersEl, 'add', 'd-none');
      utils.addRemoveClass(backBtn, 'add', 'd-none');
    });

    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      createPlayers();
      if (passedCheck) {
        setGameBoard();
      }
      playerTurnBox2.classList.remove('border-active');
      playerTurnBox1.classList.remove('border-active');
    });

    restartBtn.addEventListener('click', restartGame);

    // BOARD CLICKS EVENT DELEGATION
    boardEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) {
        handleClick(e.target);
      }
    });
  }

  return {
    init,
  };
})();

// Factory function to create players using input?

// On START click, remove elements except for gameBoard.

// Check which player's turn it is, place marker by adding .x or .circle to a specific cell.

// Check win conditions every click, if no win con, draw.

const utils = (function utilities() {
  function capitalizeFirstLetter(str) {
    if (!str || typeof str !== 'string') {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function addRemoveClass(element, addOrRemove, className) {
    if (addOrRemove === 'add') {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }

  return { capitalizeFirstLetter, addRemoveClass };
})();

document.addEventListener('DOMContentLoaded', function () {
  ticTacToe.init();
});
