// Get the language from the URL (default to Spanish if not provided)
const urlParams = new URLSearchParams(window.location.search);
const language = urlParams.get("lang") || "spanish"; // Default to "spanish"

// Construct the API URL dynamically
const scriptUrl = `https://script.google.com/macros/s/YOUR_SCRIPT_URL/exec?lang=${language}`;

async function fetchTranslations() {
    try {
        let response = await fetch(scriptUrl);
        let data = await response.json();
        let currentText = document.getElementById("latestParagraph");
        let transcript = document.getElementById("transcript");

        let newText = data[language].replace(/\n/g, "<br>"); // Use the dynamic language key

        if (currentText.innerHTML !== newText) {
            if (currentText.innerHTML.trim() !== "") {
                transcript.innerHTML += (transcript.innerHTML.trim() !== "" ? "<br>" : "") + currentText.innerHTML;
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
setInterval(fetchTranslations, 3000);
window.onload = fetchTranslations;
