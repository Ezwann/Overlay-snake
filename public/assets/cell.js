class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.content = null;
    }

    show() {
        stroke(0, 50, 0);
        //If the cell contain Snake head or tail part
        if ((this.content != null && this.content instanceof Snake) || (this.content != null && this.content instanceof Array)) {
            //If content == snake head, fill w/ gray, else w/ white
            fill((this.content instanceof Snake) ? 150 : 255);
            //Draw the rectangle
            rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
        } else if (this.content != null && this.content instanceof Food) {
            //If content is Food, fill it in red
            fill(255, 0, 0, 255);
            //Draw the rectangle
            rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
        }
        //If cell is empty, don't draw it
    }
}