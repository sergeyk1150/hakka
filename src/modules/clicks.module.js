import { Module } from "../core/module";
import "./clicks.css";

export class ClicksModule extends Module {
    constructor(countdown = 3, duration = 10) {
        super("clicksModule", "Аналитика кликов");
        this.clickCount = 0;
        this.timer = null;
        this.countdown = countdown;
        this.duration = duration;
        this.handler = this.incrementClicks.bind(this);
        this.overlay = null;
    }

    trigger() {
        if (this.timer || this.overlay) {
            alert("Аналитика кликов уже запущена.");
            return;
        }
        this.showOverlay();
        this.startCountdown();
    }

    incrementClicks() {
        this.clickCount++;
        this.updateDisplay();
    }

    startCountdown() {
        let remaining = this.countdown;
        this.updateCountdown(remaining);

        const countdownInterval = setInterval(() => {
            if (--remaining <= 0) {
                clearInterval(countdownInterval);
                this.startClickCounting();
            } else {
                this.updateCountdown(remaining);
            }
        }, 1000);
    }

    startClickCounting() {
        this.countdownElement.style.display = "none";
        this.clickCountElement.style.display = "block";
        this.statusElement.style.display = "block";
        this.clickCount = 0;
        this.updateDisplay();

        this.updateStatus(`Осталось времени: ${this.duration} сек.`);
        this.registerClickEvents();

        let remaining = this.duration;
        this.timer = setInterval(() => {
            if (--remaining <= 0) {
                clearInterval(this.timer);
                this.timer = null;
                this.finishCounting();
            } else {
                this.updateStatus(`Осталось времени: ${remaining} сек.`);
            }
        }, 1000);
    }

    finishCounting() {
        this.deregisterClickEvents();
        this.updateStatus(
            `Результат: ${this.clickCount} кликов за ${this.duration} секунд`
        );
        this.clickCountElement.style.display = "none";
        this.showClearButton();
    }

    showOverlay() {
        if (!this.overlay) {
            this.createOverlay();
            document.body.appendChild(this.overlay);
        }

        this.resetOverlay();
    }

    createOverlay() {
        this.overlay = document.createElement("div");
        this.overlay.classList.add("clicks-overlay");

        const title = document.createElement("h2");
        title.textContent = "Аналитика кликов";
        this.overlay.appendChild(title);

        this.finishButton = document.createElement("button");
        this.finishButton.textContent = "Завершить досрочно";
        this.finishButton.classList.add("finish-button");
        this.finishButton.addEventListener("click", this.clear.bind(this));
        this.overlay.appendChild(this.finishButton);

        this.countdownElement = this.createElement("div", "countdown");
        this.clickCountElement = this.createElement(
            "div",
            "click-count",
            "none"
        );
        this.statusElement = this.createElement("div", "status", "none");

        [
            this.countdownElement,
            this.clickCountElement,
            this.statusElement,
        ].forEach((el) => {
            this.overlay.appendChild(el);
        });
    }

    createElement(tag, className, display = "block", textContent = "") {
        const element = document.createElement(tag);
        element.className = className;
        element.style.display = display;
        element.textContent = textContent;
        return element;
    }

    resetOverlay() {
        this.countdownElement.style.display = "block";
        this.countdownElement.textContent = `Начало подсчета через: ${this.countdown} сек.`;
        this.clickCountElement.style.display = "none";
        this.statusElement.style.display = "none";
        this.finishButton.style.display = "block";
    }

    registerClickEvents() {
        document.addEventListener("click", this.handler);
    }

    deregisterClickEvents() {
        document.removeEventListener("click", this.handler);
    }

    updateCountdown(seconds) {
        this.countdownElement.textContent = `Начало подсчета через: ${seconds} сек.`;
    }

    updateDisplay() {
        this.clickCountElement.textContent = `Клики: ${this.clickCount}`;
    }

    updateStatus(message) {
        this.statusElement.textContent = message;
    }

    showClearButton() {
        this.finishButton.style.display = "block";
    }

    clear() {
        if (this.overlay) {
            this.overlay.classList.add("fade-out");
            this.overlay.addEventListener("animationend", () => {
                this.overlay.remove();
                this.overlay = null;
                this.resetState();
            });
        } else {
            this.resetState();
        }
    }

    resetState() {
        clearInterval(this.timer);
        this.clickCount = 0;
        this.timer = null;
    }
}
