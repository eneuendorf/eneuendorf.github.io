// URL of your Google Apps Script Web App
const scriptUrl = "https://script.google.com/macros/s/AKfycbw2fJJfIC7wbn_yXOLf3QeFyT6B616nrSGje0SWkILri7jvXoF__V5akOV9mwqJ3nUTwg/exec";

// Function to fetch and display translations
async function fetchTranslations(lang) {
    try {
        let response = await fetch(scriptUrl);
        let data = await response.json();
        var currentText = document.getElementById("latestParagraph");

        let newText = data.lang.replace(/\n/g, "<br>");

        if (currentText.innerHTML !== newText) {
            if (currentText.innerHTML.trim() !== "") {  // Prevents leading <br>
                document.getElementById("transcript").innerHTML += currentText.innerHTML + "<br>";
            }
            currentText.innerHTML = newText;
        } else {
            console.log("same");
        } 
    } catch (error) {
        console.error("Error fetching translations:", error);
    }
}

// Fetch translations every 3 seconds
var tid = setInterval(fetchTranslations, 3000);
window.onload = fetchTranslations;
