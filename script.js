document.addEventListener('DOMContentLoaded', () => {
    const leaderboardRow = document.querySelector('.leaderboard tbody tr');
    leaderboardRow.style.transform = 'translateX(-100%)';
    leaderboardRow.style.transition = 'transform 1s ease-in-out';
    setTimeout(() => {
        leaderboardRow.style.transform = 'translateX(0)';
    }, 500);

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

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'm') {
            const audio = new Audio('https://www.myinstants.com/media/sounds/smb_coin.mp3');
            audio.play();
        }
    });
});
