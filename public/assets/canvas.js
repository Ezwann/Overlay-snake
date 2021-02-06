//Define some global vars
var snake,
    grid = [],
    cellSize = 40,
    isDead = false,
    food,
    socket,
    direction;

/**
 * @name setup
 * @description Fires only once at the start
 */
function setup() {
    //Init socket
    socket = io();
    //Create canvas (full screen)
    createCanvas(window.innerWidth, window.innerHeight);
    //Make it "turn base"
    noLoop();
    //Init game
    resetSnake();

    //Define an "update" event on the socket. Callback take a direction ["up","down","left","right"] and a repeat between 1 and 10
    socket.on('update', (dir, repeat) => {
        //Passe dir to direction (used latter)
        direction = dir;
        //Init count at 1, used to count the actions
        count = 1;
        var interval = setInterval(() => {
            //Redraw each time
            redraw();
            //If count == repeat, then clearInterval
            if (Math.min(Math.max(1, repeat), 10) == count) clearInterval(interval);
            //Increment count
            count++;
            //If Snake is dead
            if (isDead) {
                //Reset isDead to false
                isDead = false;
                //Emit dead event & the score
                socket.emit('dead', snake.tails.length);
                //ReInit game
                resetSnake();
                clearInterval(interval);
            }
        }, 60)
    });
}

/**
 * @name resetSnake
 * @description Init grid, snake (length 1) and food
 */
function resetSnake() {
    for (let i = 0; i < ceil(width / cellSize); i++) {
        grid[i] = [];
        for (let j = 0; j < ceil(height / cellSize); j++) {
            grid[i][j] = new Cell(i, j);
        }
    }
    snake = new Snake(ceil(width / 2 / cellSize), ceil(height / 2 / cellSize));
    food = new Food(ceil(random(0, width / cellSize)), ceil(random(0, height / cellSize)));
    redraw();
}

/**
 * @name draw
 * @description Gameloop, used to draw & calculate at each frame
 */
function draw() {
    //Make the previous frame transparent
    clear();
    //Background transparent
    background(0, 0);
    //Move snake to the direction
    snake.move(direction);

    //Loop to display grid
    for (let i = 0; i < floor(width / cellSize); i++) {
        for (let j = 0; j < floor(height / cellSize); j++) {

            var cell = grid[i][j];
            //If snake is in the cell
            if (snake.x == cell.x && snake.y == cell.y) {
                //If the cell is a Food object (so the Food and the Snake are at same position)
                if (cell.content instanceof Food) {
                    //Eat the food
                    snake.eat();
                    //Define new food with random location
                    food = new Food(ceil(random(0, width / cellSize)), ceil(random(0, height / cellSize)));

                    redraw();
                }
                //The cell content is now snake (the info is used in cell.show() method)
                cell.content = snake;
            } else if (food.x == cell.x && food.y == cell.y) {
                //The cell content is now Food (the info is used in cell.show() method)
                cell.content = food;
            } else {
                //The cell is empty
                cell.content = null;
            }
            //If the snake is more than 1 cell long
            if (snake.tails.length > 0) {
                //Init the tail
                var tails = snake.tails;
                //ForEach tail
                for (let k = 0; k < tails.length; k++) {
                    if (cell.x == tails[k][0] && cell.y == tails[k][1]) {
                        //Assign into cell
                        cell.content = tails;
                    }
                }
            }
            //Draw the cell
            cell.show();
        }
    }
}