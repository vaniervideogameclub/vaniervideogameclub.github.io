document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const imageUpload = document.getElementById('imageUpload');

    canvas.width = 900;
    canvas.height = 600;

    let bird = {
        x: 50,
        y: canvas.height / 2,
        width: 50,
        height: 50,
        gravity: 0.2,  // Slower fall speed
        lift: -8,      // Adjusted lift for balance
        velocity: 0,
        img: new Image()
    };

    bird.img.src = 'icon.png';

    let pipes = [];
    let score = 0;
    var gameOver = false;
    let gameStarted = false;

    function drawBird() {
        ctx.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);
    }

    function drawPipes() {
        for (let i = 0; i < pipes.length; i++) {
            let pipe = pipes[i];
            ctx.fillStyle = '#008000';
            ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
            ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
        }
    }

    function updateBird() {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        if (bird.y + bird.height > canvas.height || bird.y < 0) {
            gameOver = true;
        }
    }

    function updatePipes() {
        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
            let pipeHeight = Math.floor(Math.random() * (canvas.height / 2 ));
            let gap = 300;
            pipes.push({
                x: canvas.width,
                width: 20,
                top: pipeHeight,
                bottom: canvas.height - (pipeHeight + gap)
            });
        }

        for (let i = 0; i < pipes.length; i++) {
            pipes[i].x -= 2;

            if (pipes[i].x + pipes[i].width < 0) {
                pipes.splice(i, 2);
                score++;
            }

            if (bird.x + bird.width > pipes[i].x && bird.x < pipes[i].x + pipes[i].width &&
                (bird.y < pipes[i].top || bird.y + bird.height > canvas.height - pipes[i].bottom)) {
                gameOver = true;
            }
        }
    }

    function drawScore() {
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 30);
    }

    function drawStartScreen() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '30px Arial';
        ctx.fillText('Click or Press Space to Start', canvas.width / 2 - 130, canvas.height / 2);
    }

    function gameLoop() {
        if (gameOver) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = '30px Arial';
            ctx.fillText('Game Over', canvas.width / 2 - 75, canvas.height / 2);
            ctx.fillText('Score: ' + score, canvas.width / 2 - 50, canvas.height / 2 + 40);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBird();
        drawPipes();
        drawScore();
        updateBird();
        updatePipes();
        requestAnimationFrame(gameLoop);
    }

    function resetGame() {
        bird.y = canvas.height / 2;
        bird.velocity = 0;
        pipes = [];
        score = 0;
        var gameOver = false;
        var gameStarted = false;
        drawStartScreen();
    }

    function startGame() {
        if (!gameStarted || gameOver) {
            gameStarted = true;
            gameOver = false;
            resetGame();
            gameLoop();
        }
    }

    function jump() {
        if (!gameOver) {
            bird.velocity = bird.lift;
        }
    }

    canvas.addEventListener('click', () => {
        if (!gameStarted || gameOver) {
            startGame();
        } else {
            jump();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            if (!gameStarted || gameOver) {
                startGame();
            } else {
                jump();
            }
        }
    });

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            bird.img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    resetGame();
});
