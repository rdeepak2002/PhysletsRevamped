
function createIcon(name) {
    return `
        <svg class="icon" viewBox="0 0 8 8">
            <use xlink:href="/images/open-iconic.svg#${name}" class="icon-${name}"></use>
        </svg>
    `
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

    getHeight() {
        return this.screenHeight
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