class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tails = [];
    }

    /**
     * @name move
     * @description Make the snake moved in one direction, by one cell
     * @param {String} dir 
     */
    move(dir) {
        switch (dir) {
            case "up":
                this.moveTail();
                this.y -= 1;
                this.die();
                break;
            case "down":
                this.moveTail();
                this.y += 1;
                this.die();
                break;
            case "left":
                this.moveTail();
                this.x -= 1;
                this.die();
                break;
            case "right":
                this.moveTail();
                this.x += 1;
                this.die();
                break;
            default:
                break;
        }
    }

    /**
     * @name moveTail
     * @description Make the tail move
     */
    moveTail() {
        if (this.tails.length > 0) {
            this.tails.push([this.x, this.y])
            this.tails.shift();
        }
    }

    /**
     * @name eat
     * @description On eat, push the location at the end of the tail
     */
    eat() {
        this.tails.push([this.x, this.y])
    }

    /**
     * @name die
     * @description Define if snake died during this turn
     */
    die() {
        let gridRows = grid.length,
            gridCols = grid[gridRows - 1].length;
        if (this.x < 0 || this.y < 0 || this.x > gridRows || this.y > gridCols) {
            isDead = true;
        }
        if (this.tails.length > 0) {
            var tails = this.tails;
            for (let k = 0; k < tails.length; k++) {
                var tail = tails[k];
                if (this.x == tail[0] && this.y == tail[1]) isDead = true;
            }
        }
    }
}