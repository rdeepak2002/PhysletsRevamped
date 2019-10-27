$(function(){
    $("#nav-placeholder").load("/navbar/navbar.html")
})

let grid

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight*.7)
    canvas.parent('canvas-parent')
    let info = createDiv('Find the acceleration of the object.')
    let ratio = height / width
    grid = new Grid(-4, 10, -3, 3, width, width * ratio)
}

function draw() {
    clear()

    grid.draw(1, 1)

    let {x, y} = grid.project(mouseX, mouseY)
    text(`(${x.toFixed(2)}, ${y.toFixed(2)})`, mouseX, mouseY)

    fill(255, 100, 100)

}

class Grid {
    constructor(xmin, xmax, ymin, ymax, , screenHeight) {
        this.xmin = xmin
        this.xmax = xmax
        this.ymin = ymin
        this.ymax = ymax
        this.screenWidth = screenWidth
        this.screenHeight = screenHeight
    }

    project(screenX, screenY) {
        let x = screenX / screenWidth * (this.xmax - this.xmin) + this.xmin
        let y = (height - screenY) / screenHeight * (this.ymax - this.ymin) + this.ymin
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