// List of local JSON file paths
const jsonFiles = [
    'json/leaderboard.json'
];

// Function to load JSON data from a local file
async function loadJSON(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
        return [];
    }
}

// Function to fetch and merge data from all JSON files
async function fetchAndMergeData() {
    const allPlayers = {};

    for (const file of jsonFiles) {
        const players = await loadJSON(file);

        players.forEach(player => {
            const normalizedName = player.name.trim().toLowerCase(); // Normalize names for comparison
            if (allPlayers[normalizedName]) {
                // Add points to an existing player with the same name
                allPlayers[normalizedName].points += player.points;
            } else {
                // Add new player to the list
                allPlayers[normalizedName] = { 
                    name: player.name.trim(), // Keep original formatting for display
                    points: player.points
                };
            }
        });
    }

    // Convert the object back to an array
    const mergedPlayers = Object.values(allPlayers);
    populateLeaderboard(mergedPlayers);
}

// Function to fill or update the leaderboard
function populateLeaderboard(players) {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = ''; // Clear existing rows

    // Sort players by points in descending order
    players.sort((a, b) => b.points - a.points);

    players.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.points}</td>
        `;
        tbody.appendChild(row);
    });
}

// Call the fetchAndMergeData function to load data on page load
window.onload = fetchAndMergeData;
