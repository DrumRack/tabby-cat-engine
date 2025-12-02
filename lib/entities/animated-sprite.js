import {Sprite} from './sprite.js'

export class AnimatedSprite extends Sprite {
    #isPaused
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
        if (this.running) return
        this.#setFrame(0)
        this.timeAccumulator = 0
        this.#isPaused = false
        this.running = true
    }

    stop() {
        this.#setFrame(0)
        this.#isPaused = false
        this.running = false
    }

    pause() {
        if (!this.running || this.#isPaused) return
        this.#isPaused = true
        this.running = false
    }

    resume() {
        if (!this.#isPaused) return
        this.#isPaused = false
        this.running = true
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