% window.getComputedStyle(document.querySelector...) //pass this element reference
grid-column-end and grid-column-start

const height = 5
const width = 5

function setupGrid() {
	const squares = document.querySelectorAll('.lightsout-square')
	for (let i  = 0; i < squares.length; i++) {
		const rowIndex = Math.floor(i / height)
		const colIndex = i % width
		// set grid indices with starting index of 1
		squares[i].style.gridRowStart = row + 1
		squares[i].style.gridColumnStart = col + 1
}

setupGrid()

//access squares based on gridRowStart and colRowStart
//use CSS Attribute Selector attr* = value to find attributes with name attr that contain at least one string value
//document.querySelectorAll('.lightsout-square[style*="grid-row-start: 1"][style*="grid-Column-Start: 1"]')

//if you have an internal representation of game state, use 0-4 indices. Otherwise, 1-5

function getSquare (row, col){
	return document.querySelector(".lightsout-square" +
																`[style="grid-row-start: ${row}"]` +
																`[style="grid-column-start: ${col}"]`)
}

// Don't just change background color to white. Instead, create a class .js-lightsoutsquareOn { background-color: white; }
// toggle with square.classlist.add(lightsoutsquareOn) and square.classlist.remove(lightsoutsquareOn)
// square.classlist.contains(lightsoutsquareOn)...


// create a function that changes the color of squares around a clicked square.
// call this 10-30 times to create a "random" solveable start configuration

//create decoupled board and game logic.

//in JS, you can get the current date by creating a new Date().
// possible to get time by creating a Date at start and a Date every second, find the difference and push to timer display

//use setInterval(func, intervalInMS) to run a func every second
