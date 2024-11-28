document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const convertButton = document.getElementById('convertButton');
    const output = document.getElementById('output2');

    convertButton.addEventListener('click', () => {
        if (!fileInput.files.length) {
            output.innerHTML = '<p>Please upload a CSV file first!</p>';
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const csvData = e.target.result;
            const rows = csvData.split('\n').map(row => row.split(',').map(cell => cell.trim().replace(/^"|"$/g, '')));
            if (rows.length < 2) {
                output.innerHTML = '<p>No valid data found in the CSV.</p>';
                return;
            }

            const [headers, ...entries] = rows;
            const jsonData = entries.map(row => {
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header] = row[index] || '';
                });
                return obj;
            });

            output.innerHTML = '<pre>' + JSON.stringify(jsonData, null, 2) + '</pre>';
        };
        reader.readAsText(file);
    });
});
