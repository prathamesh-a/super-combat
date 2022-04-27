class Sprite {
    constructor({position, imageSource, scale = 1, frames = 1}) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src  = imageSource
        this.scale = scale
        this.frames = frames
        this.currentFrame = 0
        this.framesElapsed = 0
        this.framesHold = 1
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.currentFrame*(this.image.width/ this.frames),
            0,
            this.image.width/this.frames,
            this.image.height,

            this.position.x,
            this.position.y,
            (this.image.width/this.frames)*this.scale,
            this.image.height*this.scale)
    }

    update() {
        this.draw()
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0){
            if(this.currentFrame < this.frames-1) this.currentFrame++
            else this.currentFrame = 0;
        }
    }
}

class BG {
    constructor({position, imageSource, frames = 4}) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src  = imageSource
        this.frames = frames
        this.currentFrame = 0
        this.framesElapsed = 0
        this.framesHold = 25
    }

    draw() {
        ctx.drawImage(this.image,
            0,
            this.currentFrame*(this.image.height/this.frames),
            this.image.width,
            this.image.height/this.frames,

            this.position.x,
            this.position.y,
            (this.image.width),
            (this.image.height/this.frames))
    }

    update() {
        this.draw()
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0){
            if(this.currentFrame < this.frames-1) this.currentFrame++
            else this.currentFrame = 0;
        }
    }
}

class Fighter {
    constructor({position, velocity, color, offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.isOnGround
        this.color = color
        this.isAttacking
        this.health = 100
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
    }

    draw() {
        // Character Box
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        // Attack Box
        if (this.isAttacking) {
            ctx.fillStyle = 'yellow'
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update() {
        this.draw()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height-45){
            this.velocity.y = 0
            this.isOnGround = true
        }
        else {
            this.velocity.y += gravity
            this.isOnGround = false;
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}