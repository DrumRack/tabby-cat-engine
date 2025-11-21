export class Screen {
    constructor(canvas) {
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Screen requires a valid HTMLCanvasElement')
        }
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
    }

    render(renderables) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (const item of renderables) {
            switch (item.type) {
                case 'fill':
                    this.#fill(item.color)
                    break

                case 'image':
                    this.context.drawImage(item.image, item.x, item.y)
                    break

                case 'sprite':
                    this.#drawSprite(item.sprite)
                    break

                case 'text':
                    this.#printText(item.text, item.x, item.y, item.font, item.color)
                    break

                default:
                    console.warn(`Unknown renderable type: ${item.type}`)
            }
        }
    }

    #drawSprite(sprite) {
        this.context.drawImage(sprite.image, sprite.sourceX, sprite.sourceY, sprite.width, sprite.height, sprite.x, sprite.y, sprite.width, sprite.height)
    }

    #fill(color) {
        this.context.fillStyle = color
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    #printText(text, x = 10, y = 20, font = '16px Arial', color = 'black') {
        this.context.font = font
        this.context.fillStyle = color
        this.context.fillText(text, x, y)
    }
}