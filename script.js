//show draw ----DONE
//make sure the reset function resets the players names
//prob need a start game function too -----DONE
//adjust the symbol colors for each player
//adjust the background colors for winning strike

 // plays the game-checks for winner-stops the game-displays winner-resets the game
//  sets players names-
const game = {
  gameBoard: [
    {square: 1},
    {square: 2},
    {square: 3},
    {square: 4},
    {square: 5},
    {square: 6},
    {square: 7},
    {square: 8},
    {square: 9},
  ],
  players: {
    playerX: {
      name: "Player X",
      symbol: 'X',
      color: 'green'
    },
    playerO: {
      name: "Player O",
      symbol: 'O',
      color: 'red'
    }
  },
  playAgain() {
    const clear = document.querySelectorAll('.square')
    const outcomeDisplay = document.querySelector('.outcome-display');
    outcomeDisplay.style.display = 'none'
    clear.forEach((square) => {
    square.innerText = "";
    square.style.removeProperty('background-color');
    square.addEventListener('click', game.playGame)
    game.turnCounter = 1
    })
  },

  check(stepStart,limit, stepPlus, checkNumber) {
    const array = document.querySelectorAll('.square')
    let xCount = 0
    let oCount = 0

      for (let step = stepStart; step < limit; step+= stepPlus) {
        if (array[step].innerText === 'X') {
            xCount +=1

        }   
        else if (array[step].innerText === 'O') {
          oCount +=1
        }
      }

      if (xCount == 3) {
        for (let step = stepStart; step < limit; step+= stepPlus) {
          array[step].style.backgroundColor = 'purple'
        }
        this.winnerCounter +=1;
        game.stopGame('X', game.players.playerX.name)
      }
      else if (oCount == 3) {
        for (let step = stepStart; step < limit; step+= stepPlus) {
          array[step].style.backgroundColor = 'yellow'
        }
        this.winnerCounter +=1;
        game.stopGame('O', game.players.playerO.name)
      }

      if (game.turnCounter == 10 && checkNumber == 8 && game.winnerCounter == 0) {
        console.log(game.turnCounter, checkNumber)
        if (xCount < 3 && oCount < 3) {
          console.log(xCount, oCount)
          game.stopGame('DRAW!')
        }
      }

   
    },

    stopGame(e, playerName) {
      const outcomeDisplay = document.querySelector('.outcome-display');
      if (e == 'DRAW!') {
        outcomeDisplay.innerText = `${e}`
      }
      else {
        outcomeDisplay.innerText = `${playerName} Wins!`
      }
      outcomeDisplay.style.display = 'block'
      const clear = document.querySelectorAll('.square')
      clear.forEach((square) => {
        square.removeEventListener("click", game.playGame);
      })
    },

  turnCounter: 1,
  winnerCounter: 0,

  gameOutcome() {

  },

  playGame(e) {
    if(e.target.innerText != '') return;//if the square is full dont do anythng

    if ((game.turnCounter%2) != 0) {
      e.target.innerText = 'X'
      game.turnCounter += 1;
    }
    else if (game.turnCounter%2 == 0) {
      e.target.innerText = 'O'
      game.turnCounter += 1;
    }
      //horizontal check
      game.check(0,3,1,1)
      game.check(3,6,1,2)
      game.check(6,9,1,3)
      //vertical check
      game.check(0,7,3,4)
      game.check(1,8,3,5)
      game.check(2,9,3,6)
      //diagonal check
      game.check(0,9,4,7)
      game.check(2,7,2,8)
  },

  reset() {
    game.playAgain()
    const a = document.getElementById('X')
    const b = document.getElementById('O')
    a.innerText = 'Player X'
    b.innerText = 'Player O'
  },

  render() {
    this.gameBoard.forEach(object => {
      const square = document.createElement('div');
      square.setAttribute('id', `sq${object.square}`)
      square.setAttribute('class', 'square')
      square.addEventListener('click', this.playGame)
      const container = document.querySelector('.board-squares')
      container.appendChild(square)
    });
  }
}
game.render()

const resetButton = document.querySelector('.reset-game');
resetButton.addEventListener('click', game.reset);

function settingss() {
  const a = document.querySelector('.board-squares')
  const b = document.querySelector('.settings')
  a.style.display = 'none'
  b.className = "settings-active";
}

function showAISettings() {
  let a = document.querySelector('.mode-settings-friends')
  let b = document.querySelector('.ai-mode')
  a.style.display = 'none'
  b.style.display = 'block'
}

function showFriends() {
  let a = document.querySelector('.mode-settings-friends')
  let b = document.querySelector('.ai-mode')
  a.style.display = 'block'
  b.style.display = 'none'
}

function cancelSettings() {
  const a = document.querySelector('.settings-active')
  const b = document.querySelector('.board-squares')
  a.className = "settings";
  b.style.display = 'grid'
}

function saveSettings() {
  let a = document.getElementById('human-player-x')
  let b = document.getElementById('human-player-o')
  if (a.value === "") {
    a = 'Player X'
  }
  else {
    document.getElementById('X').innerText = a.value
    game.players.playerX.name = a.value
  }
  if (b.value == "") {
    b = 'Player O'
    console.log('its also empty')
  }
  else {
    document.getElementById('O').innerText = b.value
    game.players.playerO.name = b.value
  }
  a.value = ""
  b.value = ""
  cancelSettings()
}

const settings = document.querySelector('.game-settings')
settings.addEventListener('click', settingss)

const cancel = document.getElementById('cancel');
cancel.addEventListener('click', cancelSettings)

const friendsSettings = document.querySelector('.against-friend')
friendsSettings.addEventListener('click', showFriends)

const AIsettings = document.querySelector('.against-ai')
AIsettings.addEventListener('click', showAISettings)

const startGame = document.querySelector('.game-start')
startGame.addEventListener('click', game.playAgain)

const saveButton = document.getElementById('save')
saveButton.addEventListener('click', saveSettings)



// function computerMove() {
//   const squares = Array.from(document.querySelectorAll(".square"));
//   let emptySquares = squares.filter(function (e) {
//     return e.innerText == "";
//   });
//   let index = Math.floor(Math.random() * emptySquares.length)
//   emptySquares[index].innerText = 'X'
//   game.turnCounter++
// }
