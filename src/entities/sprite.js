import {Renderable} from './renderable.js'

export class Sprite extends Renderable {
    constructor({image, sourceX, sourceY, width, height}) {
        super()
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

    render(context) {
        context.drawImage(this.image, this.sourceX, this.sourceY, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}