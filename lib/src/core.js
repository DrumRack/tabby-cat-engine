export class Core {
    setScreen(screen) {
        this.screen = screen
    }

    setScene(scene) {
        this.scene = scene
    }

    run() {
        requestAnimationFrame(this.#frame.bind(this))
    }

    #frame(timestamp) {
        if (!this.lastTimestamp) this.lastTimestamp = timestamp

        const deltaTime = timestamp - this.lastTimestamp
        this.lastTimestamp = timestamp

        const renderables = this.scene.getRenderables()
        this.screen.render(renderables)
        
        requestAnimationFrame(this.#frame.bind(this))
    }
}