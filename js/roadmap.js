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
                eventDiv.appendChild(dateDiv);
                eventDiv.appendChild(contentDiv);

                timeline.appendChild(eventDiv);
            });
        })
        .catch(error => console.error('Error loading the events:', error));
});
