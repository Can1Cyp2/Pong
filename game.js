class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.width = playerSizeW;
    this.height = playerSizeH;

    this.score = 0;

    this.speed = moveSpeed;
    this.velocity = 0;
  }

  style() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += this.velocity;

    this.checkSides();
  }

  checkSides() {
    // check if the player is at the max or lowest height and prevent them from moving past
    if (this.y + this.height >= h) {
      this.y = h - this.height;
    }

    if (this.y <= 0) this.y = 0;
  }

  // updateScore() {
  //     ctx.fillStyle = 'blue'
  //     ctx.fillRect(0, 0, this.width / 50, this.height / 50)
  //     ctx.font = `arial 25px`
  //     ctx.fillText(this.points, this.x / 2 + width / 4, 25)
  // }
}

let started = false; // If the user started the game or not

class Ball {
  constructor() {
    this.speed = ballSpeed;
    this.size = ballSize;

    this.velocity = { x: 0, y: 0 };

    this.ballStart(); // Start the ball in position
  }

  ballStart() {
    this.getRandomVelocity(); // generates a random place for the ball to move

    this.x = w / 2;
    this.y = h / 2;
    player.y = h / 2;
    player2.y = h / 2;
  }

  move() {
    collision();

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  update() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  getRandomVelocity() {
    // Moves ball in random direction on start
    const x = Math.random() <= 0.5 ? this.speed * -1 : ballSpeed;
    const y = Math.random() <= 0.5 ? this.speed * -1 : ballSpeed;
    this.velocity = { x, y };
  }
}

function collision() {
  // Checks if the ball hit a wall
  // Player 1:
  if (ball.x <= playerSizeW + ballSize) {
    if (ball.y <= playerSizeH + player.y && ball.y >= player.y) {
      ball.x = playerSizeW + player.x + ball.size * 2;
      ball.velocity.x = ball.velocity.x * -1;

      return false;
    } else {
      player2.points += 1;
      updateGame = false;

      ball.ballStart();

      return false;
    }
  }

  // Player 2
  if (ball.x >= player2.x - playerSizeW) {
    if (ball.y <= playerSizeH + player2.y && ball.y >= player2.y) {
      ball.x = player2.x - playerSizeW;
      ball.velocity.x = ball.velocity.x * -1;

      return false;
    } else {
      player.points += 1;
      updateGame = false;

      ball.ballStart();

      return false;
    }
  }

  // Check if ball hit the top or bottom of screen:
  // Screen top
  if (ball.y <= 0) {
    ball.y = 0;
    ball.velocity.y *= -1;
  }

  // Screen bottom
  else if (ball.y >= h) {
    ball.y = h;
    ball.velocity.y *= -1;
  }
}

Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

// Player2 AI:
function ai() {
  if (twoPlayers) return;
  player2.y = (ball.y - player2.height / 2).clamp(0, h - player2.height);;
}

// Players:
const player = new Player(2, h / 2 - playerSizeH);
const player2 = new Player(w - 1 - playerSizeW, h / 2 - playerSizeH / 2);

// Ball:
const ball = new Ball();
