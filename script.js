//Player factory
const playerFactory = (name, symbol, type) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  const isHuman = () => type;
  return {
      getName,
      getSymbol,
      isHuman,
  };
};


// Game Module
const gameModule = (() => {

  let gameActive = true;
  let turnCounter = 0;
  let gameTypeHuman = true;
  let playerX = playerFactory("Player X", "X", true);
  let playerO = playerFactory("Player O", "O", true);
  let activePlayer = playerX;

  const arrayofCombinations = 
  [[0,3,1], [3,6,1], [6,9,1], [0,7,3], [1,8,3], [2,9,3], [0,9,4], [2,7,2]];
  const gameBoard = document.querySelector('.board-squares')
  const gameSettings = document.getElementById('game-settings')
  const playerXNameDisplay = document.getElementById("player-x-name");
  const playerONameDisplay = document.getElementById("player-o-name");
  const friendsModeDisplay = document.querySelector('.friends-mode')
  const aiModeDisplay = document.querySelector('.ai-mode')
  const humanPlayerXNameField = document.getElementById('human-player-x')
  const humanPlayerONameField = document.getElementById('human-player-o')
  const outcomeDisplay = document.querySelector('.outcome-display');


  const play = () => {
    turnCounter = 0;
    gameActive = true;
    activePlayer = playerX
    gameboardModule.gameboardClear()
    const squareNodeList = document.querySelectorAll('.square')
    squareNodeList.forEach((square) => {
      square.addEventListener("click", playRound);
    })
  }

  const displaySettings = () => {
    gameBoard.style.display = 'none'
    gameSettings.className = "game-settings-active";
  }

  const reset = () => {
    turnCounter = 0;
    gameActive = true;
    playerX = playerFactory('Player X', "X", true);
    playerO = playerFactory('Player O', "O", true);
    activePlayer = playerX;
    playerXNameDisplay.innerText = playerX.getName()
    playerONameDisplay.innerText = playerO.getName()
    gameboardModule.gameboardClear()
    const squareNodeList = document.querySelectorAll('.square')
    squareNodeList.forEach((square) => {
      square.addEventListener("click", playRound);
    })
  }
  
  const showAISettings = () => {
    friendsModeDisplay.style.display = 'none'
    aiModeDisplay.style.display = 'block'
  }
  
  const showFriends = () => {
    friendsModeDisplay.style.display = 'block'
    aiModeDisplay.style.display = 'none'
  }
  
  const cancelSettings = () => {
    gameSettings.className = "game-settings-none";
    gameBoard.style.display = 'grid'
  }
  
  const saveSettings = () => {
    let nameX = "";
    let nameO = "";
      if (humanPlayerXNameField.value === "") {
        nameX = 'Player X'
      }
      else {
      nameX = humanPlayerXNameField.value
      }
      if (humanPlayerONameField.value == "") {
        nameO = 'Player O'
      }
      else {
        nameO = humanPlayerONameField.value
      }
      playerX = playerFactory(nameX, "X", true);
      playerO = playerFactory(nameO, "O", true);
      playerXNameDisplay.innerText = nameX + ' X'
      playerONameDisplay.innerText = nameO + ' O'
      activePlayer = playerX;
      cancelSettings()
  }

  const startGame = () => {
    gameboardModule.renderGameBoard();
    setEventListeners()
  }


  // const toggleGameType = () => {
  //   if (gameTypeHuman) {
  //     gameTypeHuman = false;
  //   }
  //   else if (!gameTypeHuman) {
  //     gameTypeHuman = true;
  //   }
  // }

  const toggleGameActive = () => {
    if (gameActive) {
      gameActive = false;
    }
    else if (!gameActive) {
      gameActive = true;
    }
  }

  const toggleActivePlayer = () => {
    if (activePlayer === playerX) {
      activePlayer = playerO
    }
    else if (activePlayer === playerO) {
      activePlayer = playerX
    }
    if (activePlayer.isHuman() === false) {
      computerMove()
    }
  }

  const displayGameOutcome = (outcome) => {
  if (outcome === 'Draw!') {
    outcomeDisplay.innerText = 'Draw!'
  }
  else {
    outcomeDisplay.innerText = activePlayer.getName() + ' Wins!';
  }
  outcomeDisplay.style.display = 'block'
}

// 
  const playRound = (element) => {
    if (element.target.innerText != '') return;
    element.target.innerText = activePlayer.getSymbol()
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
    const arrayofSquares = document.querySelectorAll('.square');
    arrayofCombinations.forEach(array=> {
      let xCount = 0;
      let oCount = 0;
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
        displayGameOutcome('Draw!')
      }
    })
  }

  const setEventListeners = () => {
    const settings = document.querySelector('.settings');
    settings.addEventListener('click', displaySettings)
    const cancel = document.getElementById('cancel-button');
    cancel.addEventListener('click', cancelSettings)
    const friendsSettings = document.querySelector('.friends-mode')
    friendsSettings.addEventListener('click', showFriends)
    const AIsettings = document.querySelector('.ai-mode')
    AIsettings.addEventListener('click', showAISettings)
    const startGames = document.querySelector('.start-game')
    startGames.addEventListener('click', play)
    const saveButton = document.getElementById('save-button')
    saveButton.addEventListener('click', saveSettings)
    const resetButton = document.querySelector('.reset-game');
    resetButton.addEventListener('click', reset);
    const boardSquares = document.querySelectorAll('.square');
    boardSquares.forEach(square => square.addEventListener('click', playRound))
  }

  return {startGame}
})();


// Game Board Module
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
  const outcomeDisplay = document.querySelector('.outcome-display');

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
    outcomeDisplay.style.display = 'none'
    clear.forEach((square) => {
    square.innerText = "";
    square.style.removeProperty('background-color');
    })
  }

  return {renderGameBoard, gameboardClear}
})();

gameModule.startGame()



























