const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

ctx.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2

class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.valocity = velocity
        this.height = 150
    }

    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.valocity.y

        if (this.position.y + this.height + this.valocity.y >= canvas.height){
            this.valocity.y = 0
        }
        else this.valocity.y += gravity
    }
}

const player = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position:{
        x: 400,
        y: 100
    },
    velocity:{
        x: 0,
        y: 0
    }
})

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
}

animate()