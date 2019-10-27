$(function(){
    $("#nav-placeholder").load("/navbar/navbar.html")
})

let grid

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight*.7)
    canvas.parent('canvas-parent')
    let info = createDiv('Find the acceleration of the object.')
    grid = new Grid(-2, 10, -2, 2)
}

function draw() {
    clear()

    let {x, y} = grid.project(mouseX, mouseY)
    text(`(${x.toFixed(2)}, ${y.toFixed(2)})`, mouseX, mouseY);
}

class Grid {
    constructor(xmin, xmax, ymin, ymax) {
        this.xmin = xmin
        this.xmax = xmax
        this.ymin = ymin
        this.ymax = ymax
    }

    project(screenX, screenY) {
        let x = screenX / width * (this.xmax - this.xmin) + this.xmin;
        let y = (height - screenY) / height * (this.ymax - this.ymin) + this.ymin;
        return {x, y}
    }
    unproject(gridX, gridY) {
        let x = (gridX - xmin) / (xmax - xmin) * width;
        let y = height - ((gridX - ymin) / (ymax - ymin) * height);
        return {x, y}
    }
}