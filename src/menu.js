import {Menu} from './core/menu'

export class ContextMenu extends Menu {
    
    open() {
        this.el.classList.add('open')
    }

    close() {
        this.el.classList.remove('open')
    }

    add(module) {
        this.el.insertAdjacentHTML('afterbegin', module.toHTML())
    }
}