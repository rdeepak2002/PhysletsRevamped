$(function(){
    $("#nav-placeholder").load("/navbar/navbar.html")
})

let grid

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight*.7)
    canvas.parent('canvas-parent')
    let info = createDiv('Find the acceleration of the object.')
    let ratio = height / width
    let dim = ratio * 14 / 2
    grid = new Grid(-4, 10, -dim, dim)
}

function draw() {
    clear()

    let {x, y} = grid.project(mouseX, mouseY)
    text(`(${x.toFixed(2)}, ${y.toFixed(2)})`, mouseX, mouseY);

    grid.draw(1, 1)
}

class Grid {
    constructor(xmin, xmax, ymin, ymax) {
        this.xmin = xmin
        this.xmax = xmax
        this.ymin = ymin
        this.ymax = ymax
    }

    project(screenX, screenY) {
        let x = screenX / width * (this.xmax - this.xmin) + this.xmin
        let y = (height - screenY) / height * (this.ymax - this.ymin) + this.ymin
        return {x, y}
    }
    unproject(gridX, gridY) {
        let x = (gridX - this.xmin) / (this.xmax - this.xmin) * width
        let y = height - ((gridY - this.ymin) / (this.ymax - this.ymin) * height)
        return {x, y}
    }

    draw(scaleX, scaleY) {
        for(let x = this.xmin; x < this.xmax; x += scaleX) {
            let xDraw = this.unproject(x, 0).x
            line(xDraw, 0, xDraw, height)
        }
        for(let y = this.ymin; y < this.ymax; y += scaleY) {
            let yDraw = this.unproject(0, y).y
            line(0, yDraw, width, yDraw)
        }
    }
}