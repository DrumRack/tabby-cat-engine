export class Screen {
    canvas = document.createElement('canvas')
    context = this.canvas.getContext('2d')

    constructor(width = 640, height = 640) {
        this.canvas.width = width
        this.canvas.height = height
        document.body.prepend(this.canvas)
    }
}