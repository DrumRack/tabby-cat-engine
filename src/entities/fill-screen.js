export class FillScreen {
    constructor(color) {
        this.color = color
    }

    render(context) {
        context.fillStyle = this.color
        context.fillRect(0, 0, 640, 640)
    }
}