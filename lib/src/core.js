export class Core {
    run() {
        requestAnimationFrame(this.#frame.bind(this))
    }

    #frame(timestamp) {
        if (!this.lastTimestamp) this.lastTimestamp = timestamp

        const deltaTime = timestamp - this.lastTimestamp
        this.lastTimestamp = timestamp

        requestAnimationFrame(this.#frame.bind(this))
    }
}