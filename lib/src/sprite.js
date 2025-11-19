export class Sprite {
    constructor(imageName, sourceX, sourceY, width, height) {
        this.imageName = imageName
        this.sourceX = sourceX
        this.sourceY = sourceY
        this.width = width
        this.height = height
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
    }
}