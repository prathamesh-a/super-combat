class Sprite {
    constructor({position, imageSource, scale = 1, frames = 1, offset={x:0, y:0}}) {
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
        this.offset = offset
    }

    animateFrame(){
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0){
            if(this.currentFrame < this.frames-1) this.currentFrame++
            else this.currentFrame = 0;
        }
    }
    draw() {
        ctx.drawImage(
            this.image,
            this.currentFrame*(this.image.width/ this.frames),
            0,
            this.image.width/this.frames,
            this.image.height,

            this.position.x-this.offset.x,
            this.position.y-this.offset.y,
            (this.image.width/this.frames)*this.scale,
            this.image.height*this.scale)
    }

    update() {
        this.draw()
        this.animateFrame()
    }
}

class Fighter extends Sprite{
    constructor({position,
                    velocity,
                    color,
                    imageSource,
                    scale = 1,
                    frames = 1,
                    offset={x:0, y:0},
                    sprites,
                    attackBox = {offset: {}, width: undefined, height: undefined}
    }) {
        super({
            position,
            imageSource,
            scale,
            frames,
            offset
        }
        )
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.isOnGround
        this.color = color
        this.isAttacking
        this.health = 100
        this.currentFrame = 0
        this.framesElapsed = 0
        this.framesHold = 12
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSource
        }
    }

    update() {
        this.draw()
        if (!this.dead) this.animateFrame()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
       //ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // Entity Gravity
        if (this.position.y + this.height + this.velocity.y >= canvas.height-45){
            this.velocity.y = 0
            this.position.y = 381
            this.isOnGround = true
        }
        else {
            this.velocity.y += gravity
            this.isOnGround = false;
        }
    }

    attack() {
        this.switchSprite('attack')
        this.isAttacking = true
        // setTimeout(() => {
        //     this.isAttacking = false
        // }, 100)
    }

    takeHit(){
        this.health -= attackDamange
        if (this.health <= 0) {
            this.switchSprite('death')
        } else {
            this.switchSprite('hit')
        }
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.death.image) {
            if (this.currentFrame === this.sprites.death.frames-1) {
                this.dead = true
            }
            return
        }
        if (this.image === this.sprites.attack.image && this.currentFrame < this.sprites.attack.frames-1) return
        if (this.image === this.sprites.hit.image && this.currentFrame < this.sprites.hit.frames-1) return

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.frames = this.sprites.idle.frames
                    this.currentFrame = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image){
                    this.frames = this.sprites.run.frames
                    this.image = this.sprites.run.image
                    this.currentFrame = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.frames = this.sprites.jump.frames
                    this.currentFrame = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image
                    this.frames = this.sprites.fall.frames
                    this.currentFrame = 0
                }
                break
            case 'attack':
                if (this.image !== this.sprites.attack.image){
                    this.image = this.sprites.attack.image
                    this.frames = this.sprites.attack.frames
                    this.currentFrame = 0
                }
                break
            case 'hit':
                if (this.image !== this.sprites.hit.image){
                    this.image = this.sprites.hit.image
                    this.frames = this.sprites.hit.frames
                    this.currentFrame = 0
                }
                break
            case 'death':
                if (this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image
                    this.frames = this.sprites.death.frames
                    this.currentFrame = 0
                }
                break
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