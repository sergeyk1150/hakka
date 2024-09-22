import { Module } from "../core/module";
import "./guessNumber.css";

export class GuessNumberModule extends Module {
    constructor(min = 1, max = 100, attempts = 10) {
        super("guessNumber", "Угадай число");
        this.min = min;
        this.max = max;
        this.attempts = attempts;
        this.targetNumber = null;
        this.currentAttempt = 0;
        this.overlay = null;
        this.inputField = null;
        this.submitButton = null;
        this.restartButton = null;
        this.finishButton = null;
        this.guessesContainer = null;
    }

    trigger() {
        if (this.overlay) {
            alert("Игра уже запущена.");
            return;
        }
        this.startGame();
    }

    startGame() {
        this.targetNumber = this.generateRandomNumber(this.min, this.max);
        this.currentAttempt = 0;
        this.createOverlay();
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createOverlay() {
        this.overlay = document.createElement("div");
        this.overlay.classList.add("guess-number-overlay");

        this.finishButton = document.createElement("button");
        this.finishButton.textContent = "Закончить игру";
        this.finishButton.classList.add("finish-button");
        this.finishButton.addEventListener("click", this.finishGame.bind(this));
        this.overlay.appendChild(this.finishButton);

        const title = document.createElement("h2");
        title.textContent = "Угадай число";
        this.overlay.appendChild(title);

        this.inputField = document.createElement("input");
        this.inputField.type = "number";
        this.inputField.min = this.min;
        this.inputField.max = this.max;
        this.inputField.placeholder = `Введите число от ${this.min} до ${this.max}`;
        this.overlay.appendChild(this.inputField);

        this.submitButton = document.createElement("button");
        this.submitButton.textContent = "Отправить";
        this.submitButton.classList.add("submit-button");
        this.submitButton.addEventListener(
            "click",
            this.handleGuess.bind(this)
        );
        this.overlay.appendChild(this.submitButton);

        this.guessesContainer = document.createElement("div");
        this.guessesContainer.classList.add("guesses-container");
        this.overlay.appendChild(this.guessesContainer);

        this.restartButton = document.createElement("button");
        this.restartButton.textContent = "Начать заново";
        this.restartButton.classList.add("restart-button");
        this.restartButton.style.display = "none";
        this.restartButton.addEventListener(
            "click",
            this.restartGame.bind(this)
        );
        this.overlay.appendChild(this.restartButton);

        document.body.appendChild(this.overlay);

        this.inputField.focus();

        this.inputField.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                this.handleGuess();
            }
        });
    }

    handleGuess() {
        const userGuess = parseInt(this.inputField.value, 10);

        if (isNaN(userGuess) || userGuess < this.min || userGuess > this.max) {
            this.addGuessToContainer(
                userGuess,
                "Пожалуйста, введите число между 1 и 100.",
                "invalid"
            );
            return;
        }

        this.currentAttempt++;

        if (userGuess === this.targetNumber) {
            this.addGuessToContainer(
                userGuess,
                `Поздравляю! Вы угадали число ${this.targetNumber} за ${this.currentAttempt} попыток.`,
                "correct"
            );
            this.endGame();
        } else if (this.currentAttempt >= this.attempts) {
            this.addGuessToContainer(
                userGuess,
                `Вы исчерпали все попытки. Загаданное число было ${this.targetNumber}.`,
                "incorrect"
            );
            this.endGame();
        } else {
            if (userGuess < this.targetNumber) {
                this.addGuessToContainer(
                    userGuess,
                    "Слишком мало!",
                    "incorrect"
                );
            } else {
                this.addGuessToContainer(
                    userGuess,
                    "Слишком много!",
                    "incorrect"
                );
            }
            this.inputField.value = "";
            this.inputField.focus();
        }
    }

    addGuessToContainer(guess, message, status) {
        const guessEntry = document.createElement("p");
        guessEntry.textContent = `Попытка ${this.currentAttempt}: ${guess} - ${message}`;
        guessEntry.classList.add(status);
        this.guessesContainer.prepend(guessEntry);
    }

    endGame() {
        this.inputField.style.display = "none";
        this.submitButton.style.display = "none";

        this.restartButton.style.display = "block";
    }

    restartGame() {
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }

        this.startGame();
    }

    finishGame() {
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
    }
}
