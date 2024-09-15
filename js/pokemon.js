let score = 0;
let gameInterval;
let timerInterval;
const pokemon = document.getElementById('pokemon');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const pokemonContainer = document.getElementById('pokemonContainer');
const start30Seconds = document.getElementById('start30Seconds');
const startNoTime = document.getElementById('startNoTime');
const uploadImage = document.getElementById('uploadImage');

function movePokemon() {
    const maxX = pokemonContainer.clientWidth - pokemon.clientWidth;
    const maxY = pokemonContainer.clientHeight - pokemon.clientHeight;
    pokemon.style.top = `${Math.random() * maxY}px`;
    pokemon.style.left = `${Math.random() * maxX}px`;
}

function startGame(duration) {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    movePokemon();

    // Clear existing intervals
    if (gameInterval) clearInterval(gameInterval);
    if (timerInterval) clearInterval(timerInterval);

    if (duration) {
        let timeLeft = duration / 1000;
        timerDisplay.textContent = `Time: ${formatTime(timeLeft)}`;

        gameInterval = setTimeout(() => {
            clearInterval(timerInterval);
            timerDisplay.textContent = `Time: 00:00`;
            alert('Time is up!');
        }, duration);

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time: ${formatTime(timeLeft)}`;
            if (timeLeft <= 0) clearInterval(timerInterval);
        }, 1000);
    } else {
        timerDisplay.textContent = 'Time: Unlimited';
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

pokemon.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    movePokemon();
});

start30Seconds.addEventListener('click', () => startGame(30000)); // 30 seconds
startNoTime.addEventListener('click', () => startGame()); // Unlimited time

uploadImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            pokemon.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
