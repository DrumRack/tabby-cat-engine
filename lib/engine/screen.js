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
        renderables.forEach(renderable => renderable.render(this.context))
    }
}