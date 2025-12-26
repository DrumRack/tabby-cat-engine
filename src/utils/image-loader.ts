export class ImageLoader {
    #imageFiles
    images = {}

    constructor(imageFiles) {
        this.#imageFiles = imageFiles
    }

    loadImages() {
        const promises = []
        for (const name in this.#imageFiles) {
            promises.push(this.#loadImage(name, this.#imageFiles[name]))
        }
        return Promise.all(promises)
    }

    #loadImage(name, src) {
        return new Promise<void>((resolve, reject) => {
            const image = new Image()
            image.onload = () => {
                this.images[name] = image
                resolve()
            }
            image.onerror = () => reject(new Error(`Failed to load image: ${src}`))
            image.src = src
        })
    }
}