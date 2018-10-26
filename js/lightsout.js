// window.getComputedStyle(document.querySelector...) //pass this element reference
// grid-column-end and grid-column-start

import Timer from './timer.js'
const height = 5
const width = 5
const timer = new Timer()


function setup () {
  const squares = document.querySelectorAll('.lightsout-square')
  for (let i = 0; i < squares.length; i++) {
    const row = Math.floor(i / height)
    const col = i % height
		// set starting grid indices at 1
    squares[i].style.gridRowStart = row + 1
    squares[i].style.gridColumnStart = col + 1
    squares[i].addEventListener('click', squareClickHandler)
  }
  const newGameButton = document.getElementById('lightsout-newgame-btn')
  newGameButton.addEventListener('click', newGame)
  setUpTimer()
  configureStart()
}

function newGame(){
  setUpTimer()
  configureStart()
}

function setUpTimer() {
  document.getElementById("lightsout-timer").innerHTML = "00:00"
  timer.reset()
}

function updateTimer() {
  timer.currentTime =  timer.getElapsedTime() //TODO: Format
  document.getElementById("lightsout-timer").innerHTML = timer.currentTime
}

function startGame() {
  startTimer()
  setBoard()
}
//in JS, you can get the current date by creating a new Date().
// possible to get time by creating a Date at start and a Date every second, find the difference and push to timer display

//use setInterval(func, intervalInMS) to run a func every second
setup()

//access squares based on gridRowStart and colRowStart
//use CSS Attribute Selector attr* = value to find attributes with name attr that contain at least one string value
//document.querySelectorAll('.lightsout-square[style*="grid-row-start: 1"][style*="grid-Column-Start: 1"]')

//if you have an internal representation of game state, use 0-4 indices. Otherwise, 1-5

// row and col are 1-5 here
function getSquare (row, col) {
  return document.querySelector(".lightsout-square" +
                                `[style*="grid-row-start: ${row}"]` +
                                `[style*="grid-column-start: ${col}"]`)
}

function getAdjacentSquares (row, col) {
  return [
    getSquare(row, col),
    getSquare(row-1, col),
    getSquare(row+1, col),
    getSquare(row, col-1),
    getSquare(row, col+1)
  ].filter((sqr) => sqr !== null)
}

function squareClickHandler (event) {
  console.log(event.currentTarget.style.gridRowStart)
  toggleSquares(parseInt(event.currentTarget.style.gridRowStart), parseInt(event.currentTarget.style.gridColumnStart))
}

function toggleSquares (row, col) {
  for (const square of getAdjacentSquares(row, col)) {
    square.classList.toggle('js-lightsout-square-on')
  }
}

function configureStart () {
  for (let i = 0; i < Math.floor(Math.random() * 11 ) + 25; i++){
    toggleSquares(Math.floor(Math.random() * 5) + 1,
                             Math.floor(Math.random() * (5)) + 1)
  }
}

// Reset game (and message)
// Overlay lock screen
// finish timer
