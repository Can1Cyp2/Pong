const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// const text = 25; // Pixels for font

const w = 1300;    // Width
const h = w * 0.6    // Height

canvas.width = w
canvas.height = h

//  Click info:
let clickX = 0   // the x position of the click
let clickY = 0   // the y position of the click

// Player info:
const playerSizeW = w / 50
const playerSizeH = h / 5
const moveSpeed = 3.5

// Ball info:
const ballSize = 20
const ballSpeed = moveSpeed * 1.7

let updateGame = true; // If the screen should be updated or not

function resetBackground() {
    ctx.fillStyle = '#333'
    ctx.fillRect(0, 0, w, h)
}

let goDown = false;
let goUp = false;
let goDown2 = false;   // For player 2
let goUp2 = false;  // For player 2

let twoPlayers = false; // If there are two players or not 

// Button functions: --------------------------------------
const handleKeyDown = (e) => {
    console.log(e.key.toLowerCase())
    if (e.key.toLowerCase() === 's' ) goDown = true
    else if (e.key.toLowerCase() === 'w') goUp = true

    if (twoPlayers){    // Adds controls for second player
        if (e.key === 'ArrowDown' ) goDown2 = true
        else if (e.key === 'ArrowUp') goUp2 = true
    }


    updateGame = true
}
const handleKeyUp = (e) => {
    if (e.key.toLowerCase() === 's') goDown = false
    if (e.key.toLowerCase() === 'w') goUp = false

    if (twoPlayers){    // Adds controls for second player
        if (e.key === 'ArrowDown' ) goDown2 = false
        else if (e.key === 'ArrowUp') goUp2 = false
    }
}
document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keyup', handleKeyUp)

// Button colours:
const buttonDisabledColour = "#353636";
const buttonColour = "#1ebe73";

function secondPlayer(){
    const playersButton = document.getElementById('players_button') // Setting the two player button
    
    // Changes value based on button click
    if (twoPlayers){
        twoPlayers = false;
        playersButton.style.background = buttonDisabledColour;
    } 

    else {
        twoPlayers = true;
        playersButton.style.background = buttonColour
    }
}
// Button functions ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


function startGame(){
    const playButton = document.getElementById('play_button') // Setting the play button
    playButton.disabled = true;
    playButton.style.background = buttonDisabledColour
 
    setInterval(updateDisplay, 10);  // Game will not start if the user has not clicked start button
}

function updateDisplay() {
    if (!updateGame) return
    
    resetBackground()

    // Moving player 1:
    if (goUp){
        player.velocity = -1 * moveSpeed
        player.move()
    }
    else if (goDown) {
        player.velocity = moveSpeed
        player.move()
    }    
    else {
        player.velocity = 0
        player.move()
    }

    // Moving player 2:
    if (goUp2){
        player2.velocity = -1 * moveSpeed
        player2.move()
    }
    else if (goDown2) {
        player2.velocity = moveSpeed
        player2.move()
    }    
    else {
        player2.velocity = 0
        player2.move()
    }

    // Updating classes: players and ball
    ball.move()
    ball.update()
    player.style()
    ai()
    player2.style()
}

resetBackground()