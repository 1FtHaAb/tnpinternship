document.body.style.background = "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
document.body.style.color = "white";
document.body.style.fontFamily = "Segoe UI, sans-serif";
document.body.style.margin = "0";
document.body.style.padding = "20px";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.overflow = "hidden";
document.body.style.height = "100vh";
document.body.style.justifyContent = "flex-start";
document.body.style.alignItems = "center";

const title = document.querySelector("h2");
title.style.fontSize = "32px";
title.style.marginBottom = "10px";
title.style.letterSpacing = "2px";
title.style.textShadow = "0 0 10px lime";

const controls = document.getElementById("controls");

controls.style.background = "#111";
controls.style.padding = "10px";
controls.style.borderRadius = "8px";
controls.style.marginBottom = "10px";
controls.style.display = "flex";
controls.style.gap = "10px";
controls.style.alignItems = "center";

const selects = document.querySelectorAll("select");

selects.forEach(select => {
    select.style.padding = "5px";
    select.style.borderRadius = "5px";
    select.style.border = "none";
    select.style.background = "#2c5364";
    select.style.color = "white";
});

const game = document.getElementById("game");
const scoreList = document.getElementById("highScoresList");

const gameContainer = document.createElement("div");

gameContainer.style.display = "flex";
gameContainer.style.gap = "40px";
gameContainer.style.alignItems = "center";
gameContainer.style.justifyContent = "center";
gameContainer.style.marginBottom = "20px";

game.parentNode.insertBefore(gameContainer, game);

gameContainer.appendChild(game);

const scoreBox = document.createElement("div");

scoreBox.style.background = "#111";
scoreBox.style.padding = "15px";
scoreBox.style.borderRadius = "10px";
scoreBox.style.boxShadow = "0 0 10px rgba(0,255,0,0.4)";
scoreBox.style.minWidth = "120px";
scoreBox.style.display = "flex";
scoreBox.style.flexDirection = "column";
scoreBox.style.alignItems = "center";
scoreBox.style.justifyContent = "center";

scoreBox.appendChild(document.querySelector("h3"));
scoreBox.appendChild(scoreList);

gameContainer.appendChild(scoreBox);

scoreList.style.listStyle = "none";
scoreList.style.padding = "0";
scoreList.style.margin = "0";
scoreList.style.fontSize = "18px";
scoreList.style.color = "gold";
scoreList.style.display = "flex";
scoreList.style.flexDirection = "column";
scoreList.style.gap = "10px";
scoreList.style.marginTop = "15px";
scoreList.style.fontSize = "20px";


let snake = [
    { x: 0, y: 0 }
];

let countdown = 5;
const timerText = document.getElementById("startTimer");

const countdownInterval = setInterval(() => {
    countdown--;
    timerText.textContent = "Game starts in " + countdown;

    if (countdown === 0) {
        clearInterval(countdownInterval);
        timerText.textContent = "GO!";
    }
}, 1000);

let foodX;
let foodY;
let score = 0;

let gameMode = "classic";
let speed = 150;
let gameLoop;

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
renderHighScores();

function updateHighScores() {
    if (score > 0) {
        highScores.push(score);
        highScores.sort((a, b) => b - a);
        highScores = highScores.slice(0, 5);
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }
    renderHighScores();
}

const modeSelect = document.getElementById("modeSelect");
const difficultySelect = document.getElementById("difficultySelect");

modeSelect.addEventListener("change", () => {
    gameMode = modeSelect.value;
});

difficultySelect.addEventListener("change", () => {
    speed = parseInt(difficultySelect.value);
    restartGame();
});

function restartGame() {
    modeSelect.disabled = false;
    difficultySelect.disabled = false;
    updateHighScores();
    clearInterval(gameLoop);
};

const scoreCard = document.getElementById("score");
screenWidth = getComputedStyle(game).width;
screenHeight = getComputedStyle(game).height;
let direction = "right";

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && direction !== "left") direction = "right";
    if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (e.key === "ArrowUp" && direction !== "down") direction = "up";
    if (e.key === "ArrowDown" && direction !== "up") direction = "down";
});

const food = document.createElement("div");
food.classList.add("food");
game.appendChild(food);

function placeFood() {
    foodX = Math.floor(Math.random() * 20) * 20;
    foodY = Math.floor(Math.random() * 20) * 20;
    if (snake.some(part => part.x === foodX && part.y === foodY)) {
        console.log("food reposition requested")
        placeFood();
    }
    food.style.left = foodX + "px";
    food.style.top = foodY + "px";
}
placeFood();

function startGame() {
    gameLoop = setInterval(() => {

        modeSelect.disabled = true;
        difficultySelect.disabled = true;

        let head = { ...snake[0] };

        if (direction === "right") head.x += 20;
        if (direction === "left") head.x -= 20;
        if (direction === "up") head.y -= 20;
        if (direction === "down") head.y += 20;

        if (gameMode === "classic") {
            if (head.x < 0 || head.x >= parseInt(screenWidth) ||
                head.y < 0 || head.y >= parseInt(screenHeight)) {

                alert("Game Over! Walls are strong enough!!!");
                updateHighScores();
                clearInterval(gameLoop);
                location.reload();
                return;
            }
        }

        if (gameMode === "infinite") {
            if (head.x < 0) head.x = parseInt(screenWidth) - 20;
            if (head.x >= parseInt(screenWidth)) head.x = 0;
            if (head.y < 0) head.y = parseInt(screenHeight) - 20;
            if (head.y >= parseInt(screenHeight)) head.y = 0;
        }

        snake.unshift(head);
        if (head.x < 0 || head.x >= parseInt(screenWidth) || head.y < 0 || head.y >= parseInt(screenHeight)) {
            alert("game Over! Walls are strong enough!!!");
            head.x = 0;
            head.y = 0;
            clearInterval(gameLoop);
            score = 0;
            scoreCard.textContent = score;
            location.reload();
            return;
        }
        if (head.x < 0) {
            head.x = parseInt(screenWidth) - 20;
        }
        else if (head.y < 0) {
            head.y = parseInt(screenHeight) - 20;
        }
        else if (head.x >= parseInt(screenWidth)) {
            head.x = 0;
        }
        else if (head.y >= parseInt(screenHeight)) {
            head.y = 0;
        }

        if (snake.slice(1).some(part => part.x === head.x && part.y === head.y)) {
            alert("game Over! You hit yourself!!");
            head.x = 0;
            head.y = 0;
            clearInterval(gameLoop);
            score = 0;
            scoreCard.textContent = score;
            location.reload();
            return;
        }

        if (head.x === foodX && head.y === foodY) {
            score++;
            scoreCard.textContent = score;
            placeFood();
        } else {
            snake.pop();
        }

        game.innerHTML = "";
        game.appendChild(food);

        snake.forEach(part => {
            const block = document.createElement("div");
            block.classList.add("snake");
            block.style.left = part.x + "px";
            block.style.top = part.y + "px";
            game.appendChild(block);
        });

    }, speed);
};
function renderHighScores() {
    const list = document.getElementById("highScoresList");
    list.innerHTML = "";
    let count = 0;
    highScores.forEach(score => {
        if (score > 0 && count < 5) {
            const li = document.createElement("li");
            li.textContent = score;
            list.appendChild(li);
            count += 1;
        }
    });
}
setTimeout(() => {
    modeSelect.disabled = true;
    difficultySelect.disabled = true;
    startGame();
}, 5000);