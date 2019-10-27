$(function(){
    $("#nav-placeholder").load("/navbar/navbar.html")
})

let grid
let circle
let tInitial
let timeDiv, info
let playButton, stepLeftButton, stepRightButton, resetButton
let xButton, vButton, ghostButton, answerButton

function setup() {
    let canvas = createCanvas(window.innerWidth*.7, window.innerHeight*.7)
    canvas.parent('canvas-parent')

    timeDiv = createDiv('Time: 0')
    timeDiv.parent('content')

    playButton = createButton(createIcon("media-play"))
    stepLeftButton = createButton(createIcon("media-step-backward"))
    stepRightButton = createButton(createIcon("media-step-forward"))
    resetButton = createButton(createIcon("reload"))
    playButton.class('icon-button action-button').parent('content')
    stepLeftButton.class('icon-button action-button').parent('content')
    stepRightButton.class('icon-button action-button').parent('content')
    resetButton.class('icon-button action-button').parent('content')

    info = createDiv(`
        <h1>Description</h1> A ball moves across the screen with an increasing velocity.
        <h1>Question</h1> What is the acceleration of the ball? (You should be able to calculateit from the "show velocity" mode, but could you also calculateit from the "show X" mode?)
    `)
    info.parent('content')

    grid = new Grid(-4, 10, -3, 3, width)
    tInitial = millis()
    frameRate(60)
}

function draw() {
    clear()

    grid.draw(1, 1)

    let {x, y} = grid.project(mouseX, mouseY)
    text(`(${x.toFixed(2)}, ${y.toFixed(2)})`, mouseX, mouseY) 

    fill(255, 100, 100)
    let t = (millis() - tInitial) / 1000
    timeDiv.html(`Time: ${t.toFixed(2)}`)
    
    let circle = grid.unproject(pos(t), 0)
    ellipse(circle.x, circle.y, 50, 50)
    if(pos(t) > grid.xmax + 1.5) tInitial = millis()
}

const accel = 2
function pos(t) {
    return 0.5*accel*t*t - 2
}
function vel(t) {
    return accel*t;
}

class Grid {
    constructor(xmin, xmax, ymin, ymax, screenWidth, screenHeight=((ymax - ymin) / (xmax - xmin) * screenWidth)) {
        this.xmin = xmin
        this.xmax = xmax
        this.ymin = ymin
        this.ymax = ymax
        this.screenWidth = screenWidth
        this.screenHeight = screenHeight
    }

    project(screenX, screenY) {
        let x = screenX / this.screenWidth * (this.xmax - this.xmin) + this.xmin
        let y = (height - screenY) / this.screenHeight * (this.ymax - this.ymin) + this.ymin
        return {x, y}
    }
    unproject(gridX, gridY) {
        let x = (gridX - this.xmin) / (this.xmax - this.xmin) * this.screenWidth
        let y = this.screenHeight - ((gridY - this.ymin) / (this.ymax - this.ymin) * this.screenHeight)
        return {x, y}
    }

    draw(scaleX, scaleY) {
        stroke(51)
        for(let x = this.xmin; x <= this.xmax; x += scaleX) {
            let xDraw = this.unproject(x, 0).x
            strokeWeight(x == 0 ? 6 : 1);
            line(xDraw, 0, xDraw, this.screenHeight)
        }
        for(let y = this.ymin; y <= this.ymax; y += scaleY) {
            let yDraw = this.unproject(0, y).y
            strokeWeight(y == 0 ? 6 : 1)
            line(0, yDraw, this.screenWidth, yDraw)
        }
    }
}