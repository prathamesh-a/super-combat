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
    document.querySelector('#endLable').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#endLable').innerHTML = 'TIE'
    }
    else if (player.health > enemy.health) {
        document.querySelector('#endLable').innerHTML = 'RED WON!'
    }
    else if (player.health < enemy.health) {
        document.querySelector('#endLable').innerHTML = 'BLUE WON!'
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


