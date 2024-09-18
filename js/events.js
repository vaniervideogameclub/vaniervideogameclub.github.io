document.addEventListener('DOMContentLoaded', () => {
    fetch('json/events.json')
        .then(response => response.json())
        .then(events => {
            const eventsContainer = document.getElementById('events-container');

            if (!events || events.length === 0) {
                eventsContainer.innerHTML = `
                    <h2 id="events">Upcoming Events</h2>
                    <p>Check back soon for upcoming events!</p>`;
                return;
            }

            events.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

            const eventsHtml = events.map(event => {
                const eventDate = new Date(`${event.date}T${event.time}`);
                
                // Countdown Calculation
                const updateCountdown = () => {
                    const now = new Date();
                    const timeDifference = eventDate - now;
                    if (timeDifference > 0) {
                        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                        return `${days}d ${hours}h ${minutes}m`;
                    } else {
                        return "Event has started!";
                    }
                };

                // Countdown Timer
                const countdownHtml = `<p class="countdown"><strong>Countdown:</strong> <span id="countdown-${event.date.replace(/-/g, '')}"></span></p>`;

                const details = {
                    title: event.title ? `<h3>${event.title}</h3>` : '',
                    status: event.status ? `<p><strong>Status:</strong> ${event.status}</p>` : '',
                    dateTime: event.date && event.time ? `<p class="date-time"><strong>Date & Time:</strong> ${eventDate.toLocaleDateString()} at ${eventDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>` : '',
                    location: event.location ? `<p class="location"><strong>Location:</strong> ${event.location}</p>` : '',
                    description: event.description ? `<p class="description"><strong>Description:</strong> ${event.description}</p>` : ''
                };

                return `
                    <div class="event">
                        ${details.title}
                        ${details.status}
                        ${details.dateTime}
                        ${details.location}
                        ${details.description}
                        ${countdownHtml}
                    </div>`;
            }).join('');

            eventsContainer.innerHTML = `
                <h2 id="events">Upcoming Events</h2>
                ${eventsHtml}`;

            // Update countdown timers every minute
            events.forEach(event => {
                const countdownElement = document.getElementById(`countdown-${event.date.replace(/-/g, '')}`);
                if (countdownElement) {
                    const eventDate = new Date(`${event.date}T${event.time}:00`);
                    const updateCountdown = () => {
                        const now = new Date();
                        const timeDifference = eventDate - now;
                        if (timeDifference > 0) {
                            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                            countdownElement.innerText = `${days}d ${hours}h ${minutes}m`;
                        } else {
                            countdownElement.innerText = "Event has not yet started.";
                        }
                    };

                    updateCountdown();
                    setInterval(updateCountdown, 60000); // Update every minute
                }
            });
        })
        .catch(error => {
            console.error('Error loading events:', error);
            document.getElementById('events-container').innerHTML = `
                <h2 id="events">Upcoming Events</h2>
                <p>Check back soon for upcoming events!</p>`;
        });
});
