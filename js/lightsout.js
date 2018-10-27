// window.getComputedStyle(document.querySelector...) //pass this element reference
// grid-column-end and grid-column-start

import Timer from './timer.js'
const height = 5
const width = 5
const timer = new Timer()
let currentTime = null
let interval;
const squares = document.querySelectorAll('.lightsout-square')
const overlayDiv = document.createElement('div')

function setup () {
  for (let i = 0; i < squares.length; i++) {
    const row = Math.floor(i / height)
    const col = i % height
		// set starting grid indices at 1
    squares[i].style.gridRowStart = row + 1
    squares[i].style.gridColumnStart = col + 1
    squares[i].addEventListener('click', squareClickHandler)
  }
  const newGameButton = document.getElementById('lightsout-newgame-btn')
  newGameButton.addEventListener('click', startNewGame)
  setUpTimer()
}

function startNewGame() {
  removeEndGameOverlay()
  setUpNewGame()
  startTimer()
}

function setUpNewGame(){
  setUpTimer()
  configureStartingBoard()
}

function setUpTimer() {
  document.getElementById("lightsout-timer").innerHTML = "0:0"
  timer.reset()
}

function startTimer (){
  timer.start()
  // "restart" - prevent interval from increasing in speed with multiple function calls
  clearInterval(interval)
  // update the Timer every 1 s (1000 ms)
  interval = setInterval(updateTimer, 1000)
}

function updateTimer() {
  currentTime = timer.getElapsedTime()
  document.getElementById("lightsout-timer").innerHTML = currentTime[0] + ":" + currentTime[1]
}

function configureStartingBoard () {
  for (let i = 0; i < Math.floor(Math.random() * 11 ) + 25; i++){
    toggleSquares(Math.floor(Math.random() * 5) + 1,
                             Math.floor(Math.random() * (5)) + 1)
  }
}

setup()
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
  toggleSquares(parseInt(event.currentTarget.style.gridRowStart), parseInt(event.currentTarget.style.gridColumnStart))
  // check puzzle completion (loop over squares, breaking if there is a white square)
  for (let i = 0; i < squares.length; i++){
    if (squares[i].classList.contains("js-lightsout-square-on")) {return}
  }
  console.log("it works!")
  timer.stop()
  createEndGameOverlay()
}

function createEndGameOverlay(){
  overlayDiv.id = "endGame-overlay"
  overlayDiv.className = "lightsout"
  overlayDiv.innerHTML = "You Win!"
  document.getElementById("lightsout-board").appendChild(overlayDiv)
}

function removeEndGameOverlay(){
  if (document.contains(document.getElementById("endGame-overlay"))){
    document.getElementById("endGame-overlay").remove()
  }
}

function toggleSquares (row, col) {
  for (const square of getAdjacentSquares(row, col)) {
    square.classList.toggle('js-lightsout-square-on')
  }
}
