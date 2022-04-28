const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

ctx.fillRect(0, 0, canvas.width, canvas.height)

const bg = new BG({
    position: {
        x: 0,
        y: 0
    },
    imageSource: './assets/bg/bg.png'
})

const bg_wheel = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    imageSource: './assets/bg/bg_wheel.png'
})

const player = new Fighter({
    position:{
        x: 110,
        y: 180
    },
    velocity:{
        x: 0,
        y: 0
    },
    color: 'red',
    imageSource: './assets/player/Idle.png',
    frames: 10,
    scale: 5.5,
    offset: {
        x: 350,
        y: 300
    },
    sprites: {
        idle: {
            imageSource: './assets/player/Idle.png',
            frames: 10
        },
        run: {
            imageSource: './assets/player/Run.png',
            frames: 6
        },
        jump: {
            imageSource: './assets/player/Jump.png',
            frames: 2
        },
        fall: {
            imageSource: './assets/player/Fall.png',
            frames: 2
        },
        attack: {
            imageSource: './assets/player/Attack.png',
            frames: 4
        },
        hit: {
            imageSource: './assets/player/Hit.png',
            frames: 3
        },
        death: {
            imageSource: './assets/player/Death.png',
            frames: 9
        }
    },
    attackBox: {
        offset: {
            x: 80,
            y: -50
        },
        width: 220,
        height: 120
    }
})

const enemy = new Fighter({
    position:{
        x: 850,
        y: 180
    },
    velocity:{
        x: 0,
        y: 0
    },
    color: 'blue',
    imageSource: './assets/enemy/Idle.png',
    frames: 6,
    scale: 2.9,
    offset: {
        x: 260,
        y: 185
    },
    sprites: {
        idle: {
            imageSource: './assets/enemy/Idle.png',
            frames: 6
        },
        run: {
            imageSource: './assets/enemy/Run.png',
            frames: 8
        },
        jump: {
            imageSource: './assets/enemy/Jump.png',
            frames: 2
        },
        fall: {
            imageSource: './assets/enemy/Fall.png',
            frames: 2
        },
        attack: {
            imageSource: './assets/enemy/Attack.png',
            frames: 4
        },
        hit: {
            imageSource: './assets/enemy/Hit.png',
            frames: 3
        },
        death: {
            imageSource: './assets/enemy/Death1.png',
            frames: 9
        }
    },
    attackBox: {
        offset: {
            x: -190,
            y: 0
        },
        width: 170,
        height: 120
    }
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

timeOut()

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    bg.update()
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    bg_wheel.draw()

    // Player Movement
    player.velocity.x = 0
    if (keys.a.pressed && player.lastKey === 'a' && player.position.x > 0) {
        player.velocity.x = -playerSpeed
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd' && player.position.x < canvas.width-50){
        player.velocity.x = playerSpeed
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    // Player Jump Animation
    if (player.velocity.y < 0){
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    // Enemy Movement
    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.position.x > 0) {
        enemy.velocity.x = -playerSpeed
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && enemy.position.x < canvas.width-50){
        enemy.velocity.x = playerSpeed
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }

    // Enemy Jump Animation
    if (enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    // Player Collision Detection
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking && player.currentFrame === 2) {
        enemy.takeHit()
        player.isAttacking = false
        //document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

    // Player Empty Attack Detection
    if (player.isAttacking && player.currentFrame === 2) player.isAttacking = false

    // Enemy Collision Detection
    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && enemy.isAttacking && enemy.currentFrame === 1) {
        player.takeHit()
        enemy.isAttacking = false
        // document.querySelector('#playerHealth').style.width = player.health + '%'
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }

    // Enemy Empty Attack Detection
    if (enemy.isAttacking && enemy.currentFrame === 1) enemy.isAttacking = false

    // Game End
    if(player.health <=0 || enemy.health<=0) {
        getWinner({player, enemy, timerId});
    }

}

animate()

window.addEventListener('keydown', (e)=>{
    if (!player.dead){
        switch (e.key){
            // Player Key Listener
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
            case ' ':
                player.attack()
                break
        }
    }

    if (!enemy.dead){
        switch (e.key){
            // Enemy Key Listeners
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
            case 'ArrowDown':
                enemy.attack()
                break
        }
    }
})

window.addEventListener('keyup', (e)=>{
    // Player Key Listeners
    switch (e.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }

    // Enemy Key Listeners
    switch (e.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})