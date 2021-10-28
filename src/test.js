const style = `
.skin * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.skin *::before,
.skin *::after {
    box-sizing: border-box;
}
.skin {
    position: relative;
    background: #ffe600;
    min-height: 50vh;
}
@keyframes shake {
    0% {
    transform: rotate(0deg);
    }
    33% {
    transform: rotate(3deg);
    }
    66% {
    transform: rotate(-3deg);
    }
    100% {
    transform: rotate(0deg);
    }
}
.nose {
    position: absolute;
    border: 10px solid black;
    border-color: black transparent transparent;
    width: 0px;
    height: 0px;
    top: 85px;
    left: 50%;
    margin-left: -10px;
}
.nose::before {
    position: absolute;
    content: "";
    background: black;
    display: block;
    width: 20px;
    height: 4px;
    top: -14px;
    left: -10px;
    border-top-left-radius: 10px 4px;
    border-top-right-radius: 10px 4px;
}
.nose:hover {
    animation: shake 200ms infinite linear;
}
.eye {
    position: absolute;
    border: 3px solid black;
    background: #2e2e2e;
    width: 64px;
    height: 64px;
    left: 50%;
    top: 50px;
    margin-left: -32px;
    border-radius: 50%;
}
.eye::after {
    position: absolute;
    display: block;
    content: "";
    border: 3px solid black;
    background: white;
    border-radius: 50%;
    width: 31px;
    height: 31px;
    margin-left: 7px;
    margin-top: -2px;
}
.eye.left {
    transform: translateX(-120px);
}
.eye.right {
    transform: translateX(120px);
}
.mouth {
    position: absolute;
    width: 200px;
    height: 200px;
    left: 50%;
    top: 120px;
    margin-left: -100px;
}
.mouth > .upperLipLeft {
    position: absolute;
    border: 3px solid black;
    width: 90px;
    height: 20px;
    border-top: none;
    border-right: none;
    border-bottom-left-radius: 50px 25px;
    transform: rotate(-15deg);
    left: 50%;
    margin-left: -90px;
    z-index: 1;
    background: #ffe600;
}
.mouth > .upperLipRight {
    position: absolute;
    border: 3px solid black;
    width: 90px;
    height: 20px;
    border-top: none;
    border-left: none;
    border-bottom-right-radius: 50px 25px;
    transform: rotate(15deg);
    left: 50%;
    z-index: 1;
    background: #ffe600;
}
.mouth > .lowerLip {
    position: absolute;
    height: 172px;
    width: 100%;
    bottom: 20px;
    overflow: hidden;
}
.mouth > .lowerLip > .lipShadow {
    position: absolute;
    border: 3px solid black;
    background: #9b000a;
    width: 160px;
    height: 1000px;
    bottom: 15px;
    left: 50%;
    margin-left: -80px;
    border-radius: 80px / 320px;
    overflow: hidden;
}
.mouth > .lowerLip > .lipShadow > .lipShadowUp {
    position: absolute;
    border: 1px solid red;
    width: 200px;
    height: 300px;
    left: 50%;
    margin-left: -100px;
    bottom: -170px;
    border-radius: 100px;
    background: #ff485f;
}
.cheek {
    position: absolute;
    border: 3px solid black;
    width: 88px;
    height: 88px;
    left: 50%;
    top: 160px;
    margin-left: -44px;
    border-radius: 50%;
    background: #ff0000;
}
.cheek > img {
    position: absolute;
    left: 50%;
    top: 50%;
}
.cheek.left {
    transform: translateX(-165px);
}
.cheek.left > img {
    transform: rotateY(-180deg);
    transform-origin: 0 0;
}
.cheek.right {
    transform: translateX(165px);
}
`

const player = {
    id: undefined,
    time: 50,
    n: 1,
    ui: {
        output1: document.querySelector('#output1'),
        output2: document.querySelector('#output2')
    },
    events: {
        '#btnPause': 'pause',
        '#btnPlay': 'play',
        '#btnSlow': 'slow',
        '#btnNormal': 'normal',
        '#btnFast': 'fast'
    },
    init: () => {
        player.ui.output1.innerText = style.substr(0, player.n)
        player.ui.output2.innerHTML = style.substr(0, player.n) 
        player.bindEvents()
        player.play()
    },
    bindEvents: () => {
        for (let key in player.events) {
            if (player.events.hasOwnProperty(key)) {
                const value = player.events[key]  // value = pause / play / slow ...
                document.querySelector(key).onclick = player[value] 
            }
        }
    },
    run: () => {
        player.n += 1
        if (player.n > style.length) {
            window.clearInterval(player.id)
            return
        }
        player.ui.output1.innerText = style.substr(0, player.n)
        player.ui.output2.innerHTML = style.substr(0, player.n)
        player.ui.output1.scrollTop = player.ui.output1.scrollHeight
    },
    pause: () => {
        window.clearInterval(player.id)
    },
    play: () => {
        player.pause()
        player.id = setInterval(player.run, player.time)
    },
    slow: () => {
        player.pause()
        player.time = 200
        player.play()
    },
    normal: () => {
        player.pause()
        player.time = 50
        player.play()
    },
    fast: () => {
        player.pause()
        player.time = 0
        player.play()
    }
}

player.init()


/*
const output1 = document.querySelector('#output1')
const output2 = document.querySelector('#output2')

let n = 1
output1.innerText = style.substr(0, n) 
output2.innerHTML = style.substr(0, n)

const run = () => {
    n += 1
    if (n > style.length) {
        clearInterval(id)
        return
    }
    output1.innerText = style.substr(0, n)
    output2.innerHTML = style.substr(0, n)
    output1.scrollTop = output1.scrollHeight
}
let time = 50
const play = () => {
    return setInterval(run, time)
}
let id = play()
const pause = () => {
    window.clearInterval(id)
}


btnPause.onclick = () => {
    pause()
}
btnPlay.onclick = () => {
    pause()
    id = play()
}
btnSlow.onclick = () => {
    pause()
    time = 150
    id = play()
}
btnNormal.onclick = () => {
    pause()
    time = 50
    id = play()
}
btnFast.onclick = () => {
    pause()
    time = 0
    id = play()
}
*/