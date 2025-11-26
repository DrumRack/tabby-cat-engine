export class Input {
    keys = {}

    constructor() {
        document.addEventListener('keydown', event => {
            if (event.code in this.keys) {
                const keyData = this.keys[event.code]
                if (!keyData.pressed) {
                    keyData.pressed = true
                    keyData.callback('down')
                }
                event.preventDefault()
            }
        })
        document.addEventListener('keyup', event => {
            if (event.code in this.keys) {
                const keyData = this.keys[event.code]
                keyData.pressed = false
                keyData.callback('up')
            }
        })
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

    update() {
        for (const keyCode in this.keys) {
            if (this.keys[keyCode].pressed) {
                const keyData = this.keys[keyCode]
                keyData.callback('hold')
            }
        }
    }
}