document.addEventListener('DOMContentLoaded', function () {
    


    document.getElementById('goBackButton').addEventListener('click', function () {
        // Use JavaScript's history.back() function to navigate to the previous page
        window.history.back();
    });
    // Extract the email text from the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const emailText = urlParams.get('emailText');

    // Function to display email content
    function displayEmailContent(text) {
        const emailContentDiv = document.getElementById('emailContent');
        const emailParagraph = document.createElement('p');
        emailParagraph.textContent = text;
        emailContentDiv.appendChild(emailParagraph);
    }

    // Display the email content
    displayEmailContent(emailText);
});