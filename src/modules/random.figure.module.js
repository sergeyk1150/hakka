import {Module} from '../core/module'
import {random} from '../utils'

export class RandomFigure extends Module {
    trigger() {
        const $rootElement = document.createElement('div')
        $rootElement.className = 'module'
        Object.assign($rootElement.style, {
            background: 'black',
            width: `${random(10, 500)}px`,
            height: `${random(10, 500)}px`,
        })
        $rootElement.style.borderRadius = `${random(1, 50)}px`
        document.body.append($rootElement)
    }
}