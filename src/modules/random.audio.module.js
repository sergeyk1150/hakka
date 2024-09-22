import { Module } from '../core/module'
import { random } from '../utils'

export class RandomAudio extends Module {
    trigger() {
        const $rootElement = document.createElement('div')
        $rootElement.className = 'module'
        let audio = new Audio()
        const number = random(1, 6)
        audio.src = `./src/audio/sound${number}.mp3`
        $rootElement.append(audio)
        document.body.append($rootElement)
        audio.play()
    }
}