class SnakeGame {
    constructor(gameScreenId) {
        this.gameScreen = document.getElementById(gameScreenId);
        this.score = 0;
        this.gameInterval = null;
        this.gameStarted = false;
        this.gameOver = false;
        this.food = { x: 10, y: 5 };
        this.snake = [
            { x: 10, y: 12 }, { x: 10, y: 13 }, { x: 10, y: 14 },
            { x: 10, y: 15 }, { x: 10, y: 16 }, { x: 10, y: 17 },
            { x: 10, y: 18 }, { x: 11, y: 18 }, { x: 12, y: 18 },
            { x: 13, y: 18 }, { x: 14, y: 18 }, { x: 15, y: 18 },
            { x: 15, y: 19 }, { x: 15, y: 20 }, { x: 15, y: 21 },
            { x: 15, y: 22 }, { x: 15, y: 23 }, { x: 15, y: 24 }
        ];
        this.direction = "up";
        this.init();
    }

    init() {
        document.addEventListener("keydown", (e) => this.handleKeyPress(e));
        window.addEventListener("resize", () => this.render());
        this.render();
    }

    startGame() {
        document.getElementById("start-button").style.display = "none";
        this.gameStarted = true;
        this.gameInterval = setInterval(() => this.moveSnake(), 50);
    }

    generateNewFood() {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * 24),
                y: Math.floor(Math.random() * 40)
            };
        } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
        return food;
    }

    startAgain() {
        document.getElementById("start-button").style.display = "block";
        document.getElementById("game-over").style.display = "none";
        document.getElementById("congrats").style.display = "none";
        this.gameStarted = false;
        this.gameOver = false;
        this.restartScore();
        this.food = { x: 10, y: 5 };
        this.snake = [
            { x: 10, y: 12 }, { x: 10, y: 13 }, { x: 10, y: 14 },
            { x: 10, y: 15 }, { x: 10, y: 16 }, { x: 10, y: 17 },
            { x: 10, y: 18 }, { x: 11, y: 18 }, { x: 12, y: 18 },
            { x: 13, y: 18 }, { x: 14, y: 18 }, { x: 15, y: 18 },
            { x: 15, y: 19 }, { x: 15, y: 20 }, { x: 15, y: 21 },
            { x: 15, y: 22 }, { x: 15, y: 23 }, { x: 15, y: 24 }
        ];
        this.direction = "up";
        clearInterval(this.gameInterval);
        this.render();
    }

    moveSnake() {
        let x = this.snake[0].x;
        let y = this.snake[0].y;

        switch (this.direction) {
            case "up":
                y--;
                break;
            case "down":
                y++;
                break;
            case "left":
                x--;
                break;
            case "right":
                x++;
                break;
        }

        if (x >= 0 && x < 24 && y >= 0 && y < 40 && !this.snake.find(segment => segment.x === x && segment.y === y)) {
            this.snake.unshift({ x, y });

            if (x === this.food.x && y === this.food.y) {
                this.score++;
                const foodElements = document.getElementsByClassName("food");
                if (foodElements[this.score - 1]) {
                    foodElements[this.score - 1].style.opacity = 1;
                }

                if (this.score === 10) {
                    this.snake.unshift({ x, y });
                    this.food = { x: null, y: null };
                    clearInterval(this.gameInterval);
                    document.getElementById("congrats").style.display = "block";
                    this.gameOver = true;
                    this.gameStarted = false;
                } else {
                    this.food = this.generateNewFood();
                }
            } else {
                this.snake.pop();
            }
        } else {
            clearInterval(this.gameInterval);
            document.getElementById("game-over").style.display = "block";
            this.gameStarted = false;
            this.gameOver = true;
        }

        this.render();
    }

    render() {
        this.gameScreen.innerHTML = "";
        const cellSize = window.innerWidth > 1536 ? "10px" : "8px";

        for (let y = 0; y < 40; y++) {
            for (let x = 0; x < 24; x++) {
                const cell = document.createElement("div");
                cell.classList.add("cell", "black");
                cell.style.width = cellSize;
                cell.style.height = cellSize;
                cell.style.display = "flex";
                cell.style.flexShrink = 0;

                const snakeSegment = this.snake.find(segment => segment.x === x && segment.y === y);
                
                if (snakeSegment) {
                    cell.style.backgroundColor = "#43D9AD";
                    cell.style.opacity = 1 - this.snake.indexOf(snakeSegment) / this.snake.length;
                    cell.classList.add("green");

                    if (this.snake.indexOf(snakeSegment) === 0) {
                        const radius = "5px";
                        if (this.direction === "up") {
                            cell.style.borderTopLeftRadius = radius;
                            cell.style.borderTopRightRadius = radius;
                        } else if (this.direction === "down") {
                            cell.style.borderBottomLeftRadius = radius;
                            cell.style.borderBottomRightRadius = radius;
                        } else if (this.direction === "left") {
                            cell.style.borderTopLeftRadius = radius;
                            cell.style.borderBottomLeftRadius = radius;
                        } else if (this.direction === "right") {
                            cell.style.borderTopRightRadius = radius;
                            cell.style.borderBottomRightRadius = radius;
                        }
                    }
                } else if (x === this.food.x && y === this.food.y) {
                    cell.style.backgroundColor = "#43D9AD";
                    cell.style.borderRadius = "50%";
                    cell.style.boxShadow = "0 0 10px #43D9AD";
                }

                this.gameScreen.appendChild(cell);
            }
        }
    }

    restartScore() {
        this.score = 0;
        const foodElements = document.getElementsByClassName("food");
        for (let i = 0; i < foodElements.length; i++) {
            foodElements[i].style.opacity = 0.3;
        }
    }

    move(direction) {
        switch (direction) {
            case "up":
                if (this.direction !== "down") this.direction = "up";
                break;
            case "down":
                if (this.direction !== "up") this.direction = "down";
                break;
            case "left":
                if (this.direction !== "right") this.direction = "left";
                break;
            case "right":
                if (this.direction !== "left") this.direction = "right";
                break;
        }
    }

    handleKeyPress(e) {
        if (this.gameStarted) {
            switch (e.keyCode) {
                case 37: // Left arrow
                    this.move("left");
                    break;
                case 38: // Up arrow
                    this.move("up");
                    break;
                case 39: // Right arrow
                    this.move("right");
                    break;
                case 40: // Down arrow
                    this.move("down");
                    break;
            }
        } else {
            switch (e.keyCode) {
                case 32: // Spacebar
                    this.gameOver ? this.startAgain() : this.startGame();
                    break;
            }
        }
    }
}


const game = new SnakeGame("game-screen");

document.addEventListener("click", (e) => {
    if (e.target.id === "start-button") {
        game.startGame();
    } else if (e.target.dataset.button === "restart") {
        game.startAgain();
    } else if (e.target.id === "console-button") {
        const direction = e.target.dataset.direction;
        game.move(direction);
    }
});
