// Set game board module, loop through array and display on DOM


// GAMEBOARD FACTORY FUNCTION

const GameBoard = (() => {

  const Config = {
    X_CLASS: 'x',
    CIRCLE_CLASS: 'circle',
    circleTurn: undefined,
    WIN_CONDITIONS: [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row

      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column

      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ]
  };

  const board = Array(9).fill('');
  const winningMessageTextElement = document.getElementById('winning-text');


  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Draw!';
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"
        } Win!`;
    }
    overlay.classList.remove('d-none');
    overlay.classList.add('d-flex');
  }

  function changeTurn() {
    Config.circleTurn = !Config.circleTurn;
    console.log(Config.circleTurn)
    GameUI.playerTurnBorders();
  }

  // CHECK FOR DRAW

  // CHECK FOR WIN

  // CHECK FOR END GAME

  return {

    getBoard() {
      return [...board]
    },

    handleClick(cell) {
      const CIRCLE_CLASS = Config.CIRCLE_CLASS
      const X_CLASS = Config.X_CLASS

      const currentClass = Config.circleTurn ? CIRCLE_CLASS : X_CLASS;
      console.log(currentClass)
      // GUARD CLAUSE TO PREVENT CLICKING TWICE ON A CELL
      if (
        cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
      ) {
        // Cell is already occupied; do nothing.
        return;
      }

      placeMark(cell, currentClass);
      changeTurn()
      // if (checkWin(currentClass)) {
      //   endGame(false);
      // } else if (isDraw()) {
      //   endGame(true);
      // } else changeTurn();
    },

    createUser(name) {
      return { name }
    },

    resetBoard() {
      cellElements.forEach((cell) => {
        cell.classList.remove(Config.X_CLASS);
        cell.classList.remove(Config.CIRCLE_CLASS);
      });

      GameUI.restartGame()
    },


  }

})();



const GameUI = (() => {
  const overlay = document.querySelector('.overlay');
  const boardEl = document.getElementById('board');
  let usersCreated = null;
  const playersEl = document.getElementById('playersEl');
  const playerTurnBox1 = playersEl.children[1];
  const playerTurnBox2 = playersEl.children[2];
  const cellElements = document.querySelectorAll('[data-cell]');
  const backBtnEl = document.getElementById('backBtn');


  // PRIVATE FUNCTIONS



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

  function displayGameBoard(show) {
    if (show) {
      boardEl.classList.remove('d-none');
    } else {
      boardEl.classList.add('d-none');
      hideUsers(false);
    }
  }

  // ONLY RETURN PUBLIC FUNCCTIONS
  return {

    // I return this object because I use it on line 46 inside GameBoard module
    restartGame() {
      overlay.classList.toggle('d-none');
      overlay.classList.toggle('d-flex');
      playerTurnBox1.classList.remove('border-active');
      playerTurnBox2.classList.remove('border-active');
    },

    // Required in GameBoard module
    createPlayers() {
      const playerInput = document.querySelectorAll('.playerInput');

      if (
        playerInput[0].value.trim() === '' ||
        playerInput[1].value.trim() === ''
      ) {
        usersCreated = false;
        alert('Please fill both fields.');
      } else {

        const player1 = GameBoard.createUser(playerInput[0].value)
        const player2 = GameBoard.createUser(playerInput[1].value)

        // Targets first
        playersEl.children[1].firstElementChild.textContent = utils.capitalizeFirstLetter(player1.name)
        playersEl.children[2].firstElementChild.textContent = utils.capitalizeFirstLetter(player2.name)
        usersCreated = true;
      }
    },

    // Required in GameBoard module
    setGameBoard() {
      boardEl.classList.add(GameBoard.X_CLASS);
      utils.addRemoveClass(playersEl, 'remove', 'd-none');
      utils.addRemoveClass(backBtnEl, 'remove', 'd-none');
      utils.addRemoveClass(backBtnEl, 'add', 'd-flex');
      hideUsers(true);
      displayGameBoard(true);

      boardEl.innerHTML = '';

      const board = GameBoard.getBoard()

      board.forEach((cell) => {
        let div = document.createElement('div');
        div.classList.add('cell');
        div.dataset.cell = '';
        boardEl.appendChild(div);
      });

      GameUI.createPlayers();
    },

    // Required in GameBoard module
    playerTurnBorders() {
      if (circleTurn) {
        playerTurnBox1.classList.add('border-active');
        playerTurnBox2.classList.remove('border-active');
      } else {
        playerTurnBox2.classList.add('border-active');
        playerTurnBox1.classList.remove('border-active');
      }
    },

    // Invoked in DOMContentLoaded listener function
    setUpListeners() {
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
        GameUI.createPlayers();
        if (usersCreated) {
          GameUI.setGameBoard();
        }
        playerTurnBox2.classList.remove('border-active');
        playerTurnBox1.classList.remove('border-active');
      });

      restartBtn.addEventListener('click', GameBoard.resetBoard);

      // BOARD CLICKS EVENT DELEGATION
      boardEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
          GameBoard.handleClick(e.target);
        }
      });
    },

  }

})()





const utils = (function () {
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
  GameUI.setUpListeners();
});
