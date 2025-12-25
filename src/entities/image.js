import {Renderable} from './renderable.js'

export class Image extends Renderable {
    constructor(image, x, y) {
        super(x, y)
        this.image = image
    }

    render(context) {
        context.drawImage(this.image, this.x, this.y)
    }
}