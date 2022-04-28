const canvas = document.querySelector('canvas')
const i = canvas.getContext("2d")
let helpToggled = false

class mainMenuBG {
    constructor({position, imageSource}) {
        this.position = position
        this.image = new Image()
        this.image.src  = imageSource
        this.frames = 4
        this.currentFrame = 0
        this.framesElapsed = 0
        this.framesHold = 25
    }

    draw() {
        i.drawImage(this.image,
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


const mainMenuBg = new mainMenuBG({
    position: {
        x: 0,
        y: 0
    },
    imageSource: './assets/bg/bg.png'
})

function animateBG() {
    window.requestAnimationFrame(animateBG)
    i.fillStyle = 'black'
    i.fillRect(0, 0, canvas.width, canvas.height)
    mainMenuBg.update()
    i.fillStyle = 'rgba(255, 255, 255, 0.15)'
    i.fillRect(0, 0, canvas.width, canvas.height)
}

animateBG()

function toggleHelp() {
    if (helpToggled) {
        document.querySelector('#help-box').style.display = 'none'
        helpToggled = false
    }
    else {
        document.querySelector('#help-box').style.display = 'block'
        helpToggled = true
    }
}