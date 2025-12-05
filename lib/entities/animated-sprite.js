import {Sprite} from './sprite.js'

export class AnimatedSprite extends Sprite {
    #currentFrame = 0
    #timeAccumulator = 0
    #isPaused = false
    #finished = false

    constructor({image, frames, speed, autorun = false, repeat = true, width, height}) {
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
        this.repeat = repeat
    }

    get currentFrame() {
        return this.#currentFrame
    }

    get totalFrames() {
        return this.frames.length
    }

    get frameProgress() {
        if (this.#finished) return 1
        const progress = this.#timeAccumulator / this.speed
        return +progress.toFixed(4)
    }

    get isPaused() {
        return this.#isPaused
    }

    play() {
        if (this.running) return
        if (this.#isPaused) this.#isPaused = false
        if (this.#finished) {
            this.#setFrame(0)
            this.#timeAccumulator = 0
            this.#finished = false
        }
        this.running = true
    }

    stop() {
        this.#setFrame(0)
        this.#timeAccumulator = 0
        this.#isPaused = false
        this.#finished = false
        this.running = false
    }

    pause() {
        if (!this.running || this.#isPaused) return
        this.#isPaused = true
        this.running = false
    }

    update(deltaTime) {
        if (!this.running) return
        this.#timeAccumulator += deltaTime
        while (this.#timeAccumulator > this.speed) {
            this.#nextFrame()
            this.#timeAccumulator -= this.speed
        }
    }

    #nextFrame() {
        if (this.#currentFrame + 1 === this.totalFrames) {
            if (this.repeat) {
                this.#setFrame(0)
                return
            }
            this.#finished = true
            this.running = false
            return
        }
        this.#setFrame(++this.#currentFrame)
    }

    #setFrame(index) {
        this.#currentFrame = index
        this.sourceX = this.frames[index].sourceX
        this.sourceY = this.frames[index].sourceY
    }
}