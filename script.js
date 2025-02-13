const scriptUrl = "https://script.google.com/macros/s/AKfycby_iwC7R5pyRAJUJhwgFRO6XoJumLfthDXepRFZ94BFjn1noWctJVs3jZjVoqnqnsP0-g/exec";

let lastTranslations = null; // Stores the previous translation to avoid unnecessary updates

async function fetchTranslations() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const language = urlParams.get("lang") || "spanish";

        const response = await fetch(scriptUrl);
        const newTranslations = await response.json();

        if (!newTranslations[language]) {
            console.error("Language not found in translations:", language);
            return;
        }

        let newText = newTranslations[language].replace(/\n/g, "<br>");
        let currentText = document.getElementById("latestParagraph");
        let transcript = document.getElementById("transcript");
        let anchor = document.getElementById("anchor");

        if (lastTranslations !== newText) {
            if (currentText.innerHTML.trim() !== "") {
                transcript.innerHTML += currentText.innerHTML + "<br>";
            }
            currentText.innerHTML = newText;
            anchor.scrollIntoView({ behavior: "smooth" });
            lastTranslations = newText; // Update stored translation
        }
    } catch (error) {
        console.error("Error fetching translations:", error);
    }
}

// Fetch translations every X seconds
setInterval(fetchTranslations, 2000);
window.onload = fetchTranslations;
