import {Sprite} from './sprite.js'

export class AnimatedSprite extends Sprite {
    currentFrame = 0
    timeAccumulator = 0

    constructor({image, frames, speed, width, height}) {
        super({
            image,
            sourceX: frames[0].sourceX,
            sourceY: frames[0].sourceY,
            width,
            height
        })

        this.frames = frames
        this.speed = speed
        this.totalFrames = frames.length
    }

    render(context, deltaTime) {
        this.timeAccumulator += deltaTime
        while (this.timeAccumulator > this.speed) {
            this.#nextFrame()
            this.timeAccumulator -= this.speed
        }
        context.drawImage(this.image, this.sourceX, this.sourceY, this.width, this.height, this.x, this.y, this.width, this.height)
    }

    #nextFrame() {
        if (this.currentFrame + 1 === this.totalFrames) {
            this.#setFrame(0)
            return
        }
        this.#setFrame(++this.currentFrame)
    }

    #setFrame(index) {
        this.currentFrame = index
        this.sourceX = this.frames[index].sourceX
        this.sourceY = this.frames[index].sourceY
    }
}