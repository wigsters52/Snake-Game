const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.querySelector('#score')
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
const speed = .9
let timerId = 0

function createGrid() {
    //create 100 of these with a for loop

    for (let i = 0; i < width * width; i++) {
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

function startGame() {

    currentSnake.forEach(index => squares[index].classList.remove('snake'))
        //remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    score = 0
        //re add new score to browser
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApple()
        //readd the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

function move() {
    if (
        (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
        return clearInterval(timerId)





    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
        //remove styling from last element 
    squares[tail].classList.remove('snake')
        //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)

    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApple()
        score++
        scoreDisplay.textContent = `Score: ${score}`
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }



    //add styling so we can see it
    squares[currentSnake[0]].classList.add('snake')
}






function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}


generateApple()

function control(e) {
    if (e.keyCode === 39) {
        direction = 1
    } else if (e.keyCode === 38) {
        direction = -width
    } else if (e.keyCode === 37) {
        direction = -1
    } else if (e.keyCode === 40) {
        direction = +width
    }
}

document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)