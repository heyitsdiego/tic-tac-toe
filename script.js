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

  check(stepStart,limit, stepPlus) {
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
        game.stopGame('X')
      }
      else if (oCount == 3) {
        game.stopGame('O')
      }
    },

    stopGame(e) {
      console.log(e + ' wins')
    },

  turnCounter: 1,

  playGame(e) {
    if(e.target.innerText != '') return;

    if ((game.turnCounter%2) != 0) {
      e.target.innerText = 'X'
      game.turnCounter += 1;
    }
    else if (game.turnCounter%2 == 0) {
      e.target.innerText = 'O'
      game.turnCounter += 1;
    }

    if (game.turnCounter > 2 && game.turnCounter < 9) {
      //horizontal check
      game.check(0,3,1)
      game.check(3,6,1)
      game.check(6,9,1)
      //vertical check
      game.check(0,7,3)
      game.check(1,8,3)
      game.check(2,9,3)
      //diagonal check
      game.check(0,9,4)
      game.check(2,7,2)
    }
  },

  render() {
    this.gameBoard.forEach(object => {
      const square = document.createElement('div');
      square.setAttribute('id', `'${object.square}'`)
      square.setAttribute('class', 'square')
      square.addEventListener('click', this.playGame)
      const container = document.querySelector('.game-board')
      container.appendChild(square)
    });
  }
}
game.render()