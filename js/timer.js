document.addEventListener("DOMContentLoaded", () => {
    fetch('json/events.json')
        .then(response => response.json())
        .then(events => {
            const eventTableBody = document.getElementById('eventTableBody');

            events.forEach(event => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${event.title || 'N/A'}</td>
                    <td>${event.status || 'N/A'}</td>
                    <td>${event.date || 'N/A'}</td>
                    <td>${event.time || 'N/A'}</td>
                    <td>${event.location || 'N/A'}</td>
                    <td>${event.description || 'N/A'}</td>
                    <td id="countdown-${event.date}"></td>
                `;

                eventTableBody.appendChild(row);

                // Set up countdown for the event
                if (event.date) {
                    const countdownElement = document.getElementById(`countdown-${event.date}`);
                    const eventDateTime = new Date(`${event.date}T${event.time}:00`);

                    const updateCountdown = () => {
                        const now = new Date();
                        const timeDifference = eventDateTime - now;

                        if (timeDifference > 0) {
                            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                            countdownElement.innerText = `${days}d ${hours}h ${minutes}m`;
                        } else {
                            countdownElement.innerText = "Event has started!";
                        }
                    };

                    updateCountdown();
                    setInterval(updateCountdown, 60000); // Update every minute
                }
            });
        })
        .catch(error => console.error('Error loading events:', error));
});
