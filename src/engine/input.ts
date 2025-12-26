export class Input {
    static preventKeysSet
    keys = {}

    static preventKeys(keys) {
        this.preventKeysSet = new Set(keys)
    }

    register(keyCode, callback) {
        if (!(keyCode in this.keys)) {
            this.keys[keyCode] = {pressed: false, callback}
        } else {
            this.keys[keyCode].callback = callback
        }
    }

    unregister(keyCode) {
        delete this.keys[keyCode]
    }

    setupEventListeners() {
        document.addEventListener('keydown', this.#handleKeyDown)
        document.addEventListener('keyup', this.#handleKeyUp)
    }

    removeEventListeners() {
        document.removeEventListener('keydown', this.#handleKeyDown)
        document.removeEventListener('keyup', this.#handleKeyUp)
    }

    update() {
        for (const keyCode in this.keys) {
            if (this.keys[keyCode].pressed) {
                const keyData = this.keys[keyCode]
                keyData.callback('hold')
            }
        }
    }

    #handleKeyDown = event => {  
        if ((this.constructor as typeof Input).preventKeysSet && (this.constructor as typeof Input).preventKeysSet.has(event.code)) {
            event.preventDefault()
        }

        if (event.code in this.keys) {
            const keyData = this.keys[event.code]
            if (!keyData.pressed) {
                keyData.pressed = true
                keyData.callback('down')
            }
            event.preventDefault()
        }
    }

    #handleKeyUp = event => {
        if (event.code in this.keys) {
            const keyData = this.keys[event.code]
            keyData.pressed = false
            keyData.callback('up')
        }
    }
}