import { Module } from "../core/module";

export class ShowTime extends Module {
    // constructor() {
    //     super("showTime", "Показать время");
    // }

    trigger() {
        const now = new Date();
        alert(`Текущее время: ${now.toLocaleTimeString()}`);
    }
}
