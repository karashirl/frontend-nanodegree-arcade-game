// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Set initial location and speed of enemies
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Initiates movement of enemy
    this.x = this.x + (this.speed * dt);
    // Resets position of enemy to random position when enemy leaves canvas
    if (this.x > 505) {
        this.x = Math.random() * -500 - 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.player = 'images/char-boy.png';
    // Set initial location of player
    this.x = x;
    this.y = y;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Blocks player from leaving left/right sides of canvas
    if (this.x > 400) {
        this.x = 400 * dt;
    } else if (this.x < 0) {
        this.x = 0 * dt;
    }

    // Blocks player from leaving bottom of canvas
    if (this.y > 385) {
        this.y = 385 * dt;

        // Blcoks player for leaving top of canvas before reset
    } else if (this.y < 45) {
        this.y = (-40 * dt);
        // Resets game if player reaches water
        setTimeout(function() {
            alert('You won!');
            player.reset();
        }, 400);
    }
};

// Moves player with arrow keys
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.x = this.x - 100;
            break;
        case 'up':
            this.y = this.y - 85;
            break;
        case 'right':
            this.x = this.x + 100;
            break;
        case 'down':
            this.y = this.y + 85;
            break;
    }
};

// Resets game
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 385;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-650, 220, 325);
var enemy2 = new Enemy(-250, 220, 150);
var enemy3 = new Enemy(-500, 140, 125);
var enemy4 = new Enemy(-800, 140, 250);
var enemy5 = new Enemy(-200, 60, 150);
var enemy6 = new Enemy(-700, 60, 200);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

var player = new Player(200, 385);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});