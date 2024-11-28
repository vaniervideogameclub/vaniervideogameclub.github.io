document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const output = document.getElementById('output');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const csvData = e.target.result;
                convertCSVToChecklist(csvData);
            };
            reader.readAsText(file);
        }
    });

    function convertCSVToChecklist(csvData) {
        const rows = csvData.split('\n').map(row => row.split(',').map(cell => cell.trim().replace(/^"|"$/g, '')));
        if (rows.length < 2) {
            output.innerHTML = '<p>No valid data found in the CSV.</p>';
            return;
        }

        const [headers, ...entries] = rows; // Extract header and data rows
        const nameIndex = headers.indexOf('What is your name?');
        const participationIndex = headers.indexOf('Do you wish to participate in the VVGC Mario Party Superstars Event?');

        if (nameIndex === -1 || participationIndex === -1) {
            output.innerHTML = '<p>Required columns not found in the CSV.</p>';
            return;
        }

        const checklistContainer = document.createElement('div');
        checklistContainer.className = 'checklist-container';

        entries.forEach(entry => {
            if (entry.length > Math.max(nameIndex, participationIndex)) {
                const name = entry[nameIndex];
                const participation = entry[participationIndex];
                if (participation.toLowerCase() === 'yes') {
                    const label = document.createElement('label');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'participant';
                    checkbox.value = name;
                    label.appendChild(checkbox);
                    label.appendChild(document.createTextNode(` ${name}`));
                    checklistContainer.appendChild(label);
                    checklistContainer.appendChild(document.createElement('br'));
                }
            }
        });

        // Add Export Button
        const exportButton = document.createElement('button');
        exportButton.textContent = 'Show Selected Participants';
        exportButton.className = 'export-button';
        exportButton.onclick = showSelectedParticipants;

        output.innerHTML = '';
        output.appendChild(checklistContainer);
        output.appendChild(exportButton);
        output.appendChild(document.createElement('pre')).id = 'selectedOutput';
    }

    function showSelectedParticipants() {
        const checkboxes = document.querySelectorAll('.checklist-container input[type="checkbox"]:checked');
        const selectedNames = Array.from(checkboxes).map(checkbox => checkbox.value);

        const selectedOutput = document.getElementById('selectedOutput');
        if (selectedNames.length === 0) {
            selectedOutput.textContent = 'No participants selected!';
        } else {
            selectedOutput.textContent = selectedNames.join('\n');
        }
    }
});
