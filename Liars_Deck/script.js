document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const drawCardButton = document.querySelector(".btn-draw-card");
    const cardText = document.querySelector(".card-text");
    const cardOptions = ["King", "Queen", "Ace"];
    const revolverSection = document.querySelector(".revolver-wrapper");
    const addRevolverButton = document.querySelector(".btn-counter:last-of-type");
    const removeRevolverButton = document.querySelector(".btn-counter:first-of-type");
    const resetRevolversButton = document.querySelector(".btn-reset");
    const counterValue = document.querySelector(".counter-value");
    const revolversTitle = document.querySelector(".revolvers-title");
    let revolverCount = 2;

    // Function to draw a random card (King, Queen, Ace)
    function drawRandomCard() {
        const randomIndex = Math.floor(Math.random() * cardOptions.length);
        cardText.textContent = cardOptions[randomIndex];
    }

    // Draw card on button click
    drawCardButton.addEventListener("click", drawRandomCard);

    // Function to create a new revolver card
    function createRevolverCard(index) {
        const revolverCard = document.createElement("div");
        revolverCard.classList.add("revolver-card");

        revolverCard.innerHTML = `
            <div class="revolver-header">Revolver #${index}</div>
            <div class="cylinder-container w-48 h-48 mx-auto mb-4 relative" style="transition: transform 1.5s linear;">
                <svg viewBox="0 0 200 200" class="cylinder-svg">
                    <circle cx="100" cy="100" r="90" fill="#1a1a1a" stroke="#333" stroke-width="4"></circle>
                    <g transform="rotate(0 100 100)">
                        <circle cx="100" cy="45" r="15" fill="#808080" stroke="#333" stroke-width="2" class="chamber"></circle>
                    </g>
                    <g transform="rotate(60 100 100)">
                        <circle cx="100" cy="45" r="15" fill="#808080" stroke="#333" stroke-width="2" class="chamber"></circle>
                    </g>
                    <g transform="rotate(120 100 100)">
                        <circle cx="100" cy="45" r="15" fill="#808080" stroke="#333" stroke-width="2" class="chamber"></circle>
                    </g>
                    <g transform="rotate(180 100 100)">
                        <circle cx="100" cy="45" r="15" fill="#808080" stroke="#333" stroke-width="2" class="chamber"></circle>
                    </g>
                    <g transform="rotate(240 100 100)">
                        <circle cx="100" cy="45" r="15" fill="#808080" stroke="#333" stroke-width="2" class="chamber"></circle>
                    </g>
                    <g transform="rotate(300 100 100)">
                        <circle cx="100" cy="45" r="15" fill="#808080" stroke="#333" stroke-width="2" class="chamber"></circle>
                    </g>
                    <circle cx="100" cy="100" r="20" fill="#262626" stroke="#404040" stroke-width="4"></circle>
                </svg>
            </div>
            <div class="revolver-info">
                <p class="chamber-info">6/6 chambers remaining</p>
                <p class="death-probability">Death Probability: 16.67%</p>
            </div>
            <button class="btn-trigger">Pull Trigger</button>
        `;

        const triggerButton = revolverCard.querySelector(".btn-trigger");
        const chamberInfo = revolverCard.querySelector(".chamber-info");
        const chambers = revolverCard.querySelectorAll(".chamber");
        const cylinderContainer = revolverCard.querySelector(".cylinder-container");
        const deathProbability = revolverCard.querySelector(".death-probability");
        let remainingChambers = 6;
        let shotFired = false;
        let currentRotation = 0; // Track rotation to keep speed consistent

        // Event listener for "Pull Trigger" button
        triggerButton.addEventListener("click", () => {
            if (remainingChambers > 0 && !shotFired) {
                // Add a constant spin of multiple full rotations
                const spinFullRotations = 10; // Increase this number for more spins
                const randomOffset = Math.floor(Math.random() * 360); // Random offset to avoid predictable stopping
                currentRotation += (360 * spinFullRotations) + randomOffset;

                // Apply spin with a consistent speed
                cylinderContainer.style.transition = 'transform 1.5s linear';
                cylinderContainer.style.transform = `rotate(${currentRotation}deg)`;

                // Simulate delay for spinning effect
                setTimeout(() => {
                    // Randomly determine if the bullet is fired
                    const isBulletFired = Math.random() < 1 / remainingChambers;

                    // Update chambers in order
                    const chamberToRemove = chambers[6 - remainingChambers];

                    if (isBulletFired) {
                        // Change the color of the bullet to red if fired
                        chamberToRemove.setAttribute("fill", "#ff0000");
                        chamberInfo.textContent = "Bullet Fired! You Lose.";
                        chamberInfo.style.color = "#ff0000";
                        shotFired = true;
                    } else {
                        // Mark the chamber as empty
                        chamberToRemove.setAttribute("fill", "#171717");
                        remainingChambers--;
                        chamberInfo.textContent = `${remainingChambers}/6 chambers remaining`;

                        // Update the death probability
                        const newProbability = ((1 / (remainingChambers + 1)) * 100).toFixed(2);
                        deathProbability.textContent = `Death Probability: ${newProbability}%`;

                        if (remainingChambers === 0) {
                            chamberInfo.textContent = "You Survived!";
                            chamberInfo.style.color = "#00ff00";
                        }
                    }
                }, 1500); // Match with CSS transition duration (1.5s)
            }
        });

        return revolverCard;
    }

    // Function to render all revolvers
    function renderRevolvers() {
        revolverSection.innerHTML = "";
        for (let i = 1; i <= revolverCount; i++) {
            const newRevolver = createRevolverCard(i);
            revolverSection.appendChild(newRevolver);
        }
        counterValue.textContent = revolverCount;
        revolversTitle.textContent = `Revolvers (${revolverCount})`;
    }

    // Adding event listeners for adding, removing, and resetting revolvers
    addRevolverButton.addEventListener("click", () => {
        if (revolverCount < 10) {
            revolverCount++;
            renderRevolvers();
        }
    });

    removeRevolverButton.addEventListener("click", () => {
        if (revolverCount > 1) {
            revolverCount--;
            renderRevolvers();
        }
    });

    resetRevolversButton.addEventListener("click", () => {
        revolverCount = 2;
        renderRevolvers();
    });

    // Initial render of revolvers
    renderRevolvers();
});
