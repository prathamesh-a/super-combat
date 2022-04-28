let timerId

function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function getWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#endMenu').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#endLable').innerHTML = 'MATCH TIED'
        document.title = 'MATCH TIED!'
        player.dead = true
        enemy.dead = true
    }
    else if (player.health > enemy.health) {
        document.querySelector('#endLable').innerHTML = 'PLAYER 1 WON!'
        document.title = 'PLAYER 1 WON!'
    }
    else if (player.health < enemy.health) {
        document.querySelector('#endLable').innerHTML = 'PLAYER 2 WON!'
        document.title = 'PLAYER 2 WON!'
    }
}

function timeOut() {
    if (time > 0) {
        timerId = setTimeout(timeOut, 1000)
        time--
        document.querySelector('#timer').innerHTML = time
    }
    else {
        getWinner({player, enemy, timerId});
    }
}

function restartGame() {
    // Player Reset
    player.position = {x: 110, y:180};
    player.dead = false
    player.image = player.sprites.idle.image
    player.health = 100
    document.querySelector('#playerHealth').style.width = '100%'

    // Enemy Reset
    enemy.position = {x: 850, y: 180};
    enemy.dead = false
    enemy.image = enemy.sprites.idle.image
    enemy.health = 100
    document.querySelector('#enemyHealth').style.width = '100%'

    // UI Reset
    document.querySelector('#endMenu').style.display = 'none'
    time = 60
    timeOut()

}


