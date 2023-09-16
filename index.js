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
let floorData = [];
let maxFloors = 0;

// Fetch the CSV data and process it
fetch('Dataset_-_CBRE_Challenge_-_HackSMU_2023.csv')
    .then(response => response.text())
    .then(csvData => {
        data = csvData;
        const rows = data.split('\n');
        for (let row of rows) {
            const rowData = row.split(',');
            console.log(rowData);
            floorData.push(rowData);
            const floors = parseInt(rowData[2], 10);
            if (!isNaN(floors) && floors > maxFloors) {
                maxFloors = floors;
            }
        }

        console.log('Maximum number of floors:', maxFloors);

        // After fetching and processing the data, create the HTML elements
        createFloorContainers(floorData, maxFloors);
    })
    .catch(error => console.error('Error fetching the CSV file:', error));

function createFloorContainers(floorData, maxFloors) {
    let container = document.getElementById("overall-content");

    // Loop through the floor numbers
    for (let i = 1; i <= maxFloors; i++) {
        let rowContainer = document.createElement('div');
        rowContainer.classList.add('row');
        rowContainer.classList.add('border');


        // Loop through the data to find matching floor numbers
        for (let j = 1; j < floorData.length; j++) {
            if (parseInt(floorData[j][2], 10) === i) {
                let cell = document.createElement('div');
                cell.classList.add('col-12')
                cell.textContent = floorData[j].join(', '); // Display all columns in the row
                rowContainer.appendChild(cell);
            }
        }

        container.appendChild(rowContainer);
    }
}

