export class Screen {
    constructor(canvas) {
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Screen requires a valid HTMLCanvasElement')
        }
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
    }

    render(renderList, deltaTime) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        renderList.forEach(renderItem => renderItem.render(this.context, deltaTime))
    }
}