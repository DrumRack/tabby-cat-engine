import {Renderable} from './renderable.js'

export class Text extends Renderable {
    text
    font
    color

    constructor({text, x = 10, y = 20, font = '16px Arial', color = 'black'}) {
        super(x, y)
        this.text = text
        this.font = font
        this.color = color
    }

    render(context) {
        context.font = this.font
        context.fillStyle = this.color
        context.fillText(this.text, this.x, this.y)
    }
}