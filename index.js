const grid = document.querySelector('.grid')
const startButton = document.querySelector('#start')
const score = document.querySelector('#score')
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1

function createGrid() {
    //create 100 of these with a for loop

    for (let i = 0; i < 100; i++) {
        //create element
        const square = document.createElement('div')
            // add styling to these elements 
        square.classList.add('square')
            //put the element into our grid
        grid.appendChild(square)
            //push it into a new squares array 
        squares.push(square)
    }


}

createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {
    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
        //remove styling from last element 
    squares[tail].classList.remove('snake')
        //add square in direction we are heading
    const head = currentSnake.unshift(currentSnake[0] + direction)

    //add styling so we can see it
    squares[head].classList.add('snake')
}



move()

let timerId = setInterval(move, 1000)

function control(e) {
    if (e.keyCode === 39) {
        console.log('right pressed')
    } else if (e.keyCode === 38) {
        console.log('up pressed')
    } else if (e.keyCode === 37) {
        console.log('left pressed')
    } else if (e.keyCode === 40) {
        console.log('down pressed')
    }
}