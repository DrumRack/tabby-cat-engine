export class Sprite {
    constructor(image, sourceX, sourceY, width, height) {
        this.image = image
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