import style from './pikachuCSS.js'

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