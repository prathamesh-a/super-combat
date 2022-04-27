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
        player.dead = true
        enemy.dead = true
    }
    else if (player.health > enemy.health) {
        document.querySelector('#endLable').innerHTML = 'PLAYER 1 WON!'
    }
    else if (player.health < enemy.health) {
        document.querySelector('#endLable').innerHTML = 'PLAYER 2 WON!'
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


