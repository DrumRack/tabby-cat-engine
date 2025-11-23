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

        const renderables = this.scene.getRenderables()
        this.screen.render(renderables)
        
        requestAnimationFrame(this.#frame.bind(this))
    }

    #normalizeScene(scene) {
        if (typeof scene.init !== 'function') scene.init = function() {}
        if (typeof scene.update !== 'function') scene.update = function() {}
        if (typeof scene.getRenderables !== 'function') scene.getRenderables = function() {return []}
    }
}