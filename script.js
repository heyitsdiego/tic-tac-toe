//make sure the reset function resets the players names
//prob need a start game function too -----DONE
//adjust the symbol colors for each player
//adjust the background colors for winning strike







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

// GAME MODULE ************************
const gameModule = (() => {

const settingss = () => {
    const a = document.querySelector('.board-squares')
    const b = document.querySelector('.settings')
    a.style.display = 'none'
    b.className = "settings-active";
  }
const reset = () => {
    const a = document.querySelector('.board-squares')
    const b = document.querySelector('.settings')
    a.style.display = 'none'
    b.className = "settings-active";
  }
  
const showAISettings = () => {
    let a = document.querySelector('.mode-settings-friends')
    let b = document.querySelector('.ai-mode')
    a.style.display = 'none'
    b.style.display = 'block'
  }
  
const showFriends = () => {
    let a = document.querySelector('.mode-settings-friends')
    let b = document.querySelector('.ai-mode')
    a.style.display = 'block'
    b.style.display = 'none'
  }
  
const cancelSettings = () => {
    const a = document.querySelector('.settings-active')
    const b = document.querySelector('.board-squares')
    a.className = "settings";
    b.style.display = 'grid'
  }
  
const saveSettings = () => {
  let nameX = "";
  let nameO = "";
    let a = document.getElementById('human-player-x')
    let b = document.getElementById('human-player-o')
    if (a.value === "") {
      nameX = 'Player X'
    }
    else {
     nameX = a.value
    }
    if (b.value == "") {
      nameO = 'Player O'
    }
    else {
      nameO = b.value
    }
    let playerX = playersFactory(nameX, "X", true);
    let playerO = playersFactory(nameO, "O", true);
    document.getElementById('X').innerText = nameX
    document.getElementById('O').innerText = nameO
    cancelSettings()
  }

  const startGame = () => {
    gameboardModule.renderGameBoard();
    setEventListeners('querySelectorAll', '.square', playRound)
    // if (!activePlayer.human()) {
    //   computerMove()
    // }
  }

  let turnCounter = 0;
  let playerX = playersFactory("Player X", "X", true);
  let playerO = playersFactory("Player O", "O", true);
  let activePlayer = playerX;
  let gameActive = true;
  let gameTypeHuman = true;
  if (activePlayer === playerX) {
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
	Run Function to set event listeners --done
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


const displayGameOutcome = (outcome) => {

  const outcomeDisplay = document.querySelector('.outcome-display');
  if (outcome === 'Draw!') {
    outcomeDisplay.innerText = 'Draw!'
  }
  else {
    outcomeDisplay.innerText = outcome + 'Wins!';
  }
  outcomeDisplay.style.display = 'block'
}

const playRound = (e) => {
  if(e.target.innerText != '') return;
  e.target.innerText = activePlayer.getSymbol()
  gameOutcome();
  toggleActivePlayer();
}

  const stopGame = () => {
    toggleGameActive()
    const clear = document.querySelectorAll('.square')
    clear.forEach((square) => {
      square.removeEventListener("click", playRound);
    })
  }

  const gameOutcome = () => {
    turnCounter +=1;
    const arrayofCombinations = 
    [ [0,3,1], [3,6,1], [6,9,1], [0,7,3], [1,8,3], [2,9,3], [0,9,4], [2,7,2] ];
  
    const arrayofSquares = document.querySelectorAll('.square');
    arrayofCombinations.forEach(array=> {
      let xCount = 0;
      let oCount = 0;
      //for block
      for (let i = array[0]; i < array[1]; i+= array[2]) {
        if (arrayofSquares[i].innerText === 'X') {
          xCount += 1
        }
        else if (arrayofSquares[i].innerText === 'O') {
          oCount +=1
        }
      }

      if (xCount == 3 || oCount == 3) {
        stopGame();
        displayGameOutcome(activePlayer.getName())
      }
      else if (turnCounter == 9 && gameActive == true) {
        console.log('apple')
        displayGameOutcome('Draw!')
      }
    })
  //END of forEach
  }
  return {startGame, gameOutcome, activePlayer, settingss, showAISettings, 
        showFriends, cancelSettings, saveSettings}
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



const settingss = document.querySelector('.game-settings')
settingss.addEventListener('click', gameModule.settingss)

const cancel = document.getElementById('cancel');
cancel.addEventListener('click', gameModule.cancelSettings)

const friendsSettings = document.querySelector('.against-friend')
friendsSettings.addEventListener('click', gameModule.showFriends)

const AIsettings = document.querySelector('.against-ai')
AIsettings.addEventListener('click', gameModule.showAISettings)

const startGames = document.querySelector('.game-start')
startGames.addEventListener('click', gameboardModule.gameboardClear)

const saveButton = document.getElementById('save')
saveButton.addEventListener('click', gameModule.saveSettings)

const resetButton = document.querySelector('.reset-game');
resetButton.addEventListener('click', gameModule.reset);


gameModule.startGame()
































// function computerMove() {
//   const squares = Array.from(document.querySelectorAll(".square"));
//   let emptySquares = squares.filter(function (e) {
//     return e.innerText == "";
//   });
//   let index = Math.floor(Math.random() * emptySquares.length)
//   emptySquares[index].innerText = 'X'
//   game.turnCounter++
// }




// const setEventListeners = (documentMethod, domElement, functionToAdd) => {
//   if (documentMethod == 'querySelectorAll') {
//     const nodeList = document.querySelectorAll(`${domElement}`);
//     nodeList.forEach((element)=> {
//       element.addEventListener('click', functionToAdd)
//     })
//   }
//   if (documentMethod == 'querySelector') {
//     const node = document.querySelector(`${domElement}`);
//     node.addEventListener('click', functionToAdd)
//   }
//     if (documentMethod == 'getElementById') {
//     const node = document.getElementById(`${domElement}`);
//     node.addEventListener('click', functionToAdd)
//   }
// }
