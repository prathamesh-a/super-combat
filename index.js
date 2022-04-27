const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

ctx.fillRect(0, 0, canvas.width, canvas.height)

// CONFIG
const gravity = 0.5;
const playerSpeed = 4;
const attackDamange = 20;
let time = 60;

const bg = new BG({
    position: {
        x: 0,
        y: 0
    },
    imageSource: './assets/bg.png'
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
    offset: {
        x: 0,
        y: 0
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
    offset: {
        x: -50,
        y: 0
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

    // Player Collision Detection
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking) {
        player.isAttacking = false
        enemy.health -= attackDamange
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    // Enemy Collision Detection
    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && enemy.isAttacking) {
        enemy.isAttacking = false
        player.health -= attackDamange
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    // Game End
    if(player.health <=0 || enemy.health<=0) {
        getWinner({player, enemy, timerId});
    }

}

animate()

window.addEventListener('keydown', (e)=>{
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