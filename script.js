// Function to fetch and display data from text file
function displayTextFileData() {
    fetch('email_samples.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const fileDataElement = document.getElementById('fileData');
            fileDataElement.innerText = data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Call the function to display text file data
displayTextFileData();
