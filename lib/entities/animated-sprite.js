import {Sprite} from './sprite.js'

export class AnimatedSprite extends Sprite {
    currentFrame = 0
    timeAccumulator = 0

    constructor({image, frames, speed, autorun, width, height}) {
        super({
            image,
            sourceX: frames[0].sourceX,
            sourceY: frames[0].sourceY,
            width,
            height
        })

        this.frames = frames
        this.speed = speed
        this.running = autorun
        this.totalFrames = frames.length
    }

    start() {
        this.running = true
    }

    stop() {
        this.running = false
    }

    update(deltaTime) {
        if (!this.running) return
        this.timeAccumulator += deltaTime
        while (this.timeAccumulator > this.speed) {
            this.#nextFrame()
            this.timeAccumulator -= this.speed
        }
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