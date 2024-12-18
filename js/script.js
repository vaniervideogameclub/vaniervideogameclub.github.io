document.addEventListener('DOMContentLoaded', () => {
    const coinIcon = document.getElementById('coinIcon');
    const coinSound = document.getElementById('coinSound');
    const leaderboardRow = document.querySelector('.leaderboard tbody tr');

    if (leaderboardRow) {
        setTimeout(() => {
            leaderboardRow.style.transform = 'translateX(0)';
        }, 500);
    }

    const rows = document.querySelectorAll('.leaderboard tbody tr');
    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = '#1a1a1a';
            row.style.transition = 'background-color 0.3s';
        });
        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });
    });

    coinIcon.addEventListener('click', () => {
        coinSound.play();
    });
});
