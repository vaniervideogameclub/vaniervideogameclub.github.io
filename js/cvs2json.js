function convertCSVtoJSON() {
    console.log('Convert CSV to JSON button clicked'); // Debugging

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        console.error('No file selected'); // Debugging
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        console.log('File loaded'); // Debugging
        const content = e.target.result;
        const rows = content.split("\n").map(row => row.split(","));
        
        // Remove header row
        rows.shift();
        
        const jsonArray = [];

        rows.forEach(row => {
            const name = row[1].trim().replace(/^"|"$/g, ''); // Clean extra quotes from name
            const discord = row[2].trim().replace(/^"|"$/g, '').split(' ')[0]; // Clean extra quotes from name
            const points = parseInt(row[3].trim()) || 0; // Score column

            jsonArray.push({
                name: name,
                discord: discord,
                points: points
            });
        });

        // Update output with formatted JSON
        document.getElementById('output').textContent = JSON.stringify(jsonArray, null, 2);
    };

    reader.onerror = function () {
        console.error('Error reading file'); // Debugging
    };

    reader.readAsText(file);
}
