export class Screen {
    canvas = document.createElement('canvas')
    context = this.canvas.getContext('2d')

    constructor(width = 640, height = 640) {
        this.canvas.width = width
        this.canvas.height = height
        document.body.prepend(this.canvas)
    }

    render(renderables) {
        for (const item of renderables) {
            switch (item.type) {
                case 'fill':
                    this.#fill(item.color)
            }
        }
    }

    #fill(color) {
        this.context.fillStyle = color
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
}