export class Core {
    #lastTimestamp
    screen
    scene
    input

    setScreen(screen) {
        this.screen = screen
    }

    async setScene(scene) {
        this.#normalizeScene(scene)
        await scene.init()
        this.scene = scene
    }

    setInput(input) {
        if (this.input) this.input.removeEventListeners()
        this.input = input
        this.input.setupEventListeners()
    }

    run() {
        requestAnimationFrame(this.#frame)
    }

    #frame = timestamp => {
        if (!this.scene) {
            requestAnimationFrame(this.#frame)
            return
        }

        if (!this.#lastTimestamp) this.#lastTimestamp = timestamp
        const deltaTime = timestamp - this.#lastTimestamp
        this.#lastTimestamp = timestamp

        this.input.update()
        this.scene.update(deltaTime)

        const renderList = this.scene.renderList()
        const updatableItems = renderList.filter(renderItem => typeof renderItem.update === 'function')
        updatableItems.forEach(renderItem => renderItem.update(deltaTime))
        this.screen.render(renderList)
        
        requestAnimationFrame(this.#frame)
    }

    #normalizeScene(scene) {
        if (typeof scene.init !== 'function') scene.init = function() {}
        if (typeof scene.update !== 'function') scene.update = function() {}
        if (typeof scene.renderList !== 'function') scene.renderList = function() {return []}
    }
}