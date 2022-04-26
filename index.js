const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

ctx.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5
const playerSpeed = 4;

class Sprite {
    constructor({position, velocity, color}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.isOnGround
        this.color = color
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
    }

    draw() {
        // Character Box
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        // Attack Box
        ctx.fillStyle = 'yellow'
        ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
            this.isOnGround = true
        }
        else {
            this.velocity.y += gravity
            this.isOnGround = false;
        }
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
    },
    color: 'red'
})

const enemy = new Sprite({
    position:{
        x: 400,
        y: 100
    },
    velocity:{
        x: 0,
        y: 0
    },
    color: 'blue'
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    // Player Movement
    player.velocity.x = 0
    if (keys.a.pressed && player.lastKey === 'a' && player.position.x > 0) {
        player.velocity.x = -playerSpeed
    } else if (keys.d.pressed && player.lastKey === 'd' && player.position.x < canvas.width-50){
        player.velocity.x = playerSpeed
    }

    // Enemy Movement
    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.position.x > 0) {
        enemy.velocity.x = -playerSpeed
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && enemy.position.x < canvas.width-50){
        enemy.velocity.x = playerSpeed
    }

    // Collision Detection
    if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x
        && player.attackBox.position.x <= enemy.position.x + enemy.width
        && player.attackBox.position.y + player.attackBox.height >= enemy.position.y
        && player.attackBox.position.y <= enemy.position.y + enemy.height) {
        console.log("Red attacked Blue!")
    }
}

animate()

window.addEventListener('keydown', (e)=>{
    switch (e.key){
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            if (player.isOnGround) player.velocity.y = -17
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            if (enemy.isOnGround) enemy.velocity.y = -17
            break
    }
})

window.addEventListener('keyup', (e)=>{
    switch (e.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }

    switch (e.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})