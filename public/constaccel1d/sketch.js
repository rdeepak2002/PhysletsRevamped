$(function(){
    $('#nav-placeholder').load('/navbar/navbar.html')
})

let grid
let circle
let time
let info
let playButton, stepLeftButton, stepRightButton, resetButton
let xButton, vButton, ghostButton, answerButton
let isPlaying, showX, showV, showGhosts

const size = 40

function setup() {
    const myWidth = window.innerWidth*.65
    grid = new Grid(-4, 10, -3, 3, myWidth)
    let canvas = createCanvas(myWidth, grid.getHeight())
    canvas.parent('canvas-parent')

    playButton = createButton(createIcon('media-pause'))
        .mousePressed(() => {
            isPlaying = !isPlaying
            playButton.html(createIcon(isPlaying ? 'media-pause' : 'media-play'))
        })
        .class('icon-button action-button')
        .parent('button-bar')
    stepLeftButton = createButton(createIcon('media-step-backward'))
        .mousePressed(() => time = Math.max(0, time - .1))
        .class('icon-button action-button')
        .parent('button-bar')
    stepRightButton = createButton(createIcon('media-step-forward'))
        .mousePressed(() => time += .1)
        .class('icon-button action-button')
        .parent('button-bar')
    resetButton = createButton(createIcon('reload'))
        .mousePressed(() => time = 0)
        .class('icon-button action-button')
        .parent('button-bar')

    xButton = createButton('Show X')
        .mousePressed(() => {
            showX = !showX
            if(showX) {
                showV = false
                vButton.html('Show V')
            }
            xButton.html(showX ? 'Hide X' : 'Show X')
        })
        .parent('button-bar')
        .class('toggleButton')
    vButton = createButton('Show V')
        .mousePressed(() => {
            showV = !showV
            if(showV) {
                showX = false
                xButton.html('Show X')
            }
            vButton.html(showV ? 'Hide V' : 'Show V')
        })
        .parent('button-bar')
        .class('toggleButton')
    ghostButton = createButton('Show Ghosts')
        .mousePressed(() => {
            showGhosts = !showGhosts
            ghostButton.html(showGhosts ? 'Hide Ghosts' : 'Show Ghosts')
        })
        .parent('button-bar')
        .class('toggleButton')


    info = createDiv(`
        <h1>Description</h1> A ball moves across the screen with an increasing velocity.
        <h1>Question</h1> What is the acceleration of the ball? (You should be able to calculate it from the 'show velocity' mode, but could you also calculate it from the 'show X' mode?)
    `).parent('content')
    
    answer = createDiv(`
        Enter Answer: 
        <input id="answer"/> m/s 
        <button class="toggleButton" onClick="checkAnswer()">Submit</button>
    `).parent('content')

    isPlaying = true
    showX = false
    time = 0
    frameRate(50)
}

function draw() {
    clear()
    textSize(30)
    grid.draw(1, 1)

    let {x, y} = grid.project(mouseX, mouseY)
    fill(0, 0, 255)
    stroke(0, 0, 255)
    text(`(${x.toFixed(2)}, ${y.toFixed(2)})`, mouseX, mouseY) 

    fill(150, 20, 150)
    stroke(150, 20, 150)
    text(`Time: ${time.toFixed(2)} seconds`, 10, 30)
    
    const posX = pos(time)
    const velX = vel(time)
    if(showGhosts) {
        for(let i = 0; i < 4; i += 1) {
            if(posX >= pos(i)) {
                let coords = grid.unproject(pos(i), 0)
                fill(255, 100, 100, 70)
                stroke(0, 0)
                ellipse(coords.x, coords.y, size, size)
            }
        }
    }

    let circle = grid.unproject(posX, 0)
    fill(255, 100, 100)
    stroke(0)
    ellipse(circle.x, circle.y, size, size)
    fill(0)
    if(showX) text(`(${posX.toFixed(2)}, 0)`, circle.x - size/2, circle.y - 40)
    if(showV) text(`(${velX.toFixed(2)}, 0)`, circle.x - size/2, circle.y - 40) 
    if(posX > grid.xmax + 1.5) time = 0
    if(isPlaying) time += .02
}

const accel = 2
function pos(t) {
    return 0.5*accel*t*t - 2
}
function vel(t) {
    return accel*t;
}

function checkAnswer() {
    let answerValue = select('#answer').value()
    if(parseFloat(answerValue) == 2) alert('Correct answer!')
    else alert('Incorrect answer!')
}