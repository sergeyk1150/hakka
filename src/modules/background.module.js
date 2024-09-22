import { Module } from "../core/module";
import { random } from "../utils";

export class BackgroundModule extends Module {

    trigger() {
        const r = random(0, 255);
        const g = random(0, 255);
        const b = random(0, 255);
        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
}
