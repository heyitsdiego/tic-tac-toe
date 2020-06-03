//show draw ----DONE
//make sure the reset function resets the players names
//prob need a start game function too -----DONE
//adjust the symbol colors for each player
//adjust the background colors for winning strike

const setEventListeners = (documentMethod, domElement, functionToAdd) => {
  if (documentMethod == 'querySelectorAll') {
    const nodeList = document.querySelectorAll(`${domElement}`);
    nodeList.forEach((element)=> {
      element.addEventListener('click', functionToAdd)
    })
  }
  if (documentMethod == 'querySelector') {
    const node = document.querySelector(`${domElement}`);
    node.addEventListener('click', functionToAdd)
  }
    if (documentMethod == 'getElementById') {
    const node = document.getElementById(`${domElement}`);
    node.addEventListener('click', functionToAdd)
  }
}

//PLAYERS

const playersFactory = (name, symbol, type) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  const isHuman = () => type;
  return {
      getName,
      getSymbol,
      isHuman,
  };
};


// ********************************

const gameModule = (() => {

  let playerX = playersFactory("Player X", "X", true);
  let playerO = playersFactory("Player O", "O", true);
  const arrPlayers = [playerX, playerO];
  let activePlayer = playerX;
  let gameActive = true;
  let gameTypeHuman = true;
  if (activePlayer === playerX) {
    console.log('yes')
  }


  const toggleGameType = () => {
    if (gameTypeHuman) {
      gameTypeHuman = false;
    }
    else if (!gameTypeHuman) {
      gameTypeHuman = true;
    }
  }

  const toggleGameActive = () => {
    if (gameActive) {
      gameActive = false;
    }
    else if (!gameActive) {
      gameActive = true;
    }
  }

  
  const getActivePlayer = () => activePlayer;

  const setActivePlayer = (name,symbol) => {
    activePlayer.name = name;
    activePlayer.symbol = symbol;
  }


 /* 
Function startGame
	Run Function to Render Board --done
	Run Function to set event listeners --to build
	Run Function to set game type--to build 
	Run Function to set Players – user default paremeters--to build
	If active player is computer > Run computer move Function--to build
*/
const toggleActivePlayer = () => {
  console.log('hi there from toggle')
  if (activePlayer === playerX) {
    console.log('active player is X')
    activePlayer = playerO
  }
  else if (activePlayer === playerO) {
    console.log('is this on?')
    activePlayer = playerX
  }
  if (activePlayer.isHuman() === false) {
    computerMove()
  }
}


const displayGameOutcome = () => {
  const outcomeDisplay = document.querySelector('.outcome-display');
  outcomeDisplay.innerText = `${activePlayer.getName()} Wins!`
  outcomeDisplay.style.display = 'block'
}

const playRound = (e) => {
  if(e.target.innerText != '') return;
  e.target.innerText = activePlayer.getSymbol()
  gameOutcome();
  toggleActivePlayer();
}

  const startGame = () => {
    gameboardModule.renderGameBoard();
    setEventListeners('querySelectorAll', '.square', playRound)
    // setEventListeners(classs, event, functionn);
    // createPlayers()
    // if (!activePlayer.human()) {
    //   computerMove()
    // }
  }

  const stopGame = () => {
    const clear = document.querySelectorAll('.square')
        clear.forEach((square) => {
          square.removeEventListener("click", playRound);
        })
  }

  const gameOutcome = () => {
    const arrayofCombinations = [ [0,3,1], [3,6,1], [6,9,1], [0,7,3], [1,8,3], 
    [2,9,3], [0,9,4], [2,7,2] ];
    const arrayofSquares = document.querySelectorAll('.square');

    arrayofCombinations.forEach(element=> {
      let xCount = 0;
      let oCount = 0;
      for (let i = element[0]; i < element[1]; i+= element[2]) {
        if (arrayofSquares[i].innerText === 'X') {
          xCount += 1
        }
        else if (arrayofSquares[i].innerText === 'O') {
          oCount +=1
        }
      }
      if (xCount == 3 || oCount == 3) {
        stopGame();
        displayGameOutcome()
      }
    })
  }
  return {startGame, gameOutcome, activePlayer}
})();






/*  GAME BOARD MODULE  ----------------------------*/

const gameboardModule = (() => {
  const gameBoard = [
    {square: 1},
    {square: 2},
    {square: 3},
    {square: 4},
    {square: 5},
    {square: 6},
    {square: 7},
    {square: 8},
    {square: 9},
  ]
  const renderGameBoard = () => {
    gameBoard.forEach(element => {
      const square = document.createElement('div');
      square.setAttribute('id', `sq${element.square}`)
      square.setAttribute('class', 'square')
      const container = document.querySelector('.board-squares')
      container.appendChild(square)
    });
  }
  const gameboardClear = () => {
    const clear = document.querySelectorAll('.square')
    const outcomeDisplay = document.querySelector('.outcome-display');
    outcomeDisplay.style.display = 'none'
    clear.forEach((square) => {
    square.innerText = "";
    square.style.removeProperty('background-color');
    })
  }

  return {renderGameBoard, gameboardClear}
})();
































//if the square is full dont do anythng

// }

// const resetButton = document.querySelector('.reset-game');
// resetButton.addEventListener('click', game.reset);

// function settingss() {
//   const a = document.querySelector('.board-squares')
//   const b = document.querySelector('.settings')
//   a.style.display = 'none'
//   b.className = "settings-active";
// }

// function showAISettings() {
//   let a = document.querySelector('.mode-settings-friends')
//   let b = document.querySelector('.ai-mode')
//   a.style.display = 'none'
//   b.style.display = 'block'
// }

// function showFriends() {
//   let a = document.querySelector('.mode-settings-friends')
//   let b = document.querySelector('.ai-mode')
//   a.style.display = 'block'
//   b.style.display = 'none'
// }

// function cancelSettings() {
//   const a = document.querySelector('.settings-active')
//   const b = document.querySelector('.board-squares')
//   a.className = "settings";
//   b.style.display = 'grid'
// }

// function saveSettings() {
//   let a = document.getElementById('human-player-x')
//   let b = document.getElementById('human-player-o')
//   if (a.value === "") {
//     a = 'Player X'
//   }
//   else {
//     document.getElementById('X').innerText = a.value
//     game.players.playerX.name = a.value
//   }
//   if (b.value == "") {
//     b = 'Player O'
//     console.log('its also empty')
//   }
//   else {
//     document.getElementById('O').innerText = b.value
//     game.players.playerO.name = b.value
//   }
//   a.value = ""
//   b.value = ""
//   cancelSettings()
// }

// const settings = document.querySelector('.game-settings')
// settings.addEventListener('click', settingss)

// const cancel = document.getElementById('cancel');
// cancel.addEventListener('click', cancelSettings)

// const friendsSettings = document.querySelector('.against-friend')
// friendsSettings.addEventListener('click', showFriends)

// const AIsettings = document.querySelector('.against-ai')
// AIsettings.addEventListener('click', showAISettings)

// const startGame = document.querySelector('.game-start')
// startGame.addEventListener('click', game.playAgain)

// const saveButton = document.getElementById('save')
// saveButton.addEventListener('click', saveSettings)



// function computerMove() {
//   const squares = Array.from(document.querySelectorAll(".square"));
//   let emptySquares = squares.filter(function (e) {
//     return e.innerText == "";
//   });
//   let index = Math.floor(Math.random() * emptySquares.length)
//   emptySquares[index].innerText = 'X'
//   game.turnCounter++
// }
gameModule.startGame()
