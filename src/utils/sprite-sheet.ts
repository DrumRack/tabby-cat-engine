import {Sprite} from '../entities/sprite.js'

export class SpriteSheet {
    image
    imageWidth
    imageHeight
    spriteWidth
    spriteHeight
    
    constructor({image, imageWidth, imageHeight, spriteWidth, spriteHeight}) {
        this.image = image
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight
        this.spriteWidth = spriteWidth
        this.spriteHeight = spriteHeight
    }

    getSprite(index) {
        return new Sprite({
            image: this.image,
            sourceX: this.#getSourceX(index),
            sourceY: this.#getSourceY(index),
            width: this.spriteWidth,
            height: this.spriteHeight
        })
    }

    #getSourceX(index) {
        return (--index * this.spriteWidth) % this.imageWidth
    }
    
    #getSourceY(index) {
        return Math.trunc((--index * this.spriteWidth) / this.imageWidth) * this.spriteHeight
    }
}