document.addEventListener('DOMContentLoaded', function() {
    fetch('json/roadmap.json')
        .then(response => response.json())
        .then(events => {
            const timeline = document.querySelector('.timeline');
            events.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');

                const dateDiv = document.createElement('div');
                dateDiv.classList.add('date');
                dateDiv.textContent = event.date;

                const contentDiv = document.createElement('div');
                contentDiv.classList.add('event-content');

                const title = document.createElement('h2');
                title.textContent = event.title;
                contentDiv.appendChild(title);

                // Add description if exists
                if (event.description) {
                    const description = document.createElement('p');
                    description.textContent = event.description;
                    description.classList.add('description');
                    contentDiv.appendChild(description);
                }

                // Add image from URL if exists
                if (event.image) {
                    const image = document.createElement('img');
                    image.src = event.image;
                    image.alt = event.title;
                    image.style.maxWidth = '100%';
                    contentDiv.appendChild(image);
                }

                // Add Instagram link as a button if exists
                if (event["instagram link"]) {
                    const instagramButton = document.createElement('a');
                    instagramButton.href = event["instagram link"];
                    instagramButton.target = "_blank";
                    instagramButton.classList.add('instagram-button');
                    instagramButton.textContent = "View on Instagram";
                    contentDiv.appendChild(instagramButton);
                }

                // Add winners if they exist and are exactly 3 non-empty entries
                if (event.winners && event.winners.length === 3 && event.winners.every(winner => winner.trim() !== "")) {
                    const winnersList = document.createElement('ul');
                    winnersList.classList.add('winners-list');
                    
                    event.winners.forEach(winner => {
                        const winnerItem = document.createElement('li');
                        winnerItem.textContent = winner;
                        winnersList.appendChild(winnerItem);
                    });

                    const winnersTitle = document.createElement('h3');
                    winnersTitle.textContent = "Winners:";
                    contentDiv.appendChild(winnersTitle);
                    contentDiv.appendChild(winnersList);
                }

                eventDiv.appendChild(dateDiv);
                eventDiv.appendChild(contentDiv);

                timeline.appendChild(eventDiv);
            });
        })
        .catch(error => console.error('Error loading the events:', error));
});
