/*
// Function to parse the CSV content
function parseCSV(csvContent) {
    // Split the CSV content into lines
    const lines = csvContent.split('\n');

    // Initialize an array to store the parsed data
    const data = [];

    // Iterate through each line and split it into values
    lines.forEach(line => {
        const values = line.split(',');
        data.push(values);
    });

    // Display the parsed data in the "parsedData" element
    document.getElementById('parsedData').textContent = JSON.stringify(data, null, 2);
}

// Function to handle the selected CSV file
function handleFileSelect(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const contents = e.target.result;
            parseCSV(contents);
        };

        reader.readAsText(file);
    }
}

// Attach the file input change event listener
const fileInput = document.getElementById('csvFileInput');
fileInput.addEventListener('change', handleFileSelect);

// Attach the button click event listener
const parseButton = document.getElementById('parseButton');
parseButton.addEventListener('click', function() {
    // Trigger the file input click event programmatically
    fileInput.click();
});
*/

let data;
let amountOfFloors;
let floors = 0;
let floorData = [];

fetch('Dataset_-_CBRE_Challenge_-_HackSMU_2023.csv')
    .then(response => response.text())
    .then(csvData => {
        data = csvData; // Assign the fetched CSV data to the outer 'data' variable
        const rows = data.split('\n');
        for(let row of rows) {
            const rowData = row.split(',');
            console.log(rowData); // This will give you an array of columns in the row
            floorData.push(rowData);
        }

        // Now you can use 'data' here or perform any other operations
        for (let i = 1; i < floorData.length; i++) {
            if ([i][3] > floors){
                floors = rowData[i][3];
                console.log(floors);
            }
        }
        console.log(floors)
    })
    .catch(error => console.error('Error fetching the CSV file:', error));
