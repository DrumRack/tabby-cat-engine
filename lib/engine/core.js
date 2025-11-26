export class Core {
    #lastTimestamp

    setScreen(screen) {
        this.screen = screen
    }

    async setScene(scene) {
        this.#normalizeScene(scene)
        await scene.init()
        this.scene = scene
    }

    setInput(input) {
        this.input = input
    }

    run() {
        requestAnimationFrame(this.#frame.bind(this))
    }

    #frame(timestamp) {
        if (!this.scene) {
            requestAnimationFrame(this.#frame.bind(this))
            return
        }

        if (!this.#lastTimestamp) this.#lastTimestamp = timestamp
        const deltaTime = timestamp - this.#lastTimestamp
        this.#lastTimestamp = timestamp

        this.scene.update(deltaTime)
        this.input.update()

        const renderList = this.scene.renderList()
        this.screen.render(renderList)
        
        requestAnimationFrame(this.#frame.bind(this))
    }

    #normalizeScene(scene) {
        if (typeof scene.init !== 'function') scene.init = function() {}
        if (typeof scene.update !== 'function') scene.update = function() {}
        if (typeof scene.renderList !== 'function') scene.renderList = function() {return []}
    }
}